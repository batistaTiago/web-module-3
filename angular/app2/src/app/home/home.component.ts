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
  
  constructor(ofertasService: OfertasService) {
    this.ofertasService = ofertasService
  }
  
  ngOnInit() {
    this.ofertasService.getOfertas()
      .then((ofertas: Oferta[]) => {
          // executa no resolve
          this.ofertas = ofertas
        }
      )
  }
}
  