import { Product } from "./Product.js";
import fs from "fs/promises";
export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./src/database/products.json";
  }

  async readFile() {
    const json = await fs.readFile(this.path, "utf8");
    return json;
  }

  async getProducts() {
    const json = await this.readFile();
    this.products = JSON.parse(json);
    return this.products;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );

    this.products.push(product);
    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);

    return `producto ${title} ingresado correctamente`;
  }

  async getProductById(id) {
    const json = await this.readFile();
    this.products = JSON.parse(json);
    
    const product = this.products.find((product) => product.id === Number(id));
    if (!product) {
      return `el producto de id ${id} no se encuentra`;
    }
    return product;
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const index = this.products.findIndex((producto) => producto.id === id);

    const productUpdate = {
      id: this.products[index].id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products[index] = productUpdate;
    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);
  }

  async deleteProduct(id) {
    const json = await this.readFile();
    this.products = JSON.parse(json);

    const index = this.products.findIndex((producto) => producto.id === id);
    if (index < 0) {
      return `el producto de id ${id} no se encuentra`;
    }

    this.products.splice(index, 1)
    const newProduct = JSON.stringify(this.products);
    await fs.writeFile(this.path, newProduct);
    return 'Producto eliminado exitosamente'
  }
}