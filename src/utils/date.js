// utils/date.js
export const toIST = (date) => {
    const offset = 5.5 * 60;
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return new Date(utcDate.getTime() + offset * 60000);
  };