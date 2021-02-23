/**
 * 流程提交对话框
 */
$.namespace("com.sinoprof.workflow.dialog");
$.fn.modal.Constructor.prototype.enforceFocus = function () {};
// 流向模态框
com.sinoprof.workflow.dialog.flowSelectHtml =
    '<div class="modal fade sino-box" id="flowSelectModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '<div class="modal-dialog flow-modal" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h3 class="modal-title" style="text-align: left;"> 当前流程节点：@taskName@</h3>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="sino-flow">' +
    '<div class="flow-last" style="display: none">' +
    '<div class="flow-group">' +
    '<div class="flow-group-title">上一环节</div>' +
    '<div class="flow-group-content flow-last-name">请总经理审批，包含附件部分</div>' +
    '</div>' +
    '<div class="flow-group" style="margin-top: 0;">' +
    '<div class="flow-group-title">办理意见</div>' +
    '<div class="flow-group-content flow-last-opinions">张某某-产品部经理 2019-05-08 16:25:41</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-proposal" style="display: none;">' +
    '<div class="flow-group">' +
    '<div class="flow-group-title">流向建议：</div>' +
    '<div class="flow-group-content">' +
    '<div class="flow-proposal-content">建议帮助说明，低于***请选择XXX流向，***-***之间请选择XXX流向，大于***请选择XXX流向，建议帮助说明建议帮助说明建议帮助说明建议帮助说明</div>' +
    '<a><i class="fa fa-chevron-up"></i></a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group" style="padding: 5px 25px">' +
    '<div class="flow-group-title">下一流向：</div>' +
    '<div class="flow-group-content" id="nextFlowSelectDiv">' +
    '</div>' +
    '</div>' +
    '<div class="flow-state">' +
    '<div class="flow-group">' +
    '<div class="flow-group-title">选办理人：</div>' +
    '<div class="flow-group-content" id="flowSelected">' +
    '</div>' +
    '</div>' +
    '<div class="flow-group" id="flowCopyUser">' +
    '<div class="flow-group-title">选阅知人：</div>' +
    '<div class="flow-group-content">' +
    '<div class="flow-person">' +
    '<div class="flow-person-title">' +
    '<div class="flow-person-title-left">已选阅知人</div>' +
    '<div class="flow-person-title-right">' +
    '<span>共<span class="flow-person-count">0</span>人</span>' +
    '<a><i class="fa fa-chevron-up"></i></a>' +
    '<button class="btn flowCopyAddBtn" type="button" data-toggle="modal" data-target="">添加人</button>' +
    '</div>' +
    '</div>' +
    '<div class="flow-person-list flowCopyPersonList">' + '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group" id="flowCopyMsg">' +
    '<div class="control-label flow-group-title">阅知信息：</div>' +
    '<div class="flow-group-content col-sm-12" style="padding: 0;" data-toggle="text-count">' +
    '<textarea name="flowCopyMsg" class="form-control" placeholder="请输入阅知信息"></textarea>' +
    '<span class="text-count"><var class="text-count-word">100</var>/100</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-opinions">' +
    '<div id="returnReason" style="display:none" class="flow-group">' +
    '<div class="flow-group-title">退回意见：</div>' +
    '<div class="flow-group-content">' +
    '<select id="returnOpinions" class="form-control input-sm"></select>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group" style="margin-top: 0;">' +
    '<div class="flow-group-title">常用意见：</div>' +
    '<div class="flow-group-content">' +
    '<select id="commonOpinions" class="form-control input-sm"></select>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group">' +
    '<div class="control-label flow-group-title">意见内容：</div>' +
    '<div class="flow-group-content col-sm-12" style="padding: 0;" data-toggle="text-count">' +
    '<textarea id="Content" name="Content" class="form-control" placeholder="请输入您的意见"></textarea>' +
    '<span class="text-count"><var class="text-count-word">500</var>/500</span>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group">' +
    '<div class="flow-group-title"></div>' +
    '<div class="flow-group-content">' +
    '<label for="saveCommonOpinion" class="checkbox" style="cursor: pointer;margin-left: 20px;">' +
    '<input type="checkbox" id="saveCommonOpinion" style="cursor: pointer;"> 设为常用' +
    '</label>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-prompt text-center text-red" style="display: none;">请选择“下一流向”</div>' +
    '<div class="flow-group-btn text-right">' +
    '<button id="flowBtnOK" type="button" class="btn btn-primary">确定</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

// 流向模态框-下一流向item
com.sinoprof.workflow.dialog.flowItemHtml =
    '<div class="flow-next-item">' +
    '<div class="flow-item-name">' +
    '<input type="radio" id="flowCode1" name="flowCode"' +
    'style="margin: 4px 0; cursor: pointer; vertical-align: top;" />' +
    '<label class="flow-item-name flowName" for="flowCode1" style="cursor: pointer;"><i' +
    'class="icon icon-danliu"></i><span>一二三四五六七八九十</span></label>' +
    '</div>' +
    '<div class="flow-point" style="display:none;">' +
    '<div class="flow-progress">' +
    '<div class="progress-bg"></div>' +
    '<div class="progress-font" style="width: 50%"></div>' +
    '</div>' +
    '<span class="progress-label">85%</span>' +
    '<div class="flow-badge-div">' +
    '<span class="flow-badge flow-default" style="display: none;">默认</span>' +
    '<span class="flow-badge flow-recommend" style="display: none;">推荐</span>' +
    '</div>' +
    '</div>' +
    '</div>';

