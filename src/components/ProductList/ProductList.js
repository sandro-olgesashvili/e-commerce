import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import storeWhite from "../../images/store-white.svg";
import "./ProductList.css";

const GET_DATA = gql`
  query {
    categories {
      products {
        id
        name
        inStock
        gallery
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
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

const ProductList = ({
  currencyChoosen,
  addProduct,
  setAddProduct,
  addProd,
}) => {
  const { data, loading, error } = useQuery(GET_DATA);

  return (
    <section>
      <h2 className="title">clothes & tech</h2>
      <div className="product-list">
        {loading && <p>loading...</p>}
        {error && <p>error</p>}
        {data &&
          data.categories.map((items) => {
            return items.products.map((item, index) => (
              <div
                key={index}
                className="product-cart"
                style={{
                  width: "386px",
                  height: "444px",
                  padding: "16px",
                  marginBottom: "94px",
                }}
              >
                {item.inStock && (
                  <div
                    className="add-prod-icon"
                    onClick={() => {
                      addProd(item);
                      console.log(item);
                    }}
                  >
                    <img src={storeWhite} alt="store-white" />
                  </div>
                )}
                <Link to={`/${item.id}`}>
                  <div
                    style={{
                      width: "356px",
                      height: "338px",
                      position: "relative",
                    }}
                  >
                    <img
                      className="product-image"
                      src={item.gallery[0]}
                      alt=""
                    />
                    {!item.inStock && (
                      <div className="out-of-stock">
                        <span>out of stock</span>
                      </div>
                    )}
                  </div>
                  {item.inStock ? (
                    <h2 className="item-name">{item.name}</h2>
                  ) : (
                    <h2 className="item-name-out">{item.name}</h2>
                  )}
                  {item.prices
                    .filter(
                      (price) => price.currency.symbol === currencyChoosen
                    )
                    .map((it, index) => (
                      <p key={index}>
                        <span>{it.currency.symbol}</span> {it.amount}
                      </p>
                    ))}
                </Link>
              </div>
            ));
          })}
      </div>
    </section>
  );
};

export default ProductList;
