import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { grpcServe } from '../../common/config/index';
export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: grpcServe.company.url,
    package: grpcServe.company.package,
    protoPath: join(__dirname, '../../common/proto/company.proto'),
  },
};
