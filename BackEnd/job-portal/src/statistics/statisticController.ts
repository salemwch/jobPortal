import { Controller, Get } from "@nestjs/common";

@Controller('statistics')
export class StatisticsService{
    constructor(private readonly  statisticsService: StatisticsService){}
    @Get()
    getStatistics(){
        return this.statisticsService.getStatistics();
    }
}

