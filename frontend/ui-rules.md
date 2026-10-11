# JobLens UI Rules

One look and feel for every page. If a rule here conflicts with a page idea, the rule wins.

**Personality:** calm, clear, encouraging. A career coach, not a corporate dashboard.

---

## 1. Stack

React + TypeScript, Tailwind CSS, shadcn/ui components, Lucide icons, Recharts for charts.

## 2. Color Theme

Use only these tokens. Never hard-code hex values in components.

### Brand and status

| Token | Light | Dark | Use |
|---|---|---|---|
| `primary` | `#4F46E5` | `#818CF8` | Main buttons, links, active nav |
| `primary-hover` | `#4338CA` | `#A5B4FC` | Hover and pressed |
| `primary-soft` | `#EEF2FF` | `#1E1B4B` | Selected rows, soft highlights |
| `accent` | `#14B8A6` | `#2DD4BF` | Progress, "learned" states, small highlights |
| `success` | `#16A34A` | `#4ADE80` | Matched skills, verified, offer |
| `warning` | `#D97706` | `#FBBF24` | Unverified, weak skills |
| `danger` | `#DC2626` | `#F87171` | Missing skills, errors, delete |
| `info` | `#0284C7` | `#38BDF8` | Tips, notices |

### Neutrals

| Token | Light | Dark |
|---|---|---|
| `bg` | `#F8FAFC` | `#0B1220` |
| `surface` | `#FFFFFF` | `#111827` |
| `surface-2` | `#F1F5F9` | `#1F2937` |
| `border` | `#E2E8F0` | `#273449` |
| `text` | `#0F172A` | `#F1F5F9` |
| `text-muted` | `#64748B` | `#94A3B8` |

Rules:
- Light mode is the default. Dark mode follows the system setting and has a manual toggle.
- One primary action per screen uses `primary`. Everything else is secondary or ghost.
- Never use color alone to carry meaning. Pair it with an icon or a label.
- Text contrast must meet WCAG AA (4.5:1).

### Meaning colors (used the same everywhere)

| What | Color |
|---|---|
| Match score 80-100 | `success` |
| Match score 60-79 | `accent` |
| Match score 40-59 | `warning` |
| Match score 0-39 | `danger` |
| Skill you have | `success` chip with a check icon |
| Skill missing | `danger` chip with an x icon |
| Skill weak / needs work | `warning` chip with an alert icon |
| Nice-to-have skill | neutral outline chip |
| Job: Verified | `success` badge |
| Job: Unverified | `warning` badge |
| Job: Expired | neutral badge |
| Applied / Interview / Offer / Rejected | `info` / `primary` / `success` / neutral |

## 3. Icons

- **Pack:** Lucide only (`lucide-react`). No mixing with other icon sets, no emoji as icons.
- Size: 16 px inline with text, 20 px in buttons and nav, 24 px for page headers and empty states.
- Stroke width 1.75 everywhere. Icons inherit text color unless they carry meaning.
- Icon-only buttons need a tooltip and an `aria-label`.

| Meaning | Icon |
|---|---|
| Dashboard | `LayoutDashboard` |
| Jobs / roles | `Briefcase` |
| Companies | `Building2` |
| Resume | `FileText` |
| Upload / paste job | `Upload` |
| Match / analysis | `Target` |
| Skill gaps | `ListChecks` |
| Learning plan | `GraduationCap` |
| Market insights | `BarChart3` |
| Chat | `MessageSquare` |
| Applications | `Kanban` |
| Settings / profile | `Settings` / `User` |
| Verified / matched | `CheckCircle2` |
| Missing / error | `XCircle` |
| Warning / unverified | `AlertTriangle` |
| Info / tip | `Info` |
| Report / flag | `Flag` |

## 4. Typography

Two fonts only. Do not add a third.

| Role | Font | Where |
|---|---|---|
| Headings | **Hallo Sans** | Page titles, section titles, big numbers (match score) |
| Body and UI | **Neutra Text** | Paragraphs, card titles, labels, buttons, inputs, tables, chat, captions |
| Sinhala / Tamil | Noto Sans Sinhala / Noto Sans Tamil | Fallback whenever those scripts appear |

Available weights: Hallo Sans Light 300, Regular 400, Black 900. Neutra Text Light 300, Book 400, Demi 600, Bold 700.

| Style | Font and weight | Size / line height |
|---|---|---|
| Page title | Hallo Sans Regular | 28 / 36 |
| Section title | Hallo Sans Regular | 20 / 28 |
| Big number (score) | Hallo Sans Black | 40 / 48 |
| Card title | Neutra Text Demi | 16 / 24 |
| Body | Neutra Text Book | 14 / 22 (16 on mobile inputs) |
| Button and label | Neutra Text Demi | 14 / 20 |
| Caption | Neutra Text Book, muted | 12 / 16 |

Setup:
- Font files live in `/public/fonts` as `.woff2`, loaded with `font-display: swap`. Preload Neutra Text Book and Hallo Sans Regular.
- Tailwind: `fontFamily.heading` = Hallo Sans, then Noto Sans Sinhala, Noto Sans Tamil, `system-ui`, `sans-serif`. `fontFamily.body` = Neutra Text, then the same fallbacks. Set `body` to `font-body` and every `h1`-`h3` to `font-heading`.

