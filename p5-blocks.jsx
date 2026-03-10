import { useState, useRef, useCallback, useEffect } from "react";

// ── Block definitions with REAL p5.js function names ──────────────────
const CATEGORIES = {
  setup: {
    label: "Setup",
    color: "#E8A838",
    blocks: [
      { type: "createCanvas", label: "createCanvas(w, h)", params: [{ name: "w", default: "400" }, { name: "h", default: "400" }], code: (p) => `createCanvas(${p.w}, ${p.h});` },
      { type: "background", label: "background(c)", params: [{ name: "c", default: "220" }], code: (p) => `background(${p.c});` },
      { type: "frameRate", label: "frameRate(fps)", params: [{ name: "fps", default: "30" }], code: (p) => `frameRate(${p.fps});` },
    ],
  },
  shapes: {
    label: "Vormen",
    color: "#4C97FF",
    blocks: [
      { type: "rect", label: "rect(x, y, w, h)", params: [{ name: "x", default: "50" }, { name: "y", default: "50" }, { name: "w", default: "100" }, { name: "h", default: "80" }], code: (p) => `rect(${p.x}, ${p.y}, ${p.w}, ${p.h});` },
      { type: "ellipse", label: "ellipse(x, y, w, h)", params: [{ name: "x", default: "200" }, { name: "y", default: "200" }, { name: "w", default: "80" }, { name: "h", default: "80" }], code: (p) => `ellipse(${p.x}, ${p.y}, ${p.w}, ${p.h});` },
      { type: "line", label: "line(x1, y1, x2, y2)", params: [{ name: "x1", default: "0" }, { name: "y1", default: "0" }, { name: "x2", default: "200" }, { name: "y2", default: "200" }], code: (p) => `line(${p.x1}, ${p.y1}, ${p.x2}, ${p.y2});` },
      { type: "triangle", label: "triangle(x1,y1,x2,y2,x3,y3)", params: [{ name: "x1", default: "100" }, { name: "y1", default: "50" }, { name: "x2", default: "50" }, { name: "y2", default: "150" }, { name: "x3", default: "150" }, { name: "y3", default: "150" }], code: (p) => `triangle(${p.x1}, ${p.y1}, ${p.x2}, ${p.y2}, ${p.x3}, ${p.y3});` },
      { type: "circle", label: "circle(x, y, d)", params: [{ name: "x", default: "200" }, { name: "y", default: "200" }, { name: "d", default: "100" }], code: (p) => `circle(${p.x}, ${p.y}, ${p.d});` },
      { type: "point", label: "point(x, y)", params: [{ name: "x", default: "100" }, { name: "y", default: "100" }], code: (p) => `point(${p.x}, ${p.y});` },
      { type: "arc", label: "arc(x,y,w,h,start,stop)", params: [{ name: "x", default: "200" }, { name: "y", default: "200" }, { name: "w", default: "100" }, { name: "h", default: "100" }, { name: "start", default: "0" }, { name: "stop", default: "PI" }], code: (p) => `arc(${p.x}, ${p.y}, ${p.w}, ${p.h}, ${p.start}, ${p.stop});` },
    ],
  },
  kleur: {
    label: "Kleur",
    color: "#9966FF",
    blocks: [
      { type: "fill", label: "fill(r, g, b)", params: [{ name: "r", default: "255" }, { name: "g", default: "100" }, { name: "b", default: "50" }], code: (p) => `fill(${p.r}, ${p.g}, ${p.b});` },
      { type: "stroke", label: "stroke(r, g, b)", params: [{ name: "r", default: "0" }, { name: "g", default: "0" }, { name: "b", default: "0" }], code: (p) => `stroke(${p.r}, ${p.g}, ${p.b});` },
      { type: "strokeWeight", label: "strokeWeight(w)", params: [{ name: "w", default: "2" }], code: (p) => `strokeWeight(${p.w});` },
      { type: "noFill", label: "noFill()", params: [], code: () => `noFill();` },
      { type: "noStroke", label: "noStroke()", params: [], code: () => `noStroke();` },
      { type: "colorMode", label: "colorMode(mode)", params: [{ name: "mode", default: "HSB" }], code: (p) => `colorMode(${p.mode});` },
    ],
  },
  transform: {
    label: "Transform",
    color: "#CF63CF",
    blocks: [
      { type: "translate", label: "translate(x, y)", params: [{ name: "x", default: "100" }, { name: "y", default: "100" }], code: (p) => `translate(${p.x}, ${p.y});` },
      { type: "rotate", label: "rotate(hoek)", params: [{ name: "hoek", default: "PI/4" }], code: (p) => `rotate(${p.hoek});` },
      { type: "scale", label: "scale(s)", params: [{ name: "s", default: "1.5" }], code: (p) => `scale(${p.s});` },
      { type: "push", label: "push()", params: [], code: () => `push();` },
      { type: "pop", label: "pop()", params: [], code: () => `pop();` },
    ],
  },
  interactie: {
    label: "Interactie",
    color: "#FF6680",
    blocks: [
      { type: "mouseX", label: "mouseX", params: [], code: () => `mouseX`, isExpression: true },
      { type: "mouseY", label: "mouseY", params: [], code: () => `mouseY`, isExpression: true },
      { type: "text", label: "text(txt, x, y)", params: [{ name: "txt", default: "'Hallo!'" }, { name: "x", default: "50" }, { name: "y", default: "50" }], code: (p) => `text(${p.txt}, ${p.x}, ${p.y});` },
      { type: "textSize", label: "textSize(s)", params: [{ name: "s", default: "32" }], code: (p) => `textSize(${p.s});` },
    ],
  },
  wiskunde: {
    label: "Wiskunde",
    color: "#59C059",
    blocks: [
      { type: "random", label: "random(min, max)", params: [{ name: "min", default: "0" }, { name: "max", default: "400" }], code: (p) => `random(${p.min}, ${p.max})`, isExpression: true },
      { type: "map", label: "map(v,a,b,c,d)", params: [{ name: "v", default: "mouseX" }, { name: "a", default: "0" }, { name: "b", default: "400" }, { name: "c", default: "0" }, { name: "d", default: "255" }], code: (p) => `map(${p.v}, ${p.a}, ${p.b}, ${p.c}, ${p.d})`, isExpression: true },
      { type: "sin", label: "sin(hoek)", params: [{ name: "hoek", default: "frameCount * 0.05" }], code: (p) => `sin(${p.hoek})`, isExpression: true },
      { type: "cos", label: "cos(hoek)", params: [{ name: "hoek", default: "frameCount * 0.05" }], code: (p) => `cos(${p.hoek})`, isExpression: true },
      { type: "noise", label: "noise(x)", params: [{ name: "x", default: "frameCount * 0.01" }], code: (p) => `noise(${p.x})`, isExpression: true },
    ],
  },
  controle: {
    label: "Controle",
    color: "#FFAB19",
    blocks: [
      { type: "for_loop", label: "for (herhaal)", params: [{ name: "var", default: "i" }, { name: "start", default: "0" }, { name: "eind", default: "10" }, { name: "stap", default: "1" }], code: (p) => `for (let ${p.var} = ${p.start}; ${p.var} < ${p.eind}; ${p.var} += ${p.stap}) {`, isControl: true, closer: "}" },
      { type: "if_block", label: "if (als)", params: [{ name: "conditie", default: "mouseIsPressed" }], code: (p) => `if (${p.conditie}) {`, isControl: true, closer: "}" },
    ],
  },
};

