export interface CustomerAddress {
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  addresses: CustomerAddress[];
}
