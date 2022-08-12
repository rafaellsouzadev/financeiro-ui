import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = "http://localhost:8080/categorias";

  categorias?: any = [];

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {   
    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
