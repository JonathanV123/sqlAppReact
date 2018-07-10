import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';
import { userHasLoggedIn, getTokenMe, setUserProfile } from '../actions/jwtActions';
import '../App.css';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loggedIn: state.userIsLoggedIn.isUserLoggedIn,
  }
}

const Navbar = (props) => {
  console.log(props);
  return (
    <div className="navBarContainer">
      <nav>
        <Link className="navBarLink" to={'/'}>Home</Link>
        <Link className="navBarLink" to={'/restaurant'}>Restaurants</Link>
        <Link className="navBarLink" to={'/account'}>Account</Link>
      </nav>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedIn: () => dispatch(userHasLoggedIn()),
    retrieveToken: () => dispatch(getTokenMe()),
    userInfo: () => dispatch(setUserProfile()),
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userHasAccount: false,
      showNotification: false,
      responseMessage: '',
    }

  }

  render() {
    const path = this.state.loggedIn ? '/home' : '/login';
    return (
      <Router>
        <div id="appContainer">
          <Switch>
            <Route
              path='/home/:id'
              render={(props) =>
                <HomeContainer
                  {...props}
                  loggedIn={this.props.loggedIn}
                  userLoggedIn={this.props.userLoggedIn}
                  retrieveToken={this.props.retrieveToken}
                  userInfo={this.props.userInfo}
                />
              }
            />
            <Route
              path='/'
              render={(props) =>
                <LoginContainer
                  {...props}
                  loggedIn={this.props.loggedIn}
                  userLoggedIn={this.props.userLoggedIn}
                  retrieveToken={this.props.retrieveToken}
                  userInfo={this.props.userInfo}
                />
              }
            />
            <Route render={() => <h1> 404 </h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
