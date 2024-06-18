import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
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


//IMPORTAMOS EL MODELO DEL SOLDADOR
import { Welder } from '../../model/welder.interface';
//IMPORTAMOS EL SERVICIO DEL SOLDADOR
import { WelderService } from '../../services/welder.service';


@Component({
  selector: 'app-welder-add',
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
  templateUrl: './welder-add.component.html',
  styleUrl: './welder-add.component.scss'
})
export class WelderAddComponent implements OnDestroy {

  allWelders: Welder[] = []; //listado de inspectores

  datosFormulario: any = {}; //almacena los datos del formulario
  inspector1: any; //almacena los datos del inspector
  inspectorString1: string = ''; //string que contiene el JSON de los datos del inspector
  formGroup!: FormGroup; // Defnimos el nombre del Formulario
  subscription : any; //Variable para controlar la subscripcion a los datos


  constructor(
    private welderService: WelderService, //inicializamos el servicio
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

welderForm = new FormGroup({
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
    Validators.minLength(8),
    Validators.maxLength(18),
  ]),
  valores: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]),
    estampa: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]),
  calificacion: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(25),
  ]),
  basemetal: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(20),
  ]),
  numerop: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(25),
  ]),
  telefono: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(25),
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(70),
  ])

});

//Crea el registro del soldador

onWelderCreate(): void {
  const welderData = this.welderForm.value;

  const welder: Welder = {
    nombre: this.welderForm.value.nombre!,
    apellido: this.welderForm.value.apellido!,
    identificacion: this.welderForm.value.identificacion!,
    valores: this.welderForm.value.valores!,
    estampa: this.welderForm.value.estampa!,
    calificacion: this.welderForm.value.calificacion!,
    basemetal: this.welderForm.value.basemetal!,
    numerop: this.welderForm.value.numerop!,
    telefono: this.welderForm.value.telefono!,
    email: this.welderForm.value.email!,

  };
  this.subscription = this.welderService.addWelder(welder).subscribe(
    (response: Welder) => {
      this.allWelders.push(response);
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
