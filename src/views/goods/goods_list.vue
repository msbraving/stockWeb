<template>
  <div class="">
    <div class="list_title">
      产品列表
    </div>
    <Menu mode="horizontal"  active-name="1">
        <MenuItem name="1">
            线上产品
        </MenuItem>
        <MenuItem name="2">
            上传记录
        </MenuItem>
    </Menu>
   <div class="">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        mounted () {
            
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .list_title {
    line-height: 28px;
        height: 28px;
            font-size: 20px;
        color: #333;
    }
    .ivu-menu-horizontal .ivu-menu-item{
        padding: 0;
        margin-right:20px;
    }
</style>
