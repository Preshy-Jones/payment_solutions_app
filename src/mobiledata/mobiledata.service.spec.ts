import { Test, TestingModule } from '@nestjs/testing';
import { MobiledataService } from './mobiledata.service';

describe('MobiledataService', () => {
  let service: MobiledataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobiledataService],
    }).compile();

    service = module.get<MobiledataService>(MobiledataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
