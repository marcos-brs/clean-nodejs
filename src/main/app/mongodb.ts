import mongoose from 'mongoose';

export class MongoDB {
  constructor(
    protected mongoHost: string,
    protected mongoPort: number,
    protected mongoDatabase: string
  ) {
    this.mongoHost = mongoHost;
    this.mongoPort = mongoPort;
    this.mongoDatabase = mongoDatabase;
  }

  public connect(): void {
    mongoose.connect(
      `${this.mongoHost}:${this.mongoPort}/${this.mongoDatabase}`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
  }
}
