import { loadEnvFile } from "node:process";

try {
    loadEnvFile();
} catch (error) {
    // Silently ignore if .env is missing (e.g. in production)
}
