export class CheckoutBody {
  products: CheckoutProducts[];
}

export class CheckoutProducts {
  id: string;
  quantity: number;
}
