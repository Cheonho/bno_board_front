import {format} from "date-fns";

export const customFormatDate = (date: string | Date, formatStr: string = "yyyy. MM. dd") => {
  return format(new Date(date), formatStr);
};