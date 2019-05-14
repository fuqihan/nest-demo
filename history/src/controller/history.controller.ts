import { Controller, Inject } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { UserService } from "../../../common/interface/api.interface";
import { HistoryServe } from "../serve/history.serve";
import { Back } from "../../../common/utils/back";

@Controller()
export class HistoryController {
  private userService: UserService;
  constructor(@Inject(HistoryServe) private historyServe: HistoryServe) {}

  @GrpcMethod("HistoryService")
  async findByDate(data: any) {
    const { phone, year, month, day } = data;
    let historys = await this.historyServe.getHistorysByPhone(phone);
    return this.historyServe.getHistoryByDate(historys, year, month, day) || {};
  }

  @GrpcMethod("HistoryService")
  async defaultHistory(data: any) {
    const { phone } = data;
    let historys = await this.historyServe.getHistorysByPhone(phone);
    return { history: historys };
  }

  @GrpcMethod("HistoryService")
  async daka(data: any) {
    try {
      const { phone, type, date, location } = data;
      let { historys, user } = await this.historyServe.getHistorysByPhone(
        phone,
        true
      );
      let _date = new Date(date);
      let nowHistory = this.historyServe.getHistoryByDate(
        historys,
        _date.getFullYear(),
        _date.getMonth() + 1,
        _date.getDate()
      );
      await this.historyServe.handleDaka(
        user,
        type,
        location,
        nowHistory,
        _date
      );
      return Back.success('');
    } catch (error) {
      console.log(error);
      return Back.error('', error.message);
    }
  }

  @GrpcMethod("HistoryService")
  addList(): any {
    // let list = {
    //   userId: "5c0dd3bd200c1115cc7d4f11",
    //   history: [
    //     {
    //       switchLocation: "1",
    //       switchAddr: "1",
    //       onHour: false,
    //       offHour: false,
    //       date: new Date().toString()
    //     }
    //   ]
    // };
    // const createUser = new this.historyModel(list);
    // return createUser.save();
    return [];
  }
}
