<div align="center">

# Dreamscape

**An immersive 3D web experience for exploring a dream villa in a realistic, interactive environment.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

</div>

---

## Overview

Dreamscape is an interactive architectural visualization built for the browser. Visitors explore a modern villa through cinematic camera perspectives that move from the residence to the automobile and the poolside, with real-time lighting, post-processing, and smooth GSAP transitions.

## Features

- **Real-time 3D villa scene** with a detailed environment, lighting, and a car.
- **Camera perspectives:** switch between the Residence, Automobile, and Poolside views, and return to the exterior.
- **Cinematic camera controller** with smooth animated transitions.
- **Post-processing effects** for a realistic, polished look.
- **Responsive overlay UI** with reveal animations.
- **Edge deployment** to Cloudflare Workers through OpenNext.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| 3D | Three.js, React Three Fiber, Drei, postprocessing |
| Animation | GSAP |
| Styling | Tailwind CSS 4 |
| Deployment | Cloudflare Workers (OpenNext, Wrangler) |

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```bash
git clone https://github.com/RithyBondeth/Dreamscape.git
cd Dreamscape
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run build:worker` | Build for Cloudflare Workers |
| `npm run lint` | Run ESLint |

## Project Structure

```text
Dreamscape/
├── app/                          # Layout and entry page
├── components/
│   ├── DreamscapeExperience.tsx  # UI overlay and perspective controls
│   └── 3d/                       # Scene, villa, car, environment, lighting, camera
├── scripts/                      # Deployment staging
└── wrangler.jsonc                # Cloudflare configuration
```

## Author

**Rithy Bondeth** — Full Stack Developer & AI Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-0A0A0A?style=for-the-badge&logo=vercel&logoColor=white)](https://bondeth.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RithyBondeth)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rithy-bondeth-484073282/)
