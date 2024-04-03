import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(private devConfigService: DevConfigService) {}
  getHello(): string {
    console.log(this.devConfigService.getBDHOST());
    return 'Hello World!';
  }
}
