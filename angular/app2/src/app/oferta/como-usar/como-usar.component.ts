import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  private ofertasService: OfertasService
  private route: ActivatedRoute

  public comoUsar: string = ''

  constructor(route: ActivatedRoute, ofertasService: OfertasService) { 
    this.ofertasService = ofertasService
    this.route = route
  }

  ngOnInit() {
    this.ofertasService.getComoUsarOfertaById(this.route.parent.snapshot.params['id'])
    .then(
      ((comoUsar: string) => {
        this.comoUsar = comoUsar
      })
    )
  }

}
