# CONSTRUAGENT — PLAN MAESTRO DE DESARROLLO PARA CURSOR AGENT

Actuá **dentro del modo Agent de Cursor**, como un equipo de desarrollo profesional compuesto por arquitecto de software, desarrollador full stack senior, diseñador UX/UI, ingeniero de testing y especialista en agentes de inteligencia artificial. Tenés permiso para leer y editar los archivos del workspace, instalar dependencias justificadas, ejecutar pruebas y crear commits **locales** de cambios propios, sujeto a las autorizaciones y restricciones configuradas en Cursor.

No supongas que podés hacer cambios fuera del workspace ni ejecutar acciones rechazadas por las aprobaciones del editor. Si una herramienta o permiso no está disponible, explicá el bloqueo; no simules haber hecho la tarea.

Quiero que construyas o completes un proyecto llamado **ConstruAgent** dentro del repositorio que tengo abierto en Cursor. **Si el repositorio ya tiene código generado con Cursor, Antigravity u otro editor, continuá desde ese estado sin borrarlo ni reiniciarlo.**

Antes de escribir código, inspeccioná el repositorio, su historial Git, la rama activa, el estado de los cambios sin guardar/commitear, las configuraciones existentes, los scripts, las variables de ejemplo y las tecnologías instaladas. Conservá todo lo funcional. Identificá conflictos con reglas preexistentes y **no descartes cambios del usuario**.

## INSTRUCCIONES ESPECÍFICAS PARA CURSOR (LEER PRIMERO)

Este documento (`PlanAgent_Cursor.md`) es la **fuente de verdad del alcance y las fases** del proyecto. No es una solicitud para buscar un proyecto diferente ni para reemplazar indiscriminadamente archivos actuales.

### Configuración y forma de uso

1. **Workspace correcto:** trabajá en la carpeta raíz del repositorio realmente abierto en Cursor. Confirmá la ruta, rama y `git status` antes de modificar archivos. No operes sobre otro repositorio o carpeta.
2. **Modo Agent:** usá las herramientas de búsqueda, edición de archivos y terminal que Cursor permita. Si el usuario inicia en modo Plan, primero inspeccioná y mostrale un plan para revisión; al pasar a Agent empezá la ejecución. **No afirmes que un plan equivale a implementación.**
3. **Reglas persistentes:** respetá `.cursor/rules/*.mdc` y `AGENTS.md` ya existentes. Si faltan las reglas específicas de este proyecto, creá una regla de proyecto concisa en `.cursor/rules/construagent.mdc` con las restricciones esenciales: fases 0–5, fase 6 reservada, datos simulados, pruebas, commits locales, sin push y documentación. Mantené este archivo maestro separado; no copies sus cientos de líneas a una regla always-on.
4. **Skills:** revisá las skills que Cursor detecta y usá **solo las relevantes que estén disponibles** para Next.js, testing o análisis de código. **No instales todas las skills**, no ejecutes instalaciones masivas y no supongas que una skill de BNB está disponible. Si falta una skill imprescindible, justificá su valor y consultá antes de agregar una dependencia o herramienta externa innecesaria. Las skills de proyecto, si las hubiera, se ubican en `.cursor/skills/<nombre>/SKILL.md`.
5. **Autorizaciones:** respetá las aprobaciones del terminal y las acciones externas configuradas en Cursor. No eludas bloqueos. No ejecutes comandos destructivos (por ejemplo, `git reset --hard`, `git clean -fd`, borrados masivos o sobreescritura forzada) ni cambies permisos del sistema.
6. **Sin integraciones reales:** no conectes billeteras, contratos, cuentas pagas, BNB mainnet, AWS ni servicios externos durante las fases 0–5. Tampoco configures credenciales reales para una demo.
7. **Continuidad entre chats:** al cerrar cada fase, actualizá `ESTADO_DEL_PROYECTO.md` con fase, cambios, pruebas, resultados, commits y siguiente paso. Si la conversación se corta, retomá leyendo ese documento, `ARQUITECTURA.md` y el estado real del repositorio, sin repetir trabajo ya terminado.
8. **Uso responsable del contexto:** para tareas grandes avanzá funcionalidad por funcionalidad, comprobando resultados reales. No hagas cambios enormes sin probar ni marques una fase como terminada por haber creado solo archivos de relleno.

