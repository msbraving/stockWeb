<template>
  <div class="pageList">

       <Button type="primary"  @click="start(null)">
         开启流程
       </Button>
       <Button type="primary"  @click="submit1">
         提交流程
       </Button>
      <Button type="primary"  @click="query">
        查询流程
      </Button>
      <Button type="primary"  @click="openCase">
        打开流程
      </Button>
    <Form ref="formInline"  id="test001">
     wkc
    </Form>
  </div>

</template>

<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    created () {
    },
    methods: {
      //开启流程
      start: function (actId) {

        var url="/test";
        do_SFInit("test001", "TEST001", actId, url);
      },
      submit1: function () {
        showSinoWaiting();
        var _this = this;
        com.sinoprof.workflow.dialog.submitForm.selectNextFlow({
          appEntity: {
            applyNo: "WKC0001",
            companyCode: "OA",
            negativeTypeFlag:"1"
          },
          callbackFun: function () {
            _this.submit2();
          }
        });
      },
      submit2: function () {
        $.ajax({
          url: "app/api-flow/test/submit",
          type: "post",
          data: $("#test001").serializeObject(),
          success: function (data) {
            hideSinoWaiting();
            if (data.code != "0") {
              alert(data.message);
              return;
            } else {
              alert(data.message);
              sinoFlowClose();
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            hideSinoWaiting();
            alert("提交流程异常！");
          }
        });
      },
      query: function () {
        $.ajax({
          url: "app/api-flow/ui/allList",
          type: "post",
          data: {loginName:"ADMIN",tenantId:"1"},
          success: function (data) {
               console.log(data)
          }
        });
      },
      openCase: function () {
        this.start("5457966ea26f40149cc50e07ef670dbf");
        }
      }

  }
</script>
<style scoped>
  .pageList{
    padding: 10px 0 10px 20px ;
  }
  .headBox {
      width: 1058px;
      height: 100px;
      background: #fff;
      color: #333;
      border-radius: 2px;
      border: 1px solid #e9ebef;
      display: flex;
      position: relative;
  }
 .headBox .listBox {
      width: 172px;
      height: 100%;
      padding-top: 16px;
      padding-left: 16px;
      overflow: hidden;
      cursor: pointer;
  }
   .headBox .listBox:hover{
     background: #f6f6f6;
  }
  .headBox .listBox .boxTitle {
    font-size: 14px;
    color: rgba(43,31,31,.6);
  }
  .headBox .listBox .boxSize {
    height: 36px;
    line-height: 36px;
    font-size: 24px;
    font-weight: 500;
    color: rgba(0,0,0,.8);
    margin-top: 8px;
  }
  .headBox .listBox .boxSize .boxSizeVal {
    max-width: 120px;
    overflow: hidden;
    display: inline-block;
  }
  .headBox .listBox .boxSize .boxSizeUnit {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0,0,0,.8);
    margin-left: 4px;
    vertical-align: super;
  }
</style>
