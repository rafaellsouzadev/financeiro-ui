import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/model';

export class pessoaFiltro {
  nome?: string;
  pagina: number = 0;
  itensPorPagina: number = 4;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';


  constructor(private http: HttpClient) { }

  pesquisar(filtro: pessoaFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=');

    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }


    return this.http.get(`${this.pessoasUrl}`, { headers, params })
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
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=');     

      return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
        .toPromise();
  }

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response['content'])

  }

  excluir(codigo: number): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=')
      .append('Content-Type', 'application/json');
     
    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise();
      
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=')
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AcmFmYWVsLmNvbTpBbHVjYXJkNCM=')
      .append('Content-Type', 'application/json');

      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
        .toPromise();
  }

}
