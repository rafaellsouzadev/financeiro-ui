import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

export class pessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 4;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl!: string;


  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`
   }

  pesquisar(filtro: pessoaFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then((response: any) => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      })

  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {    

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

  listarTodas(): Promise<any> {    
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then((response: any) => response['content'])

  }

  excluir(codigo: number): Promise<any> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()     
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise();

  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()     
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()      
      .append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
      .toPromise();
  }
  

}
