import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { TextFieldModule } from '@angular/cdk/text-field'; //textfield


import { InspectorService } from '../../service/inspector.service';
import { Inspector } from '../../model/inspector.interface';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inspector-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
    MatTable,

  ],
  templateUrl: './inspector-edit.component.html',
  styleUrl: './inspector-edit.component.scss'
})
export class InspectorEditComponent implements OnInit, OnDestroy {
   @Input() idSoldaduraHijo: string = ''; //id del soldador recibe el ID del componente padre (crud-soldadura)
   inspectorForm!: FormGroup; // Variable que contendra los datos del formulario
   subscription : any; //Variable para controlar la subscripcion a los datos
   inspector!: Inspector; // Objeto que contendrá los datos del inspector
   inspectores: any; // Variable para almacenar los datos de la AP
   @Input() table: MatTable<any> | undefined; // Variable para la tabla de inspectores
   @Output() datosEnviados = new EventEmitter<any>(); //enviamos datos a inspector-list para que se ejecute la funcion actualizar tabla



   dataSource!: MatTableDataSource<Inspector>; // Variable dataSource para la fuente de datos de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
  @ViewChild(MatSort) sort!: MatSort; // Variable para el sort
   constructor(

    private inspectorService: InspectorService, //inicializamos el servicio de soldaduras
    private fb: FormBuilder, //inicializamos el builder para crear el formulario
    private snackBar: MatSnackBar, //inicializamos el snackbar para mostrar notificaciones al usuario
    private cdr: ChangeDetectorRef
  ) {}


  /*
  ******************************************************************************************
  Recibimos el evento del componente padre: inspector-list.component.*
  ******************************************************************************************
  */

  @Output() miEventoAlPadreCrudSoldadura: EventEmitter<boolean> =
  new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

  notificarPadreCrudSoldadura(value: boolean) {
  // Evento para enviar datos al componente padre:inspector-list
  this.miEventoAlPadreCrudSoldadura.emit(value);
}



/*
********************************************************************
Definimos el formulario con el modelo de datos de la soldadura
********************************************************************
*/

  ngOnInit(): void {
    // Inicializar el formulario vacío
    this.inspectorForm = this.fb.group({
      // Definimos los campos del formulario según modelo de datos: inspector
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
      ]),
      telefono1: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
      telefono2: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(12),
      ])

    });
    // Obtiene los datos de la soldadura por su ID
    this.subscription =  this.inspectorService.getInspector(this.idSoldaduraHijo).subscribe(
      (data: Inspector) => {
        this.inspector = data; // Asigna los datos obtenidos al objeto soldadura
        this.actualizarInspector(); //Llama a la funcion actualizarSoldadura para rellenar el formulario con los datos de la soldadura
      },
      (error) => {
        this.openSnackBar(
          'Error al actualizar el inspector:',
          'Cerrar'
        );
      }
    );
  }

  // Rellenamos el formulario con los datos obtenidos
  // Actualiza la soldadura y rellena el formulario con los datos obtenidos
  private actualizarInspector(): void {
    this.inspectorForm.patchValue({
      nombre: this.inspector.nombre,
      apellido: this.inspector.apellido,
      telefono1: this.inspector.telefono1,
      telefono2: this.inspector.telefono2,

    });
  }


  onSubmit(): void {
    const datosModificados = this.inspectorForm.value; // Obtiene los datos del formulario
    //this.datosEnviados();
    console.log('Datos del formulario:', datosModificados);
    this.inspectorService
      .updateInspector(this.idSoldaduraHijo, datosModificados)
      .subscribe(
        (response: Inspector) => {
          this.openSnackBar('Inspector actualizado correctamente:', 'Cerrar');
          //console.log('Soldadura actualizada con éxito:', response);
          //this.actualizarRegistro(this.idSoldaduraHijo, datosModificados)
          //this.fetchInspectores();
          this.actualizarTabla()
          this.notificarPadreCrudSoldadura(true); // Llama al método para notificar al padre que se ha actualizado la soldadura

        },
        (error) => {
          this.openSnackBar(
            'Error al actualizar el inspector',
            'Cerrar'
          );
          console.error('Error al actualizar la soldadura:', error);
          // Maneja los errores de la API según sea necesario
        }
      );
  }

 /*
********************************************************************
Muestra una notificación al usuario.
********************************************************************
*/

