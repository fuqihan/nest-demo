import { Controller, OnModuleInit, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { GrpcMethod } from "@nestjs/microservices";
import { History, User } from "../../../common/interface/daka.interface";
import { async } from "rxjs/internal/scheduler/async";
import { ClentServe } from "../../../core/src/serve/client.serve";
import { UserService } from "../../../common/interface/api.interface";

@Controller()
export class CompanyController implements OnModuleInit {
  private userService: UserService;
  constructor(
    @InjectModel("Company") private readonly companyModel: Model<any>,
    @Inject(ClentServe) private readonly clentServe: ClentServe
  ) {
    // console.log(clentServe)
    // this.userService = clentServe.client.getService<UserService>(
    //   "UserService"
    // );
  }
  onModuleInit() {
    this.userService = this.clentServe.client.getService<UserService>(
      "UserService"
    );
  }

  // @GrpcMethod("CompanyService")
  // addCompany(): any {
    
  //   return [];
  // }

  // @GrpcMethod("CompanyService")
  // findOne(data: any): any {
  //   const items: any[] = [{ id: 1, name: "Damon" }, { id: 2, name: "Ran" }];
  //   return this.userService.findOne({ id: 1 });
  // }


  @GrpcMethod("CompanyService")
  addCompany(data: any): Promise<any> {
    const createUser = new this.companyModel(data);
    return createUser.save();
  }
}
