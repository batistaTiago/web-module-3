import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Attempt } from './../shared/attempt.model'

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public attemptsRemaining: number = 0

  public attempts: Attempt[] = [
    new Attempt(true), new Attempt(true), new Attempt(true)
  ]

  constructor() { 

  }

  ngOnChanges() {
    if (this.attemptsRemaining !== this.attempts.length) {
      let idx = this.attempts.length - this.attemptsRemaining - 1
      this.attempts[idx].isFilled = false
    }
  }

  ngOnInit() {
  }


}
