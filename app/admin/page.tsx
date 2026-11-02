
"use client";

import { LoaderCircle, LogOut, Trash, Pencil, ShieldUser, House } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setProducts } from "@/redux/features/product/productSlice";

import Toast from "@/components/Toast";

import AdminNavbar from "@/components/AdminNavbar";

function Admin() {
  const [checkUser, setCheckUser] = useState(true);

  useEffect(() => {
    fetch("/api/admin/status")
      .then((response) => response.json())
      .then((data) => {
        if (!data.isAdmin) {
          window.location.replace("/isAdmin");
        } else {
          setCheckUser(false);
        }
      })
      .catch(() => window.location.replace("/isAdmin"));
  }, []);

  const products = useAppSelector((state) => state.product.Products);
  const dispatch = useAppDispatch();

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");


  const [extraImages, setExtraImages] = useState("");


  async function handleProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const productToSave = {
      id:
        editingProductId ??
        Math.max(0, ...products.map((product) => product.id)) + 1,
      name: name.trim(),
      price: Number(price),
      stock: Number(stock),
      category: category.trim(),
      detail: detail.trim(),
      image: image.trim(),
      images: extraImages
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    };

    let updatedProducts;

    if (editingProductId !== null) {
      updatedProducts = products.map((product) =>
        product.id === editingProductId ? productToSave : product
      );
    } else {
      updatedProducts = [...products, productToSave];
    }

    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProducts),
      });

      if (!response.ok) {
        throw new Error("Could not save product");
      }

      dispatch(setProducts(updatedProducts));

      setToastMsg(
        editingProductId !== null
          ? "Product Edited Successfully!"
          : "Product Added Successfully!"
      );

      setShowToast(true);

      setName("");
      setPrice("");
      setStock("");
      setCategory("");
      setDetail("");
      setImage("");
      setExtraImages("");
      setEditingProductId(null);
    } catch (error) {
      console.error("Product save error:", error);
      setToastMsg("Could not save product. Please try again.");
      setShowToast(true);
    }
  }
  async function handleRemove(productId: number) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );

    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProducts),
      });

      if (!response.ok) {
        throw new Error("Could not remove product");
      }

      dispatch(setProducts(updatedProducts));

      setToastMsg("Product Removed Successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Product remove error:", error);
      setToastMsg("Could not remove product. Please try again.");
      setShowToast(true);
    }
  }

  function handleLogout() {
    fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      window.location.replace("/isAdmin");
    });
  }

  function handleEdit(product: (typeof products)[number]) {
    setEditingProductId(product.id);
    setName(product.name);
    setPrice(String(product.price));
    setStock(String(product.stock));
    setCategory(product.category);
    setDetail(product.detail);
    setImage(product.image);
    setExtraImages((product.images ?? []).join(", "));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (checkUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin text-blue-600 sm:h-10 sm:w-10" />
      </div>
    );
  }

  const inputClass =
    "w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-gray-600 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 sm:rounded-xl sm:px-3.5 sm:py-3";

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen overflow-x-hidden bg-slate-50 px-3 py-4 sm:px-5 sm:py-6 md:px-8 md:py-8">

        <Toast
          message={toastMsg}
          show={showToast}
          onClose={() => setShowToast(false)}
        />

        <div className="mx-auto w-full max-w-6xl">

          <header className="mb-3 flex justify-center rounded-xl border border-slate-200 p-3 shadow-sm sm:mb-4 sm:rounded-2xl sm:p-5">
            <h1 className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 px-3 py-2 text-center text-lg font-bold tracking-tight text-black sm:gap-3 sm:rounded-xl sm:px-6 sm:py-3 sm:text-2xl md:text-3xl">
              <ShieldUser className="h-5 w-5 shrink-0 sm:h-8 sm:w-8" />
              <span>Admin Dashboard</span>
            </h1>
          </header>

          <p className="mb-5 px-1 text-center text-sm font-medium text-slate-700 sm:mb-7 sm:text-base md:text-lg">
            Manage your products from this Admin Dashboard
          </p>


          <form
            onSubmit={handleProduct}
            className="mb-6 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:mb-8 sm:rounded-2xl sm:p-6 md:p-8"
          >
            <h2 className="mb-4 border-b border-slate-100 pb-3 text-lg font-bold text-slate-900 sm:mb-5 sm:pb-4 sm:text-xl">
              {editingProductId !== null ? "Edit Product" : "Add Product"}
            </h2>

            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <input
                required
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />

              <input
                required
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={inputClass}
              />

              <input
                required
                type="number"
                min="0"
                step="1"
                placeholder="Stock Quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={inputClass}
              />

              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothes</option>
                <option value="Footwear">Footwear</option>
                <option value="Bags">Bags</option>
                <option value="Accessories">Accessories</option>
                <option value="Beauty">Beauty</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
                <option value="Grocery">Grocery</option>
                <option value="Books & Stationery">Books & Stationery</option>
                <option value="Furniture">Furniture</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Pet Supplies">Pet Supplies</option>
                <option value="Fitness & Exercise">Fitness & Exercise</option>
                <option value="Travel & Luggage">Travel & Luggage</option>
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Art">Art</option>
                <option value="Office">Office</option>
                <option value="Digital Products">Digital Products</option>
              </select>

              <input
                required
                type="url"
                placeholder="Product image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={`${inputClass} sm:col-span-2`}
              />


              <input
                type="text"
                placeholder="Extra image URLs (separate with commas)"
                value={extraImages}
                onChange={(e) => setExtraImages(e.target.value)}
                className={`${inputClass} sm:col-span-2`}
              />


              <textarea
                required
                placeholder="Product description"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                className={`${inputClass} resize-y sm:col-span-2`}
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:mt-5 sm:w-auto sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
            >
              {editingProductId !== null ? "Save Edited Product" : "Add Product"}
            </button>
          </form>


          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-5 sm:gap-3">
              <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Manage Products
              </h2>

              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
                Total Products: {products.length}
              </span>
            </div>


            <div className="grid grid-cols-1 gap-3 sm:hidden">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="min-w-0 rounded-lg border border-slate-200 p-3"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 shrink-0 rounded-lg border border-slate-100 bg-white p-1 object-contain"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold text-slate-900">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        ${product.price.toLocaleString()}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Stock: {product.stock}
                      </p>

                      <p className="mt-1 break-words text-xs text-slate-600">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      title="Edit"
                      aria-label={`Edit ${product.name}`}
                      onClick={() => handleEdit(product)}
                      className="flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      title="Remove"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => handleRemove(product.id)}
                      className="flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      <Trash size={16} />
                      Remove
                    </button>
                  </div>
                </article>
              ))}

              {products.length === 0 && (
                <p className="py-6 text-center text-sm text-gray-500">
                  No products available.
                </p>
              )}
            </div>


            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-gray-600 text-xs font-bold uppercase tracking-wider text-white">
                    <th className="p-3">Image</th>
                    <th className="p-3">Product</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40"
                    >
                      <td className="p-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="h-14 w-14 rounded-lg border border-slate-100 bg-white p-1 object-contain sm:h-16 sm:w-16"
                        />
                      </td>

                      <td className="max-w-48 break-words p-3 font-semibold text-slate-800">
                        {product.name}
                      </td>

                      <td className="whitespace-nowrap p-3 font-semibold text-slate-800">
                        ${product.price.toLocaleString()}
                      </td>

                      <td className="p-3 font-semibold text-slate-800">
                        {product.stock}
                      </td>

                      <td className="p-3 text-sm text-slate-600">
                        {product.category}
                      </td>

                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            title="Edit"
                            aria-label={`Edit ${product.name}`}
                            onClick={() => handleEdit(product)}
                            className="flex cursor-pointer items-center justify-center rounded-lg border border-sky-200 bg-sky-50 p-2 text-sky-700 transition hover:bg-sky-100"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            title="Remove"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => handleRemove(product.id)}
                            className="flex cursor-pointer items-center justify-center rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100"
                          >
                            <Trash size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-6 text-center text-gray-500"
                      >
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>


          <div className="mt-4 grid grid-cols-1 gap-3 pb-2 sm:mt-6 sm:grid-cols-2 sm:gap-4">
            <button
              type="button"
              onClick={() => window.location.replace("/")}
              title="Home"
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
            >
              <House size={19} />
              Home
            </button>

            <button
              type="button"
              title="Logout from Admin"
              onClick={handleLogout}
              className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:rounded-xl sm:px-6 sm:py-3 sm:text-base"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Admin;
