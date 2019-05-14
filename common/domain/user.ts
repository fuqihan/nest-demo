import { CommonEntity } from "./CommonEntity";
import { ROLES } from "../enum";
import { parseTf } from '../utils/utils';
export class UserEntity extends CommonEntity {
  name: string; // 姓名
  phone: string; // 电话/账号
  dept: string; // 部门
  passwd: string; // 密码
  roles: Array<number>;
  company: any;
  id: string;
  faceRegister: boolean;
  companyLocationIschange: boolean;
  companyLocation: number;
  permission: {
    admin: boolean;
    default: boolean;
    boss: boolean;
    entryPage: boolean; // 管理页面权限
    setLocation: boolean; // 变更地址权限
    exportXlsx: boolean; // 到处表格权限
    addUser: boolean; // 添加用户权限
    editUser: boolean; // 修改用户权限
    locationManage: boolean; // 位置管理
    checkAttendance: boolean; // 检查出勤
    setPermission: boolean; // 设置权限
  };
  constructor() {
    super();
    this.name = "";
    this.phone = "";
    this.dept = "";
    this.passwd = "";
    this.roles = new Array();
    this.company = "";
    this.id = "";
    this.faceRegister = false;
    this.companyLocationIschange = false;
    this.companyLocation = 0;
    this.permission = {
      admin: false,
      default: false,
      boss: false,
      entryPage: false,
      setLocation: false,
      exportXlsx: false,
      addUser: false,
      editUser: false,
      locationManage: false,
      checkAttendance: false,
      setPermission: false
    };
  }

  setUser(data: any) {
    this.setObj(data);
    this._permissionChange();
  }

  // 把roles转为具体的权限
  _permissionChange() {
    let roleByKey = {};
    Object.keys(ROLES).forEach(_k => {
      roleByKey[ROLES[_k]] = _k;
    });
    this.roles.forEach(_r => {
      this.permission[parseTf(roleByKey[_r])] = true;
    });
  }

}