// ── Unique ID generator ──────────────────────────────────────────────
let _id = 0;
const uid = () => `block_${++_id}`;

// ── Preset sketches ──────────────────────────────────────────────────
const PRESETS = {
  leeg: { setup: [], draw: [] },
  regenboog: {
    setup: [
      { ...findBlock("createCanvas"), id: uid(), values: { w: "400", h: "400" }, zone: "setup" },
      { ...findBlock("colorMode"), id: uid(), values: { mode: "HSB" }, zone: "setup" },
    ],
    draw: [
      { ...findBlock("background"), id: uid(), values: { c: "0, 0, 20" }, zone: "draw" },
      { ...findBlock("for_loop"), id: uid(), values: { var: "i", start: "0", eind: "36", stap: "1" }, zone: "draw" },
      { ...findBlock("fill"), id: uid(), values: { r: "i * 10", g: "255", b: "255" }, zone: "draw" },
      { ...findBlock("noStroke"), id: uid(), values: {}, zone: "draw" },
      { ...findBlock("circle"), id: uid(), values: { x: "200 + cos(i * TWO_PI/36) * 150", y: "200 + sin(i * TWO_PI/36) * 150", d: "40" }, zone: "draw" },
    ],
  },
  muis_volger: {
    setup: [
      { ...findBlock("createCanvas"), id: uid(), values: { w: "400", h: "400" }, zone: "setup" },
    ],
    draw: [
      { ...findBlock("background"), id: uid(), values: { c: "30, 30, 40" }, zone: "draw" },
      { ...findBlock("fill"), id: uid(), values: { r: "100", g: "200", b: "255" }, zone: "draw" },
      { ...findBlock("noStroke"), id: uid(), values: {}, zone: "draw" },
      { ...findBlock("circle"), id: uid(), values: { x: "mouseX", y: "mouseY", d: "60" }, zone: "draw" },
      { ...findBlock("fill"), id: uid(), values: { r: "255", g: "100", b: "150" }, zone: "draw" },
      { ...findBlock("circle"), id: uid(), values: { x: "mouseX + 30", y: "mouseY - 30", d: "30" }, zone: "draw" },
    ],
  },
};

