import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';

import { completePizza } from '../modules/pizza';

const mapDispatchToProps = { completePizza };

const SelectSize = (props) => {
  const order = props.order;
  const price =
    order.size && order.size.basePrice + order.toppings.reduce((sum, t) => sum + t.price, 0);
  return (
    <div>
      {!!price &&
        <Button raised color="primary" onClick={() => props.completePizza()}>
          {`Add $${price.toFixed(2)}`}
        </Button>}
    </div>
  );
};

SelectSize.propTypes = {
  completePizza: PropTypes.func.isRequired,
  order: PropTypes.shape({
    size: PropTypes.shape({
      basePrice: PropTypes.number,
    }),
    toppings: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectSize);
