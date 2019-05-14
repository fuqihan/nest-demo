import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { grpcServe } from '../../common/config/index';
export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: grpcServe.user.url,
    package: grpcServe.user.package,
    protoPath: join(__dirname, '../../common/proto/user.proto'),
  },
};
