import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, value: props.ingredients[key] });
  }

  return (
    <div className={classes.Order}>
      <p>Customer Name: {props.customer}</p>
      <p>
        Ingredients:
        {ingredients.map((ingredient) => (
          <span
            style={{
              textTransform: "capitalize",
              margin: "0 8px",
              display: "inline-block",
              border: "1px solid #ccc",
              padding: "5px",
            }}
            key={ingredient.name}
          >
            {ingredient.name} ({ingredient.value})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
