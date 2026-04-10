# 🍽️ Foodie

> **One app. All your restaurant points. Your whole food community.**

Foodie was developed as part of the **[Diamond Challenge](https://diamondchallenge.org/competition/)** — a national business competition for high school entrepreneurs. Development was managed using **Task Master AI** to coordinate LLM-assisted workflows, enforce task dependencies, and maintain agile sprint cadence across the build.

---

## What Is Foodie

Foodie is a mobile application that solves a real gap in the food-tech space: there is no single platform that consolidates restaurant loyalty points, surfaces local dining options, and builds community around food culture.

The app lets users aggregate all their restaurant rewards into one dashboard, scan receipts or barcodes to log points instantly, discover local and small-scale food establishments through a personalized feed, earn gamified Foodie Points for trying new cuisines and completing food challenges, participate in community food drives and local/national events, and purchase restaurant-specific loyalty points directly in-app.

Small vendors, caterers, and pop-ups — who normally rely on word of mouth — also get a storefront and discovery presence inside the app.

---

## Demo

### UI Walkthrough

https://github.com/YOUR_USERNAME/foodie/raw/main/assets/foodie-demo.mp4

> **Note:** To embed this video on GitHub, drag `assets/foodie-demo.mp4` into any GitHub Issue comment box to get a permanent CDN link, then paste that link here in place of the raw path above.

### Pitch Video

[![Foodie Pitch – Diamond Challenge](https://img.youtube.com/vi/UnZsEsHHn48/maxresdefault.jpg)](https://www.youtube.com/watch?v=UnZsEsHHn48)

---

## Technical Overview

### Architecture

Foodie follows a **client–server architecture** with a React Native mobile client communicating with a RESTful Node.js API backed by a PostgreSQL database. The backend is stateless and horizontally scalable, with JWT-based authentication and OAuth2 for social login.

```
┌──────────────────────┐        ┌──────────────────────────┐
│   React Native App   │◄──────►│  Node.js / Express API   │
│  (iOS + Android)     │  HTTPS │  (REST + Auth + Events)  │
└──────────────────────┘        └────────────┬─────────────┘
                                             │
                       ┌─────────────────────┼──────────────────────┐
                       ▼                     ▼                      ▼
               PostgreSQL DB          AWS S3 Storage        Google Vision API
               (Users, Points,        (Receipts,            (OCR / Barcode
                Restaurants)           Media)                Scanning)
```

### Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Mobile Frontend | React Native | Cross-platform iOS & Android |
| Backend API | Node.js + Express | REST API, business logic |
| Database | PostgreSQL | Relational data — users, points, restaurants |
| Authentication | JWT + OAuth2 | Secure login, Google & Apple sign-in |
| OCR / Scanning | Google Vision API | Receipt and barcode point logging |
| Maps | Google Maps API / Mapbox | Restaurant discovery map |
| Storage | AWS S3 | Receipt images, food media uploads |
| Hosting | AWS / Railway | API deployment |
| Task Management | Task Master AI | Agile workflow, LLM coordination |
| Version Control | Git + GitHub | Source control and collaboration |

### Key Technical Challenges

**Points Aggregation**
Each restaurant chain has a different loyalty structure. The aggregation layer normalizes these into a unified point schema with restaurant-specific metadata, so users see a consistent interface regardless of the underlying program.

**OCR Receipt Scanning**
Google Vision API processes receipt images to extract restaurant name, date, and total spend. A custom parsing layer maps extracted fields to the correct loyalty program and calculates the applicable points.

**Gamification Engine**
Foodie Points run on a separate challenge-based system independent of restaurant loyalty points. Rules are configurable per restaurant — allowing businesses to weight specific menu items, target underperforming dishes, or create time-limited challenges. Point accumulation is tracked in PostgreSQL and redeemable as gift cards.

**For You Page Algorithm**
The discovery feed uses a scoring model that weighs proximity, user order history, points balance, and local establishment status to surface relevant restaurants — with priority given to small/independent vendors.

---

## Project Milestones

### Phase 1 — Foundation *(Q1–Q2 2025)*
- [x] Market research & competitor analysis
- [x] Core app architecture design
- [x] User authentication & profile system
- [x] Basic points aggregation (manual entry)

### Phase 2 — Core Features *(Q3 2025)*
- [x] Receipt & barcode scanning (OCR integration)
- [x] Interactive map with restaurant discovery
- [x] For You Page feed (v1)
- [ ] Restaurant onboarding portal

### Phase 3 — Gamification & Social *(Q4 2025)*
- [ ] Foodie Points challenge system
- [ ] Social feed — post, view, earn
- [ ] Community events & food drive integration
- [ ] Gift card redemption

### Phase 4 — Monetization & Scale *(Q1–Q2 2026)*
- [ ] In-app points purchasing & payments
- [ ] Restaurant promotional tools
- [ ] National event hosting infrastructure
- [ ] Vendor/caterer storefronts

---

## Agile Development Process

Foodie is built on **2-week sprint cycles** using Task Master AI to manage task generation, dependency tracking, and LLM-assisted implementation — keeping AI contributions structured and on-scope throughout development.

```
Plan → Design → Build → Test → Review → Deploy
```

**Workflow**
- Sprint planning every other Monday — stories pulled from the Task Master backlog
- Async daily standups — blockers surfaced and resolved same day
- Sprint review + retro at the end of each cycle to refine the next iteration

**Task Master AI Integration**
Task Master generates tasks from the PRD, breaks them into subtasks with explicit dependencies, and tracks implementation notes per subtask. This prevents LLM drift, enforces a clear order of operations, and makes the development history auditable.

**Git Strategy**
```
main → develop → feature/[task-id]-short-description
```
- PRs require peer review before merging to `develop`
- `develop` merges to `main` at sprint close
- Commit messages reference task IDs: `feat: add barcode scanner (task 2.3)`

---

## About This Project

Foodie was built for the **[Diamond Challenge](https://diamondchallenge.org/competition/)**, a national entrepreneurship competition. The goal was to identify a real, underserved problem, build a working prototype, and present a compelling business case — covering the problem, customer, solution, differentiation, and economics.

---

*Built for foodies, by foodies.*
