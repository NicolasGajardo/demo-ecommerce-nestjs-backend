export class ListProductsQueryParams {
  public category?: string;
  public sortBy?: 'DESC' | 'ASC' = 'DESC';
  public page?: number = 0;
  public limit?: number = 10;
}
