var ArrAction0 = new Array(true, "关闭", "action_cancel.gif", "关闭", "do_Cancel");
var ArrAction1 = new Array(true, "保存", "action_save.gif", "保存", "do_Save");
var ArrAction2 = new Array(true, "提交", "action_sign.gif", "提交", "do_Div_Complete_Start");
var ArrAction3 = new Array(false, "退回", "arrow_pleft.gif", "退回", "do_Back");
var ArrAction4 = new Array(false, "特送", "action_guiview.gif", "特送", "do_SpecialSend");
var ArrAction5 = new Array(true, "查阅流程", "actn023.gif", "查阅流程", "do_ViewFlow");
var ArrAction6 = new Array(false, "阅示设定", "download.gif", "阅示设定", "do_SetReview");
var ArrAction7 = new Array(false, "阅示状态", "year.gif", "阅示状态", "do_ReviewStatus");
var ArrAction8 = new Array(false, "签收", "checkin.gif", "签收", "do_Sign");
var ArrAction9 = new Array(false, "任务信息", "bbsdoc2.gif", "任务信息", "do_ViewComment");
var ArrAction1001 = new Array(true, "转送", "assign.gif", "转送", "do_forward");
var ArrAction10 = new Array(false, "版本比较", "bbsdoc2.gif", "版本比较", "do_CompareDocument");
var ArrAction11 = new Array(false, "生成合同正文", "bbsdoc2.gif", "生成合同正文", "do_CreateContractDoc");
var ArrAction12 = new Array(false, "撤销", "action_cancel.gif", "撤销", "do_CancelApply");
var ArrAction13 = new Array(false, "选择合同", "action_view.gif", "选择合同", "do_SelectContract");
var ArrAction14 = new Array(false, "打印", "print.gif", "打印", "do_Print");
var ArrAction15 = new Array(true, "查阅审批记录", "action_viewstatus.gif", "查阅审批记录", "do_ViewOpinion");
var ArrAction16 = new Array(false, "填写审批意见", "action_sign.gif", "填写审批意见", "inputOpinion");
var ArrAction17 = new Array(false, "完成阅示", "action_sign.gif", "完成阅示", "do_cc_Complete");
var ArrAction18 = new Array(false, "阅示并抄送", "action_sign.gif", "阅示并抄送", "do_cc_Send");
var ArrAction19 = new Array(false, "修订合同正文", "action_view.gif", "修订合同正文", "SW_EditContractDoc");
var ArrAction20 = new Array(false, "帮助", "action_help.gif", "帮助", "do_help");
var ArrAction21 = new Array(false, "删除", "action_cancel.gif", "删除", "do_Delete");
var ArrAction22 = new Array(false, "授权委托书", "bbsdoc2.gif", "授权委托书", "showProxyBook");
var ArrAction1002 = new Array(false, "抄送", "write.gif", "抄送", "do_Copy");
var ArrAction1003 = new Array(false, "提问", "question.gif", "提问", "do_Question");
var ArrAction1004 = new Array(false, "会签设定", "cycle_review.gif", "会签设定", "do_SetCycle");
var ArrAction1005 = new Array(false, "会签状态", "year.gif", "会签状态", "do_CycleStatus");
var ArrAction1006 = new Array(false, "附件管理", "clip.gif", "附件管理", "do_upload");
var ArrAction1007 = new Array(false, "附件查阅", "clip.gif", "附件查阅", "do_upload");

var ArrActions = new Array(ArrAction0, ArrAction1, ArrAction2, ArrAction3, ArrAction4, ArrAction5,
    ArrAction6, ArrAction7, ArrAction8, ArrAction9, ArrAction1001, ArrAction10, ArrAction11, ArrAction12,
    ArrAction13, ArrAction14, ArrAction15, ArrAction16, ArrAction17, ArrAction18, ArrAction19, ArrAction20,
    ArrAction21, ArrAction22, ArrAction1002, ArrAction1003, ArrAction1004, ArrAction1005, ArrAction1006, ArrAction1007);

var ArrSinoViews = new Array();
var ArrSinoTitles = new Array();
var AV_SENDBACK_MASK = 0x01;
var AV_SPECIALSEND_MASK = 0x02;
var AV_COMPLETE_MASK = 0x04;
var AV_SAVE_MASK = 0x08;
var AV_SIGN_MASK = 0x10;

var OP_SENDBACK_MASK = 0x04;
var OP_SPECIALSEND_MASK = 0x02;
var OP_VIEWFLOW_MASK = 0x08;
var OP_SENDTO_MASK = 0x10;
var OP_ASK_MASK = 0x20;
var OP_CONFIRM_MASK = 0x8000;
var OP_FINISH_MASK = 0x4000;
var CarbonCopyOpinion = "已阅";

