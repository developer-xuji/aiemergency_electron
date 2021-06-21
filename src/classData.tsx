/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-mutable-exports */
export let allClassList: any[] = [];
export let currentTiming = -1;

export const setAllClassList = (list: any[]) => {
  allClassList = [];
  list.forEach((l) => {
    allClassList.push(l);
  });
};
export const setCurrentTiming = (timing: number) => {
  currentTiming = timing;
};
