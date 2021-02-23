/**
 * 流程提交对话框
 */
$.namespace("com.sinoprof.workflow.dialog");
$.fn.modal.Constructor.prototype.enforceFocus = function () {
};
com.sinoprof.workflow.dialog.flowSelectHtml =
    '<div class="modal fade sino-box" id="flowSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '    <div class="modal-dialog modal-lg" role="document">' +
    '        <div class="modal-content">' +
    '            <div class="modal-header" style="padding: 6px 12px;">' +
    '                <button type="button" class="close" style="margin: 0;" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '                <h3 class="modal-title"><i class="fa fa-window-maximize"></i> 当前流程节点：@taskName@</h3>' +
    '            </div>' +
    '            <div class="modal-body" style="padding: 10px 15px;">' +
    '                <div class="sino-flow">' +
    '                    <div class="flow-group">' +
    '                        <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left">' +
    '                            <li class="row"><p><i class="text-red">*</i> 下一流向：<br></p></li>' +
    '                        </ul>' +
    '                        <ul class="col-xs-12 col-sm-11 col-md-11 text-left flow-box-right" style="padding: 0">' +
    '                            <li>' +
    '                                <div class="flow-group-inline" id="nextFlowSelectDiv">' +
    '                                </div>' +
    '                            </li>' +
    '                        </ul>' +
    '                        <div class="clearfix"></div>' +
    '                        <div class="flow-bline"></div>' +
    '                    </div>' +

    '                    <div id="returnReason" style="display:none" class="flow-group">' +
    '                        <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '                            <li class="row"><p>退回意见：</p></li>' +
    '                        </ul>' +
    '                        <ul class="col-xs-12 col-sm-11 col-md-11 text-left text-lightgray flow-box-right" style="padding: 0">' +
    '                            <select id="returnOpinions" class="form-control input-sm">' +
    '                            </select>' +
    '                        </ul>' +
    '                    </div>' +


    '                    <div class="flow-group">' +
    '                        <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '                            <li class="row"><p>常用意见：</p></li>' +
    '                        </ul>' +
    '                        <ul class="col-xs-12 col-sm-11 col-md-11 text-left text-lightgray flow-box-right" style="padding: 0">' +
    '                            <select id="commonOpinions" class="form-control input-sm">' +
    '                            </select>' +
    '                        </ul>' +
    '                    </div>' +
    '                    <div class="flow-group mt-5">' +
    '                        <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '                            <li class="row"><p>意见内容：</p></li>' +
    '                        </ul>' +
    '                        <ul class="col-xs-12 col-sm-11 col-md-11 text-left text-lightgray flow-box-right" style="padding: 0">' +
    '                            <div class="col-sm-10" style="padding: 0;" data-toggle="text-count">' +
    '                                <textarea id="Content" name="Content" class="form-control" placeholder="请输入您的意见"></textarea>' +
    '                                <span class="text-count"><var class="text-count-word">500</var>/500</span>' +
    '                            </div>' +
    '                            <label class="checkbox-inline ml-10">' +
    '                                <input type="checkbox" id="saveCommonOpinion"> 设为常用' +
    '                            </label>' +
    '                        </ul>' +
    '                        <div class="clearfix"></div>' +
    '                        <div class="flow-bline mt-5"></div>' +
    '                    </div>' +
    '                    <div class="flow-state">' +
    '                        <div>' +
    '                        </div>' +
    '                        <div>' +
    '                            <div class="flow-group">' +
    '                                <div class="clearfix"></div>' +
    '                                <div class="flow-bline mt-10"></div>' +
    '                                <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '                                    <li class="row"><p>抄送人：</p></li>' +
    '                                </ul>' +
    '                                <div class="col-xs-12 col-sm-11 col-md-11 text-left">' +
    '                                    <div class="row">' +
    '                                        <div class="col-xs-12 col-sm-6 col-md-6 pl-0">' +
    '                                            <div class="select2 select2-container col-sm-12 btn-group input-group dropup sino-flow select2-container--default"' +
    '                                                 style="width: 100%;">' +
    '                                                <span class="selection form-control input-sm input-addon-edit input-select">' +
    '                                                    <span class="select2-selection select2-selection--multiple" role="combobox" tabindex="-1">' +
    '                                                        <ul class="select2-selection__rendered">' +
    '                                                            <li class="select2-search select2-search--inline">' +
    '                                                                <input class="select2-search__field" type="search"' +
    '                                                                       tabindex="0" autocomplete="off" autocorrect="off"' +
    '                                                                       autocapitalize="off" spellcheck="false"' +
    '                                                                       name="flowCopyUser" placeholder="请输入姓名或者登录名查询"' +
    '                                                                       role="textbox" aria-autocomplete="list" style="width: 100px;">' +
    '                                                            </li>' +
    '                                                        </ul>' +
    '                                                    </span>' +
    '                                                </span>' +
    '                                            </div>' +
    '                                        </div>' +
    '                                        <div class="col-xs-12 col-sm-6 col-md-6 text-left">' +
    '                                            <div class="row">' +
    '                                                <div class="form-group sino-form-group sino-form-group-horizontal">' +
    '                                                    <label class="col-sm-2 control-label text-right mt-5">抄送信息：</label>' +
    '                                                    <div class="col-sm-10" data-toggle="text-count">' +
    '                                                        <textarea name="flowCopyMsg" class="form-control" placeholder="请输入抄送信息"></textarea>' +
    '                                                        <span class="text-count"><var class="text-count-word">100</var>/100</span>' +
    '                                                    </div>' +
    '                                                </div>' +
    '                                            </div>' +
    '                                        </div>' +
    '                                    </div>' +
    '                                </div>' +
    '                                <div class="clearfix"></div>' +
    '                            </div>' +
    '                        </div>' +
    '                    </div>' +
    '                    <div class="flow-prompt text-center text-red">请选择“下一流向”</div>' +
    '                    <div class="flow-group-btn text-center">' +
    '                        <button id="flowBtnOK" type="button" class="btn btn-warning"><i class="fa fa-floppy-o"></i>确定</button>' +
    '                        <button id="flowBtnCancel" type="button" class="btn btn-default"><i class="fa fa-undo"></i>返回</button>' +
    '                    </div>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>';

