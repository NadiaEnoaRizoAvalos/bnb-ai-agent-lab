# Contexto para agentes de programación

Este documento permite continuar ConstruAgent desde Cursor, Codex, Google Antigravity o VS Code sin depender del historial de una conversación.

## Objetivo

ConstruAgent es una aplicación web que representa a una persona compradora: calcula materiales para colocar cerámicos, compara proveedores ficticios y muestra una negociación simulada antes de pedir aprobación. Las fases 0–5 son una demo local. La fase 6, integración real con BNB Agent Studio, wallets y pagos, está reservada a la propietaria.

## Tecnologías

- Next.js 15 (App Router), React 19 y TypeScript estricto.
- Tailwind CSS 4 más estilos CSS propios.
- Route Handlers para entradas del cliente.
- Vitest para reglas de negocio y Playwright para flujos E2E.
- pnpm 10; Node.js 22 o superior (el entorno actual usa Node 25).

## Estructura relevante

```text
construagent/
├── app/web/src/app/              # página y APIs locales
├── app/web/src/components/       # interfaz reutilizable
├── app/web/src/features/
│   ├── budgets/                  # validación y cálculos puros
│   ├── catalog/                  # datos ficticios
│   ├── chat/                     # interpretación determinista
│   ├── suppliers/                # comparación explicable
│   └── negotiation/              # estados y autorización
├── app/web/src/types/            # contratos compartidos
├── app/web/tests/                # Vitest y Playwright
└── app/agent/                    # scaffold BNB; no modificar en fases 0–5
```

## Decisiones técnicas

- La lógica comercial vive fuera de React y es testeable como funciones puras.
- Toda entrada de presupuesto se valida en el servidor.
- Los productos equivalentes están fijados por tipo; el chat no decide precios ni límites.
- La comparación filtra falta de stock y presupuestos excedidos antes de recomendar.
- Una negociación confirmada es idempotente: aprobar otra vez no genera otra orden.
- No hay base de datos. El estado de UI es efímero y el catálogo es TypeScript.
- Se usan fuentes del sistema para que desarrollo y tests no dependan de Google Fonts.

## Convenciones

- Archivos pequeños, una responsabilidad y nombres descriptivos.
- Comentarios en español solo para supuestos o decisiones no evidentes.
- Precios con dos decimales y cantidades físicas redondeadas hacia arriba.
- Todo dato ficticio debe mostrarse como demostrativo.
- Antes de cada commit: revisar `git status`, `git diff --check`, tests, typecheck y lint.
- No hacer push, rebase, reset destructivo ni sobrescribir cambios ajenos.

## Comandos

Desde `construagent/`:

```bash
pnpm install
pnpm --filter construagent-web dev
pnpm --filter construagent-web test
pnpm --filter construagent-web typecheck
pnpm --filter construagent-web lint
pnpm --filter construagent-web build
pnpm --filter construagent-web test:e2e
```

En PowerShell puede ser necesario escribir `pnpm.cmd`. La primera ejecución E2E requiere `pnpm exec playwright install chromium`.

## Seguridad y límites

- No ejecutar `bag wallet`, `bag deploy`, pagos, contratos, mainnet, AWS ni servicios pagos.
- No leer, imprimir, mover o versionar `.studio/`, `.env.local`, wallets o secretos.
- No conectar `app/web` con `app/agent` todavía.
- `app/agent/src/signing.ts` es el único lugar futuro para firma on-chain y no es una herramienta LLM.
- Mantener precios, stocks, identidad de agentes y órdenes en modo ficticio.

## Estado para continuar

Fases 0–5 implementadas y verificadas. No hay tareas pendientes dentro del alcance autorizado. La fase 6 solo puede iniciarla la propietaria con autorización explícita. Leer primero `PROGRESO.md`, `CAMBIOS.md`, `ARQUITECTURA.md`, `INTEGRACION_BNB.md`, `AGENTS.md` y ejecutar `git status`. No repetir el motor ni el flujo E2E ya funcional.
