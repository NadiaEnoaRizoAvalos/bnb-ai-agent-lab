# ConstruAgent Web

Aplicación Next.js local para calcular materiales, comparar proveedores y visualizar una negociación simulada. No usa blockchain, pagos, wallets ni una IA remota.

## Desarrollo

Desde la raíz `construagent/`:

```bash
pnpm install
pnpm --filter construagent-web dev
```

Abrir `http://localhost:3000`.

## Calidad

```bash
pnpm --filter construagent-web test
pnpm --filter construagent-web typecheck
pnpm --filter construagent-web lint
pnpm --filter construagent-web build
pnpm --filter construagent-web test:e2e
```

Para la primera ejecución E2E:

```bash
pnpm --filter construagent-web exec playwright install chromium
```

La documentación completa y el estado se encuentran en la raíz de `construagent/`.
