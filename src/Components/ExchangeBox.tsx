import { useEffect, useState } from "react";
import { Currency, ExchangeState, graphDate,Messages } from "../Domains";
import Error from "./Error"
import Graph from "./Graph";


function ExchangeBox(props: ExchangeState) {
   
    const [error, seterror] = useState(false);
    const [output, setoutput] = useState(1);
    const [convertedRate, setconvertedRate] = useState(0);
    const [currencies, setcorrencies] = useState<Currency[]>([]);
    const [display, setdisplay] = useState(false);
    const [startDate, setStartDate] = useState<string>("hiii");
    const [endDate, setEndDate] = useState<string>("bye");
    const [graphDatas, setgraphDatas] = useState<graphDate[]>([]);
    const [messages, setmessages] = useState<string>();
    const [user, setUser] = useState({ amount: "", from: "", to: "" });
    const [rates, setrates] = useState<string>();
    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setUser({ ...user, [event.target.name]: event.target.value });
        setdisplay(false);
    }
    function handleSubmit(e: any) {
        e.preventDefault();
    }
 
 
    useEffect(() => {
        
        var myHeaders = new Headers();
        myHeaders.append("apikey", props.apiKey);
        console.log("apii "+ props.baseUrl + "/exchangerates_data/timeseries?start_date=" +startDate+ "&end_date=" +endDate+ "&symbols="+user.to +"&base="+user.from,);

        fetch(
            props.baseUrl + "/exchangerates_data/timeseries?start_date=" +startDate+ "&end_date=" +endDate,
          //  https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-03-11&end_date=2022-04-11&symbols=EUR&base=USD
          //https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-03-11&end_date=2022-04-11&symbols=EUR&base=USD"
            {
                method: "GET",
                redirect: "follow",
                headers: myHeaders,
            }
        )
        
        .then((response) => response.json())
        .then((result) => {
            const rates_rsp =  result.base ;
            setrates(rates_rsp) 
          
        })
                        .catch((error: any) => {
                            console.log("error23", error);
                            //Need error handeling (HTTP status codes).
                        });

    }, [endDate]); 
 


    useEffect( () => {
        var endDates =  new Date();
        var startDates = new Date();
    
        formatStartDate(startDates.setDate(startDates.getDate() - 30))
        formatEndDate(endDates)  
       // console.log("final dates01 "+startDate) 


    function formatEndDate(date: string | number | Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
    // console.log( "dashdate end"+ [year, month, day].join('-'))
       setEndDate( ([year, month, day].join('-')))
       console.log("endDate27 "+endDate)
    }
    function formatStartDate(date: string | number | Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
           
      // console.log( "dashdate start"+ ([year, month, day].join('-')))
     //  const dateconverted = [year, month, day].join('-');
       setStartDate(([year, month, day].join('-')))
       console.log("startDate26 "+ startDate)
        

    }
     
},[endDate])


    function handleclick() {
        var myHeaders = new Headers();
        myHeaders.append("apikey", props.apiKey);
 
          fetch(
                props.baseUrl + "/exchangerates_data/convert?to=" + user.to + "&from=" + user.from + "&amount=" + user.amount,
                {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                }
            )
            .then((response) => {
               
              if (response.status >= 200 && response.status <= 299) {
                seterror(false)
                return response.json();
              }

              else{
                return response.json()
                .then((result) => {
                   const api_error= result.error.message;
                    setmessages(api_error);
                  })
                }
           
              // else {
            //     throw Error();
            //   }
            })
            .then((rsp) => {
                setconvertedRate(rsp.result);
                setdisplay(true);
            }).catch((error) => {
            
              seterror(true)
            });
    }
    useEffect(() => {
       

        var myHeaders = new Headers();
        myHeaders.append("apikey", props.apiKey);
        fetch(props.baseUrl + "/exchangerates_data/symbols", {
            method: "GET",
            redirect: "follow",
            headers: myHeaders,
        })
            .then((response) => {
             
                if (response.status >= 200 && response.status <= 299) {
                    seterror(false)
                  return response.json();
                } 
              })
              .then((result) => {
                const allCurencies: Currency[] = Object.entries(
                    result.symbols
                ).map(([key, value]) => ({
                    code: key,
                    country: value as string,
                }));
                setcorrencies(allCurencies);
              }).catch((error) => {
              
                seterror(true)
              });
            

    }, []);
 








    return (
        <div className="container">
        <div className="row bx-frst">
           <div className="col-6">
           <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <label>amount:</label>
                        <input
                            type="text"
                            className="form-control form-select-lg   mb-3"
                            placeholder="amount"
                            value={user.amount}
                            name="amount"
                            onChange={handleChange}
                        />
                    </div>
                    <label>from:</label>
                    <select
                        className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        name="from"
                        onChange={handleChange}
                    >
                        <option>Select currency</option>
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code + "-" + currency.country}
                            </option>
                        ))}
                    </select>

                    <label>to:</label>
                    <select
                        className="form-select form-select-lg mb-3"
                        aria-label=".form-select-lg example"
                        name="to"
                        onChange={handleChange}
                    >
                        <option>Select currency</option>
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code + "-" + currency.country}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleclick} className="btn btn-primary btn-lg">
                        Convert
                    </button>
                    {!error ? 
                    display === true &&   (
                        <div className="eqaltxt">
                            {" "}
                            <p>
                                {" "}
                                Equal : {convertedRate} {user.to}{" "}
                            </p>
                        </div>
                    ) : <div className="eqaltxt"> {messages} </div>
                    
                    } 
                   <div className=" "> rates : {rates} </div>
                </div>
                <div>
             
                         { 
                            <p>
                               
                            </p>
                        }
                 
                </div>
            </form>
           </div>
           <div className="col-6">
            <Graph />
            </div>
        </div>
    </div>


    );
}
export default ExchangeBox;


