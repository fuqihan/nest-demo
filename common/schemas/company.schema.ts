import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;
export const CompanySchema = new Schema({
    name: String,   // 公司名
    defaultAddr: { type: Number, default: 0 },
    addr: [{
        text: String,
        location: String 
     }],  // 公司地址  有多个地址
    dept: [String] // 部门
   
});
