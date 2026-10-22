# Integración futura con BNB Agent Studio

> Preparación local, no integración real. Este documento no prueba protocolos externos ni autoriza wallets, firmas, pagos o despliegues.

## Estado y límite actual

La web permanece en `CONSTRUAGENT_INTEGRATION_MODE=simulation`. El contenedor rechaza cualquier otro valor. `app/agent/` conserva el scaffold generado por BNB Agent Studio y no fue modificado durante esta preparación. No se ejecutó `bag`, no se consultó blockchain y no existe una conexión entre la web y el agente.

La sesión actual no ofreció una skill oficial callable de BNB Agent Studio. Por eso, nombres de métodos, payloads, endpoints, variables y secuencias que dependan de Studio quedan expresamente pendientes de verificar durante el evento.

## 1. Módulos reutilizables

- `features/budgets`: cálculo y validación deterministas.
- `features/catalog`: catálogo local; sirve como fixture y contrato funcional.
- `features/suppliers`: comparación independiente de la fuente de datos.
- `features/negotiation`: reglas locales de techo, stock, aprobación e idempotencia.
- `integrations/contracts.ts`: puertos agnósticos para catálogo, identidad, negociación, acuerdos y pagos.
- `integrations/container.ts`: único composition root de la web.
- Route Handlers: frontera HTTP propia de la web, donde deben validarse respuestas externas antes de llegar a la UI.

## 2. Capacidades candidatas a herramientas

Solo deben considerarse herramientas las operaciones de lectura o propuesta que la documentación oficial confirme como seguras:

- consultar catálogo y stock;
- solicitar o leer una oferta;
- consultar estado de un acuerdo o pago;
- resolver identidad pública de un agente.

No exponer como herramienta LLM: firma, envío de transacciones, cambio de red/activo, modificación de precios o límites, aprobación del cliente ni acceso a claves. `app/agent/src/signing.ts` debe continuar como punto fijo y no invocable por el modelo. Los nombres y esquemas finales de herramientas están pendientes de la documentación oficial.

## 3. Partes simuladas

- identidades locales sin verificación (`verified: false`);
- proveedores, productos, precios y stock;
- diálogo y descuento de negociación;
- referencias `SIM-AGREEMENT-*` y `SIM-PAYMENT-*`;
- órdenes `ORD-*` y activo visual `U`;
- estados de custodia/pago, que son vistas previas no ejecutables;
- endpoint `GET /api/integrations/status`, que solo describe capacidades locales.

## 4. Componentes que requieren sustitución

| Simulación actual | Puerto | Sustitución futura |
| --- | --- | --- |
| `catalogAdapter.ts` | `CatalogPort` | fuente verificable de catálogo/stock |
| `identityAdapter.ts` | `AgentIdentityPort` | resolución ERC-8004 confirmada por documentación |
| `negotiationAdapter.ts` | `NegotiationPort` | comunicación estructurada entre agentes |
| `agreementAdapter.ts` | `AgreementPort` | preparación/observación ERC-8183 |
| `paymentAdapter.ts` | `PaymentPort` | vista y ejecución controlada x402, fuera de la web |

No reemplazar el motor de presupuesto ni el comparador: deben seguir gobernando cantidades y techo de gasto.

## 5. Configuración

- Web: `app/web/.env.example` documenta solamente `CONSTRUAGENT_INTEGRATION_MODE=simulation`.
- Composition root: `app/web/src/integrations/container.ts`.
- Studio: `app/agent/studio.toml`, sujeto a `AGENTS.md`.
- Secretos: únicamente archivos locales ignorados que indique la documentación oficial. Nunca agregar valores reales a `.env.example`.

No agregar un modo `external` hasta conocer y probar el adaptador real. Habilitarlo debe requerir código explícito, validación y pruebas; nunca basta con cambiar una variable.

## 6. Conexión futura entre página y agente

Flujo recomendado, aún no implementado:

1. La UI llama a un Route Handler de la web.
2. El handler valida entrada y autorización humana.
3. El handler usa un puerto de `integrations/`, no importa el SDK directamente.
4. Un adaptador futuro traduce el contrato interno al protocolo oficial.
5. La respuesta externa se valida, normaliza y etiqueta con su origen.
6. El motor local vuelve a verificar stock, monto y techo antes de mostrar una acción.
7. Cualquier firma ocurre exclusivamente en el agente, nunca en el navegador o chat.

Transporte, autenticación, URL y payload exactos están pendientes de documentación oficial; no se presuponen aquí.

## 7. Variables de entorno potenciales

Confirmada localmente:

- `CONSTRUAGENT_INTEGRATION_MODE=simulation`.

Pendientes de definir con documentación oficial: URL pública/privada del agente, autenticación, red y parámetros de observación. No se proponen nombres para evitar consolidar una API inventada. Credenciales, contraseñas de wallet y claves nunca deben llevar prefijo `NEXT_PUBLIC_`.

## 8. Verificación de integraciones reales

Durante el evento, con la skill/documentación oficial disponible:

1. comprobar versiones de CLI/SDK y requisitos del scaffold;
2. revisar cambios de `studio.toml` sin ampliar políticas silenciosamente;
3. probar cada adaptador por separado contra testnet;
4. validar esquemas y errores antes de conectarlos a la UI;
5. demostrar que entradas manipuladas no alteran precio, activo o límite;
6. conservar una autorización humana trazable;
7. verificar reintentos e idempotencia ante respuestas desconocidas;
8. ejecutar los chequeos oficiales de readiness indicados por Studio.

Los comandos operativos exactos deben tomarse de la versión oficial disponible ese día. `AGENTS.md` confirma que un deploy futuro requiere proveedor explícito, pero esta preparación no lo ejecuta.

## 9. Pruebas en BSC testnet

- identidad válida, inexistente y red incorrecta;
- catálogo/stock disponibles, agotados y respuesta vencida;
- oferta dentro/fuera del techo y expiración;
- rechazo antes de firma y aprobación única;
- token permitido/no permitido, decimales y monto atómico exacto;
- acuerdo creado, financiado, entregado, disputado y expirado según documentación oficial;
- reintento sin duplicar acuerdo, orden ni pago;
- reinicio del proceso y recuperación de estado;
- credencial x402 inválida, repetida y liquidación desconocida;
- UI mostrando hash/estado solo después de evidencia verificable.

No ejecutar estos casos hasta que la propietaria habilite fase 6 real.

## 10. Riesgos y limitaciones pendientes

- Contratos internos aún no están mapeados a esquemas oficiales.
- No hay persistencia ni reconciliación de operaciones reales.
- No hay autenticación entre la web y el agente.
- No se definieron red, tokens, contratos ni endpoints para la web.
- Una prueba local no valida identidad, saldo, escrow o liquidación.
- x402/MPP requiere replay store durable y atómico antes de producción; memoria de proceso no resuelve M01.
- Readiness exitoso no prueba que M01 esté solucionado.
- Costos, rate limits, observabilidad, privacidad y recuperación deben revisarse antes de deploy.

## Responsabilidades personales durante el evento

1. Instalar/cargar la skill oficial de `bnbagent-studio` y verificar documentación/versiones.
2. Crear una rama exclusiva de integración.
3. Elegir testnet, wallet descartable y activos permitidos.
4. Configurar secretos sin imprimirlos ni versionarlos.
5. Implementar adaptadores reales uno por uno detrás de los puertos existentes.
6. Aprobar personalmente identidades, firmas, transacciones, pagos y proveedor de deploy.
7. Resolver persistencia/replay y revisar seguridad antes de cualquier prueba pagada.

