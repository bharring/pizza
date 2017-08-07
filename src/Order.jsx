// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import { addSizeToOrder, fetchPizzaSizes } from './modules/pizza';

const mapDispatchToProps = { addSizeToOrder, fetchPizzaSizes };

// type pizzaSize {
//   # The size of the pizza
//   name: String!

//   # Max number of allowable toppings.
//   maxToppings: Int

//   # Toppings allowed on this pizza, and whether or not they're default selected
//   toppings: [pizzaToppingConnection]!

//   # Base price of the pie - sans toppings
//   basePrice: Float!
// }

// enum PizzaSizes {
//   LARGE
//   MEDIUM
//   SMALL
// }

// type pizzaToppingConnection {
//   # The pizza size
//   pizzaSize: pizzaSize!

//   # The topping
//   topping: topping!

//   # whether or not this topping should be selected by default for this pizza
//   defaultSelected: Boolean!
// }

// type query {
//   # All available pizza sizes
//   pizzaSizes: [pizzaSize]!

//   # Pizza size by name
//   pizzaSizeByName(name: PizzaSizes): pizzaSize
// }

// type topping {
//   # The name of the topping
//   name: String!

//   # How much this topping costs
//   price: Float!
// }

const styleSheet = createStyleSheet(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

type pizzaProps = {
  classes: {},
};

class Order extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    pizza: undefined,
  };

  componentDidMount() {
    this.props.fetchPizzaSizes();
  }

  props: pizzaProps;

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (event, pizza) => {
    this.setState({ open: false, pizza });
    this.props.addSizeToOrder(pizza.name);
  };

  render = () => {
    console.log(this.props);
    console.log(this.state);
    const classes = this.props.classes;
    const pizzas = this.props.pizzas;
    const order = this.props.order;
    // const selected = this.state.pizza;
    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography type="headline" component="h3">
            Select your pizza and toppings here
          </Typography>
          <Typography type="body1" component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
          <Button
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {order.size || 'Select size'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            {pizzas &&
              pizzas.map(pizza =>
                (<MenuItem key={pizza.name} onClick={event => this.handleRequestClose(event, pizza)}>
                  {`${pizza.name} $${pizza.basePrice}`}
                </MenuItem>),
              )}
          </Menu>
          {/*
          <List>
            {selected &&
              selected.toppings.map(topping =>
                (<ListItem
                  dense
                  button
                  key={topping.name}
                  onClick={event => this.handleToggle(event, topping.name)}
                >
                  <Checkbox
                    checked={this.state.checked.indexOf(topping.name) !== -1}
                    tabIndex="-1"
                    disableRipple
                  />
                  <ListItemText primary={topping.name} />
                  <ListItemText primary={topping.price} />
                </ListItem>),
              )}
          </List> */}
        </Paper>
      </div>
    );
  };
}

const mapStateToProps = state => ({
  ...state,
});

export default withStyles(styleSheet)(connect(mapStateToProps, mapDispatchToProps)(Order));
