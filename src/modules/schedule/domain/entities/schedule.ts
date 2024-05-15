import { randomUUID } from "crypto";
import { Frequency } from "../enum/frequency";
import { WeekDay } from "../enum/weekday";

export interface ISchedule {
  scheduleId: string;
  teacherStudentId: string;
  frequency: Frequency;
  hour: string;
  weekDay: WeekDay;
  duration: string;
}

export class Schedule implements ISchedule {
  scheduleId: string;
  teacherStudentId: string;
  frequency: Frequency;
  hour: string;
  weekDay: WeekDay;
  duration: string;

  private constructor(data: ISchedule) {
    this.scheduleId = data.scheduleId;
    this.teacherStudentId = data.teacherStudentId;
    this.frequency = data.frequency;
    this.hour = data.hour;
    this.weekDay = data.weekDay;
    this.duration = data.duration;
  }

  static create(data: Omit<ISchedule, "scheduleId">) {
    return new Schedule({ ...data, scheduleId: randomUUID() });
  }

  static restore(data: ISchedule) {
    return new Schedule(data);
  }
}
