import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {styles} from './styles';

interface RNImageProps {
  imageURL: string;
  imageViewStyles?: any;
  imageStyles?: any;
  blurRadius?: number;
}

const RNImage = (props: RNImageProps) => {
  const {
    imageURL,
    imageViewStyles = {},
    imageStyles = {},
    ...imageData
  } = props;
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);

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
    console.log('onError: ', nativeEvent);
    // ! Set Error Source
    stopLoading();
  };

  return (
    <View style={[styles.imageView, imageViewStyles]}>
      {loading && <ActivityIndicator size={'small'} style={styles.loader} />}
      <Image
        source={{uri: imageURL}}
        style={[styles.image, imageStyles]}
        onError={onError}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        {...imageData}
      />
    </View>
  );
};

export default RNImage;
