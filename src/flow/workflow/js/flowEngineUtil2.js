var isParallelFlow = false;
var multiParallelFlow = false;
var cycleStr = "";
var saveGroup = "";
var haveCycleUser = false;
var Launch_SelectUsers = "";
var disError = false;
var joinStr = "";
var afterJoin = false;
var iniHandleGroup = "";

//从服务器取下一任务信息
function getNextTask2() {

    disError = false;
    multiParallelFlow = false;
    cycleStr = "";
    saveGroup = "";
    var reviewArray;
    var type;
    var taskData = "";
    var count;
    clearLaunchPara();

    processReviewUsers = false;
    restoreInfo();

    var cycle = false;
    haveCycleUser = false;
    if(document.getElementById("sf_taskctl").value == "3") {    //阅示
        if(document.getElementById("sf_reviewQty").value == "0") {
            var resText = "";
//            Launch_ReviewUsers = "";
            SFGroupReview();
            if(!Launch_Continue) {
                if(Error_Msg != "")
                    BootstrapDialog.alert(Error_Msg);
                return "";
            } else {
                if(Launch_ReviewUsers != "") {
                    resText = constructReviewUsers();
                }
            }
            var review = true;
            if(Launch_SendType == 2) {
                review = false;
            } else if(resText == "") {
/*
                review = confirm("系统设置了阅示, 按确定选择阅示人, 按取消不进行阅示直接流到下一任务?");
                if(review) {
                    resText = selectReviewDlg(document.getElementById("sf_taskid").value);
                    if(resText == "")
                        return "";
                }
*/
                if(Launch_ReviewUsers == "")
                    review = false;
            }
            if(review) {
                eval("reviewArray = " + resText);
                type = new Number(reviewArray[0].type) + new Number(reviewArray[0].waitType) * 2;
                save_reviewType = document.getElementById("sf_reviewType").value;
                document.getElementById("sf_reviewType").value = type;
                var ReviewUsers = reviewArray[0].users;
                save_reviewUsers = document.getElementById("sf_reviewUsers").value;
                document.getElementById("sf_reviewUsers").value = ReviewUsers;
                save_reviewQty = document.getElementById("sf_reviewQty").value;
                document.getElementById("sf_reviewQty").value = getCharCount(ReviewUsers, ';');
                if(reviewArray[0].waitType == "1") {
                    taskData = selectFlow2(document.getElementById("sf_taskid").value, "", "0");
                    processReviewUsers = true;
                } else {
                    processReviewUsers = true;
//                    BootstrapDialog.alert("阅示设置为等待, 必须所有阅示人员阅示完毕才可完成, 可使用?存保存信息！");
                }
                ShowSinoButton(7);
            } else {
                taskData = selectFlow2(document.getElementById("sf_taskid").value, "", "0");
            }
        } else {
            save_nextTaskData = document.getElementById("sf_nextTaskData").value;
            setFlowPara(save_nextTaskData);
            type = new Number(flowArray[0].reviewType);
            if((type & 0x20) == 0x20) {
                var reviewQty = flowArray[0].reviewQty;
                if(reviewQty == "1") {
                    taskData = "[{length:'0', taskFlowType:'" + flowArray[0].taskFlowType + "', taskID:'"
                            + flowArray[0].taskID + "'}]";
                } else {
                    var allReviewUsers = flowArray[0].reviewUsers;
                    Launch_ReviewUsers = allReviewUsers.substring(allReviewUsers.indexOf(";") + 1,
                            allReviewUsers.length);

                    SFGroupReview();
                    if(!Launch_Continue) {
                        if(Error_Msg != "")
                            BootstrapDialog.alert(Error_Msg);
                        return "";
                    } else {
                        if(Launch_ReviewUsers != "") {
                            resText = constructReviewUsers();
                        }
                    }
                    if(Launch_ReviewUsers != "") {
                        assignedFlowArray[0].reviewQty = getCharCount(Launch_ReviewUsers, ';');
                        assignedFlowArray[0].reviewUsers = Launch_ReviewUsers;
                        count = Launch_ReviewUsers.indexOf(";");
                        if(count > 0)
                            assignedFlowArray[0].usernames = Launch_ReviewUsers.substr(0, count);
                        else
                            assignedFlowArray[0].usernames = Launch_ReviewUsers;
                    }
                                        if(assignedFlowArray[0].cycleType == "1") {
                        assignedFlowArray[0].groupName = getGroupName(assignedFlowArray[0].usernames, document.getElementById("sf_role").value);
                    }    
                    assignedFlowArray[0].realnames = getRealname(assignedFlowArray[0].usernames) + "/" +
                                                    assignedFlowArray[0].groupName;
                    taskData = constructFlow(assignedFlowArray[0]);
                }
            } else {
                taskData = checkReviewStatus(document.getElementById("sf_actID").value);
            }

            do_Div_Complete_End(taskData);
        }
    } else {     //非阅示

        var cycleCount = document.getElementById("sf_cycleQty").value;

        if(cycleCount == "" || cycleCount == "0" || cycleCount == "1") {

            if(document.getElementById("sf_taskctl").value == "2" && cycleCount == "0") { //sf_taskctl = 2 会签
               var tempFlowProp;

                eval("tempFlowProp = " + document.getElementById("sf_nextTaskData").value);
                tempFlowProp[0].flowType = "2";
                new extFlowObject.show();
                extFlowObject.setselectSubmitStatus(false);
                taskData = getReturnProp2(tempFlowProp[0]);
                if(taskData == "") {
//                    if(confirm("是否不进行会签?"))
                        do_selectCancel();

                        taskData = selectFlow2(document.getElementById("sf_taskid").value, "", "0");

                } else {
                    cycle = true;
                }
                cycleStr = taskData;
            } else {   //非阅示、会签 流转
                save_cyelcQty = "0";
                save_cycleUsers = "";
                save_cycleType = "";

                taskData = selectFlow2(document.getElementById("sf_taskid").value, "","0");
            }
        } else {


            save_nextTaskData = document.getElementById("sf_nextTaskData").value;

            setFlowPara(save_nextTaskData);

            var allCycleUsers = flowArray[0].cycleUser;
            var CycleUsers = allCycleUsers.substring(allCycleUsers.indexOf(";") + 1, allCycleUsers.length);
            Launch_CycleUsers = CycleUsers;
            Launch_CycleQueryUsers = CycleUsers;
            Launch_IsEndCycleView = false;
            Launch_CycleQueryType = "0";
            Launch_CycleType = flowArray[0].taskCycleType;

            SFQueryCycleReview();
            if(!Launch_Continue) {
                if(Error_Msg != "")
                    BootstrapDialog.alert(Error_Msg);
                return "";
            }

            if(Launch_IsEndCycleView) {
                save_cycleQty = "0";
                save_cycleUsers = "";
                save_cycleType = "";
                taskData = selectFlow2(document.getElementById("sf_taskid").value, Launch_Code,"0");
            } else {
               CycleUsers = Launch_CycleUsers;

               if(CycleUsers != "") {
                    assignedFlowArray[0].cycleQty = getCharCount(CycleUsers, ';');
                    assignedFlowArray[0].cycleUser = CycleUsers;
                    count = CycleUsers.indexOf(";");
                    var cycUsers;
                    if(count > 0)
                        cycUsers = CycleUsers.substr(0, count);
                    else
                        cycUsers = CycleUsers;
                    cycUsers = cycUsers.replaceAll(",", ";");
                    if(count > 0)
                        assignedFlowArray[0].usernames = cycUsers;
                    else
                        assignedFlowArray[0].usernames = cycUsers;
                                         if(assignedFlowArray[0].cycleType == "1") {
                        assignedFlowArray[0].groupName = getGroupName(assignedFlowArray[0].usernames, document.getElementById("sf_role").value);
                    }    
                  assignedFlowArray[0].realnames = getRealname(assignedFlowArray[0].usernames) + "/" + 
                                                    assignedFlowArray[0].groupName;
                   taskData = constructFlow(assignedFlowArray[0]);
                   cycle = true;
                } else {  //常规处理

                   save_cycleQty = "0";
                   save_cycleUsers = "";
                   save_cycleType = "";
                   taskData = selectFlow2(document.getElementById("sf_taskid").value, Launch_Code,"0");
                }
            }
            cycleStr = taskData;
        }
    }

    if(cycle) {
        fullSelect("[" + cycleStr + "]");
    }

    if(processReviewUsers) {

        do_Div_Complete_End(taskData);
    }
    return taskData;
}

