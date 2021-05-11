import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  HashCompareProtocol,
  HashProtocol,
} from '../../core/common/protocols/crypto.protocol';

@Injectable()
export class BcryptServiceAdapter implements HashProtocol, HashCompareProtocol {
  constructor(private readonly rounds: number) {}

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return await bcrypt.compare(plaintext, digest);
  }

  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.rounds);
  }
}
