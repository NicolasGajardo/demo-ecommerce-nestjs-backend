export class CheckoutBody {
  products: CheckoutProducts[];
}

class CheckoutProducts {
  uuid: string;
  quantity: number;
}
