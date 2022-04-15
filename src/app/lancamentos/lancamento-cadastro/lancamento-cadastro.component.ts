import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria, Lancamento } from 'src/app/cor/model';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../cor/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ]



  categorias: any[] = [];
  pessoas: any[] = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private erroHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { };

  ngOnInit(): void {
    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    };

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
      .then(lancamento => {

        this.lancamento = lancamento;

      })
      .catch(error => this.erroHandler.handle(error));
  }

  carregarCategorias() {
    this.categoriaService.listarCategoria()
    .then(categorias => {
      this.categorias = categorias
        .map((c:any) => ({ label: c.nome, value: c.id }));
      })
      .catch((error) => this.erroHandler.handle(error));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas
        .map((p:any) => ({ label: p.nome, value: p.id }));
      })
      .catch((error) => { this.erroHandler.handle(error) });
  }

  salvar(lancamentoForm: NgForm) {
    if (this.editando) {
      this.atualizarLancamento()
    } else {
      this.adicionarLancamento(lancamentoForm)
    }
  }

  adicionarLancamento(lancamentoForm: NgForm) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

        //lancamentoForm.reset();
        //this.lancamento = new Lancamento();

        this.router.navigate(['/lancamentos'])

      })
      .catch(erro => this.erroHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamento)
    .then((lancamento:Lancamento) => {
      Lancamento.toJson(lancamento)
      this.lancamento = lancamento;        
        this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
      })
      .catch(error => this.erroHandler.handle(error));
  }

}

