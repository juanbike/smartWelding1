import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy, OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule

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
import { HttpClient } from '@angular/common/http'
import { Soldadura } from '../../model/brazingInterface';
import { BrazingService } from '../../service/brazing.service';

@Component({
  selector: 'app-generate-qr-code',
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
    MatTableModule
  ],
  templateUrl: './generate-qr-code.component.html',
  styleUrl: './generate-qr-code.component.scss'
})
export class GenerateQrCodeComponent implements OnInit, OnDestroy {
  // Declaramos la propiedad que va a recivir el ID de la soldadura

  @Input() idSoldaduraHijo: string = ''; //id de la soldadura que se pasa como parametro  desde el componente padre
  soldadura!: Soldadura; // Objeto que contendrá los datos de la soldadura

  subscription : any; //Variable para controlar la subscripcion a los datos
  formGroupGenerarCodigoQR!: FormGroup; // Defnimos el nombre del Formulario

  constructor(
    private http: HttpClient, //inicializamos el http para consumir el servicio de juntas
    private soldaduraService: BrazingService, //inicializamos el servicio
    private builder: FormBuilder, //inicializamos el builder para crear el formulario
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


  @Output() miEventoAlPadre2: EventEmitter<boolean> =
  new EventEmitter<boolean>(); // propiedad 'output'  para enviar datos al componente padre

notificarPadreJunta2(value: boolean) {
  // Evento para enviar datos al componente padre
  this.miEventoAlPadre2.emit(value);
}


ngOnInit(): void {
  // Llama al método del servicio para obtener los datos de la soldadura por su ID
  this.subscription = this.soldaduraService.getSoldadura(this.idSoldaduraHijo).subscribe(
    (data: Soldadura) => {
      this.soldadura = data; // Asigna los datos obtenidos al objeto soldadura
      console.log('Soldadura:', this.soldadura.plano);
      console.log('Soldadura:', this.idSoldaduraHijo);
      // Asigna los datos obtenidos a una constante
      const soldaduraData = data;

      console.log('SoldaduraData:', soldaduraData);

      // Verifica si soldadura está definido y tiene la propiedad qrcode antes de acceder a ella
      if (soldaduraData?.qrcode) {
        console.log('URL del código QR:', this.soldadura.qrcode);
      } else {
        console.log(
          'La propiedad qrcode no está definida en el objeto soldadura'
        );
      }
    },
    (error) => {
      console.log('Error al obtener la soldadura:', error);
    }
  );
}


/*
  *************************************************************************************************************
  El método descargarImagen() crea un enlace de descarga para la imagen que contiene el código QR.
  *************************************************************************************************************
  */

  descargarImagen(): void {
    const imagenUrl = this.soldadura?.qrcode; // Asegúrate de que soldadura y qrcode estén definidos
    if (imagenUrl) {
      const enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = imagenUrl;
      enlaceDescarga.download = 'codigo_qr.png'; // Nombre de archivo predeterminado
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();
      document.body.removeChild(enlaceDescarga);
    } else {
      alert('URL de imagen inválida');
    }
  }


  /*
  **************************************************************************************************************
  El método imprimir() abre una nueva ventana del navegador y luego imprimir la imagen que contiene el código QR.
  ***************************************************************************************************************
  */

  imprimir(): void {
    const imagenUrl = this.soldadura?.qrcode; // Asegúrate de que soldadura y qrcode estén definidos
    if (imagenUrl) {
      const imagen = document.getElementById(
        this.soldadura.qrcode
      ) as HTMLImageElement;
      const ventana = window.open('', '_blank')!;
      ventana.document.write(
        '<html><head><title>Imprimir Imagen</title></head><body>'
      );
      ventana.document.write(
        '<img src="' + imagenUrl + '" style="max-width:100%;">'
      );
      ventana.document.write('</body></html>');
      ventana.document.close();
      ventana.print();
    } else {
      alert('Url de la imagen no definida');
    }
  }


// libera el servicio cuando se destruye el componente

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      }
  }




}
