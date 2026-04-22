# HuTaw

_a discord bot with no purpose whatsoever, just for freedom, freedom, and while (true) { console.log('freedom'); }_

[![Status](https://img.shields.io/badge/status-WIP-orange.svg)](https://github.com/Adan-xyz/HuTaw)
[![Languages](https://img.shields.io/badge/JavaScript-100%25-yellow.svg)](https://github.com/Adan-xyz/HuTaw)

---

Table of Contents
- About
- Features
- Language Composition
- Status
- Prerequisites
- Installation
- Configuration
- Running the bot
- Development
- Deployment
- Commands (example)
- Contributing
- Roadmap
- Troubleshooting
- Security
- License
- Acknowledgements & Contact

---

About

HuTaw is a small Discord bot project built primarily in TypeScript. Its stated purpose is light-hearted and experimental: "freedom, freedom, and while (true) { console.log('freedom'); }". This repository is an ongoing work-in-progress and aims to be a playground for learning, experimenting with Discord bot APIs, TypeScript tooling, and deployment patterns.

Features
- Core Discord bot setup using discord.js (or similar library)
- TypeScript-first codebase with build and lint pipelines
- Modular command and event handling
- Example commands for development and testing
- Config-driven (via environment variables)

Language Composition
- JavaScript: 100%
- Other: 0.0%

Status
This project is actively under development. Expect breaking changes and frequent updates. Roadmap items are included below; features may be added, changed, or removed as experiments progress.

Prerequisites
- Node.js (recommended LTS, e.g., 18.x or later)
- npm or yarn
- A Discord application and bot token (create one at https://discord.com/developers)

Installation (local development)
1. Clone the repository
   ```bash
   git clone https://github.com/Adan-xyz/HuTaw.git
   cd HuTaw
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

Configuration
Create a .env file in the project root or configure environment variables through your deployment provider. Example .env:

```env
# Discord bot token (required)
DISCORD_TOKEN=your-bot-token-here

# Optional: ID of the development guild for guild-scoped commands
DEV_GUILD_ID=123456789012345678

# Optional: command prefix (if using a prefix-based command system)
COMMAND_PREFIX=!

# Node environment
NODE_ENV=development

# Optional: port for a web dashboard or health check
PORT=3000
```

Make sure to never commit secrets (like DISCORD_TOKEN) to the repository. Add .env to .gitignore if not already present.

Running the bot
- Development (watch + ts-node / nodemon):
  ```bash
  npm run dev
  # or
  yarn dev
  ```
- Build and run production:
  ```bash
  npm run build
  npm start
  ```

Typical npm scripts you may expect (adapt as needed):
```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "build": "tsc -p .",
    "start": "node dist/index.js",
    "lint": "eslint . --ext .ts,.js",
    "test": "jest"
  }
}
```

Development
- Code style: TypeScript, prefer strict mode in tsconfig
- Linting: eslint + recommended TypeScript rules
- Testing: jest or vitest for unit tests
- Recommended editor setup: VSCode with ESLint, Prettier, and TypeScript extensions

Deployment
Several deployment options are common:
- Docker: Build a small Docker image that runs the built JavaScript bundle.
- Process manager: Use PM2 to manage the Node process.
- Cloud functions / containers: Deploy to providers like Fly, Render, Railway, or a VPS.

A minimal Dockerfile example:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./*
RUN npm ci --production
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]
```

Commands (example)
- /ping — replies with "pong" and latency info
- /echo <text> — echoes the provided text back
- /help — lists available commands

(Actual commands depend on the command handlers implemented in the codebase.)

Contributing
Contributions, issues, and feature requests are welcome. Suggested workflow:
- Fork the repository
- Create a feature branch (feature/my-feature)
- Write tests and update documentation
- Open a PR describing the change

Please follow the existing code style and keep changes focused. If you'd like to propose larger architectural changes, open an issue first to discuss.

Roadmap
- Stabilize the command/event architecture
- Add more example commands and tests
- Implement slash commands and context menus
- Add CI (lint, test, build) and automated deployment
- Optional: Web dashboard for bot configuration

Troubleshooting
- Bot not starting: ensure DISCORD_TOKEN is set and valid
- Commands not registering: check OAuth scopes and application permissions, verify intents, and make sure you registered slash commands correctly (guild vs global)
- TypeScript build errors: check tsconfig.json and installed types (e.g., @types/node)

Security
- Never commit tokens, credentials, or private keys. Use environment variables or secrets management.
- Use least-privilege OAuth scopes when adding the bot to servers.
- Rotate the bot token immediately if it is accidentally exposed.

License
This repository currently does not enforce a specific license in this README. If you want a permissive license, consider MIT. Example MIT header:

```
MIT License

Copyright (c) 2026 Adan-xyz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

Replace or add a LICENSE file in the repo to make the license explicit.

Acknowledgements & Contact
- Built with love and curiosity.
- Author: Adan-xyz (https://github.com/Adan-xyz)

If you'd like me to:
- Add or tailor the README to match your current project layout (list of scripts in package.json, the actual command names, used libraries like discord.js/eris, etc.), tell me and I will update it.
- Create a LICENSE file (MIT/Apache-2.0/GPL), add CI configuration, or scaffold GitHub Actions for build/test/deploy — I can do that next.

---

Note: This README is written for a work-in-progress repository and intentionally includes guidance and placeholders. Update sections (like scripts, commands, and Dockerfile) to match your actual code and preferences.
