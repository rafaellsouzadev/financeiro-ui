import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import localePt from '@angular/common/locales/pt';
import { ErrorHandlerService } from './error-handler.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,

    ToastModule,
    ConfirmDialogModule,

  ],
  imports: [
    CommonModule,
    RouterModule,

    ToastModule,
    ConfirmDialogModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    DatePipe,
    ErrorHandlerService,

    MessageService,
    ConfirmationService,
    TranslateService
  ]
})
export class CorModule { }
