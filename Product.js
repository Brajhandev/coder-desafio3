export class Product {
    #id =1
    constructor(title, description, price, thumbnail, code, stock) {
            this.id = this.#id++
            this.title = title
            this.description = description
            this.price = price
            this.thumbnail = thumbnail
            this.code = code
            this.stock = stock
    }
}