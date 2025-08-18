# WeCare (business platform?)

> Own it & Make it your Own!

## Description

TODO: write description

## Stack

- TypeScript
- React
- Node
- Postgres

## Monorepo Structure

```txt
root/
├── README.md
├── docs/
├── scripts/
└── apps/
    ├── backend/
    │   ├── .env
    │   └── src/
    │       ├── app.ts
    │       └── server.ts
    └── frontend/
        ├── .env
        └── src/
            ├── App.tsx
            └── main.tsx
```

## Setup

1. Setup the env variables in both apps (check out env.example)
2. Install dependencies:

```sh
# in the root of the repo
npm ci
```

### Development

1. Familiarize yourself with our [Team Workflow](./docs/team_workflow.md)
2. Run your postgres db
3. start the backend then the frontend dev server

   ```sh
   npm run dev:be
   npm run dev:fe
   ```

### Production

- TBD

### Old readme artifacts

- [Keys to a well written README](https://tinyurl.com/yk3wubft).

#### Team Documents

- [Team Project Ideas](./docs/team_project_ideas.md)
- [Team Decision Log](./docs/team_decision_log.md)

## Our Team

- Anass Maddah: [GitHub](https://github.com/snowbytes)
- Isaac Abodunrin [GitHub](https://github.com/bytesandroses)
- Oluwatobi Adewuyi: [GitHub](https://github.com/Oluwatobbyloba)
- Prakash Das #prakshh : [GitHub](https://github.com/prakshh)
- Oluwatosin Awoniyi: [Github](https://github.com/Yowa-Tosin)
- Michael Ugorji: [GitHub](https://Izunnaya)
- theDevGuy578: [Github](https://github.com/LMgit91)
- Chukwuemeka Okezie: [GitHub](https://github.com/emmynando) / [LinkedIn](https://linkedin.com/in/chukwuemeka-okezie-2b1335177)
