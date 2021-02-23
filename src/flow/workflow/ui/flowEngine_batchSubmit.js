/**
 * User:徐佩政
 * Date：2015-1-29
 * 单组别选择对话框
 */
$.namespace("com.sinoprof.workflow.dialog");

com.sinoprof.workflow.dialog.nextFlowSelectHtml =
    '<div class="modal" id="nextFlowSelectModal" role="dialog" aria-hidden="true" >'
    + "<div class='modal-dialog' style='width: auto;'>"
    + "<div class='modal-content modal-content-pop-box'>"
    + '<div class="pop-box">'
        + '<div class="box-title pl"><h2 class="icon bold blue">流向信息</h2></div>'
        + '<div class="box-main">'
            + '<div class="lc-title black mt20 pl40 bold">请选择流程</div>'
            + '<div class="lc-item mt30">'
                + ' <ul id="nextFlowSelectUl">'
                + '     <li class="current"><i class="icon"></i>提交部门<br>领导审批</li>'
                + '     <li><i class="icon"></i>提交部门<br>领导审批</li>'
                + '     <li><i class="icon"></i>提交部门<br>领导审批</li>'
                + '     <li><i class="icon"></i>提交部门<br>领导审批</li>'
                + '     <li><i class="icon"></i>提交部门<br>领导审批</li>'
                + ' </ul>'
            + '</div>'
            + '<div class="blank50"></div>'
        + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

com.sinoprof.workflow.dialog.nextFlowUserSelectHtml =
    '<div class="modal" id="nextFlowUserSelectModal" role="dialog" aria-hidden="true" >'
    + "<div class='modal-dialog' style='width: auto;'>"
    + "<div class='modal-content modal-content-pop-box'>"

        + '<div class="pop-box">'
            +'<div class="box-title pl"><h2 class="icon bold blue">流向信息</h2></div>'
            +   '<div class="box-main">'
            +   '<div class="lc-title icon lc-yxz mt bold">已选择</div>'
            +   '<div class="lc-xznr">'
            +   '   <dl>'
            +   '       <dt class="fl tr"><span class="xzlb fl tr">流向：</span><span id="nextFlowSelectTxt" class="gray fl tl ml-10">提交领导部门审批</span></dt>'
            +   '   </dl>'
            +   '   <dl id="nextFlowUserSelectedDl">'
            +   '       <div>'
            +   '       <dt class="fl tr"> <span class="xzlb fl tr">办理部门/办理人：</span><span id="nextGroup" class="gray fr tl">区公司物资管理部门</span></dt>'
            +   '       <dd id="nextUsers" class="fl">'
            +   '           <ul><li>张晓霞、王明明、张晓霞、王明明、张晓霞、王明明、张晓霞、王明明、张晓霞、王明明、张晓霞、王明明、张晓霞、王明明、张晓霞</li></ul>'
            +   '       </dd>'
            +   '       </div>'
         //   +   '       <div>'
         //   +   '       <div class="clearfix"></div>'
         //   +   '           <dt class="fl tr"><span class="gray fr tl">区公司人力管理部门</span></dt>'
         //   +   '            <dd class="fr">'
         //   +   '               <ul><li>张晓霞、王明明</li></ul>'
         //   +   '           </dd>'
         //   +   '       </div>'
        //    +   '       <div class="clearfix"></div>'
        //    +   '       <dt class="fl tr"><span class="gray fr tl">区公司合同管理部门</span></dt>'
        //    +   '       <dd class="fr">'
       //     +   '           <ul><li>张晓霞、王明明</li></ul>'
       //     +   '       </dd>'
       //     +   '       <div class="clearfix"></div>'
       //     +   '       <dt class="fl tr"><span class="gray fr tl">区公司销售管理部门</span></dt>'
       //     +   '       <dd class="fr">'
       //     +   '           <ul><li>张晓霞、王明明</li></ul>'
       //     +   '       </dd>'
            +   '   </dl>'
            +   '</div>'
            +   '<div class="lc-title black mt pl20 bold form-inline text-left"><div class="form-group">请选择下一办理人&nbsp;&nbsp;&nbsp;&nbsp;</div>'
            +   '  <div class="form-group"><input id="flowUserFilter" class="form-control input-sm placeholder" size="30" placeholder="人员过滤" onkeypress="if (event.keyCode == 13) filterUser2();"/></div>'
            +   '  <div class="form-group"><button class="btn btn-sm btn-warning" type="button" onclick="filterUser2()"><i class="fa fa-search">查询</i></button></div></div>'
            +'<div id="nextFlowGroupDiv" class="lc-user">'
            +'<div class="clearfix user-bm mt">'
            +   '<span class="u1 us"></span><span class="u2">区公司财务管理部门</span><span class="u3" style="display:block">部门人员选择</span><i style="display:block"></i>'
            +'</div>'
            +'<div class="clearfix user-xz user-bk">'
            +'  <ul>'
            +'      <li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
            +'  </ul>'
            +'</div>'

            +'<div class="clearfix user-bm mt">'
            +'  <span class="u1 us"></span><span class="u2">区公司财务管理部门</span><span class="u3 gray bold" style="display:block">部门人员选择</span><i style="display:block"></i>'
            +'</div>'
            +'<div class="clearfix user-xz user-bk">'
            +'  <ul>'
            +'      <li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
            +'  </ul>'
            +'</div>'

            +'<div class="clearfix user-bm mt">'
            +'  <span class="u1 us"></span><span class="u2">区公司财务管理部门</span><span class="u3 orange bold" style="display:block">部门人员选择</span><i style="display:block"></i>'
            +'</div>'
            +'<div class="clearfix user-xz user-bk">'
            +'  <ul>'
            +'      <li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
            +'  </ul>'
            +'</div>'

            +'<div class="clearfix user-bm mt">'
            +'  <span class="u1"></span><span class="u2">区公司财务管理部门</span><span class="u3">部门人员选择</span><i></i>'
            +'</div>'
            +'<div class="clearfix user-xz user-bk">'
            +'  <ul>'
            + '     <li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
            + ' </ul>'
            +'</div>'

            +'<div class="clearfix user-bm mt">'
            +'  <span class="u1"></span><span class="u2">区公司财务管理部门</span><span class="u3">部门人员选择</span><i></i>'
            +'</div>'
            +'<div class="clearfix user-xz user-bk">'
            +'  <ul>'
            +'      <li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
            +'  </ul>'
            +'</div>'
        +'</div>'
        +'<div class="lc-user lc-text mt">'
        +'  <dt class="boldn">请填写建议：</dt>'
        +'  <dd><textarea name="Content" id="opinion" class="text" id="Content"></textarea><br><p class="gray">要求少于500个字</p></dd>'
        +'</div>'
        +'<div class="lc-btns tc pt20 pb20 mt">'
        +'  <button type="button" id="btnOK" class="button bgorange bold white f14">确定</button><button type="button" id="btnCancel1" class="button bgblue bold white f14 ml30">返回</button>'
        +'</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

