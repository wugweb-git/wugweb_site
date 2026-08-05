# Service Colors

Final user-confirmed 6-service color mapping (2026-08-05). Source of truth: `src/styles/global.css` `:root` (`--svc-*`).

## Service Color System

| Service | Base | Dark (panel bg) | Light (accent) | Color name |
|---|---|---|---|---|
| Strategy | `--svc-strategy` `#FA4108` | `--svc-strategy-dark` `#A22A05` | `--svc-strategy-light` `#FF8F66` | Signal Orange |
| Brand | `--svc-brand` `#E6309F` | `--svc-brand-dark` `#951F67` | `--svc-brand-light` `#F17CC3` | Vibrant Magenta |
| Experience | `--svc-experience` `#09E2C0` | `--svc-experience-dark` `#05927C` | `--svc-experience-light` `#6EF0DC` | Digital Teal |
| Engineering | `--svc-engineering` `#2167E9` | `--svc-engineering-dark` `#143F8F` | `--svc-engineering-light` `#7FA8F3` | Royal Blue |
| Growth | `--svc-growth` `#3ED219` | `--svc-growth-dark` `#21870F` | `--svc-growth-light` `#9BE97F` | Growth Green |
| Operations | `--svc-operations` `#7A4DFF` | `--svc-operations-dark` `#4F32A5` | `--svc-operations-light` `#B49CFF` | Intelligence Purple |

## System Color Roles

| Hex | Service | Role |
|---|---|---|
| `#09E2C0` | Experience | Digital systems, interaction, UX, technology |
| `#2167E9` | Engineering | Structure, engineering, trust, platforms |
| `#3ED219` | Growth | Growth, success, optimization, momentum |
| `#E6309F` | Brand | Brand, creativity, human connection, storytelling |
| `#7A4DFF` | Operations | Intelligence, automation, operations, AI |
| `#FA4108` | Strategy | Strategy, leadership, action, transformation |

## Full Service Color Reference

| Service | HEX | Color Name | Hero Object | Geometry | Visual Feel | Meaning |
|---|---|---|---|---|---|---|
| **Strategy** | `#FA4108` | Signal Orange | Blueprint, Strategy Canvas, Chess Piece, Compass | Large rounded rectangle with cropped circle | Bold, decisive, directional, editorial | Vision, planning, clarity, transformation, decision-making |
| **Brand** | `#E6309F` | Vibrant Magenta | Brand Card, Packaging, Identity Sheet, Typography Block | Oversized circle with layered cards | Expressive, memorable, creative, premium | Identity, storytelling, emotion, recognition, differentiation |
| **Experience** | `#09E2C0` | Digital Teal | Mobile Device, Interface Screen, Journey Map | Soft circle + rounded UI panels | Human-centered, fluid, intuitive, approachable | User experience, interaction, accessibility, usability |
| **Engineering** | `#2167E9` | Royal Blue | Code Editor, API Block, Browser Window, Architecture Diagram | Structured grids & stacked rounded blocks | Precise, technical, scalable, trustworthy | Engineering excellence, platforms, systems, reliability |
| **Growth** | `#3ED219` | Growth Green | Analytics Chart, Growth Graph, Target, Search Panel | Expanding arcs & upward geometry | Energetic, measurable, optimistic, performance-driven | Growth, optimization, experimentation, acquisition |
| **Operations** | `#7A4DFF` | Intelligence Purple | Gear, Dashboard Panel, Shield, Workflow Board | Layered rounded rectangles with modular blocks | Stable, intelligent, controlled, operational | Automation, optimization, governance, continuous improvement |

## Panel Order (contrast rule)

Service panels must alternate warm/cool so similar colors are never adjacent:

**01 Strategy (orange) → 02 Engineering (blue) → 03 Brand (magenta) → 04 Growth (green) → 05 Operations (purple) → 06 Experience (teal)**

This order applies to the `/services` sticky panels and the homepage pillars/glass showcase.
