import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  DBHOST = 'localhost';

  getBDHOST() {
    return this.DBHOST;
  }
}
