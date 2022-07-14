import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lancamento } from 'src/app/cor/model';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../cor/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamento: Lancamento = new Lancamento();

  categorias: any[] = [];
  pessoas: any[] = []

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];


  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    };

    this.carregarCategorias()
    this.carregarPessoas()
    this.title.setTitle('Novo Lançamento');
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {

        this.lancamento = lancamento;
        console.log(lancamento);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map((c: any) => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
          .map((p: any) => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        form.reset();
        this.lancamento = new Lancamento();

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(form: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        //lancamentoForm.reset();
        //this.lancamento = new Lancamento();

        this.router.navigate(['/lancamentos'])

      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamento)
      .subscribe((response: any) => {

        this.lancamento = response;
        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
        this.router.navigate(['/lancamentos'])
      },
        (error: any) => {
          this.errorHandler.handle(error);
        }
      );
  }

  novo(lancamentoForm: NgForm) {
    lancamentoForm.reset();

    setTimeout(() => {
      this.lancamento = new Lancamento();
    }, 1);

    this.router.navigate(['/lancamentos/novo'])
  }

  atualizarTituloEdicao() {
    this, this.title.setTitle(`Edição de Lançamento ${this.lancamento.descricao}`);
  }

}

