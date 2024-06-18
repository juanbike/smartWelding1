import { Component, ViewChild, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

//modulos de angular material
import { MatTableModule, MatTableDataSource } from '@angular/material/table'; //tabla
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator'; //paginador
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador
import { MatFormFieldModule } from '@angular/material/form-field'; //formulario
import { MatInputModule } from '@angular/material/input'; //input
//import { PaginationService } from '../../services/paginacion/pagination.service'; //paginacion
import { MatSort } from '@angular/material/sort'; //ordenamiento
import { MatMenuModule } from '@angular/material/menu'; //menu

//IMPORTAR EL COMPONENTE MODAL DE FORMULARIO SOLDADURA
import { ModalBrazingComponent } from '../brazing/modal-brazing/modal-brazing.component';

//IMPORTA EL COMPONENTE MODAL PARA GENERAR CODIGO QR
import { GenerateQrCodeComponent } from '../brazing/generate-qr-code/generate-qr-code.component'

//IMPORTA EL COMPONENTE MODAL PARA EDITAR SOLDADURA
import { EditBrazingComponent } from '../brazing/edit-brazing/edit-brazing.component';

import { MatDialog } from '@angular/material/dialog'; //Cuadro de dialogo
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'; //

import { BoxDialogComponent } from '../../../commons/box-dialog/box-dialog.component'; //Cuadro de dialogo para eliminar Sold
import { BrazingService } from '../service/brazing.service';
import { PaginationService } from '../../../commons/paginacion/pagination.service';
import { Soldadura } from '../model/brazingInterface';



@Component({
  selector: 'app-brazing',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    RouterOutlet,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ModalBrazingComponent,
    GenerateQrCodeComponent,
    ReactiveFormsModule,
    EditBrazingComponent,
    HttpClientModule
  ],
  templateUrl: './brazing.component.html',
  styleUrl: './brazing.component.scss'
})
export class BrazingComponent implements OnInit, OnDestroy {

   //variables para el paginador
   dataSource!: MatTableDataSource<Soldadura>; // Variable para la fuente de datos de la tabla
   soldaduras: any; // Variable para almacenar los datos de la API
   private isSoldadorSelected: boolean = true; // Variable para controlar el estado de la junta seleccionada
   showModalAgregarSoldadores: boolean = false; // Variable para controlar la visibilidad del componente modal
   showModalGenerarCodigoQR: boolean = false; // Variable para controlar la visibilidad del componente modal Generar Código Qr
   showModalEditarSoldadura: boolean = false; // Variable para controlar la visibilidad del componente para editar la soldadura
   messageText: string = ''; // Variable para el texto del mensaje de confirmacin
   idSoldaduraPadre: string = ''; // ID del registro que se enviará al componente hijo (modal)
   toDestroy: boolean = false; // Variable para controlar el ciclo de vida del componente hijo (modal)

   @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
   @ViewChild(MatSort) sort!: MatSort; // Variable para el sort
   subscription : any; //Variable para controlar la subscripcion a los datos


  constructor(
    private http: HttpClient,
    private soldaduraService: BrazingService = inject(BrazingService), //inicializamos el servicio
    private paginationService: PaginationService = inject(PaginationService), //inicializamos el paginador
    public dialog: MatDialog, //inicializamos el cuadro de dialogo: Eliminar Soldadores
    private snackBar: MatSnackBar, //inicializamos el snackbar para mostrar notificaciones al usuario

  ) {}

  //columnas de la tabla soldadura
  displayedColumns: string[] = [
    'id',
    'nro_junta',
    'tipo',
    'plano',
    'hoja',
    'revision',
    'area',
    'fase',
    'linea',
    'diametro',
    'espesor',
    'cedula',
    'pn1',
    'pn2',
    'wds',
    'Acciones',
  ];


 /*
********************************************************************
configuramos el snackbar Muestra una notificación al usuario.
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
Función para obtener los datos de la soldadura
********************************************************************
*/

ngOnInit(): void {
  this.fetchSoldaduras();
}

/*
********************************************************************
Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

private fetchSoldaduras() {
  // Realiza la solicitud HTTP utilizando el servicio 'SoldadoressService'
  this.subscription = this.soldaduraService.fetchSoldadura().subscribe(
    (data) => {

      // Almacena los datos de la respuesta en la propiedad 'Soldadoress'
      this.soldaduras = data;
      // Asigna los datos a la fuente de datos para renderizar la tabla
      this.dataSource = new MatTableDataSource(this.soldaduras);

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


 /*
********************************************************************
Metodo para eliminar una Soldadura
********************************************************************
*/

onDeleteSoldadura(id: string): void {
  const SoldadurasEncontrada = this.soldaduras.find(
    (Soldadura: { id: string }) => Soldadura.id === id
  );

  if (SoldadurasEncontrada) {
    this.soldaduraService.onDeleteSoldadura(id).subscribe(
      () => {
        // Operación exitosa

        this.openSnackBar('Registro eliminado', 'Cerrar');

        this.fetchSoldaduras(); // Recarga la tabla con los nuevos datos
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Ocurrio un error al eliminar el registro de la Soldadura',
          'Cerrar'
        );
      }
    );
  } else {
    this.openSnackBar(
      'El registro de la Soldadura no se encuentra',
      'Cerrar'
    );
  }
}


 /*
********************************************************************
Metodo para ocultar el modal de agregar soldadura
********************************************************************
*/

