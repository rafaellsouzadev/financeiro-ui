import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';
import { environment } from 'src/environments/environment';



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

  lancamentosUrl!: string;
  
  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    private errorHandler: ErrorHandlerService) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
     }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams()
      .set('page', filtro.pagina)
      .set('size', filtro.itensPorPagina);


    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
      .toPromise()
      .then((response: any) => {
        const lancamentos = response['content'];


        const resultado = {
          lancamentos,
          total: response['totalElements']
        };

        return resultado;

      }).catch((error) => this.errorHandler.handle(error));
  }

  excluir(codigo: number): Promise<void> {    
    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new HttpHeaders()    
      .append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento, { headers })
      .toPromise();
  }

  atualizar(lancamento: Lancamento): Observable<any> {
    const headers = new HttpHeaders({"Content-Type": "application/json" });
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new HttpHeaders()     
      .append('Content-Type', 'application/json');

    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then((response: Lancamento) => {
        const dados = response;
        this.converterStringsParaDatas([dados]);
        return dados;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      //Evita bug na hora da edição, adiciona o timezone do usuário
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }


}
