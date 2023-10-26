import { EntityRepository, Repository } from 'typeorm';
import { ReceiveTransfer } from '../entities/receive-transfer.entity';

@EntityRepository(ReceiveTransfer)
export class ReceiveTransferRepository extends Repository<ReceiveTransfer> {}
