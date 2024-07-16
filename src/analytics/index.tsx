export interface ILogger {
  log: (message: string) => void;
}

export interface ILoggerFactory {
  createLogger: () => ILogger;
}

export default ILoggerFactory;
