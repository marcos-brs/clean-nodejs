import { v4 as uuidv4 } from 'uuid';
import { Uuid } from '../protocols';

export class Uuidv4Adapter implements Uuid {
  generate(): string {
    return uuidv4();
  }
}
