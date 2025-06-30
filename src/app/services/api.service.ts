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
}