com.sinoprof.workflow.dialog.parallelFlowUserSelHtml =
    '<div class="modal" id="parallelFlowUserSelModal" role="dialog" aria-hidden="true" >'
    + '<div class="modal-dialog" style="width: auto;">'
    + '<div class="modal-content modal-content-pop-box">'
    +   '<div class="pop-box">'
    +   '   <div class="box-title pl"><h2 class="icon bold blue">流向信息</h2><a href="#" id="paralFlowFormBtnExit" class="icon close"></a></div>'
    +   '   <div class="box-main">'
  /*  +   '       <div class="lc-title icon lc-yxz mt bold">已选择</div>'
    +   '       <div class="lc-xznr">'
    +   '           <dl>'
    +   '               <dt class="fl tr"><span class="xzlb fl tr">流向：</span><span class="gray fr tl">提交领导部门审批</span></dt>'
    +   '           </dl>'
    +   '           <dl>'
    +   '               <dt class="fl tr"><span class="xzlb fl tr">流向/办理部门/入：</span><span class="gray fr tl">提交领导部门审批</span></dt>'
    +   '               <dd class="fr">'
    +   '                   <ul><li>区公司销售管理部门/张晓霞、王明明、张晓霞</li></ul>'
    +   '                   <ul><li>区公司销售管理部门/张晓霞、王明明、张晓霞</li></ul>'
    +   '               </dd>'
    +   '       <div class="clearfix"></div>'
    +   '           <dt class="fl tr"><span class="gray fr tl">经理审批报告</span></dt>'
    +   '           <dd class="fr">'
    +   '               <ul><li>张晓霞、王明明</li></ul>'
    +   '           </dd>'
    +   '       <div class="clearfix"></div>'
    +   '           <dt class="fl tr"><span class="gray fr tl">副经理审批报告</span></dt>'
    +   '           <dd class="fr">'
    +   '               <ul><li>张晓霞、王明明</li></ul>'
    +   '           </dd>'
    +   '       <div class="clearfix"></div>'
    +   '           <dt class="fl tr"><span class="gray fr tl">区公司销售管理部门</span></dt>'
    +   '           <dd class="fr">'
    +   '               <ul><li>张晓霞、王明明</li></ul>'
    +   '           </dd>'
    +   '   </dl>'
    +   '</div>'*/
    +   '<div class="lc-title black mt pl20 bold form-inline text-left"><div class="form-group">请选择下一办理人&nbsp;&nbsp;&nbsp;&nbsp;</div>'
    +   '  <div class="form-group"><input id="flowUserFilter" class="form-control input-sm placeholder" size="30" placeholder="人员过滤" onkeypress="if (event.keyCode == 13) filterUser();"/></div>'
    +   '  <div class="form-group"><button class="btn btn-sm btn-warning" type="button" onclick="filterUser()"><i class="fa fa-search">查询</i></button></div></div>'
    +   '<div id="parallelFlowDiv">'
    +   '<div class="lc-title black mt pl30"><span class="pl15 bold">1F</span><span class="pl">提交部门领导审批：</span></div>'
    +   '<div class="lc-user lc-user-bk p10 mt5">'
    +   '   <span class="lc-row">'
    +   '   <div class="user-bm">'
    +   '       <span class="u1"></span><span class="u2">区公司财务管理部门</span><span class="u3">人员选择</span><i></i>'
    +   '   </div>'
    +   '   <div class="clearfix user-xz user-xz-bk user-bk">'
    +   '       <ul>'
    +   '           <li><label><input type="checkbox" class="vam">孙明明</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +   '       </ul>'
    +   '   </div>'
    +   '   </span>'
    +   '   <span class="lc-row">'
    +   '       <div class="user-bm">'
    +   '           <span class="u1"></span><span class="u2">区公司财务管理部门</span><span class="u3">人员选择</span><i></i>'
    +   '       </div>'
    +   '       <div class="clearfix user-xz user-xz-bk user-bk">'
    +   '           <ul>'
    +   '               <li><label><input type="checkbox" class="vam">孙明明</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +   '           </ul>'
    +   '       </div>'
    +   '   </span>'
    +   '</div>'

    +   '<div class="lc-title black mt pl30"><span class="pl15 bold">2F</span><span class="pl">经理审批报告：</span></div>'
    +   '<div class="lc-user lc-user-bk p10 mt5">'
    +   '   <span class="lc-row">'
    +   '       <div class="user-bm">'
    +   '           <span class="u1 us"></span><span class="u2">区公司财务管理部门</span><span class="u3 bold orange" style="display:block">人员选择</span><i style="display:block"></i>'
    +   '       </div>'
    +   '       <div class="clearfix user-xz user-xz-bk user-bk">'
    +   '           <ul>'
    +   '               <li><label><input type="checkbox" class="vam">孙明明</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +   '           </ul>'
    +   '       </div>'
    +   '   </span>'
    +   '   <span class="lc-row">'
    +   '       <div class="user-bm">'
    +   '           <span class="u1 us"></span><span class="u2">区公司财务管理部门</span><span class="u3 bold gray" style="display:block">人员选择</span><i style="display:block"></i>'
    +   '       </div>'
    +   '       <div class="clearfix user-xz user-xz-bk user-bk">'
    +   '           <ul>'
    +   '               <li><label><input type="checkbox" class="vam">孙明明</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +   '           </ul>'
    +   '       </div>'
    +   '   </span>'
    +   '</div>'

    +   '<div class="lc-title black mt pl30"><span class="pl15 bold">3F</span><span class="pl">副经理审批报告：</span></div>'
    +   '<div class="lc-user lc-user-bk p10 mt5">'
    +   '   <span class="lc-row">'
    +   '       <div class="user-bm">'
    +   '           <span class="u1"></span><span class="u2">区公司财务管理部门</span><span class="u3">人员选择</span><i></i>'
    +   '       </div>'
    +   '       <div class="clearfix user-xz user-xz-bk user-bk">'
    +   '           <ul>'
    +   '               <li><label><input type="checkbox" class="vam">孙明明</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +   '           </ul>'
    +   '       </div>'
    +   '   </span>'
    +   '<span class="lc-row">'
    +   '   <div class="user-bm">'
    +   '       <span class="u1"></span><span class="u2">区公司财务管理部门</span><span class="u3">人员选择</span><i></i>'
    +   '   </div>'
    +   '   <div class="clearfix user-xz user-xz-bk user-bk">'
    +   '       <ul>'
    +   '           <li><label><input type="checkbox" class="vam">孙明明</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li><li><label><input type="checkbox" class="vam">张晓霞</label></li>'
    +   '       </ul>'
    +   '   </div>'
    +   '</span>'
    +   '</div>'
    +   '</div>'

    +   '<div class="lc-user lc-text lc-text-bk mt">'
    +   '   <dt class="boldn">请填写建议：</dt>'
    +   '       <dd><textarea name="Content" class="text" id="Content"></textarea><br><p class="gray">注：要求少于500个字</p></dd>'
    +   ' </div>'
    +   '<div class="lc-btns tc pt20 pb20 mt">'
    +   '   <button type="button"  id="btnOK" class="button bgorange bold white f14">确定</button><button type="button" id="btnReturn" class="button bgblue bold white f14 ml30">返回</button>'
    +   '</div>'
   // +   '<div class="lc-steps">'
   // +   '   <span class="sed"></span><span class="sing">2F<br>流向</span><span>3F<br>流向</span>'
   // +   '</div>'
    +   '</div>'
    +   '</div>'

    + '</div>'
    + '</div>'
    + '</div>';


