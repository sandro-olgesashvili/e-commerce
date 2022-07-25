import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CartProducts.css";


const Counter = ({
  removeProd,
  item,
  currencyChoosen,
  total,
  setDep,
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
    if (counter === 0) {
      removeProd(item.id);
    }
  }, [counter]);
  const increase = () => {
    setCounter((counter) => counter + 1);

    setDep((dep) => dep + 1);

    total.push(cartItem[0]);

    console.log("this is total", total);

    console.log("this is cart", cartItem);
  };

  const decrease = () => {
    setCounter((counter) => counter - 1);

    setDep((dep) => dep - 1);

    total.push(-cartItem[0]);
  };

  return (
    <div className="counter-container">
      <button onClick={() => increase()}>+</button>
      <span>{counter}</span>
      <button onClick={() => decrease()}>-</button>
    </div>
  );
};

const CartProducts = ({
  addProduct,
  height,
  currencyChoosen,
  counterd,
  setCounterd,
  removeProd,
  setOpenClose,
  handelSelect,
  handelSelectBox
}) => {
  const [total, setTotal] = useState([]);

  const [dep, setDep] = useState(1);

  useEffect(() => {
    addProduct.map((product) => {
      return product.prices
        .filter((price) => price.currency.symbol === currencyChoosen)
        .map((item) => {
          console.log("this is total", total);
          return setTotal((total) => [...total, item.amount]);
        });
    });
  }, []);

  useEffect(() => {
    if (addProduct.length === 0) return setTotal(0);
  }, [dep, removeProd]);


  return (
    <div
      style={{ height: height }}
      className="cart-container"
      onClick={(e) =>
        e.target.className === "cart-container"
          ? setOpenClose(false)
          : setOpenClose(true)
      }
    >
      <div className="cart-main">
        <h3 className="cart-prod-bag">
          My Bag, <span>{addProduct.length} items </span>
        </h3>
        {addProduct.map((item, index) => (
          <div key={index} className="cart-detail">
            <div className="cart-detail-cont">
              <div className="cart-prod-title">
                <span>{item.brand}</span>
                <span>{item.name} </span>
              </div>
              {item.prices
                .filter((price) => price.currency.symbol === currencyChoosen)
                .map((ite, index) => (
                  <div key={index}>
                    <h4 className="cart-prod-curr">
                      {ite.currency.symbol} <span>{ite.amount}</span>
                    </h4>
                  </div>
                ))}
              {item.attributes?.map((attribute, index) => (
                <div key={index}>
                  <h4 className="cart-prod-name">{attribute.name}:</h4>
                  <ul className="cart-prod-s">
                    {attribute.items.map((item, index) => (
                      <li
                        key={index}
                        className={
                          attribute.name === "Color"
                            ? "cart-prod-s-box"
                            : "cart-prod-s-box-btn"
                        }
                        onClick={(e) => attribute.name === 'Color'?  handelSelectBox(e) : handelSelect(e)}
                      >
                        <button className="btn-attribute" style={{ background: item.value }}>
                          {attribute.name === "Color" ? "" : item.displayValue}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
            />
            <div className="card-prod-image">
              <img src={item.gallery[0]} alt={item.name} />
            </div>
          </div>
        ))}
        <div className="cart-prod-total">
          <span>Total</span>
          <span>
            {total.length > 0
              ? total.reduce((acc, item) => acc + item).toFixed(2)
              : 0}
            {currencyChoosen}
          </span>
        </div>
        <div className="btn-container">
          <button className="black-btn">
            <Link to='/cart'>
              View Bag
            </Link>
            </button>
          <button className="green-btn">Check out</button>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
