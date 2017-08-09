import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import SelectSize from './SelectSize';
import SelectToppings from './SelectToppings';
import AddToOrder from './AddToOrder';

const styleSheet = createStyleSheet(theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
  }),
}));

const Order = (props) => {
  const classes = props.classes;
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="headline" component="h3">
        Select your pizza and toppings here
      </Typography>
      <SelectSize />
      <SelectToppings />
      <AddToOrder />
    </Paper>
  );
};

Order.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styleSheet)(Order);
