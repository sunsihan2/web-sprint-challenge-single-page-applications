import React,{useState} from "react";
import {Link, Route, Switch} from 'react-router-dom'
import Form from "./component/Form"
import data from "./data"

const App = () => {

  const [products, setProducts] = useState(data)

  return (

    <div className="App">
      <nav>
        <h1 className="store-header">Lambda Eats</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to= "/help">Help</Link>
        </div>
      </nav>

      <div className="home-wrapper">
        <img
          className="home-image"
          src="https://techcrunch.com/wp-content/uploads/2019/05/Uber-Eats-Pass.png"
          alt=""
        />
          <Link to="/pizza">Pizza?</Link>

      <div/>

      <div className="items-list-wrapper">
        {products.map((item) => (
          <Link to={`/${item.id}`}>
            <div className="item-card" key={item.id}>
              <img
                 className="item-list-image"
                 src={item.imageUrl}
                 alt={item.name}
              />
               <p>{item.name}</p>
               <p>${item.foodType}</p>
               <p> {item.timeToDelivery}</p>
               <p> {item.deliveryFee}</p>
            </div>
          </Link>
        ))}
      </div>

      <Switch>
        <Route path="/pizza" component={Form}/>
        <Route path="/" component={App}/>
      </Switch>
      
      
    </div>
  </div>
  );
}
export default App;