```css
@font-face { font-family: "Hallo Sans";   src: url("/fonts/hallo-sans-light.woff2") format("woff2");   font-weight: 300; font-display: swap; }
@font-face { font-family: "Hallo Sans";   src: url("/fonts/hallo-sans-regular.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Hallo Sans";   src: url("/fonts/hallo-sans-black.woff2") format("woff2");   font-weight: 900; font-display: swap; }
@font-face { font-family: "Neutra Text";  src: url("/fonts/neutra-text-light.woff2") format("woff2");  font-weight: 300; font-display: swap; }
@font-face { font-family: "Neutra Text";  src: url("/fonts/neutra-text-book.woff2") format("woff2");   font-weight: 400; font-display: swap; }
@font-face { font-family: "Neutra Text";  src: url("/fonts/neutra-text-demi.woff2") format("woff2");   font-weight: 600; font-display: swap; }
@font-face { font-family: "Neutra Text";  src: url("/fonts/neutra-text-bold.woff2") format("woff2");   font-weight: 700; font-display: swap; }
```

Rules:
- Hallo Sans is for short text only (headings of about eight words or fewer). Never use it for paragraphs, buttons, or table cells.
- Use Black only for large numbers and one hero heading per page.
- One `h1` per page. Sentence case everywhere (not Title Case, not ALL CAPS).
- Numbers (scores, salaries in LKR) use tabular figures where the font supports them.
- If a font file fails to load, the `system-ui` fallback keeps the layout intact.

## 5. Layout and Spacing

- 4 px spacing grid. Use 4, 8, 12, 16, 24, 32, 48 only.
- Max content width 1200 px, centered. Page padding 16 px on mobile, 24 px on tablet, 32 px on desktop.
- **Desktop:** left sidebar (240 px, collapsible) + top bar. **Mobile:** top bar + bottom tab bar with five items: Home, Jobs, Resume, Chat, More.
- Breakpoints: 640 / 768 / 1024 / 1280. Design mobile first (many users are on phones).
- Every page follows the same skeleton: page title + one-line description, primary action at top right, then content in cards.
- Radius: 8 px for inputs and buttons, 12 px for cards, 9999 px for chips and badges.
- Shadows: cards use a thin border and no shadow. Only menus, dialogs and popovers get a soft shadow.

## 6. Components

**Buttons:** primary (filled), secondary (outlined), ghost (text), danger (filled red, only for destructive actions). Height 40 px (44 px on mobile). Icon on the left. Loading state shows a spinner and disables the button.

**Cards:** `surface` background, 1 px `border`, 12 px radius, 16-24 px padding. Whole card is clickable only if it has one clear destination.

**Forms:** label above the field, helper text below, error text in `danger` with an icon. Validate on blur and on submit. Never clear a form on error.

**Chips and badges:** small (24 px height), 12 px text, rounded full.

**Tables and lists:** use cards on mobile, tables on desktop. Sticky header, 48 px rows, row hover uses `surface-2`.

**Dialogs:** only for short tasks and confirmations. Destructive confirmations name the thing being deleted.

**Toasts:** bottom right (top on mobile), auto-dismiss in 5 seconds, errors stay until closed.

**Score gauge:** semicircle or ring with the number in the center and the meaning color from section 2. Always show a text label ("Strong match", "Good match", "Partial match", "Weak match").

**Company card:** name, type badge, age badge (New / Established / Long-standing), size, and a "AI estimate, please verify" tag when confidence is low.

**Chat:** user messages right, aligned in `primary-soft`; assistant messages left on `surface`. Suggested questions appear as chips above the input. Show a typing indicator while waiting.

**Charts:** use the brand and meaning colors only, 4 series maximum, always with labels or a legend, never rainbow palettes.

## 7. States (every screen must have all four)

- **Loading:** skeleton placeholders that match the final layout. No full-page spinners. For slow first loads, show "Waking things up…" with a progress hint.
- **Empty:** icon, one friendly sentence, and one clear action ("Upload your first job").
- **Error:** what happened, what to do, and a retry button. No technical codes shown to the user.
- **Success:** a short toast, plus the updated content on screen.

## 8. Motion

- 150-200 ms ease-out for hover, focus, and expand. 250 ms for dialogs and drawers.
- No decorative animation. Respect `prefers-reduced-motion`.

## 9. Writing Style

- Plain, friendly, second person: "You match 7 of 10 requirements."
- Buttons start with a verb: "Analyze job", "Save resume", "Create plan".
- Be honest about AI: label AI output as "AI suggestion", and AI-guessed company facts as "AI estimate, please verify".
- Money in LKR with the symbol: `LKR 120,000`. Dates like `12 Oct 2026`.
- Errors never blame the user.

## 10. Accessibility

- Every interactive element is reachable and usable with a keyboard, with a visible 2 px `primary` focus ring.
- Touch targets at least 44 × 44 px.
- Images and screenshots have alt text. Form fields have labels.
- Support 200% zoom without horizontal scroll.

## 11. Page Checklist

Before a page is done, confirm:
- [ ] Uses only color tokens and Lucide icons
- [ ] Follows the page skeleton (title, description, primary action, cards)
- [ ] Works at 360 px width and in dark mode
- [ ] Has loading, empty, error, and success states
- [ ] Passes keyboard-only use and AA contrast