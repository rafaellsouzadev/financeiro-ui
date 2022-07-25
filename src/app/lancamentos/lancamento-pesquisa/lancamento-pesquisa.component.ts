import { Component, OnInit, ViewChild  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';



@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.scss']
})
export class LancamentoPesquisaComponent implements OnInit {


  filtro = new LancamentoFiltro();
  lancamentos = [];
  

  constructor(private lancamentoService: LancamentoService,
              private title: Title, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos')
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina =  pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
      }).catch((error) => this.errorHandler.handle(error));
  }



}
