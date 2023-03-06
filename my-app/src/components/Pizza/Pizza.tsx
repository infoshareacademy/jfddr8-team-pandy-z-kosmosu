import { addTopping } from "./pizzaSlice"
import { useDispatch, useSelector } from "react-redux";
import classes from './Pizza.modules.css' 

export const Pizza = (): JSX.Element => {
    const pizza: any = useSelector<any>(state => state.pizza);
    const dispatch = useDispatch();

    return (
        <div className={classes.pizza}>
        <p>Pizza</p>
{pizza.toppings.map((topping: any) => (
  <div>{topping}</div>
))}
<button onClick={() => dispatch(addTopping('pepperoni'))}>Add Pepperroni</button>
</div> 
    )

}