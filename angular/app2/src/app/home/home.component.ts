import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../acesso/services/auth.service';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ PostsService ]
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any

  constructor(private authenticator: AuthService) { }

  ngOnInit() {
    
  }

  public logoutClick() {
    this.authenticator.logout()
  }

  public atualizarTimeLine() {
    this.publicacoes.atualizarTimeLine()
  }
}
