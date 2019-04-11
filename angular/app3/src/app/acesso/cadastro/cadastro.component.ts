import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/auth.service';

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

  public exibirPainelLogin() {
    this.exibirPainel.emit('login')
  }

  public exibirMsgErro() {
    console.log('###################  ATUALIZAR INTERFACE COM ERRO NO CADASTRO  ###################')
  }

  public cadastrarButtonClick() {
    let usuario = new Usuario(
      'tiago1@gmail.com',
      '123456',
      'tiago2',
      'tiago batista1'
    )

    this.authenticator.cadastrarUsuario(usuario).then(
      (sucesso: boolean) => {
        if (sucesso) {
          this.exibirPainelLogin()
        } else {
          this.exibirMsgErro()
        }
      }
    )
  }

}
