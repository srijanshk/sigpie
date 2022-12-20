import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService,
    @Inject('File')
    private fileRepository: typeof File,
  ) {}

  async uploadFile(file): Promise<File> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const path = {
      local: `/${this.configService.get('app.apiPrefix')}/v1/${file.path}`,
      s3: file.location,
    };

    return this.fileRepository.create({
      path: path[this.configService.get('file.driver')],
    });
  }
}
