# Database Analyzer - Orchestrator Service

![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)
![Languages: TypeScript](https://img.shields.io/github/languages/top/ArturoCarrilloJimenez/database-analyzer)

> Microservicio encargado de coordinar los diferentes servicios de Database Analyzer, gestionando pipelines de análisis y asegurando la comunicación eficiente entre metadata, análisis y gateway.

## ¿Qué hace?

El Orchestrator Service se encarga de:

- Coordinar la ejecución de análisis de bases de datos a través de los microservicios.

- Gestionar colas de tareas y comunicación entre servicios usando NATS.

- Supervisar el estado de los trabajos de análisis y notificar al cliente o a otros servicios.

- Garantizar la integridad y consistencia de los resultados que se generan en cada pipeline.

## Casos de uso

1. Orquestar un análisis completo de una base de datos, desde la recolección de metadatos hasta la generación de informes.
2. Gestionar múltiples solicitudes de análisis concurrentes, asegurando que cada una se procese de manera eficiente y sin conflictos.
3. Integrar nuevos servicios de análisis en la arquitectura existente, facilitando la escalabilidad y modularidad del sistema.

## Características

- Comunicación eficiente entre microservicios mediante NATS.
- Gestión de pipelines de análisis personalizados.
- Supervisión y notificación del estado de los trabajos.
- Fácil integración con nuevos servicios de análisis.
- Escalabilidad y modularidad gracias a la arquitectura basada en microservicios.

## Licencia

Este proyecto está licenciado bajo la Licencia AGPL-3.0. Consulta el archivo [LICENSE](../LICENSE) para más detalles.

## Créditos y Contacto

Este proyecto fue desarrollado por Arturo Carrillo Jimenez. Si tienes alguna pregunta o necesitas soporte, no dudes en contactarnos.

- **Autor**: Arturo Carrillo Jimenez
- **Email**: acarrilloj@gmail.com
- **GitHub**: [Github](https://github.com/ArturoCarrilloJimenez)
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/arturo-carrillo/)

Contribuciones y sugerencias son bienvenidas. ¡Gracias por usar Database Analyzer!
