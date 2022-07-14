import "./Navbar.css";
import Logo from "../../images/logo.svg";
import Store from "../../images/store.svg";
import Navigation from "../Navigation/Navigation";
import Currency from "../Currency/Currency";

const Navbar = ({ setCurrencyChoosen, currencyChoosen, addProduct, openClose, setOpenClose }) => {
  return (
    <header className="header">
      <Navigation />
      <div className="img-wrapp">
        <img src={Logo} alt="logo" />
      </div>
      <div className="store-curr">
        <Currency
          currencyChoosen={currencyChoosen}
          setCurrencyChoosen={setCurrencyChoosen}
        />
        <div>
          <div onClick={ () => setOpenClose(!openClose)} className="store-img-wrapper">
            <img className="store-img" src={Store} alt="store" />
            <span className={addProduct.length > 0 ?'store-amount' : ''}>{addProduct.length === 0 ? '' : addProduct.length }</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
