// 浏览器session保存用键值常量
var CONST_SESSION_CTX = "sino.session.ctx";

$(function () {
    // 生成固定表头Table
    genFixedTable();
    checkDate();
    /*展开&收起*/
    $('.sino-form-title a[data-toggle="show"]').on("click", function () {
        $(this).parent().parent().next('.sino-form').toggle("slow");
        $(this).find('i').toggleClass('fa-angle-double-down');
        if($(this).find('i').hasClass('fa-angle-double-down')) {
            $(this).find('span').text('展开');
        }else {
            $(this).find('span').text('收起');
        }
    });
});
function getMisBodyVal(id,tenantId,companyId,val) {
    $.ajax({
        url: "/api-system/flex/getMisBodyVal",
        data: {tenantId: tenantId,companyId:companyId},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if(val==null || val==''){
                val="ERP";
            }
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if(val!='ICT'){
                        if(key!='ICT'){
                            if (val == key) {
                                opn = "<option ouId='" + value.id + "' value='" + key + "' selected>" + value.name + "</option>";
                            } else {
                                opn = "<option ouId='" + value.id + "' value='" + key + "'>" + value.name + "</option>";
                            }
                        }
                    }else{
                        if(key=='ICT'){
                            opn = "<option ouId='" + value.id + "' value='" + key + "' selected>" + value.name + "</option>";
                        }else if(key=="ERP"){
                            opn = "<option ouId='" + value.id + "' value='" + key + "'>" + value.name + "</option>";
                        }
                    }
                    $("#" + id).append(opn);
                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}
/**
 * 定义提交等待弹出框
 */
var sinoWaitingDialog;

function getOuList(companyId) {
    var values='';
    $.ajax({
        url: "/api-system/ou/getOuByCompanyId",
        data: {companyId: companyId},
        dataType: "JSON",
        async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                values=data.data;
            }
        }
    });
    return values;
}
function getOuName(organizationId) {
    var value =  "";
    $.ajax({
        url: "/api-system/io/getAllIo",
        data: {organizationId: organizationId},
        dataType: "JSON",
        async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                value = data.data;
                if(value.length>1){
                    alert("io数据问题，请联系管理员！")
                    return;
                }
            }
        }
    });
    return value[0];
}
//OU循环赋值下拉
function ouListOption(id,data,ouId) {
    if (data != null) {
        $.each(data,function (index,value) {
            if (ouId == value.orgId) {
                $("#" + id).append("<option value='" + value.orgId + "' selected>" + value.companyName + "</option>");
            }else {
                $("#" + id).append("<option value='" + value.orgId + "'>" + value.companyName + "</option>");
            }
        })
    }
    $("#" + id).selectpicker('refresh');
}
function showSinoWaiting() {
    if (sinoWaitingDialog && sinoWaitingDialog.opened) return;
    sinoWaitingDialog = new BootstrapDialog({
        cssClass: 'sino-waiting-dlg',
        closable: false
    });
    sinoWaitingDialog.realize();
    sinoWaitingDialog.getModalHeader().hide();
    sinoWaitingDialog.getModalFooter().hide();
    sinoWaitingDialog.getModalBody().parent().css('background-color', 'transparent').css('border', 'none');
    sinoWaitingDialog.open();
}

function hideSinoWaiting() {
    if (sinoWaitingDialog) sinoWaitingDialog.close();
    ///当隐藏但有模态框打开时，在body追加  addClass("modal-open");
    $.each($(".modal.sino-box"), function(ind, ele){
       if($(ele).css("display") == "block"){
           setTimeout(function(){
                $("body.theme-a").addClass("modal-open");
           },500)
       }
    });
}

String.prototype.replaceAll = stringReplaceAll;

function stringReplaceAll(AFindText, ARepText) {
    var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
    return this.replace(raRegExp, ARepText);
}

function nullToEmpty(val) {
    if (val == null || val == undefined || val === "null") {
        return "";
    } else {
        return val;
    }
}



function nullToZero(val) {
    if (val == null || val == undefined) {
        return "0";
    } else {
        return val;
    }
}

function nullToOne(val) {
    if (val == null || val == undefined) {
        return "1";
    } else {
        return val;
    }
}

// 生成固定表头Table
function genFixedTable() {

    // 固定表头Table
    var fixTables = $(".sino-table-fixed");
    if (fixTables.length > 0) {
        fixTables.each(function (i, item) {
            var $sourceTable = $(item);
            $sourceTable.css("visibility", "hidden");

            var tbodyHeight = $sourceTable.attr("tbodyHeight");
            if (!tbodyHeight) {
                alert("固定表头Table必须设置tbodyHeight");
                return;
            }

            var $colgroup = $sourceTable.find("colgroup");
            if ($colgroup.length == 0) {
                alert("固定表头Table必须设置colgroup");
                return;
            }
            var tableWidth = "0";
            var widthUnit = "";
            var $cols = $colgroup.find("col");
            $cols.each(function () {
                if (tableWidth == undefined) {
                    return;
                }
                var width = $(this).prop("width");
                if (!width) {
                    alert("colgroup必须设置width");
                    tableWidth = undefined;
                    return;
                }
                if (width.indexOf("%") != -1) {
                    widthUnit = "%";
                    width = width.replace("%", "");
                } else {
                    width = width.replace("px", "");
                    widthUnit = "px";
                }
                tableWidth = Number(tableWidth).add(Number(width)).toFixed(1);
            });
            if (tableWidth == undefined) {
                return;
            }
            if (widthUnit == "%") {
                // 如果是百分比，需要重新计算列宽
                var tablePercent = "0";
                $cols.each(function (i) {
                    var width = $(this).prop("width").replace("%", "");
                    var colPercent;
                    if (i == $cols.length - 1) {
                        // 最后一列补足100%
                        colPercent = Number("100").sub(Number(tablePercent));
                    } else {
                        colPercent = (Number(width) * 100).div(Number(tableWidth)).toFixed(1)
                    }
                    if (colPercent < 1) {
                        // IE8，宽度小于1%显示不正常
                        colPercent = 1;
                    }
                    $(this).attr("width", colPercent + "%");
                    tablePercent = Number(tablePercent).add(Number(colPercent)).toFixed(1);
                });
            }
            // 设置Table宽度
            $sourceTable.css("width", tableWidth + widthUnit);

            var tableId = $sourceTable.prop("id");
            if (!tableId) {
                tableId = "sinoTable" + i;
            }
            // 表头DIV
            var divId = tableId + "-div-head";
            var divIdBody = tableId + "-div-body";
            var divHead = "<div id='" + divId + "' style='overflow-y: auto; overflow-x: hidden; width: 100%;'" +
                " onscroll='document.getElementById(\"" + divIdBody + "\").scrollLeft = this.scrollLeft'/>";
            var $tableHead = $sourceTable.clone().removeAttr("id");
            $tableHead.find("tbody").remove();
            $tableHead.css("visibility", "visible");
                var $divHead = $(divHead).append($tableHead);

            // 列表DIV
            var divBody = "<div id='" + divIdBody + "' style='max-height: " + tbodyHeight + ";overflow-y: auto; overflow-x: auto;'" +
                " onscroll='document.getElementById(\"" + divId + "\").scrollLeft = this.scrollLeft'/>";
            var $tableBody = $sourceTable.clone();
            $tableBody.find("thead").remove();
            $tableBody.css("visibility", "visible");
            var $divBody = $(divBody).append($tableBody);

            $sourceTable.after($divBody).after($divHead);
            $sourceTable.remove();
        })
    }
}

