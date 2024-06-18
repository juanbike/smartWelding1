import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Soldadura } from '../model/brazingInterface';
import { environment } from '../../../commons/environments/environments';


@Injectable({
  providedIn: 'root',

})
export class BrazingService {

  allSoldadura: Soldadura[] = []; //listado de soldaduras

  constructor(private http: HttpClient) {}

  unsubscribe() {
    throw new Error('Method not implemented.');
  }

  // Get all soldadores
  fetchSoldadura(): Observable<Soldadura[]> {
    return this.http.get<Soldadura[]>(environment.apiUrl);
  }

  //Get by id
  getSoldadura(id: string): Observable<Soldadura> {
    return this.http.get<Soldadura>(`${environment.apiUrl}/${id}`);
  }

  //Delete Soldador by id
  onDeleteSoldadura(id: string): Observable<Soldadura> {
    return this.http.delete<Soldadura>(`${environment.apiUrl}/${id}`);
  }

  //Crea la Soldadura

  onCreateSoldadura(Soldadura: {
    nro_junta: string;
    tipo: string;
    plano: string;
    hoja: string;
    revision: string;
    area: string;
    fase: string;
    linea: string;
    diametro: string;
    espesor: string;
    cedula: string;
    pn1: string;
    pn2: string;
    wps: string;


  }): Observable<Soldadura> {
    {
      return this.http.post<Soldadura>(environment.apiUrl, Soldadura);
    }
  }


   //Actualiza  Soldadura

   onUpdateSoldadura(id: string, Soldadura: {
    nro_junta: string;
    tipo: string;
    plano: string;
    hoja: string;
    revision: string;
    area: string;
    fase: string;
    linea: string;
    diametro: string;
    espesor: string;
    cedula: string;
    pn1: string;
    pn2: string;
    wps: string;


  }): Observable<Soldadura> {
    return this.http.put<Soldadura>(`${environment.apiUrl}/${id}`, Soldadura);
  }

}
