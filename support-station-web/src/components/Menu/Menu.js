import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';
import { ViewQuilt, Timer, TimerOff } from '@material-ui/icons';

const styles = () => ({
  root: {
    height: '100vh',
    backgroundColor: '#e8eef7',
    boxShadow: '1px 0 10px 0 rgba(0, 0, 0, 0.03)',
  },
  logo: {
    height: '10vh',
    textAlign: 'center',
  },
  logoLink: {
    display: 'inline-block',
    margin: 'auto 0',
  },
  subMenu: {
    textAlign: 'center',
    marginTop: '28px',
  },
  icon: {
    color: '#94979b',
  },
});

function Menu(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Grid container spacing={0} direction="column" className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.logo}
      >
        <Grid item>
          <a href="/" className={classes.logoLink}>
            <svg xmlns="http://www.w3.org/2000/svg" width="76" height="29" viewBox="0 0 76 29">
              <text
                fill="none"
                fillRule="evenodd"
                fontSize="16"
                fontWeight="bold"
                letterSpacing="-.5"
                transform="translate(0 -2)"
              >
                <tspan x="1.042" y="15" fill="#3A84FF">
                  SUPPORT
                </tspan>
                <tspan x="0" y="28.686" fill="#1B253A" fontSize="18">
                  STATIO
                </tspan>
                <tspan x="62.16" y="28.686" fill="#1B253A" fontSize="18">
                  N
                </tspan>
              </text>
            </svg>
          </a>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={40} direction="column" className={classes.subMenu}>
        <Grid item>
          <Grid container spacing={12} direction="row" justify="center" className={classes.icon}>
            <Grid item xs={4}>
              <ViewQuilt />
            </Grid>
            <Grid item xs>
              All
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={12} direction="row" justify="center" className={classes.icon}>
            <Grid item xs={4}>
              <Timer />
            </Grid>
            <Grid item xs>
              In Progress
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={12} direction="row" justify="center" className={classes.icon}>
            <Grid item xs={4}>
              <TimerOff />
            </Grid>
            <Grid item xs>
              Expired
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(Menu);
