import { Injectable } from "@nestjs/common";
import { ClientGrpc, Client } from "@nestjs/microservices";
import {
  grpcClientOptions,
  grpcHistoryClentOptions,
  grpcCompanyClentOptions
} from "../grpc-hero.options";

@Injectable()
export class ClentServe {
  constructor() {}
  @Client(grpcClientOptions) public readonly client: ClientGrpc;
  @Client(grpcHistoryClentOptions) public readonly historyClient: ClientGrpc;
  @Client(grpcCompanyClentOptions) public readonly companyClient: ClientGrpc;
}
