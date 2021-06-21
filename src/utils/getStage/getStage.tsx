import getTiming from '../getTiming';
import { TIMING } from '../../constants';

const { CLASS_BEGIN } = TIMING;

const getStage = (classInfo: {
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}) => {
  if (!classInfo) return '';

  const timing = getTiming(
    classInfo.startHour,
    classInfo.startMinute,
    classInfo.endHour,
    classInfo.endMinute
  );
  let stage = 'before_class';

  if (timing === CLASS_BEGIN) stage = 'in_class';

  return stage;
};

export default getStage;
