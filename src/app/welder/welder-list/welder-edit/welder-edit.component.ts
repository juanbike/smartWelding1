import { Component, EventEmitter, Input, Output, OnDestroy, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
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
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

//IMPORTAMOS EL MODELO DEL SOLDADOR
import { Welder } from '../../model/welder.interface';
//IMPORTAMOS EL SERVICIO DEL SOLDADOR
import { WelderService } from '../../services/welder.service';


@Component({
  selector: 'app-welder-edit',
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
    MatTable
  ],
  templateUrl: './welder-edit.component.html',
  styleUrl: './welder-edit.component.scss'
})
export class WelderEditComponent implements OnInit, OnDestroy{
  @Input() idSoldaduraHijo: string = ''; //id del soldador recibe el ID del componente padre (crud-soldadura)

  welderForm!: FormGroup; // Variable que contendra los datos del formulario
   subscription : any; //Variable para controlar la subscripcion a los datos
   welder!: Welder; // Objeto que contendrá los datos del inspector
   welders: any; // Variable para almacenar los datos de la AP
   @Input() table: MatTable<any> | undefined; // Variable para la tabla de soldadores

   dataSource!: MatTableDataSource<Welder>; // Variable dataSource para la fuente de datos de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
  @ViewChild(MatSort) sort!: MatSort; // Variable para el sort

  constructor(

    private welderService: WelderService, //inicializamos el servicio de soldaduras
    private fb: FormBuilder, //inicializamos el builder para crear el formulario
    private snackBar: MatSnackBar, //inicializamos el snackbar para mostrar notificaciones al usuario
    private cdr: ChangeDetectorRef
  ) {}


  /*
  ******************************************************************************************
  Recibimos el evento del componente padre: welder-list.component.html
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
  this.welderForm = this.fb.group({
    // Definimos los campos del formulario según modelo de datos: inspector
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    identificacion: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(18),
    ]),
    valores: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
      estampa: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    calificacion: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(25),
    ]),
    basemetal: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(20),
    ]),
    numerop: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(25),
    ]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(70),
    ])


  });
  // Obtiene los datos de la soldadura por su ID
  this.subscription =  this.welderService.getWelder(this.idSoldaduraHijo).subscribe(
    (data: Welder) => {
      this.welder = data; // Asigna los datos obtenidos al objeto soldadura
      this.actualizarWelder(); //Llama a la funcion actualizarSoldadura para rellenar el formulario con los datos de la soldadura
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
private actualizarWelder(): void {
  this.welderForm.patchValue({
    nombre: this.welder.nombre,
    apellido: this.welder.apellido,
    identificacion: this.welder.identificacion,
    valores: this.welder.valores,
    estampa: this.welder.estampa,
    calificacion:this.welder.calificacion,
    basemetal:this.welder.basemetal,
    numerop: this.welder.numerop,
    telefono: this.welder.telefono,
    email: this.welder.email


  });
}

/*
********************************************************************************************************
Obtiene los datos del formulario y los enviamos al servicio para actualizar el registro de materiales,
muestra un mensaje de exito o error al usuario y actualiza la tabla en el la tabla del usuario
********************************************************************************************************
*/
onSubmit(): void {
  const datosModificados = this.welderForm.value; // Obtiene los datos del formulario
  //this.datosEnviados();
  console.log('Datos del formulario:', datosModificados);
  this.welderService
    .updateWelder(this.idSoldaduraHijo, datosModificados)
    .subscribe(
      (response: Welder) => {
        this.openSnackBar('Inspector actualizado correctamente:', 'Cerrar');

        this.actualizarTabla()
        this.notificarPadreCrudSoldadura(true); // Llama al método para notificar al padre que se ha actualizado la soldadura

      },
      (error) => {
        this.openSnackBar(
          'Error al actualizar el inspector',
          'Cerrar'
        );
        
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
************************************************************************************************************
Actualiza la tabla con los datos modificados y los muestra al usuario
************************************************************************************************************
*/
actualizarTabla(): void {
  this.welderService.fetchWelders().subscribe( (data: any[]) => { // Creamos un objeto fuente de datos para la tabla
   this.dataSource = new MatTableDataSource(data); // Creamos un objeto fuente de datos para la tabla
    this.dataSource.data = data; // Actualiza la tabla con los datos obtenidos
    this.dataSource.paginator = this.paginator; // Asociamos la paginación a la tabla
    this.dataSource.sort = this.sort; // Asociamos el ordenamiento a la tabla
    this.table?.renderRows(); // Forzar la actualización de la vista
    //this.cdr.detectChanges(); // Forzar la actualización de la vista
    console.log('Datos de la tabla:', this.dataSource.data);
  });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
       }
  }


}//fin
