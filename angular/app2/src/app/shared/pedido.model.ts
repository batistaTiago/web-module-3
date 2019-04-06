import { Endereco } from "./endereco.model";

export class Pedido {

    public id: number

    constructor(
        public endereco: Endereco,
        public formaPagamento: string
    ) { }
}