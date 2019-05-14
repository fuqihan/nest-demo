  // 把枚举的格式转为驼峰格式
export function parseTf(str: string) {
    let arr = str.split('_');
    for (let i = 1; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
    }
    return arr.join('');
  }