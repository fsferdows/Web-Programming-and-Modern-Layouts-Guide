import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register Service Worker for true offline resilience
if ("serviceWorker" in navigator && (import.meta as any).env?.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then((registration) => {
        console.log("[Service Worker] Registered successfully:", registration.scope);
      })
      .catch((error) => {
        console.warn("[Service Worker] Registration failed:", error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