/**
 * 加法函数，用来得到精确的加法结果
 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 * @param arg1
 * @param arg2
 * @returns {number} arg1加上arg2的精确结果
 */
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}

/**
 * 减法函数，用来得到精确的加法结果
 * 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的加法结果。
 * @param arg1
 * @param arg2
 * @returns {string} arg1减去arg2的精确结果
 */
function accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

/**
 * 乘法函数，用来得到精确的乘法结果
 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 * @param arg1
 * @param arg2
 * @returns {number} arg1乘以arg2的精确结果
 */
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

/**
 *  除法函数，用来得到精确的除法结果
 *  javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 * @param arg1
 * @param arg2
 * @returns {number} arg1除以arg2的精确结果
 */
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

/**
 * 给Number类型增加＋－＊／方法，调用起来更加方便。
 * @param arg
 * @returns {number}
 */
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};
Number.prototype.sub = function (arg) {
    return accSub(this, arg);
};
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

String.prototype.trim = function () {
    return $.trim(this);
};

function isEmpty(arg) {
    return arg == null || arg == undefined || arg.toString().trim() == "";
}

/**
 * js文件校验
 * 校验文件类型、大小
 * @param target
 * @param id
 * @returns {boolean}
 */
function fileValidate(target, maxsize) {
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    var fileTypeArr = [".jpg", ".png", ".rar", ".txt", ".zip", ".doc", ".ppt", ".xls", ".pdf", ".docx", ".xlsx"];
    var filePath = target.value;
    var fileMaxSize;
    if (!maxsize) {
        fileMaxSize = 1024 * 8;//1M默认设置值
    }
    if (filePath) {
        var isNext = false;
        var fileExt = filePath.substring(filePath.indexOf(".")).toLowerCase();
        if (fileTypeArr && fileTypeArr.length > 0) {
            for (var i = 0; i < fileTypeArr.length; i++) {
                if (fileTypeArr[i] == fileExt) {
                    isNext = true;
                    break;
                }
            }
        }
        if (!isNext) {
            BootstrapDialog.alert("系统不支持" + fileExt + "类型文件！");
            target.value = "";
            return false;
        }
    } else {
        return false;
    }
    if (isIE && !target.files) {
        return true;
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if (!fileSystem.FileExists(filePath)) {
            BootstrapDialog.alert("附件不存在，请重新输入！");
            return false;
        }
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }

    var size = fileSize / 1024;
    if (size > fileMaxSize) {
        BootstrapDialog.alert("附件大小不能大于" + fileMaxSize / 1024 + "M！");
        target.value = "";
        return false;
    }
    if (size <= 0) {
        BootstrapDialog.alert("附件大小不能为0！");
        target.value = "";
        return false;
    }
    return true;
}

/**
 * @version 1.0
 * @author cuisuqiang@163.com
 * 用于实现页面 Map 对象，Key只能是String，对象随意
 */
var Map = function () {
    this._entrys = new Array();

    this.put = function (key, value) {
        if (key == null || key == undefined) {
            return;
        }
        var index = this._getIndex(key);
        if (index == -1) {
            var entry = new Object();
            entry.key = key;
            entry.value = value;
            this._entrys[this._entrys.length] = entry;
        } else {
            this._entrys[index].value = value;
        }
    };
    this.get = function (key) {
        var index = this._getIndex(key);
        return (index != -1) ? this._entrys[index].value : null;
    };
    this.remove = function (key) {
        var index = this._getIndex(key);
        if (index != -1) {
            this._entrys.splice(index, 1);
        }
    };
    this.clear = function () {
        this._entrys.length = 0;
    };
    this.contains = function (key) {
        var index = this._getIndex(key);
        return (index != -1) ? true : false;
    };
    this.getCount = function () {
        return this._entrys.length;
    };
    this.getEntrys = function () {
        return this._entrys;
    };
    this._getIndex = function (key) {
        if (key == null || key == undefined) {
            return -1;
        }
        var _length = this._entrys.length;
        for (var i = 0; i < _length; i++) {
            var entry = this._entrys[i];
            if (entry == null || entry == undefined) {
                continue;
            }
            if (entry.key === key) {//equal
                return i;
            }
        }
        return -1;
    };
};

/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
function dateFormat(date, format) {
    if (!date) {
        return;
    }

    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
        var v = map[t];
        if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
        }
        else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

/**
 * 对数值进行格式化，
 * @param value 要格式化的数值
 * @param scale 小数位数
 * @return String
 */
function numFormat(value, scale) {
    if (!value || isNaN(value) || !scale || isNaN(scale)) {
        return value;
    }

    return Number(value).toFixed(scale)
}
/***
 * 特殊字符转义
 * */
function htmlEscape(text){
    return text.replace(/[<>"&]/g, function(match, pos, originalText){
        switch(match){
            case "<": return "&lt;";
            case ">":return "&gt;";
            case "&":return "&amp;";
            case "\"":return "&quot;";
        }
    });
}
/**
 * 对数值进行千分位显示
 * @param value 要格式化的数值
 * @param scale 小数位数
 * @return String
 */
function numberFormat(value, scale) {
    if (!value || isNaN(value) || !scale || isNaN(scale)) {
        return value;
    }
    var str = Number(value).toFixed(scale);
    var re = /\d{1,3}(?=(\d{3})+$)/g;
    return str.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
        return s1.replace(re, "$&,") + s2;
    });
}

function compareNumber(val1, val2, acc) {

    if (isNaN(val1) || isNaN(val2)) {
        return;//不等
    }
    var num1 = Number(val1);
    var num2 = Number(val2);
    if (acc == ">" || acc == "&gt;") return num1 > num2;
    if (acc == ">=" || acc == "&gt;=") return num1 >= num2;
    if (acc == "=") return num1 == num2;
    if (acc == "<=" || acc == "&lt;=") return num1 <= num2;
    if (acc == "<" || acc == "&lt;") return num1 < num2;
}