com.sinoprof.workflow.dialog.deliverHtml =
    '<div class="modal fade sino-box" id="flowSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '    <div class="modal-dialog modal-lg" role="document">' +
    '        <div class="modal-content">' +
    '            <div class="modal-header" style="padding: 6px 12px;">' +
    '                <button type="button" class="close" style="margin: 0;" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '                <h3 class="modal-title"><i class="fa fa-window-maximize"></i> 当前流程节点：@taskName@</h3>' +
    '            </div>' +
    '            <div class="modal-body" style="padding: 10px 15px;">' +
    '                <div class="sino-flow">' +
    '                    <div class="flow-group mt-5">' +
    '                        <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '                            <li class="row"><p>转交意见：</p></li>' +
    '                        </ul>' +
    '                        <ul class="col-xs-12 col-sm-11 col-md-11 text-left text-lightgray flow-box-right" style="padding: 0">' +
    '                            <div class="col-sm-10" style="padding: 0;" data-toggle="text-count">' +
    '                                <textarea id="Content" name="Content" class="form-control" placeholder="请输入您的意见"></textarea>' +
    '                                <span class="text-count"><var class="text-count-word">500</var>/500</span>' +
    '                            </div>' +
    '                        </ul>' +
    '                        <div class="clearfix"></div>' +
    '                        <div class="flow-bline mt-5"></div>' +
    '                    </div>' +
    '                    <div class="flow-state">' +
    '                        <div>' +
    '                        </div>' +
    '                    </div>' +
    '                    <div class="flow-group-btn text-center">' +
    '                        <button id="flowBtnOK" type="button" class="btn btn-warning"><i class="fa fa-floppy-o"></i>确定</button>' +
    '                        <button id="flowBtnCancel" type="button" class="btn btn-default"><i class="fa fa-undo"></i>返回</button>' +
    '                    </div>' +
    '                </div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>';

com.sinoprof.workflow.dialog.flowSelectedHtml =
    '<div class="flow-group">' +
    '    <ul class="col-xs-12 col-sm-12 col-md-12 flow-title">' +
    '        <li class="row"><h3><i class="fa fa-circle"></i>流程审批提交页流向</h3></li>' +
    '    </ul>' +
    '</div>' +
    '<div class="flow-group">' +
    '    <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '        <li class="row"><p>办理人：</p></li>' +
    '    </ul>' +
    '    <div class="col-xs-12 col-sm-11 col-md-11 flow-box-right">' +
    '        <div class="row">' +
    '            <div class="col-sm-12 btn-group input-group dropup">' +
    '                <select multiple="multiple" aria-hidden="true" name="states[]">' +
    '                </select>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>';

com.sinoprof.workflow.dialog.defaultOpininHtml =
    '<div class="flow-group mt-5">' +
    '    <ul class="col-xs-12 col-sm-1 col-md-1 text-right flow-box-left mt-5">' +
    '        <li class="row"><p>默认意见：</p></li>' +
    '    </ul>' +
    '    <ul class="col-xs-12 col-sm-11 col-md-11 text-left text-lightgray flow-box-right" style="padding: 0">' +
    '        <select id="defaultOpinions" class="form-control input-sm">' +
    '        </select>' +
    '    </ul>' +
    '</div>';

com.sinoprof.workflow.dialog.defaultOpinin = null;

