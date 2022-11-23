import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignalService } from './signal.service';

@ApiTags('Signal')
@Controller({
  path: 'signal',
  version: '1',
})
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: any) {
    return this.signalService.getSignalFromTA(data);
  }
}
