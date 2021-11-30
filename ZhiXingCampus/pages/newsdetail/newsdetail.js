// e:\OpenEuler\myTest\pages\newsdetail\newsdetail.js
const InspireCloud = require ('../../libs/inspirecloud-0.4.1.min.js');
const serviceId = 'qc7be9'; // 替换成你的 serviceId，可在后台「设置」页面获取
// 初始化
const inspirecloud = new InspireCloud({ serviceId });
Page({
  data: {
    id:"",
    news:null,
    imageList: [],
  },
  onLoad: function (option) {
    console.log(option.id);
    this.setData({
      id:option.id,// 拿到测试题型的id
    });
    inspirecloud.run("findNewsById",{"_id":option.id}).then(res => {
      // 处理结果
      this.setData({
        // test:JSON.parse(JSON.stringify(res.result))
        news:res.result[0],
        imageList:[res.result[0].img,res.result[0].img]
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

  previewImage() {
    let { imageList } = this.data;
    console.log(imageList);
    tt.previewImage({
      current: imageList[0],
      urls: imageList,
      success: (res) => {
        console.log("previewImage success");
      },
      fail: (err) => {
        tt.showModal({
          title: "预览失败",
          content: err.errMsg,
          showCancel: false,
        });
      },
    });
  },
  complete: (res) => {
    console.log("预览完成");
  },
})