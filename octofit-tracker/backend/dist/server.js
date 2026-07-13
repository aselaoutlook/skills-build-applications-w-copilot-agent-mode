"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const activities_1 = __importDefault(require("./routes/activities"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker backend API',
        endpoints: ['/api/health', '/api/activities']
    });
});
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});
app.use('/api/activities', activities_1.default);
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
