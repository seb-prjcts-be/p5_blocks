// ═══════════════════════════════════════════════════════════════
// I18N
// ═══════════════════════════════════════════════════════════════

const CAT_LABELS = {
  nl: { setup:'Setup', shapes:'Vormen', kleur:'Kleur', transform:'Transform', interactie:'Typografie', wiskunde:'Wiskunde', controle:'Controle', variabelen:'Variabelen', invoer:'Invoer', driedee:'3D' },
  en: { setup:'Setup', shapes:'Shape',  kleur:'Color', transform:'Transform', interactie:'Typography', wiskunde:'Math',     controle:'Structure',  variabelen:'Variables',  invoer:'Input',  driedee:'3D' },
};

const UI = {
  nl: {
    zoneVars:'variabelen', zoneVarsSub:'(globaal)', zoneKlad:'kladblok', zoneKladSub:'(geen code)',
    zoneEmpty:'Sleep blokken hierheen…',
    presetPlaceholder:'Voorbeelden…',
    codeTitle:'Gegenereerde code', codeCopy:'Kopieer naar klembord',
    blockDelete:'Verwijder',
    palHide:'Verberg dit blok',
    libTitle:'Blokbibliotheek', libProfiles:'Profielen:', libSaved:'Opgeslagen:', libSavePlaceholder:'Naam…', libSaveBtn:'Opslaan',

    palVarDeclare:'let naam = waarde', palVarDeclareOnly:'let naam', palVarSet:'naam = waarde',
    opAdd:'optellen', opSub:'aftrekken', opMul:'vermenigvuldigen', opDiv:'delen', opMod:'restgetal',
    opGt:'groter dan', opLt:'kleiner dan', opGte:'groter of gelijk', opLte:'kleiner of gelijk',
    opEq:'gelijk aan', opNeq:'niet gelijk', opAnd:'EN', opOr:'OF', opNot:'NIET',
  },
  en: {
    zoneVars:'variables', zoneVarsSub:'(global)', zoneKlad:'scratch pad', zoneKladSub:'(no code)',
    zoneEmpty:'Drag blocks here…',
    presetPlaceholder:'Examples…',
    codeTitle:'Generated code', codeCopy:'Copy to clipboard',
    blockDelete:'Delete',
    palHide:'Hide this block',
    libTitle:'Block Library', libProfiles:'Profiles:', libSaved:'Saved:', libSavePlaceholder:'Name…', libSaveBtn:'Save',

    palVarDeclare:'let name = value', palVarDeclareOnly:'let name', palVarSet:'name = value',
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
      { type: 'createCanvas',       label: 'createCanvas',  params: [{name:'w',def:'900'},{name:'h',def:'900'}],                        code: p=>`createCanvas(${p.w}, ${p.h});` },
      { type: 'createCanvasMode',   label: 'createCanvas',  params: [{name:'w',def:'400'},{name:'h',def:'400'},{name:'mode',def:'WEBGL'}], enabled: false, code: p=>`createCanvas(${p.w}, ${p.h}, ${p.mode});` },
      { type: 'background',    label: 'background',     params: [{name:'c',def:'220'}],                                code: p=>`background(${p.c});` },
      { type: 'frameRate',     label: 'frameRate',      params: [{name:'fps',def:'30'}],                               code: p=>`frameRate(${p.fps});` },
      { type: 'noLoop',        label: 'noLoop()',       params: [], enabled: false,                                    code: ()=>'noLoop();' },
      { type: 'loop',          label: 'loop()',         params: [], enabled: false,                                    code: ()=>'loop();' },
      { type: 'angleMode',     label: 'angleMode',      params: [{name:'mode',def:'RADIANS'}], enabled: false,         code: p=>`angleMode(${p.mode});` },
      { type: 'smooth',        label: 'smooth()',       params: [], enabled: false,                                    code: ()=>'smooth();' },
      { type: 'noSmooth',      label: 'noSmooth()',     params: [], enabled: false,                                    code: ()=>'noSmooth();' },
      { type: 'pixelDensity',  label: 'pixelDensity',  params: [{name:'d',def:'2'}], enabled: false,                  code: p=>`pixelDensity(${p.d});` },
      { type: 'rectMode',      label: 'rectMode',       params: [{name:'mode',def:'CORNER'}], enabled: false,          code: p=>`rectMode(${p.mode});` },
      { type: 'ellipseMode',   label: 'ellipseMode',   params: [{name:'mode',def:'CENTER'}], enabled: false,           code: p=>`ellipseMode(${p.mode});` },
      { type: 'strokeCap',     label: 'strokeCap',      params: [{name:'cap',def:'ROUND'}], enabled: false,            code: p=>`strokeCap(${p.cap});` },
      { type: 'strokeJoin',    label: 'strokeJoin',     params: [{name:'join',def:'MITER'}], enabled: false,           code: p=>`strokeJoin(${p.join});` },
    ]
  },
  shapes: {
    label: 'Vormen', color: '#0091D1',
    blocks: [
      { type: 'ellipse',       label: 'ellipse',        params: [{name:'x',def:'200'},{name:'y',def:'200'},{name:'w',def:'80'},{name:'h',def:'80'}],    code: p=>`ellipse(${p.x}, ${p.y}, ${p.w}, ${p.h});` },
      { type: 'circle',        label: 'circle',         params: [{name:'x',def:'200'},{name:'y',def:'200'},{name:'d',def:'100'}],                       code: p=>`circle(${p.x}, ${p.y}, ${p.d});` },
      { type: 'rect',          label: 'rect',           params: [{name:'x',def:'50'},{name:'y',def:'50'},{name:'w',def:'100'},{name:'h',def:'80'}],     code: p=>`rect(${p.x}, ${p.y}, ${p.w}, ${p.h});` },
      { type: 'line',          label: 'line',           params: [{name:'x1',def:'0'},{name:'y1',def:'0'},{name:'x2',def:'200'},{name:'y2',def:'200'}],  code: p=>`line(${p.x1}, ${p.y1}, ${p.x2}, ${p.y2});` },
      { type: 'triangle',      label: 'triangle',       params: [{name:'x1',def:'100'},{name:'y1',def:'50'},{name:'x2',def:'50'},{name:'y2',def:'150'},{name:'x3',def:'150'},{name:'y3',def:'150'}], code: p=>`triangle(${p.x1},${p.y1},${p.x2},${p.y2},${p.x3},${p.y3});` },
      { type: 'point',         label: 'point',          params: [{name:'x',def:'100'},{name:'y',def:'100'}],                                            code: p=>`point(${p.x}, ${p.y});` },
      { type: 'arc',           label: 'arc',            params: [{name:'x',def:'200'},{name:'y',def:'200'},{name:'w',def:'100'},{name:'h',def:'100'},{name:'start',def:'0'},{name:'stop',def:'PI'}], code: p=>`arc(${p.x},${p.y},${p.w},${p.h},${p.start},${p.stop});` },
      { type: 'square',        label: 'square',         params: [{name:'x',def:'50'},{name:'y',def:'50'},{name:'s',def:'80'}], enabled: false,          code: p=>`square(${p.x}, ${p.y}, ${p.s});` },
      { type: 'quad',          label: 'quad',           params: [{name:'x1',def:'20'},{name:'y1',def:'20'},{name:'x2',def:'80'},{name:'y2',def:'20'},{name:'x3',def:'90'},{name:'y3',def:'90'},{name:'x4',def:'10'},{name:'y4',def:'90'}], enabled: false, code: p=>`quad(${p.x1},${p.y1},${p.x2},${p.y2},${p.x3},${p.y3},${p.x4},${p.y4});` },
      { type: 'beginShape',    label: 'beginShape()',   params: [], enabled: false,                                    code: ()=>'beginShape();' },
      { type: 'vertex',        label: 'vertex',         params: [{name:'x',def:'100'},{name:'y',def:'100'}], enabled: false, code: p=>`vertex(${p.x}, ${p.y});` },
      { type: 'splineVertex',  label: 'splineVertex',   params: [{name:'x',def:'100'},{name:'y',def:'100'}], enabled: false, code: p=>`splineVertex(${p.x}, ${p.y});` },
      { type: 'endShape',      label: 'endShape()',     params: [], enabled: false,                                    code: ()=>'endShape();' },
      { type: 'endShapeClose', label: 'endShape(CLOSE)',params: [], enabled: false,                                    code: ()=>'endShape(CLOSE);' },
      { type: 'bezier',        label: 'bezier',         params: [{name:'x1',def:'0'},{name:'y1',def:'0'},{name:'cp1x',def:'0'},{name:'cp1y',def:'200'},{name:'cp2x',def:'300'},{name:'cp2y',def:'200'},{name:'x2',def:'300'},{name:'y2',def:'0'}], enabled: false, code: p=>`bezier(${p.x1},${p.y1},${p.cp1x},${p.cp1y},${p.cp2x},${p.cp2y},${p.x2},${p.y2});` },
      { type: 'spline',        label: 'spline',         params: [{name:'x1',def:'0'},{name:'y1',def:'0'},{name:'x2',def:'100'},{name:'y2',def:'100'},{name:'x3',def:'200'},{name:'y3',def:'100'},{name:'x4',def:'300'},{name:'y4',def:'0'}], enabled: false, code: p=>`spline(${p.x1},${p.y1},${p.x2},${p.y2},${p.x3},${p.y3},${p.x4},${p.y4});` },
    ]
  },
  kleur: {
    label: 'Kleur', color: '#8B5CF6',
    blocks: [
      { type: 'fill',          label: 'fill',           params: [{name:'r',def:'255'},{name:'g',def:'100'},{name:'b',def:'50'}],  code: p=>`fill(${p.r}, ${p.g}, ${p.b});` },
      { type: 'stroke',        label: 'stroke',         params: [{name:'r',def:'0'},{name:'g',def:'0'},{name:'b',def:'0'}],       code: p=>`stroke(${p.r}, ${p.g}, ${p.b});` },
      { type: 'strokeWeight',  label: 'strokeWeight',   params: [{name:'w',def:'2'}],                                             code: p=>`strokeWeight(${p.w});` },
      { type: 'noFill',        label: 'noFill()',       params: [],                                                               code: ()=>'noFill();' },
      { type: 'noStroke',      label: 'noStroke()',     params: [],                                                               code: ()=>'noStroke();' },
      { type: 'colorMode',     label: 'colorMode',      params: [{name:'mode',def:'HSB'}],                                        code: p=>`colorMode(${p.mode});` },
      { type: 'color',         label: 'color',          params: [{name:'r',def:'255'},{name:'g',def:'100'},{name:'b',def:'50'}], isExpr: true, enabled: false, code: p=>`color(${p.r}, ${p.g}, ${p.b})` },
      { type: 'lerpColor',     label: 'lerpColor',      params: [{name:'c1',def:'c1'},{name:'c2',def:'c2'},{name:'t',def:'0.5'}], isExpr: true, enabled: false, code: p=>`lerpColor(${p.c1}, ${p.c2}, ${p.t})` },
      { type: 'alpha',         label: 'alpha',          params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`alpha(${p.c})` },
      { type: 'red',           label: 'red',            params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`red(${p.c})` },
      { type: 'green',         label: 'green',          params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`green(${p.c})` },
      { type: 'blue',          label: 'blue',           params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`blue(${p.c})` },
      { type: 'hue',           label: 'hue',            params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`hue(${p.c})` },
      { type: 'saturation',    label: 'saturation',     params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`saturation(${p.c})` },
      { type: 'brightness',    label: 'brightness',     params: [{name:'c',def:'myColor'}], isExpr: true, enabled: false,         code: p=>`brightness(${p.c})` },
    ]
  },
  transform: {
    label: 'Transform', color: '#69619B',
    blocks: [
      { type: 'translate',     label: 'translate',      params: [{name:'x',def:'100'},{name:'y',def:'100'}],            code: p=>`translate(${p.x}, ${p.y});` },
      { type: 'rotate',        label: 'rotate',         params: [{name:'a',def:'PI/4'}],                                code: p=>`rotate(${p.a});` },
      { type: 'scale',         label: 'scale',          params: [{name:'s',def:'1.5'}],                                 code: p=>`scale(${p.s});` },
      { type: 'push',          label: 'push()',         params: [],                                                     code: ()=>'push();' },
      { type: 'pop',           label: 'pop()',          params: [],                                                     code: ()=>'pop();' },
      { type: 'shearX',        label: 'shearX',         params: [{name:'a',def:'PI/6'}], enabled: false,                code: p=>`shearX(${p.a});` },
      { type: 'shearY',        label: 'shearY',         params: [{name:'a',def:'PI/6'}], enabled: false,                code: p=>`shearY(${p.a});` },
      { type: 'resetMatrix',   label: 'resetMatrix()',  params: [], enabled: false,                                     code: ()=>'resetMatrix();' },
      { type: 'rotateX',       label: 'rotateX',        params: [{name:'a',def:'PI/4'}], enabled: false,                code: p=>`rotateX(${p.a});` },
      { type: 'rotateY',       label: 'rotateY',        params: [{name:'a',def:'PI/4'}], enabled: false,                code: p=>`rotateY(${p.a});` },
      { type: 'rotateZ',       label: 'rotateZ',        params: [{name:'a',def:'PI/4'}], enabled: false,                code: p=>`rotateZ(${p.a});` },
    ]
  },
  interactie: {
    label: 'Typografie', color: '#EF4424',
    blocks: [
      { type: 'text',          label: 'text',           params: [{name:'txt',def:"'Hallo!'"},{name:'x',def:'50'},{name:'y',def:'50'}], code: p=>`text(${p.txt}, ${p.x}, ${p.y});` },
      { type: 'textSize',      label: 'textSize',       params: [{name:'s',def:'32'}],                                               code: p=>`textSize(${p.s});` },
      { type: 'textFont',      label: 'textFont',       params: [{name:'f',def:"'Arial'"}], enabled: false,                          code: p=>`textFont(${p.f});` },
      { type: 'textAlign',     label: 'textAlign',      params: [{name:'h',def:'CENTER'},{name:'v',def:'CENTER'}], enabled: false,    code: p=>`textAlign(${p.h}, ${p.v});` },
      { type: 'textStyle',     label: 'textStyle',      params: [{name:'s',def:'BOLD'}], enabled: false,                             code: p=>`textStyle(${p.s});` },
      { type: 'textLeading',   label: 'textLeading',    params: [{name:'l',def:'24'}], enabled: false,                               code: p=>`textLeading(${p.l});` },
      { type: 'textWidth',     label: 'textWidth',      params: [{name:'txt',def:"'hallo'"}], isExpr: true, enabled: false,           code: p=>`textWidth(${p.txt})` },
      { type: 'font_arial',    label: "'Arial'",            params: [], isExpr: true, enabled: false, code: ()=>"'Arial'" },
      { type: 'font_times',    label: "'Times New Roman'",  params: [], isExpr: true, enabled: false, code: ()=>"'Times New Roman'" },
      { type: 'font_courier',  label: "'Courier New'",      params: [], isExpr: true, enabled: false, code: ()=>"'Courier New'" },
      { type: 'font_georgia',  label: "'Georgia'",          params: [], isExpr: true, enabled: false, code: ()=>"'Georgia'" },
      { type: 'font_verdana',  label: "'Verdana'",          params: [], isExpr: true, enabled: false, code: ()=>"'Verdana'" },
    ]
  },
  wiskunde: {
    label: 'Wiskunde', color: '#61B199',
    blocks: [
      { type: 'random',        label: 'random',         params: [{name:'min',def:'0'},{name:'max',def:'400'}],                                                             isExpr: true, code: p=>`random(${p.min}, ${p.max})` },
      { type: 'map',           label: 'map',            params: [{name:'v',def:'mouseX'},{name:'a',def:'0'},{name:'b',def:'400'},{name:'c',def:'0'},{name:'d',def:'255'}], isExpr: true, code: p=>`map(${p.v},${p.a},${p.b},${p.c},${p.d})` },
      { type: 'sin',           label: 'sin',            params: [{name:'a',def:'frameCount*0.05'}], isExpr: true, code: p=>`sin(${p.a})` },
      { type: 'cos',           label: 'cos',            params: [{name:'a',def:'frameCount*0.05'}], isExpr: true, code: p=>`cos(${p.a})` },
      { type: 'tan',           label: 'tan',            params: [{name:'a',def:'frameCount*0.05'}], isExpr: true, code: p=>`tan(${p.a})` },
      { type: 'noise',         label: 'noise',          params: [{name:'x',def:'frameCount*0.01'}], isExpr: true, code: p=>`noise(${p.x})` },
      { type: 'op_add',        label: '+', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} + ${p.b})` },
      { type: 'op_sub',        label: '-', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} - ${p.b})` },
      { type: 'op_mul',        label: '*', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} * ${p.b})` },
      { type: 'op_div',        label: '/', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} / ${p.b})` },
      { type: 'op_mod',        label: '%', isExpr: true, isOp: true, params: [{name:'a',def:'0'},{name:'b',def:'0'}], code: p=>`(${p.a} % ${p.b})` },
      { type: 'abs',           label: 'abs',            params: [{name:'n',def:'x'}], isExpr: true, enabled: false,    code: p=>`abs(${p.n})` },
      { type: 'ceil',          label: 'ceil',           params: [{name:'n',def:'x'}], isExpr: true, enabled: false,    code: p=>`ceil(${p.n})` },
      { type: 'floor',         label: 'floor',          params: [{name:'n',def:'x'}], isExpr: true, enabled: false,    code: p=>`floor(${p.n})` },
      { type: 'round',         label: 'round',          params: [{name:'n',def:'x'}], isExpr: true, enabled: false,    code: p=>`round(${p.n})` },
      { type: 'sqrt',          label: 'sqrt',           params: [{name:'n',def:'4'}], isExpr: true, enabled: false,    code: p=>`sqrt(${p.n})` },
      { type: 'pow',           label: 'pow',            params: [{name:'b',def:'2'},{name:'e',def:'3'}], isExpr: true, enabled: false, code: p=>`pow(${p.b}, ${p.e})` },
      { type: 'max',           label: 'max',            params: [{name:'a',def:'0'},{name:'b',def:'0'}], isExpr: true, enabled: false, code: p=>`max(${p.a}, ${p.b})` },
      { type: 'min',           label: 'min',            params: [{name:'a',def:'0'},{name:'b',def:'0'}], isExpr: true, enabled: false, code: p=>`min(${p.a}, ${p.b})` },
      { type: 'constrain',     label: 'constrain',      params: [{name:'v',def:'x'},{name:'lo',def:'0'},{name:'hi',def:'255'}], isExpr: true, enabled: false, code: p=>`constrain(${p.v}, ${p.lo}, ${p.hi})` },
      { type: 'lerp',          label: 'lerp',           params: [{name:'a',def:'0'},{name:'b',def:'100'},{name:'t',def:'0.5'}], isExpr: true, enabled: false, code: p=>`lerp(${p.a}, ${p.b}, ${p.t})` },
      { type: 'dist',          label: 'dist',           params: [{name:'x1',def:'0'},{name:'y1',def:'0'},{name:'x2',def:'100'},{name:'y2',def:'100'}], isExpr: true, enabled: false, code: p=>`dist(${p.x1},${p.y1},${p.x2},${p.y2})` },
      { type: 'norm',          label: 'norm',           params: [{name:'v',def:'x'},{name:'lo',def:'0'},{name:'hi',def:'255'}], isExpr: true, enabled: false, code: p=>`norm(${p.v}, ${p.lo}, ${p.hi})` },
      { type: 'mag',           label: 'mag',            params: [{name:'x',def:'3'},{name:'y',def:'4'}], isExpr: true, enabled: false, code: p=>`mag(${p.x}, ${p.y})` },
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
  driedee: {
    label: '3D', color: '#0EA5E9',
    blocks: [
      { type: 'box',              label: 'box',              params: [{name:'w',def:'100'},{name:'h',def:'100'},{name:'d',def:'100'}], enabled: false, code: p=>`box(${p.w}, ${p.h}, ${p.d});` },
      { type: 'sphere',           label: 'sphere',           params: [{name:'r',def:'50'}], enabled: false,                           code: p=>`sphere(${p.r});` },
      { type: 'cylinder',         label: 'cylinder',         params: [{name:'r',def:'50'},{name:'h',def:'100'}], enabled: false,       code: p=>`cylinder(${p.r}, ${p.h});` },
      { type: 'cone',             label: 'cone',             params: [{name:'r',def:'50'},{name:'h',def:'100'}], enabled: false,       code: p=>`cone(${p.r}, ${p.h});` },
      { type: 'torus',            label: 'torus',            params: [{name:'r',def:'50'},{name:'tubeR',def:'20'}], enabled: false,    code: p=>`torus(${p.r}, ${p.tubeR});` },
      { type: 'plane',            label: 'plane',            params: [{name:'w',def:'100'},{name:'h',def:'100'}], enabled: false,      code: p=>`plane(${p.w}, ${p.h});` },
      { type: 'orbitControl',     label: 'orbitControl()',   params: [], enabled: false,                                              code: ()=>'orbitControl();' },
      { type: 'normalMaterial',   label: 'normalMaterial()', params: [], enabled: false,                                              code: ()=>'normalMaterial();' },
      { type: 'ambientMaterial',  label: 'ambientMaterial',  params: [{name:'r',def:'200'},{name:'g',def:'200'},{name:'b',def:'200'}], enabled: false, code: p=>`ambientMaterial(${p.r}, ${p.g}, ${p.b});` },
      { type: 'specularMaterial', label: 'specularMaterial', params: [{name:'r',def:'255'},{name:'g',def:'255'},{name:'b',def:'255'}], enabled: false, code: p=>`specularMaterial(${p.r}, ${p.g}, ${p.b});` },
      { type: 'ambientLight',     label: 'ambientLight',     params: [{name:'r',def:'100'},{name:'g',def:'100'},{name:'b',def:'100'}], enabled: false, code: p=>`ambientLight(${p.r}, ${p.g}, ${p.b});` },
      { type: 'directionalLight', label: 'directionalLight', params: [{name:'r',def:'255'},{name:'g',def:'255'},{name:'b',def:'255'},{name:'x',def:'0'},{name:'y',def:'-1'},{name:'z',def:'-1'}], enabled: false, code: p=>`directionalLight(${p.r},${p.g},${p.b},${p.x},${p.y},${p.z});` },
      { type: 'pointLight',       label: 'pointLight',       params: [{name:'r',def:'255'},{name:'g',def:'255'},{name:'b',def:'255'},{name:'x',def:'0'},{name:'y',def:'0'},{name:'z',def:'100'}], enabled: false, code: p=>`pointLight(${p.r},${p.g},${p.b},${p.x},${p.y},${p.z});` },
    ]
  },
  variabelen: {
    label: 'Variabelen', color: '#E23D96',
    blocks: [
      { type: 'var_declare',      label: 'let', palLabel: 'let naam = waarde', isVar: true, params: [{name:'naam',def:'x'},{name:'waarde',def:'0'}], code: p=>`let ${p.naam} = ${p.waarde};` },
      { type: 'var_declare_only', label: 'let', palLabel: 'let naam',         isVar: true, params: [{name:'naam',def:'c'}],                         code: p=>`let ${p.naam};` },
      { type: 'var_set',          label: '',    palLabel: 'naam = waarde',    isVar: true,  params: [{name:'naam',def:'x'},{name:'waarde',def:'0'}], code: p=>`${p.naam} = ${p.waarde};` },
      { type: 'mouseX',        label: 'mouseX',      params: [], isExpr: true, code: ()=>'mouseX' },
      { type: 'mouseY',        label: 'mouseY',      params: [], isExpr: true, code: ()=>'mouseY' },
      { type: 'width',         label: 'width',       params: [], isExpr: true, code: ()=>'width' },
      { type: 'height',        label: 'height',      params: [], isExpr: true, code: ()=>'height' },
      { type: 'frameCount',    label: 'frameCount',  params: [], isExpr: true, code: ()=>'frameCount' },
      { type: 'PI',            label: 'PI',          params: [], isExpr: true, code: ()=>'PI' },
      { type: 'TAU',           label: 'TAU',         params: [], isExpr: true, code: ()=>'TAU' },
      { type: 'TWO_PI',        label: 'TWO_PI',      params: [], isExpr: true, code: ()=>'TWO_PI' },
      { type: 'HALF_PI',       label: 'HALF_PI',     params: [], isExpr: true, code: ()=>'HALF_PI' },
      { type: 'pmouseX',       label: 'pmouseX',     params: [], isExpr: true, enabled: false, code: ()=>'pmouseX' },
      { type: 'pmouseY',       label: 'pmouseY',     params: [], isExpr: true, enabled: false, code: ()=>'pmouseY' },
      { type: 'millis',        label: 'millis()',    params: [], isExpr: true, enabled: false, code: ()=>'millis()' },
      { type: 'deltaTime',     label: 'deltaTime',   params: [], isExpr: true, enabled: false, code: ()=>'deltaTime' },
      { type: 'displayWidth',  label: 'displayWidth', params: [], isExpr: true, enabled: false, code: ()=>'displayWidth' },
      { type: 'displayHeight', label: 'displayHeight',params: [], isExpr: true, enabled: false, code: ()=>'displayHeight' },
      { type: 'windowWidth',   label: 'windowWidth',  params: [], isExpr: true, enabled: false, code: ()=>'windowWidth' },
      { type: 'windowHeight',  label: 'windowHeight', params: [], isExpr: true, enabled: false, code: ()=>'windowHeight' },
    ]
  },
  invoer: {
    label: 'Invoer', color: '#F59E0B',
    blocks: [
      { type: 'mouseIsPressed', label: 'mouseIsPressed', params: [], isExpr: true, enabled: false, code: ()=>'mouseIsPressed' },
      { type: 'keyIsPressed',   label: 'keyIsPressed',   params: [], isExpr: true, enabled: false, code: ()=>'keyIsPressed' },
      { type: 'keyCode',        label: 'keyCode',        params: [], isExpr: true, enabled: false, code: ()=>'keyCode' },
      { type: 'key',            label: 'key',            params: [], isExpr: true, enabled: false, code: ()=>'key' },
      { type: 'mouseButton',    label: 'mouseButton',    params: [], isExpr: true, enabled: false, code: ()=>'mouseButton' },
      { type: 'touches',        label: 'touches',        params: [], isExpr: true, enabled: false, code: ()=>'touches' },
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

// ═══════════════════════════════════════════════════════════════
// BLOCK VISIBILITY
// ═══════════════════════════════════════════════════════════════

const LS_VIS_KEY = 'p5blocks_visibility';
let blockVis = {};

function isBlockEnabled(type) {
  if (Object.prototype.hasOwnProperty.call(blockVis, type)) return blockVis[type];
  const def = findDef(type);
  return def ? (def.enabled !== false) : false;
}

function loadBlockVis() {
  try {
    const raw = localStorage.getItem(LS_VIS_KEY);
    blockVis = raw ? JSON.parse(raw) : {};
  } catch(e) { blockVis = {}; }
}

function saveBlockVis() {
  try { localStorage.setItem(LS_VIS_KEY, JSON.stringify(blockVis)); } catch(e) {}
}

// ── Saved profiles ─────────────────────────────────────────────
const LS_SAVED_KEY = 'p5blocks_saved_profiles';

function loadSavedProfiles() {
  try { return JSON.parse(localStorage.getItem(LS_SAVED_KEY)) || []; } catch(e) { return []; }
}

function saveSavedProfiles(list) {
  try { localStorage.setItem(LS_SAVED_KEY, JSON.stringify(list)); } catch(e) {}
}

function saveCurrentAsProfile(name) {
  const list = loadSavedProfiles();
  const idx = list.findIndex(p => p.name === name);
  const entry = { name, vis: { ...blockVis } };
  if (idx >= 0) list[idx] = entry; else list.push(entry);
  saveSavedProfiles(list);
}

function applySavedProfile(name) {
  const list = loadSavedProfiles();
  const entry = list.find(p => p.name === name);
  if (!entry) return;
  blockVis = { ...entry.vis };
  saveBlockVis();
  state.profile = 'beginner'; // no built-in badge
  state.profileDirty = false;
  updateProfileBadge();
  renderPresetSelect();
  renderCategories();
  renderPalette();
  if (document.getElementById('lib-overlay').classList.contains('open')) renderLibrary();
}

function deleteSavedProfile(name) {
  const list = loadSavedProfiles().filter(p => p.name !== name);
  saveSavedProfiles(list);
}

// ── Profiles ───────────────────────────────────────────────────

const PROFILE_3D = new Set([
  'createCanvasMode','background','frameRate',
  'box','sphere','cylinder','cone','torus','plane',
  'orbitControl','normalMaterial','ambientMaterial','specularMaterial',
  'ambientLight','directionalLight','pointLight',
  'fill','stroke','noStroke','strokeWeight','noFill',
  'translate','rotate','rotateX','rotateY','rotateZ','scale','push','pop','resetMatrix',
  'for_loop','if_block',
  'op_add','op_sub','op_mul','op_div','op_mod',
  'op_gt','op_lt','op_gte','op_lte','op_eq','op_neq','op_and','op_or','op_not',
  'var_declare','var_declare_only','var_set','mouseX','mouseY','frameCount','PI','TWO_PI',
  'sin','cos','random','map','noise','abs','constrain','lerp',
]);

const PROFILE_ANIMATIE = new Set([
  'createCanvas','background','frameRate','noLoop','loop','angleMode',
  'ellipse','circle','rect','line','triangle','point','arc','square','quad',
  'fill','stroke','strokeWeight','noFill','noStroke','colorMode',
  'translate','rotate','scale','push','pop','shearX','shearY','resetMatrix',
  'text','textSize','textAlign','textFont','font_arial','font_times','font_courier','font_georgia','font_verdana',
  'random','map','sin','cos','tan','noise',
  'abs','ceil','floor','round','sqrt','pow','max','min','constrain','lerp','dist','norm',
  'op_add','op_sub','op_mul','op_div','op_mod',
  'for_loop','if_block',
  'op_gt','op_lt','op_gte','op_lte','op_eq','op_neq','op_and','op_or','op_not',
  'var_declare','var_declare_only','var_set','mouseX','mouseY','pmouseX','pmouseY',
  'width','height','frameCount','PI','TAU','TWO_PI','HALF_PI','millis','deltaTime',
  'mouseIsPressed','keyIsPressed','keyCode','key',
]);

function getAllBlockTypes() {
  const types = [];
  for (const cat of Object.values(CATEGORIES))
    for (const b of cat.blocks) types.push(b.type);
  return types;
}

function renderPresetSelect() {
  const sel = document.getElementById('preset-select');
  sel.innerHTML = '';
  const ph = document.createElement('option');
  ph.value = '';
  ph.textContent = t('presetPlaceholder');
  sel.appendChild(ph);
  for (const [key, def] of Object.entries(PRESET_DEFS)) {
    if (!def.profiles.has(state.profile)) continue;
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = state.lang === 'en' ? def.en : def.nl;
    sel.appendChild(opt);
  }
}

function applyProfile(name) {
  const all = getAllBlockTypes();
  if (name === 'reset') {
    localStorage.removeItem(LS_VIS_KEY);
    blockVis = {};
    state.profile = 'beginner';
  } else if (name === 'volledig') {
    blockVis = {};
    all.forEach(t => { blockVis[t] = true; });
    saveBlockVis();
    state.profile = 'volledig';
  } else if (name === 'beginner') {
    blockVis = {};
    all.forEach(t => {
      const def = findDef(t);
      blockVis[t] = def ? (def.enabled !== false) : false;
    });
    saveBlockVis();
    state.profile = 'beginner';
  } else if (name === 'animatie') {
    blockVis = {};
    all.forEach(t => { blockVis[t] = PROFILE_ANIMATIE.has(t); });
    saveBlockVis();
    state.profile = 'animatie';
  } else if (name === '3d') {
    blockVis = {};
    all.forEach(t => { blockVis[t] = PROFILE_3D.has(t); });
    saveBlockVis();
    state.profile = '3d';
  }
  state.profileDirty = false;
  updateProfileBadge();
  renderPresetSelect();
  renderCategories();
  renderPalette();
  if (document.getElementById('lib-overlay').classList.contains('open')) renderLibrary();
}

// ── State ──────────────────────────────────────────────────────
let _uid = 0;
const newId = () => `b${++_uid}`;

const PROFILE_DISPLAY = {
  beginner: { nl: 'Beginner',  en: 'Beginner'  },
  animatie: { nl: 'Animatie',  en: 'Animation' },
  '3d':     { nl: '3D',        en: '3D'         },
  volledig: { nl: 'Volledig',  en: 'Full'       },
};

const state = {
  vars: [], setup: [], draw: [], kladblok: [],
  activeCat: 'shapes',
  showCode: false,
  lang: 'nl',
  profile: 'beginner',
  profileDirty: false,
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
  leeg: {
    vars: [],
    setup: [ makeBlock('createCanvas', {w:'900', h:'900'}) ],
    draw:  [ makeBlock('background', {c:'245'}) ],
  },
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
  ballen: {
    vars: [],
    setup: [ makeBlock('createCanvas', {w:'900',h:'900'}), makeBlock('noStroke') ],
    draw: (() => {
      const loop = makeBlock('for_loop', {v:'i', start:'0', end:'8', step:'1'});
      loop.children = [
        makeBlock('fill', {r:'i*30', g:'100', b:'220'}),
        makeBlock('circle', {
          x: 'cos(i * TWO_PI / 8) * 200',
          y: 'sin(i * TWO_PI / 8) * 200',
          d: 'sin(frameCount * 0.05 + i) * 30 + 60',
        }),
      ];
      return [
        makeBlock('background', {c:'20'}),
        makeBlock('translate', {x:'width / 2', y:'height / 2'}),
        loop,
      ];
    })(),
  },
  kubus_3d: (() => {
    const FC  = { code:'frameCount', exprType:'frameCount', color:'#E23D96' };
    const mul = (a, b) => ({ code:`(${a.code} * ${b})`, exprType:'op_mul', color:'#C0CE68', values:{a, b} });
    return {
      vars: [],
      setup: [
        makeBlock('createCanvasMode', {w:'400', h:'400', mode:'WEBGL'}),
        makeBlock('frameRate', {fps:'60'}),
      ],
      draw: [
        makeBlock('background', {c:'30'}),
        makeBlock('ambientLight', {r:'80', g:'80', b:'80'}),
        makeBlock('pointLight', {r:'255', g:'255', b:'255', x:'200', y:'-200', z:'200'}),
        makeBlock('orbitControl'),
        makeBlock('normalMaterial'),
        makeBlock('rotateX', {a: mul(FC, '0.01')}),
        makeBlock('rotateY', {a: mul(FC, '0.02')}),
        makeBlock('box', {w:'100', h:'100', d:'100'}),
      ],
    };
  })(),
};

const PRESET_DEFS = {
  leeg:        { nl: 'Leeg',            en: 'Empty',          profiles: new Set(['beginner','animatie','3d','volledig']) },
  muis_volger: { nl: 'Muis volger',     en: 'Mouse follower', profiles: new Set(['beginner','animatie','volledig']) },
  regenboog:   { nl: 'Regenboog',       en: 'Rainbow',        profiles: new Set(['beginner','animatie','volledig']) },
  ballen:      { nl: 'Cirkels golf',    en: 'Circle wave',    profiles: new Set(['animatie','volledig']) },
  kubus_3d:    { nl: 'Draaiende kubus', en: 'Spinning cube',  profiles: new Set(['3d','volledig']) },
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

function isCatVisible(key) {
  return CATEGORIES[key].blocks.some(b => isBlockEnabled(b.type));
}

function renderCategories() {
  // Auto-advance if active category becomes empty
  if (!isCatVisible(state.activeCat)) {
    state.activeCat = Object.keys(CATEGORIES).find(k => isCatVisible(k)) ?? 'shapes';
  }
  const el = document.getElementById('cat-list');
  el.innerHTML = '';
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (!isCatVisible(key)) continue;
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

  const sorted = cat.blocks.filter(b => isBlockEnabled(b.type))
    .sort((a, b) => (a.isOp ? 1 : 0) - (b.isOp ? 1 : 0));
  let opDividerAdded = false;
  sorted.forEach(block => {
    if (block.isOp && !opDividerAdded) {
      const sep = document.createElement('div');
      sep.className = 'pal-op-divider';
      el.appendChild(sep);
      opDividerAdded = true;
    }

    const div = document.createElement('div');
    const blockColor = block.color ?? cat.color;
    div.className = 'pal-block';
    div.style.borderLeftColor = blockColor;
    div.style.setProperty('--pal-color', blockColor);
    div.draggable = true;

    let inner;
    if (block.isOp) {
      inner = `<span style="font-weight:700">${block.label}</span>`;
      div.classList.add('op');
      if (block.isBool) div.classList.add('bool-op');
    } else if (block.palLabel) {
      const lbl = block.type === 'var_declare' ? t('palVarDeclare') : block.type === 'var_declare_only' ? t('palVarDeclareOnly') : block.type === 'var_set' ? t('palVarSet') : block.palLabel;
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
    div.addEventListener('contextmenu', e => {
      e.preventDefault();
      showPalCtxMenu(e.clientX, e.clientY, block.type);
    });
    el.appendChild(div);
  });
}

// ── Palette context menu ────────────────────────────────────────
function showPalCtxMenu(x, y, blockType) {
  let menu = document.getElementById('pal-ctx-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'pal-ctx-menu';
    document.body.appendChild(menu);
  }
  menu.innerHTML = '';
  const item = document.createElement('button');
  item.textContent = t('palHide');
  item.addEventListener('click', () => {
    blockVis[blockType] = false;
    saveBlockVis();
    hidePalCtxMenu();
    if (!isCatVisible(state.activeCat)) {
      state.activeCat = Object.keys(CATEGORIES).find(k => isCatVisible(k)) ?? 'shapes';
    }
    renderCategories();
    renderPalette();
    if (document.getElementById('lib-overlay').classList.contains('open')) renderLibrary();
  });
  menu.appendChild(item);

  // Position — keep inside viewport
  menu.style.display = 'block';
  const vw = window.innerWidth, vh = window.innerHeight;
  const mw = menu.offsetWidth, mh = menu.offsetHeight;
  menu.style.left = (x + mw > vw ? vw - mw - 6 : x) + 'px';
  menu.style.top  = (y + mh > vh ? vh - mh - 6 : y) + 'px';
}

function hidePalCtxMenu() {
  const menu = document.getElementById('pal-ctx-menu');
  if (menu) menu.style.display = 'none';
}

document.addEventListener('click',     hidePalCtxMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePalCtxMenu(); });
document.addEventListener('contextmenu', e => {
  if (!e.target.closest('#pal-ctx-menu')) hidePalCtxMenu();
});

function renderZones() {
  renderZone('vars');
  renderZone('setup');
  renderZone('draw');
  renderZone('kladblok');
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
    markProfileDirty();
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
  markProfileDirty();
  renderZones();
  scheduleRun();
}

function updateCodePanel() {
  if (!state.showCode) return;
  document.getElementById('code-pre').textContent = generateCode();
}

// ═══════════════════════════════════════════════════════════════
// LIBRARY UI
// ═══════════════════════════════════════════════════════════════

function openLibrary() {
  document.getElementById('lib-backdrop').classList.add('open');
  document.getElementById('lib-overlay').classList.add('open');
  document.getElementById('btn-library').classList.add('active');
  renderLibrary();
}

function closeLibrary() {
  document.getElementById('lib-backdrop').classList.remove('open');
  document.getElementById('lib-overlay').classList.remove('open');
  document.getElementById('btn-library').classList.remove('active');
}

function renderLibrary() {
  const overlay = document.getElementById('lib-overlay');
  overlay.innerHTML = '';

  // Header
  const header = document.createElement('div');
  header.id = 'lib-header';
  const title = document.createElement('span');
  title.id = 'lib-title';
  title.textContent = t('libTitle');
  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn-secondary';
  closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
  closeBtn.style.cssText = 'padding:4px 8px;font-size:14px';
  closeBtn.addEventListener('click', closeLibrary);
  header.appendChild(title);
  header.appendChild(closeBtn);
  overlay.appendChild(header);

  // Profile buttons
  const profileRow = document.createElement('div');
  profileRow.id = 'lib-profiles';
  const profiles = [
    { key: 'beginner', nl: 'Beginner',  en: 'Beginner' },
    { key: 'animatie', nl: 'Animatie',  en: 'Animation' },
    { key: '3d',       nl: '3D',        en: '3D' },
    { key: 'volledig', nl: 'Volledig',  en: 'Full', primary: true },
    { key: 'reset',    nl: 'Reset',     en: 'Reset', right: true },
  ];
  profiles.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'lib-profile-btn' + (p.primary ? ' primary' : '');
    if (p.right) btn.style.marginLeft = 'auto';
    btn.textContent = state.lang === 'en' ? p.en : p.nl;
    btn.addEventListener('click', () => applyProfile(p.key));
    profileRow.appendChild(btn);
  });
  overlay.appendChild(profileRow);

  // Saved profiles
  const savedSection = document.createElement('div');
  savedSection.id = 'lib-saved';

  const savedLabel = document.createElement('span');
  savedLabel.className = 'lib-profiles-label';
  savedLabel.textContent = t('libSaved');
  savedSection.appendChild(savedLabel);

  const savedList = document.createElement('div');
  savedList.id = 'lib-saved-list';
  loadSavedProfiles().forEach(entry => {
    const chip = document.createElement('span');
    chip.className = 'lib-saved-chip';
    const nameBtn = document.createElement('button');
    nameBtn.className = 'lib-saved-name';
    nameBtn.textContent = entry.name;
    nameBtn.addEventListener('click', () => applySavedProfile(entry.name));
    const delBtn = document.createElement('button');
    delBtn.className = 'lib-saved-del';
    delBtn.innerHTML = '&times;';
    delBtn.title = t('blockDelete');
    delBtn.addEventListener('click', () => {
      deleteSavedProfile(entry.name);
      renderLibrary();
    });
    chip.appendChild(nameBtn);
    chip.appendChild(delBtn);
    savedList.appendChild(chip);
  });
  savedSection.appendChild(savedList);

  // Save-as row
  const saveRow = document.createElement('div');
  saveRow.id = 'lib-save-row';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = t('libSavePlaceholder');
  nameInput.className = 'lib-save-input';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'lib-profile-btn';
  saveBtn.textContent = t('libSaveBtn');
  saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (!name) return;
    saveCurrentAsProfile(name);
    nameInput.value = '';
    renderLibrary();
  });
  nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveBtn.click(); });
  saveRow.appendChild(nameInput);
  saveRow.appendChild(saveBtn);
  savedSection.appendChild(saveRow);
  overlay.appendChild(savedSection);

  // Category sections
  const body = document.createElement('div');
  body.id = 'lib-body';

  for (const [key, cat] of Object.entries(CATEGORIES)) {
    const enabledCount = cat.blocks.filter(b => isBlockEnabled(b.type)).length;

    const details = document.createElement('details');
    details.className = 'lib-cat-details';
    details.dataset.catKey = key;
    details.open = false;

    const summary = document.createElement('summary');
    summary.className = 'lib-cat-summary';
    summary.innerHTML = `
      <span class="lib-cat-dot" style="background:${cat.color}"></span>
      <span class="lib-cat-name">${catLabel(key)}</span>
      <span class="lib-cat-count" data-cat="${key}">${enabledCount}/${cat.blocks.length}</span>
    `;
    details.appendChild(summary);

    const blockList = document.createElement('div');
    blockList.className = 'lib-cat-blocks';

    for (const block of cat.blocks) {
      const row = document.createElement('div');
      row.className = 'lib-block-row';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'lib-block-name' + (isBlockEnabled(block.type) ? '' : ' dim');
      const lbl = block.palLabel
        ? (block.type === 'var_declare' ? t('palVarDeclare') : block.type === 'var_declare_only' ? t('palVarDeclareOnly') : block.type === 'var_set' ? t('palVarSet') : block.palLabel)
        : (block.params.length ? `${block.label}(${block.params.map(p=>p.name).join(', ')})` : block.label);
      nameSpan.textContent = lbl;

      const toggleLabel = document.createElement('label');
      toggleLabel.className = 'lib-toggle';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = isBlockEnabled(block.type);
      cb.addEventListener('change', () => {
        blockVis[block.type] = cb.checked;
        nameSpan.className = 'lib-block-name' + (cb.checked ? '' : ' dim');
        saveBlockVis();
        updateLibCounts();
        renderCategories();
        renderPalette();
      });
      const track = document.createElement('span');
      track.className = 'lib-toggle-track';
      toggleLabel.appendChild(cb);
      toggleLabel.appendChild(track);

      row.appendChild(nameSpan);
      row.appendChild(toggleLabel);
      blockList.appendChild(row);
    }

    details.appendChild(blockList);
    body.appendChild(details);
  }

  overlay.appendChild(body);
}

