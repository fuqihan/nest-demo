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

export const grpcHistoryClentOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: grpcServe.history.url,
    package: grpcServe.history.package,
    protoPath: join(__dirname, '../../common/proto/history.proto'),
  },
};

export const grpcCompanyClentOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: grpcServe.company.url,
    package: grpcServe.company.package,
    protoPath: join(__dirname, '../../common/proto/company.proto'),
  },
}