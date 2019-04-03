import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

  private route: ActivatedRoute
  private ofertasService: OfertasService

  public oferta: Oferta = new Oferta()

  constructor(route: ActivatedRoute, ofertasService: OfertasService) { 
    this.route = route
    this. ofertasService = ofertasService
  }

  public imageClicked(event: Event) {
    
  }

  ngOnInit() {
    this.ofertasService.getOfertaById(this.route.snapshot.params['id']).then(
      (oferta: Oferta) => {
        this.oferta = oferta
        let selectedImageElement = <HTMLImageElement> document.getElementsByTagName('img')[1]
        selectedImageElement.className += ' '
      }
    )
  }

}
