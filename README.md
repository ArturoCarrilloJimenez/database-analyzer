# Database Analyzer

Este proyecto es una herramienta de análisis de bases de datos que permite a los usuarios inspeccionar y evaluar la estructura y el contenido de sus bases de datos. Proporciona funcionalidades para identificar problemas comunes, optimizar consultas y mejorar el rendimiento general de la base de datos.

Este proyecto es de código abierto y está diseñado para ser extensible, permitiendo a los desarrolladores agregar nuevas funcionalidades según sus necesidades.

## Características

- Análisis de la estructura de la base de datos.
- Identificación de índices faltantes o innecesarios.
- Evaluación del rendimiento de las consultas ejecutadas anteriormente.
- Generación de informes detallados sobre el estado de la base de datos y recomendaciones de mejora.
- Soporte para múltiples sistemas de gestión de bases de datos (MySQL, PostgreSQL, MariaDB, etc.).
- API para integración con otros sistemas.

## Estructura de Microservicios

El proyecto está dividido en varios microservicios, cada uno con una responsabilidad específica:

- **Servicio de Análisis**: Realiza el análisis de la base de datos y genera informes.
- **Servicio de Metadata**: Obtiene la información de la estructura de la base de datos mediante los datos de conexión proporcionados.
- **Servicio Orquestados**: Coordina las interacciones entre los diferentes servicios para completar las tareas de análisis.
- **Servicio de API**: Proporciona una interfaz RESTful para interactuar con los otros servicios.

![Diagrama de Arquitectura](./images\estructura_de_microservicios.png)

## Créditos y Contacto

Este proyecto fue desarrollado por Arturo Carrillo Jimenez. Si tienes alguna pregunta o necesitas soporte, no dudes en contactarnos.

- **Autor**: Arturo Carrillo Jimenez
- **Email**: acarrilloj@gmail.com
- **GitHub**: [Github](https://github.com/ArturoCarrilloJimenez)
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/arturo-carrillo/)

Contribuciones y sugerencias son bienvenidas. ¡Gracias por usar Database Analyzer!