function selectFlow2(taskid, flowCode, isCycle) {
/*
    clearFlowSelect();
    clearGroupSelect();
    clearParticipantsSelect();
    */
    var selectFlowURL = getBasepath() + "/flow/ui/GetNextTaskCount?sf_taskID="
            +taskid+"&sf_flowCode="+flowCode
            +"&isCycle="+isCycle+"&sf_handlerStatus="
            +document.getElementById("sf_handlerStatus").value
            +"&sf_actID="+document.getElementById("sf_actID").value
            +"&event="+document.getElementById("sf_event").value;

   // BootstrapDialog.alert("document.sf_handlerStatus"+document.getElementById("sf_handlerStatus").value)
    selectFlowURL = encodeURI(selectFlowURL);

    makeRequest(selectFlowURL, getNextTaskCount2);
    return ajaxReturn;
}

//从服务器取下一节点信息，如果多于一个节点，弹出
function getNextTaskCount2() {
  //  BootstrapDialog.alert("000")
    try {
        //   BootstrapDialog.alert("111")
        ajaxReturn = "";
        if (http_request.readyState == 4 || http_request.readyState == "complete") {
          //  BootstrapDialog.alert("222")
            var resText = http_request.responseText;
           // BootstrapDialog.alert("333")
          //  BootstrapDialog.alert("resText="+resText);
            if(resText == 'ERROR2') {
                BootstrapDialog.alert("辅流设置为等待,必需所有辅流完成后才能完成!");
                ajaxReturn = "";
                return;
            } else if (resText.indexOf('ERROR') >= 0) {
              //  BootstrapDialog.alert("444")
                if(resText.indexOf('message') >= 0) {
                    var res;
                    eval("res = " + resText);
                    BootstrapDialog.alert(res[0].message);
                } else {
                    BootstrapDialog.alert("取下一任务流向出错，请重新尝试提交或通知系统管理员！");
                }
                ajaxReturn = "";
                return;
            }

            ajaxReturn = fullSelect(resText);
       }
    } catch(e) {
        BootstrapDialog.alert("取下一任务流向出错！请通知系统管理员！" + e.message);
    }
}

function fullSelect(flowStr) {

    new extFlowObject.show();
  //  BootstrapDialog.alert("fullselect 2")
    extFlowObject.setselectSubmitStatus(false);
//    new extFlowObject.DisplayObj();
             //    BootstrapDialog.alert("flowStr="+flowStr);
    var prop;
    //BootstrapDialog.alert("first2 = " +flowStr.substr(1,flowStr.length -2))
    //eval("prop = " + flowStr.substr(1,flowStr.length -2));
    if (flowStr.substr(0,1)=="\"")
        flowStr = flowStr.substr(1,flowStr.length -2)

    eval("prop = " + flowStr);
  //  BootstrapDialog.alert("prop1="+prop)

    //BootstrapDialog.alert("flowStr="+flowStr)
    //BootstrapDialog.alert("prop2="+prop)
    processTasks2(prop, flowStr);
    document.getElementById("myOpinion").value =extFlowObject.getCommentValue();
    new extFlowObject.HideSelectObj();	
}

function processTasks2(prop, str) {
    var retStr = "";
    var i;

                         //      BootstrapDialog.alert("prop.length="+prop.length);
    if(prop.length == 1) {    //只有一个流向

        if(prop[0].length) {
            retStr = processTasks2(prop[0], str.substring(1, str.length - 1));
            if(retStr == "")
                return retStr;
          //  BootstrapDialog.alert("retStr = " + retStr);
            return "[" + retStr + "]";
        }

        if(prop[0] && prop[0].taskName == "SPLIT")
        	return processMultipleTask2(prop[0], str);

	    retStr = processSingleTask2(prop[0], str.substring(1, str.length - 1));

        if(retStr == "" || retStr == "undefined")
            return "";
        else {
            var prop2;
            eval("prop2 = " + retStr);
            if(prop2) {
                if(!prop2.length && prop2.taskName == "JOIN") {
/*
//                    if(extFlowObject.GetParsonCount() <= 0) {
                    extFlowObject.removeAllParsonItem();
                        document.getElementById("toParson").parentNode.previousSibling.innerHTML = "等待办理人:";
                        var users = getParallelUsers(document.getElementById("sf_actID").value);
                        if(users.indexOf("usernames") >= 0) {
                            var userArr;
                            eval("userArr = " + users);
                            var realnames = userArr[0].realnames.split(";");
                            for(var i = 0; i < realnames.length; i++)
                                new extFlowObject.addparsonItem("", realnames[i]);
                        } else {
                            new extFlowObject.addparsonItem("", "");
                        }
//                    }
                }else if(!prop2.length && prop2.taskName == "STOP"){
	 				if(extFlowObject.GetParsonCount() <= 0) {
                		new extFlowObject.addparsonItem("", "交与办理人");
                	}
*/
                    extFlowObject.setselectSubmitStatus(true);
                }
          //      BootstrapDialog.alert("processSingleTask2-2="+ retStr);
                return "[" + retStr + "]";
            } else {
                return "";
            }
        }
    } else {

        var taskName = prop[0].taskName;
       // BootstrapDialog.alert("processTasks2, taskName="+taskName);
        var condFlow = getFlowPropInArray(prop[1]).condFlow;

        if(taskName == "SPLIT") {
         //   BootstrapDialog.alert("processTasks2, before fillFlow");
            fillFlowStr(str);
            //BootstrapDialog.alert("processTasks2, after fillFlow ,before processMultipleTask2");
            return processMultipleTask2(prop[0], str);
        } else if((taskName == "JOIN" || taskName == "STOP" || prop[0].taskFlowType == "4")
                && condFlow != '1') {
           // BootstrapDialog.alert("11111");
            var tasksStr = getFlowStr(str.substring(1, str.length - 1));
            var tempStr;
            retStr = "";
            for(i = 0; i < prop.length; i++) {
                if(prop[i].length)
                    tempStr = processTasks2(prop[i], tasksStr[i]);
                else {
                	if(tasksStr[0] != '[')
                		tempStr = processSingleTask2(prop[i], "[" + tasksStr + "]");
                	else
                    	tempStr = processSingleTask2(prop[i], tasksStr); //tasksStr[i]);
                }
                if(tempStr == "")
                    return tempStr;
                if(retStr != "")
                    retStr += ",";
                retStr += tempStr;
            }
            return "[" + retStr + "]";
        } else {
           // BootstrapDialog.alert("condFlow=" + condFlow);
            if(condFlow == "1") {
                if(taskName == "JOIN" && afterJoin) {
                    joinConditional = true;
                    var temp = processConditionalTask2(prop, str);
                    while (temp.indexOf('[') == 0) {
                        temp = temp.substring(1, temp.length - 1);
                    }
                    joinStr = temp = "[" + constructShortFlow(prop[0]) + "," + temp + "]";
                    return temp;
                } else {
                    var retStr = processConditionalTask2(prop, str);
                    afterJoin = true;
                    return retStr;
                }
            } else {
                tasksStr = getFlowStr(str.substring(1, str.length - 1));
                tempStr;
                retStr = "";
                for(i = 0; i < prop.length; i++) {
                    if(prop[i].length)
                        tempStr = processTasks2(prop[i], tasksStr[i]);
                    else
                        tempStr = processSingleTask2(prop[i], tasksStr[i]);
                    if(tempStr == "")
                        return tempStr;
                    if(retStr != "")
                        retStr += ",";
                    retStr += tempStr;
                }
                return "[" + retStr + "]";                
            }
        }
    }
}

