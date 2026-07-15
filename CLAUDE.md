# Timeless Visuals

Events photography & videography studio website. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion. See README.md for architecture and the booking system.

## Design Context

Before any design or UI work, read:

- **PRODUCT.md** — strategy: brand register, audience, positioning, belief ladder, anti-references, design principles. Key facts: the site's job is credibility (leads arrive warm via referrals/social); primary CTA is "View portfolio"; all testimonials/stats are currently **placeholder** and must never ship as real proof.
- **DESIGN.md** — the visual system ("The Heirloom Album"): cream/ink palette with a brass foil accent used on <10% of any screen, Playfair Display + Inter, pill buttons vs. soft-rectangle cards, flat-at-rest elevation, WCAG 2.2 AA. Tokens live in `app/globals.css` (`@theme` block); reusable content in `lib/content.ts`.

Contrast cautions: `--color-muted` (#8b857a) and `--color-brass` (#a9743f) both fail 4.5:1 on cream — don't use them for small body text.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
