import * as mongoose from "mongoose";
import { MONGO_NAME } from '../config/index';
let Schema = mongoose.Schema;
export const ChatSchema = new Schema({
    name: String, // 姓名
    type: Number,
    chats: [{
        from: { type: String, ref: MONGO_NAME.USER },
        date: {
            type: Date,
            default: Date.now
        },
        text: String
    }]
});