com.sinoprof.workflow.dialog.submitForm ={
    sfActObj:{
        actionType:"1",
        flowAppId:-1,
        flowAppName:"",
        actId:"",
        handleGroup:"",
        keyWord:"",
        subject:"",
        appDataKeyId:"",
        nextFlowCode:"",
        nextTaskName:"",
        nextGroupName:"",
        nextUserLoginName:"",
        opinion:""
    },
    onSubmitValidateFun: {},
    onSubmitCallBackFun :{},
    onSaveCallBackFun :{},
    selectNextFlow: function (){
        var parameters = $.extend(true,{ctx:"nil",appEntity:"nil"},arguments[0]);
        this.onSubmitCallBackFun  = function(result){
            if(parameters.callbackFun){parameters.callbackFun(result);}
        };
        this.onSubmitValidateFun  = function(result){
            if (parameters.validateFun) {
                return parameters.validateFun(result);
            } else {
                return true;
            }
        };

        var applObj = parameters.appEntity;

        this.sfActObj.actId =  $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup =  $('#sf_handlerGroup').val();
        var actObj = this.sfActObj;
        $('#nextFlowSelectModal').remove();
        if($('#nextFlowSelectModal').length == 0) {
            $(com.sinoprof.workflow.dialog.nextFlowSelectHtml).appendTo('body');
            $("#nextFlowSelectModal").on("show.bs.modal",function(){
                $("#nextFlowSelectUl").empty();
                $.post(parameters.ctx + "/batchSubmit/getBatchFlow",
                    {taskId: batchParam.taskId},
                    function(data){

                        $.each(data,function(index,item) {
                                var htmlStr = '<li taskId="' + item.taskId
                                    + '" taskName="' + item.taskName
                                    + '" flowCode="' + item.flowCode
                                    + '" flowType="' + item.flowType
                                    + '" trayType="' + item.trayType
                                    + '" hint="' + item.hint
                                    + '" groupName="' + item.groupName
                                    + '" roleName="' + item.roleName
                                    + '"><i class="icon"></i><h3>' + item.flowDesc + '</h3></li>';

                                $("#nextFlowSelectUl").append($(htmlStr));
                            }
                        );
                        $("#nextFlowSelectUl li").one("click", function (e) {

                            var flowCode = $(this).attr("flowCode");
                            var flowType = $(this).attr("flowType");
                            var splitNextTaskName = $(this).attr("splitNextTaskName");
                            var splitNextLineCount = $(this).attr("splitNextLineCount");
                            var hint = $(this).attr("hint");

                            com.sinoprof.workflow.dialog.submitForm.sfActObj.nextFlowCode = flowCode;
                            com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName = $(this).attr("taskName");
                            com.sinoprof.workflow.dialog.submitForm.sfActObj.hint = hint;

                            com.sinoprof.workflow.dialog.submitForm.sfActObj.trayType = $(this).attr("trayType");
                            com.sinoprof.workflow.dialog.submitForm.sfActObj.flowType = $(this).attr("flowType");
                            com.sinoprof.workflow.dialog.submitForm.sfActObj.splitNextTaskName = splitNextTaskName;
                            com.sinoprof.workflow.dialog.submitForm.sfActObj.splitNextLineCount = splitNextLineCount;
                            nextFlowSelect = $(this).text();

                            var actObj = com.sinoprof.workflow.dialog.submitForm.sfActObj;
                            if ($(this).attr("taskName") == "SPLIT") {
                                // TODO 暂不考虑并流
                                BootstrapDialog.alert("暂不支持批量会签。");
                                return;
                                // com.sinoprof.workflow.dialog.submitForm.processParallelFlow(parameters.ctx, actObj, applObj);
                            } else {
                                if ($('#nextFlowUserSelectModal').length == 0) {
                                    $(com.sinoprof.workflow.dialog.nextFlowUserSelectHtml).appendTo('body');
                                    setFlowModalContentHeight();
                                    $("#nextFlowSelectTxt").empty();

                                    $("#nextFlowUserSelectModal").on("show.bs.modal", function () {

                                        $("#nextFlowSelectTxt").html(nextFlowSelect);
                                        $("#nextFlowGroupDiv").html("");
                                        $("#nextFlowUserSelectedDl").empty();
                                        $(this).find("#opinion").val(hint);

                                        if (flowType == "3") {
                                            // 直送经办人不在页面选择
                                            return;
                                        }

                                        $.post(parameters.ctx + "/batchSubmit/getBatchGroup",
                                            {
                                                sfactHandlerGroup: batchParam.sfactHandlerGroup,
                                                sfactPlusGroup: batchParam.sfactPlusGroup,
                                                sfactProjName: batchParam.projName,
                                                sfactTaskId: batchParam.taskId,
                                                flowCode: flowCode
                                            },
                                            function (data) {
                                                $.each(data, function (index, item) {
                                                    var groupId = "group" + index;
                                                    var groupIdDiv = "#" + groupId;
                                                    var groupHtml = '<div id= "' + groupId + '" groupName = "' + item.groupName + '">';
                                                    groupHtml = groupHtml + '<div class="clearfix user-bm mt" groupName="' + item.groupName + '">'
                                                        + '  <span class="u1"></span><span class="u2" >' + item.groupName + '</span><span class="u3 orange bold" style="display:block"></span><i style="display:block"></i>'
                                                        + '</div></div>';
                                                    $("#nextFlowGroupDiv").append($(groupHtml));
                                                    actObj.nextSfGroupName = item.groupName;
                                                    com.sinoprof.workflow.dialog.submitForm.addGroupUsers(parameters.ctx, actObj, applObj, groupIdDiv);
                                                });
                                                var $user_bm = $(".user-bm");
                                                $user_bm.on("click", function () {
                                                    // BootstrapDialog.alert("click")
                                                    actObj.nextSfGroupName = $(this).attr("groupName");
                                                    if (actObj.trayType == "0" && actObj.flowType == "0" && actObj.nextTaskName != "SPLIT") {  //角色工作栏且不分发
                                                        $('#nextFlowUserSelectModal').find("input:checkbox").prop("checked", false);
                                                        $('#nextFlowUserSelectModal').find('input:checkbox').each(function () {
                                                            if ($(this).attr("name") == actObj.nextSfGroupName)
                                                                $(this).prop('checked', true);
                                                        });
                                                    }
                                                    // if (this.loaded != "true") {
                                                    //     this.loaded = "true"; // 防止重复提交
                                                    //     var groupIdDiv = "#" + $(this).parent().attr("id");
                                                    //     com.sinoprof.workflow.dialog.submitForm.addGroupUsers(parameters.ctx, actObj, applObj, groupIdDiv);
                                                    // }

                                                    $(".user-bm.user-bk").removeClass("user-bk");
                                                    $(this).addClass("user-bk");
                                                    $("#nextFlowUserSelectModal").find(".user-xz:visible").not($(this).next(".user-xz")).slideUp("slow");
                                                    $(this).next(".user-xz").slideToggle("slow");
                                                });
                                                if (actObj.nextTaskName == "STOP" || (actObj.nextTaskName == "JOIN"
                                                    && $("#nextFlowGroupDiv").find("div[groupName]").length == 0)) {
                                                    $("#nextFlowGroupDiv").prev().hide();
                                                }
                                                $("#nextFlowUserSelectModal").modal("adjustDialog");
                                            }
                                        );
                                    });

                                    $("#selectUsersFormBtnExit").bind("click", function (e) {
                                        $("#nextFlowUserSelectModal").modal('hide');
                                        //  $("#nextFlowUserSelectModal").empty();
                                    });
                                    $("#btnCancel1").bind("click", function (e) {
                                        clearFlowModalContentHeight();
                                        $("#nextFlowUserSelectModal").modal('hide');
                                        $("#nextFlowUserSelectModal").remove();
                                        $("#nextFlowSelectModal").modal();
                                    });
                                    $("#btnOK").bind("click", function (e) {
                                        // BootstrapDialog.alert("2222="+com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName);
                                        if (com.sinoprof.workflow.dialog.submitForm.sfActObj.flowType != "3"
                                            && com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName != "STOP"
                                            && (com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName != "JOIN"
                                            || $("#nextFlowGroupDiv").find("div[groupName]").length > 0)) {
                                            if ($('#nextFlowUserSelectModal').find('input:checkbox:checked').length == 0
                                                && $('#nextFlowUserSelectModal').find('input:radio:checked').length == 0) {
                                                BootstrapDialog.alert("请选择下一办理人！");
                                                return;
                                            }
                                        }
                                        if ($('textarea[name=Content]').val().length > 500) {
                                            BootstrapDialog.alert("审批意见不能超过500字。");
                                            return;
                                        }
                                        if (com.sinoprof.workflow.dialog.submitForm.submitFlow(parameters.ctx, applObj)) {
                                            // $("#nextFlowUserSelectModal").modal('hide');
                                        }
                                    });
                                }
                                //  }
                            }
                            $("#nextFlowSelectModal").modal('hide');
                            $("#nextFlowUserSelectModal").modal({backdrop: 'static', keyboard: false});

                        });
                        $("#selectFlowFormBtnExit").one("click", function (e) {
                            $("#nextFlowSelectModal").modal('hide');
                        });

                        $("#nextFlowSelectModal").modal("adjustDialog");
                    });
            });
            $('#nextFlowSelectModal').modal({backdrop:'static', keyboard: false});
        }else {
            $('#nextFlowSelectModal').modal({backdrop:'static', keyboard: false});
        }
    },
    addGroupUsers : function(ctx ,actObj, applDataObj ,groupIdDiv){

    var nextGroupName = actObj.nextSfGroupName;
    $.post(ctx + "/batchSubmit/getBatchUser",
        {
            sfactHandlerGroup: batchParam.sfactHandlerGroup,
            sfactPlusGroup: batchParam.sfactPlusGroup,
            sfactProjName: batchParam.projName,
            sfactTaskId: batchParam.taskId,
            flowCode: actObj.nextFlowCode,
            groupName: nextGroupName
        },
        function (data) {
            var htmlUsers = '<div userGroup="'+ nextGroupName +'" class="clearfix user-xz user-bk">'
                +'  <ul>';

            $.each(data, function (index, item) {
                if (actObj.nextTaskName == "SPLIT" ){
                    htmlUsers = htmlUsers + '      <li><label><input  name="' + nextGroupName + '" userGroup="' + nextGroupName + '" userDispName="' + item.username + '" type="checkbox" class="vam" value="' +  item.loginName + '">' + item.username + '</label></li>'
                }else if((actObj.trayType == "0" && actObj.flowType == "1")  || actObj.trayType == "1"  ) { // trayType: 0: 角色 1:指定至人    flowType = 1;分发
                    htmlUsers = htmlUsers + '      <li><label><input  name="nextUserRadio" userGroup="' + nextGroupName +'" type="radio"  userDispName="' + item.username + '" value="' + item.loginName +  '" class="vam">' + item.username + '</label></li>'
                }else{  //角色工作栏 且不分发
                    htmlUsers = htmlUsers + '      <li><label><input  name="' + nextGroupName + '" userGroup="' + nextGroupName + '" type="checkbox" checked class="vam" value="' +  item.loginName + '">' + item.username + '</label></li>'
                }
            });
            htmlUsers = htmlUsers +'  </ul>';
            htmlUsers = htmlUsers +'</div>';

            $(groupIdDiv).append($(htmlUsers));

            if($(groupIdDiv).find("input:checkbox:selected").length > 0){
                com.sinoprof.workflow.dialog.submitForm.setMutiUserPrompt();
            }

            $(groupIdDiv).find("input:radio").on("change", function () {
                com.sinoprof.workflow.dialog.submitForm.setSingleUserPrompt();
                var $userXz = $(this).parents(".user-xz").prev(".user-bm");
                $(".user-bm").not($userXz).find(".u1").removeClass("us");
                $userXz.find(".u1").addClass("us");
            });

            $(groupIdDiv).find("input:checkbox").on("change", function () {
                com.sinoprof.workflow.dialog.submitForm.setMutiUserPrompt();
                var $userXz = $(this).parents(".user-xz");
                if ($userXz.find("input:checked").length == 0) {
                    $userXz.prev(".user-bm").find(".u1").removeClass("us");
                } else {
                    $userXz.prev(".user-bm").find(".u1").addClass("us");
                }
            });

            setTimeout(function () {
                var $user_bm = $(".user-bm");
                if ($user_bm.length == 1) {
                    $user_bm[0].click();
                }
            }, 500);

            var $nextFlowGroupDiv = $("#nextFlowGroupDiv");
            var $selectUser = $nextFlowGroupDiv.find("input:radio");
            if ($selectUser.length == 1) {
                $selectUser[0].click();
            }
            $selectUser = $nextFlowGroupDiv.find("input:checkbox");
            if ($selectUser.length == 1) {
                $selectUser[0].click();
            }
        })
    },
    setSingleUserPrompt : function (){
     //   BootstrapDialog.alert("here");
        
        var userSelecthtml = '       <div>'
            +  '       <dt class="fl tr"> <span class="xzlb fl tr">办理部门/办理人：</span><span id="nextGroup" class="gray fl tl ml-10">' +  $("input[name='nextUserRadio']:checked").attr("userGroup") + '</span></dt>'
            +  '       <dd id="nextUsers" class="fl">'
            +   '           <ul><li>' + $("input[name='nextUserRadio']:checked").attr("userDispName") + '</li></ul>'
            +   '       </dd>'
            +   '       </div>';
        $("#nextFlowUserSelectedDl").html(userSelecthtml);
    },
    setMutiUserPrompt:function(){

        var userSelecthtml = "";
        var lastGroup = "";
        $('#nextFlowUserSelectModal,#parallelFlowUserSelModal').find('input:checkbox:checked').each(function() {
            //       count ++;

            if (lastGroup == ""){
                userSelecthtml = userSelecthtml + '       <div>'
                +   '       <dt class="fl tr"> <span class="xzlb fl tr">办理部门/办理人：</span><span id="nextGroup" class="gray fl tl ml-10">' + $(this).attr("userGroup") + ' </span></dt>'
                +   '       <dd id="nextUsers" class="fl">'
                +   '           <ul><li>' +  $(this).parent().text() ;

                lastGroup =  $(this).attr("userGroup");
            }else if (lastGroup == $(this).attr("userGroup")){
                userSelecthtml = userSelecthtml + "、" + $(this).parent().text()
            }else{
                lastGroup =  $(this).attr("userGroup");
                userSelecthtml = userSelecthtml + '</li></ul>'
                +   '       </dd>'
                +   '       </div>'
                +   '       <div class="clearfix"></div>'
                +   '           <dt class="fl tr"><span class="gray fl tl ml-10"> ' + $(this).attr("userGroup") + '</span></dt>'
                +   '            <dd class="fr">'
                +   '               <ul><li>' +  $(this).parent().text()

            }
        });
        userSelecthtml = userSelecthtml  + '    </li></ul>'
        +   '           </dd>'
        +   '       </div>';


        $("#nextFlowUserSelectedDl").html(userSelecthtml);
    },

    addParallelUserHtml:function(ctx,flowItem, groupItem,userItem, actObj, applDataObj){
        var userHtml = '<li><label><input type="checkbox" onclick="parallelFlowUserSelect(this)" flowTask="' + flowItem.taskName + '" userGroup="' + groupItem.groupName + '" userDispName="' + userItem.userDispName + '" class="vam" value="' + userItem.userLoginName + '">' + userItem.userDispName + '</label></li>';
        var groupHtmlUl = '#' + flowItem.taskName + '_' + groupItem.groupName.replaceAll(".","_");

        $(groupHtmlUl).append($(userHtml));
    },
    addParallelUserListHtml:function(ctx,flowItem, groupItem, actObj, applDataObj){

        actObj.nextSfGroupName = groupItem.groupName;
        $.ajax({
            type : "get",
            url : ctx + "/flow/ui/getUserListWithJson",
            data :  {actObj:JSON.stringify(actObj) ,applObj:JSON.stringify(applDataObj), parallelFlowCode:flowItem.flowCode },
            //async : false,
            dataType: "json",
            success : function(data){
                $.each(data, function (index, item) {
                    com.sinoprof.workflow.dialog.submitForm.addParallelUserHtml(ctx,flowItem,groupItem,item, actObj, applDataObj);
                })
            }
        });
    },
    addParallelGroupHtml:function(ctx,flowItem, groupItem, actObj, applDataObj) {
        var groupHtml = '<span class="lc-row">';
        groupHtml = groupHtml + '<div class="user-bm">';
        groupHtml = groupHtml + '<span class="u1"></span><span class="u2">' + groupItem.groupName + '</span><span class="u3">人员选择</span><i></i>';
        groupHtml = groupHtml + '</div>';
        groupHtml = groupHtml + '<div class="clearfix user-xz user-xz-bk user-bk">';
        groupHtml = groupHtml + '<ul id="' + flowItem.taskName + '_' + groupItem.groupName.replaceAll(".","_") + '">';
        groupHtml = groupHtml + '</ul>';
        groupHtml = groupHtml + '</div>';
        groupHtml = groupHtml + '</span>';
        var parallelTaskDiv = '#' + flowItem.taskName;
        $(parallelTaskDiv).append($(groupHtml));
        com.sinoprof.workflow.dialog.submitForm.addParallelUserListHtml(ctx, flowItem, groupItem, actObj, applDataObj);
    },
    addParallelGroupListHtml:function(ctx,flowItem, actObj, applDataObj ){

        $.ajax({
            type : "post",
            url : ctx + "/flow/ui/getGroupListWithJson",
            data :  {actObj:JSON.stringify(actObj) ,applObj:JSON.stringify(applDataObj), parallelFlowCode:flowItem.flowCode },
            async : false,
            dataType: "json",
            success : function(data){
                $.each(data, function (index, item) {
                    com.sinoprof.workflow.dialog.submitForm.addParallelGroupHtml(ctx,flowItem,item, actObj, applDataObj);
                })
            }
        });
    },

    addParallelFlowHtml:function(ctx, item,actObj, applDataObj){
        var flowHtml = '<div class="lc-title black mt pl30"><span class="pl15 bold"></span><span>' + item.flowDesc + '</span></div>';
          flowHtml +=  '<div class="row parallel-users"><ul></ul></div>';
          flowHtml +=  '<div id="' + item.taskName +  '" class="lc-user lc-user-bk p10 mt5">';
          flowHtml +=  '</div>';
        $("#parallelFlowDiv").append($(flowHtml));

        com.sinoprof.workflow.dialog.submitForm.addParallelGroupListHtml(ctx,item , actObj, applDataObj)
    },
    addParallelFlows : function(ctx ,actObj, applDataObj){
        $("#parallelFlowDiv").empty();
        $.ajax({
            type : "post",
            url : ctx + "/flow/ui/getParallelFlowListWithJson",
            data :  {actObj:JSON.stringify(actObj) ,applObj:JSON.stringify(applDataObj)},
            async : false,
            dataType: "json",
            success : function(data){
                $.each(data, function (index, item) {
                    com.sinoprof.workflow.dialog.submitForm.addParallelFlowHtml(ctx, item,actObj, applDataObj);
                })
            }
        });
    },
    processParallelFlow: function(ctx, actObj, applObj){
        if ($('#parallelFlowUserSelModal').length == 0) {
            $(com.sinoprof.workflow.dialog.parallelFlowUserSelHtml).appendTo('body');
            setFlowModalContentHeight();
          //  $("#nextFlowSelectTxt").empty();
            $("#parallelFlowUserSelModal").on("show.bs.modal", function () {
                com.sinoprof.workflow.dialog.submitForm.addParallelFlows(ctx,actObj, applObj);
                $(this).find("#Content").val(actObj.hint);
                $(".user-bm").on("click",function() {
                    $(".user-bm.user-bk").removeClass("user-bk");
                    $(this).addClass("user-bk");
                    $("#parallelFlowUserSelModal").find(".user-xz:visible").not($(this).next(".user-xz")).slideUp("slow");
                    $(this).next(".user-xz").slideToggle("slow");
                });
            });
            $("#paralFlowFormBtnExit").bind("click", function (e) {
                $("#parallelFlowUserSelModal").modal('hide');
            });
            $("#btnReturn").bind("click", function (e) {
                clearFlowModalContentHeight();
                $("#parallelFlowUserSelModal").modal('hide');
                $("#parallelFlowUserSelModal").remove();
                $("#nextFlowSelectModal").modal();
            });
            $("#btnOK").bind("click", function (e) {
               // BootstrapDialog.alert("1111" + com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName)
                if (com.sinoprof.workflow.dialog.submitForm.sfActObj.nextTaskName != "STOP") {
                    if ($('#parallelFlowUserSelModal').find('input:checkbox:checked').length == 0 && $('input:radio:checked').length == 0) {
                        BootstrapDialog.alert("请选择下一办理人！")
                        return;
                    }
                }
                if ($('textarea[name=Content]').val().length > 500) {
                    BootstrapDialog.alert("审批意见不能超过500字。");
                    return;
                }
                if (com.sinoprof.workflow.dialog.submitForm.submitFlow(ctx, applObj)) {
                    // $("#parallelFlowUserSelModal").modal('hide');
                }
            });

            $('#parallelFlowUserSelModal').modal({backdrop:'static', keyboard: false});
        }else{
            $('#parallelFlowUserSelModal').modal({backdrop:'static', keyboard: false});
        }
    },
    addParallelTask: function(ArrNextTasks ,taskName, groupName,userLoginName){
        for( i =0 ; i < ArrNextTasks.length ; i ++){
            if (ArrNextTasks[i].taskName == taskName){
                ArrNextTasks[i].groupName = ArrNextTasks[i].groupName +  ";" + groupName;
                ArrNextTasks[i].userLoginName = ArrNextTasks[i].userLoginName +  ";" + userLoginName;

                return ArrNextTasks;
            }
        }
        var nextParallelTask = new Object();
        nextParallelTask.taskName = taskName;
        nextParallelTask.groupName = groupName;
        nextParallelTask.userLoginName = userLoginName;
        ArrNextTasks[ArrNextTasks.length] = nextParallelTask;

        return ArrNextTasks;

    },
    submitFlow: function (ctx ,  applObj) {

        this.sfActObj.actionType = "1";  //1 提交 2 退回 3 转发
        this.sfActObj.actId =  $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup =  $('#sf_handlerGroup').val();
        this.sfActObj.currentGroupName =  $('#sf_group').val();
            //  actUI currentUserId = "";
        this.sfActObj.opinion = $('textarea[name=Content]').val();
        if (this.sfActObj.opinion.length > 500) {
            BootstrapDialog.alert("审批意见不能超过500字。");
            return false;
        }
            //workflowObj.keyWord = "";
            //workflowObj.subject = "";
            //workflowObj.appDataKeyId = "";
     //   BootstrapDialog.alert("taskName = " + this.sfActObj.nextTaskName) ;

        if (this.sfActObj.nextTaskName == "SPLIT") {

            var ArrNextTasks = new Array();

            this.sfActObj.nextSfGroupName = "";
            this.sfActObj.nextLoginName =  "";
          //  var nextParallelTask = new Object();

          //  nextParallelTask.flowCode = this.sfActObj.flowCode;
            //  actionTask.flowDesc = "";\

           // if (this.sfActObj.splitNextLineCount == 1)
           //     nextParallelTask.taskName = this.sfActObj.splitNextTaskName;
            // actionTask.taskDesc = "";
            var groupStr = "";
            var userStr = "";

            $('#parallelFlowUserSelModal').find('input:checkbox:checked').each(function(){
                ArrNextTasks = com.sinoprof.workflow.dialog.submitForm.addParallelTask(ArrNextTasks, $(this).attr("flowTask"), $(this).attr("userGroup"),$(this).val());
            });
          //  nextParallelTask.taskName = $(this).attr("flowTask");
           // nextParallelTask.groupName = groupStr;
           // nextParallelTask.userLoginName = userStr;
            this.sfActObj.nextParallelTaskList = ArrNextTasks;
        }else{

            if(this.sfActObj.trayType == "0" && this.sfActObj.flowType == "0"){//角色工作栏，且不分发

                var userStr = "";
                var userGroup ="";
                $('#nextFlowUserSelectModal,#parallelFlowUserSelModal').find('input:checkbox:checked').each(function(){

                    if(userStr == "") {
                        userStr  = $(this).val();
                    }else {
                        userStr  =  userStr + ";" + $(this).val();
                    }
                    userGroup = $(this).attr("userGroup");


                });
                this.sfActObj.nextSfGroupName = userGroup;
                this.sfActObj.nextLoginName =  userStr;
            }else{
                this.sfActObj.nextSfGroupName = $("input[name='nextUserRadio']:checked").attr("userGroup");
                this.sfActObj.nextLoginName =  $("input[name='nextUserRadio']:checked").val();
            }
        }
        var workflowJson = JSON.stringify(this.sfActObj);
        //下面这句话。针对于IE8，比较低的小版本bug.

        workflowJson = workflowJson.replace(new RegExp("null","gm"),"");

        $("#sf_appFieldValue").val(workflowJson);

        //workflowObj.appEntity = parameters.appEntity;
        if (this.onSubmitValidateFun(this.sfActObj) == false) {
            return false;
        } else {
            showSinoWaiting();
            this.onSubmitCallBackFun(this.sfActObj);
            return true;
        }
    },

    saveFlow: function (){

        var parameters = $.extend(true,{ctx:"nil",appEntity:"nil"},arguments[0]);
        this.onSaveCallBackFun  = function(result){
            if(parameters.callbackFun){parameters.callbackFun(result);}
        }

        var applObj = parameters.appEntity;
        var ctx = parameters.ctx;

        this.sfActObj.actId =  $('#sf_actID').val();

        this.sfActObj.actionType = "1";  //1 提交 2 退回 3 转发,4
        this.sfActObj.actId =  $('#sf_actID').val();
        this.sfActObj.flowAppId = $('#sf_appID').val();
        this.sfActObj.handleGroup =  $('#sf_handlerGroup').val();
        this.sfActObj.currentGroupName =  $('#sf_group').val();
        //  actUI currentUserId = "";
        this.sfActObj.opinion = $('#opinion').val();

        var workflowJson = JSON.stringify(this.sfActObj);
        //下面这句话。针对于IE8，比较低的小版本bug.

        workflowJson = workflowJson.replace(new RegExp("null","gm"),"");

        $("#sf_appFieldValue").val(workflowJson);

        //workflowObj.appEntity = parameters.appEntity;

        this.onSaveCallBackFun(this.sfActObj);

    }
};

