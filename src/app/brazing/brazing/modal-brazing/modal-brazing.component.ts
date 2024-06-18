import { Component, EventEmitter, Output,  OnDestroy } from '@angular/core';
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
import { CdkStepperModule } from '@angular/cdk/stepper'; //

import { CdkTableModule } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { QRCodeModule } from 'angularx-qrcode'; //Genera el código QR
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; // Utiliza SafeUrl solo cuando estés seguro de que la URL es segura y no presenta ningún riesgo de seguridad
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
//import { Soldadura } from '../../model/brazingInterface';
import { SoldaduraSinQrCode } from '../../model/brazingQrCodeInterface'
import { BrazingService } from '../../service/brazing.service';

@Component({
  selector: 'app-modal-brazing',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    FormsModule,
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
    QRCodeModule,
  ],
  templateUrl: './modal-brazing.component.html',
  styleUrl: './modal-brazing.component.scss',
})
export class ModalBrazingComponent  implements  OnDestroy {
  public myAngularxQrCode: string = ''; //variable para almacenar el código qr
  allSoldaduras: SoldaduraSinQrCode[] = []; //listado de soldaduras
  mostrarPlantillaCodigoQr: boolean = false; //controla la visibilidad de la plantilla del código qr
  datosFormulario: any = {}; //almacena los datos del formulario
  soldadura1: any;
  soldaduraString1: string = ''; //string que contiene el JSON de la soldadura
  formGroup!: FormGroup; // Defnimos el nombre del Formulario
  subscription : any; //Variable para controlar la subscripcion a los datos

  constructor(
    private soldaduraService: BrazingService, //inicializamos el servicio
    private builder: FormBuilder, //inicializamos el builder para crear el formulario
    private snackBar: MatSnackBar //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

  @Output() miEventoAlPadre: EventEmitter<boolean> =
    new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

  notificarPadreJunta(value: boolean) {
    // Evento para enviar datos al componente padre
    this.miEventoAlPadre.emit(value);
  }   //"nro_junta": this.soldaduraForm.value.nro_junta || '',

  soldadura = {
    nro_junta: '11',
    tipo: 'BW',
    plano: 'CCPSL-EDW-DVS-4015',
    hoja: '0',
    revision: '0',
    area: 'ZONA A',
    fase: 'CPSA',
    linea: '10"-1A3-00EGC43BR001',
    diametro: '10',
    espesor: 'STD',
    cedula: 'STD',
    pn1: '1',
    pn2: '1',
    wds: 'DVS-WPS-BPV-001',
  };

  soldaduraString: string = JSON.stringify(this.soldadura, null, 2);

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
Declaramos una variable url de tipo SafeUrl e inicializándola con una cadena vacía (''). Luego, definimos un método onCodeChange(url: SafeUrl)
que toma una SafeUrl como argumento y la asigna a la variable url.
********************************************************************
*/

url: SafeUrl = '';
onCodeChange(url: SafeUrl) {
  this.url = url;
}

/*
********************************************************************
Validamos el formulario
Representamos y validamos el conjunto de datos para el formulario
********************************************************************
*/

soldaduraForm = new FormGroup({
  nro_junta: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(4),
  ]),
  tipo: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(4),
  ]),
  plano: new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(30),
  ]),
  hoja: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(10),
  ]),
  revision: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(4),
  ]),
  area: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(6),
  ]),
  fase: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(6),
  ]),
  linea: new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
  ]),
  diametro: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(4),
  ]),
  espesor: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(4),
  ]),
  cedula: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(10),
  ]),
  pn1: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(4),
  ]),
  pn2: new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(4),
  ]),
  wps: new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30),
  ])

});


togglePlantilla() {
  this.mostrarPlantillaCodigoQr = !this.mostrarPlantillaCodigoQr;
}

/*
*********************************************************************************************
Creamos una nueva soldadura y enviamos los datos al servicio para crearla en la base de datos
*********************************************************************************************
*/

onSoldaduraCreate(): void {
  //console.log(this.soldaduraForm.value);
  // Obtén los valores del formulario
  const datosSoldadura = this.soldaduraForm.value;

  const soldadura1: SoldaduraSinQrCode = {
    nro_junta: this.soldaduraForm.value.nro_junta!,
    tipo: this.soldaduraForm.value.tipo!,
    plano: this.soldaduraForm.value.plano!,
    hoja: this.soldaduraForm.value.hoja!,
    revision: this.soldaduraForm.value.revision!,
    area: this.soldaduraForm.value.area!,
    fase: this.soldaduraForm.value.fase!,
    linea: this.soldaduraForm.value.linea!,
    diametro: this.soldaduraForm.value.diametro!,
    espesor: this.soldaduraForm.value.espesor!,
    cedula: this.soldaduraForm.value.cedula!,
    pn1: this.soldaduraForm.value.pn1!,
    pn2: this.soldaduraForm.value.pn2!,
    wps: this.soldaduraForm.value.wps!,
    //qrcode: this.soldaduraForm.value.qrcode!,
  };


  const soldaduraString1: String = JSON.stringify(datosSoldadura, null, 2);

  console.log('soldadura:', soldaduraString1);

  /*
********************************************************************
Enviamos la soldadura al servico para crearla en la base de datos.
********************************************************************
*/

    // Llama al servicio con el objeto creado
    this.subscription = this.soldaduraService.onCreateSoldadura(soldadura1).subscribe(
      (response: SoldaduraSinQrCode) => {
        this.allSoldaduras.push(response);
        // Puedes mostrar un mensaje de éxito aquí si es necesario

        this.openSnackBar(
          'El registro de sodadura creado exitosamente',
          'Cerrar'
        );
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al crear el registro de la soldadura',
          'Cerrar'
        );
        // Muestra un mensaje de error al usuario
      }
    );

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('unsubscribe called: BrazingService modal brazing component destroyed');    }
  }






}
