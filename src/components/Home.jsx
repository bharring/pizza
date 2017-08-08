import React from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import Order from './Order';

const styleSheet = createStyleSheet(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = (props) => {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item sm={9}>
          <Order />
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>xs=6 sm=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styleSheet)(Home);
