import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-70px, 0)'
        }),
        animate('500ms ease-in-out')
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(+70px, 0)'
        }),
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public cadastro: boolean = false
  public estadoCriado: string = 'criado'

  public exibirPainel(parametro: string) {
    $('#painel').fadeOut(500, () => {
      this.cadastro = parametro === 'cadastro' ? true : false
      $('#painel').fadeIn(500)
    })
    
  }

  constructor(
    private authenticator: AuthService
  ) { }

  ngOnInit() {
  }

}
