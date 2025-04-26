export interface ClientRequest {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    barID: string;
    businessID: string;
  }
  
  export interface ClientUpdateRequest extends Partial<ClientRequest> {}
  