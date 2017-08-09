import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

import { fetchToppingsForSize, fetchPizzaSizes } from '../modules/pizza';

const mapDispatchToProps = { fetchToppingsForSize, fetchPizzaSizes };

class SelectSize extends Component {
  state = {
    anchorEl: undefined,
    open: false,
    pizza: undefined,
  };

  componentDidMount() {
    this.props.fetchPizzaSizes();
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = (event, pizza) => {
    this.setState({ open: false, pizza });
    this.props.fetchToppingsForSize(pizza);
  };

  render = () => {
    const pizzas = this.props.pizzas;
    const order = this.props.order;
    return (
      <div>
        <Button
          raised
          color="primary"
          aria-owns={this.state.open ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {(order.size && order.size.name) || 'Select size'}
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
      </div>
    );
  };
}

SelectSize.propTypes = {
  fetchToppingsForSize: PropTypes.func.isRequired,
  fetchPizzaSizes: PropTypes.func.isRequired,
  pizzas: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      basePrice: PropTypes.number,
    }),
  ).isRequired,
  order: PropTypes.shape({
    size: PropTypes.shape({
      name: PropTypes.string,
      basePrice: PropTypes.number,
      maxToppings: PropTypes.number,
    }),
  }).isRequired,
};

const mapStateToProps = ({ pizzas, order }) => ({
  pizzas,
  order,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSize);
