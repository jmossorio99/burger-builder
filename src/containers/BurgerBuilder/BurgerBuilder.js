import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 1,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchasable = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const updatedPrice = this.state.price + INGREDIENT_PRICES[type];
    this.setState({ price: updatedPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };

  deleteIngredientHandler = (type) => {
    const updatedCount = this.state.ingredients[type] - 1;
    if (updatedCount >= 0) {
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedCount;
      const updatedPrice = this.state.price - INGREDIENT_PRICES[type];
      this.setState({ price: updatedPrice, ingredients: updatedIngredients });
      this.updatePurchasable(updatedIngredients);
    }
  };

  togglePurchasing = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchasHandler = () => {
    this.setState({ purchasing: false });
  };

  continuePurchaseHandler = () => {
    const queryParams = [];
    for (const ingredient in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(ingredient) +
          "=" +
          encodeURIComponent(this.state.ingredients[ingredient])
      );
    }
    queryParams.push("price=" + this.state.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Something went wrong</p> : <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientDeleted={this.deleteIngredientHandler}
            disabled={disabledInfo}
            price={this.state.price}
            purchasable={this.state.purchasable}
            orderNow={this.togglePurchasing}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelClicked={this.cancelPurchasHandler}
          continueClicked={this.continuePurchaseHandler}
          price={this.state.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.cancelPurchasHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
