import { Component, ViewChild, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

//modulos de angular material
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table'; //tabla
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator'; //paginador
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador
import { MatFormFieldModule } from '@angular/material/form-field'; //formulario
import { MatInputModule } from '@angular/material/input'; //input
import { MatSort } from '@angular/material/sort'; //ordenamiento
import { MatMenuModule } from '@angular/material/menu'; //menu
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog'; //Cuadro de dialogo
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

//IMPORTAR EL COMPONENTE MODAL DE FORMULARIO AGREGAR MATERIAL
import { MaterialAddComponent} from './material-add/material-add.component';
//IMPORTAR EL COMPONENTE MODAL DE FORMULARIO EDITAR MATERIAL
import { MaterialEditComponent} from './material-edit/material-edit.component';
//IMPORTAMOS EL CUADRO DE DIALOGO PARA ELIMINAR MATERIAL
import { BoxDialogComponent } from '../../../commons/box-dialog/box-dialog.component';

//IMPORTAMOS EL MODELO DEL MATERIAL
import { Material } from '../model/material.interface'
//IMPORTAMOS EL SERVICIO DEL MATERIAL
import { MaterialService } from '../service/material.service'
@Component({
  selector: 'app-material-list',
  standalone: true,
  providers:[MaterialEditComponent, MaterialAddComponent],
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
    ReactiveFormsModule,
    MatCardModule,
    MaterialAddComponent,
    MaterialEditComponent
  ],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss'
})
export class MaterialListComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<Material>; // Variable dataSource para la fuente de datos de la tabla de soldadores
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Variable para el paginador
  @ViewChild(MatSort) sort!: MatSort; // Variable para el sort
  subscription : any; //Variable para controlar la subscripcion a los datos
  materials: any; // Variable para almacenar los datos de la API
  showModalAgregarInspectores: boolean = false; // Variable para controlar la visibilidad del formulario para agregar inspectores
  showModalEditarInspector: boolean = false; // Variable para controlar la visibilidad del formulario para edita inspectores
  idSoldaduraPadre: string = ''; // ID del registro que se enviará al componente hijo (modal)
  table: MatTable<any> | undefined; // Variable para la tabla de inspectores
  constructor(
    private materialService: MaterialService = inject(MaterialService), //inicializamos el servicio para la tabla de inspectores
    public dialog: MatDialog, //inicializamos el cuadro de dialogo: Eliminar Soldadores
    private snackBar: MatSnackBar, //inicializamos el snackbar para mostrar notificaciones al usuario
  ) {}

//columnas de la tabla soldadores
displayedColumns: string[] = [
  'id',
  'tipo',
  'colada',
  'schedule',
  'textremo',
  'tmaterial',
  'material',
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


//funcion para obtener todos los matriales
ngOnInit(): void {
  this.fetchMaterials();
}

/*
********************************************************************
Metodo para obtener los datos de la API y mostrarlos en la tabla
********************************************************************
*/

private fetchMaterials(): void {
  // Realiza la solicitud HTTP utilizando el servicio 'WelderService'
  this.subscription = this.materialService.fechMaterials().subscribe(
    (data) => {

      // Almacena los datos de la respuesta en la propiedad 'welders'
      this.materials = data;
      // Asigna los datos a la fuente de datos para renderizar la tabla
      this.dataSource = new MatTableDataSource(this.materials);

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
*********************************************************************************************************************************************
Metodo para filtar los datos de la tabla
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
********************************************************************
Metodo para mostrar el modal de agregar material
********************************************************************
*/

OnAddInspector(): void {
  this.showModalAgregarInspectores = true; // Mostrar el componente modal Formulario para agregar inspectores
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

  /*
*********************************************************************************************************************************
Método para mostrar un mensaje al usuario cuando desea eliminar un registro de la tabla de inspectores
**********************************************************************************************************************************
*/


openConfirmDialog(id: string): void {
  const dialogRef = this.dialog.open(BoxDialogComponent, {
    width: '250px',
    data: {
      message: '¿Deseas eliminar este Soldador?',
      buttonText: 'Eliminar',
      id: id,
    },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result && result.confirmed) {
      // El usuario hizo clic en "Eliminar", así que se eliminará el registro de inspectores
      this.onDeleteMaterial(result.id);
    } else {
      // El usuario hizo clic en "Cancelar" o cerró el cuadro de diálogo
      this.openSnackBar('Eliminación cancelada', 'Cerrar');
    }
  });
}

/*
********************************************************************
Metodo para eliminar un soldador
********************************************************************
*/

onDeleteMaterial(id: Number): void {


  this.materialService.deleteMaterial(id).subscribe(
    () => {
      this.openSnackBar('Registro eliminado', 'Cerrar');
      this.fetchMaterials(); // Recarga la tabla con los nuevos datos
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar(
        'El registro del Soldador no se encuentra',
        'Cerrar'
      );

    }
  )
}

 /*
*********************************************************************************************************************************
Metodo para mostrar el formulario modal para editar Material. (this.idSoldaduraPadre, recibe el id actual del registro Material)
*********************************************************************************************************************************
*/


OnEditMaterial(valor: string): void{
  this.showModalEditarInspector = true;
  this.idSoldaduraPadre = valor; // Asigna el ID del registro obtenido
  }

/*
*********************************************************************************************************************************
recibo datos del componente hijo: edit-Material; es decir, cuando damos click en el botón cerrar del formulario
**********************************************************************************************************************************
*/

recibirDatosdelHijoEditarSoldadura(event: boolean) {

  this.showModalEditarInspector = false; // Ocultamos el modal del formulario editar material
  this.actualizarTabla()

}

/*
********************************************************************
Actualiza toda la tabla tabla sin recargar la página
********************************************************************
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

      /*
*********************************************************************************************************************************
 recibo datos del componente hijo, es decir, cuando en el formulario addNaterial damos clic en el boton CERRAR
**********************************************************************************************************************************
*/
recibirDatosdeMA(event: boolean) {

  this.showModalAgregarInspectores = false; // Ocultar el componente modal agregar Material
  this.actualizarTabla(); // Recarga la tabla con los nuevos datos

}


 /*
********************************************************************
Metodo para mostrar el modal de agregar inspector
********************************************************************
*/

OnAddMaterial(): void {
  this.showModalAgregarInspectores = true; // Mostrar el componente modal Formulario para agregar inspectores
}



}//fin