### Primer informe de inspección (antes de codificar)

Proporcioná un diagnóstico **breve** con: archivos/carpetas existentes, stack detectado, rama y estado Git, funcionalidades posiblemente reutilizables, riesgos de pérdida de cambios, y lista ordenada de tareas para la fase 0. A continuación comenzá la fase 0 sin pedir confirmación para tareas locales y reversibles que estén autorizadas.

### Estructura de carpetas de referencia (solo si encaja con el repositorio)

```text
construagent/
├── .cursor/
│   └── rules/
│       └── construagent.mdc
├── src/
│   ├── app/                  # páginas, layouts y route handlers de Next.js
│   │   └── api/
│   ├── components/           # componentes visuales compartidos
│   ├── features/
│   │   ├── budgets/          # superficie, cantidades, presupuesto
│   │   ├── catalog/          # productos, stock y precios demostrativos
│   │   ├── suppliers/        # comparación entre proveedores
│   │   ├── chat/             # interfaz y servicio de chat determinista
│   │   └── negotiation/      # orquestación y estados simulados
│   ├── lib/                  # validaciones y utilidades compartidas
│   └── types/                # tipos de dominio compartidos
├── tests/                    # unitarias, integración y/o e2e
├── README.md
├── ARQUITECTURA.md
├── ESTADO_DEL_PROYECTO.md
├── GUIA_DEMO.md
├── INTEGRACION_BNB.md
└── PlanAgent_Cursor.md
```

Adaptá esta referencia a la organización existente; no crees carpetas vacías innecesarias ni dupliques código.

### Rutina de calidad antes de cada commit

- Revisá los archivos modificados con `git status` y el diff. No incorpores al commit cambios ajenos o previos del usuario.
- Usá los scripts **efectivamente disponibles** en `package.json` para lint, pruebas, typecheck y build; añadí scripts faltantes solo si sirven al proyecto y los configurás correctamente.
- Si una prueba falla, corregí el problema o documentá el bloqueo; nunca afirmes que pasó sin ejecutarla.
- Creá un commit local por **funcionalidad coherente** aprobada por las pruebas, con mensaje descriptivo. No hagas `git push`, merge ni PR.
- Reportá para cada commit el hash abreviado, archivos relevantes y pruebas realizadas. Si no se pudo hacer commit, indicá claramente por qué.

### Regla de implementación por fase

No uses todo el proyecto como una única edición. Implementá fases 0→5, con cambios pequeños y comprobables, y un punto de control por fase. **La fase 6 queda prohibida para el agente:** solo se documentan interfaces y pasos futuros para que la usuaria la implemente en el evento. Si el límite de contexto o una aprobación interrumpe el trabajo, dejá registrado el estado exacto y una instrucción de continuación reproducible. No finjas que seguís trabajando en segundo plano.

---

## 1. ¿QUÉ ES CONSTRUAGENT?

ConstruAgent será una aplicación web con un asistente inteligente que ayuda a las personas a calcular, presupuestar y comparar materiales de construcción.

El sistema representa los intereses del cliente, no los de un corralón.

### Ejemplo de funcionamiento

Un cliente entra a la página y escribe:

"Quiero colocar cerámicos en una habitación de 4 metros de largo por 3 metros de ancho. Tengo un presupuesto máximo de 80 U".

ConstruAgent deberá:

1. Entender la solicitud.
2. Solicitar información faltante.
3. Calcular la superficie.
4. Estimar materiales y cantidades.
5. Consultar precios en catálogos.
6. Generar un presupuesto detallado.
7. Comparar alternativas de distintos proveedores.
8. Recomendar una opción y explicar por qué.
9. Permitir una negociación con agentes proveedores.
10. Presentar una propuesta final para aprobación del cliente.

En esta primera versión utilizaremos datos, precios, proveedores y pagos simulados.

El sistema debe quedar preparado para convertirse en un agente real mediante BNB Agent Studio.

## 2. TECNOLOGÍAS Y ARQUITECTURA

Quiero utilizar preferentemente:

- Next.js con App Router.
- TypeScript estricto.
- React.
- Tailwind CSS.
- Componentes reutilizables.
- API Routes o Route Handlers de Next.js.
- Vitest para pruebas unitarias.
- Playwright para pruebas de interfaz.
- ESLint.
- Git para control de versiones.

Utilizá versiones estables compatibles entre sí.

No es necesario crear un backend independiente: quiero frontend y backend integrados en el mismo repositorio Next.js.

No incorpores bases de datos, servicios externos o bibliotecas pesadas sin una necesidad justificada.

### Arquitectura

Quiero un proyecto limpio, modular, escalable y entendible por una estudiante de Ingeniería en Sistemas.

Organizá el código separando claramente:

- Interfaz de usuario.
- Componentes visuales reutilizables.
- Lógica de presupuestos.
- Catálogo y precios.
- Comparación de proveedores.
- Reglas de negocio.
- Simulación de agentes.
- Servicios y rutas API.
- Tipos e interfaces.
- Configuraciones.
- Pruebas.
- Adaptadores para futuras integraciones.

Cada archivo debe tener una responsabilidad clara.

No quiero archivos enormes que mezclen interfaz, cálculos, consultas, lógica de negocio y validaciones.

Usá nombres descriptivos para archivos, variables, clases y funciones.

Agregá comentarios breves en español donde ayuden a entender decisiones o algoritmos. No agregues comentarios innecesarios en líneas evidentes.

Crear un documento `ARQUITECTURA.md` que explique qué hace cada carpeta importante, cómo se comunican los módulos y cómo agregar funcionalidades sin romper el sistema.

## 3. PRINCIPIOS OBLIGATORIOS

- No inventar resultados de operaciones reales.
- No simular pagos sin indicarlo claramente.
- No presentar datos ficticios como precios reales.
- No mezclar las reglas de negocio con el código visual.
- No permitir que un modelo de IA modifique precios o límites de gasto arbitrariamente.
- Validar los datos de entrada en el servidor.
- Nunca confirmar una compra real sin autorización explícita.
- No usar mainnet, dinero real ni credenciales de billeteras.
- No crear ni desplegar contratos blockchain durante las primeras fases.
- No agregar funcionalidades fuera del alcance sin justificar su necesidad.
- Priorizar software funcional, mantenible y probado.

---

# FASE 0 — PREPARACIÓN Y ARQUITECTURA

Objetivo: establecer la estructura profesional del proyecto.

Tareas:

1. Inspeccionar el repositorio actual.
2. Configurar Next.js y TypeScript si todavía no existen.
3. Preparar la arquitectura modular.
4. Configurar ESLint y herramientas de testing compatibles; verificar sus versiones y los scripts disponibles en `package.json`.
5. Configurar variables de entorno de ejemplo.
6. Crear `.gitignore` apropiado.
7. Crear README.
8. Crear `ARQUITECTURA.md` y un primer `ESTADO_DEL_PROYECTO.md` para reanudar el trabajo entre chats de Cursor.
9. Documentar cómo ejecutar el sistema localmente.
10. Verificar que la aplicación inicial compile.

No sobrescribir configuraciones existentes funcionales sin necesidad.

Criterios de aceptación:

- Proyecto ejecutable.
- Dependencias instaladas correctamente.
- Sin errores de compilación.
- Estructura documentada.
- Pruebas iniciales funcionando.

Realizar un commit local al terminar.

---

# FASE 1 — PÁGINA WEB E INTERFAZ DE USUARIO

Objetivo: construir una web moderna, clara y profesional.

Quiero una estética relacionada con arquitectura y construcción, utilizando una paleta de colores sobria, buena tipografía y componentes bien organizados.

La página debe verse bien en computadoras, tablets y celulares.

### Funcionalidades

1. Página principal con presentación de ConstruAgent.
2. Chat visual para conversar con el asistente.
3. Formulario para ingresar dimensiones de una habitación.
4. Panel de presupuestos.
5. Sección para comparar proveedores.
6. Pantalla o sección de negociaciones.
7. Indicadores claros de estados y resultados.
8. Mensajes de error y estados de carga.
9. Navegación consistente.

Quiero una interfaz sencilla de utilizar incluso para personas sin conocimientos tecnológicos.

### Chat

Debe existir un chat funcional que inicialmente se comunique con el backend local.