var buttonMask = 0;
var completeMask = 0;
var isLoaded = false;
var autoSign = true;
var isSave = false;
var reviewNotWait = false;

var sf_act_info = null;
var contextPath = "";


function SFInit(act, appFormId) {

    if (typeof(appFormId) == "undefined") appFormId = "appform";

    sf_act_info = act;
    buttonMask = sf_act_info.buttonMask;
    completeMask = sf_act_info.completeMask;
    contextPath = sf_act_info.contextPath;
    doLoad(appFormId,act.sf_actID);

    $(window).unload(function () {
        doUnLoad();
    });
}


function test() {
    BootstrapDialog.alert(sf_act_info.sfactActId);
}

function iniSFActInfo() {
    var iniStr = "";
    //<input type="hidden" name="sf_token" id="sf_token" value="<%=token%>" readonly="readonly" />
    iniStr += "<input type=\"hidden\" name=\"sf_project\" id=\"sf_project\" value='" + sf_act_info.sfactProjName + "' />";

    iniStr += "<input type=\"hidden\" name=\"sf_procedure\" id=\"sf_procedure\" value='" + sf_act_info.sfactProcName + "' />";
    iniStr += "<input type=\"hidden\" name=\"sf_procedureid\" id=\"sf_procedureid\" value='" + sf_act_info.sfactProcId + "' />";
    iniStr += "<input type=\"hidden\" name=\"sf_taskid\"  id=\"sf_taskid\" value='" + sf_act_info.sfactTaskId + "' />";
    iniStr += "<input type=\"hidden\" name=\"sf_taskname\" id=\"sf_taskname\" value='" + sf_act_info.sfactTaskName + "' />";
    iniStr += "<input type=\"hidden\" name=\"sf_taskctl\" id=\"sf_taskctl\" value='" + sf_act_info.sfactTaskCtl + "' />";

    var flowDesc = "";
    var flowGroup = "";

    if (sf_act_info.sfactCommentQty == "0" || sf_act_info.sfactCommentQty == "" || (parseInt(sf_act_info.sfactCommentType()) & 0x20 == 0)) {
        flowDesc = sf_act_info.sfactApplMsg;
    } else {
        flowDesc = sf_act_info.sfactCommentApplMsg;
    }
    if (sf_act_info.sfactCaseId.indexOf(":") >= 0) {
        flowGroup = "";//flowGroup =user.groupName
    } else {
        flowGroup = getMaskGroup(sf_act_info.sfactTaskGroup, sf_act_info.sfactHandlerGroup, sf_act_info.sfactPlusGroup);
        //BootstrapDialog.alert("sf_act_info.sfactTaskGroup="+sf_act_info.sfactTaskGroup);
        //BootstrapDialog.alert("flowGroup=" + flowGroup);

    }

    iniStr += "<input type=\"hidden\" name=\"sf_flowDesc\" id=\"sf_flowDesc\" value='" + flowDesc + "' />";
    iniStr += "<input type=\"hidden\" name=\"sf_group\" id=\"sf_group\" value='" + flowGroup + "' />";

    iniStr += "<input type=\"hidden\" name=\"sf_setHandlerGroup\"  id=\"sf_setHandlerGroup\" value=\"0\" />";
    iniStr += "<input type=\"hidden\" name=\"sf_handlerGroup\"      id=\"sf_handlerGroup\" value='" + sf_act_info.sfactHandlerGroup + "'  />";
    iniStr += "<input type=\"hidden\" name=\"sf_setPlusGroup\"      id=\"sf_setPlusGroup\" value=\"0\" />";
    iniStr += "<input type=\"hidden\" name=\"sf_plusGroup\"         id=\"sf_plusGroup\" value='" + sf_act_info.sfactPlusGroup + "'/>";
    iniStr += "<input type=\"hidden\" name=\"sf_handler\"           id=\"sf_handler\" value='" + sf_act_info.sfactHandler + "' />";
    iniStr += "<input type=\"hidden\" name=\"sf_role\"              id=\"sf_role\" value='" + sf_act_info.sfactTaskRole + "'  />";
    iniStr += "<input type=\"hidden\" name=\"sf_actID\"        id=\"sf_actID\" value='" + sf_act_info.sfactActId + "'  />";
    iniStr += "<input type=\"hidden\" name=\"sf_caseID\" id=\"sf_caseID\" value='" + sf_act_info.sfactCaseId + "'  />";
    iniStr += "<input type=\"hidden\" name=\"sf_appDataID\"  id=\"sf_appDataID\" value='" + sf_act_info.sfactApplId + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_appID\" id=\"sf_appID\" value='" + sf_act_info.sfactAppdefId + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_comment\" id=\"sf_comment\" value='" + sf_act_info.sfactUserMsg + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_priority\" id=\"sf_priority\" value=\"0\"   />";
    iniStr += "<input type=\"hidden\" name=\"sf_reviewQty\" id=\"sf_reviewQty\" value='" + sf_act_info.sfactCommentQty + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_reviewUsers\" id=\"sf_reviewUsers\" value='" + sf_act_info.sfactCommentUsers + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_reviewType\" id=\"sf_reviewType\" value='" + sf_act_info.sfactCommentType + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_cycleQty\"  id=\"sf_cycleQty\" value='" + sf_act_info.sfactCycleQty + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_cycleUsers\" id=\"sf_cycleUsers\" value='" + sf_act_info.sfactCycleUsers + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_cycleType\" id=\"sf_cycleType\" value='" + sf_act_info.sfactCycleType + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_task_attribute1\" id=\"sf_task_attribute1\" value='" + sf_act_info.sfactTaskAttribute1 + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_task_attribute2\" id=\"sf_task_attribute2\" value='" + sf_act_info.sfactTaskAttribute2 + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_task_attribute3\" id=\"sf_task_attribute3\" value='" + sf_act_info.sfactTaskAttribute3 + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_task_attribute4\" id=\"sf_task_attribute4\" value='" + sf_act_info.sfactTaskAttribute4 + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_task_attribute5\" id=\"sf_task_attribute5\" value='" + sf_act_info.sfactTaskAttribute5 + "'   />";

    var handler = "[{sf_handler:'" + sf_act_info.sfactHandler +
        "', sf_handlerGroup:'" + sf_act_info.sfactHandlerGroup + "', sf_plusGroup:'"
        + sf_act_info.sfactPlusGroup + "'}]";

    if (sf_act_info.newCaseFlag == "Y")
        isNew = "1";
    else
        isNew = "0";

    //如果狀态为提问, 就要把 sf_event 设定为答复, 使得完成时可以送回提问人
    if (sf_act_info.sfactActStatus == "5")
        sf_event = "5";
    else
        sf_event = "";

    var taskStr = "";
    if (sf_act_info.sfactTaskCtl == "2" || sf_act_info.sfactTaskCtl == "3") {
        taskStr = "[{taskID:'" + sf_act_info.sfactTaskId + "', ";
        taskStr += "procName:'" + sf_act_info.sfactProcName + "', ";
        taskStr += "taskName:'" + sf_act_info.sfactTaskName + "', ";
        taskStr += "taskDesc:'" + sf_act_info.sfactTaskDesc + "', ";
        taskStr += "groupName:'" + sf_act_info.sfactTaskGroup + "', ";
        taskStr += "roleName:'" + sf_act_info.sfactTaskRole + "', ";
        taskStr += "taskDur:'" + sf_act_info.sfactTaskDuration + "', ";
        taskStr += "taskWorktype:'" + sf_act_info.sfactTaskWorkType + "', ";
        taskStr += "taskCtlType:'" + sf_act_info.sfactTaskCtl + "', ";
        taskStr += "taskCycleType:'" + sf_act_info.sfactTaskCycleType + "', ";
        taskStr += "taskApi:'" + sf_act_info.sfactTaskApiName + "', ";
        taskStr += "taskDivRight:'" + sf_act_info.sfactTaskDivRight + "', ";
        taskStr += "taskDivHidden:'" + sf_act_info.sfactTaskHidden + "', ";
        taskStr += "taskFlowType:'" + sf_act_info.sfactTaskType + "', ";

        users = sf_act_info.sfactCycleUsers;

        count = users.indexOf(";");
        if (count > 0)
            taskStr += "usernames:'" + users.substring(0, count) + "', ";
        else
            taskStr += "usernames:'" + users + "', ";
        taskStr += "flowProp:'0', ";
        taskStr += "flowID:'', ";
        taskStr += "flowCode:'', ";
        taskStr += "flowDesc:'" + sf_act_info.sfactApplMsg + "', ";
        taskStr += "flowHint:'" + sf_act_info.sfactApplMsg + "', ";
        taskStr += "flowType:'0', ";
        taskStr += "cycleQty:'" + sf_act_info.sfactCycleQty + "', ";
        taskStr += "cycleUser:'" + sf_act_info.sfactCycleUsers + "', ";
        taskStr += "cycleType:'" + sf_act_info.sfactTaskCycleType + "', ";
        taskStr += "reviewQty:'" + sf_act_info.sfactCommentQty + "', ";
        taskStr += "reviewUsers:'" + sf_act_info.sfactCommentUsers + "', ";
        taskStr += "reviewType:'" + sf_act_info.sfactCommentType + "'}]";

    }

    //  BootstrapDialog.alert("handler="+handler);
    //<input type='hidden' name='sinoflow_load_data' id='sinoflow_load_data' value='<%=outStr%>'   />
    iniStr += "<input type='hidden' name='sf_handlerStatus' id='sf_handlerStatus' value = \"" + handler + "\"   />";
    iniStr += "<input type='hidden' name='sf_nextTaskData'  id='sf_nextTaskData' value = \"" + taskStr + "\"    />";
    iniStr += "<input type='hidden' name='sf_end'  id='sf_end' value = '0'   />";
    iniStr += "<input type='hidden' name='sf_trayType' id='sf_trayType' value='" + sf_act_info.trayType + "'/>";
    iniStr += "<input type='hidden' name='sf_userID'  id='sf_userID'     value='" + sf_act_info.sessionUserId + "'/>";
    iniStr += "<input type='hidden' name='sf_user'  id='sf_user'     value='" + sf_act_info.sessionUserRealName + "'/>";
    iniStr += "<input type='hidden' name='sf_appField' id='sf_appField' value='" + sf_act_info.sfAppField + "'/>";
    iniStr += "<input type='hidden' name='sf_appFieldValue'  id='sf_appFieldValue' value=''   />";
    iniStr += "<input type='hidden' name='sf_appMask' id='sf_appMask' value='" + sf_act_info.buttonMask + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn1' id='sf_appColumn1' value='" + sf_act_info.sfactApplColumn1 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn2' id='sf_appColumn2' value='" + sf_act_info.sfactApplColumn2 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn3' id='sf_appColumn3' value='" + sf_act_info.sfactApplColumn3 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn4' id='sf_appColumn4' value='" + sf_act_info.sfactApplColumn4 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn5' id='sf_appColumn5' value='" + sf_act_info.sfactApplColumn5 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn6' id='sf_appColumn6' value='" + sf_act_info.sfactApplColumn6 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn7' id='sf_appColumn7' value='" + sf_act_info.sfactApplColumn7 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn8' id='sf_appColumn8' value='" + sf_act_info.sfactApplColumn8 + "'   />";
    iniStr += "<input type='hidden' name='sf_appColumn9' id='sf_appColumn9' value='" + sf_act_info.sfactApplColumn9 + "'   />";
    iniStr += "<input type='hidden' name='sf_fillApiData' id='sf_fillApiData' value='" + sf_act_info.sfApiFillValue + "'   />";
    //iniStr += "<input type='hidden' name='sf_object' id='sf_object' value='<%=fstr%>'   />

    iniStr += "<input type='hidden' name='myOpinion' id='myOpinion' value=''   />";
    iniStr += "<input type='hidden' name='sf_opinion' id='sf_opinion' value=''   />";
    iniStr += "<input type='hidden' name='sf_copyFlag' id='sf_copyFlag' value='" + sf_act_info.copyFlag + "'   />";
    iniStr += "<input type='hidden' name='sf_copyUsers' id='sf_copyUsers' value=''   />";
    iniStr += "<input type='hidden' name='sf_copyMsg' id='sf_copyMsg' value=''   />";
    iniStr += "<input type='hidden' name='sf_isNew' id='sf_isNew' value='" + isNew + "'   />";
    iniStr += "<input type='hidden' name='sf_nextTaskUsers' id='sf_nextTaskUsers' value=''   />";
    iniStr += "<input type='hidden' name='sf_event'  id='sf_event' value='" + sf_event + "'   />";
    iniStr += "<input type='hidden' name='sf_eventUser' id='sf_eventUser' value=''   />";
    iniStr += "<input type='hidden' name='sf_fromDate' id='sf_fromDate' value='" + sf_act_info.sfactFromDate + "'   />";

    iniStr += "<input type='hidden' name='sf_url' id='sf_url' value='" + sf_act_info.sfactTaskUrl + "'   />";

    iniStr += "<input type='hidden' name='sf_creator' id='sf_creator' value='" + sf_act_info.sfactComposeUser + "'   />";

    iniStr += "<input type=\"hidden\" name=\"sf_divRight\" id='sf_divRight'  value='" + sf_act_info.sfactTaskDivRight + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_divHidden\" id='sf_divHidden'  value='" + sf_act_info.sfactTaskHidden + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_divCommentDiv\" id='sf_divCommentDiv'  value='" + sf_act_info.sfactTaskCommentDiv + "'   />";
    iniStr += "<input type=\"hidden\" name=\"sf_divCommentHide\" id='sf_divCommentHide' value='" + sf_act_info.sfactTaskCommentHide + "'   />";

    iniStr += "<input type='hidden' name='sf_store1'  id='sf_store1' value='' />";
    iniStr += "<input type='hidden' name='sf_store2'   id='sf_store2' value=''   />";
    iniStr += "<input type='hidden' name='sf_store3'   id='sf_store3' value=''   />";
    iniStr += "<input type='hidden' name='sf_store4'  id='sf_store4' value=''   />";
    iniStr += "<input type='hidden' name='sf_store5' id='sf_store5' value=''   />";

    return iniStr;

}
function doLoad(appFormId, sf_actID) {

    strHtml = iniSFActInfo();
    var formId = "#" + appFormId;

    $(formId).append(strHtml);

    //$("form").append(strHtml);
    if (sf_act_info.newCaseFlag != "Y" && autoSign) {
        //autoSign = true;
        do_Sign(sf_actID);
    }
    if (document.getElementById("sf_copyFlag").value == "1") {
        ShowSinoButton(24);
    }
    //if(document.getElementById("sf_caseID").value.indexOf(":") >= 0  && document.getElementById("sf_copyFlag").value == "1") {

    if (sf_act_info.queryOnlyFlag == "Y") {
        var nCount = ArrActions.length;
        for (var j = 1; j < nCount; j++) {
            HideSinoButton(j);
        }
    }

    if (sf_act_info.copyOpenFlag == "Y") {
        var nCount = ArrActions.length;
        for (var j = 1; j < nCount; j++) {
            HideSinoButton(j);
        }
        ShowSinoButton(24);
    }

    init_groups();

    if (sf_act_info.newCaseFlag == "Y") {
        do_SelectGroup();
    }

    fillData(document.getElementById("sf_fillApiData").value);

    do_appInit();

    SFQueryOpen();

    if (!Launch_Continue) {
        BootstrapDialog.alert(Error_Msg);
        doUnLoad();
        return;
    }
    /*
     var tst;
     tst = document.getElementById("sinoflow_load_data").value;
     if(tst != null && tst != "")
     fillData(tst);
     */
    SFPostOpen();
    //  BootstrapDialog.alert("document.sf_handlerStatus="+document.getElementById("sf_handlerStatus").value)

    isLoaded = true;
}

