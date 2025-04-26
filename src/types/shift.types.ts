export interface ShiftRequest {
  reportID: string;
  employeeID: string;
  businessID: string;
  barID: string;
  dateOfWork: Date;
  startTime: Date;
  endTime: Date;
  hourPayment?: number;
  dailyPayment?: number;
  travelRefund?: number;
  totalPayment: number;
}