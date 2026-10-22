# Progreso de ConstruAgent

Última actualización: 2026-10-22

## Reanudación y alcance actual

El desarrollo fue reanudado para preparar localmente la fase 6 sin conexiones reales. Los resultados temporales, dependencias, `.next/` y `.studio/` permanecen ignorados por Git.

## Estado por fase

| Fase | Estado | Avance | Resultado |
| --- | --- | ---: | --- |
| 0. Preparación y arquitectura | Completada | 100 % | Workspace, Next.js, TypeScript estricto, Tailwind, Vitest, Playwright, ESLint y documentación base. |
| 1. Web e interfaz | Completada | 100 % | Portada responsive, navegación, chat local, formulario, estados, comparación y negociación visibles. |
| 2. Motor de presupuestos | Completada | 100 % | Superficie, desperdicio, cajas, adhesivo, pastina, stock, subtotales, total y validación de servidor. |
| 3. Comparación inteligente | Completada | 100 % | Dos proveedores ficticios, equivalencias acotadas, stock, techo de gasto, orden por costo y explicación. |
| 4. Negociación entre agentes | Completada | 100 % | Oferta simulada, descuento determinista, aprobación humana, rechazo, orden ficticia e idempotencia. |
| 5. Seguridad, testing y demo | Completada | 100 % | Unitarias, integración, build, E2E, guía de demo, transferencia y seguridad documentadas. |
| 6. BNB Agent Studio | Preparación local completada; integración real pendiente | 35 % | Puertos, mocks, configuración fail-closed, diagnóstico y pruebas listos. Sin SDK, wallet, red, firma, pago ni deploy. |

Avance global de las fases autorizadas (0–5): **100 %**.
Avance aproximado del plan completo, contando la preparación parcial de fase 6: **91 %**.

No existe una fase 0–5 actualmente en desarrollo: todas están terminadas. La fase 6 está en preparación, con todo lo verificable localmente completo. La conexión real queda reservada a la propietaria.

## Funcionalidades implementadas

- Catálogo demostrativo con dos proveedores y tres clases de materiales.
- API `POST /api/budgets` con validación y comparación.
- Chat determinista mediante `POST /api/chat`; no se presenta como IA real.
- Negociación local mediante `POST /api/negotiations`.
- Flujo responsive de 4 × 3 m, copia de resultado y reinicio de escenario.
- Avisos visibles de simulación, sin pagos, wallets ni blockchain.
- Puertos neutrales para catálogo, identidad, negociación, acuerdos y pagos.
- Adaptadores simulados no ejecutables y endpoint local de capacidades.
- Configuración que rechaza cualquier modo externo no implementado.

## Commits

- `bd2061b` — preparación y arquitectura inicial.
- `ba01eba` — motor de presupuestos simulado.
- `6da289f` — interfaz, chat, comparación y negociación simulada.
- `ccdd43f` — recálculo seguro de ofertas en el servidor.
- `53c3dcb` — cierre documental de fases 0–5.
- `6465307` — checkpoint de pausa segura.
- `e60dd01` — puertos y adaptadores simulados para integraciones futuras.
- `f7f8877` — configuración fail-closed para impedir conexiones accidentales.
- `e972a34` — frontera simulada para lecturas on-chain sin inventar resultados.

## Pruebas

Aprobadas el 2026-10-22:

- Vitest: 22/22.
- TypeScript: sin errores.
- ESLint: sin errores ni advertencias.
- Next.js build: correcto.
- Playwright Chromium: 2/2, ejecutado fuera del sandbox del editor.

Pruebas pendientes: ninguna para la preparación local. Las pruebas contra BSC testnet, Studio, ERC-8004, ERC-8183 y x402 requieren documentación oficial, credenciales/testnet y autorización personal.

## Problemas conocidos

- Playwright necesita Chromium instalado con `pnpm exec playwright install chromium`.
- Dentro del sandbox de Codex, Chromium puede quedar bloqueado; ejecutar Playwright con permiso de proceso externo.
- Next.js avisa en desarrollo sobre el origen `127.0.0.1`; no afecta el build ni los tests actuales.
- Los precios, stocks, descuentos y órdenes son exclusivamente ficticios.
- No existen errores bloqueantes conocidos. La advertencia de `allowedDevOrigins` de Next.js durante Playwright es informativa y no afecta el build ni los flujos actuales.

## Próxima tarea exacta

Durante el evento: abrir una rama separada, cargar la skill/documentación oficial de la versión instalada, revisar `INTEGRACION_BNB.md` y mapear **un solo puerto por vez** a su API oficial, empezando por lecturas sin firma. Mantener `simulation` hasta que cada adaptador tenga validación y pruebas de testnet.

## Qué falta para completar el plan total

Falta la integración real de fase 6: confirmar APIs oficiales, autenticación, identidad, comunicación, wallet de testnet, lecturas, acuerdos, pagos, persistencia/replay y deploy opcional. Todo ello está deliberadamente sin ejecutar; la aplicación y la arquitectura preparatoria están completas.
