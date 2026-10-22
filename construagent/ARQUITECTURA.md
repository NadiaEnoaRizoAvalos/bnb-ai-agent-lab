# Arquitectura de ConstruAgent

ConstruAgent combina dos piezas en el mismo workspace de BNB Agent Studio:

| Ruta | Rol |
| --- | --- |
| `app/agent/` | Agente vendedor de Studio (A2A + X402). Único firmante on-chain. **No se modifica para la demo web de las fases 0–5.** |
| `app/web/` | Aplicación Next.js (App Router) con presupuestos, comparación y negociación **simulados**. |

`.studio/` queda en la raíz de `construagent/` (fuera de `app/agent/`) y no se versiona.

## App web (`app/web/src`)

- `app/` — páginas, layouts y Route Handlers (`app/api/...`).
- `components/` — piezas visuales reutilizables (botones, avisos, navegación).
- `features/budgets/` — superficie, cantidades y presupuesto.
- `features/catalog/` — productos, stock y precios demostrativos.
- `features/suppliers/` — comparación entre proveedores.
- `features/chat/` — chat determinista del prototipo.
- `features/negotiation/` — orquestación y estados simulados.
- `lib/` — validaciones, banderas de demo y adaptadores futuros.
- `types/` — contratos de datos compartidos.
- `tests/` — Vitest (reglas de negocio) y Playwright (flujos de UI).

Las reglas de negocio no viven en componentes React. La UI llama a Route Handlers; esos handlers usan módulos de `features/` y `lib/`.

## Recorrido de una solicitud (habitación 4 × 3 m)

1. La persona completa el formulario o escribe en el chat.
2. El cliente envía `POST /api/budgets` (o el chat deriva las medidas y llama al mismo motor).
3. El servidor valida números (no negativos, finitos).
4. `features/budgets` calcula m², desperdicio, cajas, adhesivo y pastina.
5. `features/catalog` aporta precios **ficticios** etiquetados como demostrativos.
6. La página pinta el presupuesto; luego comparación y negociación reutilizan ese resultado.

No hay base de datos: el catálogo es un módulo TypeScript. La fase 6 (fuera de este trabajo) sustituirá adaptadores en `lib/adapters/` por lecturas reales de Studio.

## Cómo agregar una función

1. Tipos en `src/types`.
2. Regla pura y testeable en `features/<modulo>`.
3. Prueba Vitest en `tests/`.
4. Route Handler si hace falta I/O o validación de servidor.
5. Componente de UI delgado que consume JSON.

## Invariantes

- Precios y pagos se muestran como simulados.
- Un modelo de IA no puede cambiar precios ni techos de gasto.
- `app/agent/src/signing.ts` no se usa desde la web en fases 0–5.
