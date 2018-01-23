import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';

function navAction(screenName) {
  return NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: screenName })]
  });
}

function FooterNavigation(props) {
  const { dispatch, nav } = props;
  const routeName = props.nav.routes[0].routes[0].routeName;
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav
  });

  return (
    <Footer>
      <FooterTab>
        <Button
          active={routeName === 'newsfeed' ? true : false}
          onPress={() => navigation.dispatch(navAction('newsfeed'))}
        >
          <Icon name="apps" />
        </Button>
        <Button
          active={routeName === 'discover' ? true : false}
          onPress={() => navigation.dispatch(navAction('discover'))}
        >
          <Icon name="camera" />
        </Button>
        <Button
          active={routeName === 'player' ? true : false}
          onPress={() => navigation.dispatch(navAction('player'))}
        >
          <Icon active name="navigate" />
        </Button>
        <Button
          active={routeName === 'profile' ? true : false}
          onPress={() => navigation.dispatch(navAction('profile'))}
        >
          <Icon name="person" />
        </Button>
      </FooterTab>
    </Footer>
  );
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(FooterNavigation);
