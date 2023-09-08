# Demo Hello World App

## Descripción

Esta es una aplicación demo basada en ExpressJS. Se diseñó para demostrar un flujo de trabajo CI/CD utilizando GitHub Actions, la integración con Semantic Release y la implementación en un cluster EKS.

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

... *(El contenido relacionado con EKS permanece igual)* ...

## Uso básico

... *(El contenido de Uso básico permanece igual)* ...

## Contribución

... *(El contenido de Contribución permanece igual)* ...

## Semantic Release

Para facilitar la gestión de versiones y releases, esta aplicación utiliza `semantic-release`. Aquí hay un resumen de cómo funciona:

1. Al hacer un `push` a la rama `main`, se activa el flujo de trabajo de GitHub Actions definido en `release.yml`.
2. Se instalan las dependencias y se ejecuta `semantic-release`.
3. `semantic-release` analiza los mensajes de commit para determinar el tipo de versión a generar (mayor, menor o parche).
4. Se genera automáticamente un changelog y se crea un release en GitHub.
5. Si todo va bien, se dispara un evento personalizado para manejar la creación de este nuevo release.

Se recomienda seguir las convenciones de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) al redactar mensajes de commit. Esto asegura que `semantic-release` pueda determinar correctamente la versión a generar.

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
- Se ejecuta después de `Build-Application-Tests` si el evento es un push a la rama `main`.
- Realiza acciones similares al job de QA para desplegar los recursos definidos en `eks/deployment-stg.yaml` y `eks/service-stg.yaml`.

### 5. Stg-EKS-Values

Al igual que el job de QA, recopila y muestra información pero del ambiente de Staging.
- Muestra detalles sobre los namespaces, deployments, services y pods en el namespace `staging`.

### 6. Deploy-to-Prod

Gestiona el despliegue en el ambiente de Producción.
- Se ejecuta después de completarse `Deploy-to-Stg`.
- Realiza acciones similares a los jobs anteriores para desplegar los recursos definidos en `eks/deployment-prd.yaml` y `eks/service-prd.yaml`.

### 7. Image-to-ECR

Construye una imagen Docker y la sube al Amazon ECR (Elastic Container Registry).
- Se ejecuta después de `Deploy-to-Prod`.
- Construye la imagen Docker y la etiqueta con el SHA del commit.
- Se conecta al registro de ECR y sube la imagen.

### 8. Prod-EKS-Values

Al igual que los jobs anteriores de valores EKS, recopila y muestra información pero del ambiente de Producción.
- Muestra detalles sobre los namespaces, deployments, services y pods en el namespace `production`.

### 9. Trigger Create Release

Si todo ha sido exitoso, este job dispara un evento personalizado `create-release` para posiblemente manejar la creación de un nuevo release en GitHub.

## Conclusión

Este flujo de trabajo proporciona una robusta pipeline de CI/CD, gestionando la construcción, prueba, y despliegue de una aplicación en diferentes ambientes de EKS. Además, maneja la construcción y subida de imágenes Docker a ECR y puede iniciar flujos de trabajo adicionales mediante eventos personalizados.

  
