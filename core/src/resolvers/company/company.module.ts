import { Module } from "@nestjs/common";
import { APP_GUARD } from '@nestjs/core';
import { CompanyResolvers } from "./company.resolvers";
import { ClentServe } from "../../serve/client.serve";
import { AuthGurad } from "../../auth/auth.guard";
@Module({
  providers: [
    { provide: APP_GUARD, useClass: AuthGurad },
    CompanyResolvers,
    ClentServe
  ],
  exports: [ClentServe],
})
export class CompanyModule {}
