/**
 * Copyright (c) 2017-Present, Vikram Biwal.
 * All rights reserved.
 *
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import Svg, { Defs, G, ClipPath, Path, Image } from 'react-native-svg';

export default class ImageArcMaker extends Component {
	polarToCartesian(centerX, centerY, radius, angleInDegrees) {
		var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians)
		};
	}

	circlePath(x, y, radius, startAngle, endAngle) {
		var start = this.polarToCartesian(x, y, radius, endAngle * 0.9999);
		var end = this.polarToCartesian(x, y, radius, startAngle);
		var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
		var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y, 'L', radius, radius];
		return d.join(' ');
	}
	render() {
		const { size, fill, startAngle } = this.props;
		const circlePath = this.circlePath(size / 2, size / 2, size / 2, startAngle, startAngle + fill);

		return (
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Svg height="200" width="200" fill="blue" key={fill}>
					<Defs>
						<ClipPath id="clip">
							<Path d={circlePath} strokeWidth={0} />
						</ClipPath>
					</Defs>
					<Image x="0" y="0" width="200" height="200" opacity="1" href={this.props.image} clipPath="url(#clip)" />
				</Svg>
			</View>
		);
	}
}

ImageArcMaker.propTypes = {
	size: PropTypes.number,
	fill: PropTypes.number,
	startAngle: PropTypes.number,
	image: PropTypes.object
};

ImageArcMaker.defaultProps = {
	size: 200,
	fill: 25,
	startAngle: 0,
	image: null
};
