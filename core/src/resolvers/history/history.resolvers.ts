import { ParseIntPipe, UseGuards, Inject, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { ClentServe } from '../../serve/client.serve';
import { Observable } from 'rxjs';
import { UserService, HistoryService } from '../../../../common/interface/api.interface';

@Resolver('History')
export class HistoryResolvers implements OnModuleInit {
  private historyService: HistoryService;
  constructor(@Inject(ClentServe) private readonly clentServe: ClentServe) {
  }

  onModuleInit() {
    this.historyService = this.clentServe.historyClient.getService<HistoryService>(
      "HistoryService"
    );
  }

  @Query('searchHistory')
  async findByDate(
    @Args('phone')
    phone: string,
    @Args('year')
    year,
    @Args('month')
    month,
    @Args('day')
    day,
  ) {
    return (await this.historyService.findByDate({ phone, year, month, day }).toPromise());
  }

  @Query('defaultHistory')
  async defaultHistory(
    @Args('phone')
    phone: string,
  ) {
    return (await this.historyService.defaultHistory({ phone }).toPromise()).history;
  }

  @Mutation('daka')
  async daka(
    @Args('date')
    date: String,
    @Args('phone')
    phone: string,
    @Args('type')
    type: string,
    @Args('location')
    location: string,
  ) {
    return (await this.historyService.daka({ date, phone, type, location }).toPromise());
  }
}
