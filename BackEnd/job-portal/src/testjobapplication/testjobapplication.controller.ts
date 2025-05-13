import {Controller,Get,Post,Body,Patch,Param,Delete,Res,HttpStatus,Query,UseGuards,NotFoundException,
} from '@nestjs/common';
import { TestJobApplicationService } from './testjobapplication.service';
import { CreateTestJobApplicationDto } from './dto/createtestjobapplication.dto';
import { response } from 'express';
import { triggerAsyncId } from 'async_hooks';
import { UpdateTestJobApplicationDto } from './dto/updatetestjobapplication.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { AccesTokenGuards } from 'src/guards/accesToken.guards';
import { UserRole } from 'src/userRole/userRole';
import { Role } from 'src/guards/role.decorator';
import { RefreshTokenGuards } from 'src/guards/refreshToken.guards';

@Controller('testjobapplication')
export class TestJobApplicationController {
  constructor(
    private readonly testJobApplicationService: TestJobApplicationService
  ) {}
  @UseGuards(RefreshTokenGuards, RoleGuard)
  @Role(UserRole.COMPANY)
  @Post()
  async create(
    @Res() response,
    @Body() createJobTestDto: CreateTestJobApplicationDto
  ) {
    try {
      const newJobTest =
        await this.testJobApplicationService.create(createJobTestDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Job test created successfully',
        newJobTest,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error creating job test',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }

  @Get()
  async FindAll(@Res() response) {
    try {
      const FindALLJobtest = await this.testJobApplicationService.findAll();
      return response.status(HttpStatus.OK).json({
        message: ' fetchd all jobs tests successfully',
        FindALLJobtest,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error fetching job test',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const getJobtestByid =
        await this.testJobApplicationService.findOnetest(id);
      return response.status(HttpStatus.ACCEPTED).json({
        message: ' job test fectched successfully',
        getJobtestByid,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error fetching job test',
        error: (error as Error).message,
        statusCode: 40,
      });
    }
  }
  @Patch('evaluate-answer')
  async evaluateAnswer(
    @Res() response,
    @Query('questionId') questionId: string,
    @Query('answer') answer: string
  ) {
    try {
      const IsCorrect = await this.testJobApplicationService.evaluateAnswer(
        questionId,
        answer
      );
      return response.status(HttpStatus.OK).json({
        message: 'answer evaluated successfully',
        IsCorrect,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error evaluating answer',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(RefreshTokenGuards, RoleGuard)
  @Role(UserRole.COMPANY)
  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updatetestjobApplication: UpdateTestJobApplicationDto
  ) {
    try {
      const updatedJobTest = await this.testJobApplicationService.update(
        id,
        updatetestjobApplication
      );
      return response.status(HttpStatus.ACCEPTED).json({
        message: ' job test updated successfully',
        updatedJobTest,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error updating job test',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }

  @Delete('delete/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleteJobTest = await this.testJobApplicationService.delete(id);
      return response.status(HttpStatus.CREATED).json({
        message: ' jobt test deleted successfully',
        deleteJobTest,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error delting job test',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get(':jobOffer/tests')
  async findtestByJobOfferId(
    @Res() response,
    @Param('jobOffer') jobOfferId: string
  ) {
    try {
      const tests =
        await this.testJobApplicationService.findTestsByJobOfferId(jobOfferId);
      return response.status(HttpStatus.OK).json({
        message: 'Tests fetched successfully',
        tests,
        statusCode: 200,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: error.message,
          error: (error as Error).message,
          statusCode: 404,
        });
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Unexpected error fetching tests',
        error: (error as Error).message,
        statusCode: 500,
      });
    }
  }
}
