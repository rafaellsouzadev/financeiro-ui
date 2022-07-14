import { Component, OnInit, ViewChild  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/cor/error-handler.service';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';



@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {


  filtro = new LancamentoFiltro();
  lancamentos = [];
  

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0): void {
    this.filtro.pagina =  pagina;
    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
      });
  }



}
