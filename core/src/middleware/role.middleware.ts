import { Injectable, NestMiddleware, MiddlewareFunction, Inject } from '@nestjs/common';
import { ClentServe } from "../serve/client.serve";
import { UserService } from "../../../common/interface/api.interface";
import { UserEntity } from '../../../common/domain/user';
import { Jwt } from '../../../common/utils/jwt';
import { Back } from '../../../common/utils/back';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  private userService: UserService;
  constructor(@Inject(ClentServe) private readonly clentServe: ClentServe,) {
    this.userService = this.clentServe.client.getService<UserService>(
      "UserService"
    );
  }
  resolve(...args: any[]): MiddlewareFunction {
    return async (req, res, next) => {
      let user = Jwt.verifyToken(req.headers.authorization);
      // 检查token是否正确，过期
      if(!user.id) {
        return res.json(Back.error('未登录')); 
      }
      req.user = user;
      // let user = new UserEntity();
      // user.setObj({
      //   phone: '18789801138'
      // })
      // let data = (await this.userService.findUser(user).toPromise()).data;
      // console.log(Jwt.createToken(data))
      return res.json('1')
      req.user = user;
      next();
    };
  }

}