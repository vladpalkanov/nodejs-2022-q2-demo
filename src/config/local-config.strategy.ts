import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Config } from './config.types';

export function localConfigStrategy(): Config {
  const file = readFileSync(join(__dirname, 'local.config.yaml'), 'utf8');

  return yaml.load(file) as Config;
}
