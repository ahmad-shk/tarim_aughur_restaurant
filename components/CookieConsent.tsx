'use client';

import React, { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import pluginConfig from './CookieConsentConfig';

let initPromise: Promise<void> | null = null;

export function ensureCookieConsentReady(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (initPromise) {
    return initPromise;
  }

  initPromise = new Promise((resolve) => {
    try {
      CookieConsent.run(pluginConfig);
    } finally {
      resolve();
    }
  });

  return initPromise;
}

const CookieConsentComponent = () => {
  useEffect(() => {
    ensureCookieConsentReady();
  }, []);

  return null;
};

export default CookieConsentComponent;