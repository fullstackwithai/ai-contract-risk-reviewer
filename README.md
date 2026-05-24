# AI Contract Risk Reviewer

An AI-powered contract review product concept with a polished frontend demo and an OpenAI-ready backend endpoint.

![Project screenshot](./assets/screenshot.png)

## Why this project exists

This repo is designed to show AI integration, SaaS product thinking, prompt workflow design, and full-stack readiness.

## Features

- Contract text input
- Local demo risk analyzer
- Contract safety score
- Risk severity cards
- Negotiation email draft
- OpenAI-ready backend endpoint
- Mobile-friendly SaaS UI

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js backend example
- OpenAI API-ready server route

## Run frontend locally

Open `index.html` directly in your browser, or run:

```bash
npx http-server .
```

## Run backend locally

```bash
npm start
```

Optional:

```bash
OPENAI_API_KEY=your_key_here npm start
```

Then send a POST request to:

```bash
/api/analyze-contract
```

## Suggested GitHub description

`AI-powered contract risk review tool with risk scoring, clause issue detection, negotiation draft output, and OpenAI-ready backend.`

## Future improvements

- Connect frontend to backend endpoint
- Add PDF upload
- Add jurisdiction selector
- Add saved reviews
- Add authentication and dashboard history
