export class ListProductsRequest {
  public category?: string;
  public sortBy?: 'DESC' | 'ASC';
  public page?: number;
  public limit?: number;
}
