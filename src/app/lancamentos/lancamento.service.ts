import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../cor/error-handler.service';
import { Lancamento } from '../cor/model';
import * as moment from 'moment';


export class LancamentoFiltro {
  descricao?: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient,
    private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj');

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'dd/MM/yyyy')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'dd/MM/yyyy')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content']

        const resultado = {
          lancamentos,
          total: response['totalElements']
        };

        return resultado;
      })

  }

  excluir(id: number): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj');

    return this.http.delete<void>(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj')
      .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(`${this.lancamentosUrl}`, Lancamento.toJson(lancamento), { headers })
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj')
      .append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.id}`, lancamento, { headers })
      .toPromise();

  }

  buscarPorId(id: number): Promise<Lancamento> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic cmFmYWVsLXNvdXphNEBvdXRsb29rLmNvbTpPdmVybG9yZDNyMmIj')
      .append('Content-Type', 'application/json');

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${id}`, { headers })
      .toPromise()
      .then((response: Lancamento) => {
        
        return response;
      });
  }

  private converterStringsParaDatas(lancamentos: any[]) {

    for (const lancamento of lancamentos) {

      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'DD/MM/YYYY').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'DD/MM/YYYY').toDate();
      }
    }
  }


}