El chat tendrá respuestas deterministas para los casos del prototipo.

La arquitectura debe permitir incorporar más adelante un modelo LLM y herramientas de BNB Agent Studio.

No simular que está conectado a una IA real si todavía no lo está.

### Requisitos de diseño

- Diseño responsivo.
- Buena accesibilidad.
- Componentes reutilizables.
- Formularios con validaciones.
- Interacciones claras.
- Estética profesional, no una simple plantilla vacía.

Criterios de aceptación:

La aplicación debe permitir navegar entre secciones y utilizar los formularios básicos.

No deben existir botones decorativos que aparenten realizar acciones inexistentes.

Realizar commits locales al terminar cada funcionalidad coherente, además de verificar la fase completa.

---

# FASE 2 — MOTOR DE PRESUPUESTOS

Objetivo: construir el núcleo de ConstruAgent.

Primer caso de uso: colocación de cerámicos en una habitación rectangular.

### Funciones

- Solicitar medidas.
- Calcular superficie en m².
- Calcular cantidades de cerámicos.
- Aplicar un porcentaje configurable de desperdicio.
- Calcular cajas necesarias.
- Estimar adhesivo y pastina.
- Consultar materiales del catálogo.
- Calcular precios unitarios y subtotales.
- Generar presupuesto completo.
- Permitir copiar o guardar el resultado.

### Catálogo

Preparar un catálogo de ejemplo con materiales como:

- Cerámicos.
- Adhesivo.
- Pastina.

Cada producto debe tener identificador, nombre, unidad, precio ficticio, stock, características relevantes y rendimiento cuando corresponda.

Los rendimientos deben ser configurables y estar identificados como supuestos demostrativos.

No presentar una estimación de materiales como una recomendación técnica certificada.

El motor debe utilizar funciones independientes y comprobables.

Los cálculos deben hacerse en el backend o en módulos compartidos validados.

### Pruebas

- Medidas correctas.
- Medidas negativas.
- Medidas nulas.
- Valores no numéricos.
- Cálculo de cajas completas.
- Cálculo de totales.
- Redondeos.
- Productos sin stock.

Criterio de aceptación:

Un cliente debe poder ingresar una habitación de 4 × 3 metros y obtener un presupuesto consistente, con cantidades y precios ficticios claramente identificados.

Crear los commits locales correspondientes.

---

# FASE 3 — COMPARACIÓN INTELIGENTE

Objetivo: permitir que ConstruAgent recomiende materiales según las necesidades del cliente.

### Funcionalidades

1. Crear al menos dos proveedores ficticios.
2. Permitir consultar sus catálogos.
3. Comparar precios.
4. Verificar stock.
5. Comparar materiales equivalentes.
6. Considerar las preferencias del cliente.
7. Respetar presupuesto máximo.
8. Presentar diferentes alternativas.
9. Explicar las recomendaciones.
10. Manejar la situación en que ningún proveedor cumple los requisitos.

### Decisiones

Implementar reglas de negocio independientes del modelo LLM.

Ejemplos:

- No seleccionar productos agotados.
- No superar el presupuesto.
- No comparar como equivalentes productos incompatibles.
- Mostrar diferencias de cantidad y precio.
- No afirmar propiedades técnicas sin datos que las respalden.

La selección debe ser justificable y verificable.

### Preparación para BNB

Definir interfaces o adaptadores para futuras consultas on-chain, verificación de presupuesto disponible y pagos controlados.

Durante esta fase, estas integraciones deben permanecer simuladas o sin implementar.

No inventar información obtenida de blockchain.

Agregar pruebas automáticas.

Crear commits locales correspondientes.

---

# FASE 4 — NEGOCIACIÓN ENTRE AGENTES

Objetivo: preparar el funcionamiento del tercer nivel del workshop.

Construir una simulación funcional de dos agentes.

### Agente 1: ConstruAgent

Representa al comprador.

Puede:

- Solicitar ofertas.
- Comparar ofertas.
- Comprobar presupuestos.
- Evaluar disponibilidad.
- Proponer una compra.
- Aceptar o rechazar una oferta simulada.
- Solicitar autorización al cliente.

### Agente 2: ProveedorAgent

Representa a un proveedor.

Puede:

- Consultar su catálogo.
- Revisar stock.
- Responder solicitudes.
- Generar cotizaciones.
- Validar cantidades.
- Aceptar o rechazar propuestas.
- Generar una confirmación digital simulada.

### Flujo esperado

1. ConstruAgent necesita materiales.
2. Solicita una oferta a ProveedorAgent.
3. ProveedorAgent consulta su catálogo.
4. Responde con precio, cantidad y condiciones.
5. ConstruAgent verifica el presupuesto.
6. Decide si la oferta resulta aceptable.
7. Presenta el acuerdo al cliente.
8. Se simula la confirmación.
9. Se genera una orden digital.
10. Se registra el resultado.

Agregar estados claros y evitar operaciones duplicadas.

### Visualización

Quiero una sección web que permita ver cómo se comunican los dos agentes.

El usuario debe poder identificar:

- Qué solicita ConstruAgent.
- Qué responde ProveedorAgent.
- Qué condiciones se están evaluando.
- Por qué una oferta se acepta o rechaza.
- En qué estado está la operación.

La simulación debe distinguirse claramente de una operación blockchain real.

### Preparación para blockchain

Diseñar interfaces para integrar posteriormente:

- ERC-8004: identidad de agentes.
- ERC-8183: contratos de trabajo y pagos en custodia.
- x402: cobros por servicios.

Estas tecnologías NO deben implementarse todavía.

No crear identidades reales, contratos ni transacciones.

Agregar pruebas automáticas.

Crear commits locales correspondientes.

---

# FASE 5 — SEGURIDAD, TESTING Y DEMOSTRACIÓN

Objetivo: dejar ConstruAgent funcional y preparado para presentarlo.

### Pruebas

Revisar:

- Formularios.
- Chat.
- Catálogo.
- Cálculos.
- Presupuestos.
- Comparación.
- Disponibilidad.
- Límites de presupuesto.
- Negociación simulada.
- Navegación.
- Diseño móvil.
- Seguridad de datos.
- Estados de error.

Ejecutar pruebas unitarias y de integración.

Utilizar Playwright para comprobar los flujos principales de la interfaz.

Corregir errores detectados.

### Demostración final

Preparar un escenario completo:

Un cliente quiere colocar cerámicos en una habitación de 4 × 3 metros.

El sistema debe permitir:

1. Registrar la solicitud.
2. Calcular cantidades.
3. Generar presupuesto.
4. Comparar proveedores.
5. Elegir una oferta.
6. Solicitar cotización a ProveedorAgent.
7. Mostrar la negociación simulada.
8. Obtener la aprobación del cliente.
9. Generar el resultado final.

Este escenario debe poder ejecutarse desde la página web.

Agregar datos de demostración reproducibles y un mecanismo para reiniciar el escenario.

### Documentación

Crear:

- `README.md`
- `ARQUITECTURA.md`
- `GUIA_DEMO.md`
- `ESTADO_DEL_PROYECTO.md`
- `INTEGRACION_BNB.md`

Documentar cómo funciona cada módulo, qué está simulado y qué falta integrar.

Crear commits locales por correcciones y funcionalidades terminadas.

---

# FASE 6 — INTEGRACIÓN CON BNB AGENT STUDIO

IMPORTANTE: ESTA FASE NO DEBÉS EJECUTARLA.

La integración real la realizaré personalmente durante el BNB Builder Session.

Tu responsabilidad es dejar el proyecto preparado y documentado.

### Integraciones futuras

- BNB Agent Studio.
- Wallet de testnet.
- x402 para pagos.
- ERC-8004 para identidad.
- ERC-8183 para acuerdos en custodia.
- Lecturas on-chain.
- Comunicación real entre agentes.
- Opcionalmente deploy en AWS.

Crear un documento `INTEGRACION_BNB.md` que explique:

1. Qué módulos del proyecto se pueden reutilizar.
2. Qué funciones deben exponerse como herramientas del agente.
3. Qué partes son simuladas.
4. Qué componentes requieren sustitución.
5. Dónde configurar Studio.
6. Cómo conectar la página web con el agente.
7. Qué variables de entorno podrían necesitarse.
8. Cómo verificar las integraciones reales.
9. Qué pruebas realizar en BSC testnet.
10. Qué riesgos y limitaciones quedan pendientes.

