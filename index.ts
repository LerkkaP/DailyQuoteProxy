import express from 'express';
import morgan from "morgan";
import { createProxyMiddleware } from 'http-proxy-middleware';
require('dotenv').config()

const app = express();
app.use(express.json());

const api_key = process.env.API_KEY;
const api_base_url = process.env.API_BASE_URL;
const api_service_url = `${api_base_url}[${api_key}]`; 

app.use(morgan("dev")); 

app.use('/dailyquote', createProxyMiddleware({
    target: api_service_url,
    changeOrigin: true,
    pathRewrite: {
        [`^/dailyquote`]: '',
    },
}));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});