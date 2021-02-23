/**
 * User:徐佩政
 * Date：2015-1-29
 * 单组别选择对话框
 */
;
$.namespace("com.sinoprof.workflow.dialog");

com.sinoprof.workflow.dialog.flowUserSelectHtml =
    "<div class='modal' id='flowUserSelectModal' role='dialog' aria-hidden='true'>"
    + "<div class='modal-dialog'>"
        + "<div class='modal-content'>"

            + "<div class=modal-header>"
                + "<button type='button' class='close' data-dismiss='modal'>"
                    + "<span aria-hidden='true'>&times;</span>"
                    + "<span class='sr-only'>Close</span>"
                + "</button>"
                + "<h4 class='modal-title' id='myModalLabel'>请选择下一办理用户</h4>"
            + "</div>"

            + "<div class=modal-body>"
                + "<form class='form-horizontal' role='form'>"
                + "<div class='form-group'>"
                    + "<label class='col-sm-2 control-label'>流向:</label>"
                    + "<div class='col-sm-4'>"
                        + "<select id='flowUserModal_flows' class='form-control input-sm'></select>"
                    + "</div>"


                + "</div>"

                + "<div id='groupDiv' class='form-group'>"

                    + " <label class='col-sm-2 control-label'>组别:</label>"
                    + " <div class='col-sm-4'>"
                        + "<select id='flowUserModal_groups' class='form-control input-sm'></select>"
                    + "</div>"
                + "</div>"

                + "<div id='userDiv' class='form-group'>"
                    + "<label class='col-sm-2 control-label'>人员:</label>"
                    + "<div class='col-sm-10'>"
                        + "<div class='input-group'>"
                            + "<div class='dropdown input-group-btn'>"

                            + "<select id='flowUserModal_users' class='form-control input-sm'></select>"

                            + "</div>"
                        + "</div>"
                    + "</div>"
                + "</div>"

                + "<div id='opinionDiv' class='form-group'>"
                    + "<label class='col-sm-2 control-label'>意见:</label>"
                    + "<div class='col-sm-10'>"
                        + "<div class='input-group'>"
                            + "<div class='dropdown input-group-btn'>"

                                + "<textarea id='flowUserModal_opinion'  class='form-control input-sm'></textarea>"

                            + "</div>"
                        + "</div>"
                    + "</div>"
                + "</div>"
        +"</form>"
            + "</div>"

            + "<div class=modal-footer>"
                + "<button id='groupModal_okButton' type='button' class='btn btn-primary btn-sm col-sm-2 col-sm-offset-6'>确认</button>"
                + "<button type='button' class='btn btn-default btn-sm col-sm-2 col-sm-offset-6' data-dismiss='modal'>取消</button>"
            + "</div>"

        + "</div>"
    + "</div>"
  + "</div>";

