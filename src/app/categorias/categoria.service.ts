import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = "http://localhost:8080/categorias";

  categorias?: any = [];

  constructor(private http: HttpClient) { }

  listarCategoria() : Promise<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj');

    return this.http.get(`${this.categoriasUrl}`, { headers })
    .toPromise();

  }
}