openSnackBar(message: string, action: string) {
  const config = new MatSnackBarConfig();
  config.panelClass = ['blue-snackbar'];
  config.horizontalPosition = 'end'; // Posición horizontal: 'start' | 'center' | 'end' | 'left' | 'right'
  config.verticalPosition = 'top'; // Posición vertical: 'top' | 'bottom'
  config.duration = 3000; // Duración en milisegundos (opcional)
  this.snackBar.open(message, action, config);
}



/*
********************************************************************
Actualiza toda la tabla tabla sin recargar la página
********************************************************************
*/
actualizarTabla(): void {
this.inspectorService.fetchInspectors().subscribe( (data: any[]) => { // Creamos un objeto fuente de datos para la tabla
 this.dataSource = new MatTableDataSource(data); // Creamos un objeto fuente de datos para la tabla
  this.dataSource.data = data; // Actualiza la tabla con los datos obtenidos
  this.dataSource.paginator = this.paginator; // Asociamos la paginación a la tabla
  this.dataSource.sort = this.sort; // Asociamos el ordenamiento a la tabla
  this.table?.renderRows(); // Forzar la actualización de la vista
  //this.cdr.detectChanges(); // Forzar la actualización de la vista
  console.log('Datos de la tabla:', this.dataSource.data);
});
}





/*
********************************************************************
Actualiza un registro de la tabla sin recargar la página
********************************************************************
*/

/*
actualizarRegistro(id: string, registroActualizado: Inspector): void {
  const numericId = parseInt(id, 10);
  const index = this.dataSource.data.findIndex(registro => registro.id === id);
  if (index !== -1) {
    this.dataSource.data[index] = registroActualizado;
    this.dataSource.data = [...this.dataSource.data]; // Actualizar la fuente de datos
  }
}
*/


/*
********************************************************************
Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

private fetchInspectores() {
  // Realiza la solicitud HTTP utilizando el servicio 'InspectorService'
  this.subscription = this.inspectorService.fetchInspectors().subscribe(
    (data) => {

      // Almacena los datos de la respuesta en la propiedad 'Inspectores'
      this.inspectores = data;
      // Asigna los datos a la fuente de datos para renderizar la tabla
      this.dataSource = new MatTableDataSource(this.inspectores);

      this.dataSource.paginator = this.paginator; // Asigna el paginador a la fuente de datos
      this.dataSource.sort = this.sort; // Asigna el sort a la fuente de datos
      this.openSnackBar(
        'Recuperando registros de la base de datos',
        'Cerrar'
      );
    },
    // Maneja errores en la solicitud HTTP
    (error: HttpErrorResponse) => {
      // Manejo de errores más detallado
      let errorMessage = 'Ocurrió un error al cargar las Soldadoress.';

      if (error.status === 0) {
        errorMessage =
          'No se pudo conectar al servidor. Verifique su conexión a internet.';
      } else if (error.status >= 400 && error.status < 500) {
        // Errores del lado del cliente (por ejemplo, errores de validación)
        errorMessage =
          'Error en la solicitud. Verifique los datos ingresados.';
        if (error.status == 400) {
          errorMessage =
            'La solicitud no pudo ser entendida o procesada por el servidor debido a una sintaxis incorrecta o a parámetros inválidos..';
        } else if (error.status == 401) {
          errorMessage =
            'El cliente debe autenticarse para obtener la respuesta solicitada.';
        } else if (error.status == 403) {
          errorMessage =
            'El cliente no tiene los privilegios necesarios para obtener la respuesta solicitada.';
        } else if (error.status == 404) {
          errorMessage =
            'El recurso solicitado no fue encontrado en el servidor';
        } else if (error.status == 405) {
          errorMessage =
            'El servidor no admite la solicitud HTTP solicitada.';
        }
      } else if (error.status >= 500) {
        // Errores del lado del servidor
        errorMessage =
          'Error interno del servidor. Inténtelo de nuevo más tarde o contacte a soporte técnico.';
      }
      // Muestra un mensaje de error utilizando MatSnackBar
      this.openSnackBar(errorMessage, 'Cerrar');
    }
  );
}



// libera el servicio cuando se destruye el componente

ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}



}
