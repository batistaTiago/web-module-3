import { ItemCarrinho } from "../shared/item-carrinho.model";
import { Oferta } from "../shared/oferta.model";


export class CarrinhoService {
    private itens: Array<ItemCarrinho> = []

    public getItems() {
        return this.itens
    }

    public incluirItem(oferta: Oferta) {
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )

        for (let item of this.itens) {
            if (item.id == itemCarrinho.id) {
                item.quantidade += 1
                return
            }
        }

        this.itens.push(itemCarrinho)
    }
}