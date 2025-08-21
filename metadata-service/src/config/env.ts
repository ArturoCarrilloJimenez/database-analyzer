/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException } from '@nestjs/common';
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORTS: number;
}

const envSchema = joi
  .object({
    PORTS: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error)
  throw new BadRequestException(
    'Not all environment variables are available to start with',
  );

const envVars: EnvVars = value;

export const env = {
  port: envVars.PORTS,
};
