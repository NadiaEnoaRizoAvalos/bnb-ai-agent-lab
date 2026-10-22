# Registro de cambios

## 2026-10-22

### Fase 0 — Preparación (`bd2061b`)

- Se incorporó el workspace heredado de Cursor y el scaffold de BNB Agent Studio.
- Se configuró la web Next.js, TypeScript, ESLint, Vitest y Playwright.
- Se corrigió el cargador ESM de Vitest para el workspace restringido.

### Fase 2 — Motor de presupuestos (`ba01eba`)

- Se agregó el catálogo ficticio con dos proveedores.
- Se implementaron superficie, desperdicio, rendimientos, unidades enteras, stock y totales.
- Se agregó validación de servidor y API de presupuestos.
- Se cubrieron medidas inválidas, redondeos, stock y caso 4 × 3 m.

### Fases 1, 3 y 4 — Interfaz y experiencia completa (`6da289f`)

- Se creó una interfaz responsive con chat, formulario, tarjetas y navegación.
- Se agregó comparación explicable con techo de gasto.
- Se agregó negociación simulada con aprobación humana y orden ficticia.
- Se implementaron APIs de chat y negociación.
- Se aprobaron 15 pruebas Vitest, typecheck, lint, build y 2 pruebas E2E en Chromium.

### Fase 5 — Seguridad y demostración (`ccdd43f` + commit documental siguiente)

- Se impidió confiar en precios enviados por el navegador: la oferta se recalcula en el servidor.
- Se incorporaron guía de demo, contexto multiagente, progreso y guía de integración futura.
- Se documentaron límites de seguridad, comandos y proceso de transferencia.
- Matriz final: 15/15 Vitest, TypeScript, ESLint, build y 2/2 Playwright aprobados.
