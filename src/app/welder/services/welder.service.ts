import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Welder } from '../model/welder.interface';
import { environmentWelder } from '../../../commons/environments/environment.welder';

@Injectable({
  providedIn: 'root'
})
export class WelderService {

  constructor(private http: HttpClient) { }
  allWelder: Welder[] = [];

  // Get all welder
  fetchWelders(): Observable<Welder[]> {
    return this.http.get<Welder[]>(environmentWelder.apiUrl);
  }

 //Get welder by id
 getWelder(id: string): Observable<Welder> {
  return this.http.get<Welder>(`${environmentWelder.apiUrl}/${id}`);
}

//Delete welder by id
deleteWelder(id: Number): Observable<Welder> {
  return this.http.delete<Welder>(`${environmentWelder.apiUrl}/${id}`);
}

//Add welder
addWelder(welder: Welder): Observable<Welder> {
  return this.http.post<Welder>(environmentWelder.apiUrl, welder);
}


  //Update inspector

  updateWelder(id: string, Welder: {
    nombre: string;
    apellido: string;
    identificacion: string;
    valores: string;
    estampa: string;
    calificacion: string;
    basemetal: string;
    numerop: string;
    telefono: string;
    email: string;
   }): Observable<Welder> {
    const numericId = parseInt(id, 10);
    return this.http.patch<Welder>(`${environmentWelder.apiUrl}/${numericId}`, Welder);
  }



}
