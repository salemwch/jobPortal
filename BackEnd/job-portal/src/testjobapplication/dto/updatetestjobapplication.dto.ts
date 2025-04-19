import { PartialType } from '@nestjs/mapped-types';
import { CreateTestJobApplicationDto } from './createtestjobapplication.dto';

export class UpdateTestJobApplicationDto extends PartialType(
  CreateTestJobApplicationDto
) {}
