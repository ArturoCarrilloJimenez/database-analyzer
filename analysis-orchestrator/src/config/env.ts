/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException } from '@nestjs/common';
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVER: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error)
  throw new BadRequestException(
    'Not all environment variables are available to start with',
  );

const envVars: EnvVars = value;

export const env = {
  port: envVars.PORT,
  nats_server: envVars.NATS_SERVER,
};
