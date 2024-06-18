import { Component, EventEmitter, Output } from '@angular/core';
import {
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
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

//IMPORTAMOS EL MODELO DEL MATERIAL
import { Material } from '../../model/material.interface'
//IMPORTAMOS EL SERVICIO DEL MATERIAL
import { MaterialService } from '../../service/material.service'


@Component({
  selector: 'app-material-add',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
    MatTableModule,
  ],
  templateUrl: './material-add.component.html',
  styleUrl: './material-add.component.scss'
})
export class MaterialAddComponent {
  allMaterials: Material[] = []; //listado de inspectores

  datosFormulario: any = {}; //almacena los datos del formulario
  inspector1: any; //almacena los datos del inspector
  inspectorString1: string = ''; //string que contiene el JSON de los datos del inspector
  formGroup!: FormGroup; // Defnimos el nombre del Formulario
  subscription : any; //Variable para controlar la subscripcion a los datos


  constructor(
    private materialService: MaterialService, //inicializamos el servicio
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}


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
*******************************************************************************************************************************
Recibimos el evento del componente padre welder-list.component.ts y lo procesamos
*******************************************************************************************************************************
*/


@Output() miEventoAlPadre: EventEmitter<boolean> =
new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre inspector-list.component.ts

notificarPadreJunta(value: boolean) {
// Evento para enviar datos al componente padre
this.miEventoAlPadre.emit(value);
}

/*
********************************************************************
Validamos el formulario
Representamos y validamos el conjunto de datos para el formulario
********************************************************************
*/

materialForm = new FormGroup({
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



//Crea el registro del soldador

OnAddMaterial(): void {
  const materialData = this.materialForm.value;

  const material: Material = {
    tipo: this.materialForm.value.tipo!,
    colada: this.materialForm.value.colada!,
    schedule: this.materialForm.value.schedule!,
    textremo: this.materialForm.value.textremo!,
    tmaterial: this.materialForm.value.tmaterial!,
    material: this.materialForm.value.material!


  };
  this.subscription = this.materialService.addMaterial(material).subscribe(
    (response: Material) => {
      this.allMaterials.push(response);
      this.openSnackBar('El registro del Soldador se creó exitosamente', 'Cerrar');
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al crear el registro del Soldador', 'Cerrar');
    }
  );
}


ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
     }
}




}//fin
