"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "./store";
import { setCart } from "./features/cart/cartSlice";
import { setProducts, products as defaultProducts } from "./features/product/productSlice";
import type Product from "@/types/type";

type Props = { children: React.ReactNode };

export default function ReduxProvider({ children }: Props) {
  useEffect(() => {
    let loading = true;
    let saving = false;

    async function loadFromDatabase() {
      try {
        const productResponse = await fetch("/api/products");
        if (productResponse.ok) {
          const savedProducts: Product[] = await productResponse.json();
          if (Array.isArray(savedProducts) && savedProducts.length) {
            const updated = savedProducts.map((saved) => {
              const original = defaultProducts.find((item) => item.id === saved.id);
              return { ...saved, images: saved.images?.length ? saved.images : original?.images ?? [] };
            });
            store.dispatch(setProducts(updated));
          }
        }

        const customerResponse = await fetch("/api/auth/me");
        const customer = await customerResponse.json();
        if (customer.loggedIn) {
          const cartResponse = await fetch("/api/cart");
          if (cartResponse.ok) {
            const cart = await cartResponse.json();
            store.dispatch(setCart(Array.isArray(cart.items) ? cart.items : []));
          }
        }
      } catch (error) {
        console.error("Could not load data from MongoDB:", error);
      } finally {
        loading = false;
      }
    }

    loadFromDatabase();

    const unsubscribe = store.subscribe(async () => {
      if (loading || saving) return;
      saving = true;
      try {
        const adminResponse = await fetch("/api/admin/status");
        const admin = await adminResponse.json();
        if (admin.isAdmin) {
          return;
        } else {
          const sessionResponse = await fetch("/api/auth/me");
          const session = await sessionResponse.json();
          if (session.loggedIn) {
            await fetch("/api/cart", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: store.getState().cart.items }),
            });
          }
        }
      } catch (error) {
        console.error("Could not save data to MongoDB:", error);
      } finally {
        saving = false;
      }
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
