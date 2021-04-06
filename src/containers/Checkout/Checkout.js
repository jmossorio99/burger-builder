import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

export default class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  componentDidMount() {
    const searchQuery = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of searchQuery) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients });
    this.setState({ price: price });
  }

  cancelledHandler = () => {
    this.props.history.goBack();
  };

  continuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let checkout = <p>Loading</p>;
    if (this.state.ingredients) {
      checkout = (
        <div>
          <CheckoutSummary
            ingredients={this.state.ingredients}
            cancelled={this.cancelledHandler}
            continued={this.continuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            render={() => (
              <ContactData
                ingredients={this.state.ingredients}
                price={this.state.price}
              />
            )}
          />
        </div>
      );
    }

    return <div>{checkout}</div>;
  }
}
