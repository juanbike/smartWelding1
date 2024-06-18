import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { TextFieldModule } from '@angular/cdk/text-field'; //textfield
import { CdkStepperModule } from '@angular/cdk/stepper'; // stepper para paso a paso

import { CdkTableModule } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { HttpClient } from '@angular/common/http';
import { Soldadura } from '../../model/brazingInterface';
import { BrazingService } from '../../service/brazing.service';

@Component({
  selector: 'app-edit-brazing',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
    CdkStepperModule,
    CdkTableModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-brazing.component.html',
  styleUrl: './edit-brazing.component.scss',
})
export class EditBrazingComponent implements OnInit, OnDestroy {
  soldaduraForm!: FormGroup; // Variable que contendra los datos del formulario
  @Input() idSoldaduraHijo: string = ''; //id del soldador recibe el ID del componente padre (crud-soldadura)
  soldadura!: Soldadura; // Objeto que contendrá los datos de la soldadura
  mostrarPlantillaCodigoQr: boolean = false; //controla la visibilidad de la plantilla del código qr
  subscription : any; //Variable para controlar la subscripcion a los datos

  constructor(
    private http: HttpClient, //inicializamos el http para consumir el servicio de soldaduras
    private brazingService: BrazingService, //inicializamos el servicio de soldaduras
    private fb: FormBuilder, //inicializamos el builder para crear el formulario
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

  /*
  ***********************************************************************************************************************************
  El código siguiente muestra cómo definir un evento de salida en un componente de Angular
  (@Output() miEventoAlPadre: EventEmitter<boolean>) y cómo emitir este evento desde el componente hijo al componente padre

  Este patrón de comunicación entre componentes se utiliza cuando un componente hijo necesita comunicarse con su componente padre.
  El componente hijo emite un evento con datos relevantes y el componente padre puede reaccionar a estos datos suscribiéndose al evento
   del componente hijo.

   EXPLICACION DETALLADA

   @Output() miEventoAlPadre: EventEmitter<boolean>:
   -------------------------------------------------
    Esto define una propiedad llamada miEventoAlPadre como un evento de salida utilizando la decoración @Output(). EventEmitter<boolean>
     es un tipo genérico que indica que este evento emitirá valores booleanos. Esto significa que el componente padre puede suscribirse
     a este evento y recibir notificaciones cuando se emita un valor booleano desde el componente hijo.


     new EventEmitter<boolean>():
     ---------------------------
     Esto crea una nueva instancia de EventEmitter para miEventoAlPadre. EventEmitter es una clase proporcionada por Angular que se utiliza para
      emitir eventos personalizados. En este caso, estamos especificando que este evento emitirá valores booleanos.

  notificarPadreJunta(value: boolean):
  ------------------------------------
   Este método se llama en el componente hijo para emitir el evento miEventoAlPadre. Toma un parámetro value que representa el valor booleano que
    se emitirá con el evento. Cuando este método se llama, el evento miEventoAlPadre emite el valor proporcionado.

  this.miEventoAlPadre.emit(value):
  ---------------------------------
 Esto emite el evento miEventoAlPadre con el valor value. Todos los componentes que estén escuchando este evento serán notificados
 y recibirán este valor booleano.
  *****************************************************************************************************************************************
  */


  @Output() miEventoAlPadreCrudSoldadura: EventEmitter<boolean> =
    new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

    notificarPadreCrudSoldadura(value: boolean) {
    // Evento para enviar datos al componente padre: crud-soldadura
    this.miEventoAlPadreCrudSoldadura.emit(value);
  }


/*
********************************************************************
Definimos el formulario con el modelo de datos de la soldadura
********************************************************************
*/


ngOnInit(): void {
  // Inicializar el formulario vacío
  this.soldaduraForm = this.fb.group({
    // Definimos los campos del formulario según modelo de datos: soldadura
    nro_junta: [''],
    tipo: [''],
    plano: [''],
    hoja: [''],
    revision: [''],
    area: [''],
    fase: [''],
    linea: [''],
    diametro: [''],
    espesor: [''],
    cedula: [''],
    pn1: [''],
    pn2: [''],
    wps: [''],
  });
  // Obtiene los datos de la soldadura por su ID
  this.subscription =  this.brazingService.getSoldadura(this.idSoldaduraHijo).subscribe(
    (data: Soldadura) => {
      this.soldadura = data; // Asigna los datos obtenidos al objeto soldadura
      this.actualizarSoldadura(); //Llama a la funcion actualizarSoldadura para rellenar el formulario con los datos de la soldadura
    },
    (error) => {
      console.log('Error al actualizar la soldadura:', error);
    }
  );
}

// Rellenamos el formulario con los datos obtenidos
  // Actualiza la soldadura y rellena el formulario con los datos obtenidos
  private actualizarSoldadura(): void {
    this.soldaduraForm.patchValue({
      nro_junta: this.soldadura.nro_junta,
      tipo: this.soldadura.tipo,
      plano: this.soldadura.plano,
      hoja: this.soldadura.hoja,
      revision: this.soldadura.revision,
      area: this.soldadura.area,
      fase: this.soldadura.fase,
      linea: this.soldadura.linea,
      diametro: this.soldadura.diametro,
      espesor: this.soldadura.espesor,
      cedula: this.soldadura.cedula,
      pn1: this.soldadura.pn1,
      pn2: this.soldadura.pn2,
      wps: this.soldadura.wps,
    });
  }


  onSubmit(): void {
    const datosModificados = this.soldaduraForm.value; // Obtiene los datos del formulario
    this.brazingService
      .onUpdateSoldadura(this.idSoldaduraHijo, datosModificados)
      .subscribe(
        (response: Soldadura) => {
          this.openSnackBar('Soldadura actualizada correctamente:', 'Cerrar');
          console.log('Soldadura actualizada con éxito:', response);
          // Maneja la respuesta de la API según sea necesario
        },
        (error) => {
          this.openSnackBar(
            'Error al actualizar la soldadura:',
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

togglePlantilla() {
  this.mostrarPlantillaCodigoQr = !this.mostrarPlantillaCodigoQr;
}


// libera el servicio cuando se destruye el componente

ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
    console.log('unsubscribe called: BrazingService edit-brazing component destroyed');
  }
}



}
