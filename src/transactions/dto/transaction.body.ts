export class TransactionBody {
  price: number;
  // TODO: crear interfaz transaction product body
  transactions_products: {
    product_id: string;
    quantity: number;
  }[];
}