function setFlowModalContentHeight() {
    $(".modal-content-pop-box").css("height", $(window).height() - 40);
}

function clearFlowModalContentHeight() {
    $(".modal-content-pop-box").css("height", "auto");
}

// 会签人员过滤
function filterUser() {
    var obj = $("#flowUserFilter")[0];
    var flowUserDiv = $("#parallelFlowDiv");
    flowUserDiv.find("input:checkbox").each(
        function () {
            var userDispName = $(this).attr("userDispName");
            if (obj.value == null || obj.value == "" || userDispName.indexOf(obj.value) != -1) {
                $(this).parents("li:first").show();
            } else {
                $(this).parents("li:first").hide();
            }
        }
    );
    flowUserDiv.find("span.lc-row").each(
        function () {
            if (obj.value == null || obj.value == "") {
                $(this).show();
            } else {
                var displayUsers = $(this).find("input:checkbox[userDispName*="+obj.value+"]");
                if (displayUsers.length == 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        }
    );
}

// 单选人员过滤
function filterUser2() {
    var obj = $("#flowUserFilter")[0];
    var flowUserDiv = $("#nextFlowGroupDiv");
    flowUserDiv.find("input:radio").each(
        function () {
            var userDispName = $(this).attr("userDispName");
            if (obj.value == null || obj.value == "" || userDispName.indexOf(obj.value) != -1) {
                $(this).parents("li:first").show();
            } else {
                $(this).parents("li:first").hide();
            }
        }
    );
    flowUserDiv.children().each(
        function () {
            if (obj.value == null || obj.value == "") {
                $(this).show();
            } else {
                if ($(this).find("input:radio[userDispName*="+obj.value+"]").length == 0) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            }
        }
    );
}

function parallelFlowUserSelect(obj) {
    var $userXz = $(obj).parents(".user-xz");
    if ($userXz.find("input:checkbox:checked").length == 0) {
        $userXz.prev(".user-bm").find(".u1").removeClass("us");
    } else {
        $userXz.prev(".user-bm").find(".u1").addClass("us");
    }
    // 人员选中/取消时展示在上方
    var $parallelUsers = $("#" + $(obj).attr("flowTask")).prev().find("ul");
    var user = $(obj).attr("userDispName") + "/" + $(obj).attr("userGroup");
    if (obj.checked == true) {
        $parallelUsers.append("<li id='" + obj.value + "'>" + user + "</li>");
    } else {
        $parallelUsers.find("#" + obj.value).remove();
    }
}