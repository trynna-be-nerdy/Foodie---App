# 🍽️ Foodie

> **One app. All your restaurant points. Your whole food community.**

Foodie is a mobile application that centralizes restaurant loyalty points, gamifies food exploration, and connects users with local dining establishments and food communities.

---

## The Problem

Foodies juggle multiple loyalty apps, miss out on local gems, and have no dedicated space to engage with their food community. Foodie solves all three.

---

## Core Features

**Points Hub**
Aggregate all your restaurant loyalty points into a single dashboard. Scan receipts or barcodes at the counter to instantly log points — no more logging into 10 different apps.

**Explore & Discover**
An interactive map shows nearby restaurants, their points value, and your current balance with each — so you always know where your points go furthest.

**Gamified Rewards**
Earn Foodie Points for trying new restaurants, ordering different dishes, and completing food challenges. Restaurants can spotlight new or underperforming menu items through challenge-based incentives. Points redeem as gift cards, and Foodie earns a cut on orders placed through the platform.

**For You Page**
Algorithm-driven discovery feed highlighting local and small-scale food establishments — caterers, pop-ups, part-time vendors — who typically rely on word of mouth.

**Social & Community**
Post food content and earn through views or brand promotions. Follow local food events, competitions (local and national), and participate in community food drives and pantry donations — which also earn you points.

**Payments**
Buy restaurant-specific loyalty points directly in-app and manage all reward redemptions from one place.

---

## Why Foodie

| Gap in Market | Foodie's Answer |
|---|---|
| Points scattered across many apps | Unified loyalty dashboard |
| Social media is too broad | Niche feed for food lovers |
| Local restaurants lack digital reach | Built-in local discovery & promotion |
| No gamification for food exploration | Challenge-based points system |
| Small vendors invisible online | Dedicated storefront & discovery tools |

---

## Revenue Model

- **Transaction cut** on orders placed through the app
- **Promoted content** from restaurants and food brands
- **Points purchases** — users buy loyalty points for specific restaurants in-app
- **Event hosting fees** for food competitions and community events

---

## Project Milestones

### Phase 1 — Foundation *(Q1–Q2 2025)*
- [ ] Market research & competitor analysis
- [ ] Core app architecture design (React Native + Node.js + PostgreSQL)
- [ ] User authentication & profile system
- [ ] Basic points aggregation (manual entry)

### Phase 2 — Core Features *(Q3 2025)*
- [ ] Receipt & barcode scanning (OCR integration)
- [ ] Interactive map with restaurant discovery
- [ ] For You Page feed algorithm (v1)
- [ ] Restaurant onboarding portal

### Phase 3 — Gamification & Social *(Q4 2025)*
- [ ] Foodie Points challenge system
- [ ] Social feed — post, view, earn
- [ ] Community events & food drive integration
- [ ] Gift card redemption system

### Phase 4 — Monetization & Scale *(Q1–Q2 2026)*
- [ ] In-app points purchasing & payments
- [ ] Restaurant promotional tools
- [ ] National event hosting infrastructure
- [ ] Vendor/caterer storefronts

### Phase 5 — Growth *(Q3 2026+)*
- [ ] Partnerships with major restaurant chains
- [ ] Expanded non-profit / food pantry integrations
- [ ] Analytics dashboard for restaurant partners
- [ ] Regional expansion

---

## Agile Development Process

Foodie is built using **2-week sprint cycles** with the following workflow:

```
Plan → Design → Build → Test → Review → Deploy
```

**Sprint Structure**
- Sprint planning every other Monday — stories sized in points, pulled from the backlog
- Daily standups (async via Slack) — what's done, what's next, any blockers
- Mid-sprint check-in on Wednesday of week 2
- Sprint review + retrospective at the end of each cycle

**Task Management**
Tasks are tracked using [Task Master AI](https://github.com/eyaltoledano/claude-task-master), organized into epics aligned with the phase milestones above. Each task has a clear definition of done, test strategy, and dependency chain before work begins.

**Git Workflow**
```
main → develop → feature/[task-id]-short-description
```
- PRs require one peer review before merging to `develop`
- `develop` is merged to `main` at the end of each sprint
- Commit messages reference task IDs: `feat: add barcode scanner (task 2.3)`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile (Frontend) | React Native (iOS + Android) |
| Backend API | Node.js + Express |
| Database | PostgreSQL |
| Auth | JWT + OAuth2 (Google, Apple) |
| Maps | Google Maps API / Mapbox |
| OCR / Scanning | Google Vision API or similar |
| Storage | AWS S3 (images, receipts) |
| Hosting | AWS / Railway |
| Task Management | Task Master AI |
| Version Control | Git + GitHub |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/foodie.git
cd foodie

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the development server
npm run dev
```

See `/docs/setup.md` for full environment configuration.

---

## Contributing

1. Check the task board for open issues tagged `good first issue`
2. Create a feature branch from `develop`
3. Submit a PR with a clear description and linked task ID
4. Await review — we aim to review within 48 hours

---

## License

MIT License — see `LICENSE` for details.

---

*Built with ❤️ for the food community.*
