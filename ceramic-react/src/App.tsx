import { Navigate, Route, Routes } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import Intro from './components/home/Intro';
import ProductList from './components/product/ProductList';
import PopCate from './components/product/PopCate';
import CartPage from './components/cart/CartPage';
import './App.scss'
import './index.scss'
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<BaseLayout />}>
        <Route index element={<Intro />} />
        <Route path="products" element={<ProductList />}>
          <Route path=":id" element={<PopCate />} />
        </Route>
      </Route>
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
