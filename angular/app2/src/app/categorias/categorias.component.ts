import { Component, OnInit } from '@angular/core';
import { Oferta } from '../shared/oferta.model';
import { OfertasService } from '../services/ofertas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers: [OfertasService]
})
export class CategoriasComponent implements OnInit {

  public ofertas: Oferta[] = []

  constructor(private ofertaService: OfertasService, private router: Router) { }

  ngOnInit() {
    this.ofertaService.getOfertasPorCategoria(this.router.url.replace('/', ''))
    .then((ofertas: Oferta[]) => {
      this.ofertas = ofertas
    })
    .catch(() => {
      console.log('erro')
    })
  }

}
