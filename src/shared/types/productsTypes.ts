export interface IProduct {
  brand: string | null;
  id: string;
  product: string;
  price: number
}

export enum EFilterField {
  product = 'product' ,
  price ='price' ,
  brand = 'brand'
}

export type TFilterField = 'product' | 'price' | 'brand' | string;

export type TFilter = { field: TFilterField, value: string | number }