com.sinoprof.workflow.dialog.submitForm = {
    sfActObj: {
        actionType: "1",
        flowAppId: -1,
        flowAppName: "",
        actId: "",
        handleGroup: "",
        keyWord: "",
        subject: "",
        appDataKeyId: "",
        nextFlowCode: "",
        nextTaskName: "",
        nextGroupName: "",
        nextUserLoginName: "",
        opinion: ""
    },
    onSubmitValidateFun: {},
    onSubmitCallBackFun: {},
    onSaveCallBackFun: {},
    interval: 0,
    selectNextFlow: function (param) {
        // 等待选择流程组别
        clearInterval(com.sinoprof.workflow.dialog.submitForm.interval);
        com.sinoprof.workflow.dialog.submitForm.interval = setInterval(function () {
            var sfGroup = $("#sf_group").val();
            if (sfGroup != null && sfGroup !== undefined && sfGroup !== "" && sfGroup.indexOf("*") === -1) {
                clearInterval(com.sinoprof.workflow.dialog.submitForm.interval);
                com.sinoprof.workflow.dialog.submitForm.selectNextFlow2(param);
            }
        }, 100);
    },
    selectNextFlow2: function () {
        var parameters = $.extend(true, {appEntity: "nil"}, arguments[0]);
        this.onSubmitCallBackFun = function (result) {
            if (parameters.callbackFun) {
                parameters.callbackFun(result);
            }
        };
        this.onSubmitValidateFun = function (result) {
            if (parameters.validateFun) {
                return parameters.validateFun(result);
            } else {
                return true;
            }
        };

        var applObj = parameters.appEntity;
        applObj.sf_appColumn4 = $("#sf_appColumn4").val();

        this.sfActObj.actId = $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup = $('#sf_handlerGroup').val();
        this.sfActObj.copyFlag = $('#sf_copyFlag').val();
        this.sfActObj.taskName = $('#sf_taskname').val();

        var actObj = this.sfActObj;
        var $flowSelectModal = $(com.sinoprof.workflow.dialog.flowSelectHtml.replace("@taskName@", this.sfActObj.taskName));
        $flowSelectModal.appendTo('body');
        // 常用意见
        this.setCommonOpinions($flowSelectModal);
        // 抄送
        this.initFlowCopy(this.sfActObj.copyFlag, $flowSelectModal);
        // 输入框计数
        $flowSelectModal.find('[data-toggle="text-count"]').each(function () {
            com.sinoprof.workflow.dialog.submitForm.statInputNum($(this).find("textarea"), $(this).find(".text-count-word"));
        });
        // 获取流向列表
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getFlowListWithJson",
            data: {actObj: JSON.stringify(actObj), applObj: JSON.stringify(applObj)},
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.code !== "0") {
                    hideSinoWaiting();
                    alert(data.message);
                    return;
                }
                var $nextFlowSelectDiv = $("#nextFlowSelectDiv");
                $nextFlowSelectDiv.empty();
                // 传入flowCode可以指定流向
                var flowCodeMap = null;
                if (applObj.flowCode != null && applObj.flowCode !== "") {
                    flowCodeMap = new Map();
                    var flowCodeArray = applObj.flowCode.split(";");
                    for (var i = 0; i < flowCodeArray.length; i++) {
                        flowCodeMap.put(flowCodeArray[i], flowCodeArray[i]);
                    }
                }
                $.each(data.data,
                    function (index, item) {
                        if (flowCodeMap != null && !flowCodeMap.contains(item.flowCode)) {
                            return;
                        }
                        var htmlStr = '<div class="col-xs-12 col-sm-4 col-md-4"'
                            + ' style="padding:0; cursor: auto;">'
                            + '<input type="radio" id="flowCode' + item.flowCode + '" name="flowCode"'
                            + '  style="margin: 4px 0; cursor: pointer; width:8%; vertical-align: top;"'
                            + '  splitNextTaskName="' + item.splitNextTaskName
                            + '" splitNextLineCount="' + item.splitNextLineCount
                            + '" flowCode="' + item.flowCode
                            + '" flowDesc="' + item.flowDesc
                            + '" trayType="' + item.trayType
                            + '" flowType="' + item.flowType
                            + '" nextUserRequired="' + item.nextUserRequired
                            + '" hint="' + item.hint
                            + '" taskName="' + item.taskName
                            + '"/><label for="flowCode' + item.flowCode + '" style="width: 90%; cursor: pointer;">' + item.flowDesc + '</label></div>';
                        $nextFlowSelectDiv.append($(htmlStr));
                    }
                );
                $flowSelectModal.modal("adjustDialog");

                // 点击流向事件
                var flowList = $nextFlowSelectDiv.find("input:radio");
                flowList.on("click", function () {
                    //ly TODO 这里写是否需要退回信息的代码
                    var flowCode = $(this).attr("flowCode");
                    var splitNextTaskName = $(this).attr("splitNextTaskName");
                    var splitNextLineCount = $(this).attr("splitNextLineCount");
                    var hint = $(this).attr("hint");
                    if (com.sinoprof.workflow.dialog.defaultOpinin) {
                        hint = com.sinoprof.workflow.dialog.defaultOpinin;
                    }
                    //ly
                    $.ajax({
                        url: "app/api-flow/def/getFlexValueSetName",
                        data: {
                            projectName: $("#sf_project").val(),
                            procedureName: $("#sf_procedure").val(),
                            taskName: $("#sf_taskname").val(),
                            flowCode: $(this).attr("flowCode")
                        },
                        dataType: "JSON",
                        async: false,
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                        },
                        success: function (data) {
                            if (data.returnCode == "0") {
                                $("#returnReason").show();
                                var $returnOpinions = $flowSelectModal.find("#returnOpinions");
                                $returnOpinions.append("<option value=''>请选择退回原因</option>");
                                hideSinoWaiting();
                                if (data.returnData != null) {
                                    $.each(data.returnData, function (index, item) {
                                        $returnOpinions.append("<option value='" + item.code + "'>" + item.value + "</option>")
                                    });
                                }
                                $returnOpinions.selectpicker("refresh");
                            }

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            // BootstrapDialog.alert("获取退回原因失败。");
                        }
                    });


                    setOpinions($flowSelectModal, hint);
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.nextFlowCode = flowCode;
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName = $(this).attr("taskName");
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.hint = hint;
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.nextUserRequired = $(this).attr("nextUserRequired");

                    com.sinoprof.workflow.dialog.submitForm.sfActObj.trayType = $(this).attr("trayType");
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.flowType = $(this).attr("flowType");
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.splitNextTaskName = splitNextTaskName;
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.splitNextLineCount = splitNextLineCount;
                    var nextFlowSelect = $(this).attr("flowDesc");

                    var actObj = com.sinoprof.workflow.dialog.submitForm.sfActObj;
                    $(".flow-prompt").hide();
                    var $flowState = $(".flow-state");
                    var $flowList = $flowState.children("div:first");
                    $flowList.html("");
                    if (actObj.nextUserRequired === "Y") {
                        // 选择下一办理人
                        if ($(this).attr("taskName") === "SPLIT") {
                            com.sinoprof.workflow.dialog.submitForm.addParallelFlows(actObj, applObj);
                        } else {
                            actObj.splitNextTaskName = "";
                            actObj.parallelFlowCode = "";
                            com.sinoprof.workflow.dialog.submitForm.processFlowUsers(actObj, applObj, nextFlowSelect);
                            //test songyt
                            // $(".e2").get(0).selectedIndex=-1;
                            // $('.select2-selection__rendered').text('');
                            // $('.select2-selection__rendered').attr('user','');

                        }
                    }
                    $flowState.show();
                    $flowSelectModal.modal("adjustDialog");
                });
                // 如果只有一个流向，默认选中
                if (flowList.length === 1) {
                    flowList[0].click();
                } else {
                    // 默认选中第一个正向流向
                    var isSelect = false;
                    flowList.each(function () {
                        if (isSelect) {
                            return;
                        }
                        var flowCode = $(this).attr("flowCode");
                        if (flowCode.indexOf("M") !== -1 || flowCode.indexOf("F") !== -1) {
                            $(this).click();
                            isSelect = true;
                        }
                    })
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideSinoWaiting();
                alert("获取流向异常！" + textStatus + XMLHttpRequest.status);
            }
        });

        $flowSelectModal.on("hidden.bs.modal", function () {
            $flowSelectModal.remove();
        });

        $("#flowBtnCancel").bind("click", function () {
            $flowSelectModal.modal('hide');
        });

        $("#flowBtnOK").bind("click", function () {
            if (isEmpty(com.sinoprof.workflow.dialog.submitForm.sfActObj.nextFlowCode)) {
                alert("请选择下一流向！");
                return;
            }
            if (com.sinoprof.workflow.dialog.submitForm.sfActObj.nextUserRequired === "Y") {
                var userSelected = true;
                $(".flow-state").find("div:first .select2.select2-container").each(function () {
                    if ($(this).find(".select2-selection__choice,.select2-selection--single span[user]").length === 0) {
                        userSelected = false;
                        var flow = $(this).parents(".flow-group").prev().find("h3").text();
                        alert("流向：" + flow + "，请选择下一办理人！");
                    }
                });
                if (!userSelected) {
                    return;
                }
            }
            var opinion = $('textarea[name=Content]').val();
            if (opinion.length === 0) {
                alert("请输入审批意见。");
                return;
            }
            if (opinion.length > 500) {
                alert("审批意见不能超过500字。");
                return;
            }
            if (com.sinoprof.workflow.dialog.submitForm.submitFlow()) {
                $flowSelectModal.modal('hide');
                showSinoWaiting();
            }else{
                $flowSelectModal.modal('hide');
            }
        });
        $flowSelectModal.modal({backdrop: 'static'});
    },
    deliver: function () {
        // 转发
        var applObj = {};
        var actObj = this.sfActObj;
        actObj.actionType = "3"; // 转发
        actObj.actId = $('#sf_actID').val();
        actObj.flowAppId = $('#sf_appID').val();
        actObj.handleGroup = $('#sf_handlerGroup').val();
        actObj.copyFlag = $('#sf_copyFlag').val();
        actObj.taskName = $('#sf_taskname').val();
        actObj.currentGroupName = $('#sf_group').val();
        actObj.nextGroupName = actObj.currentGroupName;
        actObj.groupCount = 1;
        actObj.splitNextTaskName = "";
        actObj.parallelFlowCode = "";
        actObj.nextUserRequired = "Y";
        actObj.isMulti = false;

        var $flowSelectModal = $(com.sinoprof.workflow.dialog.deliverHtml.replace("@taskName@", actObj.taskName));
        $flowSelectModal.appendTo('body');
        // 输入框计数
        $flowSelectModal.find('[data-toggle="text-count"]').each(function () {
            com.sinoprof.workflow.dialog.submitForm.statInputNum($(this).find("textarea"), $(this).find(".text-count-word"));
        });

        var $flowSelected = $(com.sinoprof.workflow.dialog.flowSelectedHtml);
        var $flowState = $(".flow-state");
        $flowState.children("div:first").append($flowSelected);
        $flowSelected.find(".flow-title h3").html("<i class='fa fa-circle'></i>转交办理人</h3>");
        //  加载下拉框
        var $userSelect = $flowSelected.find("select");
        $userSelect.prop("multiple", false).addClass("e2");
        $userSelect.parent().parent().addClass("select-single");
        $userSelect.attr("splitNextTaskName", actObj.splitNextTaskName);
        $userSelect.attr("parallelFlowCode", actObj.parallelFlowCode);
        var $groupOpt = $("<optgroup label='" + actObj.currentGroupName + "'></optgroup>");
        $userSelect.append($groupOpt);

        $.ajax({
            url: "app/api-flow/ui/getDeliverUsers",
            data: {
                projectName: $("#sf_project").val(),
                groupName: actObj.currentGroupName,
                roleName: $("#sf_role").val()
            },
            dataType: "JSON",
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.data != null) {
                    var userOption = "";
                    $.each(data.data, function (index, item) {
                        if (item.userLoginName === "error") {
                            alert(item.userDispName);
                            return;
                        }
                        userOption += "<option  group='" + actObj.currentGroupName + "' value='" + item.loginName + "'>" + item.username + "</option>";
                    });
                    $groupOpt.append(userOption);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BootstrapDialog.alert("获取转交人员列表失败。");
            }
        });
        $userSelect.val("").select2({
            placeholder: "请输入姓名或者点击右侧图标选择人员",
            closeOnSelect: !actObj.isMulti
        });
        $flowSelected.find(".input-group-addon").css("cursor", "pointer").click(function () {
            $userSelect.select2("open");
        });
        setTimeout(function () {
            $userSelect.select2("open");
            $("span.select2-results.menulist>ul>li>button").each(
                function () {
                    $(this).click();
                }
            );
        }, 500);
        $flowState.show();
        $flowSelectModal.modal("adjustDialog");
        $flowSelectModal.on("hidden.bs.modal", function () {
            $flowSelectModal.remove();
        });

        $("#flowBtnCancel").bind("click", function () {
            $flowSelectModal.modal('hide');
        });

        $("#flowBtnOK").bind("click", function () {
            var userSelected = true;
            $(".flow-state").find("div:first .select2.select2-container").each(function () {
                if ($(this).find(".select2-selection__choice,.select2-selection--single span[user]").length === 0) {
                    userSelected = false;
                    var flow = $(this).parents(".flow-group").prev().find("h3").text();
                    alert("请选择转交办理人！");
                }
            });
            if (!userSelected) {
                return;
            }
            var opinion = $('textarea[name=Content]').val();
            if (opinion.length === 0) {
                alert("请输入转交意见。");
                return;
            }
            if (opinion.length > 500) {
                alert("转交意见不能超过500字。");
                return;
            }
            actObj.opinion = opinion;

            //指定到单人
            var $selection = $(".select2-selection--single .select2-selection__rendered");
            actObj.nextGroupName = $selection.attr("group");
            actObj.nextUserLoginName = $selection.attr("user");

            actObj.currentUserId = getUser().id;
            actObj.appDataKeyId = sf_act_info.sfactApplId;
            actObj.keyWord = sf_act_info.sfactApplColumn1;
            actObj.subject = sf_act_info.sfactApplColumn2;
            setSplitOpinion(actObj);
            var workflowJson = JSON.stringify(actObj);
            //下面这句话。针对于IE8，比较低的小版本bug.
            workflowJson = workflowJson.replace(new RegExp("null", "gm"), "");
            $("#sf_appFieldValue").val(workflowJson);
            // TODO 流程转交
            var _flowBtnOK = this;
            _flowBtnOK.disabled = true;

            $.ajax({
                url: "app/api-flow/ui/deliver",
                data: {sf_appFieldValue: workflowJson},
                dataType: "JSON",
                async: false,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                },
                success: function (data) {
                    alert("流程转交成功。");
                    sinoFlowClose();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    BootstrapDialog.alert("流程转交失败。");
                    _flowBtnOK.disabled = false;
                }
            });
        });

        $flowSelectModal.modal({backdrop: 'static'});
    },
    processFlowUsers: function (actObj, applObj, nextFlowSelect) {
        //每次点击节点都重置是否可删除用户的状态
        canDelUser = true;
        var $flowSelected = $(com.sinoprof.workflow.dialog.flowSelectedHtml);
        $(".flow-state").children("div:first").append($flowSelected);
        $flowSelected.find(".flow-title h3").html("<i class='fa fa-circle'></i>" + nextFlowSelect + "</h3>");
        //  加载下拉框
        var $userSelect = $flowSelected.find("select");
        // 并发 或者 角色工作栏，且不分发 的时候，人员为多选
        // update by shangguan 2019.11.26 改为只有并发的时候人员才为多选，其他默认都为单选
        //var isMulti = actObj.nextTaskName === "SPLIT" || (actObj.trayType === "0" && actObj.flowType === "0");
        var isMulti = actObj.nextTaskName === "SPLIT";
        actObj.isMulti = isMulti;
        //ly 如果是小组会签，不能删除选中的人员 task 10497
        if (actObj.nextTaskName === "SPLIT") {
            if (($("#sf_task_attribute1").val().indexOf("usereadonly") > -1) || ($("#sf_task_attribute2").val().indexOf("usereadonly") > -1) || ($("#sf_task_attribute3").val().indexOf("usereadonly") > -1) || ($("#sf_task_attribute4").val().indexOf("usereadonly") > -1) || ($("#sf_task_attribute5").val().indexOf("usereadonly") > -1)) {
                canDelUser = false;
            }
        }
//ly
        $userSelect.prop("multiple", isMulti).addClass(isMulti ? "e1" : "e2");
        if (!isMulti) {
            $userSelect.parent().parent().addClass("select-single");
        }
        $userSelect.attr("splitNextTaskName", actObj.splitNextTaskName);
        $userSelect.attr("parallelFlowCode", actObj.parallelFlowCode);
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getGroupListWithJson",
            data: {
                actObj: JSON.stringify(actObj),
                applObj: JSON.stringify(applObj),
                parallelFlowCode: actObj.parallelFlowCode
            },
            dataType: "json",
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.code !== "0") {
                    hideSinoWaiting();
                    alert(data.message);
                    return;
                }
                $.each(data.data, function (index, item) {
                    if (item.groupName === "error") {
                        alert(item.groupDese);
                        return;
                    }
                    var $groupOpt = $("<optgroup label='" + item.deptName + "'></optgroup>");
                    $userSelect.append($groupOpt);
                    actObj.nextGroupName = item.groupName;
                    actObj.groupCount = data.data.length;
                    com.sinoprof.workflow.dialog.submitForm.addGroupUsers(actObj, applObj, $groupOpt);
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideSinoWaiting();
                alert("获取流程组别异常！" + textStatus + XMLHttpRequest.status);
            }
        });

        // 默认展开人员列表
        var isDefaultOpen = true;
        if ($userSelect.find("option").length === 1) {
            // 只有一个人时默认选中
            $userSelect.val($userSelect.find("option").val());
            isDefaultOpen = false;
        } else if (!actObj.isMulti) {
            // 单选时默认不选中（不处理会默认选第一个人）
            $userSelect.val("");
        } else if ($userSelect.find("option:selected").length > 0) {
            // 已设置默认选中，不展开列表
            isDefaultOpen = false;
        }
        $userSelect.select2({
            placeholder: "请输入姓名或者点击右侧图标选择人员",
            closeOnSelect: !actObj.isMulti
        });
        $flowSelected.find(".input-group-addon").css("cursor", "pointer").click(function () {
            if (canDelUser) {
                $userSelect.select2("open");
            }

        });

        if (isDefaultOpen) {
            setTimeout(function () {
                $userSelect.select2("open");
                $("span.select2-results.menulist>ul>li>button").each(
                    function () {
                        $(this).click();
                    }
                );
            }, 500);
        }
    },
    addGroupUsers: function (actObj, applDataObj, $groupOpt) {
        var nextGroupName = actObj.nextGroupName;
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getUserListWithJson",
            data: {actObj: JSON.stringify(actObj), applObj: JSON.stringify(applDataObj), parallelFlowCode: ''},
            dataType: "json",
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.code !== "0") {
                    hideSinoWaiting();
                    alert(data.message);
                    return;
                }
                var userOption = "";
                $.each(data.data, function (index, item) {
                    if (item.userLoginName === "error") {
                        alert(item.userDispName);
                        return;
                    }
                    // 默认选中
                    //ly 默认选择所有人员 ，会签不需要根据defaultSel来默认选中 :task 10497
                    //alert(JSON.stringify(item));
                    // if(actObj.nextTaskName=="SPLIT"){
                    //   var selected ="selected";
                    //   }else{
                    //  var selected = item.defaultSel === "Y" ? "selected" : "";
                    //  }
                    var selected = item.defaultSel === "Y" ? "selected" : "";
                    // var selected = "selected" ;
                    userOption += "<option " + selected + " group='" + nextGroupName + "' value='" + item.userLoginName + "'>" + item.userDispName + "</option>";
                });
                $groupOpt.append(userOption);
            },
            error: function () {
                alert("获取流程办理人员异常。");
            }
        });

    },
    addParallelFlows: function (actObj, applObj) {
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getParallelFlowListWithJson",
            data: {actObj: JSON.stringify(actObj), applObj: JSON.stringify(applObj)},
            async: false,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.code !== "0") {
                    hideSinoWaiting();
                    alert(data.message);
                    return;
                }
                $.each(data.data, function (index, item) {
                    actObj.splitNextTaskName = item.taskName;
                    actObj.parallelFlowCode = item.flowCode;
                    com.sinoprof.workflow.dialog.submitForm.processFlowUsers(actObj, applObj, item.flowDesc);
                });
            },
            error: function () {
                alert("获取并流流向异常。");
            }
        });
    },
    addParallelTask: function () {
        var arrNextTasks = [];
        $(".flow-state").find("div:first .select2.select2-container").each(function () {
            var nextTask = {};
            nextTask.taskName = $(this).prev().attr("splitNextTaskName");
            nextTask.flowCode = $(this).prev().attr("parallelFlowCode");
            var groupName = "";
            var userLoginName = "";
            $(this).find(".select2-selection__choice").each(function () {
                groupName += ";" + $(this).attr("group");
                userLoginName += ";" + $(this).attr("user");
            });
            nextTask.groupName = groupName.substr(1);
            nextTask.userLoginName = userLoginName.substr(1);
            arrNextTasks.push(nextTask);
        });
        return arrNextTasks;
    },
    submitFlow: function () {
        this.sfActObj.actionType = "1";  //1 提交 2 退回 3 转发
        this.sfActObj.actId = $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup = $('#sf_handlerGroup').val();
        this.sfActObj.currentGroupName = $('#sf_group').val();
        this.sfActObj.opinion = $('textarea[name=Content]').val();
        if (this.sfActObj.opinion.length > 500) {
            alert("审批意见不能超过500字。");
            return false;
        }
        this.sfActObj.saveOpinion = $('#saveCommonOpinion')[0].checked ? "Y" : "N";

        // 下一办理人
        if (this.sfActObj.nextTaskName === "SPLIT") {
            // 分流
            this.sfActObj.nextGroupName = "";
            this.sfActObj.nextUserLoginName = "";
            this.sfActObj.nextParallelTaskList = com.sinoprof.workflow.dialog.submitForm.addParallelTask();
        } else {
            if (this.sfActObj.trayType === "0" && this.sfActObj.flowType === "0") {
                //角色工作栏，且不分发
                var userStr = "";
                var userGroup = "";
                $(".select2-selection__choice").each(function () {
                    if (userStr === "") {
                        userStr = $(this).attr("user");
                    } else {
                        userStr = userStr + ";" + $(this).attr("user");
                    }
                    userGroup = $(this).attr("group");
                });
                this.sfActObj.nextGroupName = userGroup;
                this.sfActObj.nextUserLoginName = userStr;
            } else {
                //指定到单人
                var $selection = $(".select2-selection--single .select2-selection__rendered");
                this.sfActObj.nextGroupName = $selection.attr("group");
                this.sfActObj.nextUserLoginName = $selection.attr("user");
            }
        }
        // 抄送人
        var $flowState = $(".flow-state");
        var $flowCopyUser = $flowState.find("[name=flowCopyUser]").parents(".select2-selection__rendered").find(".select2-selection__choice");
        if ($flowCopyUser.length > 0) {
            var flowCopyUser = "";
            $flowCopyUser.each(function () {
                flowCopyUser = ";" + $(this).attr("user");
            });
            this.sfActObj.flowCopyUser = flowCopyUser.substr(1);
            this.sfActObj.flowCopyMsg = $flowState.find("[name=flowCopyMsg]").val();
        }
        setSplitOpinion(this.sfActObj);
        var workflowJson = JSON.stringify(this.sfActObj);
        //下面这句话。针对于IE8，比较低的小版本bug.
        workflowJson = workflowJson.replace(new RegExp("null", "gm"), "");
        $("#sf_appFieldValue").val(workflowJson);

        //workflowObj.appEntity = parameters.appEntity;
        if (this.onSubmitValidateFun(this.sfActObj) === false) {
            return false;
        } else {
            this.onSubmitCallBackFun(this.sfActObj);
            return true;
        }
    },
    saveFlow: function () {
        var parameters = $.extend(true, {appEntity: "nil"}, arguments[0]);
        this.onSaveCallBackFun = function (result) {
            if (parameters.callbackFun) {
                parameters.callbackFun(result);
            }
        };

        this.sfActObj.actionType = "1";  //1 提交 2 退回 3 转发,4
        this.sfActObj.actId = $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup = $('#sf_handlerGroup').val();
        this.sfActObj.currentGroupName = $('#sf_group').val();
        this.sfActObj.opinion = $('#Content').val();
        setSplitOpinion(this.sfActObj);
        var workflowJson = JSON.stringify(this.sfActObj);
        //下面这句话。针对于IE8，比较低的小版本bug.
        workflowJson = workflowJson.replace(new RegExp("null", "gm"), "");
        $("#sf_appFieldValue").val(workflowJson);
        this.onSaveCallBackFun(this.sfActObj);
    },
    setCommonOpinions: function ($flowSelectModal) {
        var $commonOpinions = $flowSelectModal.find("#commonOpinions");
        $commonOpinions.empty();

        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getCommonOpinionsWithJson",
            data: {},
            async: false,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                $commonOpinions.append("<option value=''>请选择常用意见</option>");
                if (data.code == '0') {
                    for (var i = 0; i < data.data.length; i++) {
                        $commonOpinions.append("<option value='" + data.data[i] + "'>" + data.data[i] + "</option>")
                    }
                }
                $commonOpinions.change(function () {
                    $flowSelectModal.find("#Content").val($(this).val()).trigger('propertychange');
                });
                $commonOpinions.selectpicker("refresh");
            },
            error: function () {
                alert("获取常用意见异常。");
            }
        });
    },
    initFlowCopy: function (copyFlag, $flowSelectModal) {
        // 抄送
        if (copyFlag !== "1") {
            $flowSelectModal.find("input[name=flowCopyUser]").parents(".flow-group").hide();
            return;
        }
        // $flowSelectModal.find("[name=flowCopyMsg]").selectpicker("refresh");
        $flowSelectModal.find("input[name=flowCopyUser]").on("keydown", function (event) {
            var $ac = $(this).autocomplete("instance");
            if (event.keyCode === $.ui.keyCode.TAB &&
                $ac.menu.active) {
                event.preventDefault();
            } else if (event.keyCode === $.ui.keyCode.ENTER &&
                !$ac.menu.active) {
                $ac.menu.next();
                event.preventDefault();
            }
        }).on("focusout", function () {
            this.value = "";
        }).autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: "post",
                    url: "app/api-flow/ui/getCopyUserByName",
                    data: {userName: request.term},
                    dataType: "json",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                    },
                    success: response
                });
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                if ($(this).parents(".select2-selection__rendered").find(".select2-selection__choice[user='" + ui.item.LOGIN_NAME + "']").length > 0) {
                    this.value = "";
                    return false;
                }
                //liuyong
                var $selectionHtml = $("<li class=\"select2-selection__choice\" title=\"" + ui.item.USERNAME + "\"" +
                    " user=\"" + ui.item.LOGIN_NAME +
                    "\"><span class=\"select2-selection__choice__remove\" role=\"presentation\">×</span>" + ui.item.USERNAME + "</li>");

                $(this).parent().before($selectionHtml);
                $selectionHtml.find(".select2-selection__choice__remove").click(function () {
                    $(this).parent().remove();
                });

                //liuyong


                this.value = "";
                return false;
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>").append(item.USERNAME + "(" + item.GROUP_NAME + ")").appendTo(ul);
        };
    },
    statInputNum: function (textArea, numItem) {
        // 剩余字数统计
        var max = numItem.text(),
            curLength;
        textArea[0].setAttribute("maxlength", max);
        curLength = textArea.val().length;
        numItem.text(max - curLength);
        textArea.on('input propertychange', function () {
            numItem.text(max - $(this).val().length);
        });
    }
};

