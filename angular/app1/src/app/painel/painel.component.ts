import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Phrase } from '../shared/phrase.model'
import { PHRASES } from './phrases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public phrases: Phrase[] = PHRASES;
  public instructionText: string = "Traduza a frase abaixo:"
  public userAnswer: string = ''  
  public percentComplete: number = 0
  public attemptsRemaining: number = 3
  @Output() public gameOver: EventEmitter<boolean> = new EventEmitter()

  private roundIndex: number = 0
  public roundPhrase: Phrase = null

  constructor() { 
    this.updateRoundPhrase()
  }

  ngOnInit() {

  }

  private updateRoundPhrase() {
    this.roundPhrase = this.phrases[this.roundIndex]
  }

  public updateAnswerCache(event: Event) {
    let eventSender = (<HTMLInputElement>event.target)
    let text = eventSender.value
    this.userAnswer = text
  }


  public verifyAnswerButtonClick() {
    if (this.userAnswer == this.roundPhrase.frasePT) {
      this.roundIndex++
      this.percentComplete += (100 / this.phrases.length)
      if (this.roundIndex >= this.phrases.length) {
        this.gameOver.emit(true)
      } else {
        this.updateRoundPhrase()
        this.userAnswer = ''
      }
    } else {
      this.attemptsRemaining--

      if (this.attemptsRemaining < 0) {
        this.gameOver.emit(false)
      }

    }
    
  }



}
