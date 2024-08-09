import {
  ErrorEvent,
  PageClickEvent,
  PageEvent,
  PageRefreshEvent,
  WidgetClickEvent,
  WidgetEvent,
  WidgetRefreshEvent,
} from '@constants/AppInterfaces';
import DebugLoggerFactory from './loggers/debug/Factory';
import ErrorLoggerFactory from './loggers/error/Factory';
import InfoLoggerFactory from './loggers/info/Factory';
import AppEventsTracker from './trackers/event/Tracker';

export const onPageViewEvent = (data: PageEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'VIEWED',
  });
};

export const onPageLeaveEvent = (data: PageEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'LEAVE',
  });
};

export const onWidgetViewEvent = (data: WidgetEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'VIEWED',
  });
};

export const onWidgetLeaveEvent = (data: WidgetEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'LEAVE',
  });
};

export const onPageClickEvent = (data: PageClickEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'CLICK',
  });
};

export const onWidgetClickEvent = (data: WidgetClickEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'CLICK',
  });
};

export const onPageRefreshEvent = (data: PageRefreshEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'REFRESH',
  });
};

export const onWidgetRefreshEvent = (data: WidgetRefreshEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'REFRESH',
  });
};

export const onPageActivityEvent = (data: PageEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'ACTIVITY',
  });
};

export const onErrorEvent = (data: ErrorEvent) => {
  const {extraData = {}, ...others} = data;
  logEvent({
    ...others,
    ...extraData,
    eventType: 'ERROR',
  });
};

export const logDebug = (message: string) => {
  const loggerFactory = new DebugLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const logInfo = (message: string) => {
  const loggerFactory = new InfoLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const logError = (message: string) => {
  const loggerFactory = new ErrorLoggerFactory();
  const logger = loggerFactory.createLogger();
  logger.log(message);
};

export const logEvent = (data: any = {}) => {
  const logger = new AppEventsTracker();
  logger.log(data);
};
