import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { pessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/api';
import { PessoaPesquisaComponent } from '../pessoa-pesquisa/pessoa-pesquisa.component';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent implements OnInit {

  totalRegistros = 0;

  @Input() pessoas:any = [];
  @ViewChild('tabela') grid!: Table;

  filtro = new pessoaFiltro();

  constructor(private pessoaService: PessoaService,
             private pessoaPesquisa: PessoaPesquisaComponent,
             private confimationService: ConfirmationService,
             private messageService: MessageService,
             private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
  }

  aoMudarPagina(event: LazyLoadEvent) {
    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        const pagina = event!.first! / event!.rows!;
        this.pessoaPesquisa.pesquisar(pagina);

      })
      .catch((error) => this.errorHandler.handle(error));;
  }

  confirmaExclusao(pessoa: any) {
    this.confimationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pessoaPesquisa.pesquisar();
      } else {
        this.grid.reset();
      }
      this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' })
    })
    .catch((error) => this.errorHandler.handle(error));
  }

  mudarStatus(pessoa: any) : void {
    const novoStatus = !pessoa.ativo

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada'
      pessoa.ativo = novoStatus;
      this.messageService.add({ severity: 'success', detail: `pessoa ${acao} com sucesso!`});

    })
    .catch((error) => this.errorHandler.handle(error));
  }

}
