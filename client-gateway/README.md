# Database Analyzer - Client Gateway

![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)
![Languages: TypeScript](https://img.shields.io/github/languages/top/ArturoCarrilloJimenez/database-analyzer)

> Microservicio que actúa como interfaz principal de Database Analyzer, gestionando la comunicación entre clientes externos y los microservicios internos, exponiendo endpoints RESTful y asegurando autenticación, autorización y validación de peticiones.

## ¿Qué hace?

El API Gateway se encarga de:

- Exponer endpoints RESTful para que los clientes puedan interactuar con el sistema.
- Validar las peticiones entrantes para asegurar que cumplen con los requisitos necesarios.
- Delegar las solicitudes a los microservicios correspondientes mediante NATS.
- Devolver respuestas adecuadas a los clientes.

## Casos de uso

1. Un cliente envía una solicitud para iniciar un análisis de base de datos.
2. El API Gateway valida la solicitud y la envía al microservicio de análisis.
3. El microservicio de análisis procesa la solicitud y envía actualizaciones de estado al API Gateway.
4. El API Gateway notifica al cliente sobre el progreso y el resultado del análisis.

## Características

- Exposición de endpoints RESTful.
- Validación de peticiones entrantes.
- Comunicación con microservicios mediante NATS.

## Licencia

Este proyecto está licenciado bajo la Licencia AGPL-3.0. Consulta el archivo [LICENSE](../LICENSE) para más detalles.

## Créditos y Contacto

Este proyecto fue desarrollado por Arturo Carrillo Jimenez. Si tienes alguna pregunta o necesitas soporte, no dudes en contactarnos.

- **Autor**: Arturo Carrillo Jimenez
- **Email**: acarrilloj@gmail.com
- **GitHub**: [Github](https://github.com/ArturoCarrilloJimenez)
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/arturo-carrillo/)

Contribuciones y sugerencias son bienvenidas. ¡Gracias por usar Database Analyzer!
