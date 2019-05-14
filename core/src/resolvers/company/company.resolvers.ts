import { ParseIntPipe, UseGuards, Inject, OnModuleInit } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { ClentServe } from "../../serve/client.serve";
import { Observable } from "rxjs";
import { CompanyService } from "../../../../common/interface/api.interface";
import { async } from "rxjs/internal/scheduler/async";

@Resolver("Company")
export class CompanyResolvers implements OnModuleInit {
  private companyService: CompanyService;
  constructor(@Inject(ClentServe) private readonly clentServe: ClentServe) {}

  onModuleInit() {
    this.companyService = this.clentServe.companyClient.getService<
      CompanyService
    >("CompanyService");
  }

  @Mutation('createCompany')
  async createCompany(
    @Args('name')
    name: string,
    @Args('dept')
    dept,
    @Args('addr')
    addr,
  ) {
    return this.companyService.addCompany({name, dept, addr});
  }
  // @Query("searchHistory")
  // async findByDate() {
  //   return this.companyService.addCompany();
  // }
}
