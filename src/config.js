// URL base da API. Por padrão aponta pra produção (comportamento de sempre);
// defina VITE_API_URL (.env.local pro dev local, ou variável de ambiente no
// Vercel) pra apontar pro backend de staging sem precisar mexer no código.
export const API_BASE = import.meta.env.VITE_API_URL || 'https://borajogar-api.onrender.com';
