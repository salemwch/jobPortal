import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  Query,
} from '@nestjs/common';
import { JobOfferService } from './joboffer.service';
import { CreateJobOfferDto } from './dto/createjoboffer.dto';
import { UpdateJobOfferDto } from './dto/updatejoboffer.dto';

@Controller('job-offer')
export class JobOfferController {
  constructor(private readonly jobOfferService: JobOfferService) {}
  @Post()
  async create(@Res() response, @Body() createJobOfferdto: CreateJobOfferDto) {
    try {
      const createJobOffer =
        await this.jobOfferService.create(createJobOfferdto);
      return response.status(HttpStatus.CREATED).json({
        message: 'job Offer created successfully',
        createJobOffer,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error creating job offer',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get(':jobOfferId/tests')
  async findTestsByJobOfferId(@Param('jobOfferId') jobOfferId: string) {
    try {
      const tests =
        await this.jobOfferService.findTestsByJobOfferId(jobOfferId);
      return { tests };
    } catch (error) {
      return { message: (error as Error).message };
    }
  }
  @Put(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateJobOfferDto: UpdateJobOfferDto
  ) {
    try {
      const updateJobOffer = await this.jobOfferService.update(
        id,
        updateJobOfferDto
      );
      return response.status(HttpStatus.OK).json({
        message: ' job offer updated successfully',
        updateJobOffer,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error updating job offer',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get()
  async findAll(@Res() response) {
    try {
      const findALLJobs = await this.jobOfferService.findAll();
      return response.status(HttpStatus.OK).json({
        message: ' list of job offers',
        findALLJobs,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: ' error fetching job offers',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get('/search')
  async search(@Res() response, @Query() query: any) {
    try {
      const results = await this.jobOfferService.search(query);
      return response.status(HttpStatus.CREATED).json({
        message: 'search results ',
        results,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error performing search',
        error: error,
        statusCode: 400,
      });
    }
  }
  @Get('/data/:id')
  async getDataById(@Res() response, @Param('id') id: string) {
    try {
      const getDataId = await this.jobOfferService.findById(id);

      return response.status(HttpStatus.ACCEPTED).json({
        message: 'Data fetched successfully',
        getDataId,
        statusCode: 200,
      });
    } catch (error) {
      console.error(`Error fetching job offer with ID: ${id}`, error);

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error fetching job offer',
        error: error instanceof Error ? error.message : 'Unknown error',
        statusCode: 500,
      });
    }
  }

  @Delete(':id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deletejobOffer = await this.jobOfferService.delete(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'job offer deleted successfully',
        deletejobOffer,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error deleting job Offer',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Patch(':id/viewCount')
  async incrementViewCount(@Res() response, @Param('id') id: string) {
    try {
      const updatedJobOffer = await this.jobOfferService.incrementViewCount(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'view Count incremented successfully',
        updatedJobOffer,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error incrementing view acount',
        error: error,
        statusCode: 400,
      });
    }
  }
  @Get('/mostViewd')
  async findMostViewd(@Res() response, @Query('limit') limit: number) {
    try {
      const mostViewdOffers = await this.jobOfferService.findMostViewd(
        limit || 5
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'most viewd job offer',
        mostViewdOffers,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error fetching most viwed job offers',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Patch(':id/updateStatus')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusOffer: UpdateJobOfferDto
  ) {
    try {
      const updatedJobOfferStatus =
        await this.jobOfferService.updatedStatusOffer(id, updateStatusOffer);
      return {
        message: 'jobOffer status fields updated',
        updatedJobOfferStatus,
      };
    } catch (error) {
      return {
        message: `error updating jobOFfer status`,
        error: (error as Error).message,
      };
    }
  }
  @Get('/company/:companyId')
  async getJobOffersByCompany(
    @Res() response,
    @Param('companyId') companyId: string
  ) {
    try {
      const getJobOffersByCompanyId =
        await this.jobOfferService.findCompanybyID(companyId);
      return response.status(HttpStatus.OK).json({
        message: 'joboffer by company fetched !',
        getJobOffersByCompanyId,
        statusCoed: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to fetch joboffers by u company',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
}
