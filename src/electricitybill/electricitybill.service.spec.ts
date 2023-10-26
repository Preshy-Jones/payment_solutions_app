import { Test, TestingModule } from '@nestjs/testing';
import { ElectricitybillService } from './electricitybill.service';

describe('ElectricitybillService', () => {
  let service: ElectricitybillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectricitybillService],
    }).compile();

    service = module.get<ElectricitybillService>(ElectricitybillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