function processConditionalTask2(prop, str) {
    // conditional flow
    SFQueryConditionalFlow();
    if(!Launch_Continue) {
        if(Error_Msg != "")
            BootstrapDialog.alert(Error_Msg);
        return "";
    }
    var code = Launch_Code;
    var retStr;
    if(code != "") {
        var tasksStr = getFlowStr(str.substring(1, str.length - 1));
        for(var i = 0; i < prop.length; i++) {

            var selProp = getFlowPropInArray(prop[i]);
            if(selProp.flowCode == code && (!joinConditional || (joinConditional && selProp.taskName != "JOIN"))) {
                if(code.indexOf("[O]") >= 0 || code.indexOf("[Y]") >= 0) {
                    if(Launch_Hint != selProp.flowDesc)
                        continue;
                }
                retStr = tasksStr[i];
                if(retStr.charAt(0) != '[')
                    retStr = "[" + retStr + "]";
                var propArr;
                eval("propArr = " + retStr);
//              fillFlowStr(str);

                fillFlowStr(retStr);

                return processTasks2(propArr, retStr);
            }
        }
    }
    retStr = fillFlowStr(str);
    if(retStr == "")
        return retStr;
    else {
        return retStr;
    }
}

function processSingleTask2(prop, str) {
   // BootstrapDialog.alert("processSingleTask2");
   // BootstrapDialog.alert("before fillflowstr");
    fillFlowStr(str);
  //  BootstrapDialog.alert("2");
    var flowCount = extFlowObject.GetFlowCount();

    extFlowObject.setselectSubmitStatus(true);

    var commentValue = extFlowObject.getCommentValue(); 
    if(flowCount == 1 && commentValue  == "") {
        new extFlowObject.selectFlowItem(0);
        var opinion = getJsonData(str, "flowHint:");
        var userOpinion = document.getElementById("sf_opinion").value;
        if (userOpinion != "")     opinion = userOpinion;
        new extFlowObject.setCommentValue(opinion);
	 new extFlowObject.setCommentSelect();
    }

    var taskName = prop.taskName;
    Launch_FlowStr = str;
    if(taskName == "JOIN" || taskName == "STOP" || prop.taskFlowType == "4") {
/*
        if(taskName == "STOP") {
            extFlowObject.setTaskValue("流程结束!");
        } else if(taskName == "JOIN") {
            extFlowObject.setTaskValue("审批完成,等待其他人员审批结束!");

//            if(extFlowObject.GetParsonCount() <= 0) {
            extFlowObject.removeAllParsonItem();
                document.getElementById("toParson").parentNode.previousSibling.innerHTML = "等待办理人:";
                var users = getParallelUsers(document.getElementById("sf_actID").value);
                if(users.indexOf("usernames") >= 0) {
                    var userArr;
                    eval("userArr = " + users);
                    var realnames = userArr[0].realnames.split(";");
                    for(var i = 0; i < realnames.length; i++)
                        new extFlowObject.addparsonItem("", realnames[i]);
                } else {
                    new extFlowObject.addparsonItem("", "");
                }
//            }
        }
*/
        return str;
    }

    var ret = getReturnProp2(prop, str);
    return ret;
}

function processMultipleTask2(prop, str) {
                      //     BootstrapDialog.alert(prop.taskFlowType);
    if(prop.taskFlowType == "2") {
        // 并流
        Launch_ParallelParticipants = "";
        Launch_FlowStr = str;

        SFParallelFlow();

        if(!Launch_Continue) {
            if(Error_Msg != "") {
                BootstrapDialog.alert(Error_Msg);
            }
	     
            new extFlowObject.selectFlowItem(-1);
            extFlowObject.setselectSubmitStatus(false);
            return "";
        }

        if(Launch_ParallelParticipants == "") {

            var flowStr = flowsSelectDlg(str);
            if(flowStr == "") {
                return "";
            }
            multiParallelFlow = true;
          //  BootstrapDialog.alert("flowStr=" +flowStr)
            var tempStr = searchFlowStr(flowStr, "username");
            var realnames = getJsonData(tempStr, "realnames:")
            var realArr = realnames.split(";");

           // BootstrapDialog.alert("realArr.length="+realArr.length);
            if(realArr.length <= 1) {
                var names = realnames.split(",");
                var nameArr = names[0].split("/");
                fillMultiGroupStr(nameArr[1], flowStr);

            } else {
                var groups = ""
                for(var i = 0; i < realArr.length; i++) {
                    var realname = realArr[i];
                    var nameArr = realname.split("/");
                    if(groups == "")
                        groups = nameArr[1];
                    else
                        groups += ";" + nameArr[1];
                }
                fillMultiGroupStr(groups, tempStr);
            }
           // if(doGroupSelect() == "")
         //   tmp = extFlowObject.getSelectFlowValue();
            if(doMultiGroupSelect(flowStr))
                return "";
           // tmp = extFlowObject.getSelectFlowValue();
            return flowStr;
        } else {
           // BootstrapDialog.alert("before parallelFlowApi ,str1 ="+str);
            var flowStr = parallelFlowApi(Launch_ParallelParticipants, str);
           //  BootstrapDialog.alert("after parallelFlowApi ,flowStr ="+flowStr);
            /*
            var tempStr = searchFlowStr(flowStr, "username");
            fillMultiGroupStr(Launch_ParallelGroups, tempStr);
            if(doGroupSelect() == "")
                return "";
                */

            fillMultiGroupStr(Launch_ParallelGroups, flowStr);

            doMultiGroupSelect(flowStr);

            return flowStr;
        }
    } else if(prop.taskFlowType == "3") {
        // 辅流
        Launch_AssistFlows = "";
        Launch_AssistGroups = "";
        Launch_AssistParticipants = "";
        SFQueryAssistFlow();
        if(!Launch_Continue) {
            if(Error_Msg != "")
                BootstrapDialog.alert(Error_Msg);
            return "";
        }
        if(Launch_AssistGroups == "") {
            return flowsSelectDlg(str);
        } else {
            return assistFlowApi(Launch_AssistFlows, Launch_AssistGroups, Launch_AssistParticipants, str);
        }
    } else {
        BootstrapDialog.alert("Task Flow Type Error!");
        return "";
    }
}

