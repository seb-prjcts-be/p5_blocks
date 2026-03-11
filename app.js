// ═══════════════════════════════════════════════════════════════
// I18N
// ═══════════════════════════════════════════════════════════════

const CAT_LABELS = {
  nl: { setup:'Setup', shapes:'Vormen', kleur:'Kleur', transform:'Transform', interactie:'Typografie', wiskunde:'Wiskunde', controle:'Controle', variabelen:'Variabelen' },
  en: { setup:'Setup', shapes:'Shape',  kleur:'Color', transform:'Transform', interactie:'Typography', wiskunde:'Math',     controle:'Structure',  variabelen:'Variables'  },
};

const UI = {
  nl: {
    zoneVars:'variabelen', zoneVarsSub:'(globaal)',
    zoneEmpty:'Sleep blokken hierheen…',
    presetPlaceholder:'Voorbeelden…',
    presetLeeg:'Leeg', presetRegenboog:'Regenboog', presetMuisVolger:'Muis volger',
    codeTitle:'Gegenereerde code', codeCopy:'Kopieer naar klembord',
    blockDelete:'Verwijder',
    palVarDeclare:'let naam = waarde', palVarSet:'naam = waarde',
    opAdd:'optellen', opSub:'aftrekken', opMul:'vermenigvuldigen', opDiv:'delen', opMod:'restgetal',
    opGt:'groter dan', opLt:'kleiner dan', opGte:'groter of gelijk', opLte:'kleiner of gelijk',
    opEq:'gelijk aan', opNeq:'niet gelijk', opAnd:'EN', opOr:'OF', opNot:'NIET',
  },
  en: {
    zoneVars:'variables', zoneVarsSub:'(global)',
    zoneEmpty:'Drag blocks here…',
    presetPlaceholder:'Examples…',
    presetLeeg:'Empty', presetRegenboog:'Rainbow', presetMuisVolger:'Mouse follower',
    codeTitle:'Generated code', codeCopy:'Copy to clipboard',
    blockDelete:'Delete',
    palVarDeclare:'let name = value', palVarSet:'name = value',
    opAdd:'addition', opSub:'subtraction', opMul:'multiplication', opDiv:'division', opMod:'remainder',
    opGt:'greater than', opLt:'less than', opGte:'greater or equal', opLte:'less or equal',
    opEq:'equal to', opNeq:'not equal', opAnd:'AND', opOr:'OR', opNot:'NOT',
  },
};

