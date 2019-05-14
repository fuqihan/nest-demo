export interface User {
  name: string; // 姓名
  phone: string; // 电话/账号
  dept: string; // 部门
  passwd: string; // 密码
  roles: Array<number>;
  company: string;
  id: string;
  faceRegister: boolean;
  companyLocation: number;
  permission: Permission;
}

export interface Permission {
  entryPage: boolean,  // 管理页面权限
  setLocation: boolean,  // 变更地址权限
  exportXlsx: boolean, // 到处表格权限
  addUser: boolean,  // 添加用户权限
  editUser: boolean,  // 修改用户权限
  locationManage:  boolean,  // 位置管理
  checkAttendance:  boolean,  // 检查出勤
  setPermission:  boolean,  // 设置权限
}
export interface History {
  userId: string,
  history: [
    {
      switchLocation: string; // 坐标
      switchAddr: string; // 地址
      onHour: boolean;
      offHour: boolean
      date: Date;
    }
  ];
}

export interface Company {
  name: string,
  location: string,
  addr: string,
  dept: string,
}

export interface BackInterface {
  code: number;
  data: any;
  message: string;
}
