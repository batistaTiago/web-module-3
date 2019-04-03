import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers: [ OfertasService ]
})
export class OndeFicaComponent implements OnInit {

  private ofertasService: OfertasService
  private route: ActivatedRoute

  public ondeFica: string = ''

  constructor(route: ActivatedRoute, ofertasService: OfertasService) { 
    this.ofertasService = ofertasService
    this.route = route
  }

  ngOnInit() {
    this.ofertasService.getOndeFicaOfertaById(this.route.parent.snapshot.params['id'])
    .then(
      ((ondeFica: string) => {
        this.ondeFica = ondeFica
      })
    )
  }
}