function getReturnProp2(flowProp) {

    var participants;
    var names;
    var str;
    setPlusGroup = false;
    setHandlerGroup = false;
    Launch_NextGroup = flowProp.groupName;

    if (needGroupSelected(flowProp.groupName) && Launch_ParallelGroups == "" && !(flowProp.flowType == "2" && flowProp.taskCycleType == "1")) {

        var groupMask;
        Launch_HandleGroup = "";
        SFQueryGroup();
        if(!Launch_Continue) {
            return "";
        }
        if(Launch_HandleGroup != "" && Launch_HandleGroup.indexOf(";") < 0) {
        	groupMask = Launch_HandleGroup;
        } else {
            if(flowProp.groupName.indexOf("*") >= 0) {
                if(saveGroup == "") {
                    if(Launch_HandleGroup.indexOf(";") >= 0) {
                        groupMask = Launch_HandleGroup;
                    } else {
//                        saveGroup = checkGroupMask(sf_project, flowProp.groupName, flowProp.roleName);
                        saveGroup = flowProp.groupName;
                        groupMask = saveGroup;
                    }
                } else
                    groupMask = saveGroup;
            } else
                groupMask = flowProp.groupName;
        }
        if(groupMask == "")
            return "";
        if(flowProp.groupName.indexOf("+") >= 0) {
            setPlusGroup = true;
            plusGroup = groupMask;
            document.getElementById("sf_setPlusGroup").value = "1";
        } else if(flowProp.groupName.indexOf("*") >= 0 && Launch_GroupSet) {
            setHandlerGroup = true;
            handlerGroup = groupMask;
            document.getElementById("sf_setHandlerGroup").value = "1";
            if (iniHandleGroup =="")
                iniHandleGroup = document.getElementById("sf_handlerGroup").value;
            document.getElementById("sf_handlerGroup").value = groupMask;
            document.getElementById("sf_handlerStatus").value = "[{sf_handler:'" + document.getElementById("sf_handler").value +
                "', sf_handlerGroup:'" + groupMask + "', sf_plusGroup:'" +
                document.getElementById("sf_plusGroup").value + "'}]";
        }
        //if(groupMask.indexOf(",") >= 0 || groupMask.indexOf(";") >= 0)
            flowProp.groupName = groupMask;
        //else
        //    flowProp.groupName = getMaskGroup(flowProp.groupName.replace("*","***"), groupMask, "");
        Launch_NextGroup = flowProp.groupName;

        if(flowProp.groupName.indexOf(";") < 0 && flowProp.groupName.indexOf(",") < 0
                && flowProp.groupName.indexOf("*") < 0 && flowProp.groupName.indexOf("+") < 0) {
            participants = getGroupsUsersNames(sf_project, flowProp.groupName, flowProp.roleName);
            if(participants == "")
                return "";
            eval("names = " + participants);
            flowProp.realnames = names[0].realnames;
            flowProp.usernames = names[0].usernames;
        }
        var tempStr = "[" + constructFlow(flowProp) + "]";
        fillGroupStr(tempStr);
        if(flowProp.groupName.indexOf(";") < 0 && flowProp.groupName.indexOf(",") < 0
                && flowProp.groupName.indexOf("*") < 0 && flowProp.groupName.indexOf("+") < 0) {
            doGroupSelect();
        }
        if (extFlowObject.GetDepartmentCount() == 1)
            doGroupSelect();
//        if(needGroupSelected(flowProp.groupName) == 2 || (extFlowObject.GetDepartmentCount() > 0 && extFlowObject.GetParsonCount() == 0)) {
        if(extFlowObject.getSelectedParsonCount() <= 0)
            extFlowObject.setselectSubmitStatus(false);
//        }
        return "";
    }

    str = "[" + constructFlow(flowProp) + "]";

    if(flowProp.groupName.indexOf(";") < 0 && flowProp.groupName.indexOf(",") < 0 && flowProp.groupName.indexOf("+") < 0) {
     var dCount = extFlowObject.GetDepartmentCount();
        if(dCount <= 0) {

            fillGroupStr(str);    //     内部调用doGroupSelect--> add users -> processtask2
                 //   BootstrapDialog.alert("getReturnProp2.fillGroupStr.dogroupselect");
            if(doGroupSelect() == "")
                return "";
            if(cycleStr != "")
                return cycleStr;
            else
                return str;
        } else {}
    } else {}
    //  BootstrapDialog.alert("已选择部门，加入人flowProp.flowType="+flowProp.flowType);
    var cycle = false;
    switch(flowProp.flowType) { //流程控制属性 0,无控制； 1,分发 ; 2  预选会签者; 3 直送经办人
      case '2':  //预选会签者
            if(flowProp.taskFlowType == "3") {
                BootstrapDialog.alert("辅流第一个任务不能是会签, 请通知系统管理员！");
                break;
            } else {

                if(flowProp.taskCtlType == "2") {
                    if(flowProp.taskCycleType == "1") {  //组别会签
                        var level = getCharCount(flowProp.groupName, '.');
                        var searchGroup = "";
                        for(var i = 0; i < level; i++) {
                            if(searchGroup != "")
                                searchGroup += ".";
                            searchGroup += "*";
                        }

                        var namesStr = getGroupsUsersNames(sf_project, searchGroup, flowProp.roleName);
                        if(namesStr == "")
                            return "";
                        var groupNames;
                        eval("groupNames = " + namesStr);
                        Launch_CycleQueryUsers = groupNames[0].usernames;
                    } else {

                        Launch_CycleQueryUsers = flowProp.usernames;
                    }
                    Launch_IsEndCycleView = false;
                    if(flowProp.flowType == "2") {//预选会签者
                        Launch_CycleQueryType = "1";
                    } else {
                        Launch_CycleQueryType = "0";
                    }
                    Launch_CycleType = flowProp.taskCycleType;
//                    Launch_CycleUsers = "";
                    SFQueryCycleReview();
                    if(!Launch_Continue) {
                        if(Error_Msg != "")
                            BootstrapDialog.alert(Error_Msg);
                        return "";
                    }

                    if(!Launch_IsEndCycleView) {
                        if(Launch_CycleUsers != "") {

                             participants = "[{realnames:'" + getCycleRealnames(Launch_CycleUsers, flowProp.roleName) + "',usernames:'"
                                     + Launch_CycleUsers + "'}]";
                            cycle = true;
                        } else if(flowProp.taskCycleType == "0" || flowProp.taskCycleType == "") {

                           // if(!haveCycleUser && Launch_CycleQueryType == "0")    by xpz 2014/12/10
                            if(!haveCycleUser )
                                participants = selectCycleUsers(sf_project, flowProp.groupName, flowProp.roleName);
                            else
                                participants = "";
                            if(participants == "") {
                                Launch_CycleUsers = "";
                                new extFlowObject.setselectSubmitStatus(false);
/*                                do_selectCancel();
                                extFlowObject.close();
*/
                                haveCycleUser = false;
                                return "";
                            } else {
                                cycle = true;
                            }
                        } else {
                            var checkGroup;
                            if(flowProp.groupName.indexOf(".") < 0)
                                checkGroup = "*";
                            else {
                                checkGroup = flowProp.groupName.substring(0, flowProp.groupName.lastIndexOf(".") + 1)
                                        + "*";
                            }
//                            var cycleGroups = groupSelected(sf_project, checkGroup, flowProp.roleName, "1");
//                            participants = getGroupsUsersNames(sf_project, cycleGroups, flowProp.roleName);
                            participants = getGroupCycleUsers(sf_project, checkGroup, flowProp.roleName);
                            if(participants == "") {
                                new extFlowObject.setselectSubmitStatus(false);
                                return;
                            }
                            eval("names = " + participants);
                            flowProp.usernames = names[0].usernames.split(";")[0];
                            flowProp.realnames = names[0].realnames.split(";")[0];
                            flowProp.groupName = flowProp.realnames.split("/")[1];
                            var tempFlowStr = constructFlow(flowProp);
                            new extFlowObject.setSelectFlowValue(tempFlowStr);
                            clearGroupSelect();
                            fillGroupStr("[" + tempFlowStr + "]");
                        }
                        if(participants != "") {

                            eval("names = " + participants);
                            flowProp.cycleQty = getCharCount(names[0].usernames, ';');
                            flowProp.cycleUser = names[0].usernames;

                            Launch_CycleUsers = flowProp.cycleUser;
                            flowProp.cycleType = flowProp.taskCycleType;
                            var count = names[0].realnames.indexOf(";");
                            if(count > 0)
                                flowProp.realnames = names[0].realnames.substr(0, count);
                            else
                                flowProp.realnames = names[0].realnames;
                            count = names[0].usernames.indexOf(";");
                            var cycUsers;
                            if(count > 0)
                                cycUsers = names[0].usernames.substr(0, count);
                            else
                                cycUsers = names[0].usernames;
                            cycUsers = cycUsers.replaceAll(",", ";");
                            if(count > 0)
                                flowProp.usernames = cycUsers;
                            else
                                flowProp.usernames = cycUsers;
                            cycle = true;

                        }
                        break;
                    }
                }
            }
            // 设定出错, 比如说设了预选会签者?s?]有设会签, 所以当一般处理
        case '1': default:       // 1,分发 ;
            if(flowProp.flowProp == "2") {
                // 辅流
                participants = selectParticipantDlg(str, "", "1");
            } else {
                Launch_DistributeUser = "";
                SFQueryDistribute();
                if(!Launch_Continue) {
                    if(Error_Msg != "")
                        BootstrapDialog.alert(Error_Msg);
                    return "";
                }
                if(Launch_DistributeUser == "") {
                    if(flowProp.usernames == "") {
                        participants = getUsers(flowProp.groupName,  flowProp.roleName);
                    } else if(flowProp.usernames.indexOf(",") >= 0) {
                        participants = "[{realnames:'" + flowProp.realnames + "', usernames:'"
                            + flowProp.usernames + "'}]";
                    } else
                        participants = "[{realnames:'" + flowProp.realnames + "', usernames:'"
                            + flowProp.usernames + "'}]";
                } else if(Launch_DistributeUser.indexOf("-") == 0) {
                    var users;
                    if(flowProp.usernames == "") {
                        users = getUsers(flowProp.groupName,  flowProp.roleName);
                    } else {
                        users = flowProp.usernames;
                    }
                    eval("usersArr = " + users);
                    var tempUsernamesArr = usersArr[0].usernames.replaceAll(",",";").split(";");
                    var tempRealnamesArr = usersArr[0].realnames.replaceAll(",",";").split(";");
                    var tempUsernames = "";
                    var tempRealnames = "";
                    var tempDisUsersArr = Launch_DistributeUser.substring(1).replaceAll(",",";").split(";");
                    for(var j = 0; j < tempUsernamesArr.length; j++) {
                        var found = false;
                        for(var k = 0; k < tempDisUsersArr.length; k++) {
                        	if(tempDisUsersArr[k].toUpperCase() == tempUsernamesArr[j].toUpperCase()) {
                        	    found = true;
                        	    break;
                        	}
                        }
                        if(!found) {
                        	if(tempUsernames == "") {
                        	    tempUsernames = tempUsernamesArr[j];
                        	    tempRealnames = tempRealnamesArr[j];
                            } else {
                                tempUsernames += "," + tempUsernamesArr[j];
                                tempRealnames += "," + tempRealnamesArr[j];
                            }
                        }
                    }
                    if(tempUsernames == "" && !disError) {
                        BootstrapDialog.alert("分发用户为空, 请检查接口程序与用户权限设定!");
                        disError = true;
                        return "";
                    }
                    participants = "[{realnames:'" + tempRealnames + "', usernames:'"
                        + tempUsernames + "'}]";
                } else  {
                    Launch_DistributeUser = Launch_DistributeUser.replaceAll(";", ",");
                    var realName = "";
                    var userArr = Launch_DistributeUser.split(",");
                    for(var ri = 0; ri < userArr.length; ri++) {
                        if(realName == "")
                            realName = getRealname(userArr[ri]) + "/" + flowProp.groupName;
                        else
                            realName += "," + getRealname(userArr[ri]) + "/" + flowProp.groupName;
                    }
                    participants = "[{realnames:'" + realName + "', usernames:'"
                            + Launch_DistributeUser + "'}]";
                }
            }
            if(participants != "") {
                eval("names = " + participants);
                flowProp.realnames = names[0].realnames;
                flowProp.usernames = names[0].usernames;
            }
            break;
        case '0':   // 0,无控制；
            break;
        case '3':   // 3 直送经办人
            var handler = getHandler(sf_handler, flowProp.usernames, ",");

//            BootstrapDialog.alert("handler = " + handler + ", flowProp.group = " + flowProp.groupName + ", flowProp.role = " + flowProp.roleName);
            if(flowProp.groupName == document.getElementById("sf_group").value && flowProp.roleName == document.getElementById("sf_role").value
            		&& document.getElementById("sf_taskctl").value == "1") {
                    flowProp.realnames = document.getElementById("sf_user").value + "/" + flowProp.groupName;
                    flowProp.usernames = document.getElementById("sf_loginName").value;
            } else if(handler == "" || handler.indexOf(";") >= 0) {
                if(flowProp.usernames.indexOf(",") >= 0 || flowProp.usernames.indexOf(";") >= 0) {                    
                    var handlerName = getHandlerName(document.getElementById("sf_caseID").value, flowProp.groupName, flowProp.roleName);
                    var handlerRealnames;
                   // BootstrapDialog.alert("sf_handler="+ sf_handler + ";handlerName=" + handlerName);
                    if(handlerName == "" || !inList(sf_handler, handlerName, ";")) {
                        var usersStr;
                        if(handlerName != "") {
                            handlerRealnames = getRealname(handlerName, flowProp, ";") + "/" + flowProp.groupName;
                            usersStr = "[{taskName:'" + flowProp.taskName + "', groupName:'" + flowProp.groupName +
                                      "', roleName:'" + flowProp.roleName + "', ";
                            usersStr += "realnames:'" + handlerRealnames + "', usernames:'" + handlerName + "', flowProp:'0'}]";
                        } else {
                            usersStr = getUsers(flowProp.groupName,  flowProp.roleName);
                        }

                        eval("names = " + usersStr);
                        flowProp.realnames = names[0].realnames.replaceAll(";", ",");
                        flowProp.usernames = names[0].usernames.replaceAll(";", ",");
                    } else {
                        handlerRealnames = getHandlerRealnames(handlerName, flowProp, ";");
                        flowProp.realnames = handlerRealnames;
                        flowProp.usernames = handlerName;
                    }
                } else {
                    participants = getUsers(flowProp.groupName,  flowProp.roleName);
                    eval("names = " + participants);
                    flowProp.realnames = names[0].realnames.replaceAll(";", ",");
                    flowProp.usernames = names[0].usernames.replaceAll(";", ",");
                }
            } else {
                flowProp.realnames = getRealname(handler) + "/" + flowProp.groupName;
                flowProp.usernames = handler;
            }
            break;
    }
    if(participants == "")
        return "";

    if(flowProp.usernames == "") {
        BootstrapDialog.alert("组别:" + flowProp.groupName + ",角色:" + flowProp.roleName + " 没有设置用户, 请通知管理员!" );
	    new extFlowObject.setselectSubmitStatus(false);
        return "";
    } else {
        new extFlowObject.setselectSubmitStatus(true);
	    var pCount = extFlowObject.GetParsonCount();
        if(pCount <= 0) {
            var tempStr = constructFlow(flowProp);

            if(tempStr.charAt(0) != '[')
                tempStr = "[" + tempStr + "]";
            fillParticipantsStr(tempStr);
			//BootstrapDialog.alert(flowProp.usernames);
            if(flowProp.usernames.indexOf(";") >= 0) {
                doParticipantsSelect();
            } else if(flowProp.usernames.indexOf(",") < 0) {
                doParticipantsSelect();
            }
        } else if(pCount == 1) {
            doParticipantsSelect();
        }
    }
    var retFlowStr = constructFlow(flowProp);
    if(cycle)
        cycleStr = retFlowStr;
    return retFlowStr;
}

