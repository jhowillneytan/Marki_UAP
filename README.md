# Marki · UAP en Spring Boot

## Ejecutar

Requiere un JDK 17 o superior. En Windows, desde la carpeta del proyecto:

```powershell
.\mvnw.cmd spring-boot:run
```

En Linux o macOS: `./mvnw spring-boot:run`.

Abrir http://localhost:8080/. Spring Boot inicia su Tomcat integrado y sirve el frontend completo.
No se necesita Node.js ni instalar Tomcat por separado.

## Empaquetar y verificar

```powershell
.\mvnw.cmd clean package
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

La compilación ejecuta pruebas HTTP con Tomcat que comprueban la página inicial,
JavaScript, CSS, fuentes y archivos descargables, tanto en `/` como en `/marki/`.
También comprueban que los recursos inexistentes devuelvan 404.

Para cambiar el puerto o publicar bajo un prefijo:

```powershell
java -jar target/demo-0.0.1-SNAPSHOT.jar --server.port=8081 --server.servlet.context-path=/marki
```

En ese caso, abrir http://localhost:8081/marki/ (con la barra final).

## Rutas y frontend

El frontend está en `src/main/resources/static/`. Spring MVC publica `index.html`
en `/` automáticamente y sirve los recursos con sus rutas relativas originales.
No requiere Thymeleaf ni un controlador que intercepte todas las solicitudes.

Se conserva la navegación existente: `/#panel`, `/#nueva`, `/#expertos`,
`/#experto`, `/#stand`, `/#formulario`, `/#config`, `/#preparar`,
`/#informe/ID` y `/#kit/ID`. El fragmento `#…` lo procesa el navegador;
al recargar, Tomcat vuelve a servir la página inicial.

Los cálculos, PDF, QR, exportaciones y la integración opcional con Google siguen
ejecutándose en el navegador. Los datos siguen guardándose en el almacenamiento
local del navegador; esta integración no agrega una base de datos compartida.

**Migrar datos existentes:** antes de dejar la versión abierta como archivo local,
exportar el respaldo JSON e importarlo desde la versión servida por Spring Boot.
El almacenamiento del archivo local y el de `http://localhost:8080` son distintos.
Cambiar dominio, protocolo o puerto también crea un almacenamiento diferente.

La guía funcional está en `src/main/resources/static/LEEME.md`.
