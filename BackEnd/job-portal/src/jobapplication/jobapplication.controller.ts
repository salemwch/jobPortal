import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, Put, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { JobApplicationService } from './jobapplication.service';
import { CreateJobApplicationDto } from './dto/create-job-application.dto';
import { response } from 'express';
import { UpdateJobApplicationDto } from './dto/update-job-application.dto';
import { ApplicationStatus } from './enumApplication';
import { MailService } from 'src/mailtrap/mailservice';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('jobapplication')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService,
    private readonly mailService: MailService,
  ) {}
 
  
  @Post()
@UseInterceptors(FilesInterceptor('cvUrl')) 
async create(
  @Res() response,
  @UploadedFiles() files: Express.Multer.File[], // Files array
  @Body() createJobApplicationDto: CreateJobApplicationDto,
) {
  try {
    //  Attach file to DTO
    if (files && files.length > 0) {
      createJobApplicationDto.cvUrl = files[0].filename; // Save the filename or path
    }

    // Make sure condidate and jobOffer are valid MongoDB ObjectIds
    if (!this.isValidObjectId(createJobApplicationDto.condidate)) {
      throw new Error('Invalid condidate ID');
    }
    if (!this.isValidObjectId(createJobApplicationDto.jobOffer)) {
      throw new Error('Invalid jobOffer ID');
    }

    //  Create job application
    const createdJobApplication = await this.jobApplicationService.create(createJobApplicationDto);

    //  Send email to the company with the CV download link
    

    return response.status(HttpStatus.CREATED).json({
      message: 'Job application created successfully',
      createdJobApplication,
      statusCode: 201,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: 'Job application creation failed',
      error: (error as Error).message,
      statusCode: 400,
    });
  }
}

// Helper function to check if a string is a valid ObjectId
private isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}




  @Get('recent')
  async getRecentJobApplications(@Query('limit') limit: number = 5) {
    return this.jobApplicationService.getRecentApplications(limit);
  }
  @Get('status/:status')
async findByStatus(@Res() response, @Param('status') status: string) {
  try {
    if (!Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
      throw new Error('Invalid status');
    }
    const applications = await this.jobApplicationService.findByStatus(status);
    return response.status(HttpStatus.OK).json({
      message: `Applications with status '${status}' fetched successfully`,
      applications,
      statusCode: 200,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: 'Failed to fetch applications',
      error: (error as Error).message,
      statusCode: 400,
    });
  }
}
  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string){
    try{
      const findApplicationBYID = await this.jobApplicationService.findOneJob(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'application fetched!',
        findApplicationBYID,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'application fetching failed!',
        error: (error as Error).message,
        statusCode: 404,
      });
    }
  }
  
  @Get()
  async findAll(@Res() response){
    try{
      const findALlAplication = await this.jobApplicationService.findALL();
    return response.status(HttpStatus.OK).json({
      message: 'All Aplication fetched!',
      findALlAplication,
      statusCode: 200,
    });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'cant fetching All Application',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Put(':id')
  
  async update(@Res() response, @Param('id') id:string, @Body() updateJobApplication: UpdateJobApplicationDto){
    try{
      const updateJbApplication = await this.jobApplicationService.update(id, updateJobApplication);
      return response.status(HttpStatus.CREATED).json({
        message: 'updated Application goes successfully',
        updateJbApplication,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'updated Aplication Failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  
  @Delete(':id')
  async delete(@Res() response, @Param('id') id: string){
    try{
      const deletedApplicationByID = await this.jobApplicationService.delete(id);
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'Application deleted accepted',
        deletedApplicationByID,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'delete Application By Id failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
 
 
  @Patch(':id/evaluate-test')
  async evaluateTest(@Res() response, @Param('id') id: string, @Body() testResultDto: {questionId: string; answer: string},){
    try{
      const updatedApplication = await this.jobApplicationService.evaluateTestResult(id, testResultDto);
      return response.status(HttpStatus.OK).json({
        message: ' Test result evaluated sucfcessfully',
        updatedApplication,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to evaluate test result',
        error : (error as Error).message,
        statusCode: 400,
      });
    }
  }
  
  
  @Patch(':id/update/status')
  async updateStatus(@Res() response, @Param('id') id:string, @Body() statusDto: {status: string}){
    try{
      const updatedApplication = await this.jobApplicationService.updateStatus(id,statusDto.status);
      return  response.status(HttpStatus.ACCEPTED).json({
        message: 'application status updated succesfully',
        updatedApplication,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to update application status',
        error: (error as Error).stack,
        statusCode: 400,
      });
    }
  }
  
  @Post(':id/submit-test-result')
  async submitTestResult(@Res() response, @Param('id') id: string){
    try{
      const applicattion = await this.jobApplicationService.submitfinaltestResult(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'test result submited successfulyy',
        status: applicattion.status,
        score: applicattion.score,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to submit test result', 
        error :error,
        statusCode: 400,
      });
    }
  }
 

}