function fillFlowStr(flowString) {
   // BootstrapDialog.alert("flowStringqqqq="+flowString);
    var count = extFlowObject.GetFlowCount();
   // BootstrapDialog.alert("count="+count);
    if(count != 0) return;  //选择流向时，直接退出本函数调用
    var prop;
    eval("prop = " + flowString);
    
    var flowsStr = "";
    if(flowString.charAt(0) == '[') {
        flowsStr = flowString.substring(1, flowString.length - 1);
    } else {
        flowsStr = flowString;
    }
    
    var flows = "";
    if(prop.length && prop.length == 1) {

        new extFlowObject.addFlowItem(flowsStr,getJsonData(flowsStr, "flowDesc:"),getJsonData(flowsStr, "flowDesc:"));
        new extFlowObject.selectFlowItem(0);
    } else {

        if((prop[0] && ((prop[0].taskName == "SPLIT" && (prop[0].condFlow !="1" )) || prop[0].taskName == "JOIN" || (prop[0].taskName == "STOP" && prop[0].condFlow != "1"))) && prop[0].flowDesc.indexOf("同意 - ") != 0) {
            new extFlowObject.addFlowItem(flowsStr, getJsonData(flowsStr, "flowDesc:"), getJsonData(flowsStr, "flowDesc:"));

        } else {

            flows = getFlowStr(flowsStr);
            SFQueryConditionalFlow();
            for(var i = 0; i < flows.length; i++) {
                var flowCode = getJsonData(flows[i], "flowCode:");
                if(Launch_Code_Bypass != "") {
                    if(inList(Launch_Code_Bypass, flowCode, ";"))
                        continue;
                }
            
	            if (flows[i].length != 0) {
                    var split = flows[i].substring(0, 1);
		            if (split == "[") {
			            flows[i] = flows[i].substring(1, flows[i].length);
		            }
				
		            split = flows[i].substring(flows[i].length - 1, flows[i].length);
		            if (split == "]") {
		                flows[i] = flows[i].substring(0, flows[i].length - 1);
		            }
	            }
	            new extFlowObject.addFlowItem(flows[i],getJsonData(flows[i], "flowDesc:"),getJsonData(flows[i], "flowDesc:"));
	     		if(flows.length == 1) {
        			new extFlowObject.selectFlowItem(0);
	     		}
                if(Launch_Code == flowCode) {
	     	        new extFlowObject.selectFlowItem(i);
                 //   BootstrapDialog.alert("before select flow");
                    flowsStr = doFlowSelect();
                  //  BootstrapDialog.alert("after select flow");
                }
            }
        }
    }

    if(extFlowObject.getSelectFlowValue() == "") {
         new extFlowObject.selectFlowItem(0);
        flowsStr = doFlowSelect();
    }
    return flowsStr;
}

