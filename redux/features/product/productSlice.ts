import {createSlice , PayloadAction} from '@reduxjs/toolkit';
import Product from "@/types/type";
import { addToCart , increaseQuantity , decreaseQuantity ,removeFromCart ,clearCart } from "@/redux/features/cart/cartSlice";
export const products: Product[]=
[
  {
    id: 1,
    name: "Apple Watch Series 7",
    price: 10000,
    stock: 5,
    detail: "This is Apple watch.",
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsN5LRwYBHNlFgJYmHMQ9bZyJ7lHVzrlo92kAzcGdQNdpd-Ft_ItI78fc&s=10",
   images: [
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600"
]
  },
  {
    id: 2,
    name: "Airpods",
    price: 9000,
    stock: 10,
    detail: "This is Apple Airpods.",
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc2KGycdwHD2kGO1BU2g296PihHDCrZo7liKuGafMQEm4dGz4MJi2UrtOr&s=10",
    images: [
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
  "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600"
]
  },
  {
    id: 3,
    name: "Levi's Premium Shirt",
    price: 4000,
    stock: 15,
    detail: "This is Levi's Shirt.",
    category: "Clothing",
    image: "https://i.pinimg.com/736x/e4/74/85/e47485e353106ad829b9b65dd94818c8.jpg",
  images: [
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600"
]
  },
  {
    id: 4,
    name: "Levi's Jeans",
    price: 2000,
    stock: 12,
    detail: "This is Levi's jeans.",
    category: "Clothing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN3WFg0ARo5g4j6RDU9rbSgIxHGG3IZ87CoO9iIgf_XmLYpOX3sHoeiT4&s=10",
   images: [
  "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600"
]
  },
  {
    id: 5,
    name: "Mac - Laptop",
    price: 90000,
    stock: 200,
    detail: "This is Apple MacBook.",
    category: "Electronics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUqy868QcqhLr3s3j0lhvNdgciDRYavi23Ez2AdTNWdZGDIT-QM7D1-8k&s=10",
  images: [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
]
  },
  {
    id: 6,
    name: "Tea-Cup",
    price: 4000,
    stock: 150,
    detail: "This is Tea-cup.",
    category: "Kitchen",
    image: "https://www.ikea.com/us/en/images/products/vaerdera-coffee-cup-and-saucer-white__0713419_pe729512_s5.jpg?f=s",
   images: [
  "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600"
]
  },
  {
    id: 7,
    name: "Wireless Bluetooth Earbuds",
    price: 4500,
    stock: 35,
    category: "Electronics",
    detail: "True wireless earbuds with deep bass.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
   images: [
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600",
  "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600"
]
  },
  {
    id: 8,
    name: "Smart Watch Series 8",
    price: 8999,
    stock: 22,
    category: "Electronics",
    detail: "1.69 inch HD display, heart rate and SpO2 monitor.",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
   images: [
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600"
]
  },
  {
    id: 9,
    name: "Premium Hoodie - Black",
    price: 3200,
    stock: 50,
    category: "Clothing",
    detail: "Heavy fleece hoodie, warm and soft inside, oversized fit perfect for winter streetwear.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  images: [
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600"
]
  },
  {
    id: 10,
    name: "Running Shoes - White",
    price: 6500,
    stock: 18,
    category: "Footwear",
    detail: "Lightweight breathable mesh running shoes with soft foam sole for daily running and gym.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
   images: [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600"
]
  },
  {
    id: 11,
    name: "Leather Backpack",
    price: 5200,
    stock: 25,
    category: "Bags",
    detail: "Vintage PU leather backpack with laptop compartment, durable and stylish for office and university.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600",
    images: [
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
  "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600"
]
  },
  {
    id: 12,
    name: "Oversized T-Shirt",
    price: 1800,
    stock: 60,
    category: "Clothing",
    detail: "100% cotton oversized t-shirt, soft fabric, drop shoulder design for casual wear.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    images: [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
]
  },
  {
    id: 13,
    name: "Wireless Gaming Mouse",
    price: 2800,
    stock: 40,
    category: "Electronics",
    detail: "RGB wireless gaming mouse with 6 programmable buttons and 2400 DPI for smooth gaming.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
  images: [
  "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600"
]
  },
  {
    id: 14,
    name: "Mechanical Keyboard RGB",
    price: 7500,
    stock: 15,
    category: "Electronics",
    detail: "Mechanical blue switches keyboard with RGB backlight, anti-ghosting for gamers and programmers.",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=600",
   images: [
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
  "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600"
]
  },
  {
    id: 15,
    name: "Classic Sunglasses",
    price: 2200,
    stock: 45,
    category: "Accessories",
    detail: "UV400 protection classic black sunglasses, polarized lens for driving and outdoor.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
    images: [
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
]
  },
  {
    id: 16,
    name: "Denim Jacket - Blue",
    price: 4800,
    stock: 20,
    category: "Clothing",
    detail: "Classic blue denim jacket, premium quality denim, perfect for all seasons layering.",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600",
    images: [
  "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600",
  "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600"
]
  },
  {
    id: 17,
    name: "Noise Cancelling Headphones",
    price: 9800,
    stock: 12,
    category: "Electronics",
    detail: "Over-ear wireless headphones with active noise cancellation and 40H playtime.",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
   images: [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600"
]
  },
  {
    id: 18,
    name: "Stylish Baseball Cap",
    price: 1200,
    stock: 55,
    category: "Accessories",
    detail: "Adjustable cotton baseball cap with embroidered logo, breathable for daily use.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
    images: [
  "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600"
]
  },
  {
    id: 19,
    name: "Smartphone Stand - Aluminum",
    price: 900,
    stock: 70,
    category: "Accessories",
    detail: "Foldable aluminum phone stand for desk, sturdy and adjustable angle for videos and calls.",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600",
    images: [
  "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600"
]
  },
  {
    id: 20,
    name: "Cargo Pants - Olive",
    price: 3800,
    stock: 28,
    category: "Clothing",
    detail: "6 pocket cargo pants, cotton fabric, relaxed fit, durable for casual and outdoor wear.",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
   images: [
  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
  "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600"
]
  }
]


