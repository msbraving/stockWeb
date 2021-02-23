$.namespace("com.sinoprof.workflow.dialog");
com.sinoprof.workflow.dialog.retrieveFlow = {
    do_retrieveFlow: function(data){
        showSinoWaiting();
        var actId=data.appEntity.sfactId;
        var parameters = $.extend(true, {appEntity: "nil"}, arguments[0]);
        this.onBackCallBackFun = function (result) {
            if (parameters.callbackFun) {
                parameters.callbackFun(result);
            }
        };

        $.ajax({
            type: "post",
            url: "app/api-flow/ui/checkRetrieveFlow",
            data: {
                fromActId : actId
            },
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
               if(data.code == 0 ){
                   // console.log(data.data)
                   var returnToActId =  data.data.SFACT_FROM_ACT_ID;
                   var actId =  data.data.SFACT_ACT_ID;
                   var appId =  data.data.SFACT_APPL_ID;
                   BootstrapDialog.confirm('您确认取回该待办吗?', function (result) {
                       if(result){
                           com.sinoprof.workflow.dialog.retrieveFlow.do_BackFlow(returnToActId,actId,appId);
                       }
                   });
               }else{
                   BootstrapDialog.alert(data.message);
               }
                hideSinoWaiting();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BootstrapDialog.alert("取回任务异常！" + textStatus + XMLHttpRequest.status);
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
        // console.log(workflowJson)
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
                    BootstrapDialog.alert("取回成功",function () {
                        $.ajax({
                            url: "/api-centralize-interfaces/oatodo/deleteOATodo",
                            data: JSON.stringify({appMsgId:actId,msgType:"0"}),
                            contentType: "application/json",
                            type: "POST",
                            async:false,
                            beforeSend: function (XMLHttpRequest) {
                                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                            },
                            success: function (data) {
                                // console.log("代办刷新情况",data);
                            },
                            error:function (res) {
                                // console.log("代办刷新失败",res);
                            }
                        });
                    });
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
        // workflowJson = workflowJson.replace(new RegExp("null", "gm"), "");
        // $("#sf_appFieldValue").val(workflowJson);
        //
        //
        this.onBackCallBackFun(sfActObj);
    }
}
