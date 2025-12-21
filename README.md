# Makeup Products Table

A React application for browsing and filtering cosmetic products built as a test assignment.
The project focuses on clean component architecture, client-side data handling, and Ant Design integration.

## Live Demo 🔗

👉 Deployed application:
https://makeup-products-table.vercel.app/

## Features ✨

📦 Fetch products from public API  
📊 Display products in a table  
🔍 Filter products by brand (multiple selection)  
🏷️ Filter products by tags (multiple selection)  
🧩 Group products by brand, category, or product type  
➕ Expandable rows to display product colors  
⏳ Loading and error states  
🧼 Clean, structured component architecture  
📱 Responsive and stable layout

## Tech Stack 🛠️

- React (Hooks, Functional Components)

- TypeScript

- Vite

- Ant Design (Table, Select, Collapse, etc.)

- Makeup API

## Data Flow 🔄

Data is fetched once from the API on page load

Products are stored in local state

Filtering and grouping are performed on the client side

All data is passed between components via props

No global state or external state managers are used

## About Tag Filtering 🏷️

The Makeup API documentation provides a list of possible product tags (e.g. Vegan, Natural, Cruelty Free).
However, in practice, the API does not consistently return tag values in the product data.

To handle this correctly:

The list of tags is defined statically based on the API documentation

Tag filtering is applied only if tag data exists for a product

If no products match selected tags, an empty state is shown

This approach ensures:

compliance with the API specification

stable UI behavior

transparent handling of backend limitations

## UI / UX Decisions 📐

Page width is fixed at the layout level to prevent layout jumps

Expandable rows follow Ant Design standard behavior (icon on the left)

Tooltips are used to explain expandable content

Table layout does not affect page width when grouping is enabled

## Getting Started 🚀

#### Install dependencies

npm install

#### Run development server

npm run dev

####

The application will be available at:
http://localhost:5173

## Notes 📌

This project focuses on frontend logic and UI

The API is public and may have incomplete data

All edge cases related to missing data are handled gracefully

## Evaluation Criteria Coverage ✅

✔️ Functionality — all required features are implemented

✔️ Interface — user-friendly and consistent UI

✔️ Error handling — loading and error states included

✔️ Code quality — clean, readable, and well-structured

✔️ Component-based architecture

✔️ Props-based data flow

🧑‍💻 Author
Yana Rudometova — Frontend Developer (Trainee / Junior)
GitHub: https://github.com/RudometovaYa?tab=repositories
LinkedIn: https://www.linkedin.com/in/yana-rudometova/
