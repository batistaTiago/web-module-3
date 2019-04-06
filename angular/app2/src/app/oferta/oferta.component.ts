import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, AfterViewChecked {
  
  private route: ActivatedRoute
  public indexImagemSelecionada: number = 0
  private ofertasService: OfertasService
  
  public oferta: Oferta = new Oferta()
  
  constructor(route: ActivatedRoute, ofertasService: OfertasService) { 
    this.route = route
    this. ofertasService = ofertasService
  }
  
  public imageClicked(event: Event) {
    $('.bt-img-galeria-selecionada').removeClass('bt-img-galeria-selecionada')
    
    let url = event.target['attributes']['src'].value
    for (let att in this.oferta.imagens) {
      if (this.oferta.imagens[att]['url'] == url) {
        
        let clickedElement = $('.bt-img-galeria')[att]
        clickedElement.id = 'clicked'
        
        $('#clicked').toggleClass('bt-img-galeria-selecionada')
        
        clickedElement.id = ''
        
        this.indexImagemSelecionada = parseInt(att)
        break
      }
    }
    
    //  let elementoClicado = (<HTMLElement>event.target)
    //  elementoClicado.classList.add('bt-red-border')
    
  }
  
  ngOnInit() {
    
    this.route.params.subscribe(
      (p: Params) => {
        this.ofertasService.getOfertaById(p.id).then(
          (oferta: Oferta) => {
            this.oferta = oferta
            // $('.bt-img-galeria:first').addClass('bt-img-galeria-selecionada')

            // let elements = $('.bt-img-galeria-selecionada')
            // if (elements.length == 0) {
            //   $('.bt-img-galeria:first').addClass('bt-img-galeria-selecionada')
            // }
          }
          )
        })
      }
      
      ngAfterViewChecked() {

      }
    }
    