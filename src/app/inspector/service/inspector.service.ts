import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentInspector } from '../../../commons/environments/environment.inspector';

import { Inspector} from '../model/inspector.interface';



@Injectable({
  providedIn: 'root'
})
export class InspectorService {

  constructor(private http: HttpClient) { }

  allInspector: Inspector[] = [];

  // Get all inspector
  fetchInspectors(): Observable<Inspector[]> {
    return this.http.get<Inspector[]>(environmentInspector.apiUrl);
  }

  //Get inspector by id
  getInspector(id: string): Observable<Inspector> {
    return this.http.get<Inspector>(`${environmentInspector.apiUrl}/${id}`);
  }

  //Delete inspector by id
  deleteInspector(id: Number): Observable<Inspector> {
    return this.http.delete<Inspector>(`${environmentInspector.apiUrl}/${id}`);
  }

  //Add inspector
  addInspector(inspector: Inspector): Observable<Inspector> {
    return this.http.post<Inspector>(environmentInspector.apiUrl, inspector);
  }

  //Update inspector

 updateInspector(id: string, Inspector: {
  nombre: string;
  apellido: string;
  telefono1: string;
  telefono2: string;

}): Observable<Inspector> {
  const numericId = parseInt(id, 10);
  return this.http.patch<Inspector>(`${environmentInspector.apiUrl}/${numericId}`, Inspector);
}




}
