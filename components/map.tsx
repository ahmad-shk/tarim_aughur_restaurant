"use client"

import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function Map() {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  const address = "Lorystraße 44, 1110 Wien, Austria"
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  return (
    <section className="md:py-20 py-12">
      <div className="max-w-[1300px] mx-auto px-4">
        {/* <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">{t("locationTitle")}</h2>
          <p className="text-lg text-foreground/70 font-light">{t("locationDesc")}</p>
        </div> */}

        <div className="rounded-lg overflow-hidden border border-border shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2660.165!2d16.4058!3d48.1806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07a9a9a9a9a9%3A0x1234567890!2sLorystra%C3%9Fe%2044%2C%201110%20Wien%2C%20Austria!5e0!3m2!1sen!2sat!4v1730000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            title="TARIM Uyghur Restaurant Vienna Location"
          ></iframe>
        </div>

          {/* <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4 text-foreground/70">
                <p>
                  <span className="font-semibold text-foreground">Phone:</span> <br />
                  {t("phoneValue")}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Address:</span> <br />
                  {t("address")}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Hours:</span> <br />
                  Tuesday - Sunday: 12:00 PM - 11:00 PM <br />
                  Monday: Closed
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  {t("getDirections")} →
                </a>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">About Our Location</h3>
              <p className="text-foreground/70 leading-relaxed">{t("locationDesc")}</p>
            </div>
          </div> */}
      </div>
    </section>
  )
}