// 设置默认意见
function setOpinions($flowSelectModal, hint) {
    var $Content = $flowSelectModal.find("#Content");
    var $defaultOpinions = $flowSelectModal.find("#defaultOpinions");
    if (hint.indexOf("#") !== -1) {
        if ($defaultOpinions.length === 0) {
            var $commonOpinions = $flowSelectModal.find("#commonOpinions");
            var $defaultOpinionDiv = $(com.sinoprof.workflow.dialog.defaultOpininHtml);
            $commonOpinions.parents(".flow-group").after($defaultOpinionDiv);
            $defaultOpinions = $defaultOpinionDiv.find("#defaultOpinions");
        }
        $defaultOpinions.empty();
        $defaultOpinions.append("<option value=''>请选择默认意见</option>");
        var hintArray = hint.split("#");
        for (var i = 0; i < hintArray.length; i++) {
            $defaultOpinions.append("<option value='" + hintArray[i] + "'>" + hintArray[i] + "</option>");
        }
        $defaultOpinions.change(function () {
            $Content.val($(this).val()).trigger('propertychange');
        });
        $defaultOpinions.selectpicker("refresh");
    } else {
        if ($defaultOpinions.length > 0) {
            $defaultOpinions.parents(".flow-group").remove();
        }
        $Content.val(hint).trigger('propertychange');
    }
}

