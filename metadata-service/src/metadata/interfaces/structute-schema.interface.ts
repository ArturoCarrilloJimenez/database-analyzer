export interface BasicStructureSchema {
  tableName: string;
  tableType: 'BASE TABLE' | 'VIEW';
  engine?: string;
  hasIndexes: boolean;
  hasTriggers: boolean;
  totalSize: number;
  comment: string;
}

export interface BasicTableQuery {
  tableName: string;
  tableType: 'BASE TABLE' | 'VIEW';
  engine?: string;
  totalSize: number;
  comment: string;
}

export interface HasIndexQuery {
  tableName: string;
}

export interface HasTriggerQuery {
  tableName: string;
}

export interface BasicColumnSchema {
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