function updateLibCounts() {
  for (const [key, cat] of Object.entries(CATEGORIES)) {
    const badge = document.querySelector(`.lib-cat-count[data-cat="${key}"]`);
    if (badge) badge.textContent = `${cat.blocks.filter(b => isBlockEnabled(b.type)).length}/${cat.blocks.length}`;
  }
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
    localStorage.setItem(LS_KEY, JSON.stringify({ name, vars: state.vars, setup: state.setup, draw: state.draw, kladblok: state.kladblok }));
  } catch(e) {}
}

function loadWorkspace() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.name) document.getElementById('sketch-name').value = data.name;
    state.vars     = (data.vars     || []).map(deepCopyBlock);
    state.setup    = (data.setup    || []).map(deepCopyBlock);
    state.draw     = (data.draw     || []).map(deepCopyBlock);
    state.kladblok = (data.kladblok || []).map(deepCopyBlock);
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
      state.vars     = (data.vars     || []).map(deepCopyBlock);
      state.setup    = (data.setup    || []).map(deepCopyBlock);
      state.draw     = (data.draw     || []).map(deepCopyBlock);
      state.kladblok = (data.kladblok || []).map(deepCopyBlock);
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
  state.profileDirty = false;
  updateProfileBadge();
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
  const btn = document.getElementById('btn-copy-code');
  navigator.clipboard?.writeText(generateCode()).then(() => {
    btn.innerHTML = '<i class="bi bi-check-lg"></i> ' + (state.lang === 'en' ? 'Copied!' : 'Gekopieerd!');
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = `<i class="bi bi-clipboard"></i> ${t('codeCopy')}`;
      btn.classList.remove('copied');
    }, 1500);
  });
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

