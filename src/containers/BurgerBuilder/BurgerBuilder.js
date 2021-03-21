import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    price: 1,
    purchasable: false,
    purchasing: false,
  };

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
    this.setState({ purhcasing: true });
  };

  cancelPurchasHandler = () => {
    this.setState({ purhcasing: false });
  };

  continuePurchaseHandler = () => {
    alert("You continue!");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purhcasing}
          closeModal={this.cancelPurchasHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelClicked={this.cancelPurchasHandler}
            continueClicked={this.continuePurchaseHandler}
            price={this.state.price}
          />
        </Modal>
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
  }
}

export default BurgerBuilder;
