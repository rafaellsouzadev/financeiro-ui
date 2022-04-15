
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CorModule } from './cor/cor.module';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoaPesquisaComponent } from './pessoas/pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';


const routes: Routes = [
  { path: 'lancamentos', component: LancamentoPesquisaComponent},
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent},
  { path: 'lancamentos/:id', component: LancamentoCadastroComponent},
  { path: 'pessoas', component: PessoaPesquisaComponent},
  { path: 'pessoas/novo', component: PessoaCadastroComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    CorModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
