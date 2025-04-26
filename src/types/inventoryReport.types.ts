export interface InventoryReportRequest {
    reportDate: string;
    items: {
      itemID: string;
      quantity: number;
    }[];
    businessID: string;
    barID: string;
  }
  