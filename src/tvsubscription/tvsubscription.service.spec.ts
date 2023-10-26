import { Test, TestingModule } from '@nestjs/testing';
import { TvsubscriptionService } from './tvsubscription.service';

describe('TvsubscriptionService', () => {
  let service: TvsubscriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvsubscriptionService],
    }).compile();

    service = module.get<TvsubscriptionService>(TvsubscriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
