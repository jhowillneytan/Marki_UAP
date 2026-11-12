/**
 * MARKI · Crear los formularios de Google Forms
 * Universidad Amazónica de Pando · Marketing Digital ICOM261 · Ing. Jimmy Luis Laruta Villarreal
 *
 * Cómo usarlo (una sola vez):
 *  1. Entra a https://script.google.com con tu cuenta de Google y pulsa «Nuevo proyecto».
 *  2. Borra lo que aparece, pega TODO este archivo y guarda (Ctrl + S).
 *  3. Arriba elige la función «crearFormularios» y pulsa «Ejecutar».
 *  4. Google te pedirá permiso: «Revisar permisos» → tu cuenta → «Avanzado» → «Ir a… (no seguro)» → «Permitir».
 *     El aviso aparece porque el script es tuyo y Google no lo revisó; solo crea formularios en tu Drive.
 *  5. Abre «Registro de ejecución»: ahí salen los enlaces para responder y para editar cada formulario.
 *
 * Crea tres formularios, cada uno con su hoja de respuestas:
 *  - Marki · Encuesta al dueño
 *  - Marki · Validación por juicio de expertos (21 indicadores, una sección por dimensión)
 *  - Marki · Ficha de evaluación (respaldo: guarda las respuestas; el diagnóstico se obtiene al pasarlas a Marki)
 * Después, con respuestas de los expertos, ejecuta «calcularAiken» para obtener la V de Aiken de cada indicador.
 */

