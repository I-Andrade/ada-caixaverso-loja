import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth-interceptor';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_PROVIDER } from './core/constants/app-const';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlPtBr } from './core/config/mat-paginator-pt-br';
import { MatTooltipModule } from '@angular/material/tooltip';

registerLocaleData(localePt);

@NgModule({
  declarations: [App, Header, Footer],
  imports: [BrowserModule, AppRoutingModule, MatButtonModule, MatTooltipModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    LOCALE_PROVIDER,
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
  ],
  bootstrap: [App],
})
export class AppModule {}