// 获取url带的参数
function getParam(name) {
    var result = location.href.match(new RegExp('[?&]' + name + '=([^?&]+)', 'i')) ? decodeURIComponent(RegExp.$1) : '';
    if (isEmpty(result)) {
        result = getSessionStorage(name);
    }
    return result;
}
function setFormParams(str) {
    $.each(str, function (key, value) {
        if (key.indexOf("Date") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
        if (key.indexOf("Time") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
        if (!( typeof value == "boolean")&& value!=null&&value!='null'&&value!='') {
            //input框回显
            $("input[type='text'][name='" + key + "']").val(nullToEmpty(value));
            $("input[type='hidden'][name='" + key + "']").val(nullToEmpty(value));
            $("textarea[name='" + key + "']").val(nullToEmpty(value));
        }
        if ((value instanceof Object) && !(value instanceof Array)) {
            $.each(value, function (k, val) {
                if (!(typeof val == "boolean")&& val!='null' &&val!=null) {
                    //input框回显
                    if (k.indexOf("Date") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    if (k.indexOf("Time") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    try {
                        $("input[name='" + key + "." + k + "']").val(nullToEmpty(val));
                        $("textarea[name='" + key + "." + k + "']").val(nullToEmpty(val));
                    } catch (e) {
                        // console.log(e);
                        return false;
                    }

                }
            })
        }
    });
};


//赋值不用Time
function setFormParamsNoTime(str) {
    $.each(str, function (key, value) {
        if (key.indexOf("Date") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
       
        if (!( typeof value == "boolean")&& value!=null&&value!='null'&&value!='') {
            //input框回显
            $("input[type='text'][name='" + key + "']").val(nullToEmpty(value));
            $("input[type='hidden'][name='" + key + "']").val(nullToEmpty(value));
            $("textarea[name='" + key + "']").val(nullToEmpty(value));
        }
        if ((value instanceof Object) && !(value instanceof Array)) {
            $.each(value, function (k, val) {
                if (!(typeof val == "boolean")&& val!='null' &&val!=null) {
                    //input框回显
                    if (k.indexOf("Date") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    try {
                        $("input[name='" + key + "." + k + "']").val(nullToEmpty(val));
                        $("textarea[name='" + key + "." + k + "']").val(nullToEmpty(val));
                    } catch (e) {
                        // console.log(e);
                        return false;
                    }

                }
            })
        }
    });
};
// 保存本地session（当前会话有效）
function setSessionStorage(key, value) {
    window.sessionStorage.setItem(key, value);
}

// 从本地session取值（当前会话有效）
function getSessionStorage(key) {
    return window.sessionStorage.getItem(key);
}

function getCtx() {
    return window.sessionStorage.getItem(CONST_SESSION_CTX);
}

function gotoPage(loc) {
    window.location.href = getCtx() + loc;
}

function openPage(loc) {
    window.open(getCtx() + loc);
}

function getFlexValue(id, code) {//取下拉框的值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    $("#" + id).append("<option value='" + value.code + "'>" + value.name + "</option>");
                });
            }
            $("#" + id).selectpicker('refresh');
        }
    });
}

/*function outInvType(id,code) {
    if (code != null) {
        var name;
        $.each($("#" + id).find("option"), function (key, value) {
            // $("#" + id).append("<option value='" + value.code + "'>" + value.name + "</option>");
            if (code == $(value).val()) {
               name= $(value).html();
            }
        });
    }
    return name
    // $("#" + id).selectpicker('refresh');
}*/
function outInvType(code) {
    if (code != null) {
        var name;
        if ("1" == code){
            name = "子库存转移";
        } else  if ("2" == code){
            name = "项目间转移";
        } else  if ("3" == code){
            name = "属性转移";
        } else  if ("4" == code){
            name = "现场调拨";
        }
    }
    return name
}

//仅用于获取值，不进行标签赋值
function getFlexValueForVal(code,val) {//获取字典值
    var values='';
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if (val == value.code) {
                        values = value.name ;
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
    return values;
}
function getFlexList(code) {//取下拉框的列表
    var values='';
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                values=data.data;
            }
        }
    });
    return values;
}
function getLineFlexValue(clas,list) {
    $("."+clas+":visible").each(function () {
        var status=$(this).text();
        // alert(JSON.stringify(this);
        var statusDesc='';
        if(status){
            $.each(list, function (key, value) {
                if(status==value.code){
                    statusDesc=value.name;
                    return false;
                }

            });
        }
        $(this).html(statusDesc);
    });
}

function getFlexValueByValAndAttr1ForPss(id,code,val,attr1) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByAttr1",
        data: {flexSetCode: code,attr1:attr1},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                //会多次调用，所以先清空再拼接上请选择
                $("#"+id).empty();
                $("#"+id).append("<option value=\"\">---请选择---</option>");
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                    }
                    $("#" + id).append(opn);
                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}

function getFlexValueByValAndAttr1(id,code,val) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCodeAndAttr1",
        data: {flexSetCode: code,attr1:$("#economicMatter").val()},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                    }

                    $("#" + id).append(opn);
                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}


function getFlexValueByVal(id, code, val) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {

            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";

                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'title='"+value.name+"'>" + value.name + "</option>";
                    }
                    $("#" + id).append(opn);
                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}
function getFlexValueByValForPssTemp(id, code, val) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {

            if (data.data != null) {
                $("#" + id).empty();
                $.each(data.data, function (key, value) {
                    var opn = "";

                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'title='"+value.name+"'>" + value.name + "</option>";
                    }
                    $("#" + id).append(opn);
                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}
function getFlexValueByValOld(id, code, val) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {

            if (data.data != null) {

                $.each(data.data, function (key, value) {
                    var opn = "";
                    var v = value.name;
                    if(v.length>29){
                        v =v.substring(0,29);
                        if (val == value.code) {
                            opn = "<option  value='" + value.code +"'title='"+value.name+"' selected>" + v + "</option>";
                        } else {
                            opn = "<option value='" + value.code + "'title='"+value.name+"'>" + v + "</option>";
                        }
                    }else{
                        if (val == value.code) {
                            opn = "<option value='" + value.code +"'title='"+value.name+ "' selected>" + value.name + "</option>";
                        } else {
                            opn = "<option value='" + value.code + "'title='"+value.name+"'>" + value.name + "</option>";
                        }
                    }

                    $("#" + id).append(opn);
                });
            }
            //$("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}
/**
 * 获取下拉框，隐藏hiddenParam中的元素
 * @param id
 * @param code 字典
 * @param val 选中值
 * @param hiddenParam 数据，放隐藏元素的code值
 */
function getFlexValueByVal4(id, code, val, hiddenParam) {
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if(hiddenParam.length>0){
                        for(var i=0;i<hiddenParam.length;i++){
                            if(value.code!=hiddenParam[i]){
                                if (val == value.code) {
                                    opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                                } else {
                                    opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                                }
                                $("#" + id).append(opn);
                            }
                        }
                    }else{
                        if (val == value.code) {
                            opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                        } else {
                            opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                        }
                        $("#" + id).append(opn);
                    }
                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}


function getFlexValueByVal2(id, code, val,func) {//取下拉框的值 id=#id  code=字典  val= 选中值  func 为 加载后再进行二次处理的函数入口
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                    }
                    $("#" + id).append(opn);
                });
                if(func!=null){
                    func(id);
                }
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}


function getFlexValueByValNoRefresh(id, code, val) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                    }
                    $("#" + id).append(opn);
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}

function getFlexValueByValSel2(id, code, val) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if(nullToEmpty(val)!=""){
                        if(val.indexOf("VAT")>-1){
                            val=val.replaceAll("VAT","");
                            var vatarr=val.split(",");
                            for(var i=0;i<vatarr.length;i++){
                                val+=","+vatarr[i]/100
                            }
                        }
                        var vals = val.split(",");
                        for(var i=0;i<vals.length;i++){
                            if (vals[i] == value.code) {
                                opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                                break;
                            } else {
                                opn = "<option value='" + value.code + "'title='"+value.name+"'>" + value.name + "</option>";
                            }
                        }
                        $("#" + id).append(opn);
                    }else{
                            opn = "<option value='" + value.code + "'title='"+value.name+"'>" + value.name + "</option>";
                        $("#" + id).append(opn);
                    }
                    console.log(opn);


                });
            }
            $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}