OnAddSoldadores(): void {
  this.showModalAgregarSoldadores = true; // Mostrar el componente modal Formulario para agregar Soldaduras
}

/*
********************************************************************
Metodo para ocultar el modal de Generar Código QR
********************************************************************
*/

mostrarModalGenerarQR(): void {
  this.showModalGenerarCodigoQR = true; // Mostrar el componente modal
}


 /*
********************************************************************
Metodo para obtener el ID de la Soldadura seleccionada
********************************************************************
*/


obtenerIdDelRegistro(valor: string): void {
this.showModalGenerarCodigoQR = true; // Mostrar el componente modal
// Lógica para obtener el ID del registro, por ejemplo, a través de una interacción del usuariog
this.idSoldaduraPadre = valor; // Asigna el ID del registro obtenido
}

/*
**********************************************************************************
Metodo para obtener el ID de la Soldadura seleccionada para editar la Soldadura
**********************************************************************************
*/

mostrarFormularioEditarSoldadura(valor: string): void{
this.showModalEditarSoldadura = true;
this.idSoldaduraPadre = valor; // Asigna el ID del registro obtenido
}


 /*
*********************************************************************************************************************************************
Metodo para filtar los datos de la tabla
Este método se utiliza para aplicar un filtro a una fuente de datos, probablemente a través de un campo de entrada.

El método applyFilter toma un parámetro event de tipo Event, que generalmente se pasa desde el evento input en el campo de entrada.
La línea const filterValue = (event.target as HTMLInputElement).value; obtiene el valor del campo de entrada y lo asigna a la variable filterValue.
A continuación, se aplica el filtro a la fuente de datos utilizando this.dataSource.filter = filterValue.trim().toLowerCase();.

Esto asume que this.dataSource es una instancia de MatTableDataSource o una clase similar que tiene una propiedad filter para aplicar el filtro.
Si la fuente de datos tiene paginación habilitada (this.dataSource.paginator), se llama al método firstPage() en el paginador para volver
a la primera página de resultados.
**************************************************************************************************************************************************
*/
  // Metodo para filtrar la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*
******************************************************************************************************************
este código abre un cuadro de diálogo de confirmación utilizando Angular Material, pasando un mensaje, un texto
para el botón y un identificador asociado a la Soldadores que se desea eliminar. Este enfoque es útil
para encapsular la lógica del cuadro de diálogo en un componente separado (BoxDialogComponent).
********************************************************************************************************************
*/

  recibirDatosdeMA(event: boolean) {
    if (!event) {
      this.isSoldadorSelected = true;
      alert(this.isSoldadorSelected);
    }
    this.showModalAgregarSoldadores = false; // Ocultar el componente modal
    this.fetchSoldaduras(); // Recarga la tabla con los nuevos datos
  }

  /*
*********************************************************************************************************************************
 recibo datos del componente hijo, es decir, el componente modal generar-qr. event es true y ocultamos el modal del formulario qr
**********************************************************************************************************************************
*/

recibirDatosdeMA2(event: boolean) {
  if (event) {
    this.showModalGenerarCodigoQR = false; // Ocultamos el modal del formulario qr
}
}




/*
*********************************************************************************************************************************
recibo datos del componente hijo: editar-soldadura
**********************************************************************************************************************************
*/

recibirDatosdelHijoEditarSoldadura(event: boolean) {

  this.showModalEditarSoldadura = false; // Ocultamos el modal del formulario editar soldadura

}


/*
******************************************************************************************************************
rdgqr = recibo datos del componente hijo, es decir, el componente modal generar-qr
******************************************************************************************************************
*/

rdgqr(event: number) {
  if (event) {
    console.log('Se recibieron los datos del componente hijo',event);
  }
  this.showModalGenerarCodigoQR = false; // Ocultar el componente modal
  //this.fetchSoldaduras(); // Recarga la tabla con los nuevos datos
}

/*
******************************************************************************************************************
este código abre un cuadro de diálogo de confirmación utilizando Angular Material, pasando un mensaje, un texto
para el botón y un identificador asociado a la Soldadores que se desea eliminar. Este enfoque es útil para encapsular
la lógica del cuadro de diálogo en un componente separado (BoxDialogComponent).
********************************************************************************************************************
*/

openConfirmDialog(id: string): void {
  const dialogRef = this.dialog.open(BoxDialogComponent, {
    width: '250px',
    data: {
      message: '¿Deseas eliminar esta Soldadores?',
      buttonText: 'Eliminar',
      id: id,
    },
  });

  /*
**********************************************************************************************
Este código proporciona una estructura básica para manejar los resultados después de cerrar
un diálogo y realizar acciones específicas en este caso eliminar una Soldadores o no.
************************************************************************************************
*/

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.confirmed) {
      // El usuario hizo clic en "Eliminar", así que se eliminará el registro de la Soldadores
      this.onDeleteSoldadura(result.id);
    } else {
      // El usuario hizo clic en "Cancelar" o cerró el cuadro de diálogo
      this.openSnackBar('Eliminación cancelada', 'Cerrar');
    }
  });
}


 /*
********************************************************************
Metodo para des suscribirnos del servicio
********************************************************************
*/

ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}

}
