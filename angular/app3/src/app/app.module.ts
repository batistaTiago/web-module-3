import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { AuthService } from './acesso/services/auth.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { AuthGuard } from './acesso/services/auth-guard.service';
import { IncluirPostComponent } from './home/incluir-post/incluir-post.component';
import { UploadProgressService } from './services/upload-progress.service';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthService,
    UploadProgressService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
