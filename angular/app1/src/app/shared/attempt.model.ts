export class Attempt {

    public isFilled: boolean
    public filledImageUrl = './assets/coracao_cheio.png'
    public emptyImageUrl = './assets/coracao_vazio.png'

    constructor(isFilled: boolean) {
        this.isFilled = isFilled
    }

    public getImageURL(): string {
        return this.isFilled ? this.filledImageUrl : this.emptyImageUrl
    }
}