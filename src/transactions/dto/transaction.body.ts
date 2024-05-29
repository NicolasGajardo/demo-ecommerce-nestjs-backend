export class TransactionBody {
  price: number;
  products: {
    product_id: string;
    quantity: number;
  }[];
}
