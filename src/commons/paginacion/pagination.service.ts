import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Junta_interface } from '../../app/brazing/model/juntas';
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private apiUrl="http://localhost:3500/api/juntas";

  constructor(private http: HttpClient) {} // Inject HttpClient

  getPagedData(page: number, pageSize: number): Observable<Junta_interface> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Junta_interface>(`${this.apiUrl}/api/paginacion`, { params });
  }



}
