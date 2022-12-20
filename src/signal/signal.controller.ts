import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateSignalPayload } from './dto/create-signal.dto';
import { TradingViewLogInput } from './dto/trading-view-log.dto';
import { SignalService } from './signal.service';

@ApiTags('Signal')
@Controller({
  path: 'signal',
  version: '1',
})
export class SignalController {
  constructor(private readonly signalService: SignalService) {}

  @Post('log')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: TradingViewLogInput) {
    return this.signalService.getSignalFromTA(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createSignal(@Body() createSignalDto: CreateSignalPayload) {
    return this.signalService.createSignal(createSignalDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllSignal(@Request() request) {
    return this.signalService.getAllSignal(request.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getBySignalId(@Param('id') id: number) {
    return this.signalService.getSignalById(id);
  }
}
