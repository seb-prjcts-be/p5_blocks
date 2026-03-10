# p5* Blocks — Agent Context

## Wat is dit?
Een visuele block-based editor voor p5.js, geïnspireerd op Scratch. Gebruikers slepen blokken naar een workspace en de editor genereert live p5.js code die uitgevoerd wordt in een iframe.

## Eén bestand
De volledige applicatie zit in `index.html`. Er is geen build-stap, geen bundler, geen dependencies buiten CDN-links.

## Architectuur

### Data
- `CATEGORIES` — alle beschikbare blokken, gegroepeerd per categorie met kleur
- `PRESETS` — voorbeeldschetsen die geladen kunnen worden
- `state` — runtime toestand (zones, actieve categorie, taal, drag-info)

### Blok-types
| Flag | Betekenis |
|------|-----------|
| `isCtrl` | Controleblok met geneste children (for, if) |
| `isExpr` | Expressie/waarde-blok, sleepbaar in parameter-slots |
| `isOp` | Operator (a OP b), rendert als pill met twee inputs |
| `isVar` | Variabelenblok (let/=), rendert als pill zonder haakjes |

### Expressie-waarden in blokken
Parameter-waarden kunnen strings zijn of objecten:
```js
// string → tekst-input
{ naam: 'x', waarde: '0' }

// expr-object → gekleurde pill
{ code: 'mouseX', exprType: 'mouseX', color: '#8B5CF6' }

// operator-object met nested values
{ code: '(a * b)', exprType: 'op_mul', color: '#C0CE68', values: { a: exprObj, b: '10' } }

// gebruikersvariabele-referentie (pseudo-type)
{ code: 'r', exprType: '__var__', color: '#8B5CF6' }
```

### Zones
Drie drop-zones in de workspace:
- `vars` — globale variabelen (boven setup/draw gegenereerd)
- `setup` — `function setup() {}`
- `draw` — `function draw() {}`

### Codegeneratie
`generateCode()` verwerkt de drie zones naar p5.js broncode. `resolveVal()` converteert expr-objecten naar hun `.code` string.

### Tweetaligheid
`state.lang` is `'nl'` of `'en'`. `t(key)` en `catLabel(key)` leveren de juiste vertaling. `applyLang()` herrendert alle UI-tekst. Code-naamgeving blijft altijd Engels.

## Stijlregels
- Geen frameworks, geen TypeScript, plain ES6
- Alle stijl in een `<style>` blok bovenaan
- Alle logica in een `<script>` blok onderaan
- Kleuren via CSS custom properties (`--block-color`, `--pal-color`)
- Expr-badges zijn Scratch-stijl reporter pills: `color-mix` achtergrond + volledige gekleurde rand
- p5.js geladen via cdnjs in het preview-iframe (huidig: 2.0.2)
