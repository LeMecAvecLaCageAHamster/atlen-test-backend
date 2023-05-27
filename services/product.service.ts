import { promises as fs } from 'fs';
import { config } from '../config';
import { Product } from '../types/product';
import { NotFoundException } from '../utils/exceptions';

export class ProductService {
	private async getProductJson(): Promise<Product[]> {
		const rawdata = await fs.readFile(config.PRODUCT_FILE, 'utf-8');
		return JSON.parse(rawdata);
	}

	private async saveProductsToJson(products: Product[]): Promise<void> {
		await fs.writeFile(config.PRODUCT_FILE, JSON.stringify(products, null, 4));
	}

	async getProducts(): Promise<Product[]> {
		return this.getProductJson();
	}

	async getProductById(id: number): Promise<Product> {
		const products = await this.getProducts();
		const product = products.find((product) => product.id === id);
		if (product) {
			return product;
		}
		throw new NotFoundException(`Failed to find product with id ${id}.`);
	}

	async addProduct(product: Product): Promise<Product> {
		const products = await this.getProducts();

		let newId = (products[products.length - 1].id ?? 0) + 1;
		product.id = newId;

		products.push(product);
		await this.saveProductsToJson(products);
		return product;
	}

	async updateProduct(id: number, updatedProduct: Product): Promise<Product> {
		const products = await this.getProducts();
		const index = products.findIndex((product) => product.id === id);

		if (index !== -1) {
			products[index] = updatedProduct;
			products[index].id = id;

			await this.saveProductsToJson(products);
			return products[index];
		}

		throw new NotFoundException(`Failed to find product with id ${id}.`);
	}

	async deleteProductById(id: number): Promise<number> {
		const products = await this.getProducts();
		const index = products.findIndex((product) => product.id === id);
		if (index !== -1) {
			products.splice(index, 1);
			await this.saveProductsToJson(products);
			return id;
		}
		throw new NotFoundException(`Failed to find product with id ${id}.`);
	}
}
