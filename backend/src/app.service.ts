import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  healthCheck(): { status: string; timestamp: string } {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }

  keepAlive(): { message: string; timestamp: string } {
    return {
      message: 'Server is alive',
      timestamp: new Date().toISOString(),
    };
  }
}
