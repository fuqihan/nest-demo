import { ParseIntPipe, UseGuards, Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ClentServe } from '../../serve/client.serve';
import { Observable } from 'rxjs';
import { UserService, HistoryService } from '../../../../common/interface/api.interface';

@Resolver('User')
export class UserResolvers implements OnModuleInit {
  private userService: UserService;
  constructor(@Inject(ClentServe) private readonly clentServe: ClentServe) {
  }

  onModuleInit() {
    this.userService = this.clentServe.client.getService<UserService>(
      "UserService"
    );
  }

  @Query('getUser')
  async getUser(
    @Args('phone')
    phone: string,
  ) {
    try {
      let user = await this.userService.findOneByPhone({ phone }).toPromise();
      return {
        name: user.name,
        phone: user.phone,
        dept: user.dept,
        company: user.company.name,
        id: user.id,
        faceRegister: user.faceRegister,
        companyLocation: user.company.addr[user.companyLocation].location,
        companyAddr: user.company.addr[user.companyLocation].text
      };
    } catch (error) {
      console.log(error);
      return {}
    }
  }

}
