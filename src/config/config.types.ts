import { LoggerOptions } from 'pino';

export type SqliteDatabaseConfig = {
  database: string;
};

export type DatabaseConfig = {
  sqlite: SqliteDatabaseConfig;
};

export type ServerConfig = {
  port: number;
};

export type JwtTokenConfig = {
  secret: string;
  expiresIn: number;
};

export type JwtConfig = {
  accessToken: JwtTokenConfig;
  refreshToken: JwtTokenConfig;
};

export type LoggerConfig = LoggerOptions;

export type Config = {
  database: DatabaseConfig;
  server: ServerConfig;
  jwt: JwtConfig;
};
