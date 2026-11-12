# Marki · UAP

Plataforma del proyecto FEXCOIN 2026 «MARKI: herramienta para diagnosticar la presencia digital de los negocios de Cobija a partir de su información pública».
Carrera de Ingeniería Comercial · Marketing Digital (ICOM261). Plataforma versión 9.5.1 · rúbrica versión 1.3 (la rúbrica y los cálculos no cambiaron).

## 1. Cómo abrirla

Desde la raíz del proyecto, ejecuta `.\mvnw.cmd spring-boot:run` en Windows (JDK 17 o superior) y abre `http://localhost:8080/` en Google Chrome o Microsoft Edge. Spring Boot sirve la plataforma desde su Tomcat integrado. Consulta el `README.md` de la raíz para empaquetar o cambiar el puerto.

Si ya usabas `index.html` como archivo local, exporta antes un respaldo JSON e impórtalo en la versión del servidor: cada dirección tiene su propio almacenamiento del navegador. Los datos siguen guardándose localmente y las funciones de Marki se mantienen.

## 2. Secciones

| Sección | Para qué sirve |
|---|---|
| **Evaluar** | Registrar una marca, calificar los 21 indicadores y obtener el diagnóstico |
| **Resultados** | Promedio de Cobija, contraste de hipótesis, gráficos, confiabilidad, exportación de datos |
| **Investigación** | Juicio de expertos con la V de Aiken, opinión de los dueños y confiabilidad entre evaluadores |
| **Rúbrica imprimible** | Formulario en papel para los expertos y para capacitar a los evaluadores |
| **Pantalla del stand** | Resultados en vivo para el televisor del stand (se actualiza sola cada 8 segundos y anuncia cada diagnóstico nuevo de la Feria) |
| **Configuración** | Clave opcional de Google Maps para la búsqueda automática |

## 0.6 Formularios impresos y Google Forms (versión 9.5.1)

- Se aclararon dos preguntas y sus textos coinciden ahora en Marki y en los formularios impresos:
  - **D7.2:** la pregunta dice «página web o agrupador de enlaces (como Linktree)». Un enlace que solo abre WhatsApp u otra red social no cuenta.
  - **D4.1:** dice «si son más de 20, anota 20».
- En la carpeta `formularios/` está el script que crea en Google Forms la encuesta al dueño, la validación por expertos y la ficha de evaluación de respaldo. Incluye la función que calcula la V de Aiken a partir de las respuestas de los expertos. La ficha en Google Forms solo guarda las respuestas: el diagnóstico se obtiene al pasarlas a Marki.

## 0.7 Pregúntale a Marki (versión 9.5)

En el diagnóstico, debajo de «Lo que Marki encontró», hay una conversación con Marki. El dueño toca una pregunta sugerida o escribe la suya:

- ¿Por qué tengo este puntaje?
- ¿Qué pasa con [la dimensión más baja]?
- ¿Qué hago primero?
- ¿Cuánto podría subir?
- ¿Qué hago bien?
- ¿Cómo estoy frente a Cobija?
- Dame un texto para publicar.

Si escribe, Marki reconoce palabras clave (reseñas, Google, precios, publicar, anuncios, WhatsApp…) y responde sobre esa dimensión con los datos del negocio.

**Cómo funciona y por qué así.** No usa un modelo de lenguaje: cada respuesta se arma con los datos registrados y el mismo motor de reglas del diagnóstico. Por eso funciona sin internet, no tiene costo y no inventa: si la pregunta no tiene que ver con el diagnóstico, lo dice. Ante el jurado se describe como una **interfaz conversacional basada en reglas, explicable y verificable**. Un asistente por WhatsApp para dar seguimiento al plan es una proyección futura del proyecto.

No aparece al imprimir ni en el PDF.

## 0.8 Apariencia: el radar como sello de Marki (versión 9.4)

- **Revelación del resultado.** En computadora se muestra en dos columnas: a la izquierda las 7 dimensiones y a la derecha un radar que «escanea» mientras Marki revisa. Al final aparece el índice en un anillo grande con un brillo del color del nivel. El botón principal va en dorado castaña para destacar sobre el azul. En celular, las cifras «el dueño creía» quedan en una sola fila y los botones ocupan todo el ancho.
- **Pantalla del stand (televisor).** Ocupa toda la pantalla sin espacios vacíos y los tamaños se ajustan a la altura del televisor para leerse a unos 3 metros. Se agregó el llamado «¿Y tu negocio? Pide tu diagnóstico gratis aquí». Se probó en 1920 × 1080 y en 1366 × 768.
- **Inicio.** El radar de ejemplo se dibuja al abrir la página. Sin datos, en lugar de «0 · – · 0» se muestran 21 indicadores, 7 dimensiones y 0 Bs de costo. Las dimensiones llevan su ícono. En celular, los botones ocupan todo el ancho.
- **Movimiento con criterio.** Las animaciones se apagan si el equipo tiene activada la opción de reducir el movimiento y nunca aparecen al imprimir.

