// 给其他实体类继承以写通用的方法
export class CommonEntity{
    setObj(obj: any) {
        Object.keys(obj).forEach(item => {
            if (this.hasOwnProperty(item)) { 
                this[item] = obj[item]
            }
        })
    }
}