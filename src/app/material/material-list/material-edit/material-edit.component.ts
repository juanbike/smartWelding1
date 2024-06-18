import {  Component, EventEmitter, Input, Output, OnDestroy, ViewChild, ChangeDetectorRef, OnInit} from '@angular/core';
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


//IMPORTAMOS EL MODELO DEL MATERIAL
import { Material } from '../../model/material.interface'
//IMPORTAMOS EL SERVICIO DEL MATERIAL
import { MaterialService } from '../../service/material.service'


@Component({
  selector: 'app-material-edit',
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
  templateUrl: './material-edit.component.html',
  styleUrl: './material-edit.component.scss'
})
export class MaterialEditComponent implements OnInit, OnDestroy {
  @Input() idSoldaduraHijo: string = ''; //id del soldador recibe el ID del componente padre (crud-soldadura)

  materialForm!: FormGroup; // Variable que contendra los datos del formulario
   subscription : any; //Variable para controlar la subscripcion a los datos
   material!: Material; // Objeto que contendrá los datos del inspector
   materials: any; // Variable para almacenar los datos de la API
   @Input() table: MatTable<any> | undefined; // Variable para la tabla de soldadores

   dataSource!: MatTableDataSource<Material>; // Variable dataSource para la fuente de datos de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
  @ViewChild(MatSort) sort!: MatSort; // Variable para el sort

  constructor(

    private materialService:MaterialService, //inicializamos el servicio de soldaduras
    private fb: FormBuilder, //inicializamos el builder para crear el formulario
    private snackBar: MatSnackBar, //inicializamos el snackbar para mostrar notificaciones al usuario
    private cdr: ChangeDetectorRef
  ) {}


  /*
  ******************************************************************************************
  Recibimos el evento del componente padre: material-list.component.html
  ******************************************************************************************
  */
  @Output() miEventoAlPadreCrudSoldadura: EventEmitter<boolean> =
  new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre
  notificarPadreCrudSoldadura(value: boolean) {
  // Evento para enviar datos al componente padre:inspector-list
  this.miEventoAlPadreCrudSoldadura.emit(value);
}


ngOnInit(): void {
    this.materialForm = this.fb.group({
      tipo: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(25),
      ]),
      colada: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
      ]),
      schedule: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
      ]),
      textremo: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
      tmaterial: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      material: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
      ])
    });

      // Obtiene los datos de la soldadura por su ID
  this.subscription =  this.materialService.getMaterial(this.idSoldaduraHijo).subscribe(
    (data: Material) => {
      this.material = data; // Asigna los datos obtenidos al objeto material
      this.actualizarMaterial(); //Llama a la funcion actualizarMaterial para rellenar el formulario con los datos de la soldadura
    },
    (error) => {
      this.openSnackBar(
        'Error al actualizar el inspector:',
        'Cerrar'
      );
    }
  )
}



/*
********************************************************************************************************
Rellenamos el formulario con los datos obtenidos
 Actualiza la soldadura y rellena el formulario con los datos obtenidos
********************************************************************************************************
*/


private actualizarMaterial(): void {
  this.materialForm.patchValue({
    tipo: this.material.tipo,
    colada: this.material.colada,
    schedule: this.material.schedule,
    tmaterial: this.material.tmaterial,
    textremo: this.material.textremo,
    material: this.material.material
 });
}

/*
********************************************************************************************************
Obtiene los datos del formulario y los enviamos al servicio para actualizar el registro de materiales,
muestra un mensaje de exito o error al usuario y actualiza la tabla en el la tabla del usuario
********************************************************************************************************
*/

onSubmit(): void {
  const datosModificados = this.materialForm.value; // Obtiene los datos del formulario

  this.materialService
    .updateMaterial(this.idSoldaduraHijo, datosModificados)
    .subscribe(
      (response: Material) => {
        this.openSnackBar('Inspector actualizado correctamente:', 'Cerrar');

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
************************************************************************************************************
Actualiza la tabla con los datos modificados y los muestra al usuario
************************************************************************************************************
*/


actualizarTabla(): void {
  this.materialService.fechMaterials().subscribe( (data: any[]) => { // Creamos un objeto fuente de datos para la tabla
   this.dataSource = new MatTableDataSource(data); // Creamos un objeto fuente de datos para la tabla
    this.dataSource.data = data; // Actualiza la tabla con los datos obtenidos
    this.dataSource.paginator = this.paginator; // Asociamos la paginación a la tabla
    this.dataSource.sort = this.sort; // Asociamos el ordenamiento a la tabla
    this.table?.renderRows(); // Forzar la actualización de la vista
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
       }
  }


}//
