import "./App.css";

import { gql, useQuery } from "@apollo/client";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import { useState } from "react";
import Cloth from "./pages/Cloth";
import Tech from "./pages/Tech";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import CartProducts from "./components/CartProducts/CartProducts";
import Cart from './pages/Cart/Cart'


const GET_DATA = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

function App() {
  const height = document.body.scrollHeight;

  const [openClose, setOpenClose] = useState(false);

  const { loading, data, error } = useQuery(GET_DATA);
  const [currencyChoosen, setCurrencyChoosen] = useState("$");
  const [addProduct, setAddProduct] = useState([]);
  const [counterd, setCounterd] = useState(0);


  const removeProd = (x) => {
    setAddProduct(addProduct.filter(item => item.id !== x))
  }



  const addProd = (x) => {
    addProduct.push(x)

    setAddProduct([...addProduct])
  }

  
  
  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>error</h1>;

  return (
    <div className="container">
      <Navbar
        currencyChoosen={currencyChoosen}
        setCurrencyChoosen={setCurrencyChoosen}
        addProduct={addProduct}
        openClose={openClose}
        setOpenClose={setOpenClose}
      />
      {openClose && (
        <CartProducts
          setOpenClose= {setOpenClose}
          addProduct={addProduct}
          height={height}
          currencyChoosen={currencyChoosen}
          counterd={counterd}
          setCounterd={setCounterd}
          removeProd={removeProd}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<ProductList currencyChoosen={currencyChoosen} addProduct={addProduct} setAddProduct={setAddProduct} addProd={addProd} />}
        />
        <Route
          path="/clothes"
          element={<Cloth currencyChoosen={currencyChoosen} />}
        />
        <Route
          path="/tech"
          element={<Tech currencyChoosen={currencyChoosen} />}
        />
        <Route
          path="/:id"
          element={
            <SingleProduct
              addProduct={addProduct}
              setAddProduct={setAddProduct}
              currencyChoosen={currencyChoosen}
              setCounterd={setCounterd}
              addProd={addProd}
            />
          }
        />
        <Route path="/cart" element={<Cart 
          setOpenClose={setOpenClose}
          addProduct={addProduct}
          height={height}
          currencyChoosen={currencyChoosen}
          counterd={counterd}
          setCounterd={setCounterd}
          removeProd={removeProd}/>} />
      </Routes>
    </div>
  );
}
export default App;
