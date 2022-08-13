import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";

import { LoginFormComponent } from "./login-form/login-form.component";
import { SegurancaRoutingModule } from "./seguranca-routing.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MoneyHttpInterceptorService } from "./money-http-interceptor.service";
import { AuthGuard } from "./auth.guard";
import { environment } from "src/environments/environment";

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}


@NgModule({
    declarations: [
        LoginFormComponent
    ],
    imports: [
      JwtModule.forRoot({
        config: {
          tokenGetter,
          allowedDomains: environment.tokenAllowedDomains,
          disallowedRoutes: environment.tokenDisallowedRoutes
        }
      }),
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,

        InputTextModule,
        ButtonModule,

        SegurancaRoutingModule
    ],
    providers: [JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptorService,
      multi: true
    },
    AuthGuard
    ]
})
export class SegurancaModule { }