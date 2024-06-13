import {StackActions} from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

export function getCurrentRouteName() {
  return navigationRef?.current?.getCurrentRoute()?.name;
}

export function getCurrentRoute() {
  return navigationRef?.current?.getCurrentRoute();
}

export function navigate(name, params = {}) {
  navigationRef?.current?.navigate(name, params);
}

export function navigateReplace(name, params = {}) {
  navigationRef.current.dispatch(StackActions.replace(name, params));
}

export function resetAndNavigate(name, params = {}) {
  navigationRef.current.dispatch(StackActions.popToTop());
}

export function goBack() {
  navigationRef?.current?.goBack();
}

export const changeStack = stackName => {
  resetRoot(stackName);
};

const resetRoot = route => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{name: route}],
  });
};
