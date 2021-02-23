$.namespace("com.sinoprof.workflow.dialog");
com.sinoprof.workflow.dialog.backFlowSelForm = {
    do_SelectBackTask: function(data){
        var actId=data.sf_actID;
        var appId=data.sf_appID;
        var parameters = $.extend(true, {appEntity: "nil"}, arguments[0]);
        this.onBackCallBackFun = function (result) {
            if (parameters.callbackFun) {

                parameters.callbackFun(result);
            }
        };

        var htmlModelDiv = '<div class="modal fade sino-box" id="sf_selectTaskModal" role="dialog" aria-hidden="true" >'
            + '<div class="modal-dialog sino-modal-md">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
            + '<span aria-hidden="true">&times;</span>'
            + '</button>'
            + '<h3 class="modal-title" id="myModalLabel"><i class="fa fa-window-maximize"></i> 可退任务选择</h3>'
            + '</div>'
            + '<div class="modal-body sino-box-modal">'
            /*+ '<div class="box-title pl"><h2 class="icon bold blue">选择组别</h2><a href="#" id="sf_selectGroup_exitBtn" class="icon close"></a></div>'*/
            + '<div class="box-main">'
            + '<div id="sf_selectTaskDiv" style="font-size: 14px;" class="sino-form">'

            + '</div>'
            + '                        <div class="clearfix"></div>'
            + '                        <div class="flow-bline mt-5"></div>'

            + '<div class="col-sm-30" style="padding: 0;" data-toggle="text-count">'
            + '   <ul class="col-xs-30 col-sm-2 col-md-2 text-left flow-box-left mt-5">'
            + '                            <li class="row"><p>意见内容：</p></li>'
            + '                        </ul>'
            + '   <ul class="col-xs-30 col-sm-28 col-md-28 text-left text-lightgray flow-box-right" style="padding: 0">'
            + '  <textarea id="Content" name="Content" class="form-control" placeholder="请输入您的意见"></textarea>'
            + '  <span class="text-count"><var class="text-count-word">500</var>/500</span>'
            + '                        </ul>'
            + '                            </div>'
            + '<div class="text-center mt-10">'
            + '                        <div class="clearfix"></div>'
            + '                        <div class="flow-bline mt-5"></div>'

            + '  <button type="button" id="sf_selectTask_confirmBtn" class="btn btn-warning"><i class="fa fa-floppy-o"></i>确 定</button>'
            + '  <button type="button" id="sf_selectTask_backBtn" class="btn btn-default"><i class="fa fa-undo"></i>返 回</button>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';


        $.ajax({
            type: "post",
            url: "app/api-flow/ui/GetBackTaskList",
            data: data,
            async: false,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {

                var taskList = data.data;
                $("#sf_selectTaskModal").remove();
                if ($("#sf_selectTaskModal").length === 0) {
                    $(htmlModelDiv).appendTo('body');
                }
                var addDt = '<table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 0;"'
                    + ' class="table table-hover table-bordered table-striped mytable mt-5">'
                    //  + ' <thead class="tr-th">'
                    + ' <tr>'
                    + ' <th width="8%">'
                    + '状态'
                    + '</th>'
                    + '<th width="30%">来源任务</th>'
                    + '<th width="28%">转发人</th>'
                    + '<th class="isVender" width="30%">转发日期</th>'
                    + '</tr>'
                // + '</thead>'
                //  + '<tbody id="todoListTemplate" action="app/api-flow/sysmgr/act/list"'
                //  + ' style="display: none">'


                for (var i = 0; i < taskList.length; i++) {
                    addDt = addDt + '<tr><td style="height:30px line-height:30px"><input style="margin-bottom: 5px;" type="radio" name="taskRadio" class="vam"'
                    if (i == 0){
                        addDt = addDt + ' checked '
                    }
                    addDt = addDt + ' value="' + taskList[i].sfactReturnActId + '"/> '
                        + '</td><td>' + taskList[i].sfactTaskName + '</td><td> ' + taskList[i].sfactCompleteUser + '</td><td>' + taskList[i].sfactCompleteDate + '</td></tr>';

                }
                // addDt = addDt + ' </tbody>'
                +'</table>';
                $(addDt).appendTo($("#sf_selectTaskDiv"));

                $("#sf_selectTaskModal").modal({backdrop: 'static'});
                var retTask = "";
                $("#sf_selectTask_confirmBtn").bind("click", function () {
                    retTask = $("#sf_selectTaskDiv input[name=taskRadio]:checked").val();
                    if (typeof retTask == 'undefined' || !retTask) {
                        alert("请选择退回任务");
                    } else {

                        $("#sf_selectTaskModal").modal('hide');
                        com.sinoprof.workflow.dialog.backFlowSelForm.do_BackFlow(retTask,actId,appId);
                    }
                });
                $("#sf_selectTask_backBtn,#sf_selectTask_exitBtn").bind("click", function () {
                    var r = confirm("是否确认取消？");
                    if (r) {
                        isSave = true;
                        //  com.sinoprof.workflow.dialog.backFlowSelForm.do_CancelSelectTask();
                        $("#sf_selectTaskModal").modal('hide');
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("读取退回任务异常！" + textStatus + XMLHttpRequest.status);
                hideSinoWaiting();
            }
        });

    },


    do_BackFlow: function(returnToActId,actId,appId) {

        var sfActObj = {};
        sfActObj.actionType = "2";  //1 提交 2 退回 3 转发,4
        sfActObj.actId = actId ? actId :"";
        sfActObj.flowAppId = appId ? appId:"";
        sfActObj.currentUserId = getUser().id ? getUser().id:"";
        sfActObj.returnToActId = returnToActId?returnToActId:"";

        sfActObj.opinion = $('textarea[name=Content]').val()?$('textarea[name=Content]').val():"";

        var workflowJson = JSON.stringify(sfActObj);
        $.ajax({
            url:"app/api-flow/ui/submit",
            data: workflowJson,
            dataType : "json",
            type:"POST",
            contentType: 'application/json;charset=utf-8',
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success:function (data) {
                if (data.code == "0") {
                    BootstrapDialog.alert("退回成功");
                }else{
                    BootstrapDialog.alert(data.message);
                }
            },
            error: function (err) {
                console.error(err);
                var dlg = BootstrapDialog.alert({message: '数据请求失败，code:' + err.status});
            }
        });
        //下面这句话。针对于IE8，比较低的小版本bug.
        workflowJson = workflowJson.replace(new RegExp("null", "gm"), "");
        $("#sf_appFieldValue").val(workflowJson);


        this.onBackCallBackFun(sfActObj);
    },

    do_CancelSelectTask:function() {
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
}
