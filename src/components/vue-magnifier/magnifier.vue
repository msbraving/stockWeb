<template>
  <div id="magnifier" class="preview">
    <div
      class="small-box"
        @mouseover="smallBoxOver"
        @mousemove="smallBoxMove($event)"
        @mouseleave="smallLeave"
    >
      <!-- <VideoPlayer v-if="isShowVideo" class="videoPlayer" :video="videoObj"></VideoPlayer> -->
      <img :src="imageArr[activeIndex].imageUrl" />
      <span class="hover"></span>
    </div>
    <div class="thumbnail-box">
      <a class="btn btn-prev" @click="prev"><Icon type="ios-arrow-back" class="btnICon" /></a>
      <a class="btn btn-next" @click="next"><Icon type="ios-arrow-forward" class="btnICon" /></a>
 
      <div class="list">
        <ul class="wrapper">
          <li
            class="item"
            v-for="(item, index) in imageArr"
            :key="index"
            @mouseover="chooseImg(item,index)"
            @mouseleave="leaveImg(index)"
            :class="activeIndex===index?'item-cur':''"
          >
            <img :src="item.imageUrl" />
          </li>
        </ul>
      </div>
    </div>
    <div class="big-box">
      <img :src="imageArr[activeIndex].imageUrl" />
    </div>
  </div>
</template>
 
<script>
import $ from 'jquery'
// import 'jquery'
// import VideoPlayer from '@/components/video/video'
// import VideoPlayer from '@/components/video/simpleVideo'
 
export default {
  data() {
    return {
      activeIndex: 0,
      isShowVideo: false,
      goodVideo: '',
    //   videoObj: {
    //     type: 'video/mp4',
    //     src: require('../../assets/video/jabil.mp4')
    //   },
      $elem: '',
      $smallBox: '',
      $smallBox_pic: '',
      $smallBox_mask: '',
      $thumbnailBox: '',
      $thumbnailBox_prev: '',
      $thumbnailBox_next: '',
      $thumbnailBox_wrapper: '',
      $thumbnailBox_item: '',
      $thumbnailBox_pic: '',
      $bigBox: '',
      $bigBox_pic: ''
    }
  },
  components: {
    // VideoPlayer
  },
  props: ['imageArr'],
  created() {
   
  },
  mounted() {
    
    // this.init()
    this.initPreview()
  },
  methods: {
    init (){
      // if (this.imageArr[0].imageUrl) {
      //   this.$set(this.imageArr[0], 'imageUrl', this.imageArr[0].imageUrl)
      // } else {
      //   this.init()
      // }
    },
    playVideo() {
      this.isShowVideo = true
    },
    initPreview() {
      this.$elem = $('#magnifier')
      this.$smallBox = this.$elem.find('.small-box')
      this.$smallBox_pic = this.$smallBox.find('img')
      this.$smallBox_mask = this.$smallBox.find('.hover')
      this.$thumbnailBox = this.$elem.find('.thumbnail-box')
      this.$thumbnailBox_prev = this.$thumbnailBox.find('.btn-prev')
      this.$thumbnailBox_next = this.$thumbnailBox.find('.btn-next')
      this.$thumbnailBox_wrapper = this.$thumbnailBox.find('.wrapper')
      this.$thumbnailBox_item = this.$thumbnailBox.find('.item')
      this.$thumbnailBox_pic = this.$thumbnailBox.find('img')
      this.$bigBox = this.$elem.find('.big-box')
      this.$bigBox_pic = this.$bigBox.find('img')
    },
    moveBigPic() {
      // 改变大图
      let scaleX =
        this.$smallBox_mask.position().left /
        (this.$smallBox.width() - this.$smallBox_mask.width())
      let scaleY =
        this.$smallBox_mask.position().top /
        (this.$smallBox.height() - this.$smallBox_mask.height())
      let scroll_l = scaleX * (this.$bigBox_pic.width() - this.$bigBox.width())
      let scroll_t =
        scaleY * (this.$bigBox_pic.height() - this.$bigBox.height())
      this.$bigBox.stop(true)
      this.$bigBox.scrollLeft(scroll_l).scrollTop(scroll_t)
    },
    setMask() {
      // 设置 mask 宽高
      //   let mask_w =
      //     this.$smallBox.width() /
      //     (this.$bigBox_pic.width() / this.$bigBox.width()) /
      //     2.5
      //   let mask_h =
      //     this.$smallBox.height() /
      //     (this.$bigBox_pic.height() / this.$bigBox.height()) /
      //     2.5
      //   //   this.$smallBox_mask.stop(true)
      //   this.$smallBox_mask.css({ width: mask_w, height: mask_h })
      //   this.$smallBox_mask.css({ height: '121.5px', width: '121.5px' })
    },
    smallBoxOver() {
      this.$bigBox.show()
      this.$smallBox_mask.show()
      this.setMask()
      this.$smallBox.stop(true)
    },
    smallBoxMove(ev) {
        // console.log('ev.clientX', this.$smallBox.offset().left)
      let oEvent = ev || window.event
      let offset_pos = {
        left: oEvent.clientX - this.$smallBox.offset().left - this.$smallBox_mask.width() / 2,
        top:
          oEvent.clientY -
          this.$smallBox.offset().top -
          this.$smallBox_mask.height() / 2 +
          $(window).scrollTop()
      }
      if (offset_pos.left < 0) {
        offset_pos.left = 0
      } else if (
        offset_pos.left >
        this.$smallBox.width() - this.$smallBox_mask.width()
      ) {
        offset_pos.left = this.$smallBox.width() - this.$smallBox_mask.width()
      }
      if (offset_pos.top < 0) {
        offset_pos.top = 0
      } else if (
        offset_pos.top >
        this.$smallBox.height() - this.$smallBox_mask.height()
      ) {
        offset_pos.top = this.$smallBox.height() - this.$smallBox_mask.height()
      }
 
      this.$smallBox_mask.css(offset_pos)
      //   this.$smallBox_mask.css({ height: '121.5px', width: '121.5px' })
 
      this.moveBigPic()
    },
    smallLeave() {
      this.$smallBox_mask.hide()
      this.$bigBox.hide()
    },
    prev() {
      this.$thumbnailBox_wrapper.animate({ marginLeft: 0 })
    },
    next() {
      let ov_pic = this.$thumbnailBox_item.length - 5
      let ov_dis = ov_pic * 78
      this.$thumbnailBox_wrapper.stop(true)
      if (ov_pic > 0) {
        this.$thumbnailBox_wrapper.animate({ marginLeft: -ov_dis })
      }
    },
    leaveImg(index) {},
    chooseImg(item, index) {
      this.theImg = item
      this.activeIndex = index
    }
  }
}
</script>
 
