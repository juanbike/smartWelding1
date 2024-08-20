import { Component, inject,  OnDestroy, OnInit, viewChild } from '@angular/core';
import { JuntaService } from '../junta.service';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
//modulos de angular material
import {
  MatTableModule,
  MatTableDataSource,
  MatTable,
} from '@angular/material/table'; //tabla
import { MatButtonModule } from '@angular/material/button'; //botones
import { MatIconModule } from '@angular/material/icon'; //iconos
import { MatPaginator } from '@angular/material/paginator'; //paginador
import { MatPaginatorModule } from '@angular/material/paginator'; //paginador
import { MatFormFieldModule } from '@angular/material/form-field'; //formulario
import { MatInputModule } from '@angular/material/input'; //input
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort'; //ordenamiento
import { MatMenuModule } from '@angular/material/menu'; //menu
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog'; //Cuadro de dialogo
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

export interface Junta {
  linea: string;
  especificacion: string;
}

const ELEMENT_DATA: Junta[] = [{ linea: '', especificacion: '' }];
@Component({
  selector: 'app-junta-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTable,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatInputModule,
    MatSort,
    MatCardModule,
    MatOption,
    MatSelect,
    FormsModule
  ],
  templateUrl: './junta-create.component.html',
  styleUrl: './junta-create.component.scss',
})
export class JuntaCreateComponent implements OnInit, OnDestroy {

  junta1Form!: FormGroup;
  subscription: any; //Variable para controlar la subscripcion a los datos
  //proyectos = []; //Variable para almacenar los proyectos
  proyectos1!: Subscription; //Variable para controlar la subscripcion a los datos de los proyectos en tiempo real de la base de datos
  proyectos: string[] = []; //Variable para almacenar los proyectos

  inspectores: string[] = []; //Variable para almacenar los inspectores
  inspectores1!: Subscription; //Variable para controlar la subscripcion a los datos de los inspectores en tiempo real de la base de datos

  soldadores: string[] = []; //Variable para almacenar los soldadores
  soldadores1!: Subscription; //Variable para controlar la subscripcion a los datos de los soldadores en tiempo real de la base de datos

  lineas: string[] = []; //Variable para almacenar las lineas
  lineas1!: Subscription; //Variable para controlar la subscripcion a los datos de las lineas en tiempo real de la base de datos

  especificaciones: string[] = []; //Variable para almacenar las especificaciones
  especificaciones1!: Subscription; //Variable para controlar la subscripcion a los datos de las especificaciones en tiempo real de la base de datos


  selectedProyecto: string | undefined; //Variable para seleccionar el proyecto
  selectedInspector: string | undefined; //Variable para seleccionar el inspector
  selectedSoldador: string | undefined; //Variable para seleccionar el soldador
  selectedLinea: string | undefined; //Variable para seleccionar la linea
  selectedEspecificacion: string | undefined; //Variable para seleccionar la especificacion


  juntas = [{ linea: null, especificacion: null }]; // Inicializar con una fila
  displayedColumns: string[] = ['linea', 'especificacion'];
  dataSource = [...ELEMENT_DATA];

  //@viewChild(MatTable) table!: MatTable<Junta>;


  addRow() {
    this.juntas.push({ linea: null, especificacion: null });
  }

  removeRow() {
    if (this.juntas.length > 0) {
      this.juntas.pop();
    }
  }

  onSubmit() {
    // Lógica para enviar los datos al servidor
    console.log('Juntas:', this.juntas);
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


  // Método para manejar las teclas Insert y Delete
/*
  handleKeyboardEvent(event: Event | undefined, KeyboardEvent: { new(type: string, eventInitDict?: KeyboardEventInit): KeyboardEvent; prototype: KeyboardEvent; readonly DOM_KEY_LOCATION_STANDARD: 0; readonly DOM_KEY_LOCATION_LEFT: 1; readonly DOM_KEY_LOCATION_RIGHT: 2; readonly DOM_KEY_LOCATION_NUMPAD: 3; }, event: KeyboardEvent) {
    if (event.key === 'Insert') {
      this.addRow();
    } else if (event.key === 'Delete') {
      this.removeRow();
    }
  }
    */
  constructor(private juntaService: JuntaService = inject(JuntaService),
    private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    // Aquí puedes cargar los datos de los proyectos, inspectores, etc.

    this.proyectos1 = this.juntaService.fechProjects().subscribe((data) => {
      this.proyectos = data.map((proyecto) => proyecto.proyecto);
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al cargar los datos de proyectos de la base de datos', 'Cerrar');
    });
    this.inspectores1 = this.juntaService.fechInspectors().subscribe((data) => {
      this.inspectores = data.map((inspector) => inspector.nombre);
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al cargar los datos de inspectores de la base de datos', 'Cerrar');
    });

    this.soldadores1 = this.juntaService.fechSoldadores().subscribe((data) => {
      this.soldadores = data.map((soldador) => soldador.nombre);
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al cargar los datos de soldadores de la base de datos', 'Cerrar');
    });

   this.lineas1 = this.juntaService.fechLinea().subscribe((data) => {
      this.lineas = data.map((linea) => linea.linea);
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al cargar los datos de soldadores de las líneas de la base de datos', 'Cerrar');
    }
  );

    this.especificaciones1 = this.juntaService.fechEspecificacion().subscribe((data) => {
      this.especificaciones = data.map((especificacion) => especificacion.especificacion);
    },
    (error: HttpErrorResponse) => {
      this.openSnackBar('Error al cargar los datos de las especificaciones  de la base de datos', 'Cerrar');
    }
    );


    // Escuchar eventos de teclado


    /*
    if (typeof window !== 'undefined') {
    window.addEventListener('keydown', (event) =>
      this.handleKeyboardEvent(event)
    );
    }
    */
     // crea un formgroup
  this.junta1Form = new FormGroup({
    proyecto: new FormControl(''),
    inspector: new FormControl(''),
    soldador: new FormControl(''),

  });


}

  ngOnDestroy() {
    this.proyectos1.unsubscribe();
    this.inspectores1.unsubscribe();
    this.soldadores1.unsubscribe();
    this.lineas1.unsubscribe();
    this.especificaciones1.unsubscribe();
  }
}