## 0.9 Auditoría completa de coherencia (versión 9.3)

Se recorrieron todas las pantallas en computadora y en celular, se leyeron todos los textos y se probaron casos límite. Se corrigió:

- **Casos sin datos.** Sin reseñas, Marki ya no muestra la pregunta de respuestas a reseñas y desactiva la calificación; sin comentarios o sin Facebook ni Instagram, el indicador no se aplica solo. Los textos ya no le piden al estudiante marcar «No se pudo evaluar».
- **Negocio con todo en 100.** El diagnóstico ya no dice «lo que más falta» ni marca una etapa del recorrido como «aquí se pierden más clientes» cuando no hay diferencias.
- **Acciones.** Ya no repiten el dato que se ve en «Lo que vimos». La acción de frecuencia dice «Retoma» solo si el negocio dejó de publicar.
- **Textos.** El simulador habla de tú; las semanas del plan tienen nombres neutros; los formatos usan los mismos nombres que en la rúbrica; «1 evaluación sin respaldo» en singular; el pie de inicio dice si los datos también se copian en la hoja de Google.
- **Pantalla.** El panel lateral ya no muestra «0» antes de empezar; Interacción y Venta tienen enlace a TikTok (y a WhatsApp en Venta); en celular, el menú indica que se desliza.
- **Pruebas.** Nuevas pruebas de casos límite (nombre largo con símbolos, solo TikTok, sin reseñas, todo en 0, todo en 2 y aplicación vacía): sin errores, sin textos «undefined», sin desbordes y con PDF de 2 páginas.

## 1.0 Preguntas más claras y dinámicas (versión 9)

- **Preguntas en lenguaje simple.** Las 33 preguntas que responde el evaluador se reescribieron en lenguaje simple, y 28 tienen debajo un ejemplo concreto. Por ejemplo: «¿Cuántas publicaciones muestran algo más que una oferta?» con el ejemplo «Cómo preparan, quién atiende, un cliente contento o un consejo útil. Cuenta de 0 a 9». Las reglas no cambian.
- **Cada indicador muestra:**
  - **qué mide**, en una frase;
  - **dónde mirar**;
  - botones grandes **✓ Sí / ✕ No**;
  - contadores con **− / +** y puntos que se llenan («2 de 9»).
- **Medidor de nivel.** Se enciende en cuanto Marki decide: rojo para «Nivel 0 · Por mejorar», ámbar para «Nivel 1 · En camino» y verde para «Nivel 2 · ¡Muy bien!».
- **Regla.** «¿Cómo decide Marki?» muestra la regla solo si se pide.
- **Versión 9.2.** Los 6 indicadores que se responden con un dato (ficha de Google, publicaciones en 30 días, formatos, tiempo de respuesta, reseñas y calificación) usan el mismo estilo: una pregunta directa con un ejemplo, botones para marcar y contadores. Los minutos avanzan de 5 en 5 y la calificación empieza en 4,0. Cuando Marki decide un nivel, se resalta el siguiente indicador pendiente.
- **Google Maps.** Si se usa la búsqueda en Google Maps (Configuración), Marki completa también el teléfono, la dirección y el horario de Google para comparar los canales (D2.2), y marca si tiene sitio web (D7.2).
- **Al terminar cada dimensión,** la pestaña se anima y aparece su puntaje, por ejemplo «✓ Identidad de marca lista: 100 de 100».
- **Movimiento.** Las animaciones se desactivan si el equipo tiene activada la opción de reducir movimiento.

## 1.1 Rúbrica 1.3 y preguntas para los expertos (versión 8.7)

Se revisó la redacción pensando en los expertos que validarán Marki.

- **Rúbrica 1.3.** Los 21 indicadores son los mismos de la versión 1.2, y las reglas también, salvo D7.1. Lo que cambia es la redacción:
  - Cada indicador tiene un **«Qué mide»** en lenguaje simple.
  - Los niveles de D1.2, D2.1, D2.2, D3.3, D4.1, D4.2, D5.3, D6.1, D6.2 y D7.2 se reescribieron para que digan exactamente lo que aplica la regla de Marki, con cantidades cuando corresponde (por ejemplo, «3 o más de 9»). Antes, D2.2 decía «diferencias menores» en el nivel 1, mientras que la regla da 1 cuando ningún dato se contradice pero falta alguno.
  - También se revisaron D1.1, D1.3, D3.1, D3.2, D4.3 y D6.3: qué cuentas se revisan, que las historias no cuentan como publicaciones, el caso de 0 publicaciones, el tipo de consulta de prueba y los límites entre niveles.
