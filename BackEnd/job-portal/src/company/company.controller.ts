import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  UploadedFile,
  UseInterceptors,
  Put,
  Req,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateCompanyDto } from './dto/update-company.dto';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    })
  )
  async register(
    @Res() response,
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() file
  ) {
    try {
      if (file) {
        createCompanyDto.image = file?.filename;
      }
      const company = await this.companyService.createCompany(createCompanyDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Company registred successfully',
        company,
        statusCode: 202,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Company registration failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get('search')
  async searchCompanies(@Query('query') query: string) {
    return this.companyService.searchCompanies(query);
  }
  @Get('mostvisited')
  async getMostVisitedCompany(@Res() response) {
    try {
      const mostVisited = await this.companyService.findMostViwed();

      if (!mostVisited) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'sorry No companies found',
          statusCode: 404,
        });
      }

      return response.status(HttpStatus.OK).json({
        message: 'Most visited company',
        mostVisited,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching most visited company',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get(':id')
  async getCompanyBYID(@Res() response, @Param('id') id: string) {
    try {
      const getCompanybyID = await this.companyService.getCompanyById(id);
      return response.status(HttpStatus.OK).json({
        message: 'company fetched  by ID',
        getCompanybyID,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'fetching company by id failed',
        error: (error as Error).message,
        statusCode: 404,
      });
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    })
  )
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() file
  ) {
    try {
      if (file && file.name) {
        updateCompanyDto.image = file.filename;
      }
      const updatedCompany = await this.companyService.updateCompany(
        id,
        updateCompanyDto
      );
      if (!updatedCompany) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'company not found ',
          statusCode: 400,
        });
      }
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'company updated successfully',
        updatedCompany,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'company updated failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }

  @Delete(':id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deleteCompany = await this.companyService.deleteCompany(id);
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'company deleted successfully',
        deleteCompany,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: ' company deletion failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const companies = await this.companyService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'company retrived successfully',
        companies,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'failed to retrieve companies',
        error: (error as Error).message,
        statusCode: 500,
      });
    }
  }
  @Patch(':id/desiredFields')
  async updateDesiredFields(
    @Param('id') id: string,
    @Body() updatecompanyDto: UpdateCompanyDto
  ) {
    try {
      const updateCompany = await this.companyService.updateDesiredFields(
        id,
        updatecompanyDto
      );
      return { message: 'company desired fields update', updateCompany };
    } catch (error) {
      return { message: 'error updating desired fields', error };
    }
  }
  @Patch(':id/viewCount')
  async incrementViewCount(@Res() response, @Param('id') id: string) {
    try {
      const incrementView = await this.companyService.incrementViewCount(id);
      return response.status(HttpStatus.OK).json({
        message: 'view count incremented syccessfully',
        incrementView,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error increment view count',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
}
