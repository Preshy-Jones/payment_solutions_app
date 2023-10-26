import { EntityRepository, Repository } from 'typeorm';
import { SendTransfer } from '../entities/send-transfer.entity';

@EntityRepository(SendTransfer)
export class SendTransferRepository extends Repository<SendTransfer> {}
