/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import RNText from '../../common/RNText';
import {useQuery} from '@tanstack/react-query';
import {requestAccessToken, validateSessionWithLogin} from '../../../apis/Main';

const SignInScreen = () => {
  const scrollRef = useRef(null);
  const requestTokenQuery = useQuery({
    queryKey: ['requestToken'],
    queryFn: ({signal}) => requestAccessToken(signal),
  });
  const [userName, setUserName] = useState<string>('');
  const [password, setPassord] = useState<string>('');
  const [requestToken, setRequestToken] = useState<string>('');
  const [enableLoginQuery, setLoginQueryEnabled] = useState(false);
  const loginQuery = useQuery({
    queryKey: ['loginQuery'],
    queryFn: ({signal}) =>
      validateSessionWithLogin(signal, userName, password, requestToken),
    enabled: enableLoginQuery,
  });

  useEffect(() => {
    if (requestToken) {
      setLoginQueryEnabled(true);
    }

    return () => {
      setRequestToken('');
      setLoginQueryEnabled(false);
    };
  }, [requestToken]);

  const onPageRefresh = () => {};

  // https://www.themoviedb.org/authenticate/520469e1f032fe1a5bb7535e8d643aa7f010a45f?redirect_to=http://www.yourapp.com/approved

  return (
    <View style={styles.screenView}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.screenScrollableView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onPageRefresh} />
        }>
        <RNText>Login</RNText>

        <TouchableOpacity
          style={{borderWidth: 1, backgroundColor: 'red', width: '100%'}}>
          <RNText>Login</RNText>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SignInScreen;
