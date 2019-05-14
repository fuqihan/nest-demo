import * as mongoose from "mongoose";
import { MONGO_NAME } from '../config/index';
let Schema = mongoose.Schema;
export const UserSchema = new Schema({
  name: String, // 姓名
  phone: { type: String, unique: true }, // 电话/账号
  dept: String, // 部门
  passwd: { type: String, default: "123456" }, // 密码
  roles: Array,
  company: { type: String, ref: MONGO_NAME.COMPANY },
  faceRegister: { type: Boolean, default: false },
  companyLocation: { type: Number, default: 0 },
});
