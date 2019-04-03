import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app1';

  public gameIsRunning: boolean = true
  public userVictory: boolean

  public gameOver(victory: boolean) {
    this.gameIsRunning = false
    this.userVictory = victory
  }

  public restartGame() {
    this.gameIsRunning = true
    this.userVictory = undefined
  }
 
}
