export interface MenuRequest {
    barID: string;
    businessID: string;
    name: string;
    price: number;
    drinksList: {
      itemID: string;
      quantity: number;
    }[];
  }
  