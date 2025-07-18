import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Credentials': 'true'
  });

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAll(collection: string){
    return this.http.get<any>(encodeURI(this.baseUrl + collection), { headers: this.headers });
  }
  getAllByCasa(collection: string) {
    return this.http.get<any>(`${this.baseUrl}${collection}/${environment.casa}`, { headers: this.headers });
  }
  post(collection: string, body: any) {
    return this.http.post<any>(`${this.baseUrl}${collection}`, body, {
      headers: this.headers
    });
  }
  put(collection: string, body: any) {
    return this.http.put<any>(`${this.baseUrl}${collection}`, body, {
      headers: this.headers
    });
  }
  delete(collection: string, id: number) {
    return this.http.delete<any>(`${this.baseUrl}${collection}/${id}`, {
      headers: this.headers
    });
  }

  
  ///////////////////////////////////////////
  // Custom methods for specific endpoints //
  ///////////////////////////////////////////
  
  getDetallePropuesta(id: number) {
    return this.http.get<any>(`${this.baseUrl}propuesta/detalle-completo/${id}`, {
      headers: this.headers
    });
  }

  

}
