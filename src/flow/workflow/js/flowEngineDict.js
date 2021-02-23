function getGroup(ctx,projectName, orgId){//获取组别
    var url = ctx + '/flow/dict/GetProjectGroupList/projectName/' + projectName;

     myresult = "";
    $.getJSON(url, function (result) {
        $.each(result, function(k, v) {
            //  $.each(v, function(kk, vv) {
            //      BootstrapDialog.alert(kk + " = "+ vv);
            //  });
        });
        myresult = window.showModalDialog(ctx + "/flow/ui/showOptions", result, winstyle)

    })
    BootstrapDialog.alert("myresult="+myresult)
    return myresult;
}

/**
 * 功能：判断某字符串是否为空或全空格，用于需要非空校验的地方
 * @param {Object} srcStr 源字符串
 */

function isEmpty(srcStr) {
    var retVal = true;
    if(srcStr != "undefined"){

        srcStr = unescape(srcStr);

        retVal = (srcStr == "" || trim(srcStr) == "");
    }
    return retVal;
}

/**
 * 功能：获取下拉列表中被选中项的值。应用于下拉框可多选和单选的场合。
 * selectName：select组件名
 * splitor：分隔符
 */

function getSelectValue(selectName, splitor) {

    var retVal = "";
    var optionObj = document.all[selectName].options;

    var optionCount = optionObj.length;
    if(splitor == "undefined" || splitor == null){
        splitor = ";";
    }

    if (optionCount) {
        for (var i = 0; i < optionCount; i++) {

            if (optionObj[i].selected && !isEmpty(optionObj[i].value)) {
                retVal += optionObj[i].value + splitor;
            }
        }

        retVal = retVal.substring(0, retVal.length - splitor.length);
    }
    return retVal;
}