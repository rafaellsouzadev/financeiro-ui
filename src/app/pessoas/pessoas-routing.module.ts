import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../seguranca/auth.guard";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";
import { PessoaPesquisaComponent } from "./pessoa-pesquisa/pessoa-pesquisa.component";

const routes: Routes = [
    { 
        path: 'pessoas', 
        component: PessoaPesquisaComponent, 
        canActivate: [AuthGuard], 
        data: {roles: ['ROLE_PESQUISAR_PESSOA']} 
    },
    { 
        path: 'pessoas/novo',
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_CADASTRAR_PESSOA']}
        
    },  
    { 
        path: 'pessoas/:codigo', 
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_CADASTRAR_PESSOA']}
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PessoasRoutingModule { }