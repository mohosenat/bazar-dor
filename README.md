# 🛒 বাজার দর | BazarDor

BazarDor is a Bangla-based market price tracking web application that helps users explore essential product prices in Bangladesh. Users can browse products, compare prices, view price changes, filter products by category, and manage their profiles.

---

## 🔗 Live Project

- **Live Website:** https://bazar-dor-hazel-ten.vercel.app
- **GitHub Repository:** https://github.com/mohosenat/bazar-dor

---

## 🚀 Key Features

### 1. Navigation & Market Price Ticker
- বাজার দর branding with logo and Bangla date.
- Category navigation with active-link highlighting.
- Sign-in and sign-up actions for guests.
- Profile and sign-out actions for authenticated users.
- Infinite scrolling ticker displaying product prices, units, and percentage changes.

### 2. Interactive Home Page
- Hero section with heading, description, banner image, and call-to-action.
- Dedicated sections for products with rising and falling prices.
- Top six price risers and top six price fallers.
- Complete product catalog displayed in a responsive grid.
- Product cards linking to individual detail pages.

### 3. Product Information & Price Comparison
- Product name, illustration, category, and unit.
- Today's price displayed using Bengali numerals.
- Price-change indicators for rising, falling, and unchanged prices.
- Minimum, maximum, and average price summaries.
- Market-based price information where available.

### 4. Category & Sorting
- Browse products by category.
- Sort by default order, lowest price, or highest price.
- Numeric sorting that correctly handles Bengali numerals.
- Loading skeletons while data is being fetched.
- Friendly empty states and invalid-category handling.

### 5. Authentication & User Profile
- Email/password registration and sign-in with Better Auth.
- Google and GitHub authentication when configured.
- Session-aware navigation.
- Protected product detail pages.
- Profile information and name-update form.
- Sign-out functionality and relevant toast notifications.

### 6. Responsive & Accessible Experience
- Layouts adapted for mobile, tablet, and desktop.
- Responsive product grids and hero sections.
- Loading indicators and friendly error pages.
- Custom 404 page with a link back to the home page.
- Consistent interface styling and reusable components.

## 🛠️ Technologies Used

- **Next.js** — Application framework and App Router.
- **React** — Component-based user interface.
- **TypeScript** — Type-safe development.
- **Tailwind CSS** — Styling and responsive design.
- **Better Auth** — Authentication and session management.
- **React Hot Toast** — Toast notifications.
- **Lucide React** — Icons.
- **REST API** — Product and category data.

## 💻 Run BazarDor Locally

Follow these steps to install and run the project on your computer.

**Prerequisites:** Node.js, npm, and Git.

---

### 1. Clone the Repository

```bash
git clone https://github.com/mohosenat/bazar-dor.git
cd bazar-dor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root and add the environment variables required for authentication, database connectivity, and enabled OAuth providers.

Keep private keys, authentication secrets, and database credentials secure. Never commit sensitive environment files to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
```

After a successful build, start the production server:

```bash
npm start
```

## 👩‍💻 Author

**Mohosenat Jahan**

---

<p align="center">
  🛒 <strong>BazarDor</strong> — Essential market prices, all in one place.
</p>
