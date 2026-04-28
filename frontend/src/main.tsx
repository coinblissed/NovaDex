import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WalletProvider } from './context/WalletContext'

// DevFix: Address HTTP 431 (bloated cookies) and 429 (Sentry rate limits)
if (import.meta.env.DEV) {
  // 1. Check and clear bloated cookies
  if (document.cookie.length > 2000) {
    console.warn("[DevFix] Cookies are bloated, clearing them to prevent HTTP 431...");
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }

  // 2. Intercept fetch to disable Sentry and audit headers
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
    
    // Disable Sentry in development mode
    if (url.includes('sentry.io')) {
      console.log("[DevFix] Suppressing Sentry request in development mode:", url);
      return new Response(null, { status: 204 }); // No Content
    }

    try {
      const response = await originalFetch.apply(this, args);
      
      // Handle 429 rate limit
      if (response.status === 429 && url.includes('sentry')) {
        console.warn(`[DevFix] Sentry rate limit (429) detected for ${url}.`);
      }
      
      return response;
    } catch (error: any) {
      if (error.message && error.message.includes('431')) {
        console.error("[DevFix] HTTP 431 detected! Clearing cookies for future requests.");
        document.cookie = "";
      }
      throw error;
    }
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>,
)
