/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import queryString from 'query-string';
import axios from 'axios';
import PetitionCard from './PetitionCard';

const styles = () => ({
  topContentText: {
    fontWeight: 'bold',
    marginBottom: '40px',
  },
});

class TopContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petitions: [],
    };
  }

  componentDidMount() {
    const query = {
      limit: 3,
      order: 'support_count',
      with_support_count: true,
    };

    const stringified = queryString.stringify(query);
    const getPetition = () => {
      axios.get(`${process.env.PETITION_ADDRESS}?${stringified}`).then((response) => {
        if (response.status === 200) {
          this.setState(() => ({
            petitions: response.data.petitions,
          }));
        }
      });
    };

    getPetition();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { petitions } = this.state;
    return (
      <Grid container>
        <Typography gutterBottom variant="h5" component="h2" className={classes.topContentText}>
        Top 3 Petitions
        </Typography>
        <Grid container spacing={16} direction="row">
          {petitions.length === 0 ? <CircularProgress /> : ''}
          {
            petitions.map(petition => (
              <Grid item xs={12} sm={4} key={petition.id}>
                <PetitionCard
                  id={petition.id}
                  title={petition.title}
                  createdAt={petition.created_at}
                  supportCount={petition.support_count}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(TopContent);