function checkParallelFlow(flowsStr) {
    var prop;
    eval("prop = " + flowsStr);
    if(prop.length == 1) {

    }
}

function fillMultiGroupStr(groups, flowString) {
    var dCount = extFlowObject.GetDepartmentCount();
    if(dCount != 0) return;
    if (groups!=""){
        var groupArr = groups.split(";");

        for(var i = 0; i < groupArr.length; i++) {
            new extFlowObject.addDepartmentItem(flowString,groupArr[i],groupArr[i]);
        }

        new extFlowObject.selectAllDepartmentItem(1);
        return;
    }

    var prop;

    var flowArray;
    var tempStr;
    if(flowString.charAt(0) != '[') {
        flowArray = getFlowStr(flowString);
        flowString = "[" + flowString + "]";
    } else {
        flowArray = getFlowStr(flowString.substring(1, flowString.length - 1));
    }
    eval("prop = " + flowString);
    var flowsStr = "";


    var flows = "";
    for (i =0 ; i < prop.length ; i++) {
        flows = flowArray[i];
        var text = getJsonData(flows, "groupName:");

        if ( (text.indexOf("*") < 0) && (text.indexOf(";") < 0) && (text.indexOf(",") < 0) ) {
            new extFlowObject.addDepartmentItem(flows,text,text);
            new extFlowObject.selectDepartmentItem(0);
          //  doGroupSelect();
        }else{
            var split = "";
            if(Launch_HandleGroup.indexOf(";") >= 0)
                text = Launch_HandleGroup;
            if( ((text.indexOf("*") !=  -1) || text.indexOf("+") != -1) && ((text.indexOf("***") < 0 && text.indexOf("+++")) < 0) && Launch_HandleGroup == ""){
                text = getServerMaskGroups(sf_project, text, getJsonData(flows, "roleName:"));
                split = ";";
            }else if(text.indexOf(";") != -1){
                split = ";";
            }else if(text.indexOf(",") != -1){
                split = ",";
            }
            var groupArr = text.split(split);
            if(Launch_ExcludeGroup == "")  {
                for(var i = 0; i < groupArr.length; i++)
                    new extFlowObject.addDepartmentItem(flows,groupArr[i],groupArr[i]);
            } else {
                var excludeList = Launch_ExcludeGroup.split(";");
                for (var i = 0; i < groupArr.length; i++) {
                    var found = false;
                    for(var j = 0; j < excludeList.length; j++)
                        if(groupArr[i] == excludeList[j]) {
                            found = true;
                            break;
                        }
                    if(!found)
                        new extFlowObject.addDepartmentItem(flows, groupArr[i], groupArr[i]);
                }
            }
        }
        if(Launch_HandleGroup.indexOf(";") <= 0)
            new extFlowObject.selectDepartmentItem(i);

       // if ( extFlowObject.GetDepartmentCount() == 1){
        //    doGroupSelect();
      //  }
    }
}

function fillGroupStr(flowString) {

    var dCount = extFlowObject.GetDepartmentCount();
    if(dCount != 0) return;

    var prop;
    eval("prop = " + flowString);
    var flowsStr = "";
    if(flowString.charAt(0) == '[') {
        flowsStr = flowString.substring(1, flowString.length - 1);
    } else {
        flowsStr = flowString;
    }
    
    var flows = "";
    if(prop.length == 1) {
        flows = flowsStr;
        var text = getJsonData(flows, "groupName:");
	 
        if ( (text.indexOf("*") < 0) && (text.indexOf(";") < 0) && (text.indexOf(",") < 0) ) {
	        new extFlowObject.addDepartmentItem(flows,text,text);
	        new extFlowObject.selectDepartmentItem(0);
            doGroupSelect();            
        }else{
	        var split = "";
            if(Launch_HandleGroup.indexOf(";") >= 0)
                text = Launch_HandleGroup;
            if( ((text.indexOf("*") !=  -1) || text.indexOf("+") != -1) && ((text.indexOf("***") < 0 && text.indexOf("+++")) < 0) && Launch_HandleGroup == ""){
                text = getServerMaskGroups(sf_project, text, getJsonData(flows, "roleName:"));
                split = ";";
	        }else if(text.indexOf(";") != -1){
                split = ";";
	        }else if(text.indexOf(",") != -1){
	            split = ",";
	        }
	        var groupArr = text.split(split);
                if(Launch_ExcludeGroup == "")  {
                    for(var i = 0; i < groupArr.length; i++)
                            new extFlowObject.addDepartmentItem(flows,groupArr[i],groupArr[i]);
                } else {
                        var excludeList = Launch_ExcludeGroup.split(";");
                        for (var i = 0; i < groupArr.length; i++) {
                            var found = false;
                            for(var j = 0; j < excludeList.length; j++)
                                if(groupArr[i] == excludeList[j]) {
                                    found = true;
                                    break;
                            }
                            if(!found)
                                new extFlowObject.addDepartmentItem(flows, groupArr[i], groupArr[i]);
                	}
                }
            }
		    if(Launch_HandleGroup.indexOf(";") <= 0)
                    new extFlowObject.selectDepartmentItem(i);

            if ( extFlowObject.GetDepartmentCount() == 1){
                new extFlowObject.selectDepartmentItem(0);
                doGroupSelect();
            }
        }

    //}
//    if(extFlowObject.getSelectFlowValue() == "") {
//        extFlowObject.selectFlowItem(0);
//    }
}

