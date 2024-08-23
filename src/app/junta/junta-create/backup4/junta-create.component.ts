import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { JuntaService } from '../junta.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { VisibilityService } from '../../../commons/services/visibility.service';

export interface Linea {
  name: string;
}

@Component({
  selector: 'app-junta-create',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './junta-create.component.html',
  styleUrl: './junta-create.component.scss',
})
export class JuntaCreateComponent implements OnInit, OnDestroy {
  //subscription: any; //Variable para controlar la subscripcion a los datos

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

  schedules: string[] = []; //Variable para almacenar los schedules
  schedules1!: Subscription; //Variable para controlar la subscripcion a los datos de los schedules en tiempo real de la base de datos

  textremos: string[] = []; //Variable para almacenar los textremos
  textremos1!: Subscription; //Variable para controlar la subscripcion a los datos de los textremos en tiempo real de la base de datos

  materials: string[] = []; //Variable para almacenar los materials
  materials1!: Subscription; //Variable para controlar la subscripcion a los datos de los materials en tiempo real de la base de datos

  tmaterials: string[] = []; //Variable para almacenar los tmaterias
  tmaterials1!: Subscription; //Variable para controlar la subscripcion a los datos de los tmaterias en tiempo real de la base de datos

  n0s!: string[];
  n0s1!: Subscription;
  selectedN0: string | undefined;

  n1s!: string[];
  n1s1!: Subscription;
  selectedN1: string | undefined;

  selectedProyecto: string | undefined; //Variable para seleccionar el proyecto
  selectedInspector: string | undefined; //Variable para seleccionar el inspector
  selectedSoldador: string | undefined; //Variable para seleccionar el soldador
  selectedLinea: string | undefined; //Variable para seleccionar la linea
  selectedEspecificacion: string | undefined; //Variable para seleccionar la especificacion
  selectedSchedule: string | undefined; //Variable para seleccionar el schedule
  selectedTextremo: string | undefined; //Variable para seleccionar el textremo
  selectedTmaterial: string | undefined; //Variable para seleccionar el tmaterial
  selectedMaterial: string | undefined; //Variable para seleccionar el tmaterial

  myControlLineas = new FormControl(); //Variable para el campo de búsqueda de lineas
  filteredLineas: Observable<string[]> | undefined; //Variable para almacenar las lineas filtradas

  selectedOption: string | null = null; //Variable para seleccionar la opcion de

  fb = inject(FormBuilder);
  constructor(
    private juntaService: JuntaService = inject(JuntaService),
    private snackBar: MatSnackBar,
    private visibilityService: VisibilityService
  ) {}


  juntaForm = this.fb.group({
    proyectoInfo: this.fb.group({
      proyectos: new FormControl('', Validators.required),
      inspectores: new FormControl('', Validators.required),
      soldadores: new FormControl('', Validators.required),
    }),
    juntaInfo: this.fb.array([
      this.fb.group({
        nominal0: new FormControl('', Validators.required),
        nominal1: new FormControl('', Validators.required),
        linea: new FormControl('', Validators.required),
        especificacion: new FormControl('', Validators.required),
        schedule: new FormControl('', Validators.required),
        textremo: new FormControl('', Validators.required),
        tmaterial: new FormControl('', Validators.required),
        material: new FormControl('', Validators.required),
        pcontabilizadas: new FormControl('', Validators.required),
        facpuldia: new FormControl('', Validators.required),
        puldia: new FormControl('', Validators.required),
      }),
    ]),
  });
  

  //Recuperamo juntaInfo como un FormArray
  get juntasInfoGroups() {
    return this.juntaForm.get('juntaInfo') as FormArray;
  }

  //Añadimos juntaInfo
  addJunta() {
    this.juntasInfoGroups.push(
      this.fb.group({
        nominal0: new FormControl('', Validators.required),
        nominal1: new FormControl('', Validators.required),
        linea: new FormControl('', Validators.required),
        especificacion: new FormControl('', Validators.required),
        schedule: new FormControl('', Validators.required),
        textremo: new FormControl('', Validators.required),
        tmaterial: new FormControl('', Validators.required),
        material: new FormControl('', Validators.required),
        pcontabilizadas: new FormControl('', Validators.required),
        facpuldia: new FormControl('', Validators.required),
        puldia: new FormControl('', Validators.required),
      })
    );
  }

  //Eliminamos juntaInfo
  deleteJunta(index: number) {
    this.juntasInfoGroups.removeAt(index);
  }

  //Método para enviar a la consola los valores del formualrio
  onFormSubmitted() {
    console.log(this.juntaForm.value);
  }
  ngOnInit(): void {
    //Recupera los inspectores
    this.inspectores1 = this.juntaService.fechInspectors().subscribe(
      (data) => {
        this.juntaService.allInspectors = data;
        this.inspectores = data.map((inspector) => inspector.nombre);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de inspectores de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera los proyectos
    this.proyectos1 = this.juntaService.fechProjects().subscribe(
      (data) => {
        this.juntaService.allProjects = data;
        this.proyectos = data.map((proyecto) => proyecto.proyecto);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de proyectos de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera los soldadores
    this.soldadores1 = this.juntaService.fechSoldadores().subscribe(
      (data) => {
        this.juntaService.allWelders = data;
        this.soldadores = data.map((soldador) => soldador.nombre);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de soldadores de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera las lineas
    this.lineas1 =this.juntaService.fechLinea().subscribe(
      (data) => {
        this.juntaService.allLinea = data;
        this.lineas = data.map((linea) => linea.linea);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de lineas de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera las especificaciones
    this.especificaciones1 = this.juntaService.fechEspecificacion().subscribe(
      (data) => {
        this.juntaService.allEspecificacion = data;
        this.especificaciones = data.map(
          (especificacion) => especificacion.especificacion
        );
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de especificaciones de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera las horarios
    this.schedules1 = this.juntaService.fechSchedule().subscribe(
      (data) => {
        this.juntaService.allSchedule = data;
        this.schedules = data.map((schedule) => schedule.schedule);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de horarios de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera los tipos de extremos
    this.textremos1 = this.juntaService.fechTipoExtremo().subscribe(
      (data) => {
        this.juntaService.allTipoExtremo = data;
        this.textremos = data.map((textremo) => textremo.tipoExtremo);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de tipos de extremos de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera all Material
    this.materials1 = this.juntaService.fechMaterial().subscribe(
      (data) => {
        this.juntaService.allMaterial = data;
        this.materials = data.map((material) => material.material);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de materiales de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera all TipoMaterial
   this.tmaterials1 = this.juntaService.fechTipoMaterial().subscribe(
      (data) => {
        this.juntaService.allTipoMaterial = data;
        this.tmaterials = data.map((tmaterial) => tmaterial.tipoMaterial);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de tipos de materiales de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera all TsNominal0
    this.n0s1 = this.juntaService.fechTsnominal0().subscribe(
      (data) => {
        this.juntaService.allTsNominal0 = data;
        this.n0s = data.map((tsNominal0) => tsNominal0.n0);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de tipos de niveles de la base de datos',
          'Cerrar'
        );
      }
    );
    //Recupera all TsNominal1
   this.n1s1 = this.juntaService.fechTsnominal1().subscribe(
      (data) => {
        this.juntaService.allTsNominal1 = data;
        this.n1s = data.map((tsNominal1) => tsNominal1.n1);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Error al cargar los datos de tipos de niveles de la base de datos',
          'Cerrar'
        );
      }
    );
    //se suscribe al observable visibility
    this.visibilityService.selectedOption$.subscribe(option => {
      this.selectedOption = option;
    });
  }

  //Filtra las lineas a medida que se escribe en el campo de búsqueda
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.lineas.filter((linea) =>
      linea.toLowerCase().includes(filterValue)
    );
  }

  goBack() {
    this.visibilityService.clearOption();
  }
  /* *******************************************************************
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

  ngOnDestroy() {
    console.log("junta-create component destroyed");
    this.proyectos1.unsubscribe();
    this.inspectores1.unsubscribe();
    this.soldadores1.unsubscribe();
    this.lineas1.unsubscribe();
    this.especificaciones1.unsubscribe();
    this.schedules1.unsubscribe();
    this.textremos1.unsubscribe();
    this.materials1.unsubscribe();
    this.tmaterials1.unsubscribe();
    this.n0s1.unsubscribe();
    this.n1s1.unsubscribe();

  }
}
