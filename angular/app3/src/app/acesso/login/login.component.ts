import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticator: AuthService) { }

  ngOnInit() {
  }

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro')
  }

  public loginButtonClick() {
    let usuario = new Usuario('tiago1@gmail.com', '123456')
    this.authenticator.autenticarUsuario(usuario)
  }

}
