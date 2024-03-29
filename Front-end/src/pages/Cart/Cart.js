import { useEffect, useState } from "react";
import ArrowLeft from "../../images/arrowLeft.svg";
import ArrowRight from "../../images/arrowRight.svg";

import "./Cart.css";

const ButtonImg = ({ item }) => {
  const [arrowCount, setArrowCount] = useState(0);

  const imgIncr = (item) => {
    setArrowCount((arrow) => arrow + 1);

    if (arrowCount === item.gallery.length - 1) {
      setArrowCount(0);
    }
  };

  const imgDecr = (item) => {
    setArrowCount((arrow) => arrow - 1);

    if (arrowCount === 0) {
      setArrowCount(item.gallery.length - 1);
    }
  };

  return (
    <div>
      <img src={item.gallery[arrowCount]} alt={item.name} />
      {item.gallery.length > 1 && (
        <div className="arrows-cont">
          <button
            className="arrow-btn"
            onClick={() => {
              imgIncr(item);
            }}
          >
            <img src={ArrowLeft} alt="arrowleft" />
          </button>
          <button
            className="arrow-btn"
            onClick={() => {
              imgDecr(item);
            }}
          >
            <img src={ArrowRight} alt="arrowright" />
          </button>
        </div>
      )}
    </div>
  );
};

const Counter = ({
  removeProd,
  item,
  currencyChoosen,
  total,
  setDep,
  setQuantity,
}) => {
  const [counter, setCounter] = useState(1);

  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    item.prices
      .filter((price) => price.currency.symbol === currencyChoosen)
      .map((item) => {
        setCartItem((total) => [...total, item.amount]);
      });
  }, []);

  useEffect(() => {
    if (counter === 0 || counter < 0) {
      removeProd(item.id);
    }
  }, [counter]);
  const increase = () => {
    setCounter((counter) => counter + 1);
    setQuantity((qua) => qua + 1);

    setDep((dep) => dep + 1);

    total.push(cartItem[0]);

  };

  const decrease = () => {
    setCounter((counter) => counter - 1);

    if(counter == 1) {
      setQuantity(qua => qua - 0)
    } else {

      setQuantity((qua) => qua - 1);
    }

    setDep((dep) => dep - 1);

    total.push(-cartItem[0]);
  };

  return (
    <div className="cart-page-counter">
      <button onClick={() => increase()}>+</button>
      <span>{counter}</span>
      <button onClick={() => decrease()}>-</button>
    </div>
  );
};

const List = ({ attribute }) => {

  const [bgChange, setBgChange] = useState('');

  return (
    <ul className="cart-page-size-list">
      {attribute.items.map((item, index) => (
        <li
          key={index}
          className={
            attribute.name === "Color"
              ? "cart-page-s-box"
              : "cart-prod-s-box-btn"
          }
        >
          <button
            onClick={(e) => setBgChange(item.value)}
            className = {bgChange === item.value ? `btn-attribute ${attribute.name === "Color" ? "box-active" : "active-attr"}` : "btn-attribute "}
            style={{ background: item.value }}
          >
            {attribute.name === "Color" ? "" : item.displayValue}
          </button>
        </li>
      ))}
    </ul>
  );
};

const Cart = ({
  setOpenClose,
  addProduct,
  height,
  currencyChoosen,
  counterd,
  setCounterd,
  removeProd,
}) => {
  useEffect(() => {
    setOpenClose(false);
  }, []);

  const [total, setTotal] = useState([]);

  const [dep, setDep] = useState(1);

  const [quantity, setQuantity] = useState(0);


  useEffect(() => {
    addProduct.map((product) => {
      return product.prices
        .filter((price) => price.currency.symbol === currencyChoosen)
        .map((item) => {
          return setTotal((total) => [...total, item.amount]);
        });
    });
  }, []);

  useEffect(() => {
    if (addProduct.length === 0) return setTotal(0);
  }, [dep]);

  return (
    <section className="cart-page-container">
      <h3>CART</h3>
      {addProduct.map((item, index) => (
        <div key={index} className="cart-page-detail">
          <div className="cart-page-cont">
            <div className="cart-page-title">
              <span>{item.brand}</span>
              <span>{item.name} </span>
            </div>
            {item.prices
              .filter((price) => price.currency.symbol === currencyChoosen)
              .map((ite, index) => (
                <div key={index}>
                  <h4 className="cart-page-price">
                    {ite.currency.symbol} <span>{ite.amount}</span>
                  </h4>
                </div>
              ))}
            {item.attributes?.map((attribute, index) => (
              <div key={index}>
                <h4 className="cart-page-size-title">{attribute.name}:</h4>
                <List item={item} attribute={attribute} key={index} />
              </div>
            ))}
          </div>
          <div className="card-page-container">
            <Counter
              counterd={counterd}
              setCounterd={setCounterd}
              addProduct={addProduct}
              item={item}
              removeProd={removeProd}
              setTotal={setTotal}
              currencyChoosen={currencyChoosen}
              total={total}
              dep={dep}
              setDep={setDep}
              setQuantity={setQuantity}
            />
            <div className="card-page-image">
              <ButtonImg item={item} />
            </div>
          </div>
        </div>
      ))}
      <div className="cartt-prod-total">
        <div>
          <span>Tax 21%:</span>
          {total.length > 0
            ? ((total.reduce((acc, item) => acc + item) * 21) / 100).toFixed(2)
            : 0}
          {currencyChoosen}
        </div>
        <div>
          <span>Quantity:</span>
          {addProduct.length === 0
            ? addProduct.length
            : addProduct.length + quantity}
        </div>
        <div className="total">
          <span>Total</span>
          {total.length > 0
            ? total.reduce((acc, item) => acc + item).toFixed(2)
            : 0}
          {currencyChoosen}
        </div>
      </div>
      <button className="order-btn">Order</button>
    </section>
  );
};

export default Cart;
