import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

import * as firebase from 'firebase'
import { AuthService } from '../../acesso/services/auth.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public publicacoes: Array<any> = []

  constructor(
    private authenticator: AuthService,
    private postsService: PostsService
    ) { 
  }

  private email: string = ''

  public atualizarTimeLine() {
    this.postsService.getPublicacoes(this.email)
      .then(
        (publicacoes: any) => {
          this.publicacoes = publicacoes
        }
      )
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user: any) => {
        if (user) {
          this.email = user.email
          this.atualizarTimeLine()
        } else {
          this.email = undefined
        }
      }
    )
  }

}
