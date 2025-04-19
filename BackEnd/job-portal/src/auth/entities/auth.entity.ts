import { Schema } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Schema()
export class Auth {}
