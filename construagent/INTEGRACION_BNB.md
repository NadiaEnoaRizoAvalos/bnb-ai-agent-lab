# Integración futura con BNB Agent Studio

> Esta fase no está implementada. Es una guía para la propietaria; no prueba conexiones on-chain ni autoriza pagos.

## Estado actual

La web de `app/web/` opera con adaptadores locales y datos ficticios. `app/agent/` contiene el scaffold generado por BNB Agent Studio, pero ambos subsistemas permanecen deliberadamente desconectados. No existe wallet configurada, identidad real, contrato desplegado ni pago.

## Límites de integración sugeridos

Crear adaptadores detrás de interfaces de dominio, sin mover reglas comerciales a un LLM:

- `CatalogProvider`: consultar productos y disponibilidad verificable.
- `AgentIdentityProvider`: resolver identidad ERC-8004.
- `NegotiationProvider`: intercambiar ofertas estructuradas con agentes.
- `EscrowProvider`: preparar y observar trabajos ERC-8183.
- `PaymentProvider`: manejar el protocolo x402 únicamente después de aprobación explícita.

El motor de presupuestos, el límite de gasto y la selección deben seguir siendo deterministas. Cualquier precio remoto debe validarse y mostrarse con origen, red y momento de consulta.

## Secuencia recomendada para la propietaria

1. Crear una rama exclusiva para la integración.
2. Leer `AGENTS.md` y cargar la skill oficial de `bnbagent-studio` antes de operar el scaffold.
3. Usar solamente testnet y una wallet descartable, manteniendo `.studio/wallets/` fuera de `app/agent/`.
4. Implementar primero lecturas y contratos TypeScript de los adaptadores.
5. Agregar aprobación humana antes de cualquier firma o gasto.
6. Probar cotización, expiración, rechazo, reintentos e idempotencia.
7. Ejecutar `bag doctor` y la preparación de deploy solo cuando decidas iniciar fase 6.
8. Elegir proveedor de deploy de forma explícita; nunca ejecutar deploy desde la web.

## Invariantes de seguridad

- `app/agent/src/signing.ts` continúa como único punto de firma.
- La firma nunca se expone como herramienta del modelo.
- No versionar `.env.local`, `.studio/`, claves, mnemónicos ni contraseñas.
- No permitir que texto del chat cambie precio, red, token, contrato o techo de gasto.
- Verificar chain ID, activo, decimales, vencimiento y monto atómico antes de firmar.
- La protección de replay para x402/MPP debe usar un almacenamiento durable antes de producción; memoria de proceso no es suficiente.
- Una readiness check aprobada no demuestra por sí sola que el riesgo de replay esté resuelto.

## Criterio de finalización futuro

La integración solo estará completa cuando haya pruebas en testnet, trazabilidad de autorizaciones, recuperación ante errores, documentación de costos y una revisión manual de seguridad. Hasta entonces la interfaz debe conservar la etiqueta de simulación.

