import React from 'react';
import {Image, ImageStyle, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
export default ({
  size = 40,
  ...props
}: {
  avatar: string | undefined | null;
  size?: number;
  style?: ImageStyle;
}) => {
  if (!props.avatar) {
    return (
      <Image
        style={{...styles.image, height: size, width: size, ...props.style}}
        source={require('../assets/profile-logo.png')}
      />
    );
  }
  return (
    <FastImage
      style={{
        ...styles.image,
        height: size,
        width: size,
        ...(props.style as any),
      }}
      source={{
        uri: 'https://media.nertivia.net/' + props.avatar + '?type=webp',
        priority: FastImage.priority.normal,
      }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 40,
  },
});
