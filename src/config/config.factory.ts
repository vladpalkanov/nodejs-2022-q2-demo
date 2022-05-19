import { ConfigFactory } from '@nestjs/config';
import { Config } from './config.types';
import { localConfigStrategy } from './local-config.strategy';

export const configFactory: ConfigFactory<Config> = () => {
  if (process.env.NODE_ENV === 'development') {
    return localConfigStrategy();
  }
};
