import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import {styles} from './styles';
import {COLORS} from '@constants/Colors';
import {SCREEN_WIDTH} from '@utilities/App';
import RNText from '../RNText';
import AppCTA from '../AppCTA';
import {AppCalendarIcon, AppDownIcon, IconSize} from '../RNIcon';

interface AppDatePickerProps {
  isOpen: boolean;
  openDateTimeModal: () => void;
  closeDateTimeModal: () => void;
  onDateTimeChange: (date: any) => void;
  mode?: string;
  selectedDateTime: number;
  maximumDate?: Date;
  minimumDate?: Date;
  containerStyles?: any;
}

const AppDatePicker = (props: AppDatePickerProps) => {
  const {
    isOpen,
    selectedDateTime = new Date().getTime(),
    mode = 'date',
    openDateTimeModal,
    closeDateTimeModal,
    onDateTimeChange,
    maximumDate = null,
    minimumDate = null,
    containerStyles = {},
  } = props;

  const dateVal = dayjs(selectedDateTime).toDate(); // Use dayjs
  const dateTimePrefix = dayjs(dateVal).isToday()
    ? 'Today, '
    : dayjs(dateVal).isYesterday()
    ? 'Yesterday, '
    : '';
  const formattedDateTime = dayjs(dateVal).format('MMM D, YYYY'); // Adjust format as needed

  const onConfirm = (date: Date) => {
    if (onDateTimeChange) {
      onDateTimeChange(date);
    }
    closeDateTimeModal(); // to maintain open state
  };

  const onCancel = () => {
    closeDateTimeModal(); // to maintain open state
  };

  return (
    <View style={containerStyles}>
      <AppCTA onPress={openDateTimeModal} style={styles.containerView}>
        <View style={styles.dateTimeContainerView}>
          <AppCalendarIcon size={IconSize.small} color={'rgba(0, 0, 0, 1)'} />
          <RNText style={styles.dateTimePickerTitleText}>
            {dateTimePrefix}
            <RNText style={styles.dateTimePickerSubtitleText}>
              {formattedDateTime}
            </RNText>
          </RNText>
        </View>
        <AppDownIcon size={IconSize.small} color={'rgba(0, 0, 0, 1)'} />
      </AppCTA>

      <DatePicker
        date={new Date(selectedDateTime)}
        open={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        androidVariant="iosClone"
        mode={mode}
        textColor={COLORS.fullBlack}
        fadeToColor="none"
        modal
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        theme="light"
        style={{width: SCREEN_WIDTH, transform: [{scale: 1.2}]}}
      />
    </View>
  );
};

export default AppDatePicker;
