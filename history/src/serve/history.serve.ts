import { Injectable, OnModuleInit, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { ClentServe } from "../../../core/src/serve/client.serve";
import { UserService } from "../../../common/interface/api.interface";
import * as _ from 'lodash';
@Injectable()
export class HistoryServe implements OnModuleInit {
  private userService: UserService;
  constructor(
    @InjectModel("History") private readonly historyModel: Model<any>,
    @Inject(ClentServe) private readonly clentServe: ClentServe
  ) {}

  onModuleInit() {
    this.userService = this.clentServe.client.getService<UserService>(
      "UserService"
    );
  }

  /**
   *   根据时间找历史纪录
   *
   * @param {*} [historys=[]]
   * @param {*} year
   * @param {*} month
   * @param {*} day
   * @returns
   * @memberof HistoryServe
   */
  getHistoryByDate(historys = [], year, month, day) {
    let _history = null;
    historys.forEach((_h, index) => {
      let _date = new Date(_h.date);
      if (
        _date.getFullYear() === year &&
        _date.getMonth() + 1 === month &&
        _date.getDate() === day
      ) {
        _history = _.assign(_h, {'$index': index});
      }
    });
    return _history;
  }

  /**
   *  根据电话获取历史
   *
   * @param {*} phone
   * @returns
   * @memberof HistoryServe
   */
  async getHistorysByPhone(phone: string, isGetUser = false) {
    let user: any = await this.userService
      .findOneByPhone({ phone })
      .toPromise();
    const historys = (await this.historyModel
      .findOne({ userId: user.id.toString() })
      .exec()).history;
    if (isGetUser) {
      return {
        user,
        historys
      };
    }
    return historys || [];
  }

  /**
   *   打卡操作
   *
   * @param {*} user
   * @param {*} type
   * @param {*} location
   * @param {*} history
   * @returns
   * @memberof HistoryServe
   */
  async handleDaka(user, type, location, history, date) {
    if (history) {
      let param = {
        switchLocation: history.switchLocation, // 坐标
        switchAddr: history.switchAddr, // 地址
        onHour: history.onHour,
        offHour: history.offHour,
        date: date,
        onDate: history.onDate,
        offDate: history.offDate,
        onLocation: history.onLocation,
        offLocation: history.offLocation
      };
      if (type === "on") {
        param.onHour = true;
        param.onDate = date;
        param.onLocation = location;
      } else {
        param.offHour = true;
        param.offDate = date;
        param.offLocation = location;
      }
      const _updateKey = `history.${history.$index}`;
      await this.historyModel.update(
        { userId: user.id.toString() },
        { [_updateKey]: param },
        { multi: true }
      );
    } else {
      let param = {
        switchLocation: user.company.addr[user.companyLocation].location, // 坐标
        switchAddr: user.company.addr[user.companyLocation].text, // 地址
        date: date,
        onHour: false,
        offHour: false,
        onDate: null,
        offDate: null,
        onLocation: null,
        offLocation: null
      };
      if (type === "on") {
        param.onHour = true;
        param.onDate = date;
        param.onLocation = location;
      } else {
        param.offHour = true;
        param.offDate = date;
        param.offLocation = location;
      }
      await this.historyModel.update(
        { userId: user.id.toString() },
        {
          $push: {
            history: param
          }
        },
        { multi: true }
      );
    }
  }

  
}
