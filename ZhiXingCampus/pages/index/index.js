const InspireCloud = require ('../../libs/inspirecloud-0.4.1.min.js');
const serviceId = 'qc7be9'; // 替换成你的 serviceId，可在后台「设置」页面获取
// 初始化
const inspirecloud = new InspireCloud({ serviceId });


const app = getApp()

App({
  onLaunch: function () {
    

  }
})

function getRandomColor() {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length == 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
}

Page({
  onReady: function (res) { },
  inputValue: '',
  data: {

    news:null,
    url:"",
    videos:null,
    src: '',
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }],
    isFullscreen: false,
    isLoopPlay: false,
    isShowPlayBtn: true,
    isShowControls: true,
    playBtnPosition: 'center',
    objectFitNum: 0,
    objectFitType: 'contain',
    // poster: "https://s3.pstatp.com/toutiao/static/img/logo.201f80d.png",
    unitId: 'hefbc5g67f9g1axb6p'
  },
  onLoad: function () {
    //获取新闻数据
    inspirecloud.run("findAllNews").then(res => {
      // 处理结果
      this.setData({
        // test:JSON.parse(JSON.stringify(res.result))
        news:res
      })
      console.log(res)
    }).catch(err => {
      // 处理异常
      console.error(err)
    });

    //获取视频数据
    inspirecloud.run("findAllVideos").then(res => {
      // 处理结果
      this.setData({
        // test:JSON.parse(JSON.stringify(res.result))
        videos:res
      })
      console.log(res)
    }).catch(err => {
      // 处理异常
      console.error(err)
    });
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    tt.showLoading({
      title: 'loading...',
      icon: 'loading'
    })
    setTimeout(() => {
      this.stopPullDownRefresh();
    }, 3000);
  },
  stopPullDownRefresh: function () {
    tt.stopPullDownRefresh({
      complete: function (res) {
        tt.hideLoading();
      }
    })
  },
  // 上拉加载
  onReachBottom () {
    tt.showLoading({
      title: 'loading...',
      icon: 'loading'
    })
    setTimeout(() => {
      this.stopPullDownRefresh();
    }, 3000);
  },

  toDetail:function(e){
    var item = e.currentTarget.dataset.binditem;
    tt.navigateTo({
      url: '../newsdetail/newsdetail?id='+item._id, // 指定页面的 url
      success: (res) => {
        console.log("跳转成功");
      },
      fail: (res) => {
        console.log("跳转失败");
      },
    });
  },
  toVideoDetail:function(e){
    var id=e.target.id;
    var item = e.currentTarget.dataset.binditem;
    if(id=="myVideo"){
      return;
    }
    tt.navigateTo({
      url: '../videodetail/videodetail?id='+item._id, // 指定页面的 url
      success: (res) => {
        console.log("跳转成功");
      },
      fail: (res) => {
        console.log("跳转失败");
      },
    });
  },

  bindadload(e) {
    console.log('广告加载成功', e);
  },
  bindaderror(e) {
    console.log('广告出错', e);
  },
  bindadclose(e) {
    console.log('关闭广告', e);
  },
  bindadstart(e) {
    console.log('播放广告', e);
  },
  bindwaiting(e) {
    console.log('视频正在缓冲', e);
  },
  bindtimeupdate(e) {
    // console.log('播放进度变化', e);
  },
  bindended(e) {
    console.log('视频已经播放结束', e);
  },
  bindpause(e) {
    console.log('视频暂停了', e);
  },
  bindplay(e) {
    console.log('视频开始播放了', e);
  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value;
  },
  bindButtonTap: function () {
    var that = this;
    tt.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        });
      }
    });
  },
  videoErrorCallback: function (e) {
    console.log(e.detail.errMsg);
  },

  switchFullScreen() {
    this.setData({
      isFullscreen: !this.data.isFullscreen
    });
  },

  switchLoopPlay() {
    this.setData({
      isLoopPlay: !this.data.isLoopPlay
    });
  },

  switchPlayBtn() {
    this.setData({
      isShowPlayBtn: !this.data.isShowPlayBtn
    });
  },

  switchControls() {
    this.setData({
      isShowControls: !this.data.isShowControls
    });
  },

  switchPlayBtnPosition() {
    console.log('switchPlayBtnPosition:', this.data.playBtnPosition);
    this.setData({
      playBtnPosition: this.data.playBtnPosition === 'center' ? 'bottom' : 'center'
    });
  },

  switchFit() {
    const objectFitEnum = ['contain', 'fill', 'cover'];
    this.setData({
      objectFitType: objectFitEnum[this.data.objectFitNum % 3],
      objectFitNum: this.data.objectFitNum + 1
    });
  }
})


// 在小程序中，需要先下载 SDK，并移动至 libs 目录


// 函数名称




// inspirecloud.user.loginByOAuth({
//   platform:"bytedanceMicroapp",
//   allowAnonymousLogin: false // 是否允许匿名登录
// }).then(function (result) {
//   inspirecloud.run("getUserInfo").then(function (user)  {
//     //处理结果
//     console.log(user)
//   }).catch(function (err) {
//     // 处理异常
//     console.error(err)
//   })
// }).catch(function (err){
//   // 处理异常
//   console.error(err)
// });
