// import { ProductBody } from 'src/products/dto/product.body';
// import { ProductModel } from '../database/models/product.model';
// import { UserModel } from '../database/models/user.model';
// import { AuthenticatedUser } from 'src/auth/interface/authenticated-user.interface';
// import { TransactionBody } from 'src/transactions/dto/transaction.body';
// import { TransactionModel } from '../database/models/transaction.model';
// import { TransactionProductModel } from '../database/models/transaction-product.model';

// export class Mapper {
//   static mapProductBodyToProductModel(
//     source: Partial<ProductBody>,
//     sellerUser?: AuthenticatedUser,
//   ): ProductModel {
//     const { name, stock, price, description } = source;
//     const destination = new ProductModel();

//     if (name) destination.name = name;
//     if (stock) destination.stock = stock;
//     if (price) destination.price = price;
//     if (description) destination.description = description;
//     if (sellerUser) destination.sellerUser = sellerUser as UserModel;

//     return destination;
//   }

//   static mapTransactionBodyToTransactionModel(
//     source: Partial<TransactionBody>,
//     buyerUser?: AuthenticatedUser,
//   ): TransactionModel {
//     const { price, transactions_products = [] } = source;
//     const destination = new TransactionModel();

//     if (price) destination.price = price;
//     for (const trx_prod of transactions_products) {
//       destination.transactionsProducts = [];
//       destination.transactionsProducts.push({
//         quantity: trx_prod.quantity,
//         product: { uuid: trx_prod.product_id } as ProductModel,
//       } as TransactionProductModel);
//     }

//     if (buyerUser) destination.buyerUser = buyerUser as UserModel;

//     return destination;
//   }
// }
