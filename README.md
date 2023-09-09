# Hello-World App on EKS Demo

## Overview

Esta aplicación demostrativa, construida sobre ExpressJS, sirve como una representación de cómo implementar un flujo de trabajo CI/CD utilizando GitHub Actions, la integración con Semantic Release y el despliegue en un cluster EKS de AWS.

## Application Structure

### Codebase

- **`src/server.js`**: Archivo principal que arranca la aplicación Express. Por defecto, escucha en el puerto `8080` y en el host `0.0.0.0`.
- **`package.json`**: Define las dependencias y scripts del proyecto y configura `semantic-release`.

### CI/CD Setup

- **GitHub Actions**: Define los flujos de trabajo de CI/CD que se activan con distintos eventos.
- **Workflow Definitions**:
  - **`publish-build-as-artifact.yml`**: Construcción y publicación de la app como artefacto.
  - **`Continuous-Integration.yml`**: Gestión de la integración continua.
  - **`Continuous-Delivery-Deploy.yml`**: Flujo de despliegue.
  - **`release.yml`**: Generación automática de versiones con `semantic-release`.

### Dockerization

- **`Dockerfile`**: Instrucciones para construir la imagen Docker.

### Semantic Versioning

`semantic-release` automatiza la generación de versiones y changelogs basándose en las convenciones de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

### AWS EKS Deployment

La aplicación se despliega en AWS EKS con configuraciones específicas para cada entorno. Entornos desplegados en diferente Namespaces como ambientes aislados, sacando provecho de las diferente utilizades que nos entrega k8s: QA (`eks/deployment-qa.yaml`), Staging (`eks/deployment-stg.yaml`), y Producción (`eks/deployment-prd.yaml`).

## Getting Started

1. Clonar el repositorio: `git clone https://github.com/GioDelG/demo-helloapp.git`
2. Instalar dependencias: `npm install`
3. Iniciar la aplicación: `npm start`

## Contributing

Para colaborar:

1. Fork del repositorio.
2. Crea una rama con un nombre descriptivo.
3. Realiza tus cambios siguiendo [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
4. Abre una pull request al repositorio principal.

## Deployment Workflow Documentation

### Summary

Descripción del flujo de trabajo de GitHub Actions para CI/CD en EKS de AWS.

### Trigger Events

- `push` a `main`.
- `pull_request` a `main`.
- Manual activation con `workflow_dispatch`.

### Workflow Steps
#### **Continuous Integration**: Construcción y pruebas.
1. **Build-Application-Tests**: Construcción y ejecución de pruebas en plataforma `ubuntu-latest`.
2. **Publish Build as Artifact**: Publicación de la construcción como artefacto.
#### **Continuous Delivery and Deploy**: Despliegue en diferentes ambientes.
3. **Deploy-to-QA**: Despliegue en el ambiente QA.
4. **QA-EKS-Values**: Información sobre recursos desplegados en QA.
5. **Deploy-to-Stg**: Despliegue en el ambiente de Staging.
6. **Stg-EKS-Values**: Información sobre recursos en Staging.
7. **Manual-Approval**: Aprobación manual para producción.
8. **Deploy-to-Prod**: Despliegue en producción.
9. **Prod-EKS-Values**: Información sobre recursos en Producción.



### Conclusion

Esta pipeline de CI/CD asegura un flujo de trabajo robusto desde la construcción hasta el despliegue en ambientes EKS, complementado con la creación y gestión de imágenes Docker en ECR.

## References:

- **ExpressJS**:
  - [ExpressJS Official Documentation](https://expressjs.com/)

- **GitHub**:
  - [GitHub Official Documentation](https://docs.github.com/)
  - [GitHub Actions Documentation](https://docs.github.com/en/actions)
  - [GitHub Flow Guide](https://guides.github.com/introduction/flow/)

- **Conventional Commits**:
  - [Conventional Commits Official](https://www.conventionalcommits.org/en/v1.0.0/)
  - [Conventional Commits 1.0.0 Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)

- **Docker**:
  - [Docker Official Documentation](https://docs.docker.com/)
  - [Docker Compose Official Documentation](https://docs.docker.com/compose/)

- **Node.js & npm**:
  - [Node.js Official Documentation](https://nodejs.org/en/docs/)
  - [npm Official Documentation](https://docs.npmjs.com/)

- **AWS**:
  - [AWS Official Documentation](https://docs.aws.amazon.com/)
  - [AWS EKS Official Documentation](https://aws.amazon.com/eks/)
  - [AWS ECR Official Documentation](https://aws.amazon.com/ecr/)
  - [AWS CLI Documentation](https://aws.amazon.com/cli/)

- **Kubernetes**:
  - [Kubernetes Official Documentation](https://kubernetes.io/docs/home/)

- **Semantic Release**:
  - [Semantic Release Documentation](https://semantic-release.gitbook.io/semantic-release/)

- **Continuous Integration/Continuous Deployment**:
  - [Continuous Integration (Martin Fowler)](https://martinfowler.com/articles/continuousIntegration.html)
  - [Continuous Deployment Overview](https://www.atlassian.com/continuous-delivery/principles/continuous-integration-vs-delivery-vs-deployment)

---
```


  __  __           _        ____           _____ _          __  
 |  \/  |         | |      |  _ \         / ____(_)         \ \ 
 | \  / | __ _  __| | ___  | |_) |_   _  | |  __ _  ___    (_) |
 | |\/| |/ _` |/ _` |/ _ \ |  _ <| | | | | | |_ | |/ _ \     | |
 | |  | | (_| | (_| |  __/ | |_) | |_| | | |__| | | (_) |   _| |
 |_|  |_|\__,_|\__,_|\___| |____/ \__, |  \_____|_|\___(_) (_) |
                                   __/ |                    /_/ 
                                  |___/                         


```