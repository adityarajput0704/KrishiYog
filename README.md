<div align="center">

<img src="https://img.shields.io/badge/KrishiYog-Agricultural%20E--Commerce-green?style=for-the-badge&logo=leaf&logoColor=white" alt="KrishiYog"/>

# 🌾 KrishiYog

### A production-ready Agricultural E-Commerce Platform connecting farmers directly with consumers

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Django](https://img.shields.io/badge/Django-5.2-092E20?style=flat-square&logo=django&logoColor=white)](https://djangoproject.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Project Structure](#-project-structure) · [Getting Started](#-getting-started) · [API Reference](#-api-reference) · [Usage Flow](#-usage-flow) · [Contributing](#-contributing)

</div>

---

## 📖 Overview

**KrishiYog** is a full-stack agricultural e-commerce platform built to cut out the middlemen and connect farmers directly with buyers. Consumers get a transparent, fair marketplace. Farmers get a direct revenue channel with no intermediaries taking a cut.

Built on **React 19**, **Django REST Framework**, and **PostgreSQL**, the platform is designed for real-world use: clean REST APIs, JWT-secured authentication, a responsive Tailwind UI, and a full order management system with multiple payment options.

---

## ✨ Features

### Shopping
-  **Product Browsing** — Explore fruits, vegetables, and grains organized by category
-  **Search & Filters** — Find products by name, description, category, or price range
-  **Shopping Cart** — Add, remove, and update quantities with real-time feedback
-  **Multiple Payment Options** — Cash on Delivery and online payment both supported

### Platform
-  **JWT Authentication** — Secure login and registration with access token refresh
-  **Order Management** — Place orders and view full order history from a dashboard
-  **Protected Routes** — Cart and checkout are gated behind authentication
-  **Responsive Design** — Built with Tailwind CSS 4, works across all screen sizes

---

##  Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19 | UI framework and component system |
| **Routing** | React Router DOM | Client-side page navigation |
| **HTTP Client** | Axios | API communication with the backend |
| **Styling** | Tailwind CSS 4 | Utility-first responsive design |
| **Build Tool** | Vite | Fast dev server and production builds |
| **Auth (Client)** | JWT Decode | Token parsing and expiry handling |
| **Backend** | Django 5.2 | Web framework and business logic |
| **API Layer** | Django REST Framework | RESTful API with serializers and viewsets |
| **Database** | PostgreSQL | Primary relational data store |
| **Auth (Server)** | JWT Simple | Access and refresh token generation |
| **Cross-Origin** | Django CORS Headers | CORS support for frontend-backend communication |
| **Filtering** | Django Filters | Advanced query filtering on list endpoints |

---

## 🏗 Project Structure

```
KRISHIYOG/
│
├── backend/
│   ├── api/                    # Django REST API apps (models, views, serializers)
│   ├── server/                 # Django project settings and root URL config
│   ├── manage.py               # Django entry point
│   └── test_api.py             # Backend API tests
│
├── src/
│   ├── assets/                 # Static files — images, icons
│   │
│   ├── components/
│   │   ├── cart/               # Cart, checkout, billing, payment, order summary
│   │   │   ├── address.jsx
│   │   │   ├── billing.jsx
│   │   │   ├── cart.jsx
│   │   │   ├── checkoutbtn.jsx
│   │   │   ├── order.jsx
│   │   │   ├── payment.jsx
│   │   │   ├── table.jsx
│   │   │   └── tbody.jsx
│   │   │
│   │   ├── home/               # Homepage sections, banner, footer
│   │   │   ├── footer.jsx
│   │   │   ├── home.jsx
│   │   │   ├── img_banner.jsx
│   │   │   └── section.jsx
│   │   │
│   │   ├── Login-register/     # Auth pages
│   │   │   ├── login.jsx
│   │   │   └── register.jsx
│   │   │
│   │   ├── nav/                # Navbar, search bar, login button
│   │   │   ├── logbtn.jsx
│   │   │   ├── nav.jsx
│   │   │   └── search.jsx
│   │   │
│   │   ├── shop/               # Product listing and category views
│   │   └── protectedroute.jsx  # Route guard for authenticated pages
│   │
│   ├── context/
│   │   └── auth.jsx            # JWT auth context — single source of truth
│   │
│   ├── services/
│   │   └── api.js              # Axios instance with base URL and interceptors
│   │
│   ├── App.jsx                 # Root component and route definitions
│   └── main.jsx                # React entry point             
├── .env                        #  Never commit — gitignored
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
└── requirements.txt
```

---

##  Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 12+
- Git

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials and secret key

# 5. Run database migrations
python manage.py migrate

# 6. Create a superuser (for Django admin)
python manage.py createsuperuser

# 7. (Optional) Load sample product data
python manage.py loaddata fixtures/sample_data.json

# 8. Start the development server
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`

---

### Frontend Setup

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production (optional)
npm run build
```

Frontend runs at `http://localhost:5173`

---

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True

# Database (PostgreSQL)
DB_NAME=krishiyog
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432

# CORS — comma-separated frontend origins
ALLOWED_ORIGINS=http://localhost:5173
```

> ⚠️ **Never commit `.env` to Git.** It is listed in `.gitignore`.

---

## 📚 API Reference

Django REST Framework generates a browsable API automatically. Once the backend is running, visit `http://127.0.0.1:8000/api/` to explore endpoints interactively.

### Authentication

All protected routes require a valid JWT access token in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register/` | Register a new user |
| `POST` | `/api/auth/login/` | Log in and receive access + refresh tokens |
| `GET` | `/api/auth/user/` | Get current user profile *(protected)* |
| `POST` | `/api/auth/token/refresh/` | Refresh an expired access token |

---

### Products

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products/` | List all products (filterable, searchable) |
| `GET` | `/api/products/<id>/` | Get details for a single product |

**Query Parameters**

| Parameter | Values | Description |
|---|---|---|
| `category` | `fruit`, `vegetable`, `grain` | Filter by product category |
| `search` | string | Search by name or description |
| `min_price` | number | Minimum price filter |
| `max_price` | number | Maximum price filter |
| `ordering` | field name | Sort field (default: `-created_at`) |

Example:
```
GET /api/products/?category=vegetable&min_price=10&max_price=100&ordering=price
```

---

### Cart *(protected)*

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cart/` | View current cart |
| `POST` | `/api/cart/add/` | Add a product to cart |
| `PUT` | `/api/cart/update/` | Update item quantity |
| `DELETE` | `/api/cart/remove/<id>/` | Remove an item from cart |

---

### Orders *(protected)*

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/checkout/` | Place a new order |
| `GET` | `/api/orders/` | View full order history |
| `GET` | `/api/orders/<id>/` | View details of a specific order |

---

##  Usage Flow

1. **Register or log in** to get a JWT access token
2. **Browse products** by category or search by name and description
3. **Filter by price range** to narrow down results
4. **Add items to your cart** — cart is synced with your account
5. **Proceed to checkout** — enter your delivery address and billing details
6. **Choose a payment method** — Cash on Delivery or online payment
7. **Track your orders** from the order history dashboard

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes with clear, descriptive commits
4. Push to your fork and open a Pull Request

Please follow these conventions:
- Keep frontend components scoped to their directory — don't mix cart logic with nav components
- All new API endpoints should use DRF serializers for request and response validation
- Protected views must use the JWT authentication class — never skip auth checks
- Never hardcode credentials — always use environment variables

---

##  Security Notes

- All secrets are managed via environment variables — never committed to Git
- JWT access tokens are short-lived; the frontend handles silent refresh via `/api/auth/token/refresh/`
- Protected routes on the frontend redirect unauthenticated users to the login page
- CORS origins are restricted to known frontend URLs — not `*` in production

---

## 👤 Author

**Aditya Rajput**

Built as a full-stack engineering project — from REST API design to a responsive React frontend — with a focus on clean code, real-world e-commerce features, and a direct farmer-to-consumer mission.

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/YOUR_USERNAME)

---

<div align="center">

Made with ❤️ for farmers and fresh produce 🥦

**If this project helped you, please give it a ⭐**

</div>
