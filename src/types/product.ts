export type ChangeDirection = "up" | "down" | "flat";
export type Unit = "kg" | "litre" | "dozen" | "piece";
export interface MarketPrice { market:string; division:string; min:number; max:number; }
export interface ProductChange { dir:ChangeDirection; pct:number; }
export interface Product { id:number; slug:string; nameBn:string; category:string; categoryNameBn:string; categoryIcon:string; unit:Unit; image:string; today:number; yesterday:number; lastWeek:number; lastMonth:number; change:ProductChange; markets:MarketPrice[]; }
export interface Category { id:string; nameBn:string; icon?:string; name?:string; }