var RUBRICA = [
 {
  "id": "D1",
  "nombre": "Identidad de marca",
  "pregunta": "¿La marca se reconoce igual en todos sus canales?",
  "items": [
   {
    "id": "D1.1",
    "nombre": "Logotipo",
    "que": "Si el negocio tiene un logotipo propio y lo usa igual en todos sus perfiles, para que el cliente lo reconozca.",
    "donde": "Foto de perfil de las cuentas que tenga: Facebook, Instagram, TikTok, WhatsApp y Google Maps",
    "n": [
     "No tiene logotipo: usa una foto cualquiera o solo texto",
     "Tiene logotipo, pero cambia entre cuentas o se ve borroso o cortado",
     "Tiene un logotipo legible y es el mismo en todas sus cuentas"
    ]
   },
   {
    "id": "D1.2",
    "nombre": "Coherencia visual",
    "que": "Si las publicaciones tienen un estilo propio (colores, tipografía o plantilla) que permite reconocer a la marca sin leer su nombre.",
    "donde": "Últimas 9 publicaciones de la red social principal",
    "n": [
     "Ninguna o solo una publicación usa los colores o la plantilla de la marca",
     "Dos o más publicaciones los usan, pero no la mayoría",
     "La mayoría de las publicaciones revisadas (más de la mitad) usa los mismos colores, tipografía o plantilla"
    ]
   },
   {
    "id": "D1.3",
    "nombre": "Nombre de usuario consistente",
    "que": "Si el negocio aparece con el mismo nombre y un usuario (@) igual o parecido en todas las plataformas, para que el cliente lo encuentre.",
    "donde": "Nombre y usuario en cada red social y en Google Maps",
    "n": [
     "En alguna plataforma aparece con un nombre totalmente distinto",
     "El nombre es parecido en todas, pero cambia en alguna o el usuario (@) es distinto",
     "Usa el mismo nombre y un usuario (@) igual o casi igual en todas"
    ]
   }
  ]
 },
 {
  "id": "D2",
  "nombre": "Presencia en búsquedas",
  "pregunta": "¿Un cliente que busca en Google o en una IA encuentra el negocio con datos correctos?",
  "items": [
   {
    "id": "D2.1",
    "nombre": "Ficha de Google Maps",
    "que": "Si el negocio aparece en Google Maps con los datos que el cliente necesita para llegar o contactarlo.",
    "donde": "Búsqueda del nombre del negocio en Google Maps",
    "n": [
     "No tiene ficha en Google Maps",
     "Tiene ficha, pero le falta alguno de estos datos: categoría, horario, teléfono, ubicación exacta o fotos",
     "La ficha tiene los cinco datos: categoría, horario, teléfono, ubicación exacta y fotos"
    ]
   },
   {
    "id": "D2.2",
    "nombre": "Datos iguales en todos los canales",
    "que": "Si el teléfono, el horario y la dirección son los mismos en Google Maps y en todas las redes, sin contradicciones.",
    "donde": "Teléfono, horario y dirección en Google Maps y en cada red social",
    "n": [
     "Algún dato (teléfono, horario o dirección) es distinto entre plataformas",
     "Ningún dato se contradice, pero falta alguno en algún canal",
     "El teléfono, el horario y la dirección están completos y son iguales en todos los canales"
    ]
   },
   {
    "id": "D2.3",
    "nombre": "Aparición en asistentes de IA",
    "que": "Si ChatGPT conoce al negocio: si lo recomienda cuando se le pide un negocio de su rubro en Cobija y si da datos correctos sobre él.",
    "donde": "Preguntar siempre a ChatGPT, versión gratuita, sin iniciar sesión y en una conversación nueva: «¿Qué me recomiendas de [rubro] en Cobija?» y «¿Qué sabes de [negocio] en Cobija, Bolivia?»",
    "n": [
     "El asistente no menciona ni reconoce el negocio",
     "Lo reconoce por su nombre, pero con datos incompletos o errores",
     "Lo recomienda por sí solo o lo describe con datos correctos"
    ]
   }
  ]
 },
 {
  "id": "D3",
  "nombre": "Contenido en redes",
  "pregunta": "¿La marca publica con constancia y variedad?",
  "items": [
   {
    "id": "D3.1",
    "nombre": "Frecuencia de publicación",
    "que": "Con qué frecuencia publica el negocio en su red social principal.",
    "donde": "Publicaciones de los últimos 30 días en la red social principal (sin contar las historias)",
    "n": [
     "Ninguna publicación en los últimos 30 días",
     "Entre 1 y 7 publicaciones (menos de dos por semana)",
     "8 publicaciones o más (dos por semana o más)"
    ]
   },
   {
    "id": "D3.2",
    "nombre": "Variedad de formatos",
    "que": "Si el negocio usa varios formatos (fotos, videos cortos, carruseles, historias) y no siempre el mismo.",
    "donde": "Publicaciones de los últimos 30 días y las historias destacadas del perfil",
    "n": [
     "Un solo formato (por ejemplo, solo afiches) o ninguna publicación",
     "Dos formatos",
     "Tres formatos o más (foto, video corto, carrusel, historias destacadas, en vivo)"
    ]
   },
   {
    "id": "D3.3",
    "nombre": "Contenido que aporta valor",
    "que": "Si, además de promociones, el negocio publica contenido que genera confianza: cómo trabaja, quién atiende, sus clientes o consejos útiles.",
    "donde": "Últimas 9 publicaciones",
    "n": [
     "Todas las publicaciones revisadas son solo promoción o precio",
     "Al menos una muestra algo más: cómo trabajan, quién atiende, clientes o consejos",
     "Un tercio o más (3 o más de 9) muestra personas reales, procesos, testimonios o consejos útiles"
    ]
   }
  ]
 },
 {
  "id": "D4",
  "nombre": "Interacción con clientes",
  "pregunta": "¿La marca conversa con sus clientes?",
  "items": [
   {
    "id": "D4.1",
    "nombre": "Respuesta a comentarios",
    "que": "Si el negocio responde los comentarios que los clientes dejan en sus publicaciones.",
    "donde": "Comentarios de las últimas 9 publicaciones (si no hay comentarios, el indicador no se aplica)",
    "n": [
     "No respondió ningún comentario",
     "Respondió algunos comentarios, pero no la mayoría",
     "Respondió la mayoría de los comentarios"
    ]
   },
   {
    "id": "D4.2",
    "nombre": "Participación de los clientes",
    "que": "Si los clientes comentan las publicaciones, o si el negocio comparte las fotos y opiniones de sus clientes.",
    "donde": "Comentarios, etiquetas y contenido compartido por clientes",
    "n": [
     "Ninguna publicación revisada tiene comentarios de clientes",
     "Algunas publicaciones tienen comentarios de clientes",
     "La mayoría de las publicaciones tiene comentarios de clientes, o la marca comparte fotos y opiniones de sus clientes"
    ]
   },
   {
    "id": "D4.3",
    "nombre": "Respuesta a un mensaje",
    "que": "Cuánto tarda el negocio en responder un mensaje de consulta, por WhatsApp, Messenger o mensaje directo.",
    "donde": "Una consulta breve (por ejemplo, el horario o un precio) enviada por WhatsApp, Messenger o mensaje directo de la red principal, en horario de atención",
    "n": [
     "No hay canal de mensajes visible o no respondió en 24 horas",
     "Respondió entre 1 y 24 horas",
     "Respondió en menos de 1 hora"
    ]
   }
  ]
 },
 {
  "id": "D5",
  "nombre": "Reputación en línea",
  "pregunta": "¿Qué dicen los clientes del negocio y cómo responde?",
  "items": [
   {
    "id": "D5.1",
    "nombre": "Cantidad de reseñas en Google",
    "que": "Cuántas reseñas tiene el negocio en Google Maps. Más reseñas dan más confianza al cliente.",
    "donde": "Ficha de Google Maps",
    "n": [
     "Ninguna reseña o no tiene ficha",
     "Entre 1 y 19 reseñas",
     "20 reseñas o más"
    ]
   },
   {
    "id": "D5.2",
    "nombre": "Calificación promedio",
    "que": "La calificación promedio, en estrellas, del negocio en Google Maps.",
    "donde": "Ficha de Google Maps (si no tiene reseñas, el indicador no se aplica)",
    "n": [
     "Calificación menor a 4,0",
     "Entre 4,0 y 4,4",
     "4,5 o más"
    ]
   },
   {
    "id": "D5.3",
    "nombre": "Respuesta a reseñas",
    "que": "Si el negocio responde las reseñas de Google, sobre todo las negativas.",
    "donde": "Últimas 10 reseñas en Google Maps (si no tiene reseñas, el indicador no se aplica)",
    "n": [
     "No respondió ninguna reseña",
     "Respondió algunas reseñas, o no respondió las negativas",
     "Respondió la mayoría, incluidas las negativas"
    ]
   }
  ]
 },
 {
  "id": "D6",
  "nombre": "Conversión a venta",
  "pregunta": "¿El cliente sabe cuánto cuesta y cómo comprar?",
  "items": [
   {
    "id": "D6.1",
    "nombre": "Precios visibles",
    "que": "Si el cliente puede ver los precios sin tener que preguntar.",
    "donde": "Publicaciones, menú o catálogo",
    "n": [
     "No muestra precios (por ejemplo, «precio por interno»)",
     "Algunas publicaciones muestran el precio",
     "La mayoría de las publicaciones muestra el precio, o tiene un menú o catálogo con precios"
    ]
   },
   {
    "id": "D6.2",
    "nombre": "Llamado a la acción",
    "que": "Si las publicaciones le dicen al cliente qué hacer para comprar: escribir, llamar, visitar o reservar.",
    "donde": "Últimas 9 publicaciones",
    "n": [
     "Ninguna publicación revisada indica qué hacer para comprar",
     "Algunas indican cómo comprar",
     "La mayoría de las publicaciones revisadas dice cómo comprar: escribir, llamar, visitar o reservar"
    ]
   },
   {
    "id": "D6.3",
    "nombre": "Facilidades para comprar",
    "que": "Si el negocio ofrece formas fáciles de comprar a distancia: pedido por mensaje, catálogo, envío a domicilio o pago con QR.",
    "donde": "Perfil, WhatsApp y publicaciones",
    "n": [
     "No muestra ningún teléfono ni WhatsApp para pedir: solo venta en el local",
     "Muestra un teléfono o WhatsApp para pedir, sin otras facilidades",
     "Tiene al menos una facilidad: catálogo de WhatsApp, botón de pedido o reserva, envío a domicilio o pago con QR anunciado"
    ]
   }
  ]
 },
 {
  "id": "D7",
  "nombre": "Publicidad y medición",
  "pregunta": "¿La marca invierte en anuncios y puede saber qué le funciona?",
  "items": [
   {
    "id": "D7.1",
    "nombre": "Anuncios en Meta",
    "que": "Si el negocio invierte en anuncios pagados en Facebook o Instagram (Meta) en este momento.",
    "donde": "Biblioteca de anuncios de Meta, buscando el nombre de la página (muestra solo los anuncios activos). Si el negocio no tiene Facebook ni Instagram, el indicador no se aplica",
    "n": [
     "No tiene anuncios activos",
     "Tiene un anuncio activo",
     "Tiene dos o más anuncios activos"
    ]
   },
   {
    "id": "D7.2",
    "nombre": "Sitio web o enlace propio",
    "que": "Si el negocio tiene un sitio web o una página propia con su información y su contacto.",
    "donde": "Perfil de redes y ficha de Google",
    "n": [
     "No tiene sitio web ni enlace propio",
     "Tiene una página básica o un agrupador de enlaces (como Linktree)",
     "Tiene un sitio web propio que funciona, con información y contacto"
    ]
   },
   {
    "id": "D7.3",
    "nombre": "Promociones que se pueden medir",
    "que": "Si las promociones permiten saber cuántos clientes llegaron por internet, por ejemplo con un código o una palabra clave.",
    "donde": "Publicaciones de los últimos 30 días",
    "n": [
     "No hay promociones digitales",
     "Hay promociones, pero sin forma de saber de dónde vino el cliente",
     "Hay promociones con código, palabra clave o condición que permite medir su resultado"
    ]
   }
  ]
 }
];
var FICHA = [
 {
  "nombre": "Identidad de marca",
  "pregunta": "¿La marca se reconoce igual en todos sus canales?",
  "items": [
   {
    "id": "D1.1",
    "nombre": "Logotipo",
    "donde": "Foto de perfil de las cuentas que tenga: Facebook, Instagram, TikTok, WhatsApp y Google Maps",
    "qs": [
     {
      "t": "¿El negocio usa su propio logotipo como foto de perfil?",
      "nota": "Una foto del local, de un producto o solo letras no cuenta como logotipo.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿Usa el mismo logotipo en todas sus cuentas?",
      "nota": "Solo si a) es Sí. Compara la foto de perfil de Facebook, Instagram, TikTok y Google Maps.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿El logotipo se ve bien: completo, nítido y fácil de leer?",
      "nota": "Solo si a) es Sí. Si el círculo de la foto lo corta o se ve pixelado, marca No.",
      "tipo": "sn",
      "max": 100
     }
    ]
   },
   {
    "id": "D1.2",
    "nombre": "Coherencia visual",
    "donde": "Últimas 9 publicaciones de la red social principal",
    "qs": [
     {
      "t": "¿En cuántas de las publicaciones que revisas se reconoce el estilo de la marca?",
      "nota": "Los mismos colores, el logotipo o una plantilla que se repite.",
      "tipo": "num",
      "max": 100
     }
    ]
   },
   {
    "id": "D1.3",
    "nombre": "Nombre de usuario consistente",
    "donde": "Nombre y usuario en cada red social y en Google Maps",
    "qs": [
     {
      "t": "¿En alguna red el negocio aparece con otro nombre?",
      "nota": "Por ejemplo, «Pollos Copacabana» en Facebook y «Pollería Don Juan» en TikTok.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿El nombre se escribe igual en todas sus cuentas?",
      "nota": "Solo si a) es No. Si en alguna cambia o falta una palabra, marca No.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿El usuario (@) es igual o casi igual en todas?",
      "nota": "Solo si a) es No. @polloscopacabana y @pollos.copacabana cuentan como casi iguales.",
      "tipo": "sn",
      "max": 100
     }
    ]
   }
  ]
 },
 {
  "nombre": "Presencia en búsquedas",
  "pregunta": "¿Un cliente que busca en Google o en una IA encuentra el negocio con datos correctos?",
  "items": [
   {
    "id": "D2.1",
    "nombre": "Ficha de Google Maps",
    "donde": "Búsqueda del nombre del negocio en Google Maps",
    "qs": [
     {
      "t": "¿Qué tiene su ficha de Google Maps?",
      "nota": "Busca el nombre del negocio en Google Maps y marca todo lo que veas. Si no aparece, no marques nada.",
      "tipo": "ops",
      "ops": [
       "Aparece en Google Maps",
       "Tipo de negocio (categoría)",
       "Horario",
       "Teléfono",
       "Ubicación exacta en el mapa",
       "Fotos"
      ]
     }
    ]
   },
   {
    "id": "D2.2",
    "nombre": "Datos iguales en todos los canales",
    "donde": "Teléfono, horario y dirección en Google Maps y en cada red social",
    "qs": [
     {
      "t": "¿Algún dato no coincide entre sus cuentas?",
      "nota": "Otro teléfono en Instagram, otro horario en Google Maps o una dirección distinta.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿Falta el teléfono, el horario o la dirección en alguna cuenta?",
      "nota": "Solo si a) es No. Revisa Google Maps y cada red social que tenga.",
      "tipo": "sn",
      "max": 100
     }
    ]
   },
   {
    "id": "D2.3",
    "nombre": "Aparición en asistentes de IA",
    "donde": "Preguntar siempre a ChatGPT, versión gratuita, sin iniciar sesión y en una conversación nueva: «¿Qué me recomiendas de [rubro] en Cobija?» y «¿Qué sabes de [negocio] en Cobija, Bolivia?»",
    "qs": [
     {
      "t": "Al pedirle recomendaciones, ¿ChatGPT nombra al negocio?",
      "nota": "Es la primera pregunta: «¿Qué me recomiendas de… en Cobija?».",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "Al preguntarle por el negocio, ¿ChatGPT sabe cuál es?",
      "nota": "Solo si a) es No. Segunda pregunta: «¿Qué sabes de… en Cobija?». Si dice que no tiene información, marca No.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿Lo que dice ChatGPT del negocio es correcto?",
      "nota": "Solo si b) es Sí. Revisa el rubro, la ubicación y lo que vende.",
      "tipo": "sn",
      "max": 100
     }
    ]
   }
  ]
 },
 {
  "nombre": "Contenido en redes",
  "pregunta": "¿La marca publica con constancia y variedad?",
  "items": [
   {
    "id": "D3.1",
    "nombre": "Frecuencia de publicación",
    "donde": "Publicaciones de los últimos 30 días en la red social principal (sin contar las historias)",
    "qs": [
     {
      "t": "¿Cuántas veces publicó en los últimos 30 días?",
      "nota": "Cuenta las publicaciones de su red principal, sin contar las historias.",
      "tipo": "num",
      "min": 0,
      "max": 100000
     }
    ]
   },
   {
    "id": "D3.2",
    "nombre": "Variedad de formatos",
    "donde": "Publicaciones de los últimos 30 días y las historias destacadas del perfil",
    "qs": [
     {
      "t": "¿Qué formatos usó en el último mes?",
      "nota": "Marca todos los que veas en sus publicaciones y en las historias destacadas del perfil.",
      "tipo": "ops",
      "ops": [
       "Fotos o afiches",
       "Videos cortos",
       "Carruseles",
       "Historias destacadas",
       "Transmisiones en vivo"
      ]
     }
    ]
   },
   {
    "id": "D3.3",
    "nombre": "Contenido que aporta valor",
    "donde": "Últimas 9 publicaciones",
    "qs": [
     {
      "t": "De las publicaciones que revisas, ¿cuántas muestran algo más que una oferta?",
      "nota": "Por ejemplo: cómo preparan, quién atiende, un cliente contento o un consejo útil.",
      "tipo": "num",
      "max": 100
     }
    ]
   }
  ]
 },
 {
  "nombre": "Interacción con clientes",
  "pregunta": "¿La marca conversa con sus clientes?",
  "items": [
   {
    "id": "D4.1",
    "nombre": "Respuesta a comentarios",
    "donde": "Comentarios de las últimas 9 publicaciones (si no hay comentarios, el indicador no se aplica)",
    "qs": [
     {
      "t": "¿Cuántos comentarios de clientes hay en las publicaciones que revisas?",
      "nota": "Si son más de 20, anota 20. No cuentes las respuestas del propio negocio.",
      "tipo": "num",
      "max": 100
     },
     {
      "t": "¿A cuántos de esos comentarios respondió el negocio?",
      "nota": "Solo si a) es mayor que 0. Una respuesta escrita cuenta, aunque sea «¡Gracias!»; un «me gusta» no.",
      "tipo": "num",
      "max": 100
     }
    ]
   },
   {
    "id": "D4.2",
    "nombre": "Participación de los clientes",
    "donde": "Comentarios, etiquetas y contenido compartido por clientes",
    "qs": [
     {
      "t": "De las publicaciones que revisas, ¿cuántas tienen al menos un comentario de un cliente?",
      "nota": "No cuentes los comentarios del propio negocio.",
      "tipo": "num",
      "max": 100
     },
     {
      "t": "¿El negocio comparte fotos u opiniones de sus clientes?",
      "nota": "Reseñas en historias, fotos de clientes o publicaciones donde lo etiquetan.",
      "tipo": "sn",
      "max": 100
     }
    ]
   },
   {
    "id": "D4.3",
    "nombre": "Respuesta a un mensaje",
    "donde": "Una consulta breve (por ejemplo, el horario o un precio) enviada por WhatsApp, Messenger o mensaje directo de la red principal, en horario de atención",
    "qs": [
     {
      "t": "¿Cuántos minutos tardó en responder tu mensaje?",
      "nota": "Envía una consulta breve, como el horario o un precio, y anota el tiempo. Una hora son 60 minutos.",
      "tipo": "tiempo"
     }
    ]
   }
  ]
 },
 {
  "nombre": "Reputación en línea",
  "pregunta": "¿Qué dicen los clientes del negocio y cómo responde?",
  "items": [
   {
    "id": "D5.1",
    "nombre": "Cantidad de reseñas en Google",
    "donde": "Ficha de Google Maps",
    "qs": [
     {
      "t": "¿Cuántas reseñas tiene en Google Maps?",
      "nota": "Es el número que aparece al lado de las estrellas.",
      "tipo": "num",
      "min": 0,
      "max": 100000
     }
    ]
   },
   {
    "id": "D5.2",
    "nombre": "Calificación promedio",
    "donde": "Ficha de Google Maps (si no tiene reseñas, el indicador no se aplica)",
    "qs": [
     {
      "t": "¿Qué calificación tiene en Google Maps?",
      "nota": "Es el número de estrellas, de 1 a 5; por ejemplo, 4,3. Si no tiene reseñas, déjalo en blanco.",
      "tipo": "num",
      "min": 0,
      "max": 5
     }
    ]
   },
   {
    "id": "D5.3",
    "nombre": "Respuesta a reseñas",
    "donde": "Últimas 10 reseñas en Google Maps (si no tiene reseñas, el indicador no se aplica)",
    "qs": [
     {
      "t": "¿Cuántas de las últimas 10 reseñas de Google tienen respuesta del negocio?",
      "nota": "Si tiene menos de 10 reseñas, revisa todas.",
      "tipo": "num",
      "max": 100
     },
     {
      "t": "Entre esas reseñas, ¿hay alguna de 3 estrellas o menos?",
      "nota": "",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿El negocio respondió esas reseñas negativas?",
      "nota": "Solo si b) es Sí.",
      "tipo": "sn",
      "max": 100
     }
    ]
   }
  ]
 },
 {
  "nombre": "Conversión a venta",
  "pregunta": "¿El cliente sabe cuánto cuesta y cómo comprar?",
  "items": [
   {
    "id": "D6.1",
    "nombre": "Precios visibles",
    "donde": "Publicaciones, menú o catálogo",
    "qs": [
     {
      "t": "¿Tiene un menú, una lista de precios o un catálogo a la vista?",
      "nota": "Una publicación fijada, el catálogo de WhatsApp o un enlace.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "De las publicaciones que revisas, ¿en cuántas aparece el precio?",
      "nota": "Solo si a) es No. «Bs 25» cuenta; «precio por interno» no.",
      "tipo": "num",
      "max": 100
     }
    ]
   },
   {
    "id": "D6.2",
    "nombre": "Llamado a la acción",
    "donde": "Últimas 9 publicaciones",
    "qs": [
     {
      "t": "De las publicaciones que revisas, ¿cuántas dicen cómo comprar?",
      "nota": "«Escríbenos al 7…», «pide por WhatsApp» o «visítanos en…».",
      "tipo": "num",
      "max": 100
     }
    ]
   },
   {
    "id": "D6.3",
    "nombre": "Facilidades para comprar",
    "donde": "Perfil, WhatsApp y publicaciones",
    "qs": [
     {
      "t": "¿Muestra un teléfono o WhatsApp para hacer pedidos?",
      "nota": "En el perfil, en la ficha de Google o en las publicaciones.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿Ofrece alguna facilidad extra para comprar?",
      "nota": "Catálogo de WhatsApp, botón de pedido o reserva, envío a domicilio o pago con QR.",
      "tipo": "sn",
      "max": 100
     }
    ]
   }
  ]
 },
 {
  "nombre": "Publicidad y medición",
  "pregunta": "¿La marca invierte en anuncios y puede saber qué le funciona?",
  "items": [
   {
    "id": "D7.1",
    "nombre": "Anuncios en Meta",
    "donde": "Biblioteca de anuncios de Meta, buscando el nombre de la página (muestra solo los anuncios activos). Si el negocio no tiene Facebook ni Instagram, el indicador no se aplica",
    "qs": [
     {
      "t": "¿El negocio tiene Facebook o Instagram?",
      "nota": "Si solo usa TikTok o WhatsApp, marca No: este indicador no le resta puntos.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "En la Biblioteca de anuncios de Meta, ¿tiene anuncios activos?",
      "nota": "Solo si a) es Sí. Busca el nombre de su página en facebook.com/ads/library.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿Cuántos anuncios activos tiene?",
      "nota": "Solo si b) es Sí. La biblioteca muestra el número de resultados.",
      "tipo": "num",
      "max": 100
     }
    ]
   },
   {
    "id": "D7.2",
    "nombre": "Sitio web o enlace propio",
    "donde": "Perfil de redes y ficha de Google",
    "qs": [
     {
      "t": "¿Tiene una página web o un agrupador de enlaces (como Linktree) en su perfil o en Google?",
      "nota": "Revisa la biografía de sus redes y su ficha de Google. Un enlace que solo abre WhatsApp u otra red social no cuenta.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿Es una página web propia?",
      "nota": "Solo si a) es Sí. Un Linktree no cuenta como página propia.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿La página abre y muestra información y contacto?",
      "nota": "Solo si b) es Sí. Ábrela en el celular.",
      "tipo": "sn",
      "max": 100
     }
    ]
   },
   {
    "id": "D7.3",
    "nombre": "Promociones que se pueden medir",
    "donde": "Publicaciones de los últimos 30 días",
    "qs": [
     {
      "t": "¿Publicó alguna promoción en los últimos 30 días?",
      "nota": "Descuentos, 2×1, combos o sorteos.",
      "tipo": "sn",
      "max": 100
     },
     {
      "t": "¿La promoción pide algo para saber que el cliente llegó por internet?",
      "nota": "Solo si a) es Sí. Un código, decir una palabra al pagar o «mostrando esta publicación».",
      "tipo": "sn",
      "max": 100
     }
    ]
   }
  ]
 }
];

