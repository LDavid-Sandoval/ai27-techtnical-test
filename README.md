# Prueba técnica AI27

Esta prueba es realizada por David Sandoval, con el usuario de github https://github.com/LDavid-Sandoval

## Instalación

Se requiere clonar el repositorio del siguiente enlace: https://github.com/LDavid-Sandoval/ai27-techtnical-test

O por medio de SSH

```bash
  git clone git@github.com:LDavid-Sandoval/ai27-techtnical-test.git
```

Abrir la carpeta de archivos dentro de Visual Studio Code, para poder instalar dependencias requeridas.

```bash
  npm i
```

## Environment Variables

Se tiene que agregar in archivo .env con los siguientes valores, la configuración de los calores dependera del ambiente a ejecutar. Ya que por lo general estos valor son guardados en el provedor de servicio de CI/CD.

```bash
  MONGODB_USER=''
  MONGODB_PASSWORD=''
  MONGODB_CLUSTER=''
  MONGODB_URI=''
  HASH_PASSWORD=''
  URL_POKE_API=''
```

## Ejecución

Para ejecutar el proyecto, en producción, ejecuté lo siguiente

```bash
  npm start
```

Para ejecutar el proyecto, en desarrollo, ejecuté lo siguiente

```bash
  npm run dev
```

## Tests

Para ejecutar las pruebas unitarias, ejecuté lo siguiente

```bash
  npm run test
```

## API Reference

#### Get all items

```bash
  POST   /auth/register
  POST   /auth/login
  GET   /pokemon/:name
  GET   /pokemon/
  DELETE   /pokemon/delete-by-id/:id
  DELETE   /pokemon/delete-by-name/:name
  DELETE   /pokemon/delete-by-type/:type
```
