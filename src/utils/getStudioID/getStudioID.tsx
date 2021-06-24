const os = require('os');

const STUDIO_TYPE = 'dorcas';
// const MULTI_TYPE = 'Multi';

// 获取当前主机名
const hostName: string = os.hostname();
// let reg = new RegExp('0', 'g');

// dorcas 版本
const studioNumber: string =
  hostName.slice(8, 9) === '0' ? hostName.slice(9, 10) : hostName.slice(8, 10);
const studioID: string = STUDIO_TYPE + studioNumber;
// const studioID = 'dorcas3';

// Multi版本
// const studioID: string = MULTI_TYPE+hostName.slice(5, 8);

// hostName[0].toUpperCase() + hostName.slice(1, 5) + " " + hostName.slice(5);

export default studioID;
