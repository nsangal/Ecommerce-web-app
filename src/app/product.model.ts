export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    quantity:number;
    addedOn:string;
    seller:string;
    imageUrl: string;
    color?: string;
    size?: string; 
    shipsFrom?: string; 
  }
  