- **D7.1 Anuncios en Meta (cambio de regla).** La Biblioteca de anuncios de Meta muestra los anuncios comerciales solo mientras están activos; fuera de la Unión Europea, los anteriores no aparecen. Por eso el nivel 1 anterior («tuvo anuncios, pero ninguno activo») no se podía observar en Bolivia. La nueva regla es: sin anuncios activos, 0; un anuncio activo, 1; dos o más, 2.
- **Negocios con una sola red (versión 8.12).** Marki no premia la cantidad de redes, sino lo bien que el negocio usa las que tiene. Por eso:
  - En D7.1, si el negocio no tiene Facebook ni Instagram, el indicador no se evalúa y no resta puntos.
  - En D4.3, el mensaje de prueba puede enviarse por el mensaje directo de la red principal (por ejemplo, TikTok), además de WhatsApp o Messenger.
- **Preguntas al experto** basadas en la planilla de Escobar-Pérez y Cuervo-Martínez (2008), con cada respuesta descrita:
  - **Relevancia:** «¿Este indicador debe estar en Marki para medir la presencia digital?» 1 se puede quitar · 2 poco relevante, otro indicador ya mide lo mismo · 3 relevante · 4 muy relevante, debe estar en Marki.
  - **Claridad:** «¿El indicador y sus tres niveles se entienden?» 1 no se entiende · 2 necesita muchos cambios · 3 necesita un cambio menor · 4 es claro.
  - **Suficiencia, al final de cada dimensión:** 1 no bastan · 2 miden solo una parte · 3 falta algún indicador · 4 son suficientes. Incluye un comentario opcional.
- **Qué ve el experto.** Para cada indicador ve el qué mide, dónde se observa y los tres niveles. La pantalla Investigación muestra la V de suficiencia por dimensión y los comentarios. El formulario impreso usa las mismas preguntas y escalas.
- **Coherencia.** No se pregunta la cuarta categoría de la planilla para que el formulario tome unos 4 minutos; la relevancia y la suficiencia cubren lo esencial. Si se dispone de más tiempo, puede agregarse.
- **Aviso.** El documento entregado a la Feria describe la rúbrica 1.2. Los indicadores son los mismos. Mejoró la redacción y se corrigió la regla de D7.1 para que se pueda observar.

## 1.2 Investigación: expertos, dueños y evaluadores (versión 8.5)

La pantalla **Investigación** reúne la evidencia para validar Marki. No hace falta para evaluar negocios.

- **Juicio de expertos con la V de Aiken.** Reemplaza la razón de Lawshe, que con 5, 6 o 7 expertos exige acuerdo total. El estudiante entrevista a cada experto y marca sus respuestas directamente en Marki: una pestaña por experto, con su nombre y profesión. Para cada indicador, el experto califica de 1 a 4 la relevancia y la claridad.
- **Cómo calcula Marki.** V = S / [n (c − 1)], con c = 4 (Aiken, 1985). El intervalo de confianza del 95 % se obtiene por el método score (Penfield y Giacobbi, 2004).
- **Decisión por indicador:**
  - **Se mantiene:** relevancia y claridad ≥ 0,70.
  - **Mejorar la redacción:** relevancia ≥ 0,70, pero claridad menor.
  - **Revisar o eliminar:** relevancia menor que 0,70.
- **Formulario impreso.** Usa la misma escala de 1 a 4. Se recomiendan 5 expertos o más.
- **«Responder como experto» (2 minutos).** Es un asistente con una dimensión por paso y botones grandes, para que un docente, o un miembro del jurado en la feria, responda solo. Cada respuesta se guarda como un experto más.
- **Ejemplo con datos ficticios.** Muestra 7 expertos inventados para explicar cómo funciona la validación. Siempre aparece con un aviso, no se guarda, no se exporta y no se mezcla con los datos reales. No debe presentarse como resultado de la investigación.
- **Opinión del dueño (devolución).** Al final de cada diagnóstico hay 3 preguntas:
  1. ¿El diagnóstico describe bien tu situación? (1 a 5)
  2. ¿Las acciones son útiles y posibles? (1 a 5)
  3. ¿Aplicarás alguna el próximo mes? (sí, tal vez o no)

  Las respuestas se guardan con la evaluación, van al CSV y a Google Sheets (columnas `dueno_…`), y se resumen en porcentajes en Investigación.
- **Confiabilidad entre evaluadores.** Muestra el CCI y el kappa cuando el mismo negocio se evaluó dos veces, por dos estudiantes distintos y sin ver la primera evaluación. Desde la versión 8.10 ya no se pide el código del evaluador, porque no cambia el resultado y confundía.

## 1.3 Diagnóstico redactado con los datos de cada negocio (versión 8.2)

El archivo `redactor.js` convierte lo que se registró en frases concretas. Es un sistema de reglas: no usa internet ni inventa datos. Si falta un dato, la frase se omite o se usa el texto general de la rúbrica.

