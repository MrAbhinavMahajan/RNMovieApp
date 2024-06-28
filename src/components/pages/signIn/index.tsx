/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState} from 'react';
import {RefreshControl, ScrollView, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STD_VERTICAL_SPACING} from '../../../constants/Styles';
import {styles} from './styles';
import RNText from '../../common/RNText';
import AppCTA from '../../common/AppCTA';

const SignInScreen = () => {
  const scrollRef = useRef(null);
  const insets = useSafeAreaInsets();

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPageRefresh = () => {};

  const onUserNameChangeText = (name: string) => {
    setUserName(name);
  };

  const onPasswordChangeText = (passwd: string) => {
    setPassword(passwd);
  };

  const onSubmit = () => {};

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[
          styles.screenScrollableView,
          {paddingTop: insets.top + STD_VERTICAL_SPACING},
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <RNText style={styles.screenTitle}>Login</RNText>

        <TextInput
          value={userName}
          onChangeText={onUserNameChangeText}
          style={styles.textInput}
        />
        <TextInput
          value={password}
          onChangeText={onPasswordChangeText}
          style={styles.textInput}
        />

        <AppCTA onPress={onSubmit} style={styles.submitCTA}>
          <RNText style={styles.submitCTATitleText}>Submit</RNText>
        </AppCTA>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;
