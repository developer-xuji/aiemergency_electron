/* eslint-disable global-require */
// 运行cmd命令
const runCMDCommand = (command: string) => {
  const Shell = require('node-powershell');
  const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true,
    windowStyle: 'Hidden',
  });
  ps.addCommand(command);
  ps.invoke();
  ps.EndInvoke();
};
export default runCMDCommand;
