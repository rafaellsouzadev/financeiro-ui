import { Component, OnInit } from '@angular/core';
import { PessoaService, pessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from '../../cor/error-handler.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas: any[] = [];
  filtro = new pessoaFiltro();

  constructor(private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(){

  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then((dados: any) => {
        this.pessoas = dados.pessoas;        
      })
      .catch((error) => this.errorHandler.handle(error));;

  }

}
