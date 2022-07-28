import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import './Currency.css'
import ArrowDown from '../../images/arrowDown.svg'
import arrowUp from '../../images/arrowUp.svg'

const GET_CURRENCY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const Currency = ({currencyChoosen, setCurrencyChoosen}) => {
    
    const { loading, data, error } = useQuery(GET_CURRENCY);
    
    // const [currency, setCurrency] = useState('$');

    const [open, setOpen ] =useState(false)

    const setCurrencyUI = (x) => {
        setCurrencyChoosen(x)
    }
    

    return(
        <div className="currency-change">
            {loading && <p>loading</p>}
            {error && <p>error</p>}
            {data && (
                <div style={{display:'flex'}}>
                    <span className="curr-symbol" >{currencyChoosen} </span>
                    {open  && <img style={{cursor:'pointer'}} src={ArrowDown} alt="arrow-down" onClick={() => setOpen(!open)} />}
                    {!open && <img style={{cursor:'pointer'}} src={arrowUp} alt='arrowup' onClick={() => setOpen(!open)} />}
                </div>
                )}
            {data && open && <ul className="currency-items">
                {data.currencies.map(item => (
                    <li className="currency-item" onClick={() => {setCurrencyUI(item.symbol)
                        setOpen(false)
                    }}>
                        <span>{item.symbol}</span>
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>}
        </div>

    )
};

export default Currency;
