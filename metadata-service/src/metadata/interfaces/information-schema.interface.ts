export interface InformationSchema {
  schema_name: string;
  table_name: string;
  owner: string | null;
  table_type: 'BASE TABLE' | 'VIEW';
  engine?: string | null;
  has_indexes?: boolean;
  has_triggers?: boolean;
  total_size?: number | null;
  comment?: string | null;
}
