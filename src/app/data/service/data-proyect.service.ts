import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentDataProyect } from '../../../commons/environments/environments.dataProyect'

@Injectable({
  providedIn: 'root'
})
export class DataProyectService {

  constructor(private http: HttpClient) { }


  uploadFile(file: File): Observable<any> {

   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   //const body = { filePath: filePath };
   // return this.http.post<any>(environmentDataProyect.apiUrl, body, { headers: headers });

   const formData: FormData = new FormData();
    formData.append('File', file, file.name);
    return this.http.post<any>(environmentDataProyect.apiUrl, formData);
  }
}

/*
uploadFile(file: File): Este método toma un archivo (file) de tipo File como argumento.
: Observable<any>: El método retorna un Observable de tipo any, que será el resultado de la solicitud HTTP POST.
Creación de FormData
const formData: FormData = new FormData(): Crea una nueva instancia de FormData. FormData es una interfaz que proporciona una forma de construir conjuntos de pares clave/valor representando campos de formulario y sus valores, que luego se pueden enviar fácilmente usando XMLHttpRequest o el método fetch.
formData.append('file', file, file.name): Agrega el archivo al FormData con la clave 'file', el archivo (file) y el nombre del archivo (file.name). Esto prepara los datos para ser enviados en una solicitud HTTP POST como si fueran enviados por un formulario HTML.
Envío de la Solicitud HTTP POST
return this.http.post<any>(environmentDataProyect.apiUrl, formData): Envía una solicitud HTTP POST al endpoint especificado por environmentDataProyect.apiUrl, con el FormData que contiene el archivo como cuerpo de la solicitud.
this.http.post<any>: Utiliza el servicio HttpClient de Angular para realizar la solicitud POST.
<any>: Indica que la respuesta esperada de la solicitud HTTP puede ser de cualquier tipo.
environmentDataProyect.apiUrl: Es la URL del endpoint de la API a la que se está enviando la solicitud. Este valor normalmente se configura en el archivo de entorno de Angular (environment.ts o environment.prod.ts).
formData: Es el cuerpo de la solicitud que contiene el archivo.
*/
