
type Product = {
    id:number,
    name: string,
    price:number,
    stock:number,
    detail:string,
    category:string,
    image:string,
    images:string[],
};

export type Customer={
    customerid : string,
    name:string,
    email:string,
    phone:string,
    address:string,
    password:string,
    createdat:string,
};

export type OrderItem={
    product : Product,
    quantity : number,
};

export type Order={
    id : string,
    customerid:string,
    items : OrderItem[],
    total:number,
    createdat:string,
    name:string,
    email:string,
    phone:string,
    address:string,
};

export default Product;