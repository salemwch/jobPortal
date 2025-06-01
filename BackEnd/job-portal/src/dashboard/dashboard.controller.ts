import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('stats')
  async getDashboard(): Promise<CreateDashboardDto> {
    return this.dashboardService.getDashboardsStats();
  }
}