<style lang="less" scoped>
.vjs_video_3-dimensions.vjs-fluid {
  padding-top: 100% !important;
}
.videoPlayer {
  height: 100%;
  width: 100%;
}
 
.thumbnail-box {
  position: relative;
  width: 100%;
  height: 62px;
  .btn-prev {
    left: 0;
    // background: url(../../assets/img/fjd/images/btn_prev.png) no-repeat;
  }
  .btn-next {
    right: 0;
    // background: url(../../assets/img/fjd/images/btn_next.png) no-repeat;
  }
  .btn {
    position: absolute;
    top: 50%;
    width: 22px;
    height: 32px;
    margin-top: -16px;
    
  }
  .btnICon{
    font-size: 20px;color: #999;
  }
  .list {
    overflow: hidden;
    width: 390px;
    margin: 0 auto;
    height: 58px;
  }
  .wrapper {
    width: 100000px;
  }
  .list .item {
    float: left;
    margin: 0 11.9px;
    img {
      border: 2px solid #fff;
      height: 50px;
      width: 50px;
    }
  }
 
  .list .item-cur img {
    border: 2px solid #e53e41;
  }
}
 
ul,
li {
  list-style: none;
}
#magnifier {
  position: relative;
  width: 450px;
}
.small-box {
  position: relative;
  width: 450px;
  height: 450px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  img {
    display: block;
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
  .hover {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 125px;
    height: 125px;
    border: 1px solid #aaa;
    background: #0099ff;
    opacity: 0.5;
    cursor: move;
  }
}
 
.big-box {
  display: none;
  overflow: hidden;
  position: absolute;
  left: 451px;
  top: 0;
  width: 540px;
  height: 540px;
  border: 1px solid #e4e4e4;
  z-index: 999;
  img {
    display: block;
    height: 128%;
  }
}
 
.preview {
  .preview-btn {
    position: absolute;
    z-index: 5;
    bottom: 62px;
    left: 0;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    text-align: center;
    li {
      display: inline-block;
      margin: 0 5px;
      vertical-align: text-top;
    }
    .video-icon {
      cursor: pointer;
      display: inline-block;
      z-index: 999;
      width: 50px;
      height: 50px;
      background: url(//static.360buyimg.com/item/unite/1.0.101/components/default/preview/i/main-circles.png)
        0 -55px no-repeat;
    }
    .video-icon:hover {
      background: url(//static.360buyimg.com/item/unite/1.0.101/components/default/preview/i/main-circles.png) -55px -55px
        no-repeat;
    }
  }
}
</style>