function fillParticipantsStr(flowString) {
    var pCount = extFlowObject.GetParsonCount();
    if(pCount < 0) return;
	 
    var prop;
    eval("prop = " + flowString);
    var flowsStr = "";
    if(flowString.charAt(0) == '[') {
        flowsStr = flowString.substring(1, flowString.length - 1);
    } else {
        flowsStr = flowString;
    }
    
    var flows = "";
    
    if(prop.length == 1) {
    
        flows = flowsStr;
        var text = getJsonData(flows, "realnames:");
        var value = getJsonData(flows, "usernames:");

        if(text.indexOf(";") < 0 && text.indexOf(",") < 0) {
	     new extFlowObject.addparsonItem(value,text);
            extFlowObject.selectparsonItem(0);
	     extFlowObject.selectAllParsonItem(1);
        } else if(value.indexOf(";") >= 0){
            var textArr = text.split(";");
            var valueArr = value.split(";");
            for(var i = 0; i < valueArr.length; i++) {
                new extFlowObject.addparsonItem(valueArr[i],textArr[i]);
            }
	        extFlowObject.selectAllParsonItem(1);
        } else {
            var textArr = text.split(",");
            var valueArr = value.split(",");
            for(var i = 0; i < valueArr.length; i++) {
                new extFlowObject.addparsonItem(valueArr[i],textArr[i]);
                extFlowObject.selectparsonItem(0);
           }
	        extFlowObject.selectAllParsonItem(2);
        }
    }
    if(document.getElementById("sf_trayType").value == "0" && getJsonData(flowString, "flowCode:").indexOf("@") > 0) {
        extFlowObject.selectAllParsonItem(1);
    }
}

function fillParticipants(flowString) {
    var prop;
    eval("prop = " + flowString);
    var flowsStr = "";
    if(flowString.charAt(0) == '[') {
        flowsStr = flowString.substring(1, flowString.length - 1);
    } else {
        flowsStr = flowString;
    }

    var flows = "";

    flows = flowsStr;
    var text = getJsonData(flows, "realnames:");
    var value = getJsonData(flows, "usernames:");

    if(text.indexOf(";") < 0 && text.indexOf(",") < 0) {
        new extFlowObject.addparsonItem(value,text);
        extFlowObject.selectparsonItem(0);
	    extFlowObject.selectAllParsonItem(1);
    } else if(value.indexOf(";") >= 0){
        var textArr = text.split(";");
        var valueArr = value.split(";");
        for(var i = 0; i < valueArr.length; i++) {
            new extFlowObject.addparsonItem(valueArr[i],textArr[i]);
        }
	    extFlowObject.selectAllParsonItem(1);
    } else {
        var textArr = text.split(",");
        var valueArr = value.split(",");
        for(var i = 0; i < valueArr.length; i++) {
            new extFlowObject.addparsonItem(valueArr[i],textArr[i]);
            extFlowObject.selectparsonItem(0);
       }
	   extFlowObject.selectAllParsonItem(2);
    }
    if(document.getElementById("sf_trayType").value == "0") {
        extFlowObject.selectAllParsonItem(1);
    }
}

function clearFlowSelect() {
    new extFlowObject.removeAllFlowItem();
}

function clearGroupSelect() {
   new extFlowObject.removeAlldepartmentItem();
}

function clearParticipantsSelect() {
  new extFlowObject.removeAllParsonItem();
}

function do_selectFinish() {

    extFlowObject.setselectSubmitStatus(false);

    if(extFlowObject.GetDepartmentCount() > 0 && extFlowObject.getSelectDepartmentText() == "") {
        if(extFlowObject.GetDepartmentCount() == 1) {
            extFlowObject.selectDepartmentItem(0);
        } else {
            BootstrapDialog.alert("请选择部门!");
            return;
        }
    }
    if(extFlowObject.GetParsonCount() > 0 && extFlowObject.getSelectedParsonValue() == "") {
        if(extFlowObject.GetParsonCount() == 1) {
            extFlowObject.selectparsonItem(0);
        } else {
            BootstrapDialog.alert("请选择下一办理人!");
            return;
        }
    }


    if(extFlowObject.getSelectFlowValue() == "") {

        extFlowObject.selectFlowItem(0);
    }

    if(multiParallelFlow) {

        do_multiSelectFinish();
        return;
    }
    var flowStr;
    if(joinConditional) {
        flowStr = joinStr;
    } else {
        flowStr = extFlowObject.getSelectFlowValue();
    }
   // var activeStr = searchFlowStr(flowStr, "username");
    var prop;

    eval("prop = " + flowStr);

   // if((document.getElementById("sf_trayType").value == "0" && prop.flowType != "0") || isParallelFlow) {     //sf_trayType == "0"指定到角色
      if( isParallelFlow) {     //sf_trayType == "0"指定到角色

        extFlowObject.selectAllParsonItem();

        flowStr= doFlowSelect();
/*        var usernames = "";
        var realnames = "";
        for(var i = 0; i < extFlowObject.getSelectedParsonCount(); i++) {
            if(usernames == "") {
               usernames =extFlowObject.getSelectparsonValue (i,1);
               realnames = extFlowObject.getSelectparsonValue(i,2);
            } else {
               usernames += ";" + extFlowObject.getSelectparsonValue(i,1);
               realnames += ";" + extFlowObject.getSelectparsonValue(i,2);
            }
        }
        if(usernames != "") {
            BootstrapDialog.alert("flowStrA="+flowStr);
            var activeStr = searchFlowStr(flowStr, "username");
            var prop;

            eval("prop = " + activeStr);
            prop.usernames = usernames;
            prop.realnames = realnames;
            Launch_SelectUsers = realnames;
            var tempStr = constructFlow(prop);
            BootstrapDialog.alert("tempStr="+tempStr);
            BootstrapDialog.alert("activeStr="+activeStr);
            flowStr = flowStr.replace(activeStr, tempStr);
            BootstrapDialog.alert("flowStrB=" +flowStr);
        }
        */
//        saveNextTaskUsers();

        document.getElementById("myOpinion").value =extFlowObject.getCommentValue();

        addInfoWin.hide();
        if(cycleStr && cycleStr != "")
            flowStr = cycleStr;

      // BootstrapDialog.alert(flowStr);
       //return;

        if(flowStr.substr(0,1) == "["){
            flowStr = flowStr.substring(1,flowStr.length-1);
            //BootstrapDialog.alert(flowStr);
        }
        //return;

        do_Div_Complete_End(flowStr);
        return;
    }else if(document.getElementById("sf_trayType").value == "0" && prop.flowType == "0" && prop.taskCtlType !="2" && prop.taskName != "STOP"){  //sf_trayType == "0"指定到角色  .taskCtlType ="2"  会签
          extFlowObject.selectAllParsonItem(1);
    }

    var index = flowStr.indexOf("groupName:");
    
    if(index >= 0) {
        var usernames = "";
        var realnames = "";
        if (prop.taskName != "STOP" && extFlowObject.getSelectedParsonCount()< 1){
            BootstrapDialog.alert("请选择下一办理人!");
            return;
        }
	    for(var i = 0; i < extFlowObject.getSelectedParsonCount(); i++) {
	        if(usernames == "") {
	            usernames =extFlowObject.getSelectparsonValue (i,1);
	            realnames = extFlowObject.getSelectparsonValue(i,2);
	        } else {
	            usernames += ";" + extFlowObject.getSelectparsonValue(i,1);
	            realnames += ";" + extFlowObject.getSelectparsonValue(i,2);
	        }
	    }
	  
        var activeStr = searchFlowStr(flowStr, "username");
        var prop;
	 
        eval("prop = " + activeStr);
	 
        if (prop.groupName.indexOf("*") >= 0) {
            var tempGroup = extFlowObject.getSelectDepartmentText();
            if(tempGroup.indexOf(";") < 0)
                prop.groupName = tempGroup;
            if (Launch_GroupSet) {
                setHandlerGroup = true;
                handlerGroup = tempGroup;
                document.getElementById("sf_setHandlerGroup").value = "1";
                document.getElementById("sf_handlerGroup").value = tempGroup;
                document.getElementById("sf_handlerStatus").value = "[{sf_handler:'" + document.getElementById("sf_handler").value +
                "', sf_handlerGroup:'" + tempGroup + "', sf_plusGroup:'" +
                document.getElementById("sf_plusGroup").value + "'}]";
            }
	    }
	
	    prop.usernames = usernames;
	    prop.realnames = realnames;
        Launch_SelectUsers = realnames;

	    var tempStr = constructFlow(prop);
	
        flowStr = flowStr.replace(activeStr, tempStr);
    }else{
        if (prop.taskName != "STOP" && prop.taskName != "JOIN"){
            BootstrapDialog.alert("请选择下一办理人!");
            return;
        }
    }

    var tempArray;
    eval("tempArray = " + flowStr);
    
    var selProp = getFlowPropInArray(tempArray);
    Launch_Code = selProp.flowCode;
//    saveNextTaskUsers();
    document.getElementById("myOpinion").value =extFlowObject.getCommentValue();
    addInfoWin.hide();
    
    if(cycleStr != "")
        flowStr = cycleStr;


    do_Div_Complete_End(flowStr);
    
    return;
}

