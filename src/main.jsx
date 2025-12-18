import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Cart from './Cart.jsx'
import Maincontext from './Maincontext.jsx'
import Privacy from './Common/Privacy.jsx'
import Terms_Condition from './Common/Terms_Condition.jsx'
import Contact from './Common/Contact.jsx'

createRoot(document.getElementById('root')).render(

  <Maincontext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/privacy_poliy" element={<Privacy/>}/>
        <Route path="/termsandcondition" element={<Terms_Condition/>}/>
        <Route path='/contact-us' element={<Contact/>}/>
      </Routes>
    </BrowserRouter>
  </Maincontext>
)