var flexCache=new Map();
function getFlexValueByNameAndValCode(name, code, val,obj) {//取下拉框的值 name=#name  code=字典  val= 选中值
    var flexCacheItem = flexCache.get(code);
    if(!!!flexCacheItem){
        $.ajax({
            url: "/api-system/flex/getFlexValueByFlexSetCode",
            data: {flexSetCode: code},
            dataType: "JSON",
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                flexCache.put(code,data);
                var opn = "";
                if (data.data != null) {
                    $.each(data.data, function (key, value) {

                        if (val == value.code) {
                            opn += "<option value='" + value.code + "' selected>" + value.name + "</option>";
                        } else {
                            opn += "<option value='" + value.code + "'>" + value.name + "</option>";
                        }

                        //$("#" + id).append(opn);
                    });

                }
                if (name){
                    $("select[name="+name+"]").empty();
                    $("select[name="+name+"]").append(opn);
                    $("select[name="+name+"]").selectpicker('refresh');
                }else{
                    $(obj).append(opn);
                    $(obj).selectpicker('refresh');
                }

                //$("#" + id).selectpicker('refresh');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BootstrapDialog.alert("获取字典列表失败。");
            }
        });

    }else {
        var data=flexCacheItem;
        var opn = "";
        if (data.data != null) {
            $.each(data.data, function (key, value) {

                if (val == value.code) {
                    opn += "<option value='" + value.code + "' selected>" + value.name + "</option>";
                } else {
                    opn += "<option value='" + value.code + "'>" + value.name + "</option>";
                }

                //$("#" + id).append(opn);
            });

        }
        if (name){
            $("select[name="+name+"]").append(opn);
            $("select[name="+name+"]").selectpicker('refresh');
        }else{
            $(obj).append(opn);
            $(obj).selectpicker('refresh');
        }
    }

}

function getFlexValueInput(id, setCode, valCode) {//取input框的值 id=#id
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexCode",
        data: {flexSetCode: setCode,code: valCode},
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $("#" + id).val(data.data.NAME);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典值失败。");
        }
    });
}

function getFlexValueMap(flexSetCode, option) {
    if(!option) {
        option = 'name'
    }
    var obj = new Map();
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: flexSetCode},
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (result) {
            if (result.data != null) {
                $.each(result.data, function (key, value) {
                    obj[value.code] = value[option]
                });
            }
        }
    });
    return obj;
}
//公司下拉框，
function getCommonOrganMapByTenantId(id, tenantId, option){
    $.ajax({
        url: "/api-system/company/getCompanyListByTenantId",
        data: {tenantID: tenantId},
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (result) {
            if (result.code == "0"){
                var companys = result.data;
                $(companys).each(function (i, e) {
                    var opn = "";
                    if (option && option==e.ouid) {
                        opn = "<option value='" + e.ouid + "' selected>" + e.name + "</option>";
                    } else {
                        opn = "<option value='" + e.ouid + "'>" + e.name + "</option>";
                    }
                    $("#" + id).append(opn);
                });
                $("#" + id).selectpicker('refresh');
            } else {
                BootstrapDialog.alert("查询公司信息失败")
            }
        }

    })
}

function getAjax(url, data) {
    $.ajax({
        url: url,
        data: data,
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    $("input[name='" + key + "']").val(value);
                });
            }
        }
    });
}

function isFavoriteProduct() {
    /*收藏的星星点亮*/
    $("[name^=favorite]:visible").each(function () {
        var name = $(this).attr("name");
        var option = name.split("_");
        var url = "/api-product/library/queryPoList/user/favorite";
        $.ajax({
            url: url,
            data: {itemId: option[1], contractId: option[2], contractLineId: option[3], setFlag: option[4],ioType: option[5]},
            type: "POST",
            context: this,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.code != "0") {
                    BootstrapDialog.alert(data.message);
                    return;
                }
                if (data.data != "0") {
                    $(this).find("i").addClass("is-favourite");
                }
            }
        });
    });
}

function tooltip(obj, msg) {
    var time = 1000;
    obj.attr("title", msg).tooltip({delay: {"hide": time}}).tooltip('show');
    setTimeout(function () {
        obj.tooltip("destroy");
    }, time);
}

var TO_READ = "TO_READ";

// 完成待阅
function doCompleteRead(b) {
    if (getParam("flowType") !== TO_READ) {
        return;
    }
    var url = "/api-flow/sysmgr/act/complete";
    if(b){
        url = "/api-flow/sysmgr/act/delete";
    }
    $.ajax({
        url: url,
        data: {tenantId: getUser().tenantId, id: getParam("actId")},
        dataType: "json",
        type: "POST",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.code !== "0") {
                BootstrapDialog.alert(data.message);
            }else{
                deleteNonOATodo(getParam("actId"));
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("提交待阅失败。");
        }
    });
}

function getDbConst(name, attr1, attr2) {
    var result = "";
    $.ajax({
        url: "/api-system/dbConst",
        data: {name: name, attr1: attr1, attr2: attr2},
        dataType: "json",
        type: "POST",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.code !== "0") {
                BootstrapDialog.alert("获取常量失败。" + name + ":" + data.message);
            } else {
                result = data.data;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取常量失败。" + name);
        }
    });
    return result;
}
function checkDate() {

    $("[start-date]").datepicker().on('changeDate', function (e) {
        var date = e.date;
        var startDate = $(this).attr("start-date");
        if(startDate){
            $(startDate).datepicker('setEndDate', date);
        }

    });

    $("[end-date]").datepicker().on('changeDate', function (e) {
        var date = e.date;
        var endDate = $(this).attr("end-date");
        if(endDate){
            $(endDate).datepicker('setStartDate', date);
        }

    });


    $("[clear]").click(function () {
        var clear = $(this).attr("clear");
        if(clear){
            var fields = clear.split(",");
            for(var i=0;i<fields.length;i++){
                $("[name='"+fields[i]+"']").val("");
            }
        }
        $(this).prevAll().val("");
    });
}
//重置选择框
function clearQuery(formId) {
    $(':input',formId)
        .not(':button, :submit, :reset')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected')
        .selectpicker('refresh');
}

function getUser() {
    return JSON.parse(window.sessionStorage.getItem("user"));
}

function getScript(name) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = name;
    document.getElementsByTagName('head')[0].appendChild(script);
}
function validateQuantity(value, element , param) {
    var messages = "";
    var flag = true;
    var defVal = 0;
    if (typeof value == "object") {
        element = value;
        value = $(element).val();
    }


    if (isNaN(value)) {
        messages += "必须为数字;";
        flag = false;
    }


    if(!param){
        param = $(element).attr("quantity");
    }

    if(param){
        var valueLength = value.length;
        var index_ = param.indexOf("|");
        var dotIndex = value.indexOf(".");
        value = Number(value);
        if(index_ > -1){
            if(dotIndex > -1){
                var num = Number(param.substr(index_+1,length));
                var maxlength = dotIndex+1+num;
                if(valueLength > maxlength){
                    messages += "小数位不能超过"+num+"位;";
                    flag = false;
                }
            }

            param = param.substr(0,index_);
        }



        var length = param.length;
        var beginS = param.substr(0,1);
        var endS = param.substr(length-1,length);
        var params = param.substr(1,length-2).split(",");
        var param0 = params[0];
        var param1 = params[1];
        if(param0 != "?"){
            param0 = Number(param0);
            if(beginS == "["){
                if(value < param0){
                    messages += "必须为不小于"+param0+";";
                    flag = false;
                }
            }else if(beginS == "("){
                if(value <= param0){
                    messages += "必须为大于"+param0+";";
                    flag = false;
                }
            }
        }

        if(param1 != "?"){
            param1 = Number(param1);
            if(endS == "]"){
                if(value > param1){
                    messages +=  "必须为不大于"+param1+";";
                    flag = false;
                }
            }else if(endS == ")"){
                if(value >= param1){
                    messages += "必须为小于"+param1+";";
                    flag = false;
                }
            }
        }
    }
    $.validator.messages["quantity"] = messages;
    return flag;
}

