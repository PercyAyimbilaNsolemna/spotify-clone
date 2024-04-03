import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string },
  ) {}
  getHello(): string {
    return `The server is running on a ${this.devConfigService.getBDHOST()} on PORT ${this.config.port}`;
  }
}