Consultá la documentación o skills de Studio disponibles para fundamentar la guía.

Si no encontrás documentación suficiente para algún paso, indicá que debe verificarse. No inventes comandos ni APIs.

NO crear wallets, firmar transacciones, utilizar dinero real, hacer deploy ni iniciar servicios pagos.

---

# REGLAS ESPECIALES DE GIT

Quiero un historial de Git profesional y ordenado.

Por cada funcionalidad coherente terminada:

1. Ejecutar las pruebas correspondientes.
2. Verificar los archivos modificados.
3. Crear un commit local descriptivo **solo de archivos propios de esa funcionalidad**, sin incluir cambios preexistentes del usuario.
4. Evitar incluir archivos temporales o secretos.
5. Registrar qué se implementó.

Ejemplos:

- `chore: initialize project architecture`
- `feat: create responsive web layout`
- `feat: add construction quotation calculator`
- `feat: implement supplier comparison`
- `feat: add simulated agent negotiation`
- `test: cover quotation validation`
- `fix: correct material quantity rounding`

No hagas commits por cambios insignificantes de una sola línea salvo que sean correcciones independientes. Evitá commits vacíos; no incluyas `.env`, `.env.local`, claves ni directorios generados como `node_modules` o `.next`.

No hagas push a GitHub automáticamente.

No crees pull requests ni merges automáticamente.

No reescribas el historial existente.

No cambies de rama sin necesidad.

Si Git no está configurado o surge un problema de permisos, informalo en vez de forzar acciones.

---

# REGLAS PARA QUE YO PUEDA APRENDER DEL CÓDIGO

Soy estudiante de Ingeniería en Sistemas y quiero poder entender y modificar el proyecto después.

Por eso:

1. Usá nombres descriptivos.
2. Separá las responsabilidades.
3. Evitá archivos monolíticos.
4. Evitá duplicar lógica.
5. Utilizá interfaces y tipos donde corresponda.
6. Comentá algoritmos complejos.
7. Documentá las decisiones importantes.
8. Mantené frontend y backend organizados.
9. No incorpores abstracciones innecesarias.
10. Explicá qué hace cada componente importante.

En `ARQUITECTURA.md` quiero ejemplos concretos de cómo una solicitud pasa desde la interfaz web hasta el motor de presupuestos y cómo se genera la respuesta.

---

# FORMA DE TRABAJO

Quiero que trabajes en **Cursor Agent** en las fases 0, 1, 2, 3, 4 y 5, una funcionalidad verificable a la vez. Avanzá sin confirmación intermedia solo en acciones locales autorizadas, y mantené checkpoints documentados por fase para poder retomar con otro chat.

Seguí estas reglas:

- Inspeccioná primero el repositorio.
- Prepará un plan de implementación basado en los archivos reales existentes, no en suposiciones. Si se usó Plan Mode, implementá solo después de pasar a Agent.
- Desarrollá las fases en orden.
- Ejecutá pruebas después de cada funcionalidad importante.
- Corregí los errores detectados.
- Realizá commits locales por funcionalidad, sin incluir cambios anteriores o ajenos. Guardá hashes en `ESTADO_DEL_PROYECTO.md`.
- No hagas push.
- No ejecutes la fase 6.
- No solicites confirmación entre fases para acciones locales y seguras.
- Si una acción requiere credenciales, pagos, permisos externos o modifica recursos reales, detenete y pedí autorización.
- Si encontrás un bloqueo técnico, documentalo claramente; no lo ocultes ni declares éxito sin evidencia.
- Antes de cerrar cada fase, explicá brevemente qué carpetas/archivos importantes agregaste y cómo se conectan.
- Si necesitás pausar por un límite de contexto, dejá la fase actual reproducible y un prompt corto para continuar desde ahí.

Al finalizar, entregame un resumen de cada fase, funcionalidades implementadas, resultados de pruebas, commits creados, problemas pendientes y pasos para integrar BNB Agent Studio.

El objetivo final es tener una página web completamente funcional con presupuestos, comparación de proveedores y negociación simulada, lista para conectar al agente BNB durante el workshop.

Empezá analizando el repositorio y desarrollando la fase 0.
