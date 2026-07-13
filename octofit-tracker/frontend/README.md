# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Environment variables and GitHub Codespaces

This frontend uses `import.meta.env.VITE_CODESPACE_NAME` to build backend API URLs in the form:

    https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[resource]/

If `VITE_CODESPACE_NAME` is not defined, the app will safely fall back to `http://localhost:8000/api/[resource]/` for local development.

Create a `.env.local` file in the frontend root and define the variable there:

    VITE_CODESPACE_NAME=your-codespace-name

> `VITE_CODESPACE_NAME` must be defined for GitHub Codespaces deployments. For local development, the fallback is still safe and prevents `undefined-8000` URLs.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
