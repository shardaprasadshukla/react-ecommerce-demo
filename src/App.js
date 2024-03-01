import './App.css';
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartDashboard from './page/Dashboard';
import Login from './page/Login';
import Registration from './page/Registration';
import ProductDetails from './page/ProductDetails';
import Header from './component/Header';
import CartList from './component/CartList';
import ChangePassword from './page/ChangePassword';
import EditProfile from './page/EditProfile';
import CheckOutPage from './page/CheckOutPage';


function App() {
  
  return (
    <div className="App">
     
      <Provider store={store}>
      
       <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<CartDashboard />} />
      
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartList />}/>
          <Route path="/change-password" element={<ChangePassword />}/>
          <Route path="/edit-profile" element={<EditProfile />}/>
          <Route path="/checkout" element={<CheckOutPage />}/>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </Provider>
       
          
    </div>
  );
}

export default App;