var ESC_R = ['Se puede quitar (1)', 'Poco relevante (2)', 'Relevante (3)', 'Muy relevante (4)'];
var ESC_C = ['No se entiende (1)', 'Necesita muchos cambios (2)', 'Necesita un cambio menor (3)', 'Es claro (4)'];
var ESC_S = ['No alcanzan (1)', 'Miden solo una parte (2)', 'Falta algún indicador (3)', 'Son suficientes (4)'];

function crearFormularios() {
  var d = crearEncuestaDueno_();
  var e = crearValidacionExpertos_();
  var x = crearFichaEvaluacion_();
  Logger.log('ENCUESTA AL DUEÑO\n  Para responder: ' + d.getPublishedUrl() + '\n  Para editar: ' + d.getEditUrl());
  Logger.log('VALIDACIÓN POR EXPERTOS\n  Para responder: ' + e.getPublishedUrl() + '\n  Para editar: ' + e.getEditUrl());
  Logger.log('FICHA DE EVALUACIÓN\n  Para responder: ' + x.getPublishedUrl() + '\n  Para editar: ' + x.getEditUrl());
}

function hojaRespuestas_(form, nombre) {
  var ss = SpreadsheetApp.create(nombre + ' (respuestas)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  return ss;
}

function crearEncuestaDueno_() {
  var f = FormApp.create('Marki · Encuesta al dueño');
  f.setDescription('Universidad Amazónica de Pando · Carrera de Ingeniería Comercial · Marketing Digital ICOM261\n\n' +
    'Opinión sobre el diagnóstico de Marki. Toma menos de un minuto. Tus respuestas son anónimas y se usan solo de forma agrupada, con fines académicos.');
  f.setProgressBar(false).setShowLinkToRespondAgain(true);
  f.setConfirmationMessage('¡Gracias por tu tiempo!');
  f.addTextItem().setTitle('Nombre del negocio').setRequired(true);
  f.addTextItem().setTitle('Estudiante que encuesta').setRequired(true);
  f.addSectionHeaderItem().setTitle('Antes del diagnóstico');
  f.addTextItem().setTitle('Del 0 al 100, ¿qué puntaje crees que tiene tu negocio en internet?')
    .setHelpText('0 = no aparece en internet · 100 = está muy bien en internet')
    .setValidation(FormApp.createTextValidation().requireNumberBetween(0, 100).setHelpText('Escribe un número del 0 al 100.').build());
  f.addSectionHeaderItem().setTitle('Después de ver el diagnóstico');
  f.addScaleItem().setTitle('¿El diagnóstico describe bien la situación de tu negocio en internet?').setBounds(1, 5).setLabels('Nada', 'Totalmente').setRequired(true);
  f.addScaleItem().setTitle('¿Las acciones recomendadas te parecen útiles y posibles de hacer?').setBounds(1, 5).setLabels('Nada', 'Totalmente').setRequired(true);
  f.addMultipleChoiceItem().setTitle('¿Aplicarás alguna en el próximo mes?').setChoiceValues(['Sí', 'Tal vez', 'No']).setRequired(true);
  hojaRespuestas_(f, 'Marki · Encuesta al dueño');
  return f;
}

function crearValidacionExpertos_() {
  var f = FormApp.create('Marki · Validación por juicio de expertos');
  f.setDescription('Universidad Amazónica de Pando · Carrera de Ingeniería Comercial · Marketing Digital ICOM261\n\n' +
    'Marki es una herramienta de la UAP que revisa lo que un cliente puede ver de un negocio de Cobija en internet (redes sociales, Google Maps y ChatGPT) ' +
    'y le entrega al dueño un diagnóstico y un plan de mejora. Para hacerlo, califica 21 indicadores, agrupados en 7 dimensiones.\n\n' +
    'Cómo responder: en cada indicador lea qué mide, dónde se observa y sus tres niveles (0, 1 y 2). Luego marque si debe estar en Marki y si se entiende. ' +
    'Al terminar cada dimensión, marque si sus indicadores alcanzan para medirla. No hay respuestas correctas ni incorrectas. Toma entre 10 y 15 minutos.');
  f.setProgressBar(true);
  f.setConfirmationMessage('Muchas gracias por su tiempo. Sus respuestas se usan para calcular el acuerdo entre expertos (V de Aiken).');
  f.addTextItem().setTitle('Nombre y apellido').setRequired(true);
  f.addTextItem().setTitle('Profesión o cargo, e institución donde trabaja').setRequired(true);
  RUBRICA.forEach(function (d, di) {
    f.addPageBreakItem().setTitle('Dimensión ' + (di + 1) + ' de 7 · ' + d.nombre).setHelpText('Esta dimensión responde a la pregunta: ' + d.pregunta);
    d.items.forEach(function (it) {
      f.addSectionHeaderItem().setTitle('Indicador ' + it.id + ' · ' + it.nombre).setHelpText(
        'Qué mide: ' + punto_(it.que) + '\nDónde se observa: ' + punto_(it.donde) +
        '\n\nNivel 0 (el más bajo): ' + punto_(it.n[0]) + '\nNivel 1: ' + punto_(it.n[1]) + '\nNivel 2 (el más alto): ' + punto_(it.n[2]));
      f.addMultipleChoiceItem().setTitle(it.id + ' · ¿Este indicador debe estar en Marki para medir la presencia digital?').setChoiceValues(ESC_R).setRequired(true);
      f.addMultipleChoiceItem().setTitle(it.id + ' · ¿Se entiende el indicador y sus tres niveles?').setChoiceValues(ESC_C).setRequired(true);
      f.addParagraphTextItem().setTitle(it.id + ' · Observación (opcional)');
    });
    f.addMultipleChoiceItem().setTitle(d.id + ' · ¿Estos ' + d.items.length + ' indicadores alcanzan para medir «' + d.nombre + '»?').setChoiceValues(ESC_S).setRequired(true);
    f.addParagraphTextItem().setTitle(d.id + ' · ¿Qué cambiaría o agregaría en esta dimensión? (opcional)');
  });
  hojaRespuestas_(f, 'Marki · Validación por expertos');
  return f;
}

function crearFichaEvaluacion_() {
  var f = FormApp.create('Marki · Ficha de evaluación');
  f.setDescription('Universidad Amazónica de Pando · Carrera de Ingeniería Comercial · Marketing Digital ICOM261\n\n' +
    'Respaldo de la evaluación de Marki. Responde solo lo que ves en internet. Si una pregunta dice «Solo si…», respóndela únicamente en ese caso; si no, déjala en blanco. ' +
    'Si algo no lo puedes comprobar, déjalo en blanco y anótalo en Observaciones.\n\n' +
    'Importante: este formulario solo guarda las respuestas. Para obtener el diagnóstico, pásalas a Marki.');
  f.setProgressBar(true).setShowLinkToRespondAgain(true);
  f.setConfirmationMessage('Respuestas guardadas. Recuerda pasarlas a Marki para obtener el diagnóstico.');
  var num = function (min, max) { return FormApp.createTextValidation().requireNumberBetween(min, max).setHelpText('Escribe un número entre ' + min + ' y ' + max + '.').build(); };
  f.addTextItem().setTitle('Nombre del negocio').setRequired(true);
  f.addTextItem().setTitle('Rubro').setRequired(true);
  f.addMultipleChoiceItem().setTitle('Red social principal (la que tiene más seguidores)').setChoiceValues(['Facebook', 'Instagram', 'TikTok', 'WhatsApp']).setRequired(true);
  f.addTextItem().setTitle('Seguidores en esa red').setValidation(num(0, 10000000));
  f.addTextItem().setTitle('Publicaciones revisadas (las últimas 9; si tiene menos, cuántas)').setValidation(num(0, 9));
  f.addTextItem().setTitle('Estudiante').setRequired(true);
  f.addMultipleChoiceItem().setTitle('Tipo de evaluación').setChoiceValues(['Feria (el responsable está presente)', 'Estudio (muestra de la investigación)']).setRequired(true);
  f.addCheckboxItem().setTitle('Autorización').setChoiceValues(['El responsable del negocio autoriza el diagnóstico y que sus resultados se usen de forma anónima y agrupada con fines académicos.']).setRequired(true);
  f.addTextItem().setTitle('Antes de empezar, pregunta al dueño: «Del 0 al 100, ¿qué puntaje crees que tiene tu negocio en internet?»')
    .setHelpText('Opcional. Al final se compara lo que cree el dueño con lo que muestra Marki.').setValidation(num(0, 100));
  FICHA.forEach(function (d, di) {
    f.addPageBreakItem().setTitle('D' + (di + 1) + ' · ' + d.nombre).setHelpText(d.pregunta);
    d.items.forEach(function (it) {
      it.qs.forEach(function (q, qi) {
        var titulo = it.id + ' ' + it.nombre + (it.qs.length > 1 ? ' · ' + 'abc'[qi] + ') ' : ' · ') + q.t;
        var ayuda = (qi === 0 ? 'Dónde: ' + punto_(it.donde) + (q.nota ? '\n' : '') : '') + (q.nota || '');
        var item;
        if (q.tipo === 'sn') item = f.addMultipleChoiceItem().setChoiceValues(['Sí', 'No']);
        else if (q.tipo === 'ops') item = f.addCheckboxItem().setChoiceValues(q.ops);
        else if (q.tipo === 'tiempo') item = f.addTextItem().setValidation(num(0, 1440));
        else item = f.addTextItem().setValidation(num(q.min || 0, q.max || 100000));
        item.setTitle(titulo).setHelpText(ayuda);
        if (q.tipo === 'tiempo') f.addCheckboxItem().setTitle(it.id + ' ' + it.nombre + ' · Si no hubo respuesta').setChoiceValues(['No respondió en 24 horas o no tiene dónde escribirle']);
      });
    });
  });
  f.addPageBreakItem().setTitle('Para terminar');
  f.addParagraphTextItem().setTitle('Observaciones (qué viste, dónde y cuándo)');
  hojaRespuestas_(f, 'Marki · Ficha de evaluación');
  return f;
}

function punto_(t) { t = String(t || '').trim(); return /[.!?»)]$/.test(t) ? t : t + '.'; }

