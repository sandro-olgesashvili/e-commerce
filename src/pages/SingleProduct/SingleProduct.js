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

const SingleProduct = ({ currencyChoosen, addProduct, setCounterd,addProd, handelSelect,  handelSelectBox}) => {
  const { id } = useParams();


  console.log(addProduct);

  useEffect(() => {
    setCounterd(addProduct.length)
  }, [addProduct])




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
      <div style={{marginRight:'20px'}}>
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
          {data?.product.attributes.map((attributes, index) => (
            <div key={index}>
              <span className="item-size">{attributes.name}:</span>
              <ul className="item-values">
                {attributes.items.map((item, index) => (
                  <li
                    key={index}
                    className={
                      attributes.name === "Color" ? "box-container" : ""
                    }
                    onClick={attributes.name === "Color" ? (e) => handelSelectBox(e) : (e) => handelSelect(e)}
                  >
                    <button
                      style={{ backgroundColor: `${item.value}` }}
                      type="button"
                      className={
                        attributes.name === "Color" ? "box" : `item-value`
                      }
                    >
                      {attributes.name === "Color" ? " " : item.displayValue}
                    </button>
                  </li>
                ))}
              </ul>
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
              onClick={() => {addProd(data.product)
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
