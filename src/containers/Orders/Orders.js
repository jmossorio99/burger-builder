import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    this.getOrders();
  }

  getOrders = () => {
    axios
      .get("/orders.json")
      .then((response) => {
        let orders = [];
        for (let key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        this.setState({ loading: false, orders: orders });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let orders = (
      <p style={{ textAlign: "center" }}>There are currently no orders</p>
    );
    if (this.state.orders.length > 0) {
      orders = this.state.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          customer={order.customer.name}
        />
      ));
    }
    return <div>{this.state.loading ? <Spinner /> : orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
