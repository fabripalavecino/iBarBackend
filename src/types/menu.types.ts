export interface MenuRequest {
    barID: string;
    name: string;
    items: { itemID: string; quantity: number }[];
};
