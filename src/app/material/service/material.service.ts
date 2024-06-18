import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../model/material.interface';
import{ environmentMaterial } from '../../../commons/environments/environment.material'

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }
  allMaterials: Material[] = [];

  //Get all Materials
  fechMaterials():Observable<Material[]>{
    return this.http.get<Material[]>(environmentMaterial.apiUrl)
  }

  //Get Material by if
  getMaterial(id: string): Observable<Material> {
    return this.http.get<Material>(`${environmentMaterial.apiUrl}/${id}`);
  }

  //Delete material by id
deleteMaterial(id: Number): Observable<Material> {
  return this.http.delete<Material>(`${environmentMaterial.apiUrl}/${id}`);
}

//Add welder
addMaterial(welder: Material): Observable<Material> {
  return this.http.post<Material>(environmentMaterial.apiUrl, welder);
}

 //Update Material

 updateMaterial(id: string, Material: {
  tipo: string;
  colada: string;
  schedule: string;
  textremo: string;
  tmaterial: string;
  material: string;

 }): Observable<Material> {
  const numericId = parseInt(id, 10);
  return this.http.patch<Material>(`${environmentMaterial.apiUrl}/${numericId}`, Material);
}


}//fin
