import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = ''
  public numero: string = ''
  public complemento: string = ''
  public formaPagamento: string = ''

  private enderecoValido: boolean = false
  private numeroValido: boolean = false
  private complementoValido: boolean
  private formaPagamentoValido: boolean = false

  private enderecoPrimitivo: boolean = true
  private numeroPrimitivo: boolean = true
  private complementoPrimitivo: boolean = true
  private formaPagamentoPrimitivo: boolean = true

  private formasPagamento: string[] = ['dinheiro', 'credito', 'debito']

  constructor() { }

  ngOnInit() {
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


}
