export interface Stock {
  numberDay: number;
  date: Date;
  value: number;
  percentageChangePreviousDay?: number;
  percentageChangeFirstDay?: number;
}
