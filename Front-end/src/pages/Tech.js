import { useQuery , gql} from "@apollo/client";
import '../components/ProductList/ProductList'

const GET_DATA = gql`
  query {
    categories {
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

const Tech = ({currencyChoosen}) => {

  const {loading, data, error} = useQuery(GET_DATA)


  return (
    <section>
      <h2 className="title">Tech</h2>
      <div className="product-list">
        {loading && <p>loading...</p>}
        {error && <p>error</p>}
        {data &&
          data.categories.map((items) => {
            return  items.products.filter(it => (it.category === 'tech')).map((item, index) => (
              <div
                key={index}
                className="product-cart"
                style={{ width: "386px", height: "444px", padding: "16px" }}
              >
                <div
                  style={{
                    width: "356px",
                    height: "338px",
                    position: "relative",
                  }}
                >
                  <img className="product-image" src={item.gallery[0]} alt="" />
                  {!item.inStock && (
                    <div className="out-of-stock">
                      <span>out of stock</span>
                    </div>
                  )}
                </div>
                {item.inStock ? (
                  <h2 className="item-name-out">{item.name}</h2>
                ) : (
                  <h2 className="item-name">{item.name}</h2>
                )}
                {item.prices
                  .filter((ite) => ite.currency.symbol === currencyChoosen)
                  .map((it, index) => (
                    <p key={index}>
                      <span>{it.currency.symbol}</span> {it.amount}
                    </p>
                  ))}
              </div>
            ));
          })}
      </div>
    </section>
  );
};

export default Tech;
