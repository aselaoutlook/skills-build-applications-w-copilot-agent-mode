# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available: 

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Environment variables and GitHub Codespaces

This frontend uses `import.meta.env.VITE_CODESPACE_NAME` to build backend API URLs in the form:

    https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/

If `VITE_CODESPACE_NAME` is not defined, the app first tries to infer the Codespace name from the current browser hostname and still targets:

    https://${inferredCodespaceName}-8000.app.github.dev/api/[component]/

If hostname inference is not possible (for example outside Codespaces), it safely falls back to `http://localhost:8000/api/[component]/` for local development.

Create a `.env.local` file in the frontend root and define the variable there:

    VITE_CODESPACE_NAME=your-codespace-name

> `VITE_CODESPACE_NAME` should be defined (for example in `.env.local`) for predictable GitHub Codespaces deployments. The hostname-based fallback still prevents `undefined-8000` URLs when unset.

## Quick run commands

Run both tiers from the workspace root:

    npm --prefix octofit-tracker/backend run dev
    npm --prefix octofit-tracker/frontend run dev -- --host 0.0.0.0 --port 5173

Frontend URL:

    http://localhost:5173

Backend health URL:

    http://localhost:8000/api/health

## Troubleshooting Codespaces 404

If browser links show a GitHub 404 page:

1. In the Ports panel, confirm ports `5173` and `8000` are forwarded.
2. Set port visibility to Public for both ports.
3. Open the URL from the Ports panel entry instead of typing manually.
4. Refresh with Ctrl+Shift+R or use a private window.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
