export interface BasicTableQuery {
  tableName: string;
  tableType: 'BASE TABLE' | 'VIEW';
  engine?: string;
  totalSize: number;
  rows: number;
  comment: string;
}

export interface BasicColumnSchema {
  tableName: string;
  name: string;
  type: string;
  typeKey?: string;
  default?: string;
  isNull?: boolean;
  extra?: string;
  numChar?: number;
  numDigits?: number;
  numDecimals?: number;
  character?: string;
  collection?: string;
  comment: string;
}

export interface BasicColumQuery {
  tableName: string;
  name: string;
  type: string;
  typeKey: string;
  default: null | string;
  isNull: boolean;
  extra: string;
  numChar: number | null;
  numDigits: number | null;
  numDecimals: number | null;
  character: string | null;
  collection: string | null;
  comment: string;
}

export interface BasicIndexQuery {
  tableName: string;
  name: string;
  indexName: string;
  unique: number;
  type: string;
  seqIndex: number;
}

export interface BasicForeignKeyQuery {
  tableName: string;
  name: string;
  restrictName: string;
  tableReference: string;
  columnsReference: string;
  onDelete: string;
  onUpdate: string;
}

export interface BasicTriggerQuery {
  tableName: string;
  name: string;
}
