import React from 'react'
import Home from './components/home/home.jsx'
import Shop from './components/shop/shop.jsx'
import Cart from './components/cart/cart.jsx'
import Billing from './components/cart/billing.jsx'
import Login from './components/Login-register/login.jsx'
import Register from './components/Login-register/register.jsx'
import Footer from './components/home/footer.jsx'
import Nav from './components/nav/nav.jsx'
import { Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import SingleProduct from './components/shop/single product/single_product.jsx'
import ProtectedRoute from './components/protectedroute.jsx'
import { AuthProvider } from './context/auth.jsx'

const App = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].includes(location.pathname);

  return (
    <AuthProvider>
      <div>
        <div className="min-h-screen flex flex-col">
          {!hideLayout && <Nav />}

          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/shop' element={<Shop />} />
              <Route path='/shop/:id' element={<SingleProduct />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              
              <Route 
                path='/cart' 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path='/billing' 
                element={
                  <ProtectedRoute>
                    <Billing />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
        
        <div>
          {!hideLayout && <Footer />}
        </div>
      </div>
    </AuthProvider>
  )
}

export default App