# image-arc-maker

This npm used to make arc of image

## 1. Install

```npm install image-arc-maker react-native-svg```

For ```react-native-svg```:

[react-native-svg](https://github.com/react-native-community/react-native-svg)

## 2. Usage

```
import {ImageArcMaker} from 'image-arc-maker';

<View style={style}>
	<ImageArcMaker image={require('./pizza.png')} size={200} fill={300} />
</View>
```

![SVG example](https://raw.githubusercontent.com/vikrambiwal/react-native-image-arc/master/SVG_example.png)


### props:

| Name  | Default | Description                                  |
| ----- | ------- | -------------------------------------------- |
| fill  | 25      | The fill prop refers percent amount to show. |
| size  | 200     | Square size.                                 |
| image | nonzero | Object of image                              |