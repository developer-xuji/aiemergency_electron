/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/always-return */
import getStudioAlert from '../../functions/getAlert';
import setAlert from '../../functions/setAlert';

const checkStudio = (params: any) => {
  const [HOSTNAME, YELLOW, RED, BACKEND_URL, ALERT_URL] = params.constents;
  const id = params.classID;
  return getStudioAlert()
    .then((response) => response?.json())
    .then((studios) => {
      studios.map((s: any) => {
        if (s.name === String(HOSTNAME).toUpperCase()) {
          if (s.status === YELLOW)
            setAlert(BACKEND_URL + ALERT_URL, RED, id, 'No Teacher', '');
          return undefined;
        }
        return undefined;
      });
    });
};

export default checkStudio;
