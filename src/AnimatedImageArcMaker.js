import React from 'react';
import PropTypes from 'prop-types';
import {Animated, AppState, Easing, View, ViewPropTypes} from 'react-native';
import ImageArcMaker from 'image-arc-maker/src/ImageArcMaker';
const AnimatedProgress = Animated.createAnimatedComponent(ImageArcMaker);

export default class AnimatedImageArcMaker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill),
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  reAnimate(prefill, toVal, dur, ease) {
    this.setState(
      {
        fillAnimation: new Animated.Value(prefill),
      },
      () => this.animate(toVal, dur, ease),
    );
  }

  animate(toVal, dur, ease) {
    const toValue = toVal >= 0 ? toVal : this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    const anim = Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration,
    });
    anim.start(this.props.onAnimationComplete);

    return anim;
  }

  render() {
    const {fill, ...other} = this.props;

    return <AnimatedProgress {...other} fill={this.state.fillAnimation} />;
  }
}

AnimatedImageArcMaker.propTypes = {
  ...ImageArcMaker.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
};

AnimatedImageArcMaker.defaultProps = {
  duration: 500,
  easing: Easing.inOut(Easing.ease),
  prefill: 50,
};
