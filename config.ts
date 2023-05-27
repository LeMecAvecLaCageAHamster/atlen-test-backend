const { dirname } = require('path');

export const config = {
	API_PORT: 3000,
	PRODUCT_FILE: dirname(require.main?.filename) + '/assets/products.json'
}
