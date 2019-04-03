import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs'
import { Oferta } from '../shared/oferta.model';

import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  private ofertasService: OfertasService;
  private ofertasObs: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(service: OfertasService) {
    this.ofertasService = service
   }

  ngOnInit() {
    let delay = 500
    this.startObserver(delay)
  }

  private startObserver(delay: number = 0) {
    this.ofertasObs = this.subjectPesquisa.pipe(
      debounceTime(delay),
      distinctUntilChanged(),
      switchMap(
        (query: string) => {
          let parsedQuery = query.trim()
          if (query == '') {
            return of<Oferta[]>([]); 
          }
          return this.ofertasService.pesquisarOfertas(query)
        }
      ),
      catchError( (erro: any) => {
        console.log(erro)
        return of<Oferta[]>([]); 
      })
    )
  }

  public searchBarTextFieldKeyUp(searchQuery: string) {
    console.log('keyup char: ' + searchQuery)
    this.subjectPesquisa.next(searchQuery)
  }

  public clearObserverOfertas() {
    this.subjectPesquisa.next('')
  }

}
