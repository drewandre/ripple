// import React from 'react';
// import * as ReactNavigation from 'react-navigation';
// import { NavigationActions } from 'react-navigation';
// import { connect } from 'react-redux';
// import {
//   Container,
//   Header,
//   Content,
//   Footer,
//   FooterTab,
//   Button
// } from 'native-base';
// import { Colors, Fonts } from '../Themes';
// import { StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
//
// function navAction(screenName) {
//   return NavigationActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName: screenName })]
//   });
// }
//
// function FooterNavigation(props) {
//   const { dispatch, nav } = props;
//   const routeName = props.nav.routes[0].routes[0].routeName;
//   const navigation = ReactNavigation.addNavigationHelpers({
//     dispatch,
//     state: nav
//   });
//
//   return (
//     <Footer style={styles.footerHeight}>
//       <FooterTab>
//         <Button
//           style={styles.footerHeight}
//           active={routeName === 'newsfeed' ? true : false}
//           onPress={() => navigation.dispatch(navAction('newsfeed'))}
//         >
//           <Icon name="rocket" size={30} color="#900" />;
//         </Button>
//         <Button
//           style={styles.footerHeight}
//           active={routeName === 'discover' ? true : false}
//           onPress={() => navigation.dispatch(navAction('discover'))}
//         >
//           <Icon name="rocket" size={30} color="#900" />;
//         </Button>
//         <Button
//           style={styles.footerHeight}
//           active={routeName === 'player' ? true : false}
//           onPress={() => navigation.dispatch(navAction('player'))}
//         >
//           <Icon name="rocket" size={30} color="#900" />;
//         </Button>
//         <Button
//           style={styles.footerHeight}
//           active={routeName === 'profile' ? true : false}
//           onPress={() => navigation.dispatch(navAction('profile'))}
//         >
//           <Icon name="rocket" size={30} color="#900" />;
//         </Button>
//       </FooterTab>
//     </Footer>
//   );
// }
//
// const styles = StyleSheet.create({
//   footerHeight: {
//     height: 45
//     // backgroundColor: Colors.facebook
//   }
// });
//
// const mapStateToProps = state => ({ nav: state.nav });
// export default connect(mapStateToProps)(FooterNavigation);
