import { CommonEntity } from "./CommonEntity";

interface Addr {
  name: String;
  location: String;
}

export class CompanyEntity extends CommonEntity {
  name: string; // 公司名
  defaultAddr: {
    text: string;
    location: string;
  };
  addr: Array<Addr> // 公司地址  有多个地址
  dept: Array<string>; // 部门

  constructor() {
    super();
    this.name = '';
    this.defaultAddr.text = '';
    this.defaultAddr.location = '';
    this.addr = new Array();
    this.dept = new Array();
  }
}
