# KrishiYog – Agricultural E-Commerce Platform

KrishiYog is a full-stack agricultural e-commerce platform designed to connect **farmers directly with consumers** through a simple, reliable online marketplace.  
The goal is to reduce middlemen, improve transparency, and make fresh produce easier to buy and sell.

Built using **React**, **Django REST Framework**, and **PostgreSQL**, this project focuses on real-world e-commerce features, clean APIs, and a responsive user experience.

---

## Features

- **Product Browsing** – Explore fruits, vegetables, and grains by category  
- **Search & Filters** – Search products and filter by price range  
- **Shopping Cart** – Add, remove, and update product quantities  
- **User Authentication** – Secure JWT-based login and registration  
- **Order Management** – Place orders and view order history  
- **Multiple Payment Options** – Cash on Delivery and Online Payments  
- **Protected Routes** – Cart and checkout accessible only to logged-in users  
- **Responsive Design** – UI built with Tailwind CSS  

---

##  Tech Stack

### Frontend
- **React 19** – UI framework  
- **React Router DOM** – Client-side routing  
- **Axios** – API communication  
- **Tailwind CSS 4** – Utility-first styling  
- **Vite** – Development and build tool  
- **JWT Decode** – Token handling  

### Backend
- **Django 5.2** – Web framework  
- **Django REST Framework** – RESTful APIs  
- **PostgreSQL** – Relational database  
- **JWT Simple** – Authentication  
- **Django CORS Headers** – Cross-origin support  
- **Django Filters** – Advanced filtering  

---

##  Getting Started

### Prerequisites
Make sure you have the following installed:

- Node.js **18+**
- Python **3.10+**
- PostgreSQL **12+**
- Git

---

##  Backend Setup

1. Navigate to the backend directory  
2. Create and activate a virtual environment  
3. Install dependencies  
4. Configure environment variables  
5. Run database migrations  
6. Create a superuser  
7. (Optional) Load sample data  
8. Start the development server  

Backend runs at:  
    `http://127.0.0.1:8000`


---

## 🎨 Frontend Setup

1. Install dependencies  
2. Start the development server  
3. Build for production (optional)  

Frontend runs at:  
    `http://localhost:5173`


---

## 📂 Project Structure
```
KRISHIYOG/
│
├── backend/
│ ├── pycache/
│ ├── api/              # Django REST API apps
│ ├── server/           # Django project settings
│ ├── manage.py         # Django entry point
│ └── test_api.py       # Backend API testing
│
├── node_modules/       # Frontend dependencies
│
├── src/
│ ├── assets/           # Static assets (images, icons, etc.)
│ │
│ ├── components/
│ │ ├── cart/           # Cart & checkout components
│ │ │ ├── address.jsx
│ │ │ ├── billing.jsx
│ │ │ ├── cart.jsx
│ │ │ ├── checkoutbtn.jsx
│ │ │ ├── order.jsx
│ │ │ ├── payment.jsx
│ │ │ ├── table.jsx
│ │ │ └── tbody.jsx
│ │ │
│ │ ├── home/               # Homepage sections
│ │ │ ├── footer.jsx
│ │ │ ├── home.jsx
│ │ │ ├── img_banner.jsx
│ │ │ └── section.jsx
│ │ │
│ │ ├── Login-register/     # Authentication pages
│ │ │ ├── login.jsx
│ │ │ └── register.jsx
│ │ │
│ │ ├── nav/                # Navigation components
│ │ │ ├── logbtn.jsx
│ │ │ ├── nav.jsx
│ │ │ └── search.jsx
│ │ │
│ │ ├── shop/               # Product listing & shop views
│ │ └── protectedroute.jsx
│ │
│ ├── context/
│ │ └── auth.jsx            # Authentication context (JWT handling)
│ │
│ ├── services/
│ │ └── api.js              # Axios API configuration
│ │
│ ├── App.jsx               # Root React component
│ ├── App.css
│ ├── index.css
│ └── main.jsx              # React entry point
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
│
├── README.md               # Project documentation
└── requirements.txt
```
---

## 🧭 Usage Flow

1. Register or log in as a user  
2. Browse products by category  
3. Search or filter products  
4. Add items to cart  
5. Place an order using preferred payment method  
6. Track orders from the dashboard  

---

## 🔌 API Documentation

### 🔐 Authentication
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login user |
| GET | `/api/auth/user/` | Get current user *(Protected)* |
| POST | `/api/auth/token/refresh/` | Refresh access token |

---

### 📦 Products
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/products/` | List products (search & filter) |
| GET | `/api/products/<id>/` | Get product details |

**Query Parameters**
- `category` – fruit / vegetable / grain  
- `search` – product name or description  
- `min_price` / `max_price` – price range  
- `ordering` – sort field (default: `-created_at`)  

---

### 🛒 Cart *(Protected)*
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/cart/` | View cart |
| POST | `/api/cart/add/` | Add item |
| PUT | `/api/cart/update/` | Update quantity |
| DELETE | `/api/cart/remove/<id>/` | Remove item |

---

### 🧾 Orders *(Protected)*
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/checkout/` | Create order |
| GET | `/api/orders/` | Order history |
| GET | `/api/orders/<id>/` | Order details |

---

## 🤝 Contributing

Contributions are welcome and appreciated.

1. Fork the repository  
2. Create a new branch  
   ```bash
   git checkout -b feature/YourFeature
