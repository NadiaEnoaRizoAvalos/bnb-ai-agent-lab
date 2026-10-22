import { DEMO_NOTICE } from "@/lib/demoFlags";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
        Prototipo local
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
        ConstruAgent
      </h1>
      <p className="text-lg leading-relaxed text-stone-700">
        Asistente para calcular, presupuestar y comparar materiales de
        construcción. Representa al cliente, no al corralón.
      </p>
      <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        {DEMO_NOTICE}
      </p>
    </main>
  );
}
