/* eslint-disable no-console */
import { desktopCapturer } from 'electron';
import os from 'os';
// import fs from 'fs';
import fetchData from '../fetchData';

const URL = 'http://5a.ml2.me:9555/api/v1/screen';
// const URL = 'http://localhost:3001/api/v1/screen';

const screenSender = () => {
  desktopCapturer
    .getSources({
      types: ['screen'],
      thumbnailSize: { height: 300, width: 400 },
    })
    .then(async (sources) => {
      // fs.writeFileSync('123.png', sources[1].thumbnail.toPNG());
      // if (sources.length > 1)
      fetchData(URL, 'POST', {
        name: os.hostname(),
        screen: sources[sources.length - 1].thumbnail.toPNG(),
      });

      return 0;
    })
    .catch((err) => console.log(err));
};

const cleanScreenShot = () => {
  console.log('Clean Screen');
  fetchData(URL, 'DELETE', { name: os.hostname() })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return 0;
};

export default { screenSender, cleanScreenShot };
