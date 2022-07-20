import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

 pessoa = new Pessoa();


  constructor(private pessoaService: PessoaService,
    private erroHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) {
  }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo']
    console.log(codigoPessoa);

    if (codigoPessoa) {
      this.carregarPessoas(codigoPessoa);
    };

    this.title.setTitle('Cadastro de Pessoa')
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: NgForm) {
    this.pessoaService.salvar(this.pessoa)
      .then((pessoaAdicionada:Pessoa) => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  atualizarPessoa(form: NgForm) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
        this.atualizarTituloEdicao();
        this.router.navigate(['/pessoas'])
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  carregarPessoas(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(response => {
      this.pessoa = response;
      this.atualizarTituloEdicao();
    })
      ;
  }

  atualizarTituloEdicao(){
    this, this.title.setTitle(`Edição de pessoa ${this.pessoa.nome}`)
  }

}
