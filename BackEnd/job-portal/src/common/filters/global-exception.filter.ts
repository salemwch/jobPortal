import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from '../logger/winston.logger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorType = this.getErrorType(exception);
    const errorMessage = this.getErrorMessage(exception);

    const errorResponse = {
      success: false,
      type: errorType,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: errorMessage,
      correlationId: request.headers['x-correlation-id'] || null,
    };

    //  Log with Winston
    const logDetails = {
      method: request.method,
      url: request.url,
      status,
      type: errorType,
      message: errorMessage,
      correlationId: request.headers['x-correlation-id'] || null,
      stack: exception.stack || null,
    };

    if (status >= 500) {
      logger.error(` ${errorType}`, logDetails); // this is for  serious errors
    } else {
      logger.warn(` ${errorType}`, logDetails); // and this is for client-related errors
    }

    response.status(status).json(errorResponse);
  }

  private getErrorType(exception: any): string {
    if (exception instanceof HttpException) return 'HttpException';
    if (exception.name === 'ValidationError') return 'ValidationError';
    if (exception.name === 'MongoServerError') return 'MongoError';
    if (exception.name === 'CastError') return 'CastError';
    return 'InternalServerError';
  }

  private getErrorMessage(exception: any): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      return typeof response === 'string'
        ? response
        : (response as any).message || 'Http Exception';
    }

    if (exception.name === 'CastError') {
      return `Invalid ${exception.path}: ${exception.value}`;
    }

    if (exception.name === 'MongoServerError' && exception.code === 11000) {
      const field = Object.keys(exception.keyValue)[0];
      return `Duplicate ${field}: ${exception.keyValue[field]}`;
    }

    return exception.message || 'Internal server error';
  }
}
