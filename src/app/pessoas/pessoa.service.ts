import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../cor/model';

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
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj');

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

  listarTodas(): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj');

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then((response: any) => response['content'])

  }

  excluir(id: number): Promise<any> {

    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj');

    return this.http.delete(`${this.pessoasUrl}/${id}`, { headers })
      .toPromise()

  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers })
      .toPromise();
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj')
      .append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
      .toPromise();
  }



}
