import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/auth.service';
import { FeedbackAuth } from '../models/feedback-auth.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private authenticator: AuthService) { }

  ngOnInit() {
  }

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public nomeUsuario: string = null
  public email: string = null
  public nomeCompleto: string = null
  public senha: string = null
  public confirmacao: string = null


  public atualizarNomeUsuario(novoNomeUsuario: string) {
    this.nomeUsuario = novoNomeUsuario
  }

  public atualizarEmail(novoEmail: string) {
    this.email = novoEmail
  }

  public atualizarNomeCompleto(novoNomeCompleto: string) {
    this.nomeCompleto = novoNomeCompleto
  }

  public atualizarSenha(novaSenha: string) {
    this.senha = novaSenha
  }

  public atualizarConfirmacao(novaConfirmacao: string) {
    this.confirmacao = novaConfirmacao
  }

  public nomeUsuarioValido(): boolean {
    return this.nomeUsuario != '' && this.nomeUsuario != null
  }

  public emailValido(): boolean {
    return this.email != '' && this.email != null
  }

  public nomeCompletoValido(): boolean {
    return this.nomeCompleto != '' && this.nomeCompleto != null
  }

  public senhaValida(): boolean {
    return (this.senha != '' && this.senha != null) && (this.senha == this.confirmacao)
  }

  public formValido() {
    return (this.nomeUsuarioValido() &&
      this.emailValido() &&
      this.nomeCompletoValido() &&
      this.senhaValida())
  }

  public exibirPainelLogin() {
    this.exibirPainel.emit('login')
  }

  public exibirMsgErro(local: boolean, descricao: string = '') {
    console.log('###################  ATUALIZAR INTERFACE COM ERRO NO CADASTRO  ###################')

    if (local) {
      if (!this.emailValido()) {
        console.log('email invalido')
        console.log(this.email)
      }
      if (!this.nomeUsuarioValido()) {
        console.log('nome usuario invalido')
        console.log(this.nomeUsuario)
      }
      if (!this.nomeCompletoValido()) {
        console.log('nome invalido')
        console.log(this.nomeCompleto)
      }
      if (!this.senhaValida()) {
        console.log('senha invalida')
        console.log(this.senha)
      }
    } else if (descricao != '') {
      console.log(descricao)
    } else {
      // fatal error
      console.log('### FATAL ERROR ###')
    }

  }

  public cadastrarButtonClick() {

    if (this.formValido()) {
      let usuario = new Usuario(
        this.email,
        this.senha,
        this.nomeUsuario,
        this.nomeCompleto,
        [this.email]
      )
      this.authenticator.cadastrarUsuario(usuario)
        .then(
          (resposta: any) => {
            //sucesso
            this.exibirPainelLogin()
          }
        )
        .catch(
          (error: any) => {
            //erro ao cadastrar no backned
            this.exibirMsgErro(false, error.message)
          }
        )
    } else {
      this.exibirMsgErro(true)
    }

  }

}
