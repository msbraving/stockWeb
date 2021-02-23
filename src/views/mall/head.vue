<template>
    <div>
        <div class=' mall_header'>
                <div class='header'>
                    <div class='logo'>
                        <img src="../../assets/image/webLog.png" alt="" style="flex: 0 0 156px;height: 100%;width: 156px;" class="point">
                    </div>
                    <div class='searchandcar'>
                       <div class="fcqiqa">
                           <div class="searchBox">
                               <div class="searchInput">
                                   <div class="">
                                       <Icon type="ios-search"  class="search-icon"/>
                                        <input @keydown.enter="searchBykeyword" type="text" v-model="keyWord" class="inptborder" >
                                        <!-- <Icon type="md-camera" class="img-icon" /> -->
                                   </div>
                                   <div class="searchBtn" @click="searchBykeyword">
                                       <span class="searchBtnWord">搜索</span>
                                       <div class="bgcolor"></div>
                                   </div>
                               </div>
                               <div class="hotword flex">
                                   <a target="_blank" class="link fonthover" >员工福利</a>
                                   <a target="_blank" class="link fonthover" >在线仓库</a>
                                   <a target="_blank" class="link fonthover" >报价大厅</a>
                                   <a target="_blank" class="link fonthover" >共享专区</a>
                                </div>
                           </div>
                           <div class="shopCarBox flex alignItems justifyCenter" @click="$router.push({name:'cart'})">
                               <div class="shopCarWord">购物车</div>
                               <div class="sizeRound" v-show="count > 0">{{ count }}</div>
                           </div>

                       </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    mounted () {
        this.keyWord = this.$route.query.keyWord
    },
    props:['count'],
    data () {
        return {
            keyWord: '',
        }
    },
    methods: {
        searchBykeyword () {
            if (this.$route.path.indexOf('home') > -1) { //首页搜索 - 跳转
                this.$parent.searchKeyWord(this.keyWord);
            } else {
                this.$parent.keyword = this.keyWord
                this.$parent.searchBykeyword(true)
            }
        },
    }
}
</script>

<style scoped>
    .fonthover:hover{
        color: #7ea1cb  !important;
    }
    .mall_header {
        height: 108px; background: rgb(255, 255, 255); box-shadow: rgb(235, 235, 235) 0px 1px 0px 0px; border-top: 1px solid rgba(219, 210, 224, .5);
    }
    .header {
        width: 1200px; height: 100%; margin: 0px auto; display: flex; -webkit-box-align: center;align-items: center;  -webkit-box-pack: start;justify-content: flex-start;
    }
    .searchandcar{
        height: 100%;
    }
    .fcqiqa{
        position: relative;height: 108px; width: 100%; z-index: 1;display: flex;  -webkit-box-pack: center;justify-content: center; align-items: flex-start; padding-top: 24px;
    }
    .shopCarBox{
        margin-left: 48px; width: 242px; position: relative;outline: none; cursor: pointer; border: 2px solid rgb(235, 235, 235);background: rgb(255, 255, 255); color: #7ea1cb ; height: 42px;font-size: 16px; border-radius: 21px; padding: 0px 42px;
    }
    .shopCarBox:hover{border: 2px solid #7ea1cb ;}
    .shopCarWord{
        margin-right: 8px; font-size: 20px;
    }
    .sizeRound{
        min-width: 18px; height: 18px;line-height: 18px;  border-radius: 18px; background: #7ea1cb ; color: rgb(255, 255, 255); font-size: 12px;font-weight: 500; margin-left: 8px; text-align: center;
    }
     .searchBox{
        display: flex; flex-direction: column; margin-left: 100px;
    }
    .hotword{
        color: rgba(0, 0, 0, 0.4);padding-top: 10px; padding-left: 16px;
    }
    .hotword .link {
        color:  #666; font-size: 14px; margin-right: 30px; cursor: pointer;
    }
    .searchBtn{
        cursor: pointer; overflow: hidden; position: relative; padding: 0px;box-sizing: border-box; height: 42px;
        width: 96px; line-height: 42px; border: none; border-top-right-radius: 21px; border-bottom-right-radius: 21px; background: #7ea1cb ; color: rgb(255, 255, 255);font-size: 18px;text-align: center;
    }
    .search-icon {
        font-size: 20px;color: rgba(0, 0, 0, 0.12); position: absolute; top: 11px;left: 14px;
    }
    .img-icon {
        cursor: pointer; font-size: 24px; position: absolute; top: 9px;right: 110px; color: rgba(0, 0, 0, 0.12);
    }
    .searchInput{
        position: relative;z-index: 1;display: flex;
    }
    .carousel {
        position: absolute;  cursor: text; top: 11px; left: 46px; z-index: 0;
    }
    .inptborder{
        box-sizing: border-box; width: 554px; height: 42px;line-height: 42px; font-size: 14px;  border-top-left-radius: 21px;border-bottom-left-radius: 21px; border: 2px solid #7ea1cb ; padding-left: 40px; outline: none;
    }
    .bgcolor{
        position: absolute; bottom: 0px;right: 2px; width: 54px; height: 54px;opacity: 0.18; background: linear-gradient(270deg, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%); border-radius: 0px 0px 100%;
    }
    .Car_outerWrapper{
        display: block;position: relative; box-sizing: border-box;user-select: none;touch-action: pan-y;background-color: rgba(0, 0, 0, 0.24); -webkit-tap-highlight-color: transparent;
    }
    .Car_slidesWindow{
        top: 0;left: 0; right: 0;bottom: 0; overflow: hidden;position: absolute; background-color: transparent;
    }
    .Car_slides{
        top:0;width: 100%;height: 100%;position: absolute;
    }
    .Car_slide {
        top: 0;width: 100%; height: 100%; display: flex; position: absolute;font-size: 12px; align-items: center;align-content: center; justify-content: center;
    }
    .carousel .carousel-text {
        color: rgba(0, 0, 0, 0.32);width: 100%; font-size: 14px;
    }
</style>
