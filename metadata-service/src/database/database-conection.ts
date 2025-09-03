import knex, { Knex } from 'knex';
import { DbConfig } from '../interfaces';
import { createRpcError } from 'src/helper';

export class DatabaseConnectionManager {
  private _connection: null | Knex = null;

  constructor(config?: DbConfig) {
    if (config) this.connect(config);
  }

  public get getConnection(): Knex {
    if (!this._connection) {
      throw createRpcError({
        status: '404',
        message: 'Database not connected',
      });
    }

    return this._connection;
  }

  public get isConnected(): boolean {
    return this._connection !== null;
  }

  connect(config: DbConfig) {
    this._connection = knex({
      client: config.client,
      connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        ssl: config.ssl ?? false,
        connectTimeout: 30000,
      },
      pool: config.pool ?? { min: 2, max: 10 },
    });
  }

  async remove() {
    if (this._connection !== null) await this._connection.destroy();
    this._connection = null;
  }
}
