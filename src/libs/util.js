exports.install = function (Vue, options) {
  Vue.prototype.currency = function (value, currency, decimals) { // 格式化货币输出
    const digitsRE = /(\d{3})(?=\d)/g
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) {
      return '--';
    }
    currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals
      ? stringified.slice(0, -1 - decimals)
      : stringified
    var i = _int.length % 3
    var head = i > 0
      ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
      : ''
    var _float = decimals
      ? stringified.slice(-1 - decimals)
      : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head +
      _int.slice(i).replace(digitsRE, '$1,') +
      _float
  };

  Vue.prototype.getTreeData = function (data, pid) { // 获取树结构. data格式[{id：0，parentid: 0}]
    let result = [];
    let temp;
    for (let i in data) {
      if (data[i].parentid == pid) {
        data[i].title = data[i].name;
        data[i]._checked = data[i]._checked;
        data[i].expand = true;
        temp = this.getTreeData(data, data[i].id);
        if (temp.length > 0) {
          data[i].children = temp;
        }
        result.push(data[i]);
      }
    }
    return result;
  };

  Vue.prototype.setDepartment = function (data, id, val) { // 设置单选树结构 id：不存在时表明在遍历当前点击的树节点的子节点，状态一致, data格式：[{id:0, parentid: 0, children: []}]
    let result = [];
    for (let i in data) {
      if (id) {
        if (id == data[i].id) {
          data[i]._checked = val;
          if (data[i].children && data[i].children.length > 0) {
            this.setDepartment(data[i].children, null, val);
          }
        } else {
          data[i]._checked = false;
          if (data[i].children && data[i].children.length > 0) {
            this.setDepartment(data[i].children, id, val);
          }
        }
      } else {
        data[i]._checked = val;
        if (data[i].children && data[i].children.length > 0) {
          this.setDepartment(data[i].children, null, val);
        }
      }
      result.push(data[i]);
    }
    return result;
  };
  /* 验证空对象{} */
  Vue.prototype.isObjEmpty = function (object) {
    if (object === null || object === undefined) {
      return true;
    }
    for (let i in object) {
      // 存在属性或方法,则不是空对象
      return false;
    }
    return true;
  };

  Vue.prototype.numAdd = function (num1, num2) {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
  };

  Vue.prototype.Trim = function (str, isGlobal) { // 去掉字符串中所有空格(包括中间空格,需要设置第2个参数为:g)
    let result;
    result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (isGlobal && isGlobal.toLowerCase() == 'g') {
      result = result.replace(/\s/g, '');
    }
    return result;
  };
};
