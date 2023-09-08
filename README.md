# Demo Hello World App

## Descripción

Esta es una aplicación demo basada en ExpressJS. Se diseñó para demostrar un flujo de trabajo CI/CD utilizando GitHub Actions, la integración con Semantic Release y la implementación en un cluster EKS de AWS.

## Estructura de la aplicación

### Código

- **`src/server.js`**: Archivo principal que arranca la aplicación Express. La configuración por defecto es escuchar en el puerto `8080` y en el host `0.0.0.0`.
- **`package.json`**: Contiene las dependencias del proyecto, así como scripts para iniciar, probar y construir la aplicación. Además, incluye la configuración necesaria para `semantic-release`.

### Configuración CI/CD

- **GitHub Actions**: Se utilizan para definir flujos de trabajo de integración continua (CI) y despliegue continuo (CD). Los workflows se activan ante eventos específicos, por ejemplo, al hacer un `push` a la rama `main` o al disparar eventos personalizados.
- **`release.yml`**: Define el flujo de trabajo para la generación automática de versiones con `semantic-release` y la creación de releases en GitHub.

### Docker

- **`Dockerfile`**: Define cómo se debe construir la imagen Docker de la aplicación.

### Semantic Release

Se integra `semantic-release` para la generación automática de versiones y changelogs basados en los mensajes de commit siguiendo las convenciones de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

- **`package.json`**:
  - Sección "release": Define la configuración de `semantic-release`, incluyendo las ramas a monitorizar y los plugins utilizados.
  - Dependencias: Se han añadido las dependencias necesarias para `semantic-release` y sus plugins.

### Despliegue en EKS

La aplicación se despliega en un cluster EKS de AWS mediante la definición de configuraciones específicas para cada ambiente (QA, Staging y Producción). Estas configuraciones están en los archivos `eks/deployment-qa.yaml`, `eks/deployment-stg.yaml` y `eks/deployment-prd.yaml` respectivamente.

## Uso básico

1. Clonar el repositorio: `git clone https://github.com/GioDelG/demo-helloapp.git`
2. Instalar las dependencias: `npm install`
3. Iniciar la aplicación: `npm start`

## Contribución

Para contribuir al proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama con un nombre descriptivo.
3. Haz tus cambios y asegúrate de seguir las convenciones de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
4. Realiza una solicitud de pull al repositorio original.

## Semantic Release

Con la ayuda de `semantic-release`, el proceso de lanzamiento se ha automatizado por completo. Los nuevos lanzamientos y changelogs se generan automáticamente en base a los mensajes de commit. Es crucial seguir las convenciones de commit para que este proceso funcione correctamente.

# Documentación del Flujo de Trabajo de Despliegue en EKS

## Resumen

Este documento describe el flujo de trabajo (workflow) de GitHub Actions que maneja la integración continua (CI) y la entrega continua (CD) para una aplicación en EKS (Elastic Kubernetes Service) de AWS.

## Eventos de activación

El flujo de trabajo se activa en los siguientes eventos:
- `push` a la rama `main`.
- Apertura o sincronización de `pull_request` hacia la rama `main`.
- Manualmente mediante `workflow_dispatch`.

## Jobs del Workflow

### 1. Build-Application-Tests

- **Plataforma**: `ubuntu-latest`.
- Descarga el código del repositorio.
- Configura Node.js v16.
- Instala dependencias con `npm ci`.
- Ejecuta las pruebas unitarias con `npm test`.

### 2. Deploy-to-QA

Este job se encarga del despliegue en el ambiente de Control de Calidad (QA).
- Se ejecuta después de completarse `Build-Application-Tests`.
- Instala y configura `kubectl` para interactuar con el cluster de Kubernetes.
- Configura las credenciales de AWS y actualiza el `kubeconfig`.
- Despliega los recursos de Kubernetes definidos en `eks/deployment-qa.yaml` y `eks/service-qa.yaml`.

### 3. QA-EKS-Values

Este job recopila y muestra información sobre los recursos desplegados en el ambiente de QA.
- Se ejecuta después de completarse `Deploy-to-QA`.
- Muestra detalles sobre los namespaces, deployments, services y pods en el namespace `quality-assurance`.

### 4. Deploy-to-Stg

Maneja el despliegue en el ambiente de Pre-Producción o Staging.
- Se ejecuta si `Deploy-to-QA` y `QA-EKS-Values` se completan correctamente.
- Despliega los recursos de Kubernetes definidos en `eks/deployment-stg.yaml` y `eks/service-stg.yaml`.

### 5. Stg-EKS-Values

Recopila y muestra información sobre los recursos desplegados en el ambiente de Staging.
- Se ejecuta después de completarse `Deploy-to-Stg`.
- Muestra detalles sobre los namespaces, deployments, services y pods en el namespace `staging`.

### 6. Manual-Approval

Solicita aprobación manual para continuar con el despliegue en el ambiente de Producción.
- Se presenta una pausa en el flujo de trabajo esperando la aprobación manual.
- Una vez aprobado, el workflow continúa con el job `Deploy-to-Prod`.

### 7. Deploy-to-Prod

Maneja el despliegue en el ambiente de Producción.
- Se ejecuta después de recibir aprobación en `Manual-Approval`.
- Despliega los recursos de Kubernetes definidos en `eks/deployment-prd.yaml` y `eks/service-prd.yaml`.

### 8. Prod-EKS-Values

Recopila y muestra información sobre los recursos desplegados en el ambiente de Producción.
- Se ejecuta después de completarse `Deploy-to-Prod`.
- Muestra detalles sobre los namespaces, deployments, services y pods en el namespace `production`.

## Conclusión

Este flujo de trabajo proporciona una robusta pipeline de CI/CD, gestionando la construcción, prueba, y despliegue de una aplicación en diferentes ambientes de EKS. Además, maneja la construcción y subida de imágenes Docker a ECR y puede iniciar flujos de trabajo adicionales mediante eventos personalizados.

## Links de Referencia:

- [ExpressJS Official Documentation](https://expressjs.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Official Documentation](https://docs.docker.com/)
- [AWS EKS Official Documentation](https://aws.amazon.com/eks/)
- [Kubernetes Official Documentation](https://kubernetes.io/docs/home/)
- [AWS ECR Official Documentation](https://aws.amazon.com/ecr/)

