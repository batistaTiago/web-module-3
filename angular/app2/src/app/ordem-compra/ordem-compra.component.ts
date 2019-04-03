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

  private formasPagamento: string[] = ['dinheiro', 'credito', 'debito']

  constructor() { }

  ngOnInit() {
  }

  public atualizaEndereco(endereco: string) {
    this.endereco = endereco
    this.enderecoValido = this.endereco.length > 3 ? true : false
  }

  public atualizaNumero(numero: string) {
    this.numero = numero
    this.numeroValido = this.numero.length >= 1 ? true : false
  }

  public atualizaComplemento(complemento: string) {
    this.complemento = complemento
    if (this.complemento.length >= 1) {
      this.complementoValido = true
    } else {
      this.complementoValido = null
    }
  }

  public atualizaFormaPagamento(formaPagamento: string) {
    this.formaPagamento = formaPagamento
    this.formaPagamentoValido = this.formasPagamento.includes(this.formaPagamento)
    console.log(typeof(this.formaPagamentoValido))
    console.log(this.formaPagamentoValido)
  }


}
