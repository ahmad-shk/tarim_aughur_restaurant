import type { CookieConsentConfig } from 'vanilla-cookieconsent';

let gtmLoaded = false;

// Loads Google Tag Manager only after marketing consent
function loadGoogleTagManager() {
  if (gtmLoaded || typeof window === 'undefined') return;

  const GTM_ID = 'GTM-KJG6QK5C'; // TODO: replace with your real GTM ID
  if (!GTM_ID) return;

  // Create GTM script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  // Basic dataLayer setup
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  gtmLoaded = true;
}

function handleConsentForMarketing(cookie: any) {
  if (!cookie) return;

  // vanilla-cookieconsent v3: categories object with booleans
  const marketingEnabled =
    cookie.categories?.marketing === true ||
    // fallback if structure differs
    Array.isArray(cookie.categories) &&
      cookie.categories.includes('marketing');

  if (marketingEnabled) {
    loadGoogleTagManager();
  }
}

const pluginConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: 'box',
      position: 'bottom right',
      equalWeightButtons: true,
      flipButtons: false,
    },
    preferencesModal: {
      layout: 'box',
      position: 'left',
      equalWeightButtons: true,
      flipButtons: false,
    },
  },

  onFirstConsent: function ({ cookie }) {
    console.log('onFirstAction fired');
    handleConsentForMarketing(cookie);
  },

  onConsent: function ({ cookie }) {
    console.log('onConsent fired ...');
    handleConsentForMarketing(cookie);
  },

  onChange: function ({ changedCategories, cookie }) {
    console.log('onChange fired ...');
    handleConsentForMarketing(cookie);
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
    marketing: {
      autoClear: {
        cookies: [
          {
            // Google Ads / GTM Conversion Linker
            name: /^_gcl_au/,
          },
        ],
      },
    },
  },

  language: {
    default: 'de',

    translations: {
      de: {
        consentModal: {
          title: 'Wir verwenden Cookies',
          description:
            'Wir verwenden Cookies, um unsere Website zu betreiben, die Nutzung zu analysieren und unser Angebot zu verbessern. Nicht notwendige Cookies werden nur gesetzt, wenn Sie zustimmen. Weitere Informationen finden Sie in unserer <a href="/privacy-policy" class="cc__link">Datenschutzerklärung</a>.',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Nur notwendige Cookies',
          showPreferencesBtn: 'Einstellungen',
          // closeIconLabel: 'Schließen',
          footer: `
            <a href="/privacy-policy">Datenschutzerklärung</a>
            <a href="/imprint">Impressum</a>
          `,
        },
        preferencesModal: {
          title: 'Cookie-Einstellungen',
          acceptAllBtn: 'Alle akzeptieren',
          acceptNecessaryBtn: 'Nur notwendige Cookies',
          savePreferencesBtn: 'Auswahl speichern',
          closeIconLabel: 'Schließen',
          sections: [
            {
              title: 'Verwendung von Cookies',
              description:
                'Wir nutzen Cookies, um die Grundfunktionen der Website bereitstellen zu können (z. B. Seitennavigation) und – nur mit Ihrer Einwilligung – zur anonymen Statistik und Verbesserung unseres Angebots. Sie können Ihre Einwilligung jederzeit über die Cookie-Einstellungen auf dieser Website ändern oder widerrufen.',
            },
            {
              title: 'Technisch notwendige Cookies',
              description:
                'Diese Cookies sind erforderlich, damit die Website ordnungsgemäß funktioniert. Ohne sie können grundlegende Funktionen wie Seitennavigation oder die Speicherung Ihrer Datenschutzeinstellungen nicht bereitgestellt werden.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Statistik- & Analyse-Cookies',
              description:
                'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen (z. B. welche Seiten besonders häufig aufgerufen werden). Die erhobenen Daten werden anonym ausgewertet.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Dienst',
                  description: 'Beschreibung',
                  expiration: 'Speicherdauer',
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'Google Analytics',
                    description:
                      'Wird verwendet, um Besucher zu unterscheiden (anonyme Statistik).',
                    expiration: '2 Jahre',
                  },
                  {
                    name: '_gid',
                    domain: 'Google Analytics',
                    description:
                      'Wird verwendet, um Besucher zu unterscheiden (anonyme Statistik).',
                    expiration: '24 Stunden',
                  },
                ],
              },
            },
            {
              title: 'Marketing- & Werbe-Cookies',
              description:
                'Diese Cookies werden verwendet, um die Wirksamkeit von Online-Werbung zu messen und personalisierte Werbung anzuzeigen. Sie werden nur gesetzt, wenn Sie dem Einsatz von Marketing-Cookies zustimmen.',
              linkedCategory: 'marketing',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Dienst',
                  description: 'Beschreibung',
                  expiration: 'Speicherdauer',
                },
                body: [
                  {
                    name: '_gcl_au',
                    domain: 'Google Ads / Google Tag Manager',
                    description:
                      'Wird von Google Ads verwendet, um Conversions (z. B. Bestellungen oder Anfragen) Werbeanzeigen zuzuordnen.',
                    expiration: '90 Tage',
                  },
                ],
              },
            },
            {
              title: 'Weitere Informationen',
              description:
                'Ausführliche Informationen zur Verarbeitung personenbezogener Daten und zu Ihren Rechten finden Sie in unserer <a class="cc__link" href="/privacy-policy">Datenschutzerklärung</a>.',
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: 'We use cookies',
          description:
            'We use cookies to operate our website, analyze usage and improve our offer. Non-essential cookies are only set if you agree. You can find more information in our <a href="/privacy-policy" class="cc__link">Privacy Policy</a>.',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Necessary cookies only',
          showPreferencesBtn: 'Preferences',
          footer: `
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/imprint">Imprint</a>
          `,
        },
        preferencesModal: {
          title: 'Cookie Preferences',
          acceptAllBtn: 'Accept all',
          acceptNecessaryBtn: 'Necessary cookies only',
          savePreferencesBtn: 'Save preferences',
          closeIconLabel: 'Close',
          sections: [
            {
              title: 'Use of cookies',
              description:
                'We use cookies to provide the basic functions of the website (e.g. page navigation) and – only with your consent – for anonymous statistics and to improve our offer. You can change or revoke your consent at any time via the cookie settings on this website.',
            },
            {
              title: 'Technically necessary cookies',
              description:
                'These cookies are required for the website to function properly. Without them, basic functions such as page navigation or the storage of your privacy settings cannot be provided.',
              linkedCategory: 'necessary',
            },
            {
              title: 'Statistics & Analysis Cookies',
              description:
                'These cookies help us understand how visitors use our website (e.g. which pages are accessed particularly frequently). The data collected is evaluated anonymously.',
              linkedCategory: 'analytics',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Service',
                  description: 'Description',
                  expiration: 'Duration',
                },
                body: [
                  {
                    name: '_ga',
                    domain: 'Google Analytics',
                    description:
                      'Used to distinguish visitors (anonymous statistics).',
                    expiration: '2 years',
                  },
                  {
                    name: '_gid',
                    domain: 'Google Analytics',
                    description:
                      'Used to distinguish visitors (anonymous statistics).',
                    expiration: '24 hours',
                  },
                ],
              },
            },
            {
              title: 'Marketing & Advertising Cookies',
              description:
                'These cookies are used to measure the effectiveness of online advertising and to display personalized advertising. They are only set if you agree to the use of marketing cookies.',
              linkedCategory: 'marketing',
              cookieTable: {
                headers: {
                  name: 'Name',
                  domain: 'Service',
                  description: 'Description',
                  expiration: 'Duration',
                },
                body: [
                  {
                    name: '_gcl_au',
                    domain: 'Google Ads / Google Tag Manager',
                    description:
                      'Used by Google Ads to attribute conversions (e.g. orders or inquiries) to advertisements.',
                    expiration: '90 days',
                  },
                ],
              },
            },
            {
              title: 'Further information',
              description:
                'Detailed information on the processing of personal data and your rights can be found in our <a class="cc__link" href="/privacy-policy">Privacy Policy</a>.',
            },
          ],
        },
      },
    },
  },
};

export default pluginConfig;