/**
 * Calcula la V de Aiken (Aiken, 1985; escala de 1 a 4) de cada indicador con las respuestas recibidas.
 * Ábrelo después de que respondan los expertos: crea o actualiza la pestaña «V de Aiken» en la hoja de respuestas.
 * V = suma(respuesta − 1) / (número de expertos × 3). Se mantiene el indicador si V ≥ 0,70.
 */
function calcularAiken() {
  var archivos = DriveApp.getFilesByName('Marki · Validación por expertos (respuestas)');
  if (!archivos.hasNext()) throw new Error('No encontré la hoja «Marki · Validación por expertos (respuestas)».');
  var ss = SpreadsheetApp.open(archivos.next());
  var hoja = ss.getSheets().filter(function (h) { return h.getName() !== 'V de Aiken'; })[0];
  var datos = hoja.getDataRange().getValues(), cab = datos[0], filas = datos.slice(1).filter(function (r) { return r.join('') !== ''; });
  var num = function (v) { var m = String(v).match(/\((\d)\)/); return m ? Number(m[1]) : null; };
  var v = function (col) { var x = filas.map(function (r) { return num(r[col]); }).filter(function (n) { return n != null; });
    return x.length ? { v: x.reduce(function (a, n) { return a + n - 1; }, 0) / (x.length * 3), n: x.length } : null; };
  var buscar = function (pre, texto) { for (var i = 0; i < cab.length; i++) if (String(cab[i]).indexOf(pre) === 0 && String(cab[i]).indexOf(texto) > -1) return i; return -1; };
  var out = [['Indicador', 'Nombre', 'Expertos', 'V relevancia', 'V claridad', 'Decisión']];
  RUBRICA.forEach(function (d) { d.items.forEach(function (it) {
    var r = v(buscar(it.id + ' ·', 'debe estar')), c = v(buscar(it.id + ' ·', 'Se entiende'));
    var dec = !r || !c ? 'Sin respuestas' : (r.v >= 0.7 && c.v >= 0.7 ? 'Se mantiene' : r.v < 0.7 ? 'Revisar si debe estar' : 'Mejorar la redacción');
    out.push([it.id, it.nombre, r ? r.n : 0, r ? Math.round(r.v * 100) / 100 : '', c ? Math.round(c.v * 100) / 100 : '', dec]);
  }); });
  var h = ss.getSheetByName('V de Aiken') || ss.insertSheet('V de Aiken');
  h.clear(); h.getRange(1, 1, out.length, out[0].length).setValues(out);
  h.getRange(1, 1, 1, out[0].length).setFontWeight('bold').setBackground('#1F3864').setFontColor('#FFFFFF');
  h.autoResizeColumns(1, out[0].length);
  Logger.log('Listo: revisa la pestaña «V de Aiken» en ' + ss.getUrl());
}