- **Lo que Marki encontró.** Es un párrafo al inicio del informe, en el PDF y en el mensaje al dueño. Dice cuál es la dimensión más fuerte y cuál la más débil, y describe el patrón del caso (por ejemplo: «quien te sigue te conoce, pero quien busca en Google o ChatGPT no te encuentra»). También incluye un hallazgo que no se repite en las acciones.
- **Lo que vimos.** Cada acción prioritaria muestra la evidencia. Ejemplos:
  - el teléfono distinto en Instagram;
  - los negocios que ChatGPT sí nombró;
  - cuántas reseñas de 5 estrellas faltan para llegar a 4,5;
  - qué publicación no dice cómo pedir.
- **Acciones con sus datos.** Cada acción incluye el teléfono, el horario, la dirección o los números del propio negocio, y usa el vocabulario de su rubro: menú, tarifas por noche, citas o catálogo.
- **Plan realista.** Hay tres acciones por semana como máximo. La semana 1 corresponde a las 3 prioritarias, y el resto queda para después del primer mes.
- **Kit.** Los textos usan el horario, la dirección y el WhatsApp registrados. Si hay una publicación sin llamado a la acción, el kit muestra cómo quedaría mejorada. Si en alguna publicación se escribió «precio por interno», el kit propone el texto con el precio a la vista. También incluye una descripción para Google y los asistentes de IA. Los textos se ordenan según lo que más conviene mejorar.
- **Correcciones:**
  - el kit decía «no tiene ficha de Google» aunque el negocio sí la tenía;
  - «Gracias a todos…» se contaba como contenido de valor;
  - el tiempo de respuesta se mostraba en dos formatos distintos;
  - «Whatsapp» aparecía mal escrito;
  - en las fortalezas aparecían frases negativas.
- **Impresión.** El informe impreso y el PDF del dueño caben en 2 hojas en todos los perfiles de prueba, incluido el caso extremo, que antes ocupaba 3.

## 1.4 Dónde se guardan los datos (versión 8.1)

- **En el equipo.** Marki guarda cada evaluación en el navegador donde se usa (Chrome o Edge). Es inmediato y funciona sin internet. Si se borran los datos del navegador o se usa una ventana de incógnito, se pierde lo guardado; por eso existe el respaldo (Resultados → Descargar respaldo).
- **Copia en Google Sheets (recomendado).** En Configuración se conecta una hoja de cálculo de Google mediante Apps Script. Cada evaluación terminada se envía en segundo plano, sin hacer más lenta la herramienta. Sin internet, queda en espera y se sube sola al volver la conexión. Resultados muestra «todo subido» o cuántas esperan.
- **Cómo conectarla.** El código está en `apps_script/Codigo.gs` y también en Configuración, con el botón «Copiar el código» y los pasos. Se implementa como *Aplicación web* («Ejecutar como: Yo», «Quién tiene acceso: Cualquier persona») y se pega la dirección que termina en `/exec`. Se recomienda escribir una clave compartida en el código y en Marki.
- **Qué recibe la hoja.** Las mismas columnas que el CSV ancho de Resultados, más la columna `recibido`. Una evaluación corregida reemplaza su fila. Borrar una evaluación en Marki no la borra de la hoja. Las evaluaciones de prueba no se envían.
- **Varios evaluadores.** Si cada equipo tiene la misma dirección configurada, todas las evaluaciones llegan a la misma hoja.
- **Expertos en la hoja (versión 8.9).** Las respuestas de cada experto llegan a una pestaña aparte, «Expertos», con una fila por experto: relevancia y claridad de los 21 indicadores, suficiencia de cada dimensión y comentarios. Se envían al terminar «Responder como experto» y al cambiar una respuesta en Investigación. Sin internet, quedan en espera como las evaluaciones.
- **Actualizar el código.** Quien ya tenía la hoja conectada debe volver a pegar `apps_script/Codigo.gs` y usar **Implementar → Gestionar implementaciones → Editar → Versión nueva**, para que la dirección no cambie.

## 1.5 Datos de entrada y pantalla por partes (versión 8)

En la versión 8 la persona que evalúa solo registra datos. Marki los lee y responde por ella las preguntas de la rúbrica.

- **Datos de entrada (primera pestaña).** Tiene tres partes:
  1. **Textos de las publicaciones.** Se pega el texto de cada una de las últimas publicaciones (hasta 9). Marki busca precios («Bs 25», «a solo…»), llamados a la acción («pide», «escríbenos», «consulta disponibilidad»), promociones y resultados medibles, y contenido que aporta valor (consejos, recetas, cómo se hace). Con eso responde D3.3, D6.1, D6.2 y D7.3. Si un texto dice «precio por interno», cuenta como **sin precio**.
  2. **Datos de contacto por canal.** Se anotan el teléfono, la dirección y el horario que aparecen en Google Maps, Facebook, Instagram, TikTok y WhatsApp. Marki los compara: los teléfonos por sus últimos 8 dígitos, las direcciones por palabras en común y los horarios por las horas. Con eso decide D2.2 y muestra qué dato se contradice y dónde.
  3. **Respuestas de ChatGPT.** Se pegan las dos respuestas. Marki detecta si el negocio aparece recomendado, si la IA lo reconoce o si dice que no tiene información. Con eso decide D2.3.
