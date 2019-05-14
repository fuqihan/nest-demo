import * as mongoose from "mongoose";
import { MONGO_NAME } from '../config/index';
let Schema = mongoose.Schema;
export const UserRoomSchema = new Schema({
  userId: { type: String, ref: MONGO_NAME.USER }, 
  rooms: [{
      name: String,
  }]
});