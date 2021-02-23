var sync = true;
var sf_handler_group = "";
var sf_plus_group = "";
var sf_handler = "";
var sf_project = "";
var sf_group = "";
var ajaxReturn = "";
var flowArray;
var assignedFlowArray;
var flowStrArray = new Array();
var assignedStrArray = new Array();

var VALID_NULL_MASK = 0x01;
var VALID_PATTERN_MASK = 0x02;
var VALID_SIZE_MASK = 0x04;

var Launch_FlowStr = "";
var processReviewUsers = false;
var setReviewStatus = false;
var setCycleUsers = false;

var Launch_ExcludeGroup = "";

var save_cycleQty = "0";
var save_cycleUsers = "";
var save_cycleType = "";
var save_reviewQty = "0";
var save_reviewUsers = "";
var save_reviewType = "";
var save_nextTaskData = "";

var setHandlerGroup = false;
var setPlusGroup = false;
var plusGroup;
var handlerGroup;


String.prototype.replaceAll = stringReplaceAll;
function stringReplaceAll(AFindText,ARepText){
    var raRegExp = new RegExp(AFindText.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
    return this.replace(raRegExp,ARepText);
}


function getMaskGroup(maskGroup, handlerGroup, plusGroup) {
    if(maskGroup.indexOf("*") < 0 && maskGroup.indexOf("+") < 0)
        return maskGroup;
    var srcLeft, handler, plus;
    var srcCount, handlerCount, plusCount;
    srcCount = maskGroup.indexOf(".");
    handlerCount = handlerGroup.indexOf(".");
    if(handlerCount >= 0) {
        handler = handlerGroup.substring(handlerCount + 1, handlerGroup.length);
    } else {
        handler = "";
    }
    plusCount = plusGroup.indexOf(".");
    if(plusCount >= 0) {
        plus = plusGroup.substring(plusCount + 1, plusGroup.length);
    } else {
        plus = "";
    }
    if(srcCount >= 0) {
        srcLeft = maskGroup.substring(0, srcCount);
        if(srcLeft == "+++") {
            if(plusCount >= 0) {
                return plusGroup.substring(0, plusCount) + "." + getMaskGroup(maskGroup.substring(srcCount + 1, maskGroup.length),
                    handler, plus);
            } else {
                if(sf_plus_group == "") {
                    return "+." + getMaskGroup(maskGroup.substring(srcCount + 1, maskGroup.length),
                        handler, plus);
                } else {
                    return plusGroup + "." + getMaskGroup(maskGroup.substring(srcCount + 1, maskGroup.length),
                        handler, plus);
                }
            }
        } else if(srcLeft == "***") {
            if(handlerCount >= 0) {
                return handlerGroup.substring(0, handlerCount) + "." + getMaskGroup(maskGroup.substring(srcCount + 1,
                    maskGroup.length), handler, plus);
            } else {
                if(handlerGroup == "") {
                    return "*." + getMaskGroup(maskGroup.substring(srcCount + 1, maskGroup.length),
                        handler, plus);
                } else {
                    return handlerGroup + "." + getMaskGroup(maskGroup.substring(srcCount + 1, maskGroup.length),
                        handler, plus);
                }
            }
        } else {
            return srcLeft + "." + getMaskGroup(maskGroup.substring(srcCount + 1, maskGroup.length),
                handler, plus);
        }
    } else {
        if(maskGroup == "+++") {
            if(plusCount >= 0) {
                return plusGroup.substring(0, plusCount);
            } else {
                if(plusGroup == "") {
                    return "+";
                } else {
                    return plusGroup;
                }
            }
        } else if(maskGroup == "***") {
            if(handlerCount >= 0) {
                return handlerGroup.substring(0, handlerCount);
            } else {
                if(handlerGroup == "") {
                    return "*";
                } else {
                    return handlerGroup;
                }
            }
        } else {
            return maskGroup;
        }
    }
}

function clearLaunchPara() {
//    Launch_SendType = "";
//    Launch_WorkType = "";
//    Launch_WaitType = "";
//    Launch_ReviewUsers = "";
    Launch_IsEndCycleView = "";
    if(!setCycleUsers) {
        Launch_CycleUsers = "";
        Launch_CycleType = "";
        Launch_CycleQureyType = "";
        Launch_CycleQueryUsers = "";
    }
    Launch_Code = "";
    Launch_GroupSet = true;
    Launch_HandleGroup = "";
    Launch_ExcludeGroup = "";
    Launch_ParallelParticipants = "";
    Launch_ParallelGroups = "";
    Launch_AssistFlows = "";
    Launch_AssistGroups = "";
    Launch_DistributeUser = "";
    Launch_TaskName = "";
    Launch_BacktoUserName = "";
    Launch_Code_Bypass = "";
    joinConditional = false;
}

function getBackTask(actId) {
    var backURL =getBasepath() + "/flow/ui/GetBackTask?sf_actID="
        +actId;
    makeRequest(backURL, ajaxFunction);
    return ajaxReturn;
}


function restoreInfo() {
    if(!setReviewStatus) {
        if(save_reviewUsers != null)
            document.getElementById("sf_reviewUsers").value = save_reviewUsers;
        if(save_reviewQty != null)
            document.getElementById("sf_reviewQty").value = save_reviewQty;
        if(save_reviewType != null)
            document.getElementById("sf_reviewType").value = save_reviewType;
    }
    if(save_cycleUsers != null)
        document.getElementById("sf_cycleUsers").value = save_cycleUsers;
    if(save_cycleQty != null)
        document.getElementById("sf_cycleQty").value = save_cycleQty;
    if(save_cycleType != null)
        document.getElementById("sf_cycleType").value = save_cycleType;
}

function init_groups() {

    sf_handler_group = document.getElementById("sf_handlerGroup").value;

    sf_plus_group = document.getElementById("sf_plusGroup").value;
    sf_handler = document.getElementById("sf_handler").value;
    sf_project = document.getElementById("sf_project").value;
    sf_group = getMaskGroup(document.getElementById("sf_group").value, sf_handler_group, sf_plus_group);

    save_reviewQty = document.getElementById("sf_reviewQty").value;
    save_reviewType = document.getElementById("sf_reviewType").value;
    save_reviewUsers = document.getElementById("sf_reviewUsers").value;
    save_cycleQty = document.getElementById("sf_cycleQty").value;
    save_cycelType = document.getElementById("sf_cycleType").value;
    save_cycleUsers = document.getElementById("sf_cycleUsers").value;
}

function do_SelectGroup_old() {
    var group = document.getElementById("sf_group").value;
    if(document.getElementById("sf_caseID").value != "" && group.indexOf("*") < 0) {
        return;
    }
    if(isMask(group)) {
        var retGroup;
//        Launch_HandleGroup = "";
//        SFQueryGroup();
//        if(Launch_HandleGroup != "") {
//            retGroup = Launch_HandleGroup;
//        } else {
        retGroup = selectGroup(document.getElementById("sf_project").value, group,
            document.getElementById("sf_role").value);
//        }
//       BootstrapDialog.alert("retGroup="+ retGroup);
        if(retGroup == "") {
            isSave = true;
            do_Cancel();
        } else {
            if(isMask(document.getElementById("sf_group").value) && Launch_GroupSet) {
                document.getElementById("sf_setHandlerGroup").value = "1";
                document.getElementById("sf_handlerGroup").value = retGroup;
                document.getElementById("sf_handlerStatus").value = "[{sf_handler:'" + document.getElementById("sf_handler").value +
                    "', sf_handlerGroup:'" + retGroup + "', sf_plusGroup:'" +
                    document.getElementById("sf_plusGroup").value + "'}]";
                setHandlerGroup = true;
                handlerGroup = retGroup;
            }
            sf_group = document.getElementById("sf_group").value = retGroup;
        }
    }
}

function constructReviewUsers() {
    var str;

    if(Launch_ReviewUsers == "") {
        return "";
    }
    str = "[{method:";
    if(Launch_SendType == "") {
        str += "0";
    } else {
        str += Launch_SendType;
    }
    str += ",type:";
    if(Launch_WorkType == "") {
        str += "0";
    } else {
        str += Launch_WorkType;
    }
    str +=  ",waitType:";
    if(Launch_WaitType == "") {
        str += "0";
    } else {
        str += Launch_WaitType;
    }
    str += ",users:'" + Launch_ReviewUsers + "'}]";
    return str;
}

function setFlowPara(data) {

    eval("flowArray = " + data);
    eval("assignedFlowArray = " + data);
    flowStrArray = getFlowStr(data);
    assignedStrArray = getFlowStr(data);
    setHandlerGroupInArray(flowArray);
    setHandlerGroupInArray(assignedFlowArray);
    clearNames(assignedFlowArray);
}

function getCharCount(str, seperator) {
    if(str == null || str == "")
        return 0;
    var retVal = 0;
    for(var i = 0; i < str.length; i++ ) {
        if(str.charAt(i) == seperator)
            retVal++;
    }
    return retVal+1;
}

function getGroupName(loginName, role) {
    var getRealnameURL = getBasepath() + "/servlet/com.sino.sinoflow.servlet.GetGroupName?name='" + loginName + "'&role='" + role + "'";
    makeRequest(getRealnameURL, ajaxFunction);
    return ajaxReturn;
}

function getRealname(loginName) {
    var getRealnameURL =getBasepath() + "/flow/ui/GetRealname?name='" + loginName + "'";
    makeRequest(getRealnameURL, ajaxFunction);
    var realName ;
    if (ajaxReturn.substr(0,1)=="\"")
        realName = ajaxReturn.substr(1,ajaxReturn.length -2);
    else
        realName = ajaxReturn;
    return realName;
}

function ajaxFunction() {
    try {
        if (http_request.readyState == 4 || http_request.readyState == "complete") {
            var resText = http_request.responseText;
            if(resText.indexOf("Status 404") >= 0) {
                BootstrapDialog.alert("找不到签收 servlet，请通知系统管理员！");
                ajaxReturn = "";
                return;
            }
            if (resText.indexOf("ERROR") >= 0) {
                var res;
                eval("res = " + resText);
                BootstrapDialog.alert(res[0].message);
                ajaxReturn = "";
                return;
            }
            if (resText.substr(0,1)=="\"")
                resText = resText.substr(1,resText.length -2);

            ajaxReturn = resText;
        }
    } catch(e) {
        BootstrapDialog.alert("服务器数据错误，请通知系统管理员！" + e.message);
        ajaxReturn = "";
    }
}

function signAct() {
    var signActURL = getBasepath() + "/flow/workbench/signAct?sf_actID="
        + document.getElementById("sf_actID").value;
   // BootstrapDialog.alert(signActURL)
    makeRequest(signActURL, ajaxFunction);
    return ajaxReturn;
}

function checkGroupMask(proj, group, role) {
    if(group.indexOf("*") >= 0) {
        return groupSelected(proj, group, role, "0");
    } else if(group.indexOf("+") >= 0) {
        return groupSelected(proj, group, role, "1");
    } else {
        return group;
    }
}

function groupSelected(proj, group, role, multiSelected) {
    var url;
    url = getBasepath() + "/flow/ui/GetUserAllGroups?sf_project="
        + proj + "&sf_group=" + group //.replaceAll("+","%2B")
        + "&sf_role=" + role + "&multiSelected=" + multiSelected;
    var popscript;
    if(multiSelected == "0") {
        popscript = "dialogWidth:300px"
            + ";dialogHeight:330px"
            + ";center:yes;status:no;scroll:no;help:no";
    } else {
        popscript = "dialogWidth:600px"
            + ";dialogHeight:330px"
            + ";center:yes;status:no;scroll:no;help:no";
    }
  //  BootstrapDialog.alert(url)
    url=encodeURL(url);
  //                url= url.replaceAll("+","%2B")

    return window.showModalDialog(url, null, popscript);
}



//检查是不是要求选择组别, 返回 0 -- 不要求, 1 -- 要求选择单一组别, 2 -- 要求选择多组组别
function needGroupSelected(group) {
    var i;
    i = group.indexOf(".");
    if(i < 0) {
        if(group == "+" || group == "*")
            return 2;
        if(group == "+++") {
            if(sf_plus_group == "") {
                return 2;
            } else {
                return 0;
            }
        }
        if(group == "***") {
            if(sf_handler_group == "") {
                return 1;
            } else {
                return 0;
            }
        }
        return false;
    } else {
        return Math.max(needGroupSelected(group.substring(0,i)), needGroupSelected(group.substring(i+1, group.length)));
    }
}


function constructFlow(flow) {
    var str = "";

    if(flow == null || flow == "")
        return "";

    str += "{taskID:'" + flow.taskID + "', ";
    str += "procName:'" + flow.procName + "', ";
    str += "taskName:'" + flow.taskName + "', ";
    str += "taskDesc:'" + flow.taskDesc + "', ";
    str += "groupName:'" + flow.groupName + "', ";
    str += "roleName:'" + flow.roleName + "', ";
    str += "taskDur:'"  + flow.taskDur + "', ";
    str += "taskWorktype:'" + flow.taskWorktype + "', ";
    str += "taskCtlType:'" + flow.taskCtlType + "', ";
    str += "taskCycleType:'" + flow.taskCycleType + "', ";
    str += "taskApi:'" + flow.taskApi + "', ";
    str += "taskDivRight:'" + flow.taskDivRight + "', ";
    str += "taskDivHidden:'" + flow.taskDivHidden + "', ";
    str += "taskFlowType:'" + flow.taskFlowType + "', ";
    str += "realnames:'" + flow.realnames + "', ";
    str += "usernames:'" + flow.usernames + "', ";
    str += "flowProp:'" + flow.flowProp + "', ";
    str += "flowID:'" + flow.flowID + "', ";
    str += "flowDesc:'" + flow.flowDesc + "', ";
    str += "flowCode:'" + flow.flowCode + "', ";
    str += "flowHint:'" + flow.flowHint + "', ";
    str += "flowType:'" + flow.flowType + "', ";
    str += "cycleQty:'" + flow.cycleQty + "', ";
    str += "cycleUser:'" + flow.cycleUser + "', ";
    str += "cycleType:'" + flow.cycleType + "', ";
    str += "reviewQty:'" + flow.reviewQty + "', ";
    str += "reviewUsers:'" + flow.reviewUsers + "', ";
    str += "reviewType:'" + flow.reviewType;

    if(setPlusGroup) {
        str += "', plusGroup:'" + plusGroup;
    }

    if(setHandlerGroup) {
        str += "', handlerGroup:'" + handlerGroup;
    }

    /*
     if(waitType != null && waitType != "") {
     str += "', waitType:'" + waitType;
     }
     */
    str += "'}";
    return str;
}

function checkReviewStatus(actId) {
    var checkStatusURL = getBasepath() + "/servlet/com.sino.sinoflow.servlet.CheckReviewStatus?sf_actID="
        +actId;
    makeRequest(checkStatusURL, chkReviewStatus);
    return ajaxReturn;
}

function isMask(src) {
    var left;
    var i;
    i = src.indexOf(".");
    if(i < 0) {
        if(src == "*")
            return true;
        if(src == "***")
            return true;
        if(src == "+")
            return true;
        if(src == "+++")
            return true;
    } else {
        if(i != 0)
            left = src.substring(0,i);
        if(isMask(left))
            return true;
        return isMask(src.substring(i+1, src.length));
    }
    return false;
}

function selectGroup(projName, groupName, roleName) {
    var url;
    url = getBasepath() + "/flow/ui/GetUserGroups?sf_project="+projName+
        "&sf_group="+groupName+"&sf_role="+roleName+"&excludeGroup=";
    var popscript;
    popscript = "dialogWidth:320px"
        + ";dialogHeight:250px"
        + ";center:yes;status:no;scrollbars:no;help:no";

    url = encodeURL(url);

    return window.showModalDialog(url, null, popscript);

}

function fillData(dataStr) {
    if(dataStr == null || dataStr == "")
        return;
    var i;
    var fieldType,fieldName, fieldValue;
    var dataArr;
    if(dataStr.indexOf("\"type\"") >= 0 || dataStr.indexOf("'type'") >= 0)
        dataArr = eval("(" + dataStr + ")");
    else
        eval("dataArr = "+dataStr);
    for(i = 0; i < dataArr.length; i++) {
        fieldName = dataArr[i].name;
        fieldValue = dataArr[i].value;
        if(dataArr[i].type)
            fieldType = dataArr[i].type.toLowerCase();
        else {
            var element = document.getElementsByName(fieldName);
            if(!element)
                continue;
            if(element.length) {
                if(!element[0].tagName)
                    continue;
                fieldType = element[0].tagName.toLowerCase();
                if(fieldType == "input") {
                    fieldType = element[0].type.toLowerCase();
                }
            } else {
                if(!element.tagName)
                    continue;
                fieldType = element.tagName.toLowerCase();
                if(fieldType == "input") {
                    fieldType = element.type.toLowerCase();
                }
            }
        }
        if(fieldType == "text" || fieldType == "hidden" || fieldType == "textarea") {
            document.getElementById(fieldName).value = fieldValue;
//            BootstrapDialog.alert("filedName = " + fieldName + ", filedValue = " + fieldValue);
        } else if(fieldType == "radio") {
            radioSelected(document.getElementsByName(fieldName), fieldValue);
        } else if(fieldType == "checkbox") {
            checkboxSelected(document.getElementsByName(fieldName), fieldValue);
        } else if(fieldType == "select") {
            selSelected(document.getElementById(fieldName), fieldValue);
        }
    }

}

function searchFlowStrExcludeSplit(src, code) {
   // BootstrapDialog.alert("code="+code);
    var count = src.indexOf(code);
    if(count < 0)
        return "";
    var left = src.substring(0, count);
    var right = src.substring(count, src.length);
    var temp = left.substring(left.lastIndexOf("{"), left.length) +
        right.substring(0, right.indexOf("}") + 1);
    if(getJsonData(temp,"taskFlowType:") != "4") {
        // 非子流 => return
        if(getJsonData(temp,"taskName:") == "SPLIT" || getJsonData(temp,"taskName:" == "JOIN")) {
            temp = right.substring(right.indexOf("{"), right.length);
            return searchFlowStr(temp, code);
        } else {
            return temp;
        }
    }else {
        // 子流 => 返回下一个 added  by xpz 2016/6/26 解决并流的第一个节点是子流的问题  begin
        temp = right.substring(right.indexOf("{"), right.length);
        temp = temp.substring(temp, temp.indexOf("}") + 1);
      //  BootstrapDialog.alert("temp=" + temp + ";code=" + code);
        return temp;
        // end
    }
   //  by xpz 2016/6/26 解决并流的第一个节点是子流的问题
   // return searchFlowStrExcludeSplit(temp, code);
}

function searchFlowStr(src, code) {
    var count = src.indexOf(code);
    if(count < 0)
        return "";
    var left = src.substring(0, count);
    var right = src.substring(count, src.length);
    var temp = left.substring(left.lastIndexOf("{"), left.length) +
        right.substring(0, right.indexOf("}") + 1);
    if(getJsonData(temp,"taskFlowType:") != "4") {
        // 非子流 => return
        return temp;
    }
    // 子流 => 返回下一个
    temp = right.substring(right.indexOf("{"), right.length);

    return searchFlowStr(temp, code);
}

function parallelFlowApi(participants, src) {
    var partiArray = participants.split("\\");
    var str = src;
    var tempGroups = Launch_ParallelGroups;
//    BootstrapDialog.alert("partiArray.length="+partiArray.length);
    for(var k = 0; k < partiArray.length; k++) {
        var count = partiArray[k].indexOf(":");
        if(count < 0) {
            BootstrapDialog.alert("并流参与者对格式错误, 没有':'!")
            return "";
        }
        var code = "flowCode:'" + partiArray[k].substring(0, count) + "'";
        var parti = partiArray[k].substring(count + 1, partiArray[k].length);
      //   BootstrapDialog.alert("str="+str);
        var flowStr = searchFlowStrExcludeSplit(str, code);
      //  BootstrapDialog.alert("flowStr="+flowStr)
        if(flowStr == null || flowStr == "")
            continue;
        var flow;
        eval("flow = " + flowStr);
//BootstrapDialog.alert("parti="+parti)
        flow.usernames = parti;
        flow.realnames = "";
        var nameArr = parti.split(";")
        var realnameArr = tempGroups.split(";");
        var gIndex = 0;
        for(var i = 0; i < nameArr.length; i++) {
            var nameArr2 = nameArr[i].split(",");
            var tempname = "";
            for(var j = 0; j < nameArr2.length; j++) {
                if(tempname == "") {
                    if(realnameArr[i])  {
                        tempname = getRealname(nameArr2[j]) + "/" + realnameArr[i];
                        gIndex = i;
                    }else
                        tempname = getRealname(nameArr2[j]) + "/" + realnameArr[gIndex];
                } else {
                    if(realnameArr[i]){
                        tempname += "," + getRealname(nameArr2[j]) + "/" + realnameArr[i];
                        gIndex = i;
                    }else
                        tempname += "," + getRealname(nameArr2[j]) + "/" + realnameArr[gIndex];
                }
                var ind = tempGroups.indexOf(";");
                if (ind > 0) {
                    tempGroups = tempGroups.substring(ind + 1);
                }
            }

            if(flow.realnames == "")
                flow.realnames = tempname;
            else
                flow.realnames += ";" + tempname;
        }
       // BootstrapDialog.alert("flow.realnames="+flow.realnames);
        str = str.replace(flowStr, constructFlow(flow));
      //  BootstrapDialog.alert("str1="+str);
        if(Launch_WaitType) {
            var waitIndex = str.indexOf("waitType:");
            if(waitIndex >= 0) {
                var waitStr = str.substring(waitIndex, waitIndex + 12);
                str = str.replace(waitStr, "waitType:'" + Launch_WaitType + "'");
            }
        }
    }

    return str;
}

function flowsSelectDlg(flowsStr) {
    var url;
      /*
     url = "/flow/ui/GetFlowSelect?flowsStr=\""
     +flowsStr.replaceAll("+","%2B")
     +"\"&sf_handlerStatus='"
     +document.getElementById("sf_handlerStatus").value
     +"'&sf_project='"
     + sf_project + "'&sf_trayType=" + document.getElementById("sf_trayType").value;
       */
    /*
    var flowCode = getJsonData(flowsStr, "flowCode:");
    url = getBasepath() + "/flow/ui/GetFlowSelect?sf_flowCode="
        + flowCode
        + "&sf_actID="
        + document.getElementById("sf_actID").value
        +"&sf_handlerStatus='"
        +document.getElementById("sf_handlerStatus").value
        +"'&sf_project='"
        + sf_project + "'&sf_trayType=" + document.getElementById("sf_trayType").value;

    BootstrapDialog.alert(url)
    url= encodeURI(url);
    var popscript;
    popscript = "dialogWidth:600px"
        + ";dialogHeight:300px"
        + ";center:yes;status:no;scrollbars:no;help:no";
    return window.showModalDialog(url, null, popscript);
    */
    if (flowsStr.charAt(0) == '[' && flowsStr.charAt(flowsStr.length -1) == ']')  {
        flowsStr = flowsStr.substring (1,flowsStr.length-1);
    }
   // var arrFlow = getFlowStr(flowsStr);
    var splitFlow = searchFlowStr(flowsStr,"SPLIT");
    //BootstrapDialog.alert("flowsStr="+flowsStr);
    /*if (flowsStr.substr(0,1)=="[")
        flowsStr = flowsStr.substr(1,flowsStr.length -2)
        */

    var taskId =  getJsonData(splitFlow, "taskID:");
    //BootstrapDialog.alert("taskId="+taskId);

    var retStr =  multipleFlowDlg(taskId)
    if (retStr.charAt(0) == '[' && retStr.charAt(retStr.length -1) == ']')  {
        retStr = retStr.substring (1,retStr.length-1);
    }
    var arrFlow = getFlowStr(retStr);

    for ( i = 0; i < arrFlow.length ; i++){
        var tmpFlow = arrFlow[i];
        var taskName = getJsonData(tmpFlow, "taskName:");
        var taskId = getJsonData(tmpFlow, "taskID:");
        if (taskName == 'SPLIT')
            continue;
       // var flowCode = getJsonData(tmpFlow, "flowCode:");
        var flowStr1 = searchFlowStr(tmpFlow,taskId);
     //   if (tmpFlow.charAt(0) == '[' && tmpFlow.charAt(tmpFlow.length -1) == ']')  {
     //       tmpFlow = tmpFlow.substring (1,tmpFlow.length-1);
     //   }
        var flowStr2 = searchFlowStr(flowsStr,taskId);
        flowsStr = flowsStr.replace(flowStr2,flowStr1);

    }
    return flowsStr;
}

function multipleFlowDlg(taskid) {
    var url;
    url =getBasepath() +  "/flow/ui/GetMultipleFlows?sf_taskID="
        +taskid+"&sf_handlerStatus="
        +document.getElementById("sf_handlerStatus").value
        +"&sf_project="
        +sf_project ;
    var popscript;
    popscript = "dialogWidth:600px"
        + ";dialogHeight:300px"
        + ";center:yes;status:no;scrollbars:no;help:no";
    url= encodeURL(url);
    return window.showModalDialog(url, null, popscript);
}
function selectParticipantDlg(flowData, selectedData, multSelected) {
   // BootstrapDialog.alert("select dlg")
    var url;
   // BootstrapDialog.alert( "contextPath="+contextPath)
    url = getBasepath() + "/flow/ui/SelectParticipant?multi_selected=" + multSelected;
   // BootstrapDialog.alert(url)
    var popscript;
    popscript = "dialogWidth:600px"
        + ";dialogHeight:280px"
        + ";center:yes;status:no;scroll:no;help:no";
    var largeText = new Array();
    // using array because string can only pass 4096 characters but array do not have this limit
    largeText[0] = flowData;
    largeText[1] = selectedData;
   // BootstrapDialog.alert(url)
    return window.showModalDialog(url, largeText ,popscript);
}


function getServerMaskGroups(proj, group, role) {
    var getMaskURL = getBasepath() + "/flow/ui/GetAllGroups?sf_project='"
        + proj + "'&sf_group='" + group.replaceAll("+","%2B")
        + "'&sf_role='" + role +"'";
    getMaskURL = encodeURL(getMaskURL);
    makeRequest(getMaskURL, ajaxFunction);
    return ajaxReturn;
}

function conditionalFlowDlg(str, bypass) {
    var url;
    url =  "/flow/conditionalFlow.jsp?bypass='" + bypass + "'";
    var popscript;
    popscript = "dialogWidth:300px"
        + ";dialogHeight:200px"
        + ";center:yes;status:no;scrollbars:no;help:no";
    var largeText = new Array();
    // using array because string can only pass 4096 characters but array do not have this limit
    largeText[0] = str;
    return window.showModalDialog(url, largeText ,popscript);
}

function selectCycleUsers(proj, group, role) {
    var url;
    url =getBasepath() + "/flow/ui/GetCycleUsers?sf_project="+
        proj + "&sf_group="+group
        +"&sf_role="+role;
    var popscript;
    popscript = "dialogWidth:620px"
        + ";dialogHeight:200px"
        + ";center:yes;status:no;scrollbars:no;help:no";
    url = encodeURL(url);
    return window.showModalDialog(url, null, popscript);
}

function getCycleRealnames(loginName, role) {
    var getRealnameURL = getBasepath() + "/flow/ui/GetCycleRealnames?names=" + loginName + "&role=" + role ;
    getRealnameURL = encodeURI(getRealnameURL);
    makeRequest(getRealnameURL, ajaxFunction);
   // if (ajaxReturn.substr(0,1)=="\"")
   //     ajaxReturn = ajaxReturn.substr(1,ajaxReturn.length -2);

    return ajaxReturn;
}


function getGroupCycleUsers(proj, group, role) {
    var url;
    url = getBasepath() + "/flow/ui/GetAllGroupsUsers?sf_project="
        + proj + "&sf_group=" + group
        + "&sf_role=" + role ;
    var popscript;
    popscript = "dialogWidth:600px"
        + ";dialogHeight:330px"
        + ";center:yes;status:no;scroll:no;help:no";
    url = encodeURL(url);
    return window.showModalDialog(url, null, popscript);
}

function getGroupsUsersNames(proj, groups, role) {
    var getGroupUsersURL = getBasepath() +"/flow/ui/GetCycleGroupUsers?sf_project="
        + proj + "&sf_groups=" + groups + "&sf_role="
        + role ;
    getGroupUsersURL = encodeURL(getGroupUsersURL);
    makeRequest(getGroupUsersURL, ajaxFunction);
    return ajaxReturn;
}


function getPriorityDlg() {
    var url;
    url = getBasepath() + "/flow/ui/GetFlowPriority";
    var popscript;
    popscript = "dialogWidth:360px"
        + ";dialogHeight:210px"
        + ";center:yes;status:no;scrollbars:no;help:no";
    return window.showModalDialog(url, null, popscript);
}

function copySelectDlg(project, group, role) {
    var url;
    url = getBasepath() + "/flow/ui/copySelect?project="+sf_project;
    var popscript;
    popscript = "dialogWidth:620px"
        + ";dialogHeight:430px"
        + ";center:yes;status:no;scroll:no;scrollbars:no;help:no";
    var largeText = new Array();
    largeText[0] = project;
    largeText[1] = group;
//    largeText[2] = role;
    largeText[2] = "";
    url = encodeURL(url);
    return window.showModalDialog(url, largeText, popscript);
}

function deliveryStatusDlg() {
    var url;
    url = getBasepath() + "/flow/ui/GetDeliveryStatus?project="+sf_project;
    var popscript;
    popscript = "dialogWidth:435px"
        + ";dialogHeight:300px"
        + ";center:yes;status:no;scroll:no;scrollbars:no;help:no";
    var largeText = new Array();
    largeText[0] = document.getElementById("sf_nextTaskData").value;
    largeText[1] = "{project:'" + sf_project + "',group:'" + document.getElementById("sf_group").value
        + "',role:'" + document.getElementById("sf_role").value + "'}"
    url = encodeURI(url);

    return window.showModalDialog(url, largeText, popscript);
}

function deliveryStatusEndDlg() {
    var url;
    url = "/flow/deliveryStatusEnd.jsp?project='"+sf_project+"'";
    var popscript;
    popscript = "dialogWidth:360px"
        + ";dialogHeight:175px"
        + ";center:yes;status:no;scroll:no;help:no";
    var largeText = new Array();
    largeText[0] = "{project:'" + sf_project + "',group:'" + document.getElementById("sf_group").value
        + "',role:'" + document.getElementById("sf_role").value + "'}";
    return window.showModalDialog(url, largeText, popscript);
}

function setReviewUsers(actId, type, qty, users) {
    var setReviewUsersURL = getBasepath() + "/servlet/com.sino.sinoflow.servlet.SetReviewUsers?sf_actID="
        + actId + "&sf_reviewType=" + type
        + "&sf_reviewQty=" + qty + "&sf_reviewUsers='"
        + users + "'&sf_trayType=" + document.getElementById("sf_trayType").value;
    makeRequest(setReviewUsersURL, reviewUsersReturn);
    return ajaxReturn;
}

//从服务器取下一节点信息，如果多于一个节点，弹出
function getGroupUsersByGroups() {
    try {
        if (http_request.readyState == 4 || http_request.readyState == "complete") {
            var resText = http_request.responseText;
            if (resText == 'ERROR') {
                BootstrapDialog.alert("取会签组别人员错误，请重新尝试提交或通知系统管理员！");
//                hiddenWaitDiv();
//                cancelDisable();
                sync = true;
                return;
            }

            if (resText.substr(0,1)=="\"")
                resText = resText.substr(1,resText.length -2);
            var resArray;
            eval("resArray = " + resText);
            if(resArray[0].count < 1) { //如果没有找到下一个节点
                BootstrapDialog.alert("没有找到会签组别人员，请通知系统管理员！");
//                hiddenWaitDiv();
//                cancelDisable();
                sync = true;
                return;
            }
            Launch_CycleUsers = resArray[0].value;
            sync = true;
        }
    } catch(e) {
        BootstrapDialog.alert("取会签组别人员错误，请通知系统管理员！" + e.message);
//        hiddenWaitDiv();
//        cancelDisable();
        sync = true;
    }
}


function getCycleGroupUsers(groups, role) {
    var cycleGroupUserURL = getBasepath() + "/flow/ui/GetCycleGroupUsers?sf_project="
        + sf_project + "&sf_groups="
        + groups+ "&sf_role=" + role ;
    cycleGroupUserURL = encodeURL(cycleGroupUserURL);
    makeRequest(cycleGroupUserURL, getGroupUsersByGroups);

    return ajaxReturn;
}

function getJsonData(status, attr) {
    if(status == null || status == "" || status == "''" || status == "\"\"") {
        return "";
    }
    var count = status.indexOf("}");
    var str;
    if(count >= 0)
        str = status.substring(0, count);
    else
        str = status;
    var temp = attr + "'";

    var start = str.indexOf(temp);
    if(start < 0)
        return "";
    start += temp.length;

    var end = str.substring(start, str.length).indexOf("'");
    return str.substring(start, start + end);
}

function getFlowPropInArray(prop) {
    if(prop.length) {
        return getFlowPropInArray(prop[0]);
    } else {
        return prop;
    }
}

function inList(src, compData, separator) {
    if(src.length == 0 || compData.length == 0)
        return false;
    var srcList = src.split(separator);
    for(var i = 0; i < srcList.length; i++) {
        var data = srcList[i];
        if(data.toUpperCase() == compData.toUpperCase()) {
            return true;
        }
    }
    return false;
}

function findMatchPattern(src) {
    var count = 1;
    var sPattern, cPattern;
    if(src == null)
        return null;
    if(src.charAt(0) == '[') {
        sPattern = '[';
        cPattern = ']';
    } else if(src.charAt(0) == '{') {
        sPattern = '{';
        cPattern = '}';
    } else {
        return null;
    }
    for(var i = 1; i < src.length; i++) {
        if(src.charAt(i) == cPattern)
            count--;
        if(count == 0)
            return src.substring(0, i + 1);
        if(src.charAt(i) == sPattern)
            count++;
    }
    return src;
}

function getFlowStr(src) {
    if(src == null || src == "")
        return null;
    var strArray = new Array();
    var flowCount = 0;
    var str = src;
    var temp;
    while(str != "") {
        temp = findMatchPattern(str);
        if(temp == null) {
            strArray[flowCount++] = str;
            str = "";
        } else {
            strArray[flowCount++] = temp;
            if(str.length < temp.length + 2)
                str = "";
            else
                str = str.substring(temp.length + 1, str.length);
        }
    }
    return strArray;
}

function makeRequest(url, alertContents) {

    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
         //   http_request.overrideMimeType('text/xml;charset=UTF-8');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        BootstrapDialog.alert('不能启动 xml http 服务！');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('POST', url, false);
    http_request.send(null);
    return true;
}

function saveNextTaskData() {
    save_nextTaskData = document.getElementById("sf_nextTaskData").value;
}

function restoreNextTaskData() {
    if(save_nextTaskData) {
        document.getElementById("sf_nextTaskData").value = save_nextTaskData;
        save_nextTaskData = null;
    }
}

function autoValue(status) {
    var element = document.getElementById("sf_autoValue");
    if(!element)
        return;
    var value = element.value;
    if(value == null || value == "")
        return;
    var autoArr;
    eval("autoArr = " + value);
    if(autoArr.length == 0)
        return;
    var str = "";
    for(var i = 0; i < autoArr.length; i++) {
        var av = autoArr[i];
        if(status == (av.aon & status)) {
            if(str == "") {
                str = "[{name:'";
            } else {
                str += ",{name:'";
            }
            var avalue = "";
            switch(parseInt(av.value)) {
                case 0:
                    avalue = document.getElementById("sf_user").value;
                    break;
                case 1:
                    avalue = getServerTime();
                    var count = avalue.indexOf(" ");
                    if(count >= 0)
                        avalue = avalue.substring(0, count);
                    break;
                case 2:
                    avalue = document.getElementById("sf_group").value;
                    break;
            }
            if(av.atype == "0") {
                var fvalue = getValue(av.name);
                if(fvalue != "")
                    fvalue += ";"
                avalue = fvalue + avalue;
            }
            str += av.name + "',value:'" + avalue + "'}";
        }
    }
    if(str != "") {
        str += "]";
        fillData(str);
    }
}

function getTaskName(taskProp) {
    if(!taskProp.length) {
        if(taskProp.taskName) {
            if(taskProp.taskName == "JOIN")
                return "";
            else if(taskProp.taskName == "SPLIT")
                return "";
            else
                return taskProp.taskName;
        } else
            return "";
    }
    var name = "";
    for(var i = 0; i < taskProp.length; i++) {
        var prop = taskProp[i];
        var taskName = getTaskName(prop);
        if(taskName != "") {
            if(name == "")
                name += taskName;
            else
                name += ";" + taskName;
        }
    }
    return name;
}

function setNextFlowDesc() {
    if(document.getElementById("sf_opinion").value != "")
        return;
    var flowDesc = getJsonData(document.getElementById("sf_nextTaskData").value, "flowHint:");
    document.getElementById("sf_opinion").value = flowDesc;
}

function clearDivRight() {
    var allDiv = document.getElementsByTagName("DIV");
    for(var i = 0; i < allDiv.length; i++) {
        var compDiv = allDiv.item(i);
        if(compDiv.id.indexOf("app_") == 0)
            continue;
        var cNodes = compDiv.childNodes;
        for(var p in cNodes) {
            setRight(cNodes[p], false);
        }
    }
}

function setRight(element, flag) {
    if(!element.tagName)
        return;
    var tagName = element.tagName.toUpperCase();
    if(tagName != "TABLE" && tagName != "TBODY" && tagName != "TR" && tagName != "TD") {
        if(tagName == "IMG" || tagName == "img") {
            if(flag)
                element.onclick = "";
        } else {
            element.readOnly = flag;
            element.disabled = flag;
        }
    }
    if(element.hasChildNodes()) {
        for(var p in element.childNodes) {
            setRight(element.childNodes[p], flag);
        }
    }
}

function setDivRight() {
    var hDiv = document.getElementById("sf_divRight").value;
    var allDiv = document.getElementsByTagName("DIV");
    for(var i = 0; i < allDiv.length; i++) {
        var compDiv = allDiv.item(i);
        if(compDiv.id.indexOf("app_") == 0)
            continue;
        if(!inList(hDiv, compDiv.id, ";") && compDiv.id != "sinoButtonAll") {
            var cNodes = compDiv.childNodes;
            for(var p in cNodes) {
                setRight(cNodes[p], true);
            }
        } else if(inList(hDiv, compDiv.id, ";")) {
            var cNodes = compDiv.childNodes;
            for(var p in cNodes) {
                setRight(cNodes[p], false);
            }
        }
    }
    var hArr = hDiv.split(";");
    var elem;
    for(var i = 0; i < hArr.length; i++) {
        elem = document.getElementById(hArr[i]);
        if(!elem)
            continue;
        if(elem.tagName == "DIV" || elem.tagName == "div")
            continue;
        setRight(elem, false);
    }
}

function setDivVisibility() {
    var hDiv = document.getElementById("sf_divHidden").value;
    var allDiv = document.getElementsByTagName("DIV");
    for(var i = 0; i < allDiv.length; i++) {
        var compDiv = allDiv.item((i));

        var isInList = inList(hDiv, compDiv.id, ";")
        if((compDiv.id.indexOf("$$$") == 0 || compDiv.id.indexOf("app_") == 0 || compDiv.id.length == 0) && !isInList)
            continue;
        if(isInList) {
            compDiv.style.visibility = "hidden";
            compDiv.style.display = "none";
        } else {
            compDiv.style.visibility = "visible";
            compDiv.style.display = "block";
        }
    }
    var hArr = hDiv.split(";");
    var elem;
    for(var i = 0; i < hArr.length; i++) {
        elem = document.getElementById(hArr[i]);
        if(!elem)
            continue;
        if(elem.tagName == "DIV" || elem.tagName == "div")
            continue;
        elem.style.visibility = "hidden";
        elem.style.display = "none";
    }
}

function trim(mxh){//去除字符串空格
    var newStr = "";
    for(var i=0;i<mxh.length;i++){
        if(mxh.charAt(i)==" ")
            newStr+=""
        else
            newStr+=mxh.charAt(i)
    }
    return newStr;
}
function isReviewUser() {
    if(document.getElementById("sf_reviewQty").value == "" || document.getElementById("sf_reviewQty").value == "0" ||
        (document.getElementById("sf_reviewType").value & 0x20) == 0)
        return false;
    else
        return true;
}

function saveReviewUsers() {
    /*
     setReviewUsers(document.getElementById("sf_actID").value, document.getElementById("sf_reviewType").value,
     document.getElementById("sf_reviewQty").value, document.getElementById("sf_reviewUsers").value);
     */
    setReviewStatus = true;
    if((document.getElementById("sf_reviewType").value & 0x02) == 0x02)
        reviewNotWait = true;
    else
        reviewNotWait = false;
}

function setHandlerGroupInArray(prop) {
    if(!setHandlerGroup)
        return;
    for(var i = 0; i < prop.length; i++) {
        if(prop[i].length) {
            setHandlerGroupInArray(prop[i]);
        } else {
            var taskName = prop.taskName;
            if(taskName == "SPLIT" || taskName == "JOIN" || taskName == "STOP")
                continue;
            else if(prop.taskFlowType == "4")
                continue;
            prop[i].groupName = handlerGroup;
        }
    }
}

function clearNames(srcArray) {
    for(var i = 0; i < srcArray.length; i++) {
        if(srcArray[i].length) {
            clearNames(srcArray[i]);
        } else {
            srcArray[i].realnames = "";
            srcArray[i].usernames = "";
        }
    }
}

function getNextTaskUsers(taskProp) {
    if(!taskProp.length)
        return taskProp.usernames;
    var name = "";
    for(var i = 0; i < taskProp.length; i++) {
        var prop = taskProp[i];
        var usernames = getNextTaskUsers(prop);
        if(usernames && usernames != "") {
            if(name == "") {
                name = usernames;
            } else {
                name += ";" + usernames;
            }
        }
    }
    return name;
}

function setNextTaskUsers() {
    var prop;
    eval("prop = " + document.getElementById("sf_nextTaskData").value);
    //prop = eval(document.getElementById("sf_nextTaskData").value);
    var users = getNextTaskUsers(prop);
    document.getElementById("sf_nextTaskUsers").value = users;
}

function _tagSinoFlowObject(appID, actID, setHandlerGroup, handlerGroup, project, procedure, flowDesc,
                            priority, comment, group, reviewQty, reviewUsers, reviewType, cycleQty, cycleUsers, cycleType,
                            trayType, setPlusGroup, nextTaskData, appFieldValue, userID, attribute1, attribute2, attribute3,
                            attribute4, attribute5, copyUsers, copyMsg, caseId, nextTaskUsers, opinion, event, eventUser)
{
    this.sf_appID = appID;
    this.sf_actID = actID;
    this.sf_setHandlerGroup = setHandlerGroup;
    this.sf_handlerGroup = handlerGroup;
    this.sf_project = project;
    this.sf_procedure = procedure;
    this.sf_flowDesc = flowDesc;
    this.sf_priority = priority;
    this.sf_comment = comment;
    this.sf_group = group;
    this.sf_reviewQty = reviewQty;
    this.sf_reviewUsers = reviewUsers;
    this.sf_reviewType = reviewType;
    this.sf_cycleQty = cycleQty;
    this.sf_cycleUsers = cycleUsers;
    this.sf_cycleType = cycleType;
    this.sf_trayType = trayType;
    this.sf_setPlusGroup = setPlusGroup;
    this.sf_nextTaskData = nextTaskData;
    this.sf_appValue = appFieldValue;
    this.sf_userID = userID;
    this.sf_task_attribute1 = attribute1;
    this.sf_task_attribute2 = attribute2;
    this.sf_task_attribute3 = attribute3;
    this.sf_task_attribute4 = attribute4;
    this.sf_task_attribute5 = attribute5;
    this.copyUsers = copyUsers;
    this.copyMsg = copyMsg;
    this.caseID = caseId;
    this.sf_nextTaskUsers = nextTaskUsers;
    this.sf_opinion = opinion;
    //event: '', '0' - normal event, '2': caseBack, '3': caseForward, '4': caseAsk, '5': caseAmswer, '1': special send
    this.sf_event = event;
    this.sf_eventUser = eventUser;

    /*
     this.Parse = function(VarTypeUser)
     {
     for (var i=0;i<VarTypeUser.length;i++)
     VarTypeUser[i] = String.fromCharCode(VarTypeUser.charCodeAt(i)^0xFFFF);
     this.UserId = VarTypeUser.substr(0,4); //0-4
     this.UserName = VarTypeUser.substr(5); //4--
     }

     this.ToString = function()
     {
     var str = this.UserId.toString();
     while (str.length<5)
     {
     str += "\u0000";
     }
     str += this.UserName;
     for (var i=0;i<str.length;i++)
     {
     str[i] = String.fromCharCode(str.charCodeAt(i)^0xFFFF);
     }
     return str;
     }
     */
}

function saveInfo()
{

    if(processReviewUsers)
        saveReviewUsers();
    if(save_cycleQty) {
        if(save_cycleQty)
            document.getElementById("sf_cycleQty").value = save_cycleQty;
        else
            document.getElementById("sf_cycleQty").value = "0";
        if(save_cycleUsers)
            document.getElementById("sf_cycleUsers").value = save_cycleUsers;
        else
            document.getElementById("sf_cycleUsers").value = "";
        if(save_cycleType)
            document.getElementById("sf_cycleType").value = save_cycleType;
        else
            document.getElementById("sf_cycleType").value = "";
        save_cycleQty = "0";
        save_cycleUsers = save_cycleType = null;
    }
    if(save_reviewQty) {
        if(save_reviewQty)
            document.getElementById("sf_reviewQty").value = save_reviewQty;
        else
            document.getElementById("sf_reviewQty").value = "0";
        if(save_reviewUsers)
            document.getElementById("sf_reviewUsers").value = save_reviewUsers;
        else
            document.getElementById("sf_reviewUsers").value = "";
        if(save_reviewType)
            document.getElementById("sf_reviewType").value = save_reviewType;
        else
            document.getElementById("sf_reviewType").value = "";
        save_reviewQty = "0";
        save_reviewUsers = save_reviewType = "";
    }

    var sinoflowObject = new _tagSinoFlowObject("","","","","","","","","","","","","","","",
        "","","","","","","","","","","","","","", "", "");
    sinoflowObject.sf_appID = document.getElementById("sf_appID").value;
    sinoflowObject.sf_actID = document.getElementById("sf_actID").value;
    sinoflowObject.sf_setHandlerGroup = document.getElementById("sf_setHandlerGroup").value;
    sinoflowObject.sf_handlerGroup = document.getElementById("sf_handlerGroup").value;
    sinoflowObject.sf_project = document.getElementById("sf_project").value;
    sinoflowObject.sf_procedure = document.getElementById("sf_procedure").value;
    sinoflowObject.sf_flowDesc = document.getElementById("sf_flowDesc").value;
    sinoflowObject.sf_priority = document.getElementById("sf_priority").value;
    sinoflowObject.sf_comment = document.getElementById("sf_comment").value;
    sinoflowObject.sf_group = document.getElementById("sf_group").value;

    sinoflowObject.sf_reviewQty = document.getElementById("sf_reviewQty").value;
    sinoflowObject.sf_reviewUsers = document.getElementById("sf_reviewUsers").value;
    sinoflowObject.sf_reviewType = document.getElementById("sf_reviewType").value;
    sinoflowObject.sf_cycleQty = document.getElementById("sf_cycleQty").value;
    sinoflowObject.sf_cycleUsers = document.getElementById("sf_cycleUsers").value;
    sinoflowObject.sf_cycleType = document.getElementById("sf_cycleType").value;
    sinoflowObject.sf_trayType = document.getElementById("sf_trayType").value;
    sinoflowObject.sf_setPlusGroup = document.getElementById("sf_setPlusGroup").value;
    sinoflowObject.sf_nextTaskData = document.getElementById("sf_nextTaskData").value;
    sinoflowObject.sf_userID = document.getElementById("sf_userID").value;

    sinoflowObject.sf_task_attribute1 = document.getElementById("sf_task_attribute1").value;
    sinoflowObject.sf_task_attribute2 = document.getElementById("sf_task_attribute2").value;
    sinoflowObject.sf_task_attribute3 = document.getElementById("sf_task_attribute3").value;
    sinoflowObject.sf_task_attribute4 = document.getElementById("sf_task_attribute4").value;
    sinoflowObject.sf_task_attribute5 = document.getElementById("sf_task_attribute5").value;
    sinoflowObject.sf_copyUsers = document.getElementById("sf_copyUsers").value;
    sinoflowObject.sf_copyMsg = document.getElementById("sf_copyMsg").value;
    sinoflowObject.sf_caseID = document.getElementById("sf_caseID").value;
    sinoflowObject.sf_nextTaskUsers = document.getElementById("sf_nextTaskUsers").value;
    sinoflowObject.sf_opinion = document.getElementById("sf_opinion").value;
    sinoflowObject.sf_event = document.getElementById("sf_event").value;
    sinoflowObject.sf_eventUser = document.getElementById("sf_eventUser").value;

    var fieldList = document.getElementById("sf_appField").value.split(";");
    var fieldValue = "";

    for(var i = 0; i < fieldList.length; i++) {
        if(i != 0)
            fieldValue += "&;&";
        if(fieldList[i] == null || fieldList[i] == "")
            continue;
        if(document.getElementById(fieldList[i]))
            fieldValue += document.getElementById(fieldList[i]).value;
        else {
            BootstrapDialog.alert("表单中不存在应用定义里的域 " + fieldList[i] + " !");
        }
    }
    //sf_appFieldValue
    sinoflowObject.sf_appValue = fieldValue;
    // var appFieldValue = sinoflowObject.toJSONString();

    var appFieldValue = JSON.stringify(sinoflowObject);

    //下面这句话。针对于IE8，比较低的小版本bug.
    appFieldValue=appFieldValue.replace(new RegExp("null","gm"),"");

    document.getElementById("sf_appFieldValue").value = appFieldValue;
   // BootstrapDialog.alert("appFieldValue="+appFieldValue);
    return;
    // document.getElementById("sf_appFieldValue").value = appFieldValue;
}

function ajaxFunctionNoErrorMsg() {
    try {
        if (http_request.readyState == 4 || http_request.readyState == "complete") {
            var resText = http_request.responseText;
            if(resText.indexOf("404") >= 0) {
                ajaxReturn = "";
                return;
            }
            if (resText.indexOf("ERROR") >= 0) {
                ajaxReturn = "";
                return;
            }
            ajaxReturn = resText;
        }
    } catch(e) {
        ajaxReturn = "";
    }
}

function getHandlerName(caseId, group, role) {
    var getHandlerURL = getBasepath() + "/flow/ui/GetHandler?sf_caseID=" + caseId +
        "&sf_group=" + group + "&sf_role=" + role ;
    getHandlerURL = encodeURL(getHandlerURL);
    makeRequest(getHandlerURL, ajaxFunctionNoErrorMsg);
    return ajaxReturn;
}

function checkSpecialSend() {
    var getSendTaskURL = getBasepath() + "/flow/ui/GetSendTask?projName="
        + sf_project + "&procName=" + document.getElementById("sf_procedure").value
        + "&nowTask=" + document.getElementById("sf_taskname").value + "&procId="
        + document.getElementById("sf_procedureid").value ;

    h = window.screen.height;
    w = window.screen.width;
    var f1 = "dialogWidth:" + w
        + ";dialogHeight:" + h
        + ";center:yes;status:no;scrollbars:no;help:no";
    getSendTaskURL= encodeURL(getSendTaskURL);
    return window.showModalDialog(getSendTaskURL, null, f1);

}

function toTask(taskName) {
    var toTaskURL = getBasepath() + "/flow/ui/GetToTaskInfo?sf_actID="
        + document.getElementById("sf_actID").value + "&fromTask="
        + document.getElementById("sf_taskname").value + "&toTask="
        + taskName + "&procId=" + document.getElementById("sf_procedureid").value
        + "&handlerGroup=" + document.getElementById("sf_handlerGroup").value;

    toTaskURL = encodeURL(toTaskURL);
    makeRequest(toTaskURL, ajaxFunction);
    if(ajaxReturn != "") {
        var resArray;
        eval("resArray = " + ajaxReturn);
        if(resArray[0].usernames.indexOf(",") >= 0 || resArray[0].usernames.indexOf(";") >= 0) {
            var tempStr = selectParticipantDlg(ajaxReturn,"","0");
            if(tempStr == "")
                return "";
            var tempArray;
//            eval("tempArray = " + tempStr);
            tempArray = eval(tempStr);
            resArray[0].usernames = tempArray[0].usernames;
            resArray[0].realnames = tempArray[0].realnames;
        }
        ajaxReturn = processTasks(resArray, ajaxReturn);
    }
    return ajaxReturn;
}

function processTasks(prop, str) {
    var retStr = "";
    var i;
    if(prop.length == 1) {
        if(prop[0].length) {
            retStr = processTasks(prop[0], str.substring(1, str.length - 1));
            if(retStr == "")
                return retStr;
            return "[" + retStr + "]";
        }
        if(prop[0].taskName == "SPLIT")
            return processMultipleTask(prop, str);
        retStr = processSingleTask(prop[0], str.substring(1, str.length - 1));
        if(retStr == "")
            return retStr;
        else
            return "[" + retStr + "]";
    } else {
        var taskName = prop[0].taskName;
        var condFlow = getFlowPropInArray(prop[1]).condFlow;
        if(taskName == "SPLIT") {
            return processMultipleTask(prop[0], str);

        } else if((taskName == "JOIN" || taskName == "STOP" || prop[0].taskFlowType == "4")
            && condFlow != '1') {
            var tasksStr = getFlowStr(str.substring(1, str.length - 1));
            var tempStr;
            retStr = "";
            for(i = 0; i < prop.length; i++) {
                if(prop[i].length)
                    tempStr = processTasks(prop[i], tasksStr[i]);
                else
                    tempStr = processSingleTask(prop[i], tasksStr[i]);
                if(tempStr == "")
                    return tempStr;
                if(retStr != "")
                    retStr += ",";
                retStr += tempStr;
            }
            return "[" + retStr + "]";
        } else {

            if(condFlow == "1") {
                return processConditionalTask(prop, str);
            } else {
                tasksStr = getFlowStr(str.substring(1, str.length - 1));
                tempStr;
                retStr = "";
                for(i = 0; i < prop.length; i++) {
                    if(prop[i].length)
                        tempStr = processTasks(prop[i], tasksStr[i]);
                    else
                        tempStr = processSingleTask(prop[i], tasksStr[i]);
                    if(tempStr == "")
                        return tempStr;
                    if(retStr != "")
                        retStr += ",";
                    retStr += tempStr;
                }
                return "[" + retStr + "]";
            }
        }
    }
}

function processSingleTask(prop, str) {
    var taskName = prop.taskName;
    Launch_FlowStr = str;
    if(taskName == "JOIN" || taskName == "STOP" || prop.taskFlowType == "4") {
        return str;
    }
    return getReturnProp(prop, str);
}

function processConditionalTask(prop, str) {
    // conditional flow
    Launch_FlowStr = str;
    SFQueryConditionalFlow();
    if(!Launch_Continue) {
        if(Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return "";
    }
    var code = Launch_Code;
    var retStr;
    if(code != "") {
        var tasksStr = getFlowStr(str.substring(1, str.length - 1));
        for(var i = 0; i < prop.length; i++) {

            var selProp = getFlowPropInArray(prop[i]);
            if(selProp.flowCode == code) {

                retStr = tasksStr[i];
                if(retStr.charAt(0) != '[')
                    retStr = "[" + retStr + "]";
                var propArr;
                eval("propArr = " + retStr);
                return processTasks(propArr, retStr);
            }
        }
    }
    retStr = conditionalFlowDlg(str, Launch_Code_Bypass);
    if(retStr == "")
        return retStr;
    else {
        var tempArray;
        eval("tempArray = " + retStr);
        var selProp = getFlowPropInArray(tempArray);
        Launch_Code = selProp.flowCode;
        return processTasks(tempArray, retStr);
    }
}


function processMultipleTask(prop, str) {
    if(prop.taskFlowType == "2") {
        // 并流
        Launch_ParallelParticipants = "";
        Launch_FlowStr = str;
        SFParallelFlow();
        if(!Launch_Continue) {
            if(Error_Msg != "") {
                BootstrapDialog.alert(Error_Msg);
            }
            return "";
        }
        if(Launch_ParallelParticipants == "") {
            return flowsSelectDlg(str);
        } else {
            return parallelFlowApi(Launch_ParallelParticipants, str);
        }
    } else if(prop.taskFlowType == "3") {
        // 辅流
        Launch_AssistFlows = "";
        Launch_AssistGroups = "";
        Launch_AssistParticipants = "";
        SFQueryAssistFlow();
        if(!Launch_Continue) {
            if(Error_Msg != "")
                BootstrapDialog.alert(Error_Msg);
            return "";
        }
        if(Launch_AssistGroups == "") {
            return flowsSelectDlg(str);
        } else {
            return assistFlowApi(Launch_AssistFlows, Launch_AssistGroups, Launch_AssistParticipants, str);
        }
    } else {
        // error => a
        BootstrapDialog.alert("Task Flow Type Error!");
        return "";
    }
}

function getReturnProp(flowProp) {
    var participants;
    var names;
    var str;
    setPlusGroup = false;
    setHandlerGroup = false;
    Launch_NextGroup = flowProp.groupName;
    if(needGroupSelected(flowProp.groupName)) {
//        flowProp.groupName = getMaskGroup(flowProp.groupName);
        var groupMask;
        Launch_HandleGroup = "";
        SFQueryGroup();
        if(!Launch_Continue) {
            return "";
        }
        if(Launch_HandleGroup != "") {
            groupMask = Launch_HandleGroup;
        } else {
            groupMask = checkGroupMask(sf_project, flowProp.groupName, flowProp.roleName);
        }
        if(groupMask == "")
            return "";
        if(flowProp.groupName.indexOf("+") >= 0) {
            setPlusGroup = true;
            plusGroup = groupMask;
            document.getElementById("sf_setPlusGroup").value = "1";
        } else if(flowProp.groupName.indexOf("*") >= 0 && Launch_GroupSet) {
            setHandlerGroup = true;
            handlerGroup = groupMask;
            document.getElementById("sf_setHandlerGroup").value = "1";
        }
        flowProp.groupName = groupMask;
        Launch_NextGroup = flowProp.groupName;

        participants = getGroupsUsersNames(sf_project, flowProp.groupName, flowProp.roleName);
        if(participants == "")
            return "";
        eval("names = " + participants);
        flowProp.realnames = names[0].realnames;
        flowProp.usernames = names[0].usernames;
    }
    str = "[" + constructFlow(flowProp) + "]";
    switch(flowProp.flowType) {
        case '2':
            if(flowProp.taskFlowType == "3") {
                BootstrapDialog.alert("辅流第一个任务不能是会签, 请通知系统管理员！");
                break;
            } else {
                if(flowProp.taskCtlType == "2") {
                    if(flowProp.taskCycleType == "1") {
                        var level = getCharCount(flowProp.groupName, '.');
                        var searchGroup = "";
                        for(var i = 0; i < level; i++) {
                            if(searchGroup != "")
                                searchGroup += ".";
                            searchGroup += "*";
                        }
                        var namesStr = getGroupsUsersNames(sf_project, searchGroup, flowProp.roleName);
                        if(namesStr == "")
                            return "";
                        var groupNames;
                        eval("groupNames = " + namesStr);
                        Launch_CycleQueryUsers = groupNames[0].usernames;
                    } else {
                        Launch_CycleQueryUsers = flowProp.usernames;
                    }
                    Launch_IsEndCycleView = false;
                    if(flowProp.flowType == "2") {
                        Launch_CycleQueryType = "1";
                    } else {
                        Launch_CycleQueryType = "0";
                    }
                    Launch_CycleType = flowProp.taskCycleType;
//                    Launch_CycleUsers = "";
                    SFQueryCycleReview();
                    if(!Launch_Continue) {
                        if(Error_Msg != "")
                            BootstrapDialog.alert(Error_Msg);
                        return "";
                    }
                    if(!Launch_IsEndCycleView) {
                        if(Launch_CycleUsers != "") {
                            participants = "[{realnames:'" + getRealnames(Launch_CycleUsers) + "',usernames:'"
                                + Launch_CycleUsers + "'}]";
                        } else if(flowProp.taskCycleType == "0" || flowProp.taskCycleType == "") {
                            if(Launch_CycleQueryType == "0")
                                participants = selectCycleUsers(sf_project, flowProp.groupName, flowProp.roleName);
                            else
                                return "";
                        } else {
                            var checkGroup;
                            if(flowProp.groupName.indexOf(".") < 0)
                                checkGroup = "*";
                            else {
                                checkGroup = flowProp.groupName.substring(0, flowProp.groupName.lastIndexOf(".") + 1)
                                    + "*";
                            }
                            var cycleGroups = groupSelected(sf_project, checkGroup, flowProp.roleName, "1");
                            if(cycleGroups == "")
                                return "";
                            participants = getGroupsUsersNames(sf_project, cycleGroups, flowProp.roleName);
                        }
                        if(participants != "") {
                            eval("names = " + participants);
                            flowProp.cycleQty = getCharCount(names[0].usernames, ';');
                            flowProp.cycleUser = names[0].usernames;
                            flowProp.cycleType = flowProp.taskCycleType;
                            var count = names[0].realnames.indexOf(";");
                            if(count > 0)
                                flowProp.realnames = names[0].realnames.substr(0, count);
                            else
                                flowProp.realnames = names[0].realnames;
                            count = names[0].usernames.indexOf(";");
                            var cycUsers;
                            if(count > 0)
                                cycUsers = names[0].usernames.substr(0, count);
                            else
                                cycUsers = names[0].usernames;
                            cycUsers = cycUsers.replaceAll(",", ";");
                            if(count > 0)
                                flowProp.usernames = cycUsers;
                            else
                                flowProp.usernames = cycUsers;
                        }
                        break;
                    }
                }
            }
        // 设定出错, 比如说设了预选会签者?s?]有设会签, 所以当一般处理
        case '1': default:
        if(flowProp.flowProp == "2") {
            // 辅流
            participants = selectParticipantDlg(str, "", "1");
        } else {
            Launch_DistributeUser = "";
            SFQueryDistribute();
            if(!Launch_Continue) {
                if(Error_Msg != "")
                    BootstrapDialog.alert(Error_Msg);
                return "";
            }
            if(Launch_DistributeUser == "") {
                if(flowProp.usernames == "") {
                    var users = getUsers(flowProp.groupName,  flowProp.roleName);
                    var usersArr;
                    eval("usersArr = " + users);
                    participants = selectParticipantDlg("[{taskName:'" + flowProp.taskName + "', groupName:'" +
                        flowProp.groupName + "', roleName:'" + flowProp.roleName + "', realnames:'" + usersArr[0].realnames +
                        "', usernames:'" + usersArr[0].usernames + "', flowProp:'0'}]", "", "0");
                } else if(flowProp.usernames.indexOf(",") >= 0 || flowProp.usernames.indexOf(";") >= 0) {
                    participants = selectParticipantDlg("[{taskName:'" + flowProp.taskName + "', groupName:'" +
                        flowProp.groupName + "', roleName:'" + flowProp.roleName + "', realnames:'" + flowProp.realnames +
                        "', usernames:'" + flowProp.usernames + "', flowProp:'0'}]", "", "0");
//                        participants = selectParticipantDlg(str, "", "0");
                } else {
                    participants = "[{realnames:'" + flowProp.realnames + "', usernames:'"
                        + flowProp.usernames + "'}]";
                }
            } else if(Launch_DistributeUser.indexOf("-") == 0) {
                var users;
                if(flowProp.usernames == "") {
                    users = getUsers(flowProp.groupName,  flowProp.roleName);
                } else {
                    users = flowProp.usernames;
                }
                eval("usersArr = " + users);
                var tempUsernamesArr = usersArr[0].usernames.replaceAll(",",";").split(";");
                var tempRealnamesArr = usersArr[0].realnames.replaceAll(",",";").split(";");
                var tempUsernames = "";
                var tempRealnames = "";
                var tempDisUsersArr = Launch_DistributeUser.substring(1).replaceAll(",",";").split(";");
                for(var j = 0; j < tempUsernamesArr.length; j++) {
                    var found = false;
                    for(var k = 0; k < tempDisUsersArr.length; k++) {
                        if(tempDisUsersArr[k].toUpperCase() == tempUsernames[j].toUpperCase()) {
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        if(tempUsernames == "") {
                            tempUsernames = tempUsernamesArr[j];
                            tempRealnames = tempRealnamesArr[j];
                        } else {
                            tempUsernames += "," + tempUsernamesArr[j];
                            tempRealnames += "," + tempRealnamesArr[j];
                        }
                    }
                }
                if(tempUsernames.indexOf(",") >= 0) {
                    participants = selectParticipantDlg("[{taskName:'" + flowProp.taskName + "', groupName:'" +
                        flowProp.groupName + "', roleName:'" + flowProp.roleName + "', realnames:'" + tempRealnames +
                        "', usernames:'" + tempUsernames + "', flowProp:'0'}]", "", "0");
                } else if(tempUsernames == "") {
                    BootstrapDialog.alert("分发用户为空, 请检查接口程序与用户权限设定!");
                    return "";
                } else {
                    participants = "[{realnames:'" + tempRealnames + "', usernames:'"
                        + tempUsernames + "'}]";
                }
            } else  {

                /*
                 var realName = getRealname(Launch_DistributeUser) + "/" + flowProp.groupName;
                 participants = "[{realnames:'" + realName + "', usernames:'"
                 + Launch_DistributeUser + "'}]";
                 */
                Launch_DistributeUser = Launch_DistributeUser.replaceAll(";", ",");
                var realName = "";
                var userArr = Launch_DistributeUser.split(",");
                if(userArr.length == 1) {
                    realName = getRealname(userArr[0]) + "/" + flowProp.groupName;
                    participants = "[{realnames:'" + realName + "', usernames:'"
                        + Launch_DistributeUser + "'}]";
                } else {
                    for(var ri = 0; ri < userArr.length; ri++) {
                        if(realName == "") {
                            realName = getRealname(userArr[ri]) + "/" + flowProp.groupName;
                        } else {
                            realName += "," + getRealname(userArr[ri]) + "/" + flowProp.groupName;
                        }
                    }
                    participants = selectParticipantDlg("[{taskName:'" + flowProp.taskName + "', groupName:'" +
                        flowProp.groupName + "', roleName:'" + flowProp.roleName + "', realnames:'" + realName +
                        "', usernames:'" + Launch_DistributeUser + "', flowProp:'0'}]", "", "0");
                }
            }
        }
        if(participants != "") {
            eval("names = " + participants);
            flowProp.realnames = names[0].realnames;
            flowProp.usernames = names[0].usernames;
        }
        break;
        case '0':
            break;
        case '3':
            var tempUsers = flowProp.usernames.replaceAll(";", ",");
            var handler = getHandler(sf_handler, flowProp.usernames, ",");
            if(flowProp.groupName == document.getElementById("sf_group").value && flowProp.roleName == document.getElementById("sf_role").value
                && document.getElementById("sf_taskctl").value == "1") {
                flowProp.realnames = document.getElementById("sf_user").value + "/" + flowProp.groupName;
                flowProp.usernames = document.getElementById("sf_loginName").value;
            } else if(handler == "" || handler.indexOf(";") >= 0) {
//                BootstrapDialog.alert("流程设置了直送经办人, 但发现经办人不在所设定的参与者中! 改为选择参与者!");
                if(flowProp.usernames.indexOf(",") >= 0 || flowProp.usernames.indexOf(";") >= 0) {
                    var handlerName = getHandlerName(document.getElementById("sf_caseID").value,
                        flowProp.groupName, flowProp.roleName);
                    var handlerRealnames;
                    if(handlerName == "" || !inList(sf_handler, handlerName, ";")) {
                        var usersStr;
                        if(handler != "") {
                            handlerRealnames = getHandlerRealnames(handler, flowProp, ";");
                            usersStr = "[{taskName:'" + flowProp.taskName + "', groupName:'" + flowProp.groupName +
                                "', roleName:'" + flowProp.roleName + "', ";
                            usersStr += "realnames:'" + handlerRealnames + "', usernames:'" + handler + "', flowProp:'0'}]";
                        } else {
                            usersStr = str;
                        }
                        participants = selectParticipantDlg(usersStr, "", "0");
                        if(participants == "")
                            return "";
                        eval("names = " + participants);
                        //                  handler = names[0].usernames;
                        flowProp.realnames = names[0].realnames;
                        flowProp.usernames = names[0].usernames;
                    } else {
                        handlerRealnames = getHandlerRealnames(handlerName, flowProp, ";");
                        flowProp.realnames = handlerRealnames;
                        flowProp.usernames = handlerName;
                    }
                }
            } else {
//                flowProp.realnames = handler + "/" + flowProp.groupName;
                flowProp.realnames = getRealname(handler) + "/" + flowProp.groupName;
                flowProp.usernames = handler;
            }
            break;
    }
    if(participants == "")
        return "";
    if(document.getElementById("sf_trayType").value == "1") {
        if(flowProp.usernames.indexOf(",")) {
            var nameArr = flowProp.usernames.split(";");
            var realArr = flowProp.realnames.split(";");
            var groupArr = flowProp.groupName.split(";");
            for(var i = 0; i < nameArr.length; i++) {
                if(nameArr[i].indexOf(",") < 0)
                    continue;
                usersStr = "[{taskName:'" + flowProp.taskName + "', taskDesc:'" + flowProp.taskDesc + "', groupName:'" + groupArr[i]
                    + "', roleName:'" + flowProp.roleName + "', realnames:'"
                    + realArr[i] + "', usernames:'" + nameArr[i] + "', flowProp:'0'}]";
                participants = selectParticipantDlg(usersStr, "", "0");
                if(participants == "") {
                    return "";
                }
                eval("names = " + participants);
                flowProp.usernames = flowProp.usernames.replace(nameArr[i], names[0].usernames);
                flowProp.realnames = flowProp.realnames.replace(realArr[i], names[0].realnames);
            }
        }
    }
    if(flowProp.usernames == "") {
        BootstrapDialog.alert("组别:" + flowProp.groupName + ",角色:" + flowProp.roleName + " 没有设置用户, 请通知管理员!" );
        return "";
    }
    return constructFlow(flowProp);
}

function getHandler(handlers, users, sep) {
    var hList = handlers.split(";");
    var retUsers = "";
    for(var i = hList.length - 1; i >= 0; i--) {
        if(inList(users, hList[i], sep)) {

            if(retUsers != "")
                retUsers += ";";
            retUsers += hList[i];
        }
    }
    return retUsers;
}

function getHandlerRealnames(handlers, prop) {
    var retRealnames = "";
    var realnames = prop.realnames.replaceAll(",",";");
    var users = prop.usernames.replaceAll(",",";");
    var hList = handlers.split(";");
    var uList = users.split(";");
    var rList = realnames.split(";");
    for(var i = 0; i < hList.length; i++) {
        for(var j = 0; j < uList.length; j++) {
            if(hList[i] == uList[j]) {
                if(retRealnames != "")
                    retRealnames += ";";
                retRealnames += rList[j];
            }
        }
    }
    return retRealnames;
}

function encodeURL(url){
    url =encodeURI(url);
    url= url.replaceAll("+","%2B");
    return url;
}


function getBasepath(){
    if (contextPath == "") return "/ginkgo-web";
    else  return contextPath;
    //return '/ginkgo-web';
}
