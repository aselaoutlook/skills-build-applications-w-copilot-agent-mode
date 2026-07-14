"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
exports.default = getBaseUrl;
