import { Component, OnInit } from '@angular/core';
import { PessoaService, pessoaFiltro } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.scss']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas: any[] = [];
  filtro = new pessoaFiltro();

  constructor(private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private auth:AuthService) { }

  ngOnInit(){
    this.title.setTitle('Pesquisa de Pessoa')
  }

  pesquisar(pagina: number = 0): void {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then((dados: any) => {
        this.pessoas = dados.pessoas;        
      })
      .catch((error) => this.errorHandler.handle(error));

  }

  temPermissao(permissao: string) {
    return this.auth.temPermissao(permissao);
  }

}
