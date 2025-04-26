export interface WorkReportRequest {
    client_id: string;
    eventDate: string;
    workDate: string;
    eventName: string;
    minimumGuests?: number;
    guestsPrediction?: number;
    selectedMenu?: string;
    pricePerGuest?: number;
    payedItems?: { name: string; price: number }[];
    notes?: string[];
    income?: number;
    outcome?: number;
    revenue?: number;
    drinksPayment?: number;
    employeesPayment?: number;
    drinksList?: string[];
    cloneList?: string[];
  }
  