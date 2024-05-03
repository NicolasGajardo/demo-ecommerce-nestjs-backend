export class CheckoutBody {
  products: CheckoutProducts[];
}

export class CheckoutProducts {
  uuid: string;
  quantity: number;
}