- **Pestañas.** La rúbrica se muestra por partes: Datos, y las 7 dimensiones. Cada pestaña muestra su avance (por ejemplo, 2/3) y un visto bueno al completarse. El botón «Siguiente» de cada parte lleva a la siguiente.
- **Nivel provisional.** Mientras faltan indicadores, el panel lateral dice «Nivel provisional».
- **Etiquetas.** «Nivel decidido por Marki» indica que el nivel salió de la regla. «Ajustado a mano» indica que alguien eligió otro nivel; queda registrado. «Leído por Marki» marca las preguntas respondidas a partir de los Datos de entrada.
- **CSV.** La columna `observaciones` incluye las respuestas a las preguntas (campos `p_…`), para que se pueda auditar cómo se decidió cada nivel.
- **Corregido en esta versión.** En laptops (1366 px) la fila de pestañas empujaba el panel lateral fuera de la pantalla. Al pasar a la parte siguiente, la pantalla ahora sube al inicio de esa parte, también en el celular.

**Base de la mejora.** Se revisaron herramientas similares. Moz Local y Yext verifican que el nombre, la dirección y el teléfono sean iguales en todos los directorios; de ahí sale la comparación de datos por canal. Las auditorías de redes sociales (por ejemplo, la guía de Insites) revisan publicación por publicación; de ahí sale la lectura de textos. Los autodiagnósticos de madurez digital para pymes (por ejemplo, la herramienta DMAT de la Unión Europea) asignan el nivel con reglas fijas a partir de respuestas concretas; ese es el principio de las preguntas de sí o no.

**Lo que todavía responde una persona.** Marki no entra a Facebook ni a Instagram: esas páginas piden iniciar sesión y su lectura automática requiere autorización de Meta. Por eso hay preguntas que se responden mirando: logotipo y estilo visual (D1.x), comentarios y respuestas (D4.x) y si hay catálogo o tienda (D6.1). Aun así, en todas ellas el nivel lo decide la regla, no la persona.

## 1.6 Marki decide el nivel (versión 7)

- **Los 21 indicadores los decide Marki.** El evaluador ya no elige el nivel: responde preguntas sobre hechos que ve (sí o no, o un conteo) y Marki aplica una regla fija. Por ejemplo, en «Respuesta a reseñas» se registra cuántas de las últimas 10 reseñas tienen respuesta y si respondió las negativas.
- **La rúbrica no cambió:** los indicadores y los criterios de los niveles 0, 1 y 2 son los mismos de la versión 1.2. Las reglas solo convierten cada criterio en preguntas observables. Están en `reglas.js` y se muestran debajo de cada indicador y en el formulario de juicio de expertos, para que los expertos también las validen.
- **Definiciones:** «la mayoría» es más de la mitad de lo revisado; «un tercio» es al menos un tercio. Arriba de la rúbrica se indica cuántas publicaciones se revisan (las últimas 9 o las que tenga).
- **Ajuste a mano:** si una regla no se ajusta a un caso raro, el evaluador puede elegir otro nivel; el indicador queda marcado «Ajustado a mano» y el diagnóstico informa cuántos indicadores decidió Marki (por ejemplo, «20 de 21 decididos por Marki»).
- **Por qué importa para la investigación:** con preguntas sobre hechos, dos evaluadores deberían coincidir más que eligiendo entre descripciones. Es lo que mide la hipótesis de confiabilidad (H1).
- **Rubros:** 18 opciones pensadas para Cobija (incluida «Importadora o tienda de zona franca») y «Otro» con un campo para escribir cuál. Las evaluaciones guardadas con los rubros anteriores siguen funcionando.
- La exportación CSV agrega el detalle del rubro, cuántos indicadores decidió Marki y las respuestas a las preguntas de observación.

## 1.7 Enviar el diagnóstico al dueño (versión 6.1)

Botón **«Enviar al dueño»** en la revelación, el diagnóstico y el kit. Crea al instante un **PDF de 2 hojas** (resultado, dimensiones, recorrido del cliente, datos observados, códigos QR para su local, lo que ya hace bien, por dónde empezar, metas medibles y plan de 30 días). Solo en el caso extremo de un negocio con casi todos los indicadores en 0, el plan pasa a una tercera hoja.

