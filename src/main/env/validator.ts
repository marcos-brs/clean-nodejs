import { IsInt, IsNotEmpty } from 'class-validator';

export class EnvValidator {
  knexConfig: any;

  @IsInt()
  @IsNotEmpty()
  httpPort: number;

  constructor(props: any) {
    Object.assign(this, props);
  }
}
