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
  UseGuards,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { RefreshTokenGuards } from 'src/guards/refreshToken.guards';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/guards/role.decorator';
import { UserRole } from 'src/userRole/userRole';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}
  @Post(':companyId')
  async createEvaluation(
    @Res() response,
    @Param('companyId') companyId: string,
    @Body() { condidateId, rating, review }
  ) {
    try {
      const evaluation = await this.evaluationService.createEvaluation(
        condidateId,
        companyId,
        rating,
        review
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'evaluation created successfully',
        evaluation,
        statusCode: 201,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error creating evaluation',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(RefreshTokenGuards)
  @Get(':companyId')
  async getEvaluation(@Res() response, @Param('companyId') companyId: string) {
    try {
      const evalutions =
        await this.evaluationService.getEvaluationForCompany(companyId);
      return response.status(HttpStatus.OK).json({
        message: 'evalautions fetched successfully',
        evalutions,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error fetching evaluations',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(RefreshTokenGuards, RoleGuard)
  @Role(UserRole.CONDIDATE)
  @Delete(':companyId')
  async deleteEvaluation(
    @Res() response,
    @Param('companyId') companyId: string,
    @Body() { condidateId }
  ) {
    try {
      await this.evaluationService.deleteEvaluation(condidateId, companyId);
      return response.status(HttpStatus.OK).json({
        message: 'evaluation deleted successfully',
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'error deleting evalution',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
  @UseGuards(RefreshTokenGuards)
  @Get(':companyId/:condidateId')
  async getEvaluationByCandidate(
    @Res() response,
    @Param('companyId') companyId: string,
    @Param('condidateId') condidateId: string
  ) {
    try {
      const evaluation = await this.evaluationService.getEvaluationByCondidate(
        condidateId,
        companyId
      );
      return response.status(HttpStatus.OK).json({
        message: 'Evaluation fetched successfully',
        evaluation,
        statusCode: 200,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error fetching evaluation',
        error: (error as Error).message,
        statusCode: 400,
      });
    }
  }
}
