import * as jwt from "jsonwebtoken";
import { User } from "../interface/daka.interface";
import { tokenConfig } from '../config/index';
import { UserEntity } from "../domain/user";
class _Jwt {
    constructor() {}

    // 创建token
  createToken(user: User) {
    // const exp = Math.floor(Date.now()) + (tokenConfig.expireTime * 1000);
    return jwt.sign(user, tokenConfig.key);
  }

  verifyToken(token: string): User {
    try {
      token = token.replace(/Bearer /, '');
      const user = jwt.verify(token, tokenConfig.key);
      const _now = Math.floor(Date.now());
      const exp = Math.floor(user.iat * 1000) + (tokenConfig.expireTime * 1000);
      if(exp > _now) {
        return user;
      } 
    } catch (error) {
      
    }
    return new UserEntity();
  }
}

export const Jwt =  new _Jwt();