function do_Back() {
    if (!isLoaded) {
        BootstrapDialog.alert("页面数据没有完全载入, 暫时不能退回");
        return;
    }
    autoValue(AV_SENDBACK_MASK);
    if (!do_Validate_app()) {
        return;
    }

    //SFQueryComplete();
    SFQueryGoBack();
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }

    var str = getBackTask(document.getElementById("sf_actID").value);
    var priority = "0";
    var comment = "";

    if (str.indexOf("SPLIT") >= 0) {


        BootstrapDialog.alert("此案件已并发到不同的用户中, 不能退回!");
        return;
    } else if (str == "Start!") {
        BootstrapDialog.alert("第一个任务不能退回");
        return;
    } else if (str != "") {

        SFQuerySave();
        if (!Launch_Continue) {
            if (Error_Msg != "")
                BootstrapDialog.alert(Error_Msg);
            return;
        }

        saveOpinion_app();
        clearDivRight();
        document.getElementById("sf_event").value = "2"; // 退回
        saveInfo();
//        document.getElementById("sf_opinion").value = document.getElementById("sf_comment").value = comment;
//        document.getElementById("sf_priority").value = priority;
        isSave = true;
        //document.forms[0].action = getBasepath() + "/servlet/com.sino.sinoflow.servlet.CaseBack?send='0'";
        //document.forms[0].action = getBasepath() + "/flow/workbench/CaseBack?send='0'";

        if (document.forms("appform"))
            document.appform.submit();
        else
            document.forms[0].submit();

    }
}

