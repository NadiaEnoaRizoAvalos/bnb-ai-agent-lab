# ConstruAgent

Aplicación web (Next.js) para presupuestar y comparar materiales de construcción, más el agente vendedor de **BNB Agent Studio**. Las fases 0–5 usan **datos simulados**. La integración on-chain (fase 6) queda fuera de este trabajo.

## Cómo ejecutar la web

Requisitos: Node.js ≥ 22 y pnpm 10.

```bash
cd construagent
pnpm install
pnpm --filter construagent-web dev
```

Abrí [http://localhost:3000](http://localhost:3000).

```bash
pnpm --filter construagent-web test
pnpm --filter construagent-web lint
pnpm --filter construagent-web typecheck
pnpm --filter construagent-web build
```

Copiá `app/web/.env.example` a `app/web/.env.local` si querés variables locales. No pongas claves reales.

Documentos principales:

- `PROGRESO.md` — checkpoint exacto y pruebas.
- `CONTEXTO_AGENTES.md` — transferencia a Cursor, Codex, Antigravity o VS Code.
- `ARQUITECTURA.md` — módulos y comunicación.
- `GUIA_DEMO.md` — recorrido reproducible.
- `INTEGRACION_BNB.md` — interfaces y resguardos para la fase reservada.
- `CAMBIOS.md` — registro por fase y commit.

El plan maestro original está en `../.cursor/PlanAgent_Cursor.md`.

## Agente Studio (`app/agent/`)

- `app/agent/` — agente + único firmante on-chain.
- `.studio/` — secretos; **nunca** se commitea.
- `bag doctor` — chequeos (desde esta carpeta).
- `bag dev` — A2A + X402 en el puerto 9000.
- No ejecutes `bag init` de nuevo. No crees wallets ni deploys en las fases 0–5.