// 流向模态框-已选人员list
com.sinoprof.workflow.dialog.flowSelectedHtml =
    '<div class="flow-person">' +
    '<div class="flow-person-title">' +
    '<div class="flow-person-title-left"><span class="flowName">流向名称</span>-已选办理人</div>' +
    '<div class="flow-person-title-right">' +
    '<span>共<span class="flowPersonCount">0</span>人</span>' +
    '<a><i class="fa fa-chevron-up"></i></a>' +
    '<button class="btn addBtn" type="button" data-toggle="modal" data-target="">添加人</button>' +
    '</div>' +
    '</div>' +
    '<div class="flow-person-list">' +
    '</div>' +
    '</div>';

// 流向模态框-已选人员item
com.sinoprof.workflow.dialog.flowSelectedPersonItemHtml =
    '<div class="flow-person-item">' +
    '<span class="name">张某某</span>' +
    '<span>-&nbsp;</span>' +
    '<span class="group">江苏/物资供应部</span>' +
    '<a><i class="fa fa-trash"></i></a>' +
    '</div>';

// 转交模态框
com.sinoprof.workflow.dialog.deliverHtml =
    '<div class="modal fade sino-box" id="deliverHtml" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '<div class="modal-dialog flow-modal" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h3 class="modal-title" style="text-align: left;"> 当前流程节点：@taskName@</h3>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="sino-flow">' +
    '<div class="flow-last" style="display: none">' +
    '<div class="flow-group">' +
    '<div class="flow-group-title">上一环节</div>' +
    '<div class="flow-group-content flow-last-name">请总经理审批，包含附件部分</div>' +
    '</div>' +
    '<div class="flow-group" style="margin-top: 0;">' +
    '<div class="flow-group-title">办理意见</div>' +
    '<div class="flow-group-content flow-last-opinions">张某某-产品部经理 2019-05-08 16:25:41</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group">' +
    '<div class="control-label flow-group-title">转交意见：</div>' +
    '<div class="flow-group-content col-sm-12" style="padding: 0;" data-toggle="text-count">' +
    '<textarea id="Content" name="Content" class="form-control" placeholder="请输入转交意见"></textarea>' +
    '<span class="text-count"><var class="text-count-word">100</var>/100</span>' +
    '</div>' +
    '</div>' +
    '<div class="flow-state">' +
    '<div class="flow-group">' +
    '<div class="flow-group-title">选办理人：</div>' +
    '<div class="flow-group-content" id="flowSelected">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group-btn text-right">' +
    '<button id="flowBtnOK" type="button" class="btn btn-primary">确定</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

// 选择办理人模态框
com.sinoprof.workflow.dialog.flowSelectPersonHtml =
    '<div class="modal fade sino-box flowSelectPersonModal" style="text-align: center;" id="selectPerson" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
    '<div class="modal-dialog flow-person-modal" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h3 class="modal-title"> 当前流程节点：@taskName@选择办理人</h3>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="sino-flow">' +
    '<div class="flow-person-selector-multi">' +
    '<div class="flow-person-selector">' +
    '<div>' +
    '<div class="flow-person-selector-title"><span class="typeTitle">选择办理人</span></div>' +
    '<div class="flow-person-selector-panel">' +
    '<div class="flow-person-selector-search">' +
    '<input />' +
    '<i class="fa fa-search"></i>' +
    '</div>' + '<div class="flow-person-selector-list allList">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<i class="fa fa-caret-right"></i>' +
    '<div>' +
    '<div class="flow-person-selector-title"><span>已选人员：</span><a class="clear"><i class="fa fa-trash"></i>清空</a></div>' +
    '<div class="flow-person-selector-panel">' +
    '<div class="flow-person-selector-list selectedList"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="flow-group-btn text-center" style="border-top: 1px solid rgb(166, 166, 166);">' +
    '<button type="button" class="btn btn-primary okBtn">确定</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

// 选择办理人模态框-部门列表
com.sinoprof.workflow.dialog.flowSelectPersonGroupHtml =
    '<div class="flow-person-selector-item">' +
    '<a class="flow-person-selector-item-group"><i class="fa fa-caret-down"></i><span class="groupName">江苏/物资供应部</span>（<span class="totalCount">4</span>）</a>' +
    '<div class="flow-person-selector-item-group-list"></div>' +
    '</div>';