function do_forward() {

    if (!isLoaded) {
        BootstrapDialog.alert("页面数据没有完全载入, 暫时不能转送");
        return;
    }

    if (!do_Validate_app()) {
        return;
    }

    var taskUsers = getGroupsUsersNames(document.getElementById("sf_project").value,
        document.getElementById("sf_group").value, document.getElementById("sf_role").value);
    var task;

    eval("task = " + taskUsers);
    var userArr = task[0].usernames.split(",");
    var realArr = task[0].realnames.split(",");
    var realnames = "";
    var usernames = "";

    if (realArr.length == 1) {
        BootstrapDialog.alert("没有其他用户可转送!");
        return;
    }

    for (var i = 0; i < realArr.length; i++) {
        var realname = realArr[i].split("/");

        if (realname[0] != document.getElementById("sf_user").value) {
            if (realnames != "")
                realnames += ",";
            realnames += realArr[i];
            if (usernames != "")
                usernames += ",";
            usernames += userArr[i];
        }

    }

    taskUsers = "[{taskName:'" + document.getElementById("sf_taskname").value +
        "', groupName:'" + document.getElementById("sf_group").value + "', roleName:'" +
        document.getElementById("sf_role").value + "', realnames:'" + realnames + "', usernames:'" +
        usernames + "', flowProp:'0'}]";
    taskUsers = selectParticipantDlg(taskUsers, "", "0");

    if (taskUsers == "")
        return "";
    isSave = true;
    eval("task = " + taskUsers);
    document.getElementById("sf_nextTaskUsers").value = usernames;
    document.getElementById("sf_eventUser").value = task[0].usernames;
    //BootstrapDialog.alert("taskUsers="+taskUsers)                S
    //BootstrapDialog.alert("task="+task[0].usernames)
    //return;
    document.getElementById("sf_event").value = "3"; //转送
    saveInfo();
//        document.getElementById("sf_opinion").value = document.getElementById("sf_comment").value = comment;
//        document.getElementById("sf_priority").value = priority;
    isSave = true;

    //document.forms[0].submit();
    if (document.appform)
        document.appform.submit();
    else
        document.forms[0].submit();

    //document.forms[0].action = getBasepath() + "/servlet/com.sino.sinoflow.servlet.CaseForward?toUser='"
    //    + task[0].usernames + "'";
    //document.forms[0].submit();
}

