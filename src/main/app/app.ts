import { HttpServer } from './http-server';

export class Application {
  protected httpServer?: HttpServer;

  protected worker?: Worker;

  async start(): Promise<void> {
    this.httpServer = new HttpServer(0, {
      port: 8080,
    });
    this.httpServer.start();
  }
}
