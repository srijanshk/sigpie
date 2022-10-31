import { Body, Controller, Post } from '@nestjs/common';
import { SignalService } from './signal.service';

@Controller({
  path: 'signal',
  version: '1',
})
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post()
  create(@Body() data: any) {
    return this.signalService.getSignalFromTA(data);
  }
}