function do_ViewOpinion() {
    var url;

    url = getBasepath() + "/flow/ui/viewProcessLog?sf_caseID=" +
        document.getElementById("sf_caseID").value + "&appName=" //+ document.getElementById("sf_appName").value
        + "&appDataId=" + document.getElementById("sf_appDataID").value;
    var popscript;

    popscript = "dialogWidth:800px"
        + ";dialogHeight:500px"
        + ";center:yes;status:no;scrollbars:no;help:no";
    return window.showModalDialog(url, null, popscript);
}
function do_appInit() {

}
function doUnLoad() {
    /*
     if(!isSave) {

     isSave = true;
     document.forms[0].action = "/servlet/com.sino.sinoflow.servlet.CaseCancel?sf_actID="+
     document.getElementById("sf_actID").value;
     document.forms[0].submit();
     }
     */

//    opener.location.reload(true);
    return;
    if (opener) {

        if (typeof opener.doReload != "undefined") {
            opener.doReload();
        } else {
            if (typeof opener.parent.frames("main").doReload != "undefined")
                opener.parent.frames("main").doReload();
            else
                opener.location.reload(true);
        }
    } else {
        if ((buttonMask & SIGN_MASK) == SIGN_MASK) {
            //  window.location =  getBasepath() +  "/flow/workbench/pendingTray";
        } else {
            //  window.location =  getBasepath() + "/flow/workbench/inTray";
        }
    }
}

function do_Copy() {
    var project = sf_project;
    var group = getMaskGroup(document.getElementById("sf_group").value,
        document.getElementById("sf_handlerGroup").value,
        document.getElementById("sf_plusGroup").value);
    var role = document.getElementById("sf_role").value;
    copyUsers = copySelectDlg(project, group, role);
    if (copyUsers != "") {
        eval("copyArr = " + copyUsers);
        document.getElementById("sf_copyUsers").value = copyArr.copyUsers;
        document.getElementById("sf_copyMsg").value = copyArr.copyMsg;
        // BootstrapDialog.alert("copy users=" + document.getElementById("sf_copyUsers").value);
        // BootstrapDialog.alert("sf_copyMsg=" + document.getElementById("sf_copyMsg").value);
    }
}

function do_Cancel() {
    if (window.opener) {
        //  BootstrapDialog.alert("has opener")
        sinoFlowClose();
    } else {
        //  BootstrapDialog.alert("no opener")
        // if ((buttonMask & SIGN_MASK) == SIGN_MASK) {
        //     window.location = getBasepath() + "/flow/workbench/pendingTray";
        // } else {
        //     window.location = getBasepath() + "/flow/workbench/inTray";
        // }
        window.location = getBasepath() + "/myWorkBench/default";
    }
}

function do_ViewFlow() {
    var url;

    url = getBasepath() + "/flow/ui/viewFlow?actId=" +
        document.getElementById("sf_actID").value + "&project=" + sf_project +
        "&proc=" + document.getElementById("sf_procedure").value + "&task=" +
        document.getElementById("sf_taskname").value + "&procId=" +
        document.getElementById("sf_procedureid").value;
//    var popscript;
//    popscript = "dialogWidth:1000px"
//            + ";dialogHeight:px"
//            + ";center:yes;status:no;scrollbars:no;help:no";

    h = window.screen.height;
    w = window.screen.width;
//    f1 = "top=0,left=0,width=" + w + ",height=" + h + ",scrollbars=yes,scroll=yes,resizable=yes";

    var f1 = "dialogWidth:" + w
        + ";dialogHeight:" + h
        + ";center:yes;status:no;scrollbars:no;help:no";
    url = encodeURI(url);
    return window.showModalDialog(url, null, f1);

}