function getuuid() {
    return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
//加载需求做决策 特殊场景
function addDemandSource(id, code) {
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: code},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "<li>"+value.description+"</li>";
                    if(value.attr1=='Y') {
                        $("#" + id).append(opn);
                    }
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取特殊场景字典列表失败。");
        }
    });
}

/**
 * word文件加水印（2007以上版本）
 * @param ApplicationTableName
 * @param ApplicationPKValue
 * @param attachmentType
 * @param fileName
 */
function addWatermarkPicture(ApplicationTableName,ApplicationPKValue,attachmentType,fileName){

    $.ajax({
        method: "POST",
        url: "/api-file/attachment/addWatermarkForAppendix",
        data: {
            attr1: ApplicationTableName,
            attr2: ApplicationPKValue,
            attr3: attachmentType
        },
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (result) {
            if (result.code == 99) {
                alert(fileName + "加水印失败")
            }
        }
    });
}
//实现全选与反选
function checkBoxAll(th) {
    if ($(th).prop("checked")) {
        $("input[name='checkitem']:checkbox").each(function () {
            $(this).prop("checked", true);
        });
    } else {
        $("input[name='checkitem']:checkbox").each(function () {
            $(this).prop("checked", false);
        });
    }
    afterCheckBoxAll();
}
/**
 * checkout 全选触发事件 自定义
 */
function afterCheckBoxAll(){

}

/**
 * 页面赋值函数
 */
function setParams(str) {
    $.each(str, function (key, value) {
        if (key.indexOf("Date") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
        if (key.indexOf("Time") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
        if (!( typeof value == "boolean")&& value!=null&&value!='null'&&value!='') {
            //input框回显
            $("input[type='text'][name='" + key + "']").val(nullToEmpty(value));
            $("input[type='hidden'][name='" + key + "']").val(nullToEmpty(value));
            $("textarea[name='" + key + "']").val(nullToEmpty(value));
        }
        if ((value instanceof Object) && !(value instanceof Array)) {
            $.each(value, function (k, val) {
                if (!(typeof val == "boolean")&& val!='null' &&val!=null) {
                    //input框回显
                    if (k.indexOf("Date") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    if (k.indexOf("Time") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    try {
                        $("input[name='" + key + "." + k + "']").val(nullToEmpty(val));
                        $("textarea[name='" + key + "." + k + "']").val(nullToEmpty(val));
                    } catch (e) {
                        // console.log(e);
                        return false;
                    }

                }
            })
        }
    });
};
/**
 *
 * 审批页面初始化赋值到td上的方法
 * @param str
 */
function setParamsDPForApprove(str) {
    $.each(str, function (key, value) {
        if (key.indexOf("Date") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
        if (key.indexOf("Time") != -1 && !isNaN(value)) {
            value = dateFormat(value, "yyyy-MM-dd");
        }
        if (!( typeof value == "boolean")&& value!=null) {
            //input框回显
            $("td[name='" + key + "']").text(nullToEmpty(value));
            $("input[name='" + key + "']").val(nullToEmpty(value));
            $("textarea[name='" + key + "']").val(nullToEmpty(value));
        }
        if ((value instanceof Object) && !(value instanceof Array)) {
            $.each(value, function (k, val) {
                if (!( typeof value == "boolean")&& val!='null' && val!=null) {
                    //input框回显
                    if (k.indexOf("Date") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    if (k.indexOf("Time") != -1 && !isNaN(val)) {
                        val = dateFormat(val, "yyyy-MM-dd");
                    }
                    try {
                        $("td[name='" + key + "." + k + "']").text(nullToEmpty(val));
                        $("input[name='" + key + "." + k + "']").val(nullToEmpty(val));
                    } catch (e) {
                        //console.log(e);
                        return false;
                    }

                }
            })
        }
    });
};

/**
 *
 * 审批页面复制到td的字典值的方法
 * @param name
 * @param setCode
 * @param valCode
 */
function getFlexValueTd(name, setCode, valCode) {//设置td的值 name
    $(document.getElementsByName(name)).text("");
    $.ajax({
        url: "/api-system/flex/findFlexValueByCode",
        data: {flexSetCode: setCode,flexValueCode: valCode},
        dataType: "JSON",
        // async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $(document.getElementsByName(name)).text(data.data.name);
            }else if( data.data==null||data.data==""){
                $(document.getElementsByName(name)).text("");
            }
        },
        error: function (error){
            $(document.getElementsByName(name)).text("");
        }
    });
}
/**
 *
 * 复制到tinput的字典值的方法
 * @param name
 * @param setCode
 * @param valCode
 */
function getFlexValueInput(name, setCode, valCode) {//设置td的值 name
    $(document.getElementsByName(name)).text("");
    $.ajax({
        url: "/api-system/flex/findFlexValueByCode",
        data: {flexSetCode: setCode,flexValueCode: valCode},
        dataType: "JSON",
        // async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $(document.getElementsByName(name)).val(data.data.name);
            }else if( data.data==null||data.data==""){
                $(document.getElementsByName(name)).val("");
            }
        },
        error: function (error){
            $(document.getElementsByName(name)).val("");
        }
    });
}
//拼接税率串多税率使用
function getValCode(name, setCode, valCode) {//设置td的值 name
    if (valCode){
        valCode = valCode.split(",");
        var varStr="";
        for(var i=0;i<valCode.length;i++){
            varStr += ",VAT"+  numSub(valCode[i],100,3);
        }
        valCode =varStr.substring(1);
        $(document.getElementsByName(name)).text(valCode);
    }
}

/**
 * 判断当前登录人员角色
 * @param paramRole
 * @returns {boolean}
 */
function userIsRole(paramRole) {
    var roles = getUser().roles;
    for(var i=0;i<roles.length;i++){
        if(roles[i].name.trim() == paramRole.trim()){
            return true;
        }
    }
    return false;
}

/**
 *
 * @param id select id
 * @param def 默认选中值
 * @param url 请求的url
 * @param param 请求的data参数
 */
function loadSelectOptionByUrl(id,url,def,param){
    $.ajax({
        url: url,
        data: param,
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if(nullToEmpty(value)!=''){
                        if (def == value.CODE) {
                            opn = "<option text='"+value.VALUE+"' value='" + value.CODE + "' selected>" + value.VALUE + "</option>";
                        } else {
                            opn = "<option text='"+value.VALUE+"' value='" + value.CODE + "'>" + value.VALUE + "</option>";
                        }
                        $("#" + id).append(opn);
                    }
                });
                $("#" + id).selectpicker('refresh');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("请求出错。");
        }
    });
}

/**
 * 提交流程用
 * @param appEntity 接口传值
 * @param url 请求地址
 * @param formId form 标签Id
 */
