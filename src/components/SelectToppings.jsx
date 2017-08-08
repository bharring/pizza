import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';

import AddToOrder from './AddToOrder';

import { addToppingToOrder, removeToppingFromOrder } from '../modules/pizza';

const mapDispatchToProps = { addToppingToOrder, removeToppingFromOrder };

class SelectToppings extends Component {
  handleToggle = (event, topping, checked) => {
    if (checked) {
      this.props.removeToppingFromOrder(topping);
    } else {
      this.props.addToppingToOrder(topping);
    }
  };

  render = () => {
    const toppings = this.props.toppings;
    const order = this.props.order;
    const disabled =
      order.size && order.size.maxToppings && order.toppings.length >= order.size.maxToppings;
    return (
      <div>
        {order.size &&
          (order.size.maxToppings
            ? <Typography type="body1" component="p">
              {`Please select up to ${order.size.maxToppings} toppings for your ${order.size
                .name} pizza!`}
            </Typography>
            : <Typography type="body1" component="p">
                Select as many toppings as you want!
            </Typography>)}
        <List>
          {toppings.map((topping) => {
            const { name, price } = topping.topping;
            const checked = !!order.toppings.find(top => name === top.name);
            return (
              <ListItem
                dense
                button
                key={name}
                onClick={event => this.handleToggle(event, topping.topping, checked)}
              >
                <Checkbox
                  checked={checked}
                  disabled={disabled && !checked}
                  tabIndex="-1"
                  disableRipple
                />
                <ListItemText primary={name} secondary={`$${price.toFixed(2)}`} />
              </ListItem>
            );
          })}
        </List>
        <AddToOrder />
      </div>
    );
  };
}
SelectToppings.defaultProps = {
  toppings: [],
};

SelectToppings.propTypes = {
  addToppingToOrder: PropTypes.func.isRequired,
  removeToppingFromOrder: PropTypes.func.isRequired,
  order: PropTypes.shape({
    size: PropTypes.shape({
      name: PropTypes.string,
      basePrice: PropTypes.number,
      maxToppings: PropTypes.number,
    }),
    toppings: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  toppings: PropTypes.arrayOf(
    PropTypes.shape({
      defaultSelected: PropTypes.bool.isRequired,
      topping: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
};

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectToppings);
