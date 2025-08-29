import knex, { Knex } from 'knex';
import { DbConfig } from '../interfaces';

export class DatabaseConnectionManager {
  private _connection: null | Knex = null;

  constructor(config?: DbConfig) {
    if (config) this.connect(config);
  }

  public get getClient(): null | Knex {
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
