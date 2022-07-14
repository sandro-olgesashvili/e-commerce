import './CartProducts.css'


const CartProducts = ({addProduct, height, currencyChoosen}) => {
    
  return (
      <div style={{height:height}} className="cart-container">
        <div className="cart-main">
          <h3 className='cart-prod-bag'>My Bag, <span>{addProduct.length} items </span></h3>
            {addProduct.map((item, index) => (
              <div key={index} className="cart-detail">
                <div>
                  <div className='cart-prod-title'>
                    <span >{item.brand}</span>
                    <span >{item.name} </span>
                  </div>
                  {item.prices.filter(price => price.currency.symbol === currencyChoosen).map((it, index) => (
                    <div key={index}>
                      <h4 className='cart-prod-curr'>{it.currency.symbol} <span>{it.amount}</span></h4>
                    </div>
                  ))}
                  {item.attributes.map((attribute, index) => (
                    <div key={index}>
                      <h4 className='cart-prod-name'>{attribute.name}:</h4>
                      <div className='cart-prod-s'>
                        {attribute.items.map((item, index) => (
                          <div key={index} className={attribute.name === 'Color'?  'cart-prod-s-box' : 'cart-prod-s-box-btn'}>
                            <button style={{background:item.value}}>{attribute.name === 'Color'? '' : item.displayValue}</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div></div>
                <div className='card-prod-image'>
                    <img src={item.gallery[0]} alt={item.name} />
                </div>
              </div>
            ))}
        </div>
      </div>
  );
};

export default CartProducts;
