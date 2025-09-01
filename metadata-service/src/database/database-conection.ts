import knex, { Knex } from 'knex';
import { DbConfig } from '../interfaces';
import { createRpcError } from 'src/helper';

export class DatabaseConnectionManager {
  private _connection: null | Knex = null;

  constructor(config?: DbConfig) {
    if (config) this.connect(config);
  }

  public get getClient(): Knex {
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
        ssl: config.ssl,
      },
      pool: config.pool,
    });
  }

  async remove() {
    if (this._connection !== null) await this._connection.destroy();
    this._connection = null;
  }
}
