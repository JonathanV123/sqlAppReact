import React, { Component } from 'react';
import { Route, HashRouter as Router, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeContainer from './HomeContainer';
import SignUpForm from '../components/User/SignUpForm';
import LoginForm from '../components/User/LoginForm';
import Dashboard from './Dashboard';
import { verifyToken } from '../actions/jwtActions';
import { fetchAllRestaurantDataForUser, onRestaurantRemoval, onRestaurantEdit, fetchRestaurantById } from '../actions/restaurantActions';
import Restaurant from './Restaurant';
import Navigation from '../components/Presentational/Navigation';
import AddRestaurantPage from './AddRestaurantPage';
import '../App.css';

const mapStateToProps = (state) => {
  return {
    token: state.verifyJWT.token,
    loadingJWT: state.verifyJWT.isPending,
    user: state.verifyJWT.user,
    restaurantPending: state.restaurantData.isPending,
    allUserRestaurants: state.restaurantData.currentRestaurantData,
    restaurantById: state.restaurantData.currentRestaurantById,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyToken: (token) => dispatch(verifyToken(token)),
    fetchAllRestaurantDataForUser: (userId) => dispatch(fetchAllRestaurantDataForUser(userId)),
    onRestaurantRemoval: (restaurantId) => dispatch(onRestaurantRemoval(restaurantId)),
    onRestaurantEdit: (restaurantId, title, description, drinks) => dispatch(onRestaurantEdit(restaurantId, title, description, drinks)),
    fetchRestaurantById: (restaurantId) => dispatch(fetchRestaurantById(restaurantId)),
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem('jwtToken');
    // Check for token in case user refreshes page. If there is a token, keep the user logged in.
    if (token) {
      props.verifyToken(token);
    }
    this.state = {
      userHasAccount: false,
      showNotification: false,
      responseMessage: '',
    }
  }

  logout = () => {
    sessionStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    const userId = this.props.user.id
    return (
      <Router
        basename={'/projects/drinksyReact'}
      >
        <div id="appContainer">
          <Switch>
            <Route
              exact path='/'
              render={(props) => (
                this.props.token === 'Valid' ?
                  <Redirect to={{ pathname: `/home/${userId}` }} />
                  :
                  <HomeContainer
                    {...props}
                    loading={this.props.loadingJWT}
                    userProfile={this.props.user}
                  />
              )}
            />
            <Route
              path='/home/:id'
              render={(props) => (
                this.props.token === 'Valid' ?
                  <div>
                    <Navigation user={this.props.user} logout={this.logout} />
                    <Dashboard
                      {...props}
                      loading={this.props.loadingJWT}
                      restaurantPending={this.props.restaurantPending}
                      userProfile={this.props.user}
                      fetchAllRestaurantDataForUser={this.props.fetchAllRestaurantDataForUser}
                      restaurantData={this.props.allUserRestaurants}
                      onRestaurantRemoval={this.props.onRestaurantRemoval}
                    />
                  </div>
                  :
                  <Redirect to={{ pathname: `/` }} />
              )}
            />
            <Route
              path='/createAccount'
              render={(props) => (
                this.props.token === 'Valid' ?
                  <Redirect to={{ pathname: `/home/${userId}` }} />
                  :
                  <SignUpForm
                    {...props}
                    userProfile={this.props.user}
                  />
              )}
            />
            <Route
              path='/login'
              render={(props) => (
                this.props.token === 'Valid' ?
                  <Redirect to={{ pathname: `/home/${userId}` }} />
                  :
                  <LoginForm
                    {...props}
                    userProfile={this.props.user}
                    loading={this.props.loadingJWT}
                    verifyToken={this.props.verifyToken}
                  />

              )}
            />
            <Route
              path='/restaurant/:id'
              render={(props) => (
                this.props.token === 'Valid' ?
                  <div>
                    <Navigation user={this.props.user} logout={this.logout} />
                    <Restaurant
                      {...props}
                      userProfile={this.props.user}
                      restaurantPending={this.props.restaurantPending}
                      restaurantById={this.props.restaurantById}
                      verifyToken={this.props.verifyToken}
                      editRestaurant={this.props.onRestaurantEdit}
                      fetchRestaurantById={this.props.fetchRestaurantById}
                      onRestaurantRemoval={this.props.onRestaurantRemoval}
                    />
                  </div>
                  :
                  <Redirect to={{ pathname: `/` }} />
              )}
            />
            <Route
              path='/addRestaurant/:id'
              render={(props) => (
                this.props.token === 'Valid' ?
                  <div id="rootAddFormContainer">
                    <Navigation user={this.props.user} logout={this.logout} />
                    <AddRestaurantPage
                      {...props}
                      userProfile={this.props.user}
                      restaurantPending={this.props.restaurantPending}
                      verifyToken={this.props.verifyToken}
                    />
                  </div>
                  :
                  <Redirect to={{ pathname: `/` }} />
              )}
            />
            <Route render={() =>
              <div id="errorPage">
                <h1 className="drinksyHeader"> This page does not exist</h1>
                <h2 className="drinksyHeader"> 404 </h2>
              </div>
            } />
          </Switch>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  token: PropTypes.string,
  loadingJWT: PropTypes.bool,
  user: PropTypes.object,
  verifyToken: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
