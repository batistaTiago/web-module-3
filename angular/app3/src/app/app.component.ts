import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app3';
  
  ngOnInit(): void {
    var config = {
      apiKey: "AIzaSyAgnTMh0MgMpz7xxwwIgcF60HrmjIEGzJ0",
      authDomain: "bt-instagram-clone.firebaseapp.com",
      databaseURL: "https://bt-instagram-clone.firebaseio.com",
      projectId: "bt-instagram-clone",
      storageBucket: "bt-instagram-clone.appspot.com",
      messagingSenderId: "439089111741"
    };
    firebase.initializeApp(config);
  }
  
}
