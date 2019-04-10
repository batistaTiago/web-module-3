import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from './imagem.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        'opacity': 0
      })),
      state('visivel', style( {
        'opacity': 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido'
  public imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]

  constructor() { 
    
  }

  ngOnInit() {
    setInterval(() => this.startRotation(), 3500)
  }

  private startRotation() {

    let idx = 0

    this.imagens.forEach((image, i) => {
      if (image.estado == 'visivel') {
        image.estado = 'escondido'
        idx = idx == 4 ? 0 : i+1
        return
      }
    })

    this.imagens[idx].estado = 'visivel'
  }

}
