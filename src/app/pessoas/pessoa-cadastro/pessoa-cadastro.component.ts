import { Component, OnInit } from '@angular/core';
import { Pessoa } from 'src/app/core/model';
import { NgForm } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';

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
    private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Pessoa')
  }


  salvar(pessoaForm: NgForm) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });
      console.log(this.pessoa);
      pessoaForm.reset();
      this.pessoa = new Pessoa();
    })
    .catch(error => this.erroHandler.handle(error));
  }

}
