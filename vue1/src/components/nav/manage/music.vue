<template>
  <div class="music">
    <i @click="close" class="el-icon-headset my_nav_music" id="music_control_icon"></i>
    <span>多喜欢你--小贱</span>
    <el-progress type="circle" :percentage="percentage" status="success" :width="30" :stroke-width="2" :show-text="false" class="svg"></el-progress>
    <i @click="close" :class="[play?'el-icon-video-pause':'el-icon-video-play','my_nav_music_icon','my_nav_music_play']" id="music_control_play"></i>
    <i @click="plus" class="el-icon-plus my_nav_music_icon" id="music_control_plus"></i>
    <i @click="minus" class="el-icon-minus my_nav_music_icon" id="music_control_minus"></i>
    <div class="audio">
      <!--隐藏audio标签-->
      <audio id="music" @timeupdate="audioUpdateTime">
        <source src="http://chipsguide.snaillove.com/Public/Uploads/file_server_storage/Audio/2017/03/23/19/192_20003137.mp3" type="video/mp4">
        您的浏览器不支持audio。
      </audio>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        audio:null,    //音乐播放对象
        play:false,    //是否播放
        percentage:0,  //进度
      }
    },
    mounted () {
      this.audio = document.getElementById('music');
      this.audio.volume = 0.2
    },
    methods: {
      audioUpdateTime(e){
        let time = 0
        if (parseInt(e.target.currentTime) !== Number(time)) {
          time = parseInt(e.target.currentTime)
          this.percentage = parseInt(time/this.audio.duration *100)
          if(this.percentage == 99){
            this.percentage = 0
            this.audio.play()
          }
        }
      },
      close() {
        if (this.audio.paused) {
          this.audio.play();  // 播放
          this.play = true
          $('#music_control_icon').addClass('music_color')
        } else {
          this.audio.pause();// 暂停
          this.play = false
          $('#music_control_icon').removeClass('music_color')
        }
      },
      plus(){  //增加音量
        if(this.play&&this.audio.volume<0.9){
          this.audio.volume += 0.1
          if(this.audio.volume>0.9)
            this.audio.volume = 1
        }
      },
      minus(){    //减少音量
        if(this.play&&this.audio.volume>0){
          this.audio.volume -= 0.1
          if(this.audio.volume<0.1)
            this.audio.volume = 0
        }
      },
    },
  }
</script>

<style lang="less">
  .music{
    float: left;
    height: 45px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .my_nav_music{
      font-size: 20px;
      color: rgb(152,152,152);
      cursor: pointer;
      transition: 0.2s;
    }
    .my_nav_music_icon{
      font-size: 18px;
      color: rgb(152,152,152);
      cursor: pointer;
      transition: 0.2s;
    }
    .svg{
      position: relative;
      transform: translate3d(0,8px,0);
    }
    .my_nav_music_play{
      position: absolute;
      transform: translate3d(-28px,14px,0);
    }
    .music_color{
      color: lightgreen;
    }
  }
  .music:hover .my_nav_music{
    color: lightgreen;
  }
</style>
