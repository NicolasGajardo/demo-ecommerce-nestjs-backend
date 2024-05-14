import { Test, TestingModule } from '@nestjs/testing';
import { TransactionProductService } from './transaction-product.service';

describe('TransactionProductService', () => {
  let service: TransactionProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionProductService],
    }).compile();

    service = module.get<TransactionProductService>(TransactionProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