- **Compartir el PDF:** si el navegador lo permite (Chrome o Edge en Windows 10/11, Android), abre el panel de compartir del sistema y el PDF se envía directamente a WhatsApp, al correo u otra aplicación instalada.
- **Enviar por WhatsApp:** descarga el PDF y abre el chat con el número del dueño y un mensaje listo; solo falta adjuntar el PDF (clip o arrastrar). WhatsApp no permite adjuntar archivos de forma automática desde un enlace.
- **Enviar por correo:** descarga el PDF y abre el programa de correo con el asunto y el mensaje listos; solo falta adjuntar el PDF.
- El número y el correo **no se guardan** en Marki ni en los respaldos: se usan solo en ese momento.
- Recomendación: usar en la laptop del stand un WhatsApp y un correo institucionales o del equipo, no personales.
- El envío totalmente automático (sin adjuntar a mano) necesita un servidor y la API de WhatsApp Business, que es de pago; queda como mejora futura.

## 1.8 Identidad visual (versión 6)

- **Colores institucionales:** franja superior azul UAP (#1F3864) con filete rojo UAP (#8B0000); ámbar de la castaña para el punto del logotipo y el foco del teclado. Los colores de nivel (Inicial, Básico, Intermedio y Avanzado) se usan solo para resultados.
- **Tipografías incluidas en `fonts/`** (funcionan sin internet, licencia SIL OFL 1.1): Bricolage Grotesque para títulos y cifras; Atkinson Hyperlegible Next, diseñada para lectura fácil, para el texto. Los números del texto usan Bricolage para que el cero no aparezca tachado.
- **Superficies planas** con bordes en lugar de sombras, etiquetas en mayúscula y minúscula, botones sin flechas, textos claros en lugar de emojis en la rúbrica («Dónde revisar», «Dato que calcula el nivel»).
- **Corrección importante:** la cabecera y el panel del puntaje en vivo vuelven a quedarse fijos al desplazarse por la rúbrica (una regla para celulares de la versión 3 lo había desactivado).
- Respeta la preferencia del sistema de reducir animaciones y muestra el foco del teclado.
- El tema está en `tema.css`; si se borra esa línea de `index.html`, la plataforma vuelve al estilo anterior sin perder funciones.

## 1.9 Revisión de calidad (versión 5.1)

Se probaron, de forma automática y en un navegador real, 36 casos: funcionamiento sin internet, nombres con comillas, signos y tildes, la regla de «no aplica» sin reseñas, el mínimo de 14 indicadores, los atajos de teclado, nombres muy largos, filtros, exportación CSV y JSON, importación sin duplicados, borrado, juicio de expertos (Lawshe), formulario imprimible, evaluaciones de versiones anteriores, enlaces inexistentes y el botón Atrás. También se probaron todas las pantallas en celulares de 360 y 390 px y en tabletas de 768 px.

Correcciones de esta revisión:
- El QR «Tu diagnóstico en tu celular» era demasiado denso con nombres largos y no se podía leer. Ahora lleva un texto más corto y sin tildes. Los tres QR del kit se leyeron correctamente en pantalla y en la hoja impresa, incluso con el nombre más largo posible.
- Con muchos indicadores en 0 o 1, el diagnóstico impreso ocupaba 3 hojas. Ahora el plan se reparte en columnas parejas y siempre cabe en 2 hojas, y el kit en 1.
- Los atajos de teclado de la rúbrica ya no siguen activos durante la revelación ni al volver a los datos de la marca.
- El formulario de expertos y el pie del diagnóstico usaban el nombre antiguo («Índice de Madurez de Marketing Digital»); ahora dicen Marki y presencia digital, como el documento.

## 2.0 Novedades de la versión 5

- **Preparar la Feria** (Inicio → Preparar la Feria): revisión automática (datos de prueba, navegador que guarda, respaldo, Google) y lista del equipo con casillas (prueba completa, QR, energía, internet, impresos, roles, guion, autorización). Botón para abrir la pantalla del stand en otra ventana.
- **Datos de prueba:** si se cargaron los datos simulados de `verificacion/datos_simulados.json`, Inicio y Resultados lo avisan y el televisor muestra la etiqueta «Datos de prueba». El botón «Borrar datos de prueba» descarga antes un respaldo y borra solo esas evaluaciones.
- **Pantalla de atracción:** mientras no haya al menos 3 diagnósticos, el televisor muestra una invitación grande («¿Tu negocio aparece cuando un cliente lo busca?»), los 3 pasos, las 7 dimensiones, un dato verificado y el contador de diagnósticos de la Feria. Con 3 o más pasa al panel de resultados (antes no se muestra un promedio, para no revelar el resultado de un negocio).
- Se adapta a televisores de 1366 × 768 y de 1920 × 1080.

## 2.1 Novedades de la versión 4

- **Demostración para el jurado:** en Inicio, «▶ Ver una demostración» muestra en un minuto el recorrido completo con un negocio ficticio (alterna entre dos ejemplos). Está marcado como «Ejemplo ficticio» y nunca entra en los resultados ni en la pantalla del stand.
- **El recorrido de tu cliente:** el diagnóstico agrupa las dimensiones en cinco etapas (te encuentran, te reconocen, confían en ti, te contactan y te compran) y señala dónde se pierden más clientes.
- **Metas medibles para 30 días:** para los indicadores con datos (reseñas, calificación, publicaciones, formatos, tiempo de respuesta y ficha de Google) muestra el valor de hoy y la meta, que es el criterio del nivel más alto de la rúbrica.
- **Imagen para redes:** desde el diagnóstico o el kit se descarga una imagen de 1080 × 1350 con el puntaje, el nivel y la meta a 30 días, lista para publicar en Facebook o Instagram.
- **Tiempo de revisión:** cada evaluación registra cuántos minutos tomó; el panel muestra el tiempo típico (mediana).
- **Aviso de respaldo:** con 3 o más evaluaciones sin respaldo, Inicio y Resultados muestran un aviso con el botón para descargarlo.
- **Pantalla del stand:** el recuadro inferior alterna los datos verificados con «¿Cómo funciona Marki?».
- **Logotipo propio:** una M que también es una línea de tendencia que sube.

## 2.2 Novedades de la versión 3

- **Revelación del resultado:** al terminar, una pantalla presenta las 7 dimensiones una por una y luego el índice y el nivel. Es el momento para mostrarle al dueño en el stand. Toca la pantalla para saltar la animación.
- **«¿Cuánto crees que tienes?»:** en la Feria, antes de evaluar, se le pregunta al dueño qué puntaje cree tener (0 a 100). El diagnóstico compara su estimación con su presencia real, y la pantalla del stand muestra el promedio de lo que creen los dueños frente a lo que ve el cliente.
- **Simulador «¿Y si mejoras?»:** en el diagnóstico, el dueño activa las acciones que se compromete a hacer y ve cómo subirían su índice y su nivel. El diagnóstico impreso indica cuánto subiría el índice si cumple las tres acciones prioritarias.
- **Kit de mejora:** una hoja con tres códigos QR (su diagnóstico en WhatsApp, reseñas en Google o crear su ficha, y pedidos por WhatsApp o activar WhatsApp Business) y textos listos para copiar, elegidos según lo que le falta al negocio.
- **Búsqueda automática en Google Maps (opcional):** con una clave de Google, Marki trae la ficha, las reseñas, la calificación, el horario, el teléfono y el sitio web, y llena solos D2.1, D5.1 y D5.2. El evaluador siempre puede corregirlos.
- **Borrador automático:** si se cierra la página o se toca otro menú a mitad de una evaluación, al volver a «Evaluar» aparece «Retomar».
- **Corregir una evaluación** guardada desde su diagnóstico, sin crear una evaluación duplicada.
- **Atrás y refrescar funcionan:** cada pantalla tiene su propia dirección (por ejemplo, `#informe/…`).
- **Celular:** el menú se desliza de lado y ninguna pantalla se sale del ancho.
- **Correcciones:** la ficha de Google sin la casilla «Tiene ficha» vale 0 aunque tenga otras casillas marcadas; los seguidores aceptan «2,3 mil» o «2.3k»; el plan de 30 días ya no repite las tres acciones prioritarias.

## 3. Cómo evaluar una marca

1. Escribe el nombre, tu código de evaluador (E1, E2…), el rubro, la red social principal (la que tiene más seguidores) y el número de seguidores. Los enlaces del negocio son opcionales, pero hacen la revisión más rápida.
2. Elige **Estudio** (muestra de la investigación) o **Feria** (el responsable está presente; hay que marcar su autorización).
3. En la rúbrica, cada dimensión tiene botones que abren Google Maps, Facebook, Instagram, TikTok, ChatGPT o la Biblioteca de anuncios de Meta con el nombre del negocio.
4. **Indicadores calculados con datos (⚡).** En seis indicadores escribes el dato y la plataforma asigna el nivel con los cortes de la rúbrica:

| Indicador | Dato que se registra | Nivel 0 | Nivel 1 | Nivel 2 |
|---|---|---|---|---|
| D2.1 Ficha de Google Maps | Casillas: tiene ficha, categoría, horario, teléfono, ubicación, fotos | Sin ficha | Ficha incompleta | Las 6 casillas |
| D3.1 Frecuencia | Publicaciones en 30 días | 0 | 1 a 7 | 8 o más |
| D3.2 Formatos | Casillas de formatos usados | 0 o 1 | 2 | 3 o más |
| D4.3 Respuesta a un mensaje | Minutos hasta la respuesta | Sin respuesta en 24 h | 60 min a 24 h | Menos de 60 min |
| D5.1 Reseñas | Número de reseñas en Google | 0 | 1 a 19 | 20 o más |
| D5.2 Calificación | Calificación promedio | Menor a 4,0 | 4,0 a 4,4 | 4,5 o más |

   Si el negocio tiene 0 reseñas, D5.2 y D5.3 se marcan solos como «No se pudo evaluar», para no castigar dos veces la misma ausencia.
5. **Atajos de teclado:** `0`, `1`, `2` califican el indicador marcado; `N` lo marca como «No se pudo evaluar»; `↑` y `↓` mueven entre indicadores.
6. Se necesitan al menos 14 de los 21 indicadores evaluados. El diagnóstico incluye el índice, el nivel, el gráfico de radar, la comparación con Cobija y con su rubro, los datos observados, las fortalezas, las tres primeras acciones y un plan de 30 días. Se imprime en dos hojas A4.

## 3.1 Búsqueda automática en Google Maps (opcional)

1. Entra a console.cloud.google.com, crea un proyecto y activa la facturación (Google pide una tarjeta y da un uso mensual gratuito; revisa los precios vigentes).
2. Habilita **Maps JavaScript API** y **Places API (New)**.
3. Crea una **clave de API** y restríngela a esas dos API.
4. En Marki: **Inicio → Configuración**, pega la clave, guarda y pulsa **Probar**.

La clave se guarda solo en esa computadora y no viaja en los respaldos. Sin clave, Marki funciona igual con la revisión manual. En el estudio, el evaluador debe revisar en Google Maps que los datos traídos sean los del negocio correcto.

## 4. Reglas para la confiabilidad (muestra del estudio)

- La segunda evaluación la hace **otra persona**, **sin ver** la primera y dentro de las **48 horas** siguientes.
- Las dos personas deben escribir el nombre del negocio **igual**: así la plataforma las empareja.
- El mensaje de prueba (D4.3) se envía **una sola vez**. El segundo evaluador usa la misma captura y registra los mismos minutos.
- Pregunta siempre a ChatGPT en su versión gratuita, sin iniciar sesión y en una conversación nueva.

## 5. Resultados y contraste de hipótesis

En **Resultados → Estudio** la plataforma calcula con los datos guardados:

- **H1:** CCI(2,1) del índice y kappa ponderada cuadrática de los indicadores.
- **H2:** prueba de Friedman entre las 7 dimensiones, con W de Kendall y rangos medios.
- **H3:** correlación de Spearman entre el índice y los seguidores, con su valor p.

También muestra la distribución del índice, la dispersión índice–seguidores, el mapa por rubro y dimensión, las brechas más frecuentes y los datos observados (reseñas, calificación, publicaciones, tiempo de respuesta, fichas completas). Las comparaciones de Wilcoxon y los intervalos de confianza del CCI se calculan en JASP o Python con el CSV.

## 6. Datos

- Se guardan **solo en esa computadora y en ese navegador**. Descarga el **respaldo (JSON)** al final de cada día.
- Para juntar computadoras: **Importar respaldo** en la principal. Las evaluaciones repetidas no se duplican.
- **CSV ancho:** una fila por evaluación (índice, dimensiones, 21 indicadores, datos observados, enlaces, estimación del dueño y datos de Google).
- **CSV largo:** una fila por indicador, con la marca de si fue calculado con datos y la nota de evidencia.
- En el estudio, el promedio de Cobija usa **una evaluación por negocio** (la primera).

## 7. Cálculo

- Dimensión = suma de sus indicadores ÷ máximo posible × 100 (los «No se pudo evaluar» no cuentan).
- Índice = promedio de las 7 dimensiones, con el mismo peso.
- Niveles: Inicial 0–24 · Básico 25–49 · Intermedio 50–74 · Avanzado 75–100 (cortes iniciales).
- Prioridad de las recomendaciones: impacto (alto 3, medio 2) × 2 + facilidad (esfuerzo bajo 3, medio 2, alto 1) + 1 si el indicador está en 0. El plan de 30 días agrupa las acciones por esfuerzo.

## 8. Verificación de los cálculos

La carpeta `verificacion` tiene evaluaciones simuladas (no son negocios reales) y `verificar.py`, que recalcula en Python el CCI(2,1), la kappa ponderada, la prueba de Friedman y la correlación de Spearman sin usar la plataforma.

1. En una computadora sin datos reales, ve a **Resultados → Importar respaldo** y elige `verificacion/datos_simulados.json`.
2. Ejecuta `python verificar.py` (necesita numpy, scipy y scikit-learn).
3. Compara: CCI(2,1) = 0,91; kappa ponderada = 0,33; Friedman χ²(6) = 4,24, p = 0,644; Spearman rho = 0,15, p = 0,675. Son datos simulados: los valores solo sirven para comprobar que el cálculo coincide.

## 9. Licencias

`fonts/`: Bricolage Grotesque (© The Bricolage Grotesque Project Authors) y Atkinson Hyperlegible Next (© Braille Institute of America), licencia SIL Open Font License 1.1; ver los archivos LICENCIA en esa carpeta.

`lib/jspdf.umd.min.js`: jsPDF 4.2.1, © James Hall y yWorks GmbH, licencia MIT (ver `lib/LICENCIA_jsPDF_MIT.txt`).

`lib/qrcode.js`: QR Code Generator for JavaScript, © Kazuhiko Arase, licencia MIT. «QR Code» es marca registrada de DENSO WAVE INCORPORATED.
