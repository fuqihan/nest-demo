import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { gqlRoles } from "../../../common/config/index";
import * as _ from "lodash";

@Injectable()
export class AuthGurad implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctxInfo = gqlCtx.getInfo();
    if(!ctxInfo) return true;
    const user = gqlCtx.getContext().user;
    const isInit = gqlCtx.getContext().isInit;
    // console.log(gqlCtx)
    return true;
    // 未完成初始化
    if (!isInit) return false;
    // token错误
    if(!user.id) return false;
    // 获取当前gql需要的童虎权限
    let ctxRoles =
      gqlRoles[ctxInfo.parentType.name][ctxInfo.fieldName.toLowerCase()];
    // 权限不足
    if (_.intersection(user.roles, ctxRoles).length === 0) return false;
    // console.log(gqlCtx);
    return true;
  }
}
