import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "./SingleProduct.css";

const SINGLE_PROD = gql`
  query GetProd($id: String!) {
    product(id: $id) {
      id
      name
      gallery
      description
      category
      inStock
      brand
      attributes {
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;

const PordAttribute = ({ attribute }) => {
  const [bgChange, setBgChange] = useState("");

  return (
    <ul className="item-values">
      {attribute.items.map((item, index) => (
        <li
          key={index}
          className={attribute.name === "Color" ? "box-container" : ""}
        >
          <button
            onClick={(e) => setBgChange(item.value)}
            className={
              bgChange === item.value
                ? `item-value ${
                    attribute.name === "Color" ? "box" : "active-attr"
                  }`
                : "item-value"
            }
            style={{ background: item.value }}
          >
            {attribute.name === "Color" ? "" : item.displayValue}
          </button>
        </li>
      ))}
    </ul>
  );
};

const SingleProduct = ({
  currencyChoosen,
  addProduct,
  setCounterd,
  addProd,
  handelSelect,
  handelSelectBox,
}) => {
  const { id } = useParams();

  console.log(addProduct);

  useEffect(() => {
    setCounterd(addProduct.length);
  }, [addProduct]);

  const { data, loading, error } = useQuery(SINGLE_PROD, {
    variables: {
      id,
    },
  });

  const [selectedImg, setSelectedImg] = useState(null);

  const imgPusher = (x) => {
    setSelectedImg(x);
  };

  console.log(data);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;

  return (
    <section className="single-cotaniner">
      <div style={{ marginRight: "20px" }}>
        {data.product.gallery.map((item, index) => (
          <div
            onClick={() => imgPusher(item)}
            key={index}
            className="single-prod"
          >
            <img src={item} alt="shoes" />
          </div>
        ))}
      </div>
      <div className="prod-selec-image">
        {!selectedImg ? (
          <img src={data.product.gallery[0]} alt="prod" />
        ) : (
          <img src={selectedImg} alt="prod" />
        )}
      </div>
      <div>
        <h3 className="item-brand">{data.product.brand}</h3>
        <span className="item-name-prod">{data.product.name}</span>
        <div>
          {data?.product.attributes.map((attribute, index) => (
            <div key={index}>
              <span className="item-size">{attribute.name}:</span>
              <PordAttribute attribute={attribute} key={index} />
            </div>
          ))}
          <div className="item-price">
            <h3>price:</h3>
            {data.product.prices
              .filter((item) => item.currency.symbol === currencyChoosen)
              .map((item, index) => (
                <span key={index}>
                  {item.currency.symbol} {item.amount}
                </span>
              ))}
          </div>

          {data.product.inStock && (
            <button
              className="add-btn"
              onClick={() => {
                addProd(data.product);
              }}
            >
              add to cart
            </button>
          )}
          {!data.product.inStock && (
            <button disabled className="disabled-btn">
              Out OF stock
            </button>
          )}
          <div className="description-text">
            {parse(data.product.description)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
