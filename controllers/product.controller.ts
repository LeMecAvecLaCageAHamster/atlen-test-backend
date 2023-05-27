import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { NotFoundException } from '../utils/exceptions';

const ProductController = Router();
const productService = new ProductService();

ProductController.get('/', async (req: Request, res: Response) => {
	try {
		const products = await productService.getProducts();
		res.json(products);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
});

ProductController.get('/:productId', async (req: Request, res: Response) => {
	const productId = parseInt(req.params.productId);

	try {
		const product = await productService.getProductById(productId);
		res.json(product);
	} catch (error) {
		if (error instanceof NotFoundException) {
			res.status(404).json({ message: error });
		}
	}
});

ProductController.post('/', async (req: Request, res: Response) => {
	const newProduct = await productService.addProduct(req.body);
	res.json(newProduct);
});

ProductController.patch('/:productId', async (req: Request, res: Response) => {
	const productId = parseInt(req.params.productId);

	try {
		const product = await productService.updateProduct(productId, req.body);
		res.json(product);
	} catch (error) {
		if (error instanceof NotFoundException) {
			res.status(404).json({ message: error });
		}
	}
});

ProductController.delete('/:productId', async (req: Request, res: Response) => {
	const productId = parseInt(req.params.productId);

	try {
		await productService.deleteProductById(productId);
		res.status(202).json({ message: `Product ${productId} deleted successfully.` });
	} catch (error) {
		if (error instanceof NotFoundException) {
			res.status(404).json({ message: error });
		}
	}
});

export { ProductController };
