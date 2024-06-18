import { Component, EventEmitter, Output,  OnDestroy } from '@angular/core';
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
import {Inspector } from '../../model/inspector.interface'
import { InspectorService } from '../../service/inspector.service'
@Component({
  selector: 'app-inspector-add',
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
  templateUrl: './inspector-add.component.html',
  styleUrl: './inspector-add.component.scss'
})
export class InspectorAddComponent implements OnDestroy {


  allInspectors: Inspector[] = []; //listado de inspectores

  datosFormulario: any = {}; //almacena los datos del formulario
  inspector1: any; //almacena los datos del inspector
  inspectorString1: string = ''; //string que contiene el JSON de los datos del inspector
  formGroup!: FormGroup; // Defnimos el nombre del Formulario
  subscription : any; //Variable para controlar la subscripcion a los datos

  constructor(
    private inspectorService: InspectorService, //inicializamos el servicio
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

inspectorForm = new FormGroup({
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


/*
****************************************************************
Creamos el registro del inspector
****************************************************************
*/

onInspectorCreate(): void {
  const inspectorData = this.inspectorForm.value;

  const inspector: Inspector = {
    nombre: this.inspectorForm.value.nombre!,
    apellido: this.inspectorForm.value.apellido!,
    telefono1: this.inspectorForm.value.telefono1!,
    telefono2: this.inspectorForm.value.telefono2!,
  };
  this.subscription = this.inspectorService.addInspector(inspector).subscribe(
    (response: Inspector) => {
      this.allInspectors.push(response);
      this.openSnackBar('El registro de soldadura se creó exitosamente', 'Cerrar');
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al crear el registro de soldadura', 'Cerrar');
    }
  );
}


ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
     }
}



}

