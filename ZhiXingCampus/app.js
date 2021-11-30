const InspireCloud = require('./libs/inspirecloud-0.4.1.min.js');

const myServiceId = 'qc7be9';  // 替换成你的 serviceId，可在后台「设置」页面获取

// 初始化轻服务实例
const inspirecloud = new InspireCloud({
  serviceId: myServiceId,
});