function do_Save() {
    do_SaveReload();
}

function do_SaveReload() {
    if (!isLoaded) {
        BootstrapDialog.alert("页面数据没有完全载入, 暫时不能保存");
        return;
    }
    if (document.getElementById("sf_caseID").value.indexOf(":") > 0) {
        isSave = true;
        do_Cancel();
        return;
    }
    autoValue(AV_SAVE_MASK);
    if (!do_Validate_Save())
        return;
    SFQuerySave();
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }
    saveOpinion_app();
    clearDivRight();
    saveInfo();
    isSave = true;
    if (!processReviewUsers)
        refreshOpener = false;
    setFrmEnable(document.forms);

    do_Save_app();
}

function do_SpecialSend() {
    if (!isLoaded) {
        BootstrapDialog.alert("页面数据没有完全载入, 暫时不能特送");
        return;
    }
    if (!do_Validate_app()) {
        return;
    }
    SFQueryComplete();
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }

    autoValue(AV_SENDBACK_MASK);
    var sendTask = checkSpecialSend();
    if (sendTask && sendTask != "") {
        var str = toTask(sendTask);
        if (str != "") {
            autoValue(AV_COMPLETE_MASK);
            SFQuerySave();
            if (!Launch_Continue) {
                if (Error_Msg != "")
                    BootstrapDialog.alert(Error_Msg);
                return;
            }
            /*
             inputOpinion();
             if(document.getElementById("sf_opinion").value == "undefined") {
             document.getElementById("sf_opinion").value = "";
             return;
             }
             */
            document.getElementById("sf_nextTaskData").value = str;
            if (finishMessage() == "") {
                restoreNextTaskData();
                return;
            }
//            setNextFlowDesc();
            setNextTaskUsers();
            SFPostSave();
            if (!Launch_Continue) {
                if (Error_Msg != "")
                    BootstrapDialog.alert(Error_Msg);
                return;
            }
            saveOpinion_app();
            clearDivRight();
            saveInfo();
            isSave = true;
            do_SpecialSend_app();
        }
    }
}

function do_SpecialSend_app() {
    //document.forms[0].action = getBasepath() + "/servlet/com.sino.sinoflow.servlet.CaseComplete?send='1'";
    document.forms[0].submit();
}

function do_SaveReload_app() {
    //  document.forms[0].action = getBasepath() + "/servlet/com.sino.sinoflow.servlet.CaseSaveReload";
    document.forms[0].submit();
}

//恢复disabled状态的域为可操作
function setFrmEnable(frm) {
    for (var j = 0; j < frm.length; j++) {
        var frmObj = document.forms[j];
        if (frmObj) {
            for (var i = 0; i < frmObj.length; i++) {
                frmObj.elements[i].disabled = false;
            }
        }
    }
}

function do_Sign(sf_actID) {

    if (!isLoaded && !autoSign) {
        BootstrapDialog.alert("页面数据没有完全载入, 暫时不能签收");
        return;
    }

    SFQuerySign();

    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }

    if (signAct().indexOf("Success") >= 0) {
        autoValue(AV_SIGN_MASK);
//        BootstrapDialog.alert("签收成功，用户接收此案件！")
        ShowSinoButton(1);
        ShowSinoButton(2);
        var type = document.getElementById("sf_reviewType").value;
        if ((completeMask & OP_SENDBACK_MASK) == OP_SENDBACK_MASK && (type == "0" || type == "")) {
            ShowSinoButton(3);
        }
        if ((completeMask & OP_SPECIALSEND_MASK) == OP_SPECIALSEND_MASK && (type == "0" || type == "")) {
            ShowSinoButton(4);
        }

        HideSinoButton(8);
    } else {
        BootstrapDialog.alert("签收失败,此案件可能已被其他用户签收");
        sinoFlowClose();
        return;
    }

    SFPostSign();

    if (Error_Msg != "") {
        BootstrapDialog.alert(Error_Msg);
    }
}

function do_Validate_app() {
    return true;
}

function do_Validate_Save() {
    return true;
}


function do_Div_Complete_Start() {

    if (!isLoaded) {
        BootstrapDialog.alert("页面数据没有完全载入, 暂时不能完成");
        return;
    }

    var copyUsers = "";
    if (document.getElementById("sf_caseID").value.indexOf(":") > 0) {
        isSave = true;
        document.forms[0].action = getBasepath() + "/servlet/com.sino.sinoflow.servlet.CaseComplete?send='0'";
        document.forms[0].submit();
        return;
    }

    if (!do_Validate_app()) {
        return;
    }

    SFQueryComplete();
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }
    getNextTask2();
}

