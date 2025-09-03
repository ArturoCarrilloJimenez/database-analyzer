export interface DbConfig {
  client: 'pg' | 'mysql2'; // Tipo de base de datos
  host: string; // IP o dominio, ej: 'localhost' o 'db.example.com'
  port?: number; // Puerto opcional, ej: 5432 o 3306
  user: string; // Usuario
  password: string; // Contraseña
  database: string; // Nombre de la base de datos
  ssl?: boolean | Record<string, unknown>; // SSL opcional para producción
  pool?: {
    min?: number;
    max?: number;
  };
  [key: string]: any; // Para futuras propiedades dinámicas
}
