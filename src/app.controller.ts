import { Controller, Get, UseFilters, UseGuards, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './guards/admin.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('1112')
    return this.appService.getHello();
  }

  @Get('/ping')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  getHelloPing(): string {
    return this.appService.getHello();
  }
}
