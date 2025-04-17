import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import {join} from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("file/:img")
  getfile(@Param("img") img:string):StreamableFile{
    const filepath = join(process.cwd(),"./uploads/" + img)
    const file = createReadStream(filepath)
    return new StreamableFile(file)
  }
}
