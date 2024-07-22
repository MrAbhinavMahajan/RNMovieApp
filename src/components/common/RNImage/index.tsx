import React, {useState} from 'react';
import {ActivityIndicator, Image, ImageProps, View} from 'react-native';
import {styles} from './styles';
import {STD_ACTIVITY_COLOR} from '@constants/Styles';
import RNText from '../RNText';
import {logError} from '~/src/analytics';

type RNImageProps = {
  imageURL: string;
  imageViewStyles?: any;
  imageStyles?: any;
  blurRadius?: number;
  fallbackCharacter: string;
} & ImageProps;

const RNImage = (props: RNImageProps) => {
  const {
    imageURL,
    imageViewStyles = {},
    imageStyles = {},
    fallbackCharacter = 'T',
    ...imageData
  } = props;
  const [loading, setLoading] = useState(false);
  const [errorFallback, setErrorFallback] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setErrorFallback(false);
  };

  const stopLoading = () => setLoading(false);

  const onLoadStart = () => {
    // Invoked on load start.
    startLoading();
  };

  const onLoadEnd = () => {
    // Invoked when load either succeeds or fails.
    stopLoading();
  };

  const onError = (errorProps: any) => {
    // Invoked on load error.
    const {nativeEvent} = errorProps;
    logError(`RNImage: ${JSON.stringify(nativeEvent)}`);
    // ! Set Error Source
    stopLoading();
    setErrorFallback(true);
  };

  return (
    <View style={[styles.imageView, imageViewStyles]}>
      {loading && (
        <ActivityIndicator
          size={'small'}
          style={styles.loader}
          color={STD_ACTIVITY_COLOR}
        />
      )}
      <Image
        source={{uri: imageURL}}
        style={[styles.image, imageStyles]}
        onError={onError}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        {...imageData}
      />
      {errorFallback && (
        <View style={[styles.errorFallback, imageStyles]}>
          <RNText style={styles.errorFallbackText}>{fallbackCharacter}</RNText>
        </View>
      )}
    </View>
  );
};

export default RNImage;
