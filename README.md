# Back-end

Le code utilise nodejs/express.

Le back-end gère les API REST suivantes : 

| Resource           | POST                  | GET                            | PATCH                                    | PUT | DELETE           |
| ------------------ | --------------------- | ------------------------------ | ---------------------------------------- | --- | ---------------- |
| **/products**      | Create a new products | Retrieve all products          | X                                        | X   |     X            |
| **/products/1**    | X                     | Retrieve details for product 1 | Update details of product 1 if it exists | X   | Remove product 1 |

Le back-end gère les produits dans un fichier json : `assets/products.json`

API disponible via cette adresse : `http://localhost:3000`

vous pouvez lancer le back-end avec la commande 'npm run dev'