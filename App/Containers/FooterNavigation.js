import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';
import { NavigationActions } from 'react-navigation';

export default class FooterNavigation extends Component {
  constructor(props) {
    super(props);
    this.goToProfilePageHere = this.goToProfilePageHere.bind(this);
  }

  goToProfilePageHere(event) {
    console.log('pressed');
    // this.props.goToProfilePage();
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="apps" />
          </Button>
          <Button>
            <Icon name="camera" />
          </Button>
          <Button active>
            <Icon active name="navigate" />
          </Button>
          <Button onPress={this.goToProfilePageHere}>
            <Icon name="person" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