type ProductState = {
    Products: Product[];
};

const initialState:ProductState = {
    Products:[],
};

const productSlice = createSlice({
    name : "product",
    initialState,
   
    reducers:{
      addProduct:(state ,action:PayloadAction<Product>)=>{
        state.Products.push(action.payload);
      },
      removeProduct:(state,action:PayloadAction<number>)=>{
        state.Products = state.Products.filter((product)=>product.id !== action.payload);
      },
      setProducts: (state, action: PayloadAction<Product[]>) => {
         state.Products = action.payload;
       },
      editProduct:(state , action:PayloadAction<Product>)=>{
        const index = state.Products.findIndex(
          (product)=> product.id === action.payload.id
        )
        if(index !== -1){
           state.Products[index] = action.payload;
        }
      }
    },
    
extraReducers: (builder) => {
  builder.addCase(addToCart, (state, action) => {
    const product = state.Products.find(
      (item) => item.id === action.payload.id
    );

    if (product && product.stock > 0) {
      product.stock -= 1;
    }
  });

  builder.addCase(increaseQuantity, (state, action) => {
    const product = state.Products.find(
      (item) => item.id === action.payload.id
    );

    if (product && product.stock > 0) {
      product.stock -= 1;
    }
  });

  builder.addCase(decreaseQuantity, (state, action) => {
    const product = state.Products.find(
      (item) => item.id === action.payload
    );

    if (product) {
      product.stock += 1;
    }
  });

  builder.addCase(removeFromCart, (state, action) => {
    const product = state.Products.find(
      (item) => item.id === action.payload.id
    );

    if (product) {
      product.stock += action.payload.quantity;
    }
  });

  builder.addCase(clearCart, (state, action) => {
    action.payload.forEach((cartItem) => {
      const product = state.Products.find(
        (item) => item.id === cartItem.product.id
      );

      if (product) {
        product.stock += cartItem.quantity;
      }
    });
  });
},
    
    
});
export const {addProduct , removeProduct , setProducts , editProduct} = productSlice.actions;
export default productSlice.reducer;

