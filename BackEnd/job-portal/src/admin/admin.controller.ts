import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, Put, UseGuards, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AccesTokenGuards } from 'src/guards/accesToken.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/guards/role.decorator';
import { User } from 'src/user/entities/user.entity';
import { UserRole } from 'src/userRole/userRole';
import { response } from 'express';
import { error } from 'console';
import { UserService } from 'src/user/user.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}
  @Post()
  @UseInterceptors(FileInterceptor("file", {
    storage:diskStorage({
      destination: "./uploads",
      filename: (req,file,callback) => callback(null, `${new Date().getTime}-${file.originalname}`),
    }),
  }))
  
  async createAdmin(@Res() response,@Body() createAdminDto: CreateAdminDto, @UploadedFile() file){
    try{
      if(file){
        createAdminDto.image = file?.filename;
      }
      const createAdmin = await this.adminService.create(createAdminDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'created goes succefully',
        createAdmin,
        statusCode:201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'creation failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    const admin = await this.adminService.findAdminById(id);
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Get() 
  async getAdmins(@Res() response){
    try{
      const admins = await this.adminService.findAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'Admins retrived successfully',
        admins,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'admine creation failed . please check your inputs',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination:'./uploads',
      filename: (req,file,callback) => callback(null, `${new Date().getTime()}-${file.originalname}`),
    })
  }))
  async updateProfile(@Res() response, @Param('id') id:string, @Body() updateadminDto: UpdateAdminDto, @UploadedFile() file){
    try{
      if(file){
        updateadminDto.image = file?.filename;
      }
      const updateadmin = await this.adminService.updateProfile(id, updateadminDto);
      return response.status(HttpStatus.OK).json({
        message: " admin profile updated successfully.",
        updateadmin,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'profile update failed',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Delete(':id')
  async deleteAdmin(@Res() response, @Param('id') id: string){
    try{
      const deleteadmin = await this.adminService.deletAdmin(id);
      if(!deleteadmin){
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'admin not Found,',
          statusCode: 404,
        });
      }
      return response.status(HttpStatus.ACCEPTED).json({
        message: 'deleted goes successfully!',
        deleteadmin,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to delete admin',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Get('all')
  async ListAllAdmins(@Res() response,){
    try{
      const admins = await this.adminService.findAllAdmins();
      return response.status(HttpStatus.OK).json({
        message: 'admin fetched successfully',
        admins,
        satstucode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to fetch admins.',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('condidate/:id/approve')
  async approveCondidate(@Res() response, @Param('id') condidateId:string){
    try{
      const condidate = await this.adminService.approvedCondidate(condidateId);
      return response.status(HttpStatus.OK).json({
        message: 'condidate approved successfully',
        condidate,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to approved condidate', 
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('condidate/:id/reject')
  
  async rejectCondidate(@Res() response, @Param('id') id:string){
    try{
      const condidate = await this.adminService.rejectCondidate(id);
      return response.status(HttpStatus.OK).json({
        message: 'condidate rejected successfully',
        condidate,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to reject condidate',
        error: (error as Error).message,
        stausCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('company/:id/approve')
  
  async approveCompany(@Res() response, @Param('id') id:string){
    try{
      const approvedCompany = await this.adminService.approvedCompany(id);
      return response.status(HttpStatus.OK).json({
        message: 'company approved successfully',
        approvedCompany,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: ' failed to approve company',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('company/:id/reject')
  
  async rejectCompany(@Res() response, @Param('id') id: string){
    try{
      const rejectedCompany = await this.adminService.rejectCompany(id);
      return response.status(HttpStatus.OK).json({
        message: 'company rejected successfully',
        rejectedCompany,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to reject company',
        error :error,
        statusCode: 400,
      })
    }
  } 
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Get('getCondidate/:id')
  
  async getCondidate(@Res() response, @Param('id') id: string){
    try{
      const condidate = await this.adminService.getCondidateByID(id);
      return response.status(HttpStatus.OK).json({
        message : 'condidate retrieved successfully',
        condidate,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to fetch condidate',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Get('getCompany/:id')
  
  async getCompanyById(@Res() response, @Param('id') id: string){
    try{
      const company = await this.adminService.getCompanyById(id);
      return response.status(HttpStatus.CREATED).json({
        message: 'company fetched successfully',
        company,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to fetch company',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('jobOffer/:id/approve')
  
  async approveJobOffer(@Res() response, @Param('id') id:string){
    try{
      const jobOffer = await this.adminService.approveJobOffer(id);
      return response.status(HttpStatus.OK).json({
        message: 'job Offer approved successfully',
        jobOffer,
        statusCode: 201,
      });
    }catch(error){
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'failed to approve job Offer',
        error: (error as Error).message,
        statusCode: 400,
      })
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('jobOffer/:id/reject')
  async rejectJobOffer(@Res() response, @Param('id') id: string) {
    try {
      const jobOffer = await this.adminService.rejectJobOffer(id);
      return response.status(HttpStatus.OK).json({
        message: 'Job offer rejected successfully',
        jobOffer,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to reject job offer',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('jobApplication/:id/approve')
  async approveJobApplication(@Res() response, @Param('id') id: string) {
    try {
      const jobApplication = await this.adminService.approveJobApplication(id);
      return response.status(HttpStatus.OK).json({
        message: 'Job application approved successfully',
        jobApplication,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to approve job application',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }

  @UseGuards(AccesTokenGuards, RoleGuard)
  @Role(UserRole.ADMIN)
  @Patch('jobApplication/:id/reject')
  async rejectJobApplication(@Res() response, @Param('id') id: string) {
    try {
      const jobApplication = await this.adminService.rejectApplication(id);
      return response.status(HttpStatus.OK).json({
        message: 'Job application rejected successfully',
        jobApplication,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Failed to reject job application',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
}

