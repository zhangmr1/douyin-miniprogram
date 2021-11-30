// e:\OpenEuler\myTest\pages\videodetail\videodetail.js
const InspireCloud = require ('../../libs/inspirecloud-0.4.1.min.js');
const serviceId = 'qc7be9'; // 替换成你的 serviceId，可在后台「设置」页面获取
// 初始化
const inspirecloud = new InspireCloud({ serviceId });

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
    id:"",
    video:null,
    // imageList: [],
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
    isFullscreen: true,
    isLoopPlay: false,
    isShowPlayBtn: true,
    isShowControls: true,
    playBtnPosition: 'center',
    objectFitNum: 0,
    objectFitType: 'contain',
    poster: "https://s3.pstatp.com/toutiao/static/img/logo.201f80d.png",
    unitId: 'hefbc5g67f9g1axb6p'

  },
  onLoad: function (option) {
    console.log(option.id);
    this.setData({
      id:option.id,// 拿到测试题型的id
    });
    inspirecloud.run("findVideoById",{"_id":option.id}).then(res => {
      // 处理结果
      this.setData({
        // test:JSON.parse(JSON.stringify(res.result))
        video:res.result[0],
        // imageList:[res.result[0].img]
      })
      console.log(res)
    }).catch(err => {
      // 处理异常
      console.error(err)
    });

    tt.showShareMenu({
      success: (res) => {
        
      },
      fail: (res) => {
        
      },
    });

  },

  showShareMenu() {
    const that = this;
    tt.showShareMenu({
      success(res) {
        // 当 API 成功执行后调用，预定义返回消息格式为${API_NAME}:ok
        console.log(res.errMsg);
        that.setData({
          isHide: true
        });
      },

      fail(res) {
        // 当 API 执行失败后调用, 预定义返回消息格式为${API_NAME}:fail
        console.log(res.errMsg);
      },

      complete(res) {
        // 当 API 执行完成（无论成功或者失败）后都会调用, 预定义返回消息格式为${API_NAME}:ok / fail
        console.log(res.errMsg);
      }
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