function t(key) { return UI[state.lang]?.[key] ?? UI.nl[key] ?? key; }
function catLabel(key) { return CAT_LABELS[state.lang]?.[key] ?? CAT_LABELS.nl[key] ?? key; }

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const CATEGORIES = {
  setup: {
    label: 'Setup', color: '#FBBF2E',
    blocks: [
      { type: 'createCanvas',  label: 'createCanvas',  params: [{name:'w',def:'900'},{name:'h',def:'900'}],           code: p=>`createCanvas(${p.w}, ${p.h});` },
      { type: 'background',    label: 'background',    params: [{name:'c',def:'220'}],                                code: p=>`background(${p.c});` },
      { type: 'frameRate',     label: 'frameRate',     params: [{name:'fps',def:'30'}],                               code: p=>`frameRate(${p.fps});` },
    ]
  },
  shapes: {
    label: 'Vormen', color: '#0091D1',
    blocks: [
      { type: 'ellipse',  label: 'ellipse',  params: [{name:'x',def:'200'},{name:'y',def:'200'},{name:'w',def:'80'},{name:'h',def:'80'}],    code: p=>`ellipse(${p.x}, ${p.y}, ${p.w}, ${p.h});` },
      { type: 'circle',   label: 'circle',   params: [{name:'x',def:'200'},{name:'y',def:'200'},{name:'d',def:'100'}],                       code: p=>`circle(${p.x}, ${p.y}, ${p.d});` },
      { type: 'rect',     label: 'rect',     params: [{name:'x',def:'50'},{name:'y',def:'50'},{name:'w',def:'100'},{name:'h',def:'80'}],     code: p=>`rect(${p.x}, ${p.y}, ${p.w}, ${p.h});` },
      { type: 'line',     label: 'line',     params: [{name:'x1',def:'0'},{name:'y1',def:'0'},{name:'x2',def:'200'},{name:'y2',def:'200'}],  code: p=>`line(${p.x1}, ${p.y1}, ${p.x2}, ${p.y2});` },
      { type: 'triangle', label: 'triangle', params: [{name:'x1',def:'100'},{name:'y1',def:'50'},{name:'x2',def:'50'},{name:'y2',def:'150'},{name:'x3',def:'150'},{name:'y3',def:'150'}], code: p=>`triangle(${p.x1},${p.y1},${p.x2},${p.y2},${p.x3},${p.y3});` },
      { type: 'point',    label: 'point',    params: [{name:'x',def:'100'},{name:'y',def:'100'}],                                            code: p=>`point(${p.x}, ${p.y});` },
      { type: 'arc',      label: 'arc',      params: [{name:'x',def:'200'},{name:'y',def:'200'},{name:'w',def:'100'},{name:'h',def:'100'},{name:'start',def:'0'},{name:'stop',def:'PI'}], code: p=>`arc(${p.x},${p.y},${p.w},${p.h},${p.start},${p.stop});` },
    ]
  },
  kleur: {
    label: 'Kleur', color: '#8B5CF6',
    blocks: [
      { type: 'fill',         label: 'fill',         params: [{name:'r',def:'255'},{name:'g',def:'100'},{name:'b',def:'50'}],  code: p=>`fill(${p.r}, ${p.g}, ${p.b});` },
      { type: 'stroke',       label: 'stroke',       params: [{name:'r',def:'0'},{name:'g',def:'0'},{name:'b',def:'0'}],       code: p=>`stroke(${p.r}, ${p.g}, ${p.b});` },
      { type: 'strokeWeight', label: 'strokeWeight', params: [{name:'w',def:'2'}],                                             code: p=>`strokeWeight(${p.w});` },
      { type: 'noFill',       label: 'noFill()',     params: [],                                                               code: ()=>'noFill();' },
      { type: 'noStroke',     label: 'noStroke()',   params: [],                                                               code: ()=>'noStroke();' },
      { type: 'colorMode',    label: 'colorMode',    params: [{name:'mode',def:'HSB'}],                                        code: p=>`colorMode(${p.mode});` },
    ]
  },
  transform: {
    label: 'Transform', color: '#69619B',
    blocks: [
      { type: 'translate', label: 'translate', params: [{name:'x',def:'100'},{name:'y',def:'100'}], code: p=>`translate(${p.x}, ${p.y});` },
      { type: 'rotate',    label: 'rotate',    params: [{name:'a',def:'PI/4'}],                     code: p=>`rotate(${p.a});` },
      { type: 'scale',     label: 'scale',     params: [{name:'s',def:'1.5'}],                      code: p=>`scale(${p.s});` },
      { type: 'push',      label: 'push()',    params: [],                                          code: ()=>'push();' },
      { type: 'pop',       label: 'pop()',     params: [],                                          code: ()=>'pop();' },
    ]
  },
  interactie: {
    label: 'Interactie', color: '#EF4424',
    blocks: [
      { type: 'text',     label: 'text',     params: [{name:'txt',def:"'Hallo!'"},{name:'x',def:'50'},{name:'y',def:'50'}], code: p=>`text(${p.txt}, ${p.x}, ${p.y});` },
      { type: 'textSize', label: 'textSize', params: [{name:'s',def:'32'}],                                                 code: p=>`textSize(${p.s});` },
    ]
  },
  wiskunde: {
    label: 'Wiskunde', color: '#61B199',
    blocks: [
      { type: 'random', label: 'random', params: [{name:'min',def:'0'},{name:'max',def:'400'}],                                                             isExpr: true, code: p=>`random(${p.min}, ${p.max})` },
      { type: 'map',    label: 'map',    params: [{name:'v',def:'mouseX'},{name:'a',def:'0'},{name:'b',def:'400'},{name:'c',def:'0'},{name:'d',def:'255'}], isExpr: true, code: p=>`map(${p.v},${p.a},${p.b},${p.c},${p.d})` },
      { type: 'sin',    label: 'sin',    params: [{name:'a',def:'frameCount*0.05'}], isExpr: true, code: p=>`sin(${p.a})` },
      { type: 'cos',    label: 'cos',    params: [{name:'a',def:'frameCount*0.05'}], isExpr: true, code: p=>`cos(${p.a})` },
      { type: 'tan',    label: 'tan',    params: [{name:'a',def:'frameCount*0.05'}], isExpr: true, code: p=>`tan(${p.a})` },
      { type: 'noise',  label: 'noise',  params: [{name:'x',def:'frameCount*0.01'}], isExpr: true, code: p=>`noise(${p.x})` },
      { type: 'op_add', label: '+', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} + ${p.b})` },
      { type: 'op_sub', label: '-', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} - ${p.b})` },
      { type: 'op_mul', label: '×', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} * ${p.b})` },
      { type: 'op_div', label: '÷', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} / ${p.b})` },
      { type: 'op_mod', label: '%', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} % ${p.b})` },
    ]
  },
  controle: {
    label: 'Controle', color: '#F3722E',
    blocks: [
      { type: 'for_loop', label: 'for',  isCtrl: true, params: [{name:'v',def:'i'},{name:'start',def:'0'},{name:'end',def:'10'},{name:'step',def:'1'}], code: p=>`for (let ${p.v} = ${p.start}; ${p.v} < ${p.end}; ${p.v} += ${p.step}) {` },
      { type: 'if_block', label: 'if',   isCtrl: true, params: [{name:'cond',def:'mouseIsPressed'}],                                                   code: p=>`if (${p.cond}) {` },
      { type: 'op_gt',  label: '>',  isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} > ${p.b})` },
      { type: 'op_lt',  label: '<',  isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} < ${p.b})` },
      { type: 'op_gte', label: '≥',  isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} >= ${p.b})` },
      { type: 'op_lte', label: '≤',  isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} <= ${p.b})` },
      { type: 'op_eq',  label: '==', isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} === ${p.b})` },
      { type: 'op_neq', label: '≠',  isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} !== ${p.b})` },
      { type: 'op_and', label: '&&', isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'true'},{name:'b',def:'true'}], code: p=>`(${p.a} && ${p.b})` },
      { type: 'op_or',  label: '||', isExpr: true, isOp: true, isBool: true, params: [{name:'a',def:'true'},{name:'b',def:'true'}], code: p=>`(${p.a} || ${p.b})` },
      { type: 'op_not', label: '!',  isExpr: true, isOp: true, isBool: true, isUnary: true, params: [{name:'a',def:'true'}], code: p=>`(!${p.a})` },
    ]
  },
  variabelen: {
    label: 'Variabelen', color: '#E23D96',
    blocks: [
      { type: 'var_declare', label: 'let', palLabel: 'let naam = waarde', isVar: true, params: [{name:'naam',def:'x'},{name:'waarde',def:'0'}], code: p=>`let ${p.naam} = ${p.waarde};` },
      { type: 'var_set',     label: '',    palLabel: 'naam = waarde',    isVar: true, params: [{name:'naam',def:'x'},{name:'waarde',def:'0'}], code: p=>`${p.naam} = ${p.waarde};` },
      { type: 'mouseX',     label: 'mouseX',     params: [], isExpr: true, code: ()=>'mouseX' },
      { type: 'mouseY',     label: 'mouseY',     params: [], isExpr: true, code: ()=>'mouseY' },
      { type: 'width',      label: 'width',      params: [], isExpr: true, code: ()=>'width' },
      { type: 'height',     label: 'height',     params: [], isExpr: true, code: ()=>'height' },
      { type: 'frameCount', label: 'frameCount', params: [], isExpr: true, code: ()=>'frameCount' },
      { type: 'PI',         label: 'PI',         params: [], isExpr: true, code: ()=>'PI' },
      { type: 'TAU',        label: 'TAU',        params: [], isExpr: true, code: ()=>'TAU' },
      { type: 'TWO_PI',     label: 'TWO_PI',     params: [], isExpr: true, code: ()=>'TWO_PI' },
      { type: 'HALF_PI',    label: 'HALF_PI',    params: [], isExpr: true, code: ()=>'HALF_PI' },
    ]
  },
};

function findDef(type) {
  for (const cat of Object.values(CATEGORIES)) {
    const b = cat.blocks.find(b => b.type === type);
    if (b) return { ...b, color: cat.color };
  }
  return null;
}

// ── State ──────────────────────────────────────────────────────
let _uid = 0;
const newId = () => `b${++_uid}`;

const state = {
  vars: [], setup: [], draw: [],
  activeCat: 'shapes',
  showCode: false,
  lang: 'nl',
  dragItem: null,
  dropTarget: null,
};

// ── Presets ────────────────────────────────────────────────────
function makeBlock(type, overrides = {}) {
  const def = findDef(type);
  const vals = {};
  def.params.forEach(p => { vals[p.name] = overrides[p.name] ?? p.def; });
  const b = { id: newId(), type, values: vals };
  if (def.isCtrl) b.children = [];
  return b;
}

function deepCopyBlock(b) {
  const copy = { ...b, id: newId(), values: { ...b.values } };
  if (b.children) copy.children = b.children.map(deepCopyBlock);
  if (b.elseBranch) copy.elseBranch = b.elseBranch.map(deepCopyBlock);
  return copy;
}

function getChildrenById(blocks, id) {
  const isElse = id.endsWith(':else');
  const realId = isElse ? id.slice(0, -5) : id;
  for (const b of blocks) {
    if (b.id === realId) return isElse ? (b.elseBranch || (b.elseBranch = [])) : b.children;
    const r = getChildrenById(b.children || [], id);
    if (r) return r;
    if (b.elseBranch) { const r2 = getChildrenById(b.elseBranch, id); if (r2) return r2; }
  }
  return null;
}

function getBlockList(zone, parentId) {
  if (!parentId) return state[zone];
  return getChildrenById(state[zone], parentId) ?? state[zone];
}

const PRESETS = {
  leeg: { vars: [], setup: [], draw: [] },
  regenboog: {
    vars: [
      makeBlock('var_declare', {naam:'x', waarde:'0'}),
      makeBlock('var_declare', {naam:'y', waarde:'0'}),
      makeBlock('var_declare', {naam:'r', waarde:'300'}),
    ],
    setup: [
      makeBlock('createCanvas', {w:'900',h:'900'}),
      makeBlock('colorMode', {mode:'HSB'}),
    ],
    draw: (() => {
      const V  = (name, color='#8B5CF6') => ({ code: name, exprType: '__var__', color });
      const op = (type, a, b) => {
        const ac = (a && typeof a==='object') ? a.code : a;
        const bc = (b && typeof b==='object') ? b.code : b;
        const sym = {op_mul:'*', op_div:'/'};
        return { code:`(${ac} ${sym[type]} ${bc})`, exprType:type, color:'#C0CE68', values:{a,b} };
      };
      const W = V('width');  const H = V('height');
      const r = V('r');      const x = V('x');  const y = V('y');
      const i = V('i', '#F3722E');
      const loop = makeBlock('for_loop', {v:'i',start:'0',end:'36',step:'1'});
      loop.children = [
        makeBlock('var_set', {naam:'x', waarde: op('op_mul', 'cos(i*TWO_PI/36)', r)}),
        makeBlock('var_set', {naam:'y', waarde: op('op_mul', 'sin(i*TWO_PI/36)', r)}),
        makeBlock('fill', {r: op('op_mul', i, '10'), g:'255', b:'255'}),
        makeBlock('noStroke'),
        makeBlock('circle', {x, y, d:'80'}),
      ];
      return [
        makeBlock('translate', {x: op('op_div', W, '2'), y: op('op_div', H, '2')}),
        makeBlock('background', {c:'0, 0, 20'}),
        loop,
      ];
    })(),
  },
  muis_volger: {
    setup: [ makeBlock('createCanvas', {w:'900',h:'900'}), makeBlock('noStroke') ],
    draw: [
      makeBlock('background', {c:'245, 245, 245'}),
      makeBlock('fill', {r:'100',g:'200',b:'255'}),
      makeBlock('circle', {x:{code:'mouseX',exprType:'mouseX',color:'#E23D96'},y:{code:'mouseY',exprType:'mouseY',color:'#E23D96'},d:'60'}),
      makeBlock('fill', {r:'255',g:'100',b:'150'}),
      makeBlock('circle', {x:{code:'(mouseX + 30)',exprType:'op_add',color:'#C0CE68',values:{a:{code:'mouseX',exprType:'mouseX',color:'#E23D96'},b:'30'}}, y:{code:'(mouseY - 30)',exprType:'op_sub',color:'#C0CE68',values:{a:{code:'mouseY',exprType:'mouseY',color:'#E23D96'},b:'30'}}, d:'30'}),
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// CODE GENERATION
// ═══════════════════════════════════════════════════════════════

function generateCode() {
  const ind = (s, n) => '  '.repeat(n) + s;
  const resolveVal = v => (v && typeof v === 'object') ? v.code : v;

  function process(blocks, lvl) {
    const lines = [];
    for (const b of blocks) {
      const def = findDef(b.type);
      if (!def) continue;
      const resolved = {};
      Object.entries(b.values).forEach(([k,v]) => resolved[k] = resolveVal(v));
      if (def.isCtrl) {
        lines.push(ind(def.code(resolved), lvl));
        lines.push(...process(b.children || [], lvl + 1));
        if (b.hasElse) {
          lines.push(ind('} else {', lvl));
          lines.push(...process(b.elseBranch || [], lvl + 1));
        }
        lines.push(ind('}', lvl));
      } else {
        lines.push(ind(def.code(resolved), lvl));
      }
    }
    return lines;
  }

  const varLines = process(state.vars, 0).join('\n');
  return `${varLines ? varLines + '\n\n' : ''}function setup() {\n${process(state.setup, 1).join('\n')}\n}\n\nfunction draw() {\n${process(state.draw, 1).join('\n')}\n}`;
}

// ═══════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════

function darken(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgb(${Math.round(r*.55)},${Math.round(g*.55)},${Math.round(b*.55)})`;
}

function renderCategories() {
  const el = document.getElementById('cat-list');
  el.innerHTML = '';
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (key === state.activeCat ? ' active' : '');
    if (key === state.activeCat) btn.style.background = cat.color + '22';
    btn.innerHTML = `<span class="cat-dot" style="background:${cat.color}"></span>${catLabel(key)}`;
    btn.onclick = () => { state.activeCat = key; renderCategories(); renderPalette(); };
    el.appendChild(btn);
  }
}

function renderPalette() {
  const el = document.getElementById('block-list');
  el.innerHTML = '';
  const cat = CATEGORIES[state.activeCat];
  if (!cat) return;

  cat.blocks.forEach(block => {
    const div = document.createElement('div');
    const blockColor = block.color ?? cat.color;
    div.className = 'pal-block';
    div.style.borderLeftColor = blockColor;
    div.style.setProperty('--pal-color', blockColor);
    div.draggable = true;

    let inner;
    if (block.isOp) {
      const slotCls = block.isBool ? 'op-slot bool-slot' : 'op-slot';
      const slots = block.isUnary
        ? `<span style="font-weight:700;padding:0 3px 0 5px">${block.label}</span><span class="${slotCls}"></span>`
        : `<span class="${slotCls}"></span><span style="font-weight:700;padding:0 5px">${block.label}</span><span class="${slotCls}"></span>`;
      inner = slots;
      div.classList.add('op');
      if (block.isBool) div.classList.add('bool-op');
    } else if (block.palLabel) {
      const lbl = block.type === 'var_declare' ? t('palVarDeclare') : block.type === 'var_set' ? t('palVarSet') : block.palLabel;
      inner = `<span>${lbl}</span>`;
    } else if (block.params.length) {
      inner = `<span>${block.label}(<span style="color:#999;font-size:11px">${block.params.map(p=>p.name).join(', ')}</span>)</span>`;
    } else {
      inner = `<span>${block.label}</span>`;
    }
    div.innerHTML = inner;

    if (block.isExpr && !block.params.length) div.classList.add('expr-const');

    div.addEventListener('dragstart', e => {
      const vals = {};
      block.params.forEach(p => vals[p.name] = p.def);
      state.dragItem = { type: block.type, color: cat.color, values: vals, source: 'palette', isExpr: !!block.isExpr };
      e.dataTransfer.effectAllowed = 'copy';
    });
    div.addEventListener('dragend', () => {
      state.dragItem = null;
      state.dropTarget = null;
      renderZones();
    });
    el.appendChild(div);
  });
}

function renderZones() {
  renderZone('vars');
  renderZone('setup');
  renderZone('draw');
}

function renderZone(zone) {
  const body = document.querySelector(`.zone-body[data-zone="${zone}"]`);
  body.innerHTML = '';
  renderBlockList(state[zone], zone, null, body);
  body.classList.toggle('drag-over', state.dropTarget?.zone === zone && !state.dropTarget?.parentId);

  if (!body.dataset.listening) {
    body.dataset.listening = '1';
    body.addEventListener('dragover', e => {
      if (state.dragItem?.isExpr) return;
      e.preventDefault();
      if (!state.dropTarget || state.dropTarget.zone !== zone || state.dropTarget.parentId) {
        state.dropTarget = { zone, parentId: null, idx: state[zone].length };
        renderZones();
      }
    });
    body.addEventListener('dragleave', e => {
      if (!body.contains(e.relatedTarget)) { state.dropTarget = null; renderZones(); }
    });
    body.addEventListener('drop', e => { e.preventDefault(); handleDrop(zone, null); });
  }
}

function buildBlockDiv(block, def, zone, parentId, idx) {
  const div = document.createElement('div');
  div.className = 'ws-block' + (def.isVar ? ' is-var' : '');
  div.style.border = `1.5px solid ${def.color}`;
  div.style.boxShadow = `0 1px 3px rgba(0,0,0,.07)`;
  div.style.setProperty('--block-color', def.color);
  div.draggable = true;

  if (def.isOp) {
    div.appendChild(punc('('));
  } else if (def.isVar) {
    if (def.label) {
      const fnSpan = document.createElement('span');
      fnSpan.className = 'block-fn';
      fnSpan.textContent = def.label + ' ';
      div.appendChild(fnSpan);
    }
  } else {
    const fnSpan = document.createElement('span');
    fnSpan.className = 'block-fn';
    fnSpan.textContent = def.params.length ? def.label + '(' : def.label;
    div.appendChild(fnSpan);
  }

  if (def.params.length) {
    def.params.forEach((p, pi) => {
      if (pi > 0) div.appendChild(def.isOp ? punc(` ${def.label} `) : (def.isVar ? punc(' = ') : punc(', ')));
      const val = block.values[p.name] ?? p.def;
      if (val && typeof val === 'object' && val.exprType) {
        const badge = document.createElement('span');
        const eDef = findDef(val.exprType);
        badge.className = 'expr-badge' + (eDef?.isBool ? ' bool-badge' : '');
        badge.style.setProperty('--block-color', val.color || '#999');
        const recomputeOpCode = () => {
          const resolved = {};
          eDef.params.forEach(ep => {
            const v = val.values[ep.name];
            resolved[ep.name] = (v && typeof v === 'object') ? v.code : v;
          });
          val.code = eDef.code(resolved);
        };
        if (eDef?.isOp && val.values) {
          if (eDef.isUnary) badge.appendChild(punc(eDef.label));
          else badge.appendChild(punc('('));
          eDef.params.forEach((ep, epi) => {
            if (epi > 0) badge.appendChild(punc(` ${eDef.label} `));
            const pVal = val.values[ep.name];
            if (pVal && typeof pVal === 'object' && pVal.exprType) {
              const mini = document.createElement('span');
              mini.className = 'expr-badge';
              mini.style.setProperty('--block-color', pVal.color || '#999');
              mini.style.fontSize = '11px'; mini.style.padding = '1px 5px';
              mini.textContent = pVal.code;
              const xb = document.createElement('button');
              xb.className = 'expr-badge-x'; xb.textContent = '×';
              xb.addEventListener('click', e => {
                e.stopPropagation();
                val.values[ep.name] = pVal.code;
                recomputeOpCode();
                renderZones(); scheduleRun(); updateCodePanel();
              });
              mini.appendChild(xb);
              mini.addEventListener('dragover', e => {
                if (!state.dragItem?.isExpr) return;
                e.preventDefault(); e.stopPropagation(); mini.style.opacity = '.6';
              });
              mini.addEventListener('dragleave', () => mini.style.opacity = '');
              mini.addEventListener('drop', e => {
                if (!state.dragItem?.isExpr) return;
                e.preventDefault(); e.stopPropagation(); mini.style.opacity = '';
                const ed2 = findDef(state.dragItem.type);
                val.values[ep.name] = { code: ed2.code(state.dragItem.values), exprType: state.dragItem.type, color: state.dragItem.color, values: { ...state.dragItem.values } };
                state.dragItem = null; state.dropTarget = null;
                recomputeOpCode();
                renderZones(); scheduleRun(); updateCodePanel();
              });
              badge.appendChild(mini);
            } else {
              const inp = document.createElement('input');
              inp.className = 'block-input';
              inp.value = (pVal && typeof pVal === 'object') ? pVal.code : (pVal ?? ep.def);
              inp.style.width = inputWidth(inp.value);
              inp.addEventListener('input', e => {
                e.stopPropagation();
                val.values[ep.name] = e.target.value;
                recomputeOpCode();
                e.target.style.width = inputWidth(e.target.value);
                scheduleRun(); updateCodePanel();
              });
              inp.addEventListener('click', e => e.stopPropagation());
              inp.addEventListener('mousedown', e => e.stopPropagation());
              inp.addEventListener('dragover', e => {
                if (!state.dragItem?.isExpr) return;
                e.preventDefault(); e.stopPropagation(); inp.classList.add('expr-over');
              });
              inp.addEventListener('dragleave', () => inp.classList.remove('expr-over'));
              inp.addEventListener('drop', e => {
                if (!state.dragItem?.isExpr) return;
                e.preventDefault(); e.stopPropagation();
                const ed2 = findDef(state.dragItem.type);
                val.values[ep.name] = { code: ed2.code(state.dragItem.values), exprType: state.dragItem.type, color: state.dragItem.color, values: { ...state.dragItem.values } };
                inp.classList.remove('expr-over');
                state.dragItem = null; state.dropTarget = null;
                recomputeOpCode();
                renderZones(); scheduleRun(); updateCodePanel();
              });
              badge.appendChild(inp);
            }
          });
          if (!eDef.isUnary) badge.appendChild(punc(')'));
        } else {
          badge.appendChild(document.createTextNode(val.code));
        }
        const xBtn = document.createElement('button');
        xBtn.className = 'expr-badge-x'; xBtn.textContent = '×';
        xBtn.addEventListener('click', e => {
          e.stopPropagation();
          block.values[p.name] = val.code;
          renderZones(); scheduleRun(); updateCodePanel();
        });
        badge.appendChild(xBtn);
        badge.addEventListener('dragover', e => {
          if (!state.dragItem?.isExpr) return;
          e.preventDefault(); e.stopPropagation(); badge.style.opacity = '.6';
        });
        badge.addEventListener('dragleave', () => badge.style.opacity = '');
        badge.addEventListener('drop', e => {
          if (!state.dragItem?.isExpr) return;
          e.preventDefault(); e.stopPropagation(); badge.style.opacity = '';
          const ed = findDef(state.dragItem.type);
          block.values[p.name] = { code: ed.code(state.dragItem.values), exprType: state.dragItem.type, color: state.dragItem.color, values: { ...state.dragItem.values } };
          state.dragItem = null; state.dropTarget = null;
          renderZones(); scheduleRun(); updateCodePanel();
        });
        div.appendChild(badge);
      } else {
        const inp = document.createElement('input');
        inp.className = 'block-input';
        inp.value = val; inp.style.width = inputWidth(inp.value);
        inp.addEventListener('input', e => {
          e.stopPropagation();
          block.values[p.name] = e.target.value;
          e.target.style.width = inputWidth(e.target.value);
          scheduleRun(); updateCodePanel();
        });
        inp.addEventListener('click', e => e.stopPropagation());
        inp.addEventListener('mousedown', e => e.stopPropagation());
        inp.addEventListener('dragover', e => {
          if (!state.dragItem?.isExpr) return;
          e.preventDefault(); e.stopPropagation(); inp.classList.add('expr-over');
        });
        inp.addEventListener('dragleave', () => inp.classList.remove('expr-over'));
        inp.addEventListener('drop', e => {
          if (!state.dragItem?.isExpr) return;
          e.preventDefault(); e.stopPropagation();
          const ed = findDef(state.dragItem.type);
          block.values[p.name] = { code: ed.code(state.dragItem.values), exprType: state.dragItem.type, color: state.dragItem.color, values: { ...state.dragItem.values } };
          inp.classList.remove('expr-over');
          state.dragItem = null; state.dropTarget = null;
          renderZones(); scheduleRun(); updateCodePanel();
        });
        div.appendChild(inp);
      }
    });
    const closing = def.isCtrl ? ') {' : (def.isExpr ? ')' : (def.isVar ? ';' : ');'));
    div.appendChild(punc(closing));
  } else {
    if (def.isCtrl) div.appendChild(punc(' {'));
    else if (!def.isExpr) div.appendChild(punc(';'));
  }

  const del = document.createElement('button');
  del.className = 'block-del'; del.innerHTML = '&times;'; del.title = t('blockDelete');
  del.addEventListener('click', e => {
    e.stopPropagation();
    getBlockList(zone, parentId).splice(idx, 1);
    renderZones(); scheduleRun();
  });
  div.appendChild(del);

  if (block.type === 'if_block') {
    const elseBtn = document.createElement('button');
    elseBtn.className = 'btn-else';
    elseBtn.textContent = block.hasElse ? '− else' : '+ else';
    elseBtn.title = block.hasElse ? 'Verwijder else-tak' : 'Voeg else-tak toe';
    elseBtn.addEventListener('click', e => {
      e.stopPropagation();
      block.hasElse = !block.hasElse;
      if (!block.elseBranch) block.elseBranch = [];
      renderZones(); scheduleRun(); updateCodePanel();
    });
    div.appendChild(elseBtn);
  }

  div.addEventListener('dragstart', e => {
    state.dragItem = { ...block, color: def.color, source: 'workspace', sourceZone: zone, sourceParentId: parentId, sourceIdx: idx };
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => div.classList.add('dragging'), 0);
  });
  div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
    state.dragItem = null; state.dropTarget = null; renderZones();
  });
  div.addEventListener('dragover', e => {
    if (state.dragItem?.isExpr) return;
    e.preventDefault(); e.stopPropagation();
    if (state.dropTarget?.zone !== zone || state.dropTarget?.parentId !== parentId || state.dropTarget?.idx !== idx) {
      state.dropTarget = { zone, parentId, idx };
      if (!parentId) renderZones();
    }
  });

  return div;
}

function renderBlockList(blocks, zone, parentId, container) {
  if (blocks.length === 0 && parentId === null) {
    const empty = document.createElement('div');
    empty.className = 'zone-empty'; empty.textContent = t('zoneEmpty');
    container.appendChild(empty);
  }

  blocks.forEach((block, idx) => {
    if (state.dropTarget?.zone === zone && state.dropTarget?.parentId === parentId && state.dropTarget?.idx === idx) {
      container.appendChild(makeDropLine());
    }
    const def = findDef(block.type);
    if (!def) return;

    const div = buildBlockDiv(block, def, zone, parentId, idx);
    container.appendChild(div);

    if (def.isCtrl) {
      const childArea = document.createElement('div');
      childArea.className = 'ctrl-children';
      childArea.classList.toggle('drag-over', state.dropTarget?.zone === zone && state.dropTarget?.parentId === block.id);
      renderBlockList(block.children || [], zone, block.id, childArea);
      childArea.addEventListener('dragover', e => {
        if (state.dragItem?.isExpr) return;
        e.preventDefault(); e.stopPropagation();
        state.dropTarget = { zone, parentId: block.id, idx: (block.children || []).length };
        childArea.classList.add('drag-over');
      });
      childArea.addEventListener('dragleave', e => {
        if (!childArea.contains(e.relatedTarget)) {
          childArea.classList.remove('drag-over');
          state.dropTarget = null;
        }
      });
      childArea.addEventListener('drop', e => {
        e.preventDefault();
        childArea.classList.remove('drag-over');
        handleDrop(zone, block.id);
      });
      container.appendChild(childArea);

      if (block.hasElse) {
        const elseHdr = document.createElement('div');
        elseHdr.className = 'ctrl-close else-hdr';
        elseHdr.innerHTML = '} <span class="kw-function">else</span> {';
        container.appendChild(elseHdr);

        const elseId = block.id + ':else';
        const elseArea = document.createElement('div');
        elseArea.className = 'ctrl-children';
        elseArea.classList.toggle('drag-over', state.dropTarget?.zone === zone && state.dropTarget?.parentId === elseId);
        renderBlockList(block.elseBranch || [], zone, elseId, elseArea);
        elseArea.addEventListener('dragover', e => {
          if (state.dragItem?.isExpr) return;
          e.preventDefault(); e.stopPropagation();
          state.dropTarget = { zone, parentId: elseId, idx: (block.elseBranch || []).length };
          elseArea.classList.add('drag-over');
        });
        elseArea.addEventListener('dragleave', e => {
          if (!elseArea.contains(e.relatedTarget)) {
            elseArea.classList.remove('drag-over');
            state.dropTarget = null;
          }
        });
        elseArea.addEventListener('drop', e => {
          e.preventDefault();
          elseArea.classList.remove('drag-over');
          handleDrop(zone, elseId);
        });
        container.appendChild(elseArea);
      }

      const close = document.createElement('div');
      close.className = 'ctrl-close'; close.textContent = '}';
      container.appendChild(close);
    }
  });

  if (state.dropTarget?.zone === zone && state.dropTarget?.parentId === parentId && state.dropTarget?.idx === blocks.length) {
    container.appendChild(makeDropLine());
  }
}

function punc(text) {
  const s = document.createElement('span');
  s.className = 'block-punc';
  s.textContent = text;
  return s;
}

function inputWidth(val) {
  return Math.max(42, val.length * 11.25 + 21) + 'px';
}

function makeDropLine() {
  const d = document.createElement('div');
  d.className = 'drop-line';
  return d;
}

function handleDrop(zone, parentId) {
  const item = state.dragItem;
  if (!item) return;
  const destList = getBlockList(zone, parentId);
  const targetIdx = state.dropTarget?.idx ?? destList.length;

  if (item.source === 'palette') {
    const newBlock = { id: newId(), type: item.type, values: { ...item.values } };
    if (findDef(item.type)?.isCtrl) { newBlock.children = []; newBlock.hasElse = false; newBlock.elseBranch = []; }
    destList.splice(targetIdx, 0, newBlock);
  } else {
    const srcList = getBlockList(item.sourceZone, item.sourceParentId);
    const [removed] = srcList.splice(item.sourceIdx, 1);
    const sameList = item.sourceZone === zone && item.sourceParentId === parentId;
    const adj = sameList && item.sourceIdx < targetIdx ? targetIdx - 1 : targetIdx;
    destList.splice(Math.max(0, adj), 0, removed);
  }

  state.dragItem = null;
  state.dropTarget = null;
  renderZones();
  scheduleRun();
}

function updateCodePanel() {
  if (!state.showCode) return;
  document.getElementById('code-pre').textContent = generateCode();
}

// ═══════════════════════════════════════════════════════════════
// PREVIEW
// ═══════════════════════════════════════════════════════════════

let runTimer = null;

function scheduleRun() {
  clearTimeout(runTimer);
  runTimer = setTimeout(runSketch, 400);
  saveWorkspace();
}

// ═══════════════════════════════════════════════════════════════
// SAVE / LOAD
// ═══════════════════════════════════════════════════════════════

const LS_KEY = 'p5blocks_workspace';

function saveWorkspace() {
  try {
    const name = document.getElementById('sketch-name').value;
    localStorage.setItem(LS_KEY, JSON.stringify({ name, vars: state.vars, setup: state.setup, draw: state.draw }));
  } catch(e) {}
}

function loadWorkspace() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.name) document.getElementById('sketch-name').value = data.name;
    state.vars  = (data.vars  || []).map(deepCopyBlock);
    state.setup = (data.setup || []).map(deepCopyBlock);
    state.draw  = (data.draw  || []).map(deepCopyBlock);
    return true;
  } catch(e) { return false; }
}

function exportWorkspace() {
  const name = document.getElementById('sketch-name').value || 'sketch';
  const data = JSON.stringify({ name, vars: state.vars, setup: state.setup, draw: state.draw }, null, 2);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
  a.download = name + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importWorkspace(file) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.name) document.getElementById('sketch-name').value = data.name;
      state.vars  = (data.vars  || []).map(deepCopyBlock);
      state.setup = (data.setup || []).map(deepCopyBlock);
      state.draw  = (data.draw  || []).map(deepCopyBlock);
      renderZones(); scheduleRun(); updateCodePanel();
    } catch(err) { alert('Ongeldig JSON-bestand.'); }
  };
  reader.readAsText(file);
}

function clearError() {
  const bar = document.getElementById('error-bar');
  bar.textContent = ''; bar.classList.add('hidden');
}

function runSketch() {
  const code = generateCode();
  clearError();
  document.getElementById('preview-frame').srcdoc =
    `<!DOCTYPE html><html><head><meta charset="UTF-8"/>
<style>html,body{margin:0;overflow:hidden;background:#f0f0f0;}canvas{display:block;}</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/2.0.2/p5.min.js"><\/script>
<script>window.onerror=function(msg,_,line,col){parent.postMessage({type:'p5error',msg,line,col},'*');return true;};
window.addEventListener('unhandledrejection',e=>{parent.postMessage({type:'p5error',msg:String(e.reason?.message||e.reason)},'*');});<\/script>
</head><body><script>${code}<\/script></body></html>`;
}

window.addEventListener('message', e => {
  if (e.data?.type !== 'p5error') return;
  const bar = document.getElementById('error-bar');
  const loc = e.data.line ? ` (regel ${e.data.line}${e.data.col ? ':' + e.data.col : ''})` : '';
  bar.textContent = '⚠ ' + e.data.msg + loc;
  bar.classList.remove('hidden');
});

function loadPreset(name) {
  _uid = 0;
  const p = PRESETS[name];
  if (!p) return;
  state.vars  = (p.vars  || []).map(deepCopyBlock);
  state.setup = p.setup.map(deepCopyBlock);
  state.draw  = p.draw.map(deepCopyBlock);
  renderZones();
  scheduleRun();
}

// ═══════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════

document.getElementById('btn-run').addEventListener('click', () => {
  renderZones();
  runSketch();
});

document.getElementById('btn-stop').addEventListener('click', () => {
  document.getElementById('preview-frame').srcdoc = '';
  clearTimeout(runTimer);
});

document.getElementById('btn-code').addEventListener('click', () => {
  state.showCode = !state.showCode;
  document.getElementById('code-panel').classList.toggle('hidden', !state.showCode);
  document.getElementById('btn-code').classList.toggle('active', state.showCode);
  updateCodePanel();
});

document.getElementById('btn-copy-code').addEventListener('click', () => {
  navigator.clipboard?.writeText(generateCode());
});

document.getElementById('preset-select').addEventListener('change', function () {
  if (this.value) { loadPreset(this.value); this.value = ''; }
});

document.getElementById('btn-export').addEventListener('click', exportWorkspace);

document.getElementById('btn-import').addEventListener('click', () => {
  document.getElementById('file-import').value = '';
  document.getElementById('file-import').click();
});

document.getElementById('file-import').addEventListener('change', function() {
  if (this.files[0]) importWorkspace(this.files[0]);
});

document.getElementById('sketch-name').addEventListener('input', saveWorkspace);

document.getElementById('btn-lang').addEventListener('click', () => {
  state.lang = state.lang === 'nl' ? 'en' : 'nl';
  applyLang();
});

function applyLang() {
  const sel = document.getElementById('preset-select');
  sel.options[0].textContent = t('presetPlaceholder');
  sel.options[1].textContent = t('presetLeeg');
  sel.options[2].textContent = t('presetRegenboog');
  sel.options[3].textContent = t('presetMuisVolger');
  document.getElementById('zone-vars-label').textContent = t('zoneVars');
  document.getElementById('zone-vars-sub').textContent   = t('zoneVarsSub');
  document.getElementById('code-panel-header').textContent = t('codeTitle');
  document.getElementById('btn-copy-code').innerHTML = `<i class="bi bi-clipboard"></i> ${t('codeCopy')}`;
  document.getElementById('btn-lang').textContent = state.lang === 'nl' ? 'EN' : 'NL';
  renderCategories();
  renderPalette();
  renderZones();
}

// ── Init ───────────────────────────────────────────────────────
renderCategories();
renderPalette();
if (!loadWorkspace()) loadPreset('muis_volger');
else { renderZones(); scheduleRun(); }