function flowSubmitCommon(appEntity,url,formId) {


    com.sinoprof.workflow.dialog.submitForm.selectNextFlow({
        appEntity: appEntity, //业务参数，供接口程序使用 generalEdit.html
        callbackFun: function (sfActObj) { //人员选择完毕后的回调函数
            var data = $("#"+formId).serializeObject();
            $.ajax({
                url: url,
                data: data,
                type: "POST",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                },
                success: function (res) {
                    hideSinoWaiting();
                    if (res.code == "0") {
                        BootstrapDialog.alert(res.data.message,function () {
                            sinoFlowClose();
                        });
                    }else if(res.code == "99"||res.code == 99){
                        BootstrapDialog.alert(res.message);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    hideSinoWaiting();

                }
            })
        }
    });

};

function isInIfream(){
    return nullToEmpty(parent.$(parent.document).data('multitabs')) != '';
}

function openIfreamPage(url,title){
    parent.showSinoWaiting();
    parent.$(parent.document).data('multitabs').create({
        iframe: true,                       //指定为iframe模式
        title: title,                 //标题（可选），没有则显示网址
        mid: new Date().getTime(),                       //mid，编号唯一
        url: url             //链接（必须）
    }, true);
}

function loadCartInfo() {
    $.ajax({
        url: "/api-product/library/cart/countCart",
        type: "post",
        data: {},
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            hideSinoWaiting();
            if (data.code == "0") {
                var    $cartCount=   $(".cartCount",parent.document);
                if (Number(data.data) > 99) {
                    $cartCount.addClass("font-s10");
                    $cartCount.text("99+") ;
                } else {
                    $cartCount.addClass("");
                    $cartCount.text(data.data);
                }
            }
        }
    });
}
function cclose (){
    window.close();
}
//关闭刷新代办
function sinoFlowCloseIframe() {
    reloadTodoIframe();
    var frameId = window.frameElement && window.frameElement.id || '';
    var mid = $(window.parent.document).find("a[data-id="+frameId+"]").attr("data-mid");
    var $closeTab = parent.$(parent.document).find("a[data-mid='"+ mid +"']").next('.mt-close-tab');
    parent.$(parent.document).data('multitabs').close($closeTab.closest('li'));
}
//关闭tab当前页面不刷新
function closeLocalIframe() {
    try{
        if( window.sessionStorage.getItem("ssoLoginFlag") == 'Y'){
            window.close();
            window.sessionStorage.setItem("ssoLoginFlag","");
        }else {
            var frameId = window.frameElement && window.frameElement.id || '';
            var mid = $(window.parent.document).find("a[data-id="+frameId+"]").attr("data-mid");
            var $closeTab = parent.$(parent.document).find("a[data-mid='"+ mid +"']").next('.mt-close-tab');
            parent.$(parent.document).data('multitabs').close($closeTab.closest('li'));
        }
    }catch (e) {
        //如果关闭代办异常说明，当前没有通过供应链系统关闭代办，则直接关闭当前打开的页面
        window.close();
    }
}
function getOuList(companyId) {
    var values='';
    $.ajax({
        url: "/api-system/ou/getOuByCompanyId",
        data: {companyId: companyId},
        dataType: "JSON",
        async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                values=data.data;
            }
        }
    });
    return values;
}


function ouListOptionVal(id, data,val) {//取下拉框的值
    if (data != null) {
        $.each(data, function (key, value) {
            var opn = "";
            if (val == value.orgId) {
                opn = "<option value='" + value.orgId + "' selected>" + value.ouName + "</option>";
            } else {
                opn = "<option value='" + value.orgId + "'>" + value.ouName + "</option>";
            }
            $("#" + id).append(opn);
        });
    }
    // $("#" + id).selectpicker('refresh');
}

//刷新当前iframe
function reloadLocalIframe() {
    var frameId = window.frameElement && window.frameElement.id || '';
    reloadIframe(frameId)
}

//刷新待办iframe
function reloadTodoIframe() {
    reloadIframe("multitabs_main")
}

//刷新指定iframe
function reloadIframe(frameId) {
    var _iframe1=window.parent.document.getElementById(frameId);
    _iframe1.contentWindow.location.reload(true);
}

/**
 * 判断参数是否为空
 * @param str
 * @returns {boolean}
 */
function isNull(str) {
    if(str==''||str==null||str==undefined || str=="undefined"){
        return true;
    }else{
        return false;
    }
}
//判断对象是否为空
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

/**
 * 根据当前页面生成pdf
 * @param obj为生成pdf范围的标签对象
 */
function savePdf(obj){
    var targetDom = $(obj);
    //把需要导出的pdf内容clone一份，这样对它进行转换、微调等操作时才不会影响原来界面
    var copyDom = targetDom.clone();
    //新的div宽高跟原来一样，高度设置成自适应，这样才能完整显示节点中的所有内容（比如说表格滚动条中的内容）
    copyDom.width(targetDom.width() + "px");
    copyDom.height(targetDom.height() + "px");
    $('body').append(copyDom);//ps:这里一定要先把copyDom append到body下，然后再进行后续的glyphicons2canvas处理，不然会导致图标为空
    html2canvas(copyDom, {
        onrendered: function (canvas) {
            var imgData = canvas.toDataURL('image/jpeg');
            var img = new Image();
            img.src = imgData;
            //根据图片的尺寸设置pdf的规格，要在图片加载成功时执行，之所以要*0.225是因为比例问题
            img.onload = function () {
                //此处需要注意，pdf横置和竖置两个属性，需要根据宽高的比例来调整，不然会出现显示不完全的问题
                if (this.width > this.height) {
                    var doc = new jsPDF('l', 'mm', [this.width * 0.225, this.height * 0.225]);
                } else {
                    var doc = new jsPDF('p', 'mm', [this.width * 0.225, this.height * 0.225]);
                }
                doc.addImage(imgData, 'jpeg', 0, 0, this.width * 0.225, this.height * 0.225);
                //根据下载保存成不同的文件名
                doc.save('pdf_' + new Date().getTime() + '.pdf');
            };
            //删除复制出来的div
            copyDom.remove();
        },
        background: "#fff",
        //这里给生成的图片默认背景，不然的话，如果你的html根节点没设置背景的话，会用黑色填充。
        allowTaint: true //避免一些不识别的图片干扰，默认为false，遇到不识别的图片干扰则会停止处理html2canvas
    });
}

/**
 *
 * @param eleId 节点id
 * @param scale 放大倍数 默认1.5；值越大清晰度越高，生成的文件越大
 */
function savePdfV2(eleId,scale){
    showSinoWaiting();
    // var targetDom = $(obj);
    var cntElem = document.getElementById(eleId);
    var shareContent = cntElem; //需要截图的包裹的（原生的）DOM 对象
    var width = shareContent.offsetWidth; //获取dom 宽度
    var height = shareContent.offsetHeight; //获取dom 高度
    var canvas = document.createElement("canvas"); //创建一个canvas节点
    if(nullToEmpty(scale) == ""){
        scale = 1.5; //定义任意放大倍数 支持小数
    }
    canvas.width = width * scale
    canvas.height = height * scale
    canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    var opts = {
        scale: scale, // 添加的scale 参数
        canvas:canvas, //自定义 canvas
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        width: width, //dom 原始宽度
        height: height,
        useCORS: true, // 【重要】开启跨域配置
    };
    html2canvas(shareContent, opts).then(function (canvas) {
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var imgData = canvas.toDataURL()
        var img = new Image();
        img.src = imgData;
        //根据图片的尺寸设置pdf的规格，要在图片加载成功时执行，之所以要*0.225是因为比例问题
        img.onload = function () {
            //此处需要注意，pdf横置和竖置两个属性，需要根据宽高的比例来调整，不然会出现显示不完全的问题
            if (this.width > this.height) {
                var doc = new jsPDF('l', 'mm', [this.width * 0.225, this.height * 0.225]);
            } else {
                var doc = new jsPDF('p', 'mm', [this.width * 0.225, this.height * 0.225]);
            }
            doc.addImage(imgData, 'jpeg', 0, 0, this.width * 0.225, this.height * 0.225);
            //根据下载保存成不同的文件名
            doc.save('pdf_' + new Date().getTime() + '.pdf');
            hideSinoWaiting();
        };
    });
}

