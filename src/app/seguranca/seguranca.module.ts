import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

import { LoginFormComponent } from "./login-form/login-form.component";
import { SegurancaRoutingModule } from "./seguranca-routing.module";

@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
        JwtModule.forRoot({
            config: {
              tokenGetter: () => {
                return '';
              }
            }
          }),
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,

        InputTextModule,
        ButtonModule,

        SegurancaRoutingModule
    ]
})
export class SegurancaModule { }