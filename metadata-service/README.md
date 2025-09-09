# Database Analyzer - Metadata Service

![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)
![Languages: TypeScript](https://img.shields.io/github/languages/top/ArturoCarrilloJimenez/database-analyzer)

> Microservicio encargado de obtener información de la base de datos, gestionando la comunicación con la base de datos y proporcionando metadatos relevantes para el análisis como tablas, columnas, tipos de datos, etc.

## ¿Qué hace?

El Metadata Service se encarga de:

-   Conectarse a la base de datos especificada de forma dinamica y segura.
-   Extraer metadatos esenciales como nombres de tablas, columnas, tipos de datos y relaciones.
-   Proporcionar esta información a otros microservicios para facilitar el análisis de datos.
-   Manejar errores y excepciones relacionadas con la conexión y consulta a la base de datos.

## Casos de uso

1. Un usuario solicita un análisis de una base de datos específica. El Metadata Service se conecta a la base de datos y extrae los metadatos necesarios.
2. Otro microservicio necesita información sobre la estructura de la base de datos para realizar un análisis más profundo. El Metadata Service proporciona esta información de manera eficiente.
3. El Metadata Service maneja errores de conexión y notifica a otros servicios en caso de problemas.

## Características

- Conexión segura y dinámica a diversas bases de datos.
- Extracción eficiente de metadatos esenciales.
- Comunicación fluida con otros microservicios mediante NATS.
- Manejo robusto de errores y excepciones.
- Normalización y estandarización de metadatos para facilitar su uso en análisis posteriores con diferentes bases de datos.

## Licencia

Este proyecto está licenciado bajo la Licencia AGPL-3.0. Consulta el archivo [LICENSE](../LICENSE) para más detalles.

## Créditos y Contacto

Este proyecto fue desarrollado por Arturo Carrillo Jimenez. Si tienes alguna pregunta o necesitas soporte, no dudes en contactarnos.

- **Autor**: Arturo Carrillo Jimenez
- **Email**: acarrilloj@gmail.com
- **GitHub**: [Github](https://github.com/ArturoCarrilloJimenez)
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/arturo-carrillo/)

Contribuciones y sugerencias son bienvenidas. ¡Gracias por usar Database Analyzer!
