/**
 * User: 朱洪涛
 * Date：2016-6-27
 */
$.namespace("com.sinoprof.workflow.dialog");

com.sinoprof.workflow.dialog.copyUserSelForm = {

    selectCopyUser: function(){
        var copyHtmlModel = '<div class="modal" id="sf_CopyUser_SelectModal" role="dialog" aria-hidden="true" >'
            +'<div class="modal-dialog">'
            +'<div class="modal-content">'
            +'<div class="pop-box">'
            +'<div class="box-title pl"><h2 class="icon bold blue">抄送信息</h2><a href="#" id="sf_CopyUser_BtnExit" class="icon close"></a></div>'
            +'<div class="box-main">'
            +'    <div class="lc-title icon lc-yxz mt bold">已选择</div>'
            +'    <div id="sf_CopyUser_checkedDl" class="lc-xznr">'
            +'    </div>'
            +'     <div class="clearfix"></div>'
            +'    <label for="investBody" class="black pl20 bold col-sm-2 control-label">请选择角色:</label>'
            +'    <div class="col-sm-3 ">'
            +'      <select id="sf_CopyUser_selectRole" name="sf_CopyUser_selectRole" class="form-control input-sm"></select>'
            +'    </div>'
            +'     <div class="clearfix"></div>'
            +'    <div class="lc-title black mt pl20 bold">请选择部门</div>'
            +'    <div id="sf_CopyUser_GroupDiv">'
            +'    </div>'
            +'    <div class="lc-user lc-text lc-text-bk mt">'
            +'        <dt class="boldn">请填写抄送信息：</dt>'
            +'        <dd><textarea name="Content" id="sf_CopyUser_message" class="text"></textarea><br><p class="gray">要求少于500个字</p></dd>'
            +'    </div>'
            +'    <div class="lc-btns tc pt20 pb20 mt">'
            +'        <button type="button" id="sf_CopyUser_btnOK" class="button bgorange bold white f14">确定</button>'
            +'        <button type="button" id="sf_CopyUser_btnCancel" class="button bgblue bold white f14 ml30">返回</button>'
            +'    </div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>'
            +'</div>';
        var parameters = $.extend(true, {ctx: "nil"}, arguments[0]);
        $("#sf_CopyUser_SelectModal").remove();
        if($("#sf_CopyUser_SelectModal").length == 0){
            $(copyHtmlModel).appendTo('body');
        }
        $("#sf_CopyUser_SelectModal").modal({backdrop: 'static'});
        $.ajax({
            type:"get",
            url :parameters.ctx+"/flow/dict/GetProjectRoleList/projectName/"+$("#sf_project").val(),
            async : false,
            dataType: "json",
            success:function(data){
                for(var i = 0;i<data.length;i++){
                    var roleOption = '<option name = "roleOption" value ="'+data[i].optionValue+'">'+data[i].optionText+'</option>';
                    $(roleOption).appendTo($("#sf_CopyUser_selectRole"));
                }

            }
        });
        $("#sf_CopyUser_selectRole option[name=roleOption]").on("click",function(){
            com.sinoprof.workflow.dialog.copyUserSelForm.selectGroup_ByRole(parameters.ctx,this);
        })
        $("#sf_CopyUser_btnCancel,#sf_CopyUser_BtnExit").on("click", function () {
            $("#sf_CopyUser_SelectModal").modal('hide');
        });
    },
    selectGroup_ByRole:function(ctx,optionRole){
        var roleName = $(optionRole).val();
        $("#sf_CopyUser_GroupDiv").empty();
        $.ajax({
            type: "post",
            url:  ctx+"/flow/dict/GetGroupListByRole",
            data :{"projectName":$("#sf_project").val() , "roleName":roleName },
            async:false,
            success:function(data){
                if(data.length < 1){
                    BootstrapDialog.alert("该角色下没有对应的组别");
                    return;
                }
                for(var i=0;i<data.length;i++){
                    if(i%2 == 0){
                        var groupSelectHtmlDiv = '<div class="lc-user lc-user-bk p10 mt5"></div>';
                        $(groupSelectHtmlDiv).appendTo($("#sf_CopyUser_GroupDiv"));
                    }
                    var groupSelectHtml = '<span class="lc-row">' +
                        '<div class="user-bm"><div>' +
                        '<input type="hidden" value="'+roleName+'_'+data[i].groupName+'"/><span class="u1 us">' +
                        '</span><span class="u2">'+data[i].groupName+'</span>' +
                        '<span class="u3 bold orange " style="display:block">人员选择</span><i style="display:block"></i>' +
                        '</div>' +
                        '<div name="copyGroup" class="clearfix user-xz user-xz-bk ">' +
                        '<ul></ul>' +
                        '</div></div></span>';
                    $(groupSelectHtml).appendTo($("#sf_CopyUser_GroupDiv div:first"));
                }
            }
        });
        $("#sf_CopyUser_GroupDiv div").on("click",function(){
            com.sinoprof.workflow.dialog.copyUserSelForm.selectUserByGroup(ctx,this);
        })

    },
    selectUserByGroup:function (ctx,optionGroup){
        $(optionGroup).next().find("ul").empty();
    //        $("#sf_CopyUser_GroupDiv").find("div[name=copyGroup]:visible").slideUp("slow");
        var idStr =$(optionGroup).find("input").val().split("_");
        var roleName = idStr[0];
        var groupName = idStr[1];
        var projectName = $("#sf_project").val();
        $.ajax({
            type : "post",
            url : ctx+"/flow/ui/getGroupUsers",
            data :  {"projectName":projectName ,"groupNames":groupName, "roleName":roleName },
            async : false,
            dataType: "json",
            success : function(data){
                eval("names = " + data);
                var realArr = names[0].realnames.split(",");
                var username = names[0].usernames.split(",");
                for(var i=0;i<realArr.length;i++) {
                    var ipos = realArr[i].indexOf("/");
                    if(realArr[i].substring(0,ipos) == $("#sf_user").val()&&groupName == $("#sf_group").val()) {
    
                    } else{
                        var copyUserHtml ='<li><label><input type="checkbox" name="'+groupName+'" class="vam" value="'+realArr[i].substring(0,ipos)+ '" >'
                            +realArr[i].substring(0,ipos)+'</label></li>';
                        var copyUserUl='#'+roleName+'_'+groupName;
                        $(copyUserHtml).appendTo($(optionGroup).next().find("ul"));

                    }
                }
                $(optionGroup).next().slideToggle("slow");
            }
        });
        $("input:checkbox").unbind();
        $("input:checkbox").on("change", function () {
            var checkGroup = $(this).attr("name");
            var username = $(this).val();
            if($(this).is(':checked')){
                var flag = true;
                $("#sf_CopyUser_checkedDl input[name=copyGroupRoleUser]").each(function(){
                    if($(this).val() == checkGroup+'/'+roleName+'/'+username){
                        flag = false;
                    }
                })
                if(flag) {
                    var checkedUserHtml = '<div class="lc-user clearfix  lc-text">'
                        + '<a class="u1">部门/角色/抄送入: </a><a class="u2">' + checkGroup + '/' + roleName + '/' +username
                        + '<input type="hidden" name="copyGroupRoleUser" value="' + checkGroup + '/' + roleName + '/' + username + '"/>'
                        + '<span class="u3 glyphicon glyphicon-remove" style="cursor:pointer; display:none; color: lightgrey"></span></a></div>';
                    $(checkedUserHtml).appendTo("#sf_CopyUser_checkedDl");
                }else{
                    BootstrapDialog.alert("此人已选中");
                }
            }else{
                $("#sf_CopyUser_checkedDl input[name=copyGroupRoleUser]").each(function(){
                    if($(this).val() == checkGroup+'/'+roleName+'/'+username){
                        $(this).parent().parent().empty();
                    }
                })
            }
            $(".glyphicon-remove").parent().unbind();
            $(".glyphicon-remove").parent().hover(function(){
                $(this).children(".glyphicon-remove").toggle();
            });
            $(".glyphicon-remove").on("click",function(){
                $(this).parent().parent().empty();
            });
    
        });
    
    }
}