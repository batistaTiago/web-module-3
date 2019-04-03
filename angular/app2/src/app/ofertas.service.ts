import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './app.constants';



@Injectable()
export class OfertasService {

    constructor(private http: HttpClient) {

    }

    private ofertas: Array<Oferta> = []

    public getOfertas(): Promise<Oferta[]> {
        return this.http.get(`${API_URL}/ofertas`)
        .toPromise()
        .then
        (
            (resposta: Oferta[]) => {
                return resposta
            }
        )
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${API_URL}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: Oferta[]) => {
            return resposta
        })
    }

    public getOfertaById(id: number): Promise<Oferta> {
        return this.http.get(`${API_URL}/ofertas?id=${id}`)
        .toPromise()
        .then((ofertas: Array<Oferta>) => {
            return ofertas[0]
        } )
      }

      public getComoUsarOfertaById(id: number): Promise<string> {
        return this.http.get(`${API_URL}/como-usar?id=${id}`)
        .toPromise()
        .then(
            (resposta: string) => {
                return resposta[0].descricao
            }
        )
    }

    public getOndeFicaOfertaById(id: number): Promise<string> {
        return this.http.get(`${API_URL}/onde-fica?id=${id}`)
        .toPromise()
        .then(
            (resposta: string) => {
                return resposta[0].descricao
            }
        )
    }

}