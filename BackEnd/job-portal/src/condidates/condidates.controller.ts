import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { CondidatesService } from './condidates.service';
import { CreateCondidateDto } from './dto/create-condidate.dto';
import { UpdateCondidateDto } from './dto/update-condidate.dto';
import { diskStorage } from 'multer';
import { FileInterceptor} from '@nestjs/platform-express';
import { AccesTokenGuards } from '../guards/accesToken.guards';
import { RoleGuard } from '../guards/role.guard';
import { UserRole } from '../userRole/userRole';
import { Role } from '../guards/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuards } from 'src/guards/refreshToken.guards';
import { response } from 'express';
import { isValidObjectId } from 'mongoose';

@Controller('condidates')
export class CondidatesController {
  constructor(private readonly condidatesService: CondidatesService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file",{
    storage:diskStorage({
      destination:"./uploads",
      filename:(req,file,callback) => callback(null, `${new Date().getTime()}-${file.originalname}`)
    })
  }))
  async register(@Res() response, @Body() createCondidateDto: CreateCondidateDto, @UploadedFile() file){
    try{
      if(file){
        createCondidateDto.image = file?.filename
      }
      const createCondidate = await this.condidatesService.create(createCondidateDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Condidate registred successfully.',
        createCondidate,
        statusCode: 202,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message:'Registration Failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get('mostvisited')
  async getMostVisitedCondidate(@Res() response) {
    try {
      const mostVisited = await this.condidatesService.findMostViwed();
      
      if (!mostVisited) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'sorry No condidate found',
          statusCode: 404,
        });
      }
  
      return response.status(HttpStatus.OK).json({
        message: 'Most visited condidate',
        mostVisited,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching most visited condidate',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get(":id")
  async getCondidateById(@Res() response, @Param('id') id: string) {
    const getCondidateById = await this.condidatesService.getCondidateByID(id);
    if (!getCondidateById) {
        throw new NotFoundException(`Condidate with id ${id} not found`);
    }
    return response.status(HttpStatus.OK).json({
        message: 'Condidate fetched successfully',
        getCondidateById,
        statusCode: 200,
    });
  }
  
  @Put(':id')
  @UseInterceptors(FileInterceptor("file",{
    storage:diskStorage({
      destination: "./uploads",
      filename: (req,file,callback) => callback(null,`${new Date().getTime()}-${file.originalname}`),
    }),
  }))
  async updateProfile(@Res() response, @Param('id') id: string,@Body() updateData: UpdateCondidateDto, @UploadedFile() file){
    try{
      if(file && file.name){
        updateData.image = file?.filename;
      }
      const updateCondidate = await this.condidatesService.updateProfile(id, updateData);
      if(!updateCondidate){
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'condidate not found',
          statusCode: 400,
        })
      }
      return response.status(HttpStatus.CREATED).json({
        message: 'profile updated successfully.',
        updateCondidate,
        statusCode: 202,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Profile update failed.',
        error: (error as Error).message,
        stausCode: 400,
      });
    }
  }
  @Get(':email')
  async getCondidate(@Res() response, @Param('email') email: string){
    const condidate = await this.condidatesService.findByEmail(email);
    if(!condidate){
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'condidate not found',
        statusCode: 400,
      });
    }
    return response.status(HttpStatus.CREATED).json({
      message: 'condidate fetched !', 
      condidate,
      statusCode: 202,
    });
  }
  
  @Delete(':id')
  async deleteCondidate(@Res() response, @Param('id') id: string){
    try{
      const deletecondidate = await this.condidatesService.deleteCondidate(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'condidate deleted successfully',
        deletecondidate,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error deleting condidate',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  
  @Get()
  async ListAllCondidates(@Res() response){
    try{
      const condidates = await this.condidatesService.ListAllCondidates();
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'List Of all condidates',
        condidates,
        statuCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error fetching condidates',
        error:error,
        statusCode: 400,
      });
    }
  }
  @Patch(':id/desiredFields')
  async updateDesiredFields(@Param('id') id: string, @Body() updatecondidatedto: UpdateCondidateDto){
    try{
      const updateCondidate = await this.condidatesService.updateDesiredFields(id, updatecondidatedto);
      return {message: 'condidate desired fields update', updateCondidate};
    }catch(error){
      return {message: 'error updating desired fields', error};
    }
  }
 
 
  

  @Patch(':id/viewCount')
  async incrementViewCount(@Res() response, @Param('id') id: string){
    try{
      const updatedCondidate = await this.condidatesService.incrementViewCount(id);
      return response.status(HttpStatus.OK).json({
        message: 'view count incremented syccessfully',
        updatedCondidate,
        statusCode: 200,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "error increment view count",
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
 
}
