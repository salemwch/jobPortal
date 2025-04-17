import { Controller, Get,Query} from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('recent')
  async getRecentUsers(@Query('limit') limit: number = 5) {
    return this.userService.getRecentUsers(limit);
  }

}