document.getElementById('btn-library').addEventListener('click', openLibrary);
document.getElementById('lib-backdrop').addEventListener('click', closeLibrary);

function applyLang() {
  renderPresetSelect();
  document.getElementById('zone-vars-label').textContent = t('zoneVars');
  document.getElementById('zone-vars-sub').textContent   = t('zoneVarsSub');
  document.getElementById('zone-klad-label').textContent = t('zoneKlad');
  document.getElementById('zone-klad-sub').textContent   = t('zoneKladSub');
  document.getElementById('code-panel-header').textContent = t('codeTitle');
  document.getElementById('btn-copy-code').innerHTML = `<i class="bi bi-clipboard"></i> ${t('codeCopy')}`;
  document.getElementById('btn-lang').textContent = state.lang === 'nl' ? 'EN' : 'NL';
  document.getElementById('btn-library').title = t('libTitle');
  updateProfileBadge();
  renderCategories();
  renderPalette();
  renderZones();
  if (document.getElementById('lib-overlay').classList.contains('open')) renderLibrary();
}

// ── Profile badge ──────────────────────────────────────────────
function updateProfileBadge() {
  const el = document.getElementById('profile-badge');
  if (!el) return;
  const names = PROFILE_DISPLAY[state.profile];
  if (!names || state.profileDirty) {
    el.textContent = '';
    el.classList.remove('visible');
  } else {
    el.textContent = state.lang === 'en' ? names.en : names.nl;
    el.classList.add('visible');
  }
}

function markProfileDirty() {
  if (!state.profileDirty) {
    state.profileDirty = true;
    updateProfileBadge();
  }
}

// ── Init ───────────────────────────────────────────────────────
loadBlockVis();
renderPresetSelect();
renderCategories();
renderPalette();
if (!loadWorkspace()) loadPreset('muis_volger');
else { renderZones(); scheduleRun(); }