// 选择办理人模态框-人物列表item
com.sinoprof.workflow.dialog.flowSelectPersonItemHtml =
    '<div class="flow-person-item">' +
    '<input type="checkbox" style="cursor: pointer;" id="flow-person-item1" name="flow-person-item1" value="1">' +
    '<label class="personName" for="flow-person-item1" style="cursor: pointer;margin-bottom: 0">张某某</label>' +
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
        // 刚打开时不自动弹人员选择
        var autoOpen = false;
        var parameters = $.extend(true, {
            appEntity: "nil"
        }, arguments[0]);
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
        this.addPrevActLog();
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
        showSinoWaiting();
        var getFlowListCB = function (data) {
            if (data.code !== "0") {
                hideSinoWaiting();
                BootstrapDialog.alert(data.message);
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
            $.each(data.data, function (index, item) {
                if (flowCodeMap != null && !flowCodeMap.contains(item.flowCode)) {
                    return;
                }
                var $flowItem = $(com.sinoprof.workflow.dialog.flowItemHtml);
                var $input = $flowItem.find('input[type=radio]');
                $input.attr('id', 'flowCode' + item.flowCode);
                $input.attr('splitNextTaskName', item.splitNextTaskName);
                $input.attr('splitNextLineCount', item.splitNextLineCount);
                $input.attr('flowCode', item.flowCode);
                $input.attr('flowDesc', item.flowDesc);
                $input.attr('trayType', item.trayType);
                $input.attr('flowType', item.flowType);
                $input.attr('nextUserRequired', item.nextUserRequired);
                $input.attr('hint', item.hint);
                $input.attr('taskName', item.taskName);
                if (item.taskName == 'SPLIT') {
                    $flowItem.find('.flowName .icon').removeClass('icon-danliu').addClass('icon-fenliu');
                }
                $input.parent().find('label').attr('for', 'flowCode' + item.flowCode);
                $flowItem.find('.flowName span').html(item.flowDesc);
                // 还需要设置被选择次数百分比、是否默认，是否推荐
                $nextFlowSelectDiv.append($flowItem);
            });
            $flowSelectModal.modal("adjustDialog");

            // 点击流向事件
            var flowList = $nextFlowSelectDiv.find("input:radio");
            flowList.on("click", function () {
                //ly TODO 这里写是否需要退回信息的代码
                showSinoWaiting();
                var flowCode = $(this).attr("flowCode");
                var splitNextTaskName = $(this).attr("splitNextTaskName");
                var splitNextLineCount = $(this).attr("splitNextLineCount");
                var hint = $(this).attr("hint");
                if (com.sinoprof.workflow.dialog.defaultOpinin) {
                    hint = com.sinoprof.workflow.dialog.defaultOpinin;
                }
                //ly
                var that = this;
                var getFlexValueSetNameCB = function (data) {
                    if (data.returnCode == "0") {
                        $("#returnReason").show();
                        var $returnOpinions = $flowSelectModal.find("#returnOpinions");
                        $returnOpinions.append("<option value=''>请选择退回原因</option>");
                        if (data.returnData != null) {
                            $.each(data.returnData, function (index, item) {
                                $returnOpinions.append("<option value='" + item.code + "'>" + item.value + "</option>")
                            });
                        }
                        $returnOpinions.selectpicker("refresh");
                    }
                    setOpinions($flowSelectModal, hint);
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.nextFlowCode = flowCode;
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName = $(that).attr("taskName");
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.hint = hint;
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.nextUserRequired = $(that).attr("nextUserRequired");

                    com.sinoprof.workflow.dialog.submitForm.sfActObj.trayType = $(that).attr("trayType");
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.flowType = $(that).attr("flowType");
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.splitNextTaskName = splitNextTaskName;
                    com.sinoprof.workflow.dialog.submitForm.sfActObj.splitNextLineCount = splitNextLineCount;
                    var nextFlowSelect = $(that).attr("flowDesc");

                    var actObj = com.sinoprof.workflow.dialog.submitForm.sfActObj;
                    $(".flow-prompt").hide();
                    var $flowState = $(".flow-state").hide();
                    var $flowList = $("#flowSelected");
                    $flowList.html("");
                    if (actObj.nextUserRequired === "Y") {
                        // 选择下一办理人
                        if ($(that).attr("taskName") === "SPLIT") {
                            com.sinoprof.workflow.dialog.submitForm.addParallelFlows(actObj, applObj, autoOpen);
                        } else {
                            actObj.splitNextTaskName = "";
                            actObj.parallelFlowCode = "";
                            com.sinoprof.workflow.dialog.submitForm.processFlowUsers(actObj, applObj, nextFlowSelect, autoOpen);
                        }
                        $flowState.show();
                    } else {
                        hideSinoWaiting();
                    }
                    $flowSelectModal.modal("adjustDialog");
                    autoOpen = true;
                };
                $.ajax({
                    url: "app/api-flow/def/getFlexValueSetName",
                    data: {
                        projectName: $("#sf_project").val(),
                        procedureName: $("#sf_procedure").val(),
                        taskName: $("#sf_taskname").val(),
                        flowCode: $(this).attr("flowCode")
                    },
                    dataType: "JSON",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                    },
                    success: getFlexValueSetNameCB,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        // BootstrapDialog.alert("获取退回原因失败。");
                        hideSinoWaiting();
                    }
                });
            });
            hideSinoWaiting();
            // 如果只有一个流向，默认选中
            if (flowList.length === 1) {
                flowList[0].click();
            } else {
                // 默认选中第一个正向流向
                flowList.each(function () {
                    var flowCode = $(this).attr("flowCode");
                    if (flowCode.indexOf("M") !== -1 || flowCode.indexOf("F") !== -1) {
                        $(this).click();
                        return false;
                    }
                })
            }
        }

        // 获取流向列表
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getFlowListWithJson",
            data: {
                actObj: JSON.stringify(actObj),
                applObj: JSON.stringify(applObj),
                loginName: "ADMIN"
            },
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: getFlowListCB,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideSinoWaiting();
                BootstrapDialog.alert("获取流向异常！" + textStatus + XMLHttpRequest.status);
            }
        });

        $flowSelectModal.on("shown.bs.modal", function () {
            $flowSelectModal.find('.modal-dialog.flow-person-modal').css({
                'margin': '10px auto'
            });
        });

        $flowSelectModal.on("hidden.bs.modal", function () {
            $flowSelectModal.remove();
            $('.flowSelectPersonModal').remove();
        });

        // 省略/全部展示流向意见
        $flowSelectModal.on('click', '.flow-proposal a', function () {
            var $content = $(this).parent().find('.flow-proposal-content');
            $content.toggleClass('ellipsis');
            if ($content.hasClass('ellipsis')) {
                $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            } else {
                $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            }
        });

        $("#flowBtnCancel").bind("click", function () {
            $flowSelectModal.modal('hide');
        });

        $("#flowBtnOK").bind("click", function () {
            if (isEmpty(com.sinoprof.workflow.dialog.submitForm.sfActObj.nextFlowCode)) {
                BootstrapDialog.alert("请选择下一流向！");
                return;
            }
            if (com.sinoprof.workflow.dialog.submitForm.sfActObj.nextUserRequired === "Y") {
                var userSelected = true;
                $("#flowSelected").find(".flow-person-list").each(function () {
                    if ($(this).children().length == 0) {
                        var flow = $(this).parent().find('.flowName').text();
                        BootstrapDialog.alert("流向：" + flow + "，请选择下一办理人！");
                        userSelected = false;
                        return false;
                    }
                });
                if (!userSelected) {
                    return;
                }
            }
            var opinion = $('textarea[name=Content]').val();
            if (opinion.length === 0) {
                BootstrapDialog.alert("请输入审批意见。");
                return;
            }
            if (opinion.length > 500) {
                BootstrapDialog.alert("审批意见不能超过500字。");
                return;
            }
            if (com.sinoprof.workflow.dialog.submitForm.submitFlow()) {
                $flowSelectModal.modal('hide');
                // showSinoWaiting();
            } else {
                $flowSelectModal.modal('hide');
            }
        });
        $flowSelectModal.modal({
            backdrop: 'static'
        });
    },
    addPrevActLog: function () {
        if (nullToEmpty($("#sf_actID").val()) != '') {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: {
                    sfactActId: $("#sf_actID").val()
                },
                url: "app/api-flow/flow/workbench/getPrevActLog",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                },
                success: function (rec) {
                    if (rec.code == '0') {
                        var data = rec.data;
                        if (nullToEmpty(data) != "") {
                            $(".flow-last").css("display", "block");
                            $($(".flow-last").children()[0]).find(".flow-last-name").html(data.sfactTaskName);
                            // $($(".flow-last").children()[1]).find(".flow-last-opinions").html(data.sfactSplitTaskId +'</span>（办理人：<span style="color: #F24444;font-weight: bold;">' + data.sfactCompleteUser + '</span>，办理时间：<span style="color: #F24444;">' + data.sfactCompleteDate + '</span>）');
                            $($(".flow-last").children()[1]).find(".flow-last-opinions").html(data.sfactSplitTaskId + '</span>（办理人：<span>' + data.sfactCompleteUser + '</span>，办理时间：<span>' + data.sfactCompleteDate + '</span>）');
                        } else {
                            $(".flow-last").css("display", "none");
                        }
                    } else {
                        $(".flow-last").css("display", "none");
                    }
                }
            })
        }
    },
    counterSignAutoReturn: function () {
        BootstrapDialog.confirm("确定不同意？", function (flag) {
            if(flag){
                if(handleBusi()){
                    return;
                }
                if (nullToEmpty($("#sf_actID").val()) != '') {
                    $.ajax({
                        type: "POST",
                        data: {
                            sfactActId: $("#sf_actID").val()
                        },
                        url: "app/api-flow/flow/workbench/counterSignAutoReturn",
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                        },
                        success: function (rec) {
                            BootstrapDialog.alert(rec.message);
                            if(rec.code == 0 && nullToEmpty(rec.data) != ""){
                                sinoFlowClose();
                            }
                        }
                    });
                }
            }
        });
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

        this.addPrevActLog();

        var $flowSelectModal = $(com.sinoprof.workflow.dialog.deliverHtml.replace("@taskName@", actObj.taskName));
        $flowSelectModal.appendTo('body');
        // 输入框计数
        $flowSelectModal.find('[data-toggle="text-count"]').each(function () {
            com.sinoprof.workflow.dialog.submitForm.statInputNum($(this).find("textarea"), $(this).find(".text-count-word"));
        });

        var $flowSelected = $(com.sinoprof.workflow.dialog.flowSelectedHtml);
        var $flowState = $(".flow-state");
        var $personList = $flowSelected.find('.flow-person-list');
        $flowState.find('#flowSelected').append($flowSelected);
        $flowSelected.find(".flowName").html("转交办理人");
        $flowSelected.attr("splitNextTaskName", actObj.splitNextTaskName);
        $flowSelected.attr("parallelFlowCode", actObj.parallelFlowCode);
        showSinoWaiting();
        $.ajax({
            url: "app/api-flow/ui/getDeliverUsers",
            data: {
                projectName: $("#sf_project").val(),
                groupName: actObj.currentGroupName,
                roleName: $("#sf_role").val()
            },
            dataType: "JSON",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.data != null) {
                    var groupList = [{
                        groupName: actObj.currentGroupName,
                        deptName: actObj.currentGroupName,
                        list: []
                    }];
                    $.each(data.data, function (index, item) {
                        if (item.userLoginName === "error") {
                            BootstrapDialog.alert(item.userDispName);
                            return;
                        }
                        groupList[0].list.push({
                            userId: item.userId,
                            loginName: item.loginName,
                            userName: item.username
                        });
                    });
                    $flowSelected.find('.addBtn').click(com.sinoprof.workflow.dialog.submitForm.showSelectPersonModal({
                        taskName: actObj.taskName,
                        splitNextTaskName: actObj.splitNextTaskName,
                        parallelFlowCode: actObj.parallelFlowCode,
                        isMulti: actObj.isMulti,
                        canDelUser: true,
                        autoOpen: true,
                        personList: groupList,
                        $personList: $personList
                    }));
                }
                hideSinoWaiting();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                BootstrapDialog.alert("获取转交人员列表失败。");
                hideSinoWaiting();
            }
        });
        $flowState.show();
        $flowSelectModal.modal("adjustDialog");
        $flowSelectModal.on("hidden.bs.modal", function () {
            $flowSelectModal.remove();
            $('.flowSelectPersonModal').remove();
        });

        $("#flowBtnCancel").bind("click", function () {
            $flowSelectModal.modal('hide');
        });

        $("#flowBtnOK").bind("click", function () {
            if ($personList.children().length == 0) {
                BootstrapDialog.alert("请选择转交办理人！");
                return;
            }
            var opinion = $('textarea[name=Content]').val();
            if (opinion.length === 0) {
                BootstrapDialog.alert("请输入转交意见。");
                return;
            }
            if (opinion.length > 500) {
                BootstrapDialog.alert("转交意见不能超过500字。");
                return;
            }
            actObj.opinion = opinion;

            //指定到单人
            var $selection = $($personList.children()[0]);
            actObj.nextGroupName = $selection.attr("group");
            actObj.nextUserLoginName = $selection.attr("user");
            var obj = {
                'userId': $selection.attr("userid"),
                'loginName': $selection.attr("user"),
                'displayName': $selection.find('.name').text()
            }
            if('undefined' != typeof purchasing){
                gjpo_transfer(purchasing,obj);//采购经理协办时调用此函数
            }
            // if(typeof deliverCallBack=="function"){
            //     deliverCallBack(obj);
            // }

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
                data: {
                    sf_appFieldValue: workflowJson
                },
                dataType: "JSON",
                async: false,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
                },
                success: function (data) {
                    BootstrapDialog.alert("流程转交成功。");
                    sinoFlowClose();
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    BootstrapDialog.alert("流程转交失败。");
                    _flowBtnOK.disabled = false;
                }
            });
        });

        $flowSelectModal.modal({
            backdrop: 'static'
        });
    },
    processFlowUsers: function (actObj, applObj, nextFlowSelect, personListOpen, callback) {
        //是否可以删除会签人员
        personListOpen = personListOpen || false;
        var canDelUser = true;
        var $flowSelected = $(com.sinoprof.workflow.dialog.flowSelectedHtml),
            $selectedList = $flowSelected.find('.flow-person-list');
        $("#flowSelected").append($flowSelected);
        $flowSelected.find(".flowName").html(nextFlowSelect);
        $flowSelected.attr("splitNextTaskName", actObj.splitNextTaskName);
        $flowSelected.attr("parallelFlowCode", actObj.parallelFlowCode);
        $selectedList.empty();

        if (!personListOpen) {
            $selectedList.hide();
            $flowSelected.find('.flow-person-title .flow-person-title-right a i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
        // 隐藏/显示办理人列表
        $flowSelected.on('click', '.flow-person-title .flow-person-title-right a', function () {
            var $list = $(this).parents('.flow-person').find('.flow-person-list');
            if ($list.is(':hidden')) {
                $list.show();
                $(this).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
            } else {
                $list.hide();
                $(this).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        });

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

        // 整合组别和人员列表接口
        var getGroupListCB = function (data) {
            if (data.code !== "0") {
                hideSinoWaiting();
                BootstrapDialog.alert(data.message);
                return;
            }
            for(var i=0;i<data.data.length;i++) {
                var item = data.data[i];

                if (item.groupName === "error") {
                    BootstrapDialog.alert(item.groupDese);
                    return;
                }
                actObj.nextGroupName = item.groupName;
                actObj.groupCount = data.data.length;
                item.list = [];
                if(item.sfUserUIList==null){
                    BootstrapDialog.alert("下一流向的用户没有维护。");
                    hideSinoWaiting();
                    return;
                }
                for(var j=0;j<item.sfUserUIList.length;j++) {
                    item.list.push({
                        userId: item.sfUserUIList[j].userId,
                        userName: item.sfUserUIList[j].userDispName,
                        loginName: item.sfUserUIList[j].userLoginName,
                        defaultSel: item.sfUserUIList[j].defaultSel === 'Y'
                    });
                }
            }
            $flowSelected.find('.addBtn').click(com.sinoprof.workflow.dialog.submitForm.showSelectPersonModal({
                taskName: actObj.taskName,
                splitNextTaskName: actObj.splitNextTaskName,
                parallelFlowCode: actObj.parallelFlowCode,
                isMulti: isMulti,
                canDelUser: canDelUser,
                personList: data.data,
                autoOpen: personListOpen,
                $personList: $selectedList
            }));
            if (callback) {
                callback.call(this);
            } else {
                hideSinoWaiting();
            }
        };

        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getGroupAndUserListWithJson",
            data: {
                actObj: JSON.stringify(actObj),
                applObj: JSON.stringify(applObj),
                parallelFlowCode: actObj.parallelFlowCode,
                loginName: "ADMIN"
            },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: getGroupListCB,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                hideSinoWaiting();
                BootstrapDialog.alert("获取流程组别异常！" + textStatus + XMLHttpRequest.status);
            }
        });

        // 先获取组别再请求每个组别的人员列表
        // var getGroupListCB = function (data) {
        //     if (data.code !== "0") {
        //         hideSinoWaiting();
        //         BootstrapDialog.alert(data.message);
        //         return;
        //     }
        //     var groupList = data.data,
        //         revCount = 0,
        //         getUserListCallback = function (index, list) {
        //             groupList[index].list = list;
        //             revCount += 1;
        //             if (revCount == groupList.length) {
        //                 $flowSelected.find('.addBtn').click(com.sinoprof.workflow.dialog.submitForm.showSelectPersonModal({
        //                     taskName: actObj.taskName,
        //                     splitNextTaskName: actObj.splitNextTaskName,
        //                     parallelFlowCode: actObj.parallelFlowCode,
        //                     isMulti: isMulti,
        //                     canDelUser: canDelUser,
        //                     personList: groupList,
        //                     autoOpen: personListOpen,
        //                     $personList: $selectedList
        //                 }));
        //                 if (callback) {
        //                     callback.call(this);
        //                 } else {
        //                     hideSinoWaiting();
        //                 }
        //             }
        //         }
        //     $.each(data.data, function (index, item) {
        //         if (item.groupName === "error") {
        //             BootstrapDialog.alert(item.groupDese);
        //             return;
        //         }
        //         actObj.nextGroupName = item.groupName;
        //         actObj.groupCount = data.data.length;
        //         com.sinoprof.workflow.dialog.submitForm.addGroupUsers(actObj, applObj, index, getUserListCallback);
        //     });
        // };

        // $.ajax({
        //     type: "post",
        //     url: "app/api-flow/ui/getGroupListWithJson",
        //     data: {
        //         actObj: JSON.stringify(actObj),
        //         applObj: JSON.stringify(applObj),
        //         parallelFlowCode: actObj.parallelFlowCode
        //     },
        //     dataType: "json",
        //     beforeSend: function (XMLHttpRequest) {
        //         XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
        //     },
        //     success: getGroupListCB,
        //     error: function (XMLHttpRequest, textStatus, errorThrown) {
        //         hideSinoWaiting();
        //         BootstrapDialog.alert("获取流程组别异常！" + textStatus + XMLHttpRequest.status);
        //     }
        // });
    },
    addGroupUsers: function (actObj, applDataObj, groupIndex, callback) {
        var nextGroupName = actObj.nextGroupName;
        var getUserListCB = function (data) {
            if (data.code !== "0") {
                hideSinoWaiting();
                BootstrapDialog.alert(data.message);
                return;
            }
            var userList = [];
            $.each(data.data, function (index, item) {
                if (item.userLoginName === "error") {
                    BootstrapDialog.alert(item.userDispName);
                    return;
                }
                userList.push({
                    userId: item.userId,
                    userName: item.userDispName,
                    loginName: item.userLoginName,
                    defaultSel: item.defaultSel === 'Y'
                });
            });
            callback.call(com.sinoprof.workflow.dialog.submitForm, groupIndex, userList)
        };

        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getUserListWithJson",
            data: {
                actObj: JSON.stringify(actObj),
                applObj: JSON.stringify(applDataObj),
                parallelFlowCode: ''
            },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: getUserListCB,
            error: function () {
                BootstrapDialog.alert("获取流程办理人员异常。");
                hideSinoWaiting();
            }
        });

    },
    addParallelFlows: function (actObj, applObj, personListOpen) {
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getParallelFlowListWithJson",
            data: {
                actObj: JSON.stringify(actObj),
                applObj: JSON.stringify(applObj)
            },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                if (data.code !== "0") {
                    hideSinoWaiting();
                    BootstrapDialog.alert(data.message);
                    return;
                }
                var count = data.data.length;
                $.each(data.data, function (index, item) {
                    actObj.splitNextTaskName = item.taskName;
                    actObj.parallelFlowCode = item.flowCode;
                    com.sinoprof.workflow.dialog.submitForm.processFlowUsers(actObj, applObj, item.flowDesc, personListOpen && index == 0, function () {
                        count -= 1;
                        if (count <= 0) {
                            hideSinoWaiting();
                        }
                    });
                });
            },
            error: function () {
                BootstrapDialog.alert("获取并流流向异常。");
                hideSinoWaiting();
            }
        });
    },
    addParallelTask: function () {
        var arrNextTasks = [];
        $('#flowSelected').children().each(function (index, el) {
            var nextTask = {};
            nextTask.taskName = $(this).attr("splitNextTaskName");
            nextTask.flowCode = $(this).attr("parallelFlowCode");
            var groupName = "";
            var userLoginName = "";
            $(this).find('.flow-person-list').children().each(function () {
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
        this.sfActObj.actionType = "1"; //1 提交 2 退回 3 转发
        this.sfActObj.actId = $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup = $('#sf_handlerGroup').val();
        this.sfActObj.currentGroupName = $('#sf_group').val();
        this.sfActObj.opinion = $('textarea[name=Content]').val();
        if (this.sfActObj.opinion.length > 500) {
            BootstrapDialog.alert("审批意见不能超过500字。");
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
            var nestTasks = com.sinoprof.workflow.dialog.submitForm.addParallelTask();
            if (nestTasks != null && nestTasks.length > 0) {
                this.sfActObj.nextGroupName = nestTasks[0].groupName;
                this.sfActObj.nextUserLoginName = nestTasks[0].userLoginName;
            }

        }
        // 抄送人
        var $flowState = $(".flowCopyPersonList");
        if ($flowState.children().length > 0) {
            var flowCopyUser = [];
            $flowState.children().each(function () {
                flowCopyUser.push($(this).attr("user"));
            });
            this.sfActObj.flowCopyUser = flowCopyUser.join(';');
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
        var parameters = $.extend(true, {
            appEntity: "nil"
        }, arguments[0]);
        this.onSaveCallBackFun = function (result) {
            if (parameters.callbackFun) {
                parameters.callbackFun(result);
            }
        };

        this.sfActObj.actionType = "1"; //1 提交 2 退回 3 转发,4
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
                BootstrapDialog.alert("获取常用意见异常。");
            }
        });
    },
    initFlowCopy: function (copyFlag, $flowSelectModal) {
        // 抄送
        if (copyFlag !== "1") {
            $('#flowCopyUser').hide();
            $('#flowCopyMsg').hide();
            return;
        }
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getCopyUserByName",
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                var groupList = [];
                if (data.code == 0) {
                    data = data.data;
                    var groupMap = {};
                    for (var i = 0; i < data.length; i++) {
                        var person = data[i];
                        if (!groupMap[person.GROUP_NAME]) {
                            groupMap[person.GROUP_NAME] = {
                                groupName: person.GROUP_NAME,
                                deptName: person.GROUP_NAME,
                                list: []
                            }
                        }
                        groupMap[person.GROUP_NAME].list.push({
                            userId: person.USER_ID,
                            userName: person.USERNAME,
                            loginName: person.LOGIN_NAME
                        });
                    }

                    for (var key in groupMap) {
                        groupList.push(groupMap[key]);
                    }
                }
                $flowSelectModal.find('.flowCopyAddBtn').click(com.sinoprof.workflow.dialog.submitForm.showSelectPersonModal({
                    taskName: actObj.taskName,
                    splitNextTaskName: actObj.splitNextTaskName,
                    parallelFlowCode: actObj.parallelFlowCode,
                    isMulti: true,
                    canDelUser: true,
                    personList: groupList,
                    $personList: $personList
                }));
            }
        });
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
    },
    /** 显示模态框
     * {
     * taskName: 流程名,
     * splitNextTaskName: 流向名,
     * parallelFlowCode: 流向code,
     * isMulti: 是否多选,
     * canDelUser: 是否能删除,
     * personList: 人员列表,
     * autoOpen: 是否自动弹出,
     * $personList: 点击去顶后，选中人员列表放在此节点中
     * }
     */
    showSelectPersonModal: function (options) {
        var $modal = $('.selectPersonModal' + options.parallelFlowCode);
        if ($modal.get(0)) {
            $modal.remove();
        }
        $modal = $(com.sinoprof.workflow.dialog.flowSelectPersonHtml);
        $modal.addClass('selectPersonModal' + options.parallelFlowCode);
        var $allList = $modal.find('.allList'),
            $selectedList = $modal.find('.selectedList'),
            selectedCount = 0;
        $modal.find('.modal-title').html(options.taskName + '-' + options.splitNextTaskName);
        $allList.empty();
        $selectedList.empty();
        $('body').append($modal);
        $modal.find('.clear').css({
            'display': 'none'
        });
        var addSelectedPerson = function ($personItem) {
            var userId = $personItem.find('input[type=checkbox]').val();
            if ($selectedList.find('input[value=' + userId + ']').get(0)) return;
            if (!options.isMulti) {
                $selectedList.empty();
                $allList.find('input[type=checkbox]').prop('checked', false);
            }
            $personItem.find('input[type=checkbox]').prop('checked', true);
            var $selectedPerson = $personItem.clone();
            $selectedPerson.find('input[type=checkbox]').attr('id', 'flow-select-person-modal-item-selected' + userId);
            $selectedPerson.find('input[type=checkbox]').attr('name', 'flow-select-person-modal-item-selected' + userId);
            $selectedPerson.find('.personName').attr('for', 'flow-select-person-modal-item-selected' + userId);
            $selectedPerson.find('.personName').html('<span class="name" style="width: 42px;">' + $personItem.find('.personName').text() + '</span>-<span class="group">' + $personItem.parents('.flow-person-selector-item').find('.groupName').text() + '</span>');
            $selectedList.append($selectedPerson);
            selectedCount = $selectedList.children().length;
        }
        for (var i = 0; i < options.personList.length; i++) {
            var groupInfo = options.personList[i];
            var $group = $(com.sinoprof.workflow.dialog.flowSelectPersonGroupHtml);
            $group.find('.groupName').html(groupInfo.deptName);
            $group.find('.totalCount').html(groupInfo.list.length);
            $allList.append($group);
            for (var j = 0; j < groupInfo.list.length; j++) {
                var personInfo = groupInfo.list[j];
                var $person = $(com.sinoprof.workflow.dialog.flowSelectPersonItemHtml);
                $person.attr('group', groupInfo.groupName);
                $person.attr('user', personInfo.loginName);
                $person.find('.personName').html(personInfo.userName);
                $person.find('input[type=checkbox]').val(personInfo.userId);
                $person.find('input[type=checkbox]').attr('id', 'flow-select-person-modal-item' + personInfo.userId);
                $person.find('input[type=checkbox]').attr('name', 'flow-select-person-modal-item' + personInfo.userId);
                $person.find('.personName').attr('for', 'flow-select-person-modal-item' + personInfo.userId);
                $group.find('.flow-person-selector-item-group-list').append($person);
                if (personInfo.defaultSel || (options.personList.length == 1 && options.personList[0].list.length == 1)) {
                    addSelectedPerson($person);
                }
            }
        }
        // 点击人
        $modal.on('change', 'input[type=checkbox]', function () {
            var checked = $(this).prop('checked');
            if (checked) {
                addSelectedPerson($(this).parent());
            } else {
                $selectedList.find('input[value=' + $(this).val() + ']').parent().remove();
                $allList.find('input[value=' + $(this).val() + ']').prop('checked', false);
                selectedCount = $selectedList.children().length;
            }
        });
        // 点击确认
        $modal.on('click', '.okBtn', function () {
            options.$personList.empty();
            $selectedList.children().each(function (index, el) {
                var $item = $(com.sinoprof.workflow.dialog.flowSelectedPersonItemHtml);
                $item.find('.name').html($(el).find('.personName .name').text());
                $item.find('.group').html($(el).find('.personName .group').text());
                $item.attr('group', $(el).attr('group'));
                $item.attr('user', $(el).attr('user'));
                $item.attr('userid', $(el).find('input').val());
                $item.find('a').click(function () {
                    $selectedList.find('input[value=' + $(el).find('input[type=checkbox]').val() + ']').parent().remove();
                    $allList.find('input[value=' + $(el).find('input[type=checkbox]').val() + ']').prop('checked', false);
                    $item.remove();
                    selectedCount = $selectedList.children().length;
                    options.$personList.parent().find('.flowPersonCount').html(selectedCount);
                });
                options.$personList.append($item);
                options.$personList.parent().find('.flowPersonCount').html(selectedCount);
            });
            $modal.modal('hide');
        });
        // 搜索办理人
        $modal.on('input propertychange', '.flow-person-selector-search input', function () {
            var searchKey = $(this).val().trim();
            $allList.find('.flow-person-selector-item').each(function (index, itemEl) {
                var showChildrenCount = 0;
                $(this).find('input[type=checkbox]').each(function (index, el) {
                    var value = el.value,
                        name = $(el).parent().find('.personName').text();
                    if (searchKey == '' || value.indexOf(searchKey) >= 0 || name.indexOf(searchKey) >= 0) {
                        $(this).parent().show();
                        showChildrenCount += 1;
                    } else {
                        $(this).parent().hide();
                    }
                });
                if (showChildrenCount > 0) {
                    $(this).show();
                    $(this).find('.flow-person-selector-item-group .totalCount').html(showChildrenCount);
                } else {
                    $(this).hide();
                }
            });
        });
        // 折叠部门人员列表
        $modal.on('click', '.flow-person-selector-item a', function () {
            var $list = $(this).parents('.flow-person-selector-item').find('.flow-person-selector-item-group-list');
            if ($list.is(':hidden')) {
                $list.show();
                $(this).find('i').removeClass('fa-caret-right').addClass('fa-caret-down');
            } else {
                $list.hide();
                $(this).find('i').removeClass('fa-caret-down').addClass('fa-caret-right');
            }
        });
        // 清除已选人
        $modal.on('click', '.clear', function () {
            $selectedList.empty();
            $allList.find('input[type=checkbox]').prop('checked', false);
        });

        // 创建完成模态框后，先把已选中的带出
        $modal.find('.okBtn').click();
        if (selectedCount == 0 && options.autoOpen) {
            $modal.modal('show');
        }

        return function () {
            $modal.modal('show');
        }
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
    try {
        $.ajax({
            url: "/api-centralize-interfaces/oatodo/updateOATodoStatus",
            data: JSON.stringify({
                appMsgId: getParam("actId"),
                msgType: "1"
            }),
            contentType: "application/json",
            type: "POST",
            async: false,
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                // console.log("代办刷新情况",data);
            },
            error: function (res) {
                // console.log("代办刷新失败",res);
            }
        });
        var fromPortal = getParam("from_portal");
        //回刷OA门户首页  pengjian+  2019-12-02
        if (nullToEmpty(fromPortal) != '') {
            if (window.opener && window.opener.closed == false) {
                if (nullToEmpty(fromPortal) == "1") { //从门户首页统一待办列表打开的待办、待阅、草稿链接会在url最后面拼接from_portal=1
                    document.domain = "js.cmcc";
                    window.opener.location.reload();
                } else if (nullToEmpty(fromPortal) == "2") { //从“更多”页面打开的待办、待阅、草稿链接会在url最后面拼接from_portal=2
                    document.domain = "js.cmcc";
                    window.opener.reloadList();
                }
            }
            if (nullToEmpty(window.opener) == '') {
                window.open("", "_self");
                window.close();
                if (window) {
                    window.location.href = "about:blank";
                }
            } else {
                window.close();
            }
        } else {
            sinoFlowCloseIframe();
        }
    } catch (e) {
        if (nullToEmpty(window.opener) == '') {
            window.open("", "_self");
            window.close();
            if (window) {
                window.location.href = "about:blank";
            }
        } else {
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

/**
 * 自行处理业务
 * @constructor
 */
function handleBusi() {
    return false;
}

/**
 * 采购经理协办回调函数
 */
function gjpo_transfer(func,val) {
    func(val);
}
