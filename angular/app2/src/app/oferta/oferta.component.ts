import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';



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
    
    this.route.params.subscribe(
      (p: Params) => {
        this.ofertasService.getOfertaById(p.id).then(
          (oferta: Oferta) => {
            this.oferta = oferta
        }
      )
    })



    // this.route.params.subscribe(
    //   (p: any) => {
    //     console.log('instrução do observable')
    //     console.log(p)
    //   },
    //   (error: any) => {
    //     console.log('instrução de erro')
    //     console.log(error)
    //   },
    //   () => {
    //     console.log('instrução de conclusão')
    //   }
    // )
  }

}
