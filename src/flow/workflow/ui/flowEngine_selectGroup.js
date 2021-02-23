function do_SelectGroup() {

    var htmlModelDiv = '<div class="modal fade sino-box" id="sf_selectGroupModal" role="dialog" aria-hidden="true" >'
        + '<div class="modal-dialog sino-modal-md">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + ' <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        + '<span aria-hidden="true">&times;</span>'
        + '</button>'
        + '<h3 class="modal-title" id="myModalLabel"><i class="fa fa-window-maximize"></i> 组别选择</h3>'
        + '</div>'
        + '<div class="modal-body sino-box-modal">'
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

    if ($("#sf_caseID").val() !== "" && group.indexOf("*") < 0) {
        return;
    }

    if (isMask(group)) {
        $.ajax({
            type: "post",
            url: "app/api-flow/ui/getUserGroupList",
            data: {projectName: $("#sf_project").val(), groupName: group, roleName: $("#sf_role").val()},
            async: false,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('Authorization', window.sessionStorage.getItem("token"));
            },
            success: function (data) {
                var groupList = data.data;
                $("#sf_selectGroupModal").remove();
                if ($("#sf_selectGroupModal").length === 0) {
                    $(htmlModelDiv).appendTo('body');
                }
                for (var i = 0; i < groupList.length; i++) {
                    var addDt = '<ul><li style="height:30px line-height:30px"><label><input style="margin-bottom: 5px;" type="radio" name="groupRadio" class="vam" value="' + groupList[i].groupName + '"/> ' +
                        groupList[i].groupName + '</label></li></ul>';
                    $(addDt).appendTo($("#sf_selectGroupDiv"));
                }
                $("#sf_selectGroupModal").modal({backdrop: 'static'});
                var retGroup = "";
                $("#sf_selectGroup_confirmBtn").bind("click", function () {
                    retGroup = $("#sf_selectGroupDiv ul li input[name=groupRadio]:checked").val();
                    if (!retGroup) {
                        BootstrapDialog.alert("请选择组别");
                    } else {
                        if (isMask($("#sf_group").val())) { //&& Launch_GroupSet
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
                    var r = confirm("还未选择组别，不选择组别将自动取消任务，所有更改将会作废；确认是否离开？");
                    if (r) {
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
