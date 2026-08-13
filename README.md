# Field&Ware — E-commerce Frontend

A responsive e-commerce storefront built with React, TypeScript, Vite, and Tailwind CSS, powered by the [Fake Store API](https://fakestoreapi.com/).

## Features

- Product listing with responsive grid (mobile / tablet / desktop)
- Product details page via dynamic routing (`/product/:id`)
- Search by title (query synced to the URL)
- Category filtering (pulled live from the API)
- Sorting: price low→high, high→low, alphabetical
- Shopping cart: add / remove / update quantity, persisted to Local Storage
- Cart totals: item count and total price
- Wishlist (heart icon), persisted to Local Storage
- Login page using the Fake Store mock `/auth/login` endpoint (UI flow only — prefilled with a valid demo account: `mor_2314` / `83r5^_`)
- Loading skeletons and error states with retry, on every data-fetching page
- Clean, typed folder structure with reusable components

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build to /dist
npm run preview    # preview the production build
```

## Project structure

```
src/
  api/            # Fake Store API calls (fetch wrappers)
  components/     # Reusable UI: Navbar, ProductCard, FilterBar, etc.
  context/        # CartContext, WishlistContext, AuthContext
  hooks/          # useAsync — generic loading/error/data hook
  pages/          # Home, ProductDetails, Cart, Wishlist, Login, NotFound
  types/          # Shared TypeScript types
```

## Notes

- Cart and wishlist state persist across reloads via Local Storage.
- The login flow calls the real Fake Store `/auth/login` endpoint but only stores a username locally afterward — there's no real session/backend, per the assignment's "UI flow only" requirement.
