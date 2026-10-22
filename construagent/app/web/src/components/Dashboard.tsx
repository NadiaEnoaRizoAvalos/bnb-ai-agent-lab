"use client";

import { FormEvent, useState } from "react";
import type { BudgetResult, ComparisonResult, NegotiationResult } from "@/types/domain";
import { DemoBadge } from "./DemoBadge";

type ChatMessage = { role: "persona" | "assistant"; text: string };

export function Dashboard() {
  const [form, setForm] = useState({ width: "4", length: "3", wastePercent: "10", maxBudget: "200" });
  const [budgets, setBudgets] = useState<BudgetResult[]>([]);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [negotiation, setNegotiation] = useState<NegotiationResult | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([{ role: "assistant", text: "Hola. Contame las medidas, por ejemplo: habitación de 4 x 3 metros." }]);
  const [chatInput, setChatInput] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function calculate(event?: FormEvent) {
    event?.preventDefault();
    setLoading(true);
    setStatus("");
    setNegotiation(null);
    try {
      const response = await fetch("/api/budgets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(numericForm(form)) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setBudgets(data.budgets);
      setComparison(data.comparison);
      setStatus("Presupuestos calculados con datos demostrativos.");
      setTimeout(() => document.querySelector("#comparacion")?.scrollIntoView({ behavior: "smooth" }), 0);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo calcular.");
    } finally {
      setLoading(false);
    }
  }

  async function sendChat(event: FormEvent) {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message) return;
    setChat((current) => [...current, { role: "persona", text: message }]);
    setChatInput("");
    const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message }) });
    const data = await response.json();
    setChat((current) => [...current, { role: "assistant", text: data.message ?? data.error }]);
    if (data.extracted) setForm((current) => ({ ...current, width: String(data.extracted.width), length: String(data.extracted.length), maxBudget: data.extracted.maxBudget ? String(data.extracted.maxBudget) : current.maxBudget }));
  }

  async function negotiate(budget: BudgetResult) {
    const response = await fetch("/api/negotiations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "request", budget, maxBudget: optionalNumber(form.maxBudget) }) });
    const data = await response.json();
    setNegotiation(data.negotiation);
    setTimeout(() => document.querySelector("#negociacion")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  async function decide(approved: boolean) {
    const response = await fetch("/api/negotiations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "decide", negotiation, approved }) });
    const data = await response.json();
    setNegotiation(data.negotiation);
  }

  function reset() {
    setForm({ width: "4", length: "3", wastePercent: "10", maxBudget: "200" });
    setBudgets([]); setComparison(null); setNegotiation(null); setStatus("");
    setChat([{ role: "assistant", text: "Escenario reiniciado. ¿Qué ambiente querés presupuestar?" }]);
  }

  return <>
    <header className="topbar"><a className="brand" href="#inicio">ConstruAgent</a><nav aria-label="Secciones"><a href="#presupuesto">Presupuesto</a><a href="#comparacion">Proveedores</a><a href="#negociacion">Negociación</a></nav><DemoBadge /></header>
    <main>
      <section id="inicio" className="hero"><div><p className="eyebrow">Tu obra, con números claros</p><h1>Calculá materiales.<br/><em>Compará con criterio.</em></h1><p className="lead">Un asistente local que representa tus intereses y explica cada decisión antes de una compra.</p><a className="primary" href="#presupuesto">Empezar presupuesto</a></div><div className="blueprint" aria-hidden="true"><span>4.00 m</span><strong>12 m²</strong><span>3.00 m</span></div></section>

      <section className="section grid-two" id="presupuesto"><div><p className="eyebrow">01 · Solicitud</p><h2>Contame tu proyecto</h2><div className="chat" aria-live="polite">{chat.map((item, index) => <p className={item.role} key={`${item.role}-${index}`}><b>{item.role === "assistant" ? "ConstruAgent" : "Vos"}</b>{item.text}</p>)}</div><form className="chat-form" onSubmit={sendChat}><label className="sr-only" htmlFor="chat">Mensaje</label><input id="chat" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ej: Habitación de 4 x 3, máximo 200 U"/><button>Enviar</button></form></div>
        <form className="budget-form" onSubmit={calculate}><h3>Medidas del ambiente</h3><div className="fields"><Field label="Ancho (m)" name="width" value={form.width} setForm={setForm}/><Field label="Largo (m)" name="length" value={form.length} setForm={setForm}/><Field label="Desperdicio (%)" name="wastePercent" value={form.wastePercent} setForm={setForm}/><Field label="Máximo (U)" name="maxBudget" value={form.maxBudget} setForm={setForm}/></div><p className="technical">Supuesto demostrativo: colocación interior, habitación rectangular.</p><button className="primary" disabled={loading}>{loading ? "Calculando…" : "Calcular y comparar"}</button>{status && <p className="status" role="status">{status}</p>}</form>
      </section>

      <section className="section" id="comparacion"><p className="eyebrow">02 · Comparación</p><div className="section-title"><h2>Ofertas comparables</h2>{comparison && <p>{comparison.explanation}</p>}</div>{budgets.length === 0 ? <div className="empty">Completá las medidas para ver cantidades, stock y precios ficticios.</div> : <div className="cards">{budgets.map((budget) => <BudgetCard key={budget.supplierId} budget={budget} recommended={comparison?.recommendedSupplierId === budget.supplierId} onNegotiate={() => negotiate(budget)}/>)}</div>}</section>

      <section className="section negotiation" id="negociacion"><p className="eyebrow">03 · Negociación entre agentes</p><h2>Una decisión bajo tu control</h2>{!negotiation ? <div className="empty">Elegí “Solicitar oferta” en un proveedor para iniciar la conversación simulada.</div> : <div className="negotiation-panel"><div className="timeline">{negotiation.messages.map((message, index) => <article key={index}><span>{index + 1}</span><div><b>{message.agent}</b><p>{message.text}</p></div></article>)}</div><aside><DemoBadge/><h3>{negotiation.offeredTotal.toFixed(2)} U</h3><p>{negotiation.reason}</p><strong>Estado: {negotiation.status.replaceAll("_", " ")}</strong>{negotiation.orderId && <p>Orden: {negotiation.orderId}</p>}{negotiation.status === "requiere_aprobacion" && <div className="actions"><button className="primary" onClick={() => decide(true)}>Aprobar simulación</button><button className="secondary" onClick={() => decide(false)}>Rechazar</button></div>}</aside></div>}</section>
    </main>
    <footer><div><b>ConstruAgent</b><p>Prototipo educativo. Las cantidades son estimaciones, no asesoramiento técnico certificado.</p></div><button className="secondary" onClick={reset}>Reiniciar escenario</button></footer>
  </>;
}

function Field({ label, name, value, setForm }: { label: string; name: string; value: string; setForm: React.Dispatch<React.SetStateAction<{ width: string; length: string; wastePercent: string; maxBudget: string }>> }) {
  return <label>{label}<input type="number" min="0" step="0.01" name={name} value={value} onChange={(e) => setForm((current) => ({ ...current, [name]: e.target.value }))}/></label>;
}

function BudgetCard({ budget, recommended, onNegotiate }: { budget: BudgetResult; recommended: boolean; onNegotiate: () => void }) {
  const copy = () => navigator.clipboard.writeText(`${budget.supplierName}: ${budget.total.toFixed(2)} U`);
  return <article className={`budget-card ${recommended ? "recommended" : ""}`}>{recommended && <span className="ribbon">Recomendado</span>}<h3>{budget.supplierName}</h3><p className="price">{budget.total.toFixed(2)} <small>U</small></p><p>{budget.areaM2} m² + {budget.wastePercent}% de desperdicio</p><ul>{budget.lines.map((line) => <li key={line.productId}><span>{line.quantity} {line.unit}{line.quantity > 1 ? "s" : ""} · {line.name}</span><b>{line.subtotal.toFixed(2)} U</b></li>)}</ul>{budget.warnings.map((warning) => <p className="warning" key={warning}>{warning}</p>)}{budget.withinBudget === false && <p className="warning">Supera tu presupuesto máximo.</p>}<div className="actions"><button className="primary" disabled={!budget.available} onClick={onNegotiate}>Solicitar oferta</button><button className="secondary" onClick={copy}>Copiar</button></div></article>;
}

function optionalNumber(value: string) { const parsed = Number(value); return value !== "" && Number.isFinite(parsed) ? parsed : undefined; }
function numericForm(form: { width: string; length: string; wastePercent: string; maxBudget: string }) { return { width: Number(form.width), length: Number(form.length), wastePercent: Number(form.wastePercent), maxBudget: optionalNumber(form.maxBudget) }; }

