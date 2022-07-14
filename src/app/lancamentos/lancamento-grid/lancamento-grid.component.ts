import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LancamentoPesquisaComponent } from '../lancamento-pesquisa/lancamento-pesquisa.component';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../../cor/error-handler.service';



@Component({
  selector: 'app-lancamento-grid',
  templateUrl: './lancamento-grid.component.html',
  styleUrls: ['./lancamento-grid.component.css']
})
export class LancamentoGridComponent implements OnInit {

  totalRegistros = 0;

  filtro = new LancamentoFiltro();

  @Input() lancamentos: any = [];
  @ViewChild('tabela') grid!: Table;

  constructor(private lancamentoService: LancamentoService,
    private pesquisa: LancamentoPesquisaComponent,
    private messageService: MessageService,
    private confimationService: ConfirmationService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit(): void {

  }



  aoMudarPagina(event: LazyLoadEvent) {
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        const pagina = event.first! / event.rows!;
        this.pesquisa.pesquisar(pagina);
      });

  }

  confirmaExclusao(lancamento: any) {
    this.confimationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisa.pesquisar();
        } else {
          this.grid.reset();
        }

        this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!' })
      })
      .catch((error) => this.errorHandler.handle(error));

  }

}
