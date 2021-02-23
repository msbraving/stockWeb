$.namespace("com.sinoprof.workflow.dialog");

com.sinoprof.workflow.dialog.forwardSelectHtml = '<div class="modal"  id="sf_forward_UserSelectModal" role="dialog" aria-hidden="true" >'
    + "<div class='modal-dialog'>"
    + "<div class='modal-content'>"
    + '<div class="pop-box">'
    + '<div class="box-title pl"><h2 class="icon bold blue">转发</h2><a href="#" id="sf_forward_exitBtn" class="icon close"></a></div>'
    +   '<div class="box-main">'
    +'<div class="lc-title black mt pl20 bold">当前任务及组别</div>'
    +   '<div class="lc-xznr black mt pl20 bold">'
    +   '   <dl>'
    +   '       <dt class="fl tr"><span class="xzlb fl tr">任务：</span><span id="sf_forward_missionTxt" class="gray fr tl">整理</span></dt>'
    +   '   </dl>'
    +   '   <dl>'
    +   '       <dt class="fl tr"><span class="xzlb fl tr">组别：</span><span id="sf_forward_groupTxt" class="gray fr tl">区公司财务管理部门</span></dt>'
    +   '   </dl>'
    +   '</div>'
    +'<div class="lc-title black mt pl20 bold">请选择经办人</div>'
    +'<div class="lc-user">'
    +'<div id="sf_forward_slideDiv" class="clearfix user-bm mt">'
    +   '<span class="u1 us"></span><span id=sf_forward_groupName class="u2">区公司财务管理部门</span><span class="u3 orange bold" style="display:block">部门人员选择</span><i style="display:block"></i>'
    +'</div>'
    +'<div id="sf_forward_ManDiv" class="clearfix user-xz user-bk">'
    +'  <ul>'
    +'      <li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +'  </ul>'
    +'</div>'
    +'</div>'
    +'<div class="lc-btns tc pt20 pb20 mt">'
    +'  <button type="button" id="sf_forward_confirmBtn" class="button bgorange bold white f14">确定</button><button type="button" id="sf_forward_backBtn" class="button bgblue bold white f14 ml30">返回</button>'
    +'</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';
com.sinoprof.workflow.dialog.forwardForm ={

    onForwordCallBackFun: {},
    forwardModel: function(){
        $("#sf_forward_UserSelectModal").remove();
        var parameters = $.extend(true, {ctx: "nil"}, arguments[0]);
        this.onForwordCallBackFun = function (result) {
            if (parameters.callbackFun) {
                parameters.callbackFun(result);
            }
        }
        if($("#sf_forward_UserSelectModal").length == 0){
            $(com.sinoprof.workflow.dialog.forwardSelectHtml).appendTo('body');
        }
        var sf_forward_project = $("#sf_project").val();
        var sf_forward_group = $("#sf_group").val();
        var sf_forward_roleName = $("#sf_role").val();
        $("#sf_forward_missionTxt").html($("#sf_taskname").val());
        $("#sf_forward_groupTxt").html(sf_forward_group);
        $("#sf_forward_groupName").html(sf_forward_group);
        $("#sf_forward_ManDiv").empty();
        $.ajax({
            type : "post",
            url : parameters.ctx +"/flow/ui/getGroupUsers",
            data :  {"projectName":sf_forward_project ,"groupNames":sf_forward_group, "roleName":sf_forward_roleName },
            async : false,
            dataType: "json",
            success : function(data){
//                BootstrapDialog.alert(data);
                eval("names = " + data);
                var realArr = names[0].realnames.split(",");
                var username = names[0].usernames.split(",");
                for(var i=0;i<realArr.length;i++) {
                    var ipos = realArr[i].indexOf("/");
                    if(realArr[i].substring(0,ipos) != $("#sf_user").val()) {
                        var forwardManHtml ='<ul><li><label><input name="forwardNameRadio" class="vam" type="radio" value="'+username[i]+ '" >'
                            +realArr[i].substring(0,ipos)+'</label></li></ul>';
                        $("#sf_forward_ManDiv").append(forwardManHtml);
                        $("#sf_forward_ManDiv").addClass("user-bk").slideToggle();
                    }
                }
            }
        });
        $("#sf_forward_UserSelectModal").modal({backdrop: 'static'});
        $("#sf_forward_slideDiv").bind("click",function(){
            $("#sf_forward_ManDiv").slideToggle();
        });
        $("#sf_forward_confirmBtn").bind("click", function () {
            var submitName = $("#sf_forward_ManDiv input:checked").val();
            if(!submitName) {
                BootstrapDialog.alert("请选择转发人员");
                return;
            }
            $("#sf_forward_UserSelectModal").modal('hide');
            com.sinoprof.workflow.dialog.forwardForm.submitFlow(submitName);

        });
        $("#sf_forward_backBtn,#sf_forward_exitBtn").bind("click", function () {
            $("#sf_forward_UserSelectModal").modal('hide');
        });
    },

    submitFlow: function (submitName) {
        var sfActObj = new Object();
        sfActObj.actionType = "3";  //1 提交 2 退回 3 转发
        sfActObj.actId =  $('#sf_actID').val();
        sfActObj.flowAppId = $('#sf_appID').val();
        sfActObj.handleGroup =  $('#sf_handlerGroup').val();
        sfActObj.currentGroupName =  $('#sf_group').val();
//        sfActObj.opinion = $('#opinion').val();

//        if (this.sfActObj.nextTaskName == "SPLIT") {
//
//            var ArrNextTasks = new Array();
//
//            this.sfActObj.nextGroupName = "";
//            this.sfActObj.nextUserLoginName =  "";
//            var groupStr = "";
//            var userStr = "";
//
//            $('input:checkbox:checked').each(function(){
//                ArrNextTasks = com.sinoprof.workflow.dialog.submitForm.addParallelTask(ArrNextTasks, $(this).attr("flowTask"), $(this).attr("userGroup"),$(this).val());
//            });
//
//            this.sfActObj.nextParallelTaskList = ArrNextTasks;
//        }else{
//
//            if(this.sfActObj.trayType == "0" && this.sfActObj.flowType == "0"){//角色工作栏，且不分发
//
//                var userStr = "";
//                var userGroup ="";
//                $('input:checkbox:checked').each(function(){
//
//                    if(userStr == "") {
//                        userStr  = $(this).val();
//                    }else {
//                        userStr  =  userStr + ";" + $(this).val();
//                    }
//                    userGroup = $(this).attr("userGroup");
//                });
//                this.sfActObj.nextGroupName = userGroup;
//                this.sfActObj.nextUserLoginName =  userStr;
//
//            }else{
//                this.sfActObj.nextGroupName = $("input[name='nextUserRadio']:checked").attr("userGroup");
        sfActObj.nextGroupName = $('#sf_group').val();
//        sfActObj.nextTaskName = $("#sf_taskname").val();
        sfActObj.nextUserLoginName =  submitName;
//            }
//        }
        var workflowJson = JSON.stringify(sfActObj);
        //下面这句话。针对于IE8，比较低的小版本bug.

        workflowJson = workflowJson.replace(new RegExp("null","gm"),"");

        $("#sf_appFieldValue").val(workflowJson);
        this.onOKCallBackFun(sfActObj);
        //$("#appform").submit();
    }
}