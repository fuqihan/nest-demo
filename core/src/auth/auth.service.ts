import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClentServe } from "../serve/client.serve";
import {
  UserService,
  HistoryService
} from "../../../common/interface/api.interface";

@Injectable()
export class AuthService {
  private userService: UserService;
  constructor(@Inject(ClentServe) private readonly clentServe: ClentServe) {}
  Init() {
    if (!this.clentServe) {
      return false;
    }
    this.userService = this.clentServe.client.getService<UserService>(
      "UserService"
    );
    return true;
  }
}