com.sinoprof.workflow.dialog.selectFlowUser = function(){

    var parameters = $.extend(true,{ctx:"nil",appEntity:"nil"},arguments[0]);
    var callbackFun = function(result){
        if(parameters.callbackFun){parameters.callbackFun(result);}
    }

    var obj = parameters.appEntity;

    if($('#flowUserSelectModal').length == 0){
        $(com.sinoprof.workflow.dialog.flowUserSelectHtml).appendTo('body');

        $("#flowUserSelectModal").on("show.bs.modal",function(){
            $("#flowUserModal_flows").empty();
         //   $("#groupModal_company").empty();
         //   $('#groupModal_groupID').val(0);
        //    $('#groupModal_groupFullName').val("");
        //    $('#groupModal_groupTree').empty();

            var actId = $('#sf_actID').val();
            var appDefId = $('#sf_appID').val();
            var handleGroup =  $('#sf_handlerGroup').val();



            $.post(parameters.ctx + "/flow/ui/getFlowListWithJson",
               {appDefId:appDefId, actId:actId, handleGroup:handleGroup,obj:JSON.stringify(obj)},
                function(data){

                    $("#flowUserModal_flows").append($("<option/>").text("--请选择--").attr('value','-1'));
                    $.each(data,function(index,item) {

                        $("#flowUserModal_flows").append($("<option/>").text(item.flowDesc).attr({'value':item.flowCode,'taskName':item.taskName,'code':item.taskId}));
                    }
                );

                   // BootstrapDialog.alert(data);
            });
        });
        
        $("#flowUserModal_flows").change(function(){

            $("#flowUserModal_groups").empty();
            var actId = $('#sf_actID').val();
            var appDefId = $('#sf_appID').val();
            var handleGroup =  $('#sf_handlerGroup').val();
            var nextTaskName = $("#flowUserModal_flows option:selected").attr('taskName');
            if (nextTaskName == "STOP") {
                $('#flowUserModal_groups').val(0);
                $('#groupDiv').hide();
                $('#userDiv').hide();
            }else{
                $('#groupDiv').show();
                $('#userDiv').show();
                //   $('#groupModal_groupID').val(0);
                //   $('#flowUserModal_groups').val("");
                //   $('#groupModal_groupTree').empty();

                $.post(parameters.ctx + "/flow/ui/getGroupListWithJson",
                    {appDefId: appDefId, actId: actId, flowCode: $(this).val(), handleGroup: handleGroup,obj:JSON.stringify(obj)},
                    function (data) {
                        $("#flowUserModal_groups").append($("<option/>").text("--请选择--").attr('value', '-1'));
                        $.each(data, function (index, item) {
                            $("#flowUserModal_groups").append($("<option/>").text(item.groupName).attr({
                                value: item.groupName,
                                code: item.groupName
                            }));
                        });
                    });
            }

        });

        $("#flowUserModal_groups").change(function(){

           // $('#groupModal_groupID').val(0);
           // $('#groupModal_groupFullName').val("");
           // $('#groupModal_groupTree').empty();
            $("#flowUserModal_users").empty();
            var actId = $('#sf_actID').val();
            var appDefId = $('#sf_appID').val();
            var group =  $('#flowUserModal_groups').val();
            var flowCode =  $('#flowUserModal_flows').val();
            //var companyID = $(this).val();

            $.post(parameters.ctx + "/flow/ui/getUserListWithJson",
                {appDefId: appDefId, actId: actId, flowCode: flowCode, group: group,obj:JSON.stringify(obj)},
                function (data) {
                    $("#flowUserModal_users").append($("<option/>").text("--请选择--").attr('value', '-1'));
                    $.each(data, function (index, item) {
                        $("#flowUserModal_users").append($("<option/>").text(item.userDispName).attr({
                            value: item.userLoginName,
                            code: item.userId
                        }));
                    });
                });
        });

        $('#flowUserSelectModal').modal({backdrop:'static'});
    }else{
        $('#flowUserSelectModal').modal('show');
    }

    $("#groupModal_okButton").one("click",function(){
        $("#flowUserSelectModal").modal('hide');
        var workflowObj = new Object();

        workflowObj.flowAppId =  $('#sf_appID').val();
        workflowObj.actId = $('#sf_actID').val();
        workflowObj.currentGroupName =  $('#sf_group').val();
      //  actUI currentUserId = "";
        workflowObj.opinion = $('#flowUserModal_opinion').val();
        workflowObj.keyWord = "";
        workflowObj.subject = "";
        workflowObj.appDataKeyId = "";
        workflowObj.nextTaskName =  $("#flowUserModal_flows option:selected").attr('taskName');
        workflowObj.nextGroupName = $('#flowUserModal_groups').val();
        workflowObj.nextUserLoginName =  $('#flowUserModal_users').val();

        if (workflowObj.nextTaskName == "SPLIT") {
            var nextParallelTask = new Object();

            //  actionTask.taskId =  $("#flowUserModal_flows option:selected").attr('taskName');
            nextParallelTask.flowCode = $('#flowUserModal_flows').val();
            //  actionTask.flowDesc = "";
            nextParallelTask.taskName = $("#flowUserModal_flows option:selected").attr('taskName');
            // actionTask.taskDesc = "";
            nextParallelTask.mutiUserSelect = "N";  //Y/N

            nextParallelTask.groupName = $('#flowUserModal_groups').val();
            nextParallelTask.userLoginName = $('#flowUserModal_users').val();
            var ArrNextTasks = new Array(nextParallelTask);
            workflowObj.nextParallelTaskList = ArrNextTasks;
        }
        var workflowJson = JSON.stringify(workflowObj);
        //下面这句话。针对于IE8，比较低的小版本bug.

        workflowJson = workflowJson.replace(new RegExp("null","gm"),"");

        $("#sf_appFieldValue").val(workflowJson);

        workflowObj.appEntity = parameters.appEntity;

        callbackFun(workflowObj);
    });
}


com.sinoprof.dialog.groupModal_groupSelected = function(){
    $('#groupModal_groupID').val($(this).attr('groupID'));
    $('#groupModal_groupFullName').val($(this).attr('groupFullName'));
}