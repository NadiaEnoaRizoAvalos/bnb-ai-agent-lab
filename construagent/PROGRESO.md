# Progreso de ConstruAgent

Última actualización: 2026-10-22

## Pausa segura

Desarrollo pausado a solicitud de la propietaria para trasladar el equipo. No hay servidores del proyecto escuchando en los puertos 3000, 9000 o 8088 y no quedó una ejecución de Playwright activa. Los resultados temporales, dependencias, `.next/` y `.studio/` permanecen ignorados por Git.

## Estado por fase

| Fase | Estado | Avance | Resultado |
| --- | --- | ---: | --- |
| 0. Preparación y arquitectura | Completada | 100 % | Workspace, Next.js, TypeScript estricto, Tailwind, Vitest, Playwright, ESLint y documentación base. |
| 1. Web e interfaz | Completada | 100 % | Portada responsive, navegación, chat local, formulario, estados, comparación y negociación visibles. |
| 2. Motor de presupuestos | Completada | 100 % | Superficie, desperdicio, cajas, adhesivo, pastina, stock, subtotales, total y validación de servidor. |
| 3. Comparación inteligente | Completada | 100 % | Dos proveedores ficticios, equivalencias acotadas, stock, techo de gasto, orden por costo y explicación. |
| 4. Negociación entre agentes | Completada | 100 % | Oferta simulada, descuento determinista, aprobación humana, rechazo, orden ficticia e idempotencia. |
| 5. Seguridad, testing y demo | Completada | 100 % | Unitarias, integración, build, E2E, guía de demo, transferencia y seguridad documentadas. |
| 6. BNB Agent Studio | Reservada/bloqueada por alcance | 0 % | No ejecutar. Solo documentar interfaces futuras para la propietaria. |

Avance global de las fases autorizadas (0–5): **100 %**.

No existe una fase 0–5 actualmente en desarrollo: todas están terminadas. El proyecto queda pausado antes de la fase 6, que no forma parte del alcance autorizado y debe iniciarla personalmente la propietaria.

## Funcionalidades implementadas

- Catálogo demostrativo con dos proveedores y tres clases de materiales.
- API `POST /api/budgets` con validación y comparación.
- Chat determinista mediante `POST /api/chat`; no se presenta como IA real.
- Negociación local mediante `POST /api/negotiations`.
- Flujo responsive de 4 × 3 m, copia de resultado y reinicio de escenario.
- Avisos visibles de simulación, sin pagos, wallets ni blockchain.

## Commits

- `bd2061b` — preparación y arquitectura inicial.
- `ba01eba` — motor de presupuestos simulado.
- `6da289f` — interfaz, chat, comparación y negociación simulada.
- `ccdd43f` — recálculo seguro de ofertas en el servidor.
- Último commit confirmado antes del cierre documental: `ccdd43f`.

## Pruebas

Aprobadas el 2026-10-22:

- Vitest: 15/15.
- TypeScript: sin errores.
- ESLint: sin errores ni advertencias.
- Next.js build: correcto.
- Playwright Chromium: 2/2, ejecutado fuera del sandbox del editor.

Pruebas pendientes: ninguna para las fases 0–5. Al reanudar conviene repetir la matriz completa únicamente si cambió el código o el entorno.

## Problemas conocidos

- Playwright necesita Chromium instalado con `pnpm exec playwright install chromium`.
- Dentro del sandbox de Codex, Chromium puede quedar bloqueado; ejecutar Playwright con permiso de proceso externo.
- Next.js avisa en desarrollo sobre el origen `127.0.0.1`; no afecta el build ni los tests actuales.
- Los precios, stocks, descuentos y órdenes son exclusivamente ficticios.
- No existen errores bloqueantes conocidos. La advertencia de `allowedDevOrigins` de Next.js durante Playwright es informativa y no afecta el build ni los flujos actuales.

## Próxima tarea exacta

Al reanudar: abrir la raíz `bnb-ai-agent-lab`, leer `PROGRESO.md`, `CONTEXTO_AGENTES.md`, `AGENTS.md` e `INTEGRACION_BNB.md`, ejecutar `git status` y confirmar que la rama siga limpia. No hace falta continuar las fases 0–5. La única fase restante del plan total es la fase 6, reservada a la propietaria; debe iniciarse en una rama separada y con autorización explícita, manteniendo testnet/simulación hasta completar su revisión de seguridad.

## Qué falta para completar el plan total

Solo falta la integración real de fase 6: identidad, comunicación con agentes, wallet de testnet, contratos y pagos controlados. Esa fase está deliberadamente sin ejecutar; la aplicación web demostrativa ya está completa.
