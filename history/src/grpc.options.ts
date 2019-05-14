import { Transport, ClientOptions } from '@nestjs/microservices';
import { join } from 'path';
import { grpcServe } from '../../common/config/index';
export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: grpcServe.history.url,
    package: grpcServe.history.package,
    protoPath: join(__dirname, '../../common/proto/history.proto'),
  },
};
