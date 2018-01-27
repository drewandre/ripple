import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import CoverFlow from './coverflow';

import { Metrics as D, Colors, Fonts } from '../Themes';

export const FOOTER_HEIGHT = 45;
export const TABBAR_HEIGHT = 50;
export const TOGETHER = FOOTER_HEIGHT + TABBAR_HEIGHT;

export default class GGomaFooter extends Component {
  state = {
    pan: new Animated.ValueXY(),
    opacity: new Animated.Value(1)
  };

  moving = false;
  open = false;
  hiding = false;
  offY = 0;

  componentDidMount() {
    setTimeout(() => this.measureView(), 0);
  }

  measureView() {
    this.refs.view.measure((a, b, w, h, px, py) => {
      this.offY = py;
    });
  }

  hideTabBarNavigation(dy) {
    let value = (this.offY + dy) % (D.screenHeight - TOGETHER);
    if (value < 0) {
      value = 0;
    }

    this.props.hideTabBarNavigation(value);
    // console.log(value);
  }

  componentWillMount() {
    let panMover = Animated.event([
      null,
      {
        dy: this.state.pan.y
      }
    ]);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (e, g) => !(g.dx === 0 || g.dy === 0),
      onPanResponderTerminationRequest: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,

      onPanResponderGrant: (e, gestureState) => {},

      onPanResponderMove: (e, g) => {
        if (
          this.moving ||
          (!this.open && g.dy > 0) ||
          (this.open && g.dy < 0)
        ) {
          // console.log('shouldnt move!!');
          return;
        }
        if ((!this.open && g.dy < -5) || (this.open && g.dy > 5)) {
          this.hideTabBarNavigation(g.dy);
        }

        if (!this.open && g.dy < 0) {
          const value = g.dy / 70 + 1;
          if (0 < value && value < 1) {
            this.state.opacity.setValue(value);
          }
        }

        if (this.open && g.dy > 0) {
          const value = g.dy / 250 - 1;
          if (0 < value && value < 1) {
            this.state.opacity.setValue(value);
          }
        }

        return panMover(e, g);
      },
      onPanResponderRelease: (e, g) => {
        if (
          this.moving ||
          (!this.open && g.dy > 0) ||
          (this.open && g.dy < 0)
        ) {
          // console.log('shouldnt release');
          return;
        } else {
          const offsetY = g.dy;
          // console.log(offsetY);

          if (!this.open) {
            /*s
                            If you are swiping up quickly and your finger goes off the screen, the View doesn't always open fully (it stops a few px from the top).
                            This sort of thing happens because the event system couldn't keep up with the fast swipe, and the last event it gets is from a few milliseconds before it hit the top.
                            You can fix this by always fully opening the View when its `y` is within some distance from the top.
                            I think you can just add `if (g.y0 <= 100) this.scrollUp();` in your `onPanResponderRelease`
                         */
            if (g.y0 >= 100) this.openPlaying(offsetY);
          } else {
            this.closePlaying(offsetY);
          }
        }
      }
    });
  }

  openPlaying(offsetY) {
    if (offsetY < -100) {
      console.log('open');
      this.moving = true;
      this.props.hide();
      StatusBar.setHidden(true, true);
      this.state.opacity.setValue(0);
      Animated.timing(this.state.pan.y, {
        toValue: -D.screenHeight + TOGETHER,
        duration: 200
      }).start(() => {
        console.log('opened');
        //hide tab bar

        setTimeout(() => {
          this.open = true;
          this.moving = false;
        }, 200);
        this.state.pan.setOffset({ y: -D.screenHeight + TOGETHER });
        this.state.pan.setValue({ y: 0 });
      });
    } else {
      this.moving = true;
      this.reset();
      console.log('back to original state 1!', this.state.pan.y);
      this.props.show();
      Animated.timing(this.state.pan.y, { toValue: 0 }).start(() => {
        setTimeout(() => (this.moving = false), 200);
        this.state.pan.setOffset({ y: 0 });
      });
    }
  }

  closePlaying(offsetY) {
    if (offsetY > 100) {
      console.log('closing');
      this.reset();
      this.moving = true;
      this.props.show();
      StatusBar.setHidden(false, true);
      Animated.timing(this.state.pan.y, {
        toValue: D.screenHeight - TOGETHER,
        duration: 200
      }).start(() => {
        console.log('closed');
        setTimeout(() => {
          this.open = false;
          this.moving = false;
        }, 200);
        this.state.pan.setOffset({ y: 0 });
        this.state.pan.setValue({ y: 0 });
      });
    } else {
      this.moving = true;
      console.log('back to original state 2!');
      this.props.hide();
      Animated.timing(this.state.pan.y, { toValue: 0 }).start(() => {
        setTimeout(() => (this.moving = false), 200);
        this.state.pan.setOffset({ y: -D.screenHeight + TOGETHER });
      });
    }
  }

  scrollUp() {
    Animated.spring(this.state.opacity, { toValue: 0 }).start();

    this.openPlaying(-101);
  }

  scrollDown() {
    Animated.spring(this.state.opacity, { toValue: 1 }).start();
    this.closePlaying(101);
  }

  reset() {
    Animated.spring(this.state.opacity, { toValue: 1 }).start();
  }

  getStyle() {
    return { transform: [{ translateY: this.state.pan.y }] };
  }

  renderDefault() {
    const { opacity } = this.state;
    return (
      <Animated.View
        style={[
          styles.firstView,
          {
            opacity,
            height: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, FOOTER_HEIGHT + 10]
            })
          }
        ]}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 8,
            paddingLeft: 15,
            paddingRight: 15
          }}
          onPress={() => this.scrollUp()}
        >
          <Icon name="ios-arrow-up-outline" size={30} color="black" />
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.title}>
              Awesome Title · <Text style={styles.author}>Artist ggomaeng</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon
                color={'#6A95EB'}
                style={{ marginRight: 8 }}
                name="ios-musical-notes-outline"
                size={16}
              />
              <Text style={styles.music}>DREW'S MACBOOK PRO</Text>
            </View>
          </View>
          <View style={styles.pause}>
            <Icon name="ios-play-outline" size={18} color="black" />
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  render() {
    return (
      <View ref="view" style={styles.container}>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[styles.playing, this.getStyle()]}
        >
          <CoverFlow scrollDown={() => this.scrollDown()} />
          {this.renderDefault()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: D.screenWidth,
    top: D.screenHeight - TOGETHER
  },
  playing: {
    backgroundColor: Colors.instagramMenuBar,
    height: D.screenHeight,
    paddingBottom: FOOTER_HEIGHT
  },
  firstView: {
    position: 'absolute',
    top: 0,
    width: D.screenWidth,
    backgroundColor: Colors.instagramMenuBar,
    borderTopColor: '#D4D4D4',
    borderTopWidth: 2
  },
  pause: {
    width: 27,
    height: 27,
    borderRadius: 100,
    paddingTop: 2,
    paddingLeft: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },

  title: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600'
  },

  author: {
    fontWeight: '600',
    color: 'black',
    fontSize: 12
  },

  music: {
    fontWeight: '300',
    color: 'black',
    fontSize: 12
  }
});