function setDefaultOpinion(opinion) {
    com.sinoprof.workflow.dialog.defaultOpinin = opinion;
    $("#flowSelectModal").find("#Content").val(opinion);
}

// 在选人控件中设置需要返回的属性，设置在已选对象的属性中
function setSelectionAttr(element, $selection) {
    var $element = $(element);
    $selection.attr("group", $element.attr("group"));
    $selection.attr("user", $element.attr("value"));
}

// function sinoFlowClose() {
//     showSinoWaiting();
//     // if (window.opener && window.opener.closed == false && window.opener.do_refresh) {
//     //     window.opener.do_refresh();
//     //     //open()打开，刷新父页面
//     //     window.opener.location.href = window.opener.location.href;
//     // }
//     try{
//         if(window.opener && window.opener.closed == false && window.opener.do_refresh){
//             window.opener.do_refresh();
//             //open()打开，刷新父页面
//             window.opener.location.href = window.opener.location.href;
//         }
//     }catch(e){
//     }
//     //回刷OA门户首页  pengjian+  2019-12-02
//     if(window.opener && window.opener.closed == false){
//         var fromPortal = getParam("from_portal");
//         if(nullToEmpty(fromPortal) == "1"){//从门户首页统一待办列表打开的待办、待阅、草稿链接会在url最后面拼接from_portal=1
//             document.domain="gz.cmcc";
//             window.opener.location.reload();
//         }else if(nullToEmpty(fromPortal) == "2"){//从“更多”页面打开的待办、待阅、草稿链接会在url最后面拼接from_portal=2
//             document.domain="gz.cmcc";
//             window.opener.reloadList();
//         }
//     }
//     window.close();
// }
function sinoFlowClose() {
    showSinoWaiting();
    try{
        var fromPortal = getParam("from_portal");
        //回刷OA门户首页  pengjian+  2019-12-02
        if(nullToEmpty(fromPortal)!=''){
            if(window.opener && window.opener.closed == false){
                if(nullToEmpty(fromPortal) == "1"){//从门户首页统一待办列表打开的待办、待阅、草稿链接会在url最后面拼接from_portal=1
                    document.domain="js.cmcc";
                    window.opener.location.reload();
                }else if(nullToEmpty(fromPortal) == "2"){//从“更多”页面打开的待办、待阅、草稿链接会在url最后面拼接from_portal=2
                    document.domain="js.cmcc";
                    window.opener.reloadList();
                }
            }
            if(nullToEmpty(window.opener)==''){
                window.open("","_self");
                window.close();
                if(window){
                    window.location.href="about:blank";
                }
            }else{
                window.close();
            }
        }else{
            try {
                sinoFlowCloseIframe();
            }catch (e) {
                //如果关闭代办异常说明，当前没有通过供应链系统关闭代办，则直接关闭当前打开的页面
                window.close();
            }
        }
    }catch(e){
        if(nullToEmpty(window.opener)==''){
            window.open("","_self");
            window.close();
            if(window){
                window.location.href="about:blank";
            }
        }else{
            window.close();
        }
    }
}

// 会签内意见保存在appColumn4
function setSplitOpinion(actObj) {
    if (sf_act_info.sfactTaskCtl != "2") {
        // 仅在流程编辑器内任务控制设置为“会签”的才加载
        // 清空appColumn4，防止复制 ,web端清空appColumn6：MOA审批标识
        actObj.appDataArr = ["", "", "", "", "", "", " ", "", " ", "", "", ""];
        return;
    }
    var splitOpinion = $("#sf_appColumn4").val();
    if (splitOpinion) {
        actObj.appDataArr = ["", "", "", "", "", "", splitOpinion, "", "", "", "", ""];
    }
}

//是否可以删除会签人员
var canDelUser = true;
