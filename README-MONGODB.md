# E-Store — MongoDB version

This version keeps the same Next.js pages, components, styles, images, and Redux structure. Customer accounts, product data, carts for logged-in customers, and orders now use MongoDB instead of browser localStorage. Login uses secure HTTP-only cookies. The theme preference uses a browser cookie.

## 1. Install Node.js

Use Node.js 20.9 or newer. Open the extracted project folder in VS Code.

## 2. Create a MongoDB database

1. Open https://www.mongodb.com/atlas/database and create a free cluster.
2. In **Database Access**, create a database username and password.
3. In **Network Access**, add your current IP address. For local testing only, you may temporarily allow `0.0.0.0/0`; do not use that setting if you can avoid it in production.
4. Click **Connect** → **Drivers** and copy the connection string.
5. Replace the username, password, and database name in the connection string. URL-encode special characters in the database password.

## 3. Add environment variables

1. Copy `.env.example`.
2. Rename the copy to `.env.local` in the project root (the same folder as `package.json`).
3. Set `MONGODB_URI` to your real Atlas connection string.
4. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to the admin login you want.
5. Set `ADMIN_SESSION_SECRET` to a long random secret. Do not share `.env.local` or upload it to GitHub.

The old demo admin credentials are no longer hard-coded. Use the values you put in `.env.local`.

## 4. Install packages and start

Open the VS Code terminal in the project folder and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 5. Test the connection

Open http://localhost:3000/api/db-test. A successful connection returns a JSON message saying MongoDB connected successfully.

## 6. Test the site

1. Open **Create an account** from the customer login page. Register with an email and password of at least six characters.
2. Add products to your cart while logged in. Your cart is saved to your MongoDB customer record.
3. Place a test order. Open **My Orders** to see orders loaded from MongoDB.
4. Open **Login as Admin** and use `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`.
5. Add, edit, or remove products. Changes are saved to MongoDB.
6. Log out and log back in to check that the data is still present.

## Notes

- The first request to `/api/products` seeds MongoDB with the product list already included in `redux/features/product/productSlice.ts`, but only when the products collection is empty.
- Existing localStorage data from the old version is not automatically copied into MongoDB. The new database starts with the default products; customers need to register and place orders again unless you separately migrate old browser data.
- A cart is saved to a customer's database record when that customer is logged in. Guest cart items are not stored in MongoDB.
- Never put the MongoDB connection string or admin secrets in frontend code. The `.env.local` file is ignored by Git.
