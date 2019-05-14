import * as mongoose from 'mongoose';
import { MONGO_NAME } from '../config/index';
let Schema = mongoose.Schema;
export const HistorySchema = new Schema({
  userId: { type: String, unique: true, ref: MONGO_NAME.USER },
  history: [
    {
      switchLocation: String, // 坐标
      switchAddr: String, // 地址
      onHour: { type: Boolean, default: false },
      offHour: { type: Boolean, default: false },
      date: Date,
      onDate: Date,
      offDate: Date,
      onLocation: String,
      offLocation: String,
    }
  ]
});
