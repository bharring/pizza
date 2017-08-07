// @flow

import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { gql, graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Menu, { MenuItem } from 'material-ui/Menu';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const MenuQuery = gql`
  query {
    pizzaSizes {
      name
      basePrice
      maxToppings
      toppings {
        topping {
          name
          price
        }
      }
    }
  }
`;

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

  props: pizzaProps;

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (event, pizza) => {
    this.setState({ open: false, pizza });
  };

  render = () => {
    console.log(this.props);
    console.log(this.state);
    const classes = this.props.classes;
    const pizzas = this.props.data.pizzaSizes;
    const selected = this.state.pizza;
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
            Select size
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
                  {pizza.name}
                </MenuItem>),
              )}
          </Menu>
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
          </List>
        </Paper>
      </div>
    );
  };
}

export default withStyles(styleSheet)(graphql(MenuQuery)(Order));
