import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl!: string;

  categorias?: any = [];

  constructor(private http: HttpClient) { 
    this.categoriasUrl = `${environment.apiUrl}/categorias`
  }

  listarTodas(): Promise<any> {   
    return this.http.get(this.categoriasUrl)
      .toPromise();
  }
}
