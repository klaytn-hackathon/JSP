import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import PropTypes from 'prop-types';

const styles = theme => ({
  mainHeader: {
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.05)',
    color: '#94979b',
    padding: theme.spacing.unit * 2,
  },
});

const MainHeader = (props) => {
  const { classes } = props;
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="row"
      spacing={0}
      className={classes.mainHeader}
    >
      <Grid item xs={1}>
        <Search />
      </Grid>
      <Grid item xs={9}>
        Search
      </Grid>
    </Grid>
  );
};

MainHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainHeader);
