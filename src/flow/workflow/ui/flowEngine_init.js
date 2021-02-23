
var autoSign = true;

function do_SelectGroup(){

    var htmlModelDiv = '<div class="modal fade sino-box" id="sf_selectGroupModal" role="dialog" aria-hidden="true" >'
        + '<div class="modal-dialog sino-modal-md">'
        + '<div class="modal-content">'
        +'<div class="modal-header">'
        +' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        +'<span aria-hidden="true">&times;</span>'
        +'</button>'
        +'<h3 class="modal-title" id="myModalLabel"><i class="fa fa-window-maximize"></i> 部门选择</h3>'
        +'</div>'
        +'<div class="modal-body sino-box-modal">'
        /*+ '<div class="box-title pl"><h2 class="icon bold blue">选择组别</h2><a href="#" id="sf_selectGroup_exitBtn" class="icon close"></a></div>'*/
        + '<div class="box-main">'
        + '<div id="sf_selectGroupDiv" style="font-size: 14px;" class="sino-form">'
        + '</div>'
        + '<div class="text-center mt-10">'
        + '  <button type="button" id="sf_selectGroup_confirmBtn" class="btn btn-warning"><i class="fa fa-floppy-o"></i>确 定</button>'
        + '  <button type="button" id="sf_selectGroup_backBtn" class="btn btn-default"><i class="fa fa-undo"></i>返 回</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    var group = $("#sf_group").val();

    if($("#sf_caseID").val() !== "" && group.indexOf("*") < 0) {
        return;
    }

    if(isMask(group)) {
        $.ajax({
            type : "post",
            url : "app/api-flow/ui/getUserGroupList",
            data :  {projectName: $("#sf_project").val(),groupName: group,roleName: $("#sf_role").val()},
            async : false,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success : function(data) {
                var groupList = data.data;
                $("#sf_selectGroupModal").remove();
                if($("#sf_selectGroupModal").length === 0){
                    $(htmlModelDiv).appendTo('body');
                }
                for(var i =0 ;i<groupList.length;i++){
                    var addDt = '<ul><li style="height:30px line-height:30px"><label><input style="margin-bottom: 5px;" type="radio" name="groupRadio" class="vam" value="'+groupList[i].groupName+'"/> ' +
                        groupList[i].groupName+'</label></li></ul>';
                    $(addDt).appendTo($("#sf_selectGroupDiv"));
                }
                $("#sf_selectGroupModal").modal({backdrop: 'static'});
                var retGroup="";
                $("#sf_selectGroup_confirmBtn").bind("click", function () {
                    retGroup = $("#sf_selectGroupDiv ul li input[name=groupRadio]:checked").val();
                    if(!retGroup){
                        BootstrapDialog.alert("请选择部门");
                    }else{
                        if(isMask($("#sf_group").val()) ) { //&& Launch_GroupSet
                            $("#sf_setHandlerGroup").val("1");
                            $("#sf_handlerGroup").val(retGroup);
                            $("#sf_handlerStatus").val("[{sf_handler:'" + $("#sf_handler").val() +
                                "', sf_handlerGroup:'" + retGroup + "', sf_plusGroup:'" +
                                $("#sf_plusGroup").val() + "'}]");
                            setHandlerGroup = true;
                            handlerGroup = retGroup;
                        }
                        sf_group = retGroup;
                        $("#sf_group").val(retGroup);
                        $("#sf_selectGroupModal").modal('hide');
                    }
                });
                $("#sf_selectGroup_backBtn,#sf_selectGroup_exitBtn").bind("click", function () {
                    var r = confirm("还未选择部门，不选择部门将自动取消任务，所有更改将会作废；确认是否离开？");
                    if(r){
                        isSave = true;
                        do_CancelSelectGroup();
                        $("#sf_selectGroupModal").modal('hide');
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("读取部门异常！" + textStatus + XMLHttpRequest.status);
                hideSinoWaiting();
            }
        });
    }
}

function do_CancelSelectGroup() {
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

var loadOpinionFlag = {};
var footerActObj = {};
function do_SFInit(appFormId, flowAppName, actId, defaultSubmitUrl) {

    loadOpinionFlag.actId=actId;//用于审批意见

    var processedFlag=getParam("processedFlag");
    if (processedFlag=='Y'){//已办
        return;
    }
    if (defaultSubmitUrl) {
        footerActObj.defaultSubmitUrl = defaultSubmitUrl;
    } else {
        footerActObj.defaultSubmitUrl = $("#" + appFormId).attr("action");
    }

    if (actId == null || actId == "") {  //启动新流程
        loadOpinionFlag = {flag: "N"};
        do_SFNewCase(appFormId, flowAppName);
    } else {
        do_SFOpenCase(appFormId, actId);
    }
}

function SFInit(appFormId, act) {

    if (typeof(appFormId) == "undefined") appFormId = "appform";

    sf_act_info = act;

    buttonMask = sf_act_info.buttonMask;
    completeMask = sf_act_info.completeMask;
    contextPath = sf_act_info.contextPath;

    doLoad(appFormId,act.sfactActId);

    // 加载下方悬浮审批窗口
    //initFlowFooter(appFormId);
    //为什么要注释掉上行代码，这样会签就没有选择同意不同意按钮就没了，所以我加了下面这一行，影响到你请告诉我 宋云涛
    //initSplitFlow();
/*
    $(window).unload(function () {
        doUnLoad();
    });
    */
}

// 设置会签内同意、不同意按钮
function initSplitFlow() {

    if (sf_act_info.sfactTaskCtl != "2") {
        // 仅在流程编辑器内任务控制设置为“会签”的才加载
        return;
    }

    $(".flow-split-opinion").each(function () {
        var $btn0 = $(this);
        $btn0.removeClass("flow-split-opinion"); // 防止多次触发

        var $btnY = $btn0.clone().html("<i class=\"fa fa-check\"></i>同意");
        $btnY.attr("opinion", "同意");
        $btnY.css("margin-right", "5px");
        $btnY.click(function () {
            $("#sf_appColumn4").val("同意");
            setDefaultOpinion("同意");
        });
        //复制原提交按钮
        /*var $btnN = $btn0.clone().html("<i class=\"fa fa-close\"></i>不同意");
        $btnN.attr("opinion", "不同意");
        $btnN.click(function () {
            $("#sf_appColumn4").val("不同意");
            setDefaultOpinion("不同意");
        });*/
        //复制提交按钮，替换点击事件方法
        var $btnN = $btn0.clone().html("<i class=\"fa fa-close\"></i>不同意");
        $btnN.attr("opinion", "不同意");
        $btnN.removeAttr("onclick");
        $btnN.attr("onclick","com.sinoprof.workflow.dialog.submitForm.counterSignAutoReturn(this);");
        $btnN.click(function () {
            $("#sf_appColumn4").val("不同意");
            setDefaultOpinion("不同意");
        });

        $btn0.after($btnN).after($btnY).hide();
    });
}

function initFlowFooter(appFormId) {
    if ($("#flowFooter").length > 0) {
        return;
    }

    var $flowFooter = $(flowFooterHtml);
    var bottom = 0;
    $flowFooter.find(".navbar-fixed-bottom").css("bottom", bottom);

    var $body = $("body");
    $body.append($flowFooter);
    setBodyPaddingBottom();
    $("#flowFooterTask").html(sf_act_info.sfactTaskName);

    footerActObj.appFormId = appFormId;

    initSplitFlow();
}

function doLoad(appFormId, sfactActId) {

    strHtml = iniSFActInfo();
    var formId = "#" + appFormId;
    //alert(strHtml);
    if ($("#sf_flow_field_list_div").length === 0 ) {
        $(formId).append(strHtml);
    }
    if (sf_act_info.newCaseFlag !== "Y" && autoSign) {
        //autoSign = true;
        do_Sign(sfactActId);
    }
    /*
    if (document.getElementById("sf_copyFlag").value == "1") {
        ShowSinoButton(24);
    }*/
    //if(document.getElementById("sf_caseID").value.indexOf(":") >= 0  && document.getElementById("sf_copyFlag").value == "1") {
/*
    if (sf_act_info.queryOnlyFlag == "Y") {
        var nCount = ArrActions.length;
        for (var j = 1; j < nCount; j++) {
            HideSinoButton(j);
        }
    }*/

/*
    if (sf_act_info.copyOpenFlag == "Y") {
        var nCount = ArrActions.length;
        for (var j = 1; j < nCount; j++) {
            HideSinoButton(j);
        }
        ShowSinoButton(24);
    }
*/
    //init_groups();

    if (sf_act_info.newCaseFlag == "Y") {
        do_SelectGroup();
    }

    //fillData(document.getElementById("sf_fillApiData").value);

   // do_appInit();
/*
    SFQueryOpen();

    if (!Launch_Continue) {
        BootstrapDialog.alert(Error_Msg);
        doUnLoad();
        return;
    }*/

   //SFPostOpen();
    // 加载审批意见，加载目标：<div class="flow-opinions"></div>
    loadFlowOpinions(loadOpinionFlag);

    isLoaded = true;
}

function do_SFNewCase(appFormId, flowAppName){

    $.ajax({
        type : "post",
        url : "app/api-flow/flow/workbench/newCase/app/" + flowAppName,
        data :  {loginName:"ADMIN"},
        async : false,
        dataType: "json",
        success : function(data){
            if (data.code !== "0") {
                BootstrapDialog.alert(data.message,function () {
                    sinoFlowClose();
                });
                return;
            }

            SFInit(appFormId, data.data);
            //alert(data.code)
            //var act = data.data;
            //alert(act.sfactActId);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("创建流程异常！" + textStatus + XMLHttpRequest.status);
            hideSinoWaiting();
        }
    });
}

function do_SFOpenCase(appFormId , actId){
    $.ajax({
        type : "post",
        url : "app/api-flow/flow/workbench/openCase",
        data :  {sf_actID : actId, userId: "1"},
        async : false,
        dataType: "json",
        success : function(data) {
            if (data.code !== "0") {
                BootstrapDialog.alert(data.message);
                window.opener.refresh();
                window.close();
                return;
            }
            SFInit(appFormId, data.data);
            //alert(data.code)
            var act = data.data;

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("打开流程异常！" + textStatus + XMLHttpRequest.status);
            hideSinoWaiting();
        }
    });
}

function do_Sign(sfactActId) {

    /*if (!isLoaded && !autoSign) {

        BootstrapDialog.alert("页面数据没有完全载入, 暫时不能签收");
        return;
    }*/

    //SFQuerySign();
/*
    if (!Launch_Continue) {
        if (Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return;
    }
    */

    signAct(sfactActId);
    /*
    if (signAct().indexOf("Success") >= 0) {
        //autoValue(AV_SIGN_MASK);
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
        window.close();
        return;
    }*/
/*
    SFPostSign();

    if (Error_Msg != "") {
        BootstrapDialog.alert(Error_Msg);
    }
    */
}

function signAct(sfActId) {


    $.ajax({
        type: "post",
        url: "app/api-flow/flow/workbench/signAct",
        data: {sf_actID: sfActId, userId: "1"},
        async: false,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        },
        success: function (data) {
            var signResul = data.data;
            if (signResul.indexOf("Success") >= 0) {
            } else {
                BootstrapDialog.alert("签收失败,此案件可能已被其他用户签收");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("打开流程异常！" + textStatus + XMLHttpRequest.status);
            hideSinoWaiting();
        }
    });
}

function  iniSFActInfo() {
    var iniStr = "";
    //<input type="hidden" name="sf_token" id="sf_token" value="<%=token%>" readonly="readonly" />
    iniStr += "<div id = sf_flow_field_list_div>";
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
    iniStr += "</div>";
    return iniStr;

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

/**
 * option.actId  待办actId，传入actId就可以不用传别的参数
 * option.applId  业务主键ID，使用该参数时需要传入流程名称
 * option.procName 流程名称
 * option.docNum  业务单据号，可以不传
 * */
function loadFlowOpinions(option) {
    if (option.flag === "N") {
        return;
    }
    // 加载审批意见
    var $flowOpinions = $("div.flow-opinions");
    if ($flowOpinions.length > 0) {
        var caseId = $("#sf_caseID").val();
        if(!caseId){
            caseId="";
        }
        var actId = nullToEmpty(option.actId);
        var appId = nullToEmpty(option.applId);
        if (isEmpty(caseId) && isEmpty(actId) && isEmpty(appId)) {
            return;
        }

        var procName = nullToEmpty(option.procName);
        var docNum = nullToEmpty(option.docNum);
        $flowOpinions.load(ctx + "/static/views/common/sfOpinions.html",
            function () {
                var $sfOpinionsForm = $("#sfOpinionsForm");
                $sfOpinionsForm.append("<input type='hidden' name='sfActCaseId' value='"+caseId+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='actId' value='"+actId+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='applId' value='"+appId+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='procName' value='"+procName+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='docNum' value='"+docNum+"'/>");
                var option = {
                    form:"#sfOpinionsForm",
                    data: {pageNo: 1}
                };
                $("#sfOpinionsTable").ajaxPage(option);
            }
        );
    }
}
function loadFlowOpinionsNotCaseId(option) {
    if (option.flag === "N") {
        return;
    }
    // 加载审批意见
    var $flowOpinions = $("div.flow-opinions");
    if ($flowOpinions.length > 0) {
        var caseId = "";
        var actId = nullToEmpty(option.actId);
        var appId = nullToEmpty(option.applId);
        if (isEmpty(caseId) && isEmpty(actId) && isEmpty(appId)) {
            return;
        }
        var procName = nullToEmpty(option.procName);
        var docNum = nullToEmpty(option.docNum);
        $flowOpinions.load(ctx + "/static/views/common/sfOpinions.html",
            function () {
                var $sfOpinionsForm = $("#sfOpinionsForm");
                $sfOpinionsForm.append("<input type='hidden' name='sfActCaseId' value='"+caseId+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='actId' value='"+actId+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='applId' value='"+appId+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='procName' value='"+procName+"'/>");
                $sfOpinionsForm.append("<input type='hidden' name='docNum' value='"+docNum+"'/>");
                var option = {
                    form:"#sfOpinionsForm",
                    data: {pageNo: 1}
                };
                $("#sfOpinionsTable").ajaxPage(option);
            }
        );
    }
}

var flowFooterHtml =
"<div id=\"flowFooter\" class='form-horizontal'>" +
"    <nav class=\"navbar navbar-default navbar-fixed-bottom sino-form\"" +
"        style=\"width:90%; margin-left:5%; line-height: 26px;z-index: 1000;\" role=\"navigation\">" +
"        <div class=\"col-sm-5\" style='font-size: 14px; font-weight: bold;'>" +
"            <label class=\"col-sm-3 control-label\" style='text-align: left;'>当前任务：</label>" +
"            <div class=\"col-sm-8 control-label\" style='text-align: left;' id='flowFooterTask'></div>" +
"        </div>" +
"        <div class=\"col-sm-7\">" +
"            <button type='button' class='btn btn-warning btn-sm flow-split-opinion' style='width: 80px;' onclick='confirmFlowFooter(this)'><i" +
"                class=\"fa fa-paper-plane\"></i>提交</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
"            <button type='button' class='btn btn-default btn-sm' style='width: 80px;' onclick='closeFlowFooter()'><i" +
"                class=\"fa fa-close\"></i>关闭</button>" +
"        </div>" +
"    </nav>" +
"</div>";

function closeFlowFooter() {
    $("#flowFooter").hide();
}

// 点击底部流程提交
function confirmFlowFooter(obj) {
    // footerValidate为页面提交验证方法名,
    // footerValidate要根据业务验证需求自定义 返回值为false或者true
    if(typeof footerValidate=="function"){
        var isNotValidate = footerValidate();
        if(!isNotValidate){
            return false;
        }
    }
    //提交流程前需要执行方法
    if(typeof beforeSubmit=="function"){
        beforeSubmit();
    }
    if (isEmpty(footerActObj.appFormId)) {
        alert("流程appFormId不能为空，请在do_SFInit方法传入。");
        return;
    }
    if (isEmpty(footerActObj.defaultSubmitUrl)) {
        alert("流程默认提交路径不能为空，请在do_SFInit方法传入或者在form的action内设置。");
        return;
    }
    if(footerActObj.defaultSubmitUrl=="/api-plan/investigation/submit"){
        doSave("submit");
        return;
    }else if(footerActObj.defaultSubmitUrl=="/api-plan/investigation/report/submit"){
        submitSummary();
        return;
    }
else {
    // 获取页面参数
    var appEntity = $("#" + footerActObj.appFormId).serializeObject();

    com.sinoprof.workflow.dialog.submitForm.selectNextFlow({
        appEntity: appEntity, // 业务参数，从form内统一获取
        callbackFun: function () {
            // 获取流程提交信息（人员组别）
            appEntity = $("#" + footerActObj.appFormId).serializeObject();
            var test= footerActObj.defaultSubmitUrl;
            //console.log(appEntity);
            //alert(appEntity);
            //alert("URL:"+test);
            $.ajax({
                type: "post",
                url: test,
                data: appEntity,
                dataType: "json",
                beforeSend: function (XMLHttpRequest) {
                    showSinoWaiting();
                    XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                },
                success: function (data) {
                    hideSinoWaiting();
                    if (data.code != "0") {
                        alert(data.message);
                        return;
                    }
                    sinoFlowClose();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    hideSinoWaiting();
                    alert("提交流程异常！" + textStatus + XMLHttpRequest.status);
                }
            });

        }

    });
    }
}
