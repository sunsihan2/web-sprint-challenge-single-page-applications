import React, { useState } from "react";
import {Link, Route, Switch} from 'react-router-dom'
import data from "./data"
import Form from "./component/Form"

const App = () => {
  const[products, setProducts] = useState(data)
  console.log(products);
  return (
    <>
    <div className="header">
      <nav>
        <h1 className="store-header">Lambda Eats</h1>
        <div className = "nav-Links">
          <Link to="/">Home</Link>
          <Link to="/help">Help</Link>
        </div>
      </nav>
    </div>

    <div className="home-wrapper">
      <img
          className="home-image"
          src="https://techcrunch.com/wp-content/uploads/2019/05/Uber-Eats-Pass.png"
          alt=""
      />
      <h2 id="homepageimgp"> Your favorite food, delivered while coding </h2>
      <Link className="md-button shop-button" to="/pizza">Pizza?</Link>
    </div>

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
      <Route path="/pizza" component={Form} />
    </Switch>
   
    </>
  );
};
export default App;