function do_Div_Complete_End(str) {

    autoValue(AV_COMPLETE_MASK);
    SFQuerySave();
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }

    //document.getElementById("myOpinion").value =extFlowObject.getCommentValue();
    document.getElementById("sf_nextTaskData").value = str;
    if (finishMessage() == "") {
        restoreNextTaskData();
        return;
    }

    setNextFlowDesc();
    SFPostSave();
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }

    saveOpinion_app();

    clearDivRight();

//    saveNextTaskUsers();
    saveInfo();

    isSave = true;
    if (setReviewStatus && Launch_ReviewUsers != "")
        setReviewUsers(document.getElementById("sf_actID").value, (new Number(reviewArray[0].type) + new Number(reviewArray[0].waitType) * 2),
            getCharCount(Launch_ReviewUsers, ';'), Launch_ReviewUsers);

    // return;

    if (!setReviewStatus || reviewNotWait) {
        do_Complete_app();
    } else {
        do_Save_app();
    }
}

function do_Complete_app() { //此函数可在应用中重载
    if (document.forms["appform"]) {
        document.forms["appform"].submit();
    } else {
        document.forms[0].submit();
    }
}

function do_Save_app() {
    // document.forms[0].action =  getBasepath() + "/servlet/com.sino.sinoflow.servlet.CaseSave";
    //document.forms[0].submit();
}

function finishMessage() {
    if (document.getElementById("sf_reviewQty").value == "1" &&
        document.getElementById("sf_reviewUsers").value == document.getElementById("sf_login").value)
        return "ok";
    var priority = "0";
    var comment = "";
    if ((completeMask & OP_FINISH_MASK) == OP_FINISH_MASK) {
        var priorityStr = getPriorityDlg();
        if (priorityStr == "")
            return "";
        var priorityStruct;
        eval("priorityStruct = " + priorityStr);
        priority = priorityStruct.priority;
        comment = priorityStruct.message;
    }
    if ((completeMask & OP_CONFIRM_MASK) == OP_CONFIRM_MASK) {
        if (isFlowEnd()) {
            document.getElementById("sf_end").value = "1";
//            if(deliveryStatusEndDlg() == "")
//                return "";
        } else {
            if (!setReviewStatus) {
                var taskStr = document.getElementById("sf_nextTaskData").value;
                var prop;
                eval("prop = " + taskStr);
                var taskName = getTaskName(prop);
                if (taskName != "") {
                    if (deliveryStatusDlg() == "")
                        return "";
                }
            }
        }
    }
    if (isFlowEnd())
        document.getElementById("sf_end").value = "1";

    document.getElementById("sf_comment").value = comment;
    document.getElementById("sf_priority").value = priority;
    return "ok";
}

function isFlowEnd() {
    var prop;
    var tempStr = document.getElementById("sf_nextTaskData").value;
    while (tempStr.charAt(0) == '[' && tempStr.charAt(tempStr.length - 1) == ']')
        tempStr = tempStr.substring(1, tempStr.length - 1);
    tempStr = "[" + tempStr + "]";
    eval("prop = " + tempStr);
    if (!prop.length) {
        if (prop.taskName == "STOP")
            return true;
        else
            return false;
    } else if (prop.length == 1) {
        if (prop[0].taskName == "STOP")
            return true;
        else {
            var tempStr = getTaskName(prop[0]);
            if (tempStr.indexOf(";") < 0) {
                return false;
            } else {
                var tempArr = tempStr.split(";");
                for (var j = 0; j < tempArr.length; j++) {
                    if (tempArr[j] != "STOP")
                        return false;
                }
                return true;
            }
        }
    } else {
        if (prop[prop.length - 1].taskName == 'STOP') {
            return true;
        } else {
            return false;
        }
    }
    /*
     var taskName;
     for(var i = 0; i < prop.length; i++) {
     taskName = getTaskName(prop[i]);
     if(taskName != "STOP")
     return false;
     }
     return true;
     */
}

function saveOpinion_app() {
    var flowDesc = getJsonData(document.getElementById("sf_nextTaskData").value, "flowDesc:");
    if (flowDesc.indexOf("不同意") >= 0) {
        document.getElementById("sf_opinion").value = "[不同意]" + document.getElementById("myOpinion").value;
    } else if (flowDesc.indexOf("有条件同意") >= 0) {
        document.getElementById("sf_opinion").value = "[有条件同意]" + document.getElementById("myOpinion").value;
    } else if (flowDesc.indexOf("同意") >= 0) {
        document.getElementById("sf_opinion").value = "[同意]" + document.getElementById("myOpinion").value;
    } else {
        document.getElementById("sf_opinion").value = document.getElementById("myOpinion").value;
    }
}
