# Guía de demostración

## Preparación

```bash
cd construagent
pnpm install
pnpm --filter construagent-web dev
```

Abrir `http://localhost:3000`. Todo lo que aparece es local y ficticio; no requiere cuenta, wallet ni variables secretas.

## Escenario principal (4 × 3 m)

1. En el chat escribir: `Habitación de 4 x 3 metros, presupuesto máximo 200 U`.
2. Verificar que el formulario reciba ancho 4, largo 3 y máximo 200.
3. Presionar **Calcular y comparar**.
4. Explicar el cálculo: 12 m², 10 % de desperdicio y unidades completas según rendimiento.
5. Revisar las dos tarjetas. Casa Sur se recomienda porque posee stock, respeta el límite y es la opción de menor costo.
6. Presionar **Solicitar oferta** en la alternativa recomendada.
7. Mostrar el diálogo entre ConstruAgent y ProveedorAgent y el descuento determinista ficticio.
8. Presionar **Aprobar simulación**.
9. Mostrar el estado `confirmada` y el identificador `ORD-...`. Aclarar que no hubo pago ni transacción.
10. Presionar **Reiniciar escenario** para volver al estado inicial.

## Casos alternativos

- Máximo `80 U`: ninguna oferta se recomienda y la negociación se rechaza por exceder el techo.
- Medida negativa o cero: la API devuelve validación y la interfaz muestra el error.
- Habitación de `30 × 30`: se informa stock insuficiente y se deshabilita solicitar oferta.
- Chat sin medidas: ConstruAgent pide largo y ancho en vez de inventarlos.

## Verificación automatizada

```bash
pnpm --filter construagent-web test
pnpm --filter construagent-web typecheck
pnpm --filter construagent-web lint
pnpm --filter construagent-web build
pnpm --filter construagent-web test:e2e
```

La primera vez, instalar Chromium con `pnpm --filter construagent-web exec playwright install chromium`.

