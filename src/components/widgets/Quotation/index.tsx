import React from 'react';
import RNText from '@components/common/RNText';
import {styles} from './styles';
import {View} from 'react-native';

interface QuotationWidgetProps {
  title: string;
  subtitle: string;
}

const QuotationWidget = (props: QuotationWidgetProps) => {
  const {title, subtitle} = props;
  return (
    <View style={styles.contentView}>
      <RNText style={styles.quotationTitleText}>{title}</RNText>
      <RNText style={styles.quotationSubtitleText}>{subtitle}</RNText>
    </View>
  );
};

export default QuotationWidget;
