import { Component, OnInit } from '@angular/core';
import { CepService } from '../cep.service';
import { Endereco } from '../shared/endereco.model';


import { Observable, Subject, of } from 'rxjs'
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators'


@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [CepService]
})
export class OrdemCompraComponent implements OnInit {
  
  public cep: string = ''
  public cidade: string = ''
  public bairro: string = ''
  public uf: string = ''
  
  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''
  
  private cepValido: boolean = false
  private enderecoValido: boolean = false
  private numeroValido: boolean = false
  private complementoValido: boolean
  private formaPagamentoValido: boolean = false
  
  private cepPrimitivo: boolean = true
  private enderecoPrimitivo: boolean = true
  private numeroPrimitivo: boolean = true
  private complementoPrimitivo: boolean = true
  private formaPagamentoPrimitivo: boolean = true
  
  private cepObserver: Observable<Endereco>
  private subjectCep: Subject<string> = new Subject<string>()
  
  private formasPagamento: string[] = ['dinheiro', 'credito', 'debito']
  
  constructor(private cepService: CepService) { }
  
  // ngOnInit() {
  //   console.log('inicializando cepObserver')
  //   this.cepObserver = this.subjectCep.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap(
  //       (cep: string) => {
  //         if (cep.length != 8) {
  //           console.log('cep incorreto')
  //           return of<Endereco>(); 
  //         }
  //         console.log('disparando cep busca:' + cep)
  //         return this.cepService.getInfo(cep)
  //       }),
  //     catchError( (erro: any) => {
  //       console.log(erro)
  //       return of<Endereco>(); 
  //     })
  //   )
  //   console.log(this.cepObserver)
  // }
  
  ngOnInit() {
    this.cepObserver = this.subjectCep.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((value: string) => {
        console.log('valor recebido: ' + value)
        if (value != '') {
          return this.cepService.getInfo(value)
        } else {
          this.cepValido = false
          this.limparInformacoesEndereco()
          return of<Endereco>()
        }
      }),
      catchError((erro: any) => {
        console.log(erro)
        return of<Endereco>(); 
      })
    )
      
    this.cepObserver.subscribe(
      (endereco: Endereco) => {
        console.log(endereco)
        if (!(<any>endereco).erro) {
          this.cepValido = true
          this.cidade = endereco.localidade
          this.bairro = endereco.bairro
          this.uf = endereco.uf
          this.endereco = endereco.logradouro
        }
      }
      )
  }
  
  private limparInformacoesEndereco() {
    this.cepValido = false
    this.cidade = ''
    this.bairro = ''
    this.uf = ''
    this.endereco = ''
  }
  
  public atualizarCep(cep: string) {
    this.cepPrimitivo = false
    if (cep.length == 8) {
      this.cep = cep
      this.subjectCep.next(cep)
    } else {
      this.subjectCep.next('')
    }
  }
  
  
  public atualizaEndereco(endereco: string) {
    this.endereco = endereco
    this.enderecoValido = this.endereco.length > 3 ? true : false
    this.enderecoPrimitivo = false
  }
  
  public atualizaNumero(numero: string) {
    this.numero = numero
    this.numeroValido = this.numero.length >= 1 ? true : false
    this.numeroPrimitivo = false
  }
  
  public atualizaComplemento(complemento: string) {
    this.complemento = complemento
    if (this.complemento.length >= 1) {
      this.complementoValido = true
    } else {
      this.complementoValido = null
    }
    this.complementoPrimitivo = false
  }
  
  public atualizaFormaPagamento(formaPagamento: string) {
    this.formaPagamento = formaPagamento
    this.formaPagamentoValido = this.formasPagamento.includes(this.formaPagamento)
    this.formaPagamentoPrimitivo = false
  }
  
  public formValido() {
    if (this.cepValido && this.numeroValido && this.formaPagamentoValido) {
      return ''
    } else {
      return 'disabled'
    }
  }
}