/**
 * 另存生成html文件
 * @param divId 区域id
 * @param fileName 文件名称
 */

function save2html(divId,fileName){
    if(nullToEmpty(fileName) == ""){
        fileName = new Date().getTime();
    }
    var
        session = window.sessionStorage
        // only get URL when necessary in case Blob.js hasn't defined it yet
        , get_blob = function () {
            return window.Blob;
        }
        , html = $("#"+divId).get(0)

        // Title guesser and document creator available at https://gist.github.com/1059648
        , guess_title = function (doc) {
            var
                h = "h6 h5 h4 h3 h2 h1".split(" ")
                , i = h.length
                , headers
                , header_text
            ;
            while (i--) {
                headers = doc.getElementsByTagName(h[i]);
                for (var j = 0, len = headers.length; j < len; j++) {
                    header_text = headers[j].textContent.trim();
                    if (header_text) {
                        return header_text;
                    }
                }
            }
        }
        , doc_impl = document.implementation
        , create_html_doc = function (html) {
            var
                dt = doc_impl.createDocumentType('html', null, null)
                , doc = doc_impl.createDocument("http://www.w3.org/1999/xhtml", "html", dt)
                , doc_el = doc.documentElement
                , head = doc_el.appendChild(doc.createElement("head"))
                , charset_meta = head.appendChild(doc.createElement("meta"))
                , content_meta = head.appendChild(doc.createElement("meta"))
                , link = head.appendChild(doc.createElement("link"))
                , link2 = head.appendChild(doc.createElement("link"))
                , link3 = head.appendChild(doc.createElement("link"))
                , title = head.appendChild(doc.createElement("title"))
                , body = doc_el.appendChild(doc.createElement("body"))
                , i = 0
                , len = html.childNodes.length
            ;
            charset_meta.setAttribute("charset", html.ownerDocument.characterSet);
            content_meta.setAttribute("http-equiv", "X-UA-Compatible");
            content_meta.setAttribute("content", "IE=edge");
            $(html).find("input[type=hidden]").remove();
            $(html).find("i").remove();
            $.each($(html).find("textarea"),function (index,dom) {
                if(nullToEmpty($(dom).text()) == ""){
                    $(dom).text("    ");
                }
            });
            for (; i < len; i++) {
                body.appendChild(doc.importNode(html.childNodes.item(i), true));
            }
            link.setAttribute("type", "text/css");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("href", "http://"+window.location.host+"/static/dist/css/sinoui.min.css");
            link2.setAttribute("type", "text/css");
            link2.setAttribute("rel", "stylesheet");
            link2.setAttribute("href", "http://"+window.location.host+"/static/sinoui/0.6.4/lib/cgxy/styles.min.css");
            link3.setAttribute("type", "text/css");
            link3.setAttribute("rel", "stylesheet");
            link3.setAttribute("href", "http://"+window.location.host+"/static/dist/css/sinoui.min.css");
            var title_text = guess_title(doc);
            title.appendChild(doc.createTextNode(title_text?title_text:fileName));
            return doc;
        }
    ;
    var
        BB = get_blob()
        , xml_serializer = new XMLSerializer()
        , doc = create_html_doc(html)
    ;
    saveAs(
        new BB(
            [xml_serializer.serializeToString(doc)]
            , {type: "text/plain;charset=" + document.characterSet}
        )
        , fileName + ".html"
    )
}

/**
 * 处理svg
 * @param targetElem
 */
function svg2canvas(targetElem) {
    var svgElem = targetElem.find('svg');
    svgElem.each(function (index, node) {
        var parentNode = node.parentNode;
        //由于现在的IE不支持直接对svg标签node取内容，所以需要在当前标签外面套一层div，通过外层div的innerHTML属性来获取
        var tempNode = document.createElement('div');
        tempNode.appendChild(node);
        var svg = tempNode.innerHTML;
        var canvas = document.createElement('canvas');
        //转换
        canvg(canvas, svg);
        parentNode.appendChild(canvas);
    });
}

/**
 * 处理glyphicons
 */
function glyphicons2canvas(targetElem, fontClassName, fontFamilyName) {
    var iconElems = targetElem.find('.' + fontClassName);
    iconElems.each(function (index, inconNode) {
        var fontSize = $(inconNode).css("font-size");
        var iconColor = $(inconNode).css("color");
        var styleContent = $(inconNode).attr('style');
        //去掉"px"
        fontSize = fontSize.replace("px", "");
        var charCode = getCharCodeByGlyphiconsName(iconName);
        var myCanvas = document.createElement('canvas');
        //把canva宽高各增加2是为了显示图标完整
        myCanvas.width = parseInt(fontSize) + 2;
        myCanvas.height = parseInt(fontSize) + 2;
        myCanvas.style = styleContent;
        var ctx = myCanvas.getContext('2d');
        //设置绘图内容的颜色
        ctx.fillStyle = iconColor;
        //设置绘图的字体大小以及font-family的名字
        ctx.font = fontSize + 'px ' + fontFamilyName;
        ctx.fillText(String.fromCharCode(charCode), 1, parseInt(fontSize) + 1);
        $(inconNode).replaceWith(myCanvas);
    });
}

/**
 * 根据glyphicons/glyphicon图标的类名获取到对应的char code
 * @param iconName
 * @returns {string}
 */
function getCharCodeByGlyphiconsName(iconName) {
    switch (iconName) {
        case("glyphicons-resize-full"):
            return "0xE216";
        case ("glyphicons-chevron-left"):
            return "0xE225";
        default:
            return "";
    }
}

/**
 * 合并单元格
 * @param data 原始数据（在服务端完成排序）
 * @param fieldName 合并属性名称
 * @param target 目标表格对象
 */
function mergeCells(data,fieldName,target){
    //声明一个map计算相同属性值在data对象出现的次数和
    var sortMap = {};
    for(var i = 0 ; i < data.length ; i++){
        for(var prop in data[i]){
            if(prop == fieldName){
                var key = data[i][prop]
                if(sortMap.hasOwnProperty(key)){
                    sortMap[key] = sortMap[key] * 1 + 1;
                } else {
                    sortMap[key] = 1;
                }
                break;
            }
        }
    }
    // for(var prop in sortMap){
    //     console.log(prop,sortMap[prop])
    // }
    var index = 0;
    for(var prop in sortMap){
        var count = sortMap[prop] * 1;
        $(target).bootstrapTable('mergeCells',{index:index, field:fieldName,  rowspan: count});
        index += count;
    }
}

