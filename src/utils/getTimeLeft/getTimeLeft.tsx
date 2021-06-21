// 计算目标时间与当前时间的时间差，返回毫秒, 参数传入时间戳
const getTimeLeft = (targetTime: number, currentTime: number) => {
  const difference = targetTime - currentTime;
  return difference;
};

export default getTimeLeft;
