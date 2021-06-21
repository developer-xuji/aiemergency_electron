const DEFAULT_VALUE = '';

export interface ClassInfo {
  id: string;
  studio: string;
  teacher: string;
  teacherID: string;
  classString: string;
  topic: string;
  uniform: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
  specialClass: string;
}

export const initClassInfo = () => {
  return {
    id: DEFAULT_VALUE,
    studio: DEFAULT_VALUE,
    teacher: DEFAULT_VALUE,
    teacherID: DEFAULT_VALUE,
    classString: DEFAULT_VALUE,
    topic: DEFAULT_VALUE,
    uniform: DEFAULT_VALUE,
    startHour: DEFAULT_VALUE,
    startMinute: DEFAULT_VALUE,
    endHour: DEFAULT_VALUE,
    endMinute: DEFAULT_VALUE,
    specialClass: DEFAULT_VALUE,
  };
};
