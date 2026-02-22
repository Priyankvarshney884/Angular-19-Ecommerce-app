export interface Product {
    code:string;
    name:string;
    description?:string;
    price:number;
    currencyIso?:string;
    imageUrl?:string;
}