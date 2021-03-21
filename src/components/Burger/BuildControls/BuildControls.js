import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current total is: <strong>{props.price.toFixed(2)} USD</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          add={() => props.ingredientAdded(control.type)}
          delete={() => props.ingredientDeleted(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.orderNow}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