function findBlock(type) {
  for (const cat of Object.values(CATEGORIES)) {
    const b = cat.blocks.find((bl) => bl.type === type);
    if (b) {
      const vals = {};
      b.params.forEach((p) => (vals[p.name] = p.default));
      return { ...b, color: cat.color, values: vals };
    }
  }
  return null;
}

// ── Main Component ───────────────────────────────────────────────────
export default function P5Blocks() {
  const [setupBlocks, setSetupBlocks] = useState([]);
  const [drawBlocks, setDrawBlocks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("shapes");
  const [showCode, setShowCode] = useState(false);
  const [dragItem, setDragItem] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const iframeRef = useRef(null);
  const dragOverZone = useRef(null);
  const dragOverIdx = useRef(null);
  const [dropIndicator, setDropIndicator] = useState({ zone: null, idx: null });

  // ── Generate p5.js code from blocks ────────────────────────────────
  const generateCode = useCallback(() => {
    const indent = (code, level) => "  ".repeat(level) + code;
    let indentLevel = 1;

    const processBlocks = (blocks) => {
      const lines = [];
      for (const block of blocks) {
        const params = block.values || {};
        const codeLine = block.code(params);
        if (block.isControl) {
          lines.push(indent(codeLine, indentLevel));
          indentLevel++;
        } else if (codeLine === "}") {
          indentLevel = Math.max(1, indentLevel - 1);
          lines.push(indent("}", indentLevel));
        } else {
          lines.push(indent(codeLine, indentLevel));
        }
      }
      // Close any remaining open braces
      while (indentLevel > 1) {
        indentLevel--;
        lines.push(indent("}", indentLevel));
      }
      return lines.join("\n");
    };

    // Add closers for control blocks
    const withClosers = (blocks) => {
      const result = [];
      const stack = [];
      for (const b of blocks) {
        result.push(b);
        if (b.isControl && b.closer) stack.push(b.closer);
      }
      while (stack.length) {
        result.push({ code: () => stack.pop(), values: {} });
      }
      return result;
    };

    const setupCode = processBlocks(withClosers(setupBlocks));
    indentLevel = 1;
    const drawCode = processBlocks(withClosers(drawBlocks));

    return `function setup() {\n${setupCode}\n}\n\nfunction draw() {\n${drawCode}\n}`;
  }, [setupBlocks, drawBlocks]);

  // ── Run sketch in iframe ───────────────────────────────────────────
  const runSketch = useCallback(() => {
    if (!iframeRef.current) return;
    const code = generateCode();
    const html = `<!DOCTYPE html>
<html><head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"><\/script>
<style>body{margin:0;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#1a1a2e;height:100vh;}canvas{border-radius:8px;box-shadow:0 4px 24px rgba(0,0,0,.4)}</style>
</head><body><script>${code}<\/script></body></html>`;
    iframeRef.current.srcdoc = html;
  }, [generateCode]);

  useEffect(() => {
    if (isRunning) runSketch();
  }, [setupBlocks, drawBlocks, isRunning, runSketch]);

  // ── Drag handlers ──────────────────────────────────────────────────
  const onDragStartPalette = (block, cat) => {
    const vals = {};
    block.params.forEach((p) => (vals[p.name] = p.default));
    setDragItem({ ...block, color: cat.color, values: vals, source: "palette" });
  };

  const onDragStartWorkspace = (block, zone, idx) => {
    setDragItem({ ...block, source: "workspace", sourceZone: zone, sourceIdx: idx });
  };

  const onDragOver = (e, zone, idx) => {
    e.preventDefault();
    dragOverZone.current = zone;
    dragOverIdx.current = idx;
    setDropIndicator({ zone, idx });
  };

  const onDragOverZone = (e, zone) => {
    e.preventDefault();
    dragOverZone.current = zone;
    const blocks = zone === "setup" ? setupBlocks : drawBlocks;
    dragOverIdx.current = blocks.length;
    setDropIndicator({ zone, idx: blocks.length });
  };

  const onDrop = (e, zone) => {
    e.preventDefault();
    if (!dragItem) return;
    const targetIdx = dragOverIdx.current ?? (zone === "setup" ? setupBlocks.length : drawBlocks.length);
    const setter = zone === "setup" ? setSetupBlocks : setDrawBlocks;

    if (dragItem.source === "workspace") {
      const sourceSetter = dragItem.sourceZone === "setup" ? setSetupBlocks : setDrawBlocks;
      if (dragItem.sourceZone === zone) {
        setter((prev) => {
          const items = [...prev];
          const [removed] = items.splice(dragItem.sourceIdx, 1);
          const adjustedIdx = dragItem.sourceIdx < targetIdx ? targetIdx - 1 : targetIdx;
          items.splice(adjustedIdx, 0, removed);
          return items;
        });
      } else {
        sourceSetter((prev) => prev.filter((_, i) => i !== dragItem.sourceIdx));
        setter((prev) => {
          const items = [...prev];
          items.splice(targetIdx, 0, { ...dragItem, zone });
          return items;
        });
      }
    } else {
      const newBlock = { ...dragItem, id: uid(), zone };
      setter((prev) => {
        const items = [...prev];
        items.splice(targetIdx, 0, newBlock);
        return items;
      });
    }
    setDragItem(null);
    setDropIndicator({ zone: null, idx: null });
  };

  const onDragEnd = () => {
    setDragItem(null);
    setDropIndicator({ zone: null, idx: null });
  };

  const updateBlockValue = (zone, idx, paramName, value) => {
    const setter = zone === "setup" ? setSetupBlocks : setDrawBlocks;
    setter((prev) => prev.map((b, i) => (i === idx ? { ...b, values: { ...b.values, [paramName]: value } } : b)));
  };

  const removeBlock = (zone, idx) => {
    const setter = zone === "setup" ? setSetupBlocks : setDrawBlocks;
    setter((prev) => prev.filter((_, i) => i !== idx));
  };

  const loadPreset = (name) => {
    _id = 0;
    const p = PRESETS[name];
    if (name === "leeg") {
      setSetupBlocks([]);
      setDrawBlocks([]);
    } else {
      // Deep-clone with new IDs
      const cloneBlocks = (blocks) =>
        blocks.map((b) => {
          const orig = findBlock(b.type);
          return { ...orig, ...b, id: uid(), code: orig.code };
        });
      setSetupBlocks(cloneBlocks(p.setup));
      setDrawBlocks(cloneBlocks(p.draw));
    }
  };

  // ── Render ─────────────────────────────────────────────────────────
  const code = generateCode();

  const BlockEl = ({ block, zone, idx }) => (
    <div
      draggable
      onDragStart={() => onDragStartWorkspace(block, zone, idx)}
      onDragOver={(e) => onDragOver(e, zone, idx)}
      onDragEnd={onDragEnd}
      style={{
        background: block.color || "#4C97FF",
        color: "#fff",
        borderRadius: 8,
        padding: "6px 10px",
        marginBottom: 2,
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        fontFamily: "'Source Code Pro', 'Fira Code', monospace",
        boxShadow: "0 2px 6px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.15)",
        borderTop: "2px solid rgba(255,255,255,.2)",
        borderBottom: "2px solid rgba(0,0,0,.15)",
        position: "relative",
        marginLeft: block.isControl ? 0 : 0,
        transition: "transform 0.1s",
      }}
    >
      {dropIndicator.zone === zone && dropIndicator.idx === idx && (
        <div style={{ position: "absolute", top: -3, left: 0, right: 0, height: 3, background: "#fff", borderRadius: 2 }} />
      )}
      <span style={{ fontWeight: 700, minWidth: 0, whiteSpace: "nowrap" }}>{block.type}</span>
      <span style={{ color: "rgba(255,255,255,.6)", fontSize: 11 }}>(</span>
      {(block.params || []).map((p, pi) => (
        <span key={pi} style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
          {pi > 0 && <span style={{ color: "rgba(255,255,255,.5)", fontSize: 11 }}>,</span>}
          <input
            value={block.values?.[p.name] ?? p.default}
            onChange={(e) => updateBlockValue(zone, idx, p.name, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(0,0,0,.3)",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 4,
              color: "#fff",
              padding: "2px 5px",
              width: Math.max(36, (block.values?.[p.name] ?? p.default).length * 8 + 12),
              fontSize: 12,
              fontFamily: "inherit",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,.15)")}
          />
        </span>
      ))}
      <span style={{ color: "rgba(255,255,255,.6)", fontSize: 11 }}>){block.isControl ? " {" : ";"}</span>
      <button
        onClick={() => removeBlock(zone, idx)}
        style={{
          marginLeft: "auto",
          background: "rgba(0,0,0,.3)",
          border: "none",
          color: "rgba(255,255,255,.6)",
          borderRadius: "50%",
          width: 20,
          height: 20,
          cursor: "pointer",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  );

  const WorkspaceZone = ({ label, blocks, zone, color }) => (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          fontFamily: "'Source Code Pro', monospace",
          fontSize: 14,
          fontWeight: 700,
          color,
          marginBottom: 6,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span style={{ color: "#FF6680" }}>function</span> <span style={{ color: "#4FC3F7" }}>{label}</span>
        <span style={{ color: "#aaa" }}>{"() {"}</span>
      </div>
      <div
        onDragOver={(e) => onDragOverZone(e, zone)}
        onDrop={(e) => onDrop(e, zone)}
        style={{
          minHeight: 48,
          background: "rgba(255,255,255,.03)",
          border: "2px dashed rgba(255,255,255,.1)",
          borderRadius: 8,
          padding: 6,
          marginLeft: 16,
          transition: "border-color .2s",
          borderColor: dropIndicator.zone === zone ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.1)",
        }}
      >
        {blocks.length === 0 && (
          <div style={{ color: "rgba(255,255,255,.25)", textAlign: "center", padding: 10, fontSize: 13 }}>
            Sleep blokken hierheen...
          </div>
        )}
        {blocks.map((b, i) => (
          <BlockEl key={b.id} block={b} zone={zone} idx={i} />
        ))}
      </div>
      <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: 14, color: "#aaa", marginTop: 4 }}>{"}"}</div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
        background: "#0f0f1a",
        color: "#eee",
        overflow: "hidden",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;900&family=Source+Code+Pro:wght@400;600;700&display=swap" rel="stylesheet" />

      {/* ── LEFT: Block Palette ─────────────────────────────────────── */}
      <div
        style={{
          width: 220,
          background: "#161625",
          borderRight: "1px solid rgba(255,255,255,.06)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "12px 14px 8px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 22 }}>🧩</div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: -0.5 }}>p5.blocks</div>
            <div style={{ fontSize: 10, color: "#888", marginTop: -1 }}>sleep · bouw · run</div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3, padding: "8px 6px" }}>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              style={{
                background: activeCategory === key ? cat.color : "rgba(255,255,255,.06)",
                color: activeCategory === key ? "#fff" : "#aaa",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all .15s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Blocks */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px" }}>
          {CATEGORIES[activeCategory]?.blocks.map((block) => (
            <div
              key={block.type}
              draggable
              onDragStart={() => onDragStartPalette(block, CATEGORIES[activeCategory])}
              onDragEnd={onDragEnd}
              style={{
                background: CATEGORIES[activeCategory].color,
                color: "#fff",
                borderRadius: 8,
                padding: "7px 10px",
                marginBottom: 4,
                cursor: "grab",
                fontSize: 12,
                fontFamily: "'Source Code Pro', monospace",
                fontWeight: 600,
                boxShadow: "0 2px 6px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.15)",
                borderTop: "2px solid rgba(255,255,255,.2)",
                borderBottom: "2px solid rgba(0,0,0,.15)",
                userSelect: "none",
              }}
            >
              {block.label}
            </div>
          ))}
        </div>

        {/* Presets */}
        <div style={{ padding: "8px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 10, color: "#666", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Voorbeelden
          </div>
          {[
            ["leeg", "🗑️ Leeg"],
            ["regenboog", "🌈 Regenboog"],
            ["muis_volger", "🖱️ Muis Volger"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => loadPreset(key)}
              style={{
                display: "block",
                width: "100%",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.08)",
                color: "#ccc",
                borderRadius: 6,
                padding: "5px 8px",
                marginBottom: 3,
                fontSize: 12,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CENTER: Workspace ───────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Toolbar */}
        <div
          style={{
            padding: "8px 16px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,.02)",
          }}
        >
          <button
            onClick={() => { setIsRunning(!isRunning); if (!isRunning) runSketch(); }}
            style={{
              background: isRunning ? "#59C059" : "#FF6680",
              border: "none",
              color: "#fff",
              borderRadius: 8,
              padding: "6px 16px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(0,0,0,.3)",
            }}
          >
            {isRunning ? "▶ Live" : "⏸ Pauze"}
          </button>
          <button
            onClick={runSketch}
            style={{
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.1)",
              color: "#ccc",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
            }}
          >
            🔄 Herstart
          </button>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setShowCode(!showCode)}
            style={{
              background: showCode ? "#4C97FF" : "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.1)",
              color: showCode ? "#fff" : "#ccc",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "'Source Code Pro', monospace",
            }}
          >
            {"</>"} Code
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Block workspace */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            <WorkspaceZone label="setup" blocks={setupBlocks} zone="setup" color="#E8A838" />
            <WorkspaceZone label="draw" blocks={drawBlocks} zone="draw" color="#4FC3F7" />
          </div>

          {/* Code panel */}
          {showCode && (
            <div
              style={{
                width: 320,
                background: "#1a1a2e",
                borderLeft: "1px solid rgba(255,255,255,.06)",
                padding: 16,
                overflowY: "auto",
              }}
            >
              <div style={{ fontSize: 11, color: "#888", marginBottom: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Gegenereerde p5.js Code
              </div>
              <pre
                style={{
                  fontFamily: "'Source Code Pro', monospace",
                  fontSize: 12,
                  color: "#b8d4e3",
                  background: "rgba(0,0,0,.3)",
                  padding: 12,
                  borderRadius: 8,
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                  border: "1px solid rgba(255,255,255,.05)",
                }}
              >
                {code}
              </pre>
              <button
                onClick={() => navigator.clipboard?.writeText(code)}
                style={{
                  marginTop: 8,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.1)",
                  color: "#ccc",
                  borderRadius: 6,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "inherit",
                  width: "100%",
                }}
              >
                📋 Kopieer naar klembord
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Preview ──────────────────────────────────────────── */}
      <div
        style={{
          width: 440,
          background: "#1a1a2e",
          borderLeft: "1px solid rgba(255,255,255,.06)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            borderBottom: "1px solid rgba(255,255,255,.06)",
            fontSize: 12,
            fontWeight: 700,
            color: "#888",
            textTransform: "uppercase",
            letterSpacing: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>🎨</span> Preview
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <iframe
            ref={iframeRef}
            title="p5.js preview"
            sandbox="allow-scripts"
            style={{
              width: 400,
              height: 400,
              border: "none",
              borderRadius: 12,
              background: "#0a0a15",
              boxShadow: "0 8px 32px rgba(0,0,0,.5)",
            }}
          />
        </div>
      </div>
    </div>
  );
}