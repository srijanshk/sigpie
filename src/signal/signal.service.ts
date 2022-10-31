import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SignalService {
  async getSignalFromTA(data: any) {
    try {
      if (data.auth) {
        console.log(data)
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            errors: "Auth Not Found"
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