//合同名称字符不允许出现的字符：<?>?&?'?"\*?"<>|?以及换行。特别关注中文加的冒号、引号这些也是不允许的。
function checkSpecialChar(obj) {
    var text = $(obj).val();
    var flag = new RegExp("[\\<>&'*:?/|：*？“”< > \"|]");
    // 判断 even 是否包含特殊字符
    if(flag.test(text)){
        return true;
    }else{
        return false;
    }
}
//单一来源采购场景应用理由输入数据校验
function replaceSpecialChar(obj) {
    var flag = new RegExp("[&'\"<>\\[\\]\n\t    ]");
    if(flag.test(obj)){
        // BootstrapDialog.alert("根据ES接口规范，不允许输入特殊字符（）以及空格，换行。请检查后再输入。");
        // obj.replace(/`~#$^&*=|{}'&nbsp;&#10;(\t)<>\[\]&nbsp;.￥—‘”“/mg, "");
        return false;
    }else{
        return  true;
    }
}

function getFlexValueMapAsyncFalse(flexSetCode, option) {
    if(!option) {
        option = 'name'
    }
    var obj = new Map();
    $.ajax({
        url: "/api-system/flex/getFlexValueByFlexSetCode",
        data: {flexSetCode: flexSetCode},
        dataType: "JSON",
        async:false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (result) {
            if (result.data != null) {
                $.each(result.data, function (key, value) {
                    obj[value.code] = value[option]
                });
            }
        }
    });
    return obj;
}

function queryFormData(formId,tbodyId) {
    showSinoWaiting();
    var option={form:$("#"+formId)};
    $("#"+tbodyId).ajaxPage(option);
    hideSinoWaiting();
}
/*
*   功能:实现日期的DateAdd功能.
*   参数:interval,字符串表达式，表示要添加的时间间隔.
*   参数:number,数值表达式，表示要添加的时间间隔的个数.
*   参数:date,时间对象.
*   返回:新的时间对象.
*   var now = new Date();
*   var newDate = DateAdd( "d", 5, now);
*---------------   DateAdd(interval,number,date)   -----------------
*/
function DateAdd(interval, number, date) {
    if (!number){
        return;
    }
    number = Number(number);
    switch (interval) {
        case "y": {
            date.setFullYear(date.getFullYear() + number);
            return date;
            break;
        }
        case "q": {
            date.setMonth(date.getMonth() + number * 3);
            return date;
            break;
        }
        case "m": {
            date.setMonth(date.getMonth() + number);
            return date;
            break;
        }
        case "w": {
            date.setDate(date.getDate() + number * 7);
            return date;
            break;
        }
        case "d": {
            date.setDate(date.getDate() + number);
            return date;
            break;
        }
        case "h": {
            date.setHours(date.getHours() + number);
            return date;
            break;
        }
        case "m": {
            date.setMinutes(date.getMinutes() + number);
            return date;
            break;
        }
        case "s": {
            date.setSeconds(date.getSeconds() + number);
            return date;
            break;
        }
        default: {
            date.setDate(d.getDate() + number);
            return date;
            break;
        }
    }
}
/**
 * 清空表单内容
 * @param formId
 */
function formReset(formId){
    $(':input','#'+formId)
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
    $("#"+formId).find("select").each(function(index,dom){
        $(dom).selectpicker('refresh');
    });
}
//移除数组中的值
function removeEle(arr,val) {
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}



/**
 *
 * @param id select id
 * @param def 默认选中值
 * @param url 请求的url
 * @param param 请求的data参数
 */
function loadSelectOptionByUrl(id,url,def,param){
    $.ajax({
        url: url,
        data: param,
        dataType: "JSON",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if(nullToEmpty(value)!=''){
                        if (def == value.CODE) {
                            opn = "<option  value='" + value.CODE + "' selected>" + value.VALUE + "</option>";
                        } else {
                            opn = "<option  value='" + value.CODE + "'>" + value.VALUE + "</option>";
                        }
                        $("#" + id).append(opn);
                    }
                });
                $("#" + id).selectpicker('refresh');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("请求出错。");
        }
    });
}

function clearQuery(formId) {
    $(':input',formId)
        .not(':button, :submit, :reset')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected')
        .selectpicker('refresh');
}

function batchDownloadFiles(formId) {
    var ids = "";
    $("#"+formId).find("span[id^=DRAWDIV_]").each(function (index,dom) {
        var id = $(dom).attr("id");
        var attId = id.replace('DRAWDIV_','');
        ids += attId.substring(attId.indexOf("_") + 1, attId.length) + ",";
    });
    ids = ids.substring(0, ids.length - 1);
    if(nullToEmpty(ids) ==''){
        BootstrapDialog.alert("无附件");
        return;
    }
    com.sinoprof.uploader_table.downloadAttachmentZIP(ids);
}

/**
 * 将页面的展示word转换成pdf
 */
function downloadWord2paf(){
    $("#idFrame").contents().find("#download").click();//jquery 方法1
}

/**
 * 调用前先检查页面是否会先加载流程信息
 */
function delActLog(){

    var actId = $("#sf_actID").val();
    var docNo = $("#sf_appColumn1").val();
    var caseId = $("#sf_caseID").val();
    if(nullToEmpty(docNo) == "" && nullToEmpty(caseId) == ""){
        BootstrapDialog.alert("无审批纪录。");
        return;
    }
    BootstrapDialog.confirm("确认删除审批纪录?", function (result) {
        if(result){
            $.ajax({
                url: "/api-flow/sysmgr/act/delActLog",
                data: {
                    docNo: docNo,
                    caseId: caseId
                },
                dataType: "JSON",
                async: false,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                },
                success: function (data) {
                    BootstrapDialog.alert("删除审批纪录成功。");
                    $("#pssOpinion").html("");
                    var option = {
                        actId: actId
                    };
                    $("#pssOpinion").ajaxOpinionQuery(option);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    BootstrapDialog.alert("删除审批纪录失败。");
                }
            });
        }

    });

}

/**
 * 格式化输入框的数字
 */
function formatNumber(obj) {
    var value = $(obj).val();
    if (value != '' && value.substr(0, 1) == '.') {
        value = "";
    }
    value = value.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效
    value = value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数
    if (value.indexOf(".") < 0 && value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        if (value.substr(0, 1) == '0' && value.length == 2) {
            value = value.substr(1, value.length);
        }
    }
    $(obj).val(value);
}

function deleteNonOATodo(nonActId) {
    $.ajax({
        url: "/api-centralize-interfaces/oatodo/deleteNonOATodo",
        data: {id:nonActId},
        type: "POST",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            console.log("代办刷新情况",data);
        },
        error:function (res) {
            console.log("代办刷新失败",res);
        }
    });
}

function getFlexValueByValAndAttr2(id,code,val,attr2) {//取下拉框的值 id=#id  code=字典  val= 选中值
    $.ajax({
        url: "/api-system/flex/getFlexValueByCodeAndAttr2",
        data: {flexSetCode: code,tenantId:getUser().tenantId,attr2:attr2},
        dataType: "JSON",
        async: false,
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            if (data.data != null) {
                $.each(data.data, function (key, value) {
                    var opn = "";
                    if (val == value.code) {
                        opn = "<option value='" + value.code + "' selected>" + value.name + "</option>";
                    } else {
                        opn = "<option value='" + value.code + "'>" + value.name + "</option>";
                    }

                    $("#" + id).append(opn);
                });
            }
            // $("#" + id).selectpicker('refresh');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            BootstrapDialog.alert("获取字典列表失败。");
        }
    });
}