import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from './model/proyecto.interface';
import { Inspector } from './model/inspector.interface';
import { environmentProyecto } from '../../commons/environments/environment.proyecto';
import { environmentInspector } from '../../commons/environments/environment.inspector';
import { environmentSoldador } from '../../commons/environments/environmet.soldadores';
import { Welder } from '../welder/model/welder.interface';
import { environmentLinea } from '../../commons/environments/environment.linea';
import { Linea } from '../tsData/model/linea.interface';
import { Especificacion } from '../tsData/model/especificacion.interface';
import { environmentEspecificacion } from '../../commons/environments/environment.especificacion';
import { Schedule } from '../tsData/model/schedule.interface';
import { environmentTsSchedule } from '../../commons/environments/environment.tsSchedule';
import { TipoExtremo } from '../tsData/model/tipoextremo.interface';
import { environmentTipoExtremo } from '../../commons/environments/environment.tipoextremo';
import { Material } from '../tsData/material.interface';
import { environmentMaterial } from '../../commons/environments/environment.material';
import { TipoMaterial } from '../tsData/model/tipomaterial.interface';
import { environmentTipoMaterial } from '../../commons/environments/environment.tipomaterial';
import { N0 } from '../tsData/model/n0.interface';
import { environmentTsN0 } from '../../commons/environments/environment.n0';
import { N1 } from '../tsData/model/n1.interface';
import { environmentTsN1 } from '../../commons/environments/environment.n1';


@Injectable({
  providedIn: 'root'
})
export class JuntaService {

  constructor(private http: HttpClient) { }
  allInspectors: Inspector[] = [];
  allProjects: Proyecto[] = [];
 allLinea: Linea[] = [];
  allEspecificacion: Especificacion[] = [];
  allSchedule: Schedule[] = [];
  allTipoExtremo: TipoExtremo[] = [];
  allMaterial: Material[] = [];
  allTipoMaterial: TipoMaterial[] = [];
  allTsNominal0: N0[] = [];
  allTsNominal1: N1[] = [];
  
  allWelders: Welder[] = [];



  //Get all Inspectors
  fechInspectors():Observable<Inspector[]>{
    return this.http.get<Inspector[]>(environmentInspector.apiUrl)
  }
  //get all projects
  fechProjects():Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(environmentProyecto.apiUrl)
  }

  //Get all soldadores
  fechSoldadores():Observable<Welder[]>{
    return this.http.get<Welder[]>(environmentSoldador.apiUrl)
  }

  //Get all linea
  fechLinea():Observable<Linea[]>{
    return this.http.get<Linea[]>(environmentLinea.apiUrl)
  }


  //Get all especificacion
  fechEspecificacion():Observable<Especificacion[]>{
    return this.http.get<Especificacion[]>(environmentEspecificacion.apiUrl)
  }

  //Get all Schedule
  fechSchedule():Observable<Schedule[]>{
    return this.http.get<Schedule[]>(environmentTsSchedule.apiUrl)
  }

  //Gel all TipoExtremo
  fechTipoExtremo():Observable<TipoExtremo[]>{
    return this.http.get<TipoExtremo[]>(environmentTipoExtremo.apiUrl)
  }

//Get all Material
  fechMaterial():Observable<Material[]>{
    return this.http.get<Material[]>(environmentMaterial.apiUrl)
  }

  //Get all TipoMaterial
  fechTipoMaterial():Observable<TipoMaterial[]>{
    return this.http.get<TipoMaterial[]>(environmentTipoMaterial.apiUrl)
  }

  //Get all Tsnominal0
  fechTsnominal0():Observable<N0[]>{
    return this.http.get<N0[]>(environmentTsN0.apiUrl)
  }

  //Get all Tsnominal1
  fechTsnominal1():Observable<N1[]>{
    return this.http.get<N1[]>(environmentTsN1.apiUrl)
  }

}