function do_multiSelectFinish() {
    flowStr = extFlowObject.getSelectFlowValue();
    if(flowStr.charAt[0] != '[')
        flowStr = "[" + flowStr + "]";
    /*
    var index = flowStr.indexOf("groupName:");

    var pFlowStr;
    eval("pFlowStr = " + flowStr);
    for(var i = 0; i < pFlowStr.length; i++) {
        var prop = pFlowStr[i];
        if(prop.taskName == "SPLIT")
            continue;
        var selUsername;
        var selRealname;
        for(var j = 0; j < extFlowObject.getSelectedParsonCount(); j++) {
            selRealname = extFlowObject.getSelectparsonValue (j,2);
            if(prop.realnames.indexOf(selRealname) >= 0) {
                flowStr = flowStr.replace(prop.realnames, selRealname);
                flowStr = flowStr.replace(prop.usernames, extFlowObject.getSelectparsonValue (j,1));
                break;
            }
        }
    }
*/
//    saveNextTaskUsers();
    document.getElementById("myOpinion").value =extFlowObject.getCommentValue();
    addInfoWin.hide();

    if(cycleStr != "")
        flowStr = cycleStr;

    do_Div_Complete_End(flowStr);

    return;
}

function do_restoreHandleGroup() {
    if  (iniHandleGroup != "" ) {
        document.getElementById("sf_handlerGroup").value = iniHandleGroup;
    }
    var sfSourceGroup = document.getElementById("sf_handlerGroup").value;
    document.getElementById("sf_handlerStatus").value = "[{sf_handler:'" + document.getElementById("sf_handler").value + "', sf_handlerGroup:'" + sfSourceGroup + "', sf_plusGroup:'" +  document.getElementById("sf_plusGroup").value + "'}]";
}

function do_selectCancel() {
    clearFlowSelect();
    clearGroupSelect();
    clearParticipantsSelect();
    new extFlowObject.setCommentValue("");
    joinConditional = false;
    afterJoin = false;
}

function doFlowSelect() {

    clearGroupSelect();
    clearParticipantsSelect();
    cycleStr = "";
    Launch_ParallelGroups = "";

    var flowStr = extFlowObject.getSelectFlowValue();

    var opinion = getJsonData(flowStr, "flowHint:");

    var comment = extFlowObject.getCommentValue();

    if (comment == ""){
        new extFlowObject.setCommentValue(opinion);

    }

    if(flowStr.charAt(0) != '[')
        flowStr = "[" + flowStr + "]";
    var prop;
    
    eval("prop = " + flowStr);
    Launch_Code = prop[0].flowCode;

    return processTasks2(prop, flowStr);
}

function doGroupSelect() {
    clearParticipantsSelect();
    var flowStr = extFlowObject.getSelectDepartmentValue();
    var groupName = getJsonData(flowStr, "groupName:");
    var prop = null;
   
    if((groupName.indexOf("*") >= 0 && groupName.indexOf("***") < 0 && Launch_ParallelGroups == "") || groupName.indexOf(";") >= 0) {
     var group = extFlowObject.getSelectDepartmentText();
        var participants = getGroupsUsersNames(sf_project, group,
                getJsonData(flowStr, "roleName:"));
        var prop;
        eval("prop = " + flowStr);
        prop.groupName = group;
        var prop2;
        eval("prop2 = " + participants);
        prop.usernames = prop2[0].usernames;
        prop.realnames = prop2[0].realnames;
        flowStr = constructFlow(prop);
    }

    if(flowStr.charAt(0) != '[') flowStr = "[" + flowStr + "]";
    try {
        eval("prop = " + flowStr);
    } catch(e) {
        BootstrapDialog.alert("error" + flowStr);
        return "";
    }
    var ret = processTasks2(prop, flowStr);
    return ret;
}

function doMultiGroupSelect(flowStr) {
    clearParticipantsSelect();
    var tempStr = searchFlowStrExcludeSplit(flowStr, "usernames:");
    remainStr = flowStr;
    var name = "";
    while (tempStr != null && tempStr != "") {
        if (name == "") {
            name = getJsonData(tempStr, "taskName:");
        } else {
            name += "," + getJsonData(tempStr, "taskName:");
        }
        var usernames = getJsonData(tempStr, "usernames:");
        var realnames = getJsonData(tempStr, "realnames:");
        var userArr = usernames.replaceAll(",", ";").split(";");
        var realArr = realnames.replaceAll(",", ";").split(";");
        for (var i = 0; i < userArr.length; i++) {
            new extFlowObject.addparsonItem(userArr[i], realArr[i]);
        }
        remainStr = remainStr.replace(tempStr, "");
        tempStr = searchFlowStrExcludeSplit(remainStr, "usernames:");
    }

    new extFlowObject.setSelectFlowValue(flowStr);

    //extFlowObject.selectFlowItem(0);
    //BootstrapDialog.alert("extFlowObject.getSelectFlowValue = "+ extFlowObject.getSelectFlowValue());
    extFlowObject.selectAllDepartmentItem(1);
    extFlowObject.selectAllParsonItem(1);
    var opinion = getJsonData(flowStr, "flowHint:");
    if (extFlowObject.getCommentValue() == "")
        extFlowObject.setCommentValue(opinion);

    isParallelFlow = true;
    //BootstrapDialog.alert("extFlowObject.getSelectedParsonCount()="+extFlowObj());
    //if  (extFlowObject.getSelectedParsonCount() ==0 )
    //    new extFlowObject.setselectSubmitStatus(false);
    //else
        new extFlowObject.setselectSubmitStatus(true);

    return;
}

function doParticipantsSelect() {
    flowStr = extFlowObject.getSelectparsonValue(0,1);

    extFlowObject.setselectSubmitStatus(true);
    return flowStr;
}

function getUsers(groups, role) {
    var cycleGroupUserURL = getBasepath() + "/flow/ui/GetCycleGroupUsers?sf_project="
        + sf_project + "&sf_groups="
        + groups.replaceAll("+","%2B") + "&sf_role=" + role ;
    cycleGroupUserURL = encodeURI(cycleGroupUserURL);
    makeRequest(cycleGroupUserURL, ajaxFunction);
    return ajaxReturn;
}