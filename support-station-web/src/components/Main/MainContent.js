import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PetitionCard from './PetitionCard';

const styles = () => ({
  mainContentText: {
    fontWeight: 'bold',
    marginTop: '56px',
    marginBottom: '40px',
  },
  writeButtonContainer: {
    textAlign: 'right',
  },
  writeButton: {
    backgroundColor: '#3a84ff',
    borderRadius: '0px 0px 0px 0px;',
  },
  writeButtonText: {
    color: 'white',
    textDecoration: 'none',
  },
  pagination: {
    display: 'inline-block',
    textAlign: 'center',
    margin: '30px auto 0 auto',
    paddingLeft: '15px',
    paddingRight: '15px',
  },
});

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petitions: [],
      offset: 0,
      perPage: 6,
    };
  }

  componentDidMount() {
    this.getPetitions();
  }

  getPetitions = () => {
    const { perPage, offset } = this.state;

    const query = {
      order: 'created_at',
      offset,
      limit: perPage,
      with_support_count: true,
    };

    axios.get(`${process.env.PETITION_ADDRESS}?${queryString.stringify(query)}`).then((response) => {
      if (response.status === 200) {
        this.setState(() => ({
          petitions: response.data.petitions,
          pageCount: Math.ceil(response.data.meta.total_count / perPage),
        }));
      }
    });
  };

  handlePageClick = (data) => {
    const { selected } = data;
    const { perPage } = this.state;
    const offset = Math.ceil(selected * perPage);

    this.setState({ offset }, () => {
      this.getPetitions();
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { petitions, pageCount } = this.state;

    return (
      <Fragment>
        <Typography gutterBottom variant="h5" component="h2" className={classes.mainContentText}>
          <Grid container direction="row">
            <Grid item xs>
              All Petitions
            </Grid>
            <Grid item xs className={classes.writeButtonContainer}>
              <Link style={{ textDecoration: 'none' }} to="/petitions/new">
                <Button variant="contained" className={classes.writeButton}>
                  <div className={classes.writeButtonText}>Write a petition</div>
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Typography>

        <Grid container spacing={16} direction="row">
          {
            petitions.map(petition => (
              <Grid item xs={4} key={petition.id}>
                <PetitionCard
                  id={petition.id}
                  title={petition.title}
                  createdAt={petition.created_at}
                  supportCount={petition.support_count}
                />
              </Grid>
            ))}
        </Grid>

        <div className={classes.pagination}>
          <ReactPaginate
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            breakClassName="page-item"
            pageClassName="page-item"
            previousClassName="page-item"
            nextClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MainContent);
