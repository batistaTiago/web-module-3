import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // ao usar providers, este componente e seus filhos podem usar os serviços passados 
  // (como singleton)
  providers: [OfertasService] 
})
export class HomeComponent implements OnInit {
  
  private ofertasService: OfertasService
  
  public ofertas: Array<Oferta> = []
  public ofertasEmDestaque: Oferta[] = []
  
  constructor(ofertasService: OfertasService) {
    this.ofertasService = ofertasService
  }
  
  public limparOfertas() {
    this.ofertas = []
  }
  
  ngOnInit() {
    this.ofertasService.getOfertas()
      .then(
        (ofertas: Oferta[]) => {
          for (let oferta of ofertas) {
            if (oferta.destaque) {
              this.ofertasEmDestaque.push(oferta)
            }
            this.ofertas.push(oferta)
          }
        }
      )
  }

  public debug() {
    console.log(this.ofertasEmDestaque)
  }
}