import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';

import { removePizza } from '../modules/pizza';

const mapDispatchToProps = { removePizza };

const styleSheet = createStyleSheet(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

const Cart = (props) => {
  const classes = props.classes;
  const cart = props.cart;
  const remove = props.removePizza;
  let orderTotal = 0.0;
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="headline" component="h3">
        Shopping Cart
      </Typography>
      <List>
        {cart.map((pizza) => {
          const price = pizza.size.basePrice + pizza.toppings.reduce((sum, t) => sum + t.price, 0);
          orderTotal += price;
          return (
            <ListItem key={pizza.id}>
              <ListItemText
                primary={`${pizza.size.name} pizza with ${pizza.toppings
                  .map(t => t.name)
                  .join(', ')}`}
                secondary={`$${price.toFixed(2)}`}
              />
              <IconButton color="accent" onClick={() => remove(pizza.id)}>
                <ClearIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      {!!orderTotal &&
        <div>
          <Typography type="body1" component="p">
            {`Order total: $${orderTotal.toFixed(2)}`}
          </Typography>
          <a href="https://www.paypal.com/">
            <Button raised color="primary">
              Checkout
            </Button>
          </a>
        </div>}
    </Paper>
  );
};

Cart.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
  removePizza: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

export default withStyles(styleSheet)(connect(mapStateToProps, mapDispatchToProps)(Cart));
