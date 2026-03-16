"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"
import DatePicker from "react-datepicker";
import emailjs from '@emailjs/browser';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = 'service_wpbcu6l';
const EMAILJS_TEMPLATE_ID = 'template_vkbhb5w';      // → email to restaurant
const EMAILJS_CUSTOMER_TEMPLATE = 'template_lu35eac'; // → confirmation to customer
const EMAILJS_PUBLIC_KEY = 'Ln1QPxODiYW2IvUJd';
// ─────────────────────────────────────────────────────────────────────────────

import "react-datepicker/dist/react-datepicker.css";

export function Reservation() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    email: "",
    remarks: "",
  })

  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key as any)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [time, setTime] = useState<Date | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t("errorName");
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("errorEmail");
    if (!formData.phone.trim()) newErrors.phone = t("errorPhone");
    if (!startDate) newErrors.date = t("errorDate");
    if (!time) newErrors.time = t("errorTime");
    if (!formData.guests) newErrors.guests = t("errorGuests");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);

    const templateData = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone || '—',
      date: startDate ? startDate.toLocaleDateString('de-DE') : "",
      time: time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " Uhr" : "",
      guests: formData.guests,
      remarks: formData.remarks || '—',
    };

    try {
      // Send both emails in parallel
      await Promise.all([
        // 1. Notify restaurant
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateData, EMAILJS_PUBLIC_KEY),
        // 2. Confirmation to customer
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CUSTOMER_TEMPLATE, templateData, EMAILJS_PUBLIC_KEY),
      ]);

      setSuccess(true);
      setFormData({ name: "", phone: "", guests: "", email: "", remarks: "" });
      setStartDate(null);
      setTime(null);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      alert(language === 'de' 
        ? "Etwas ist schiefgelaufen. Bitte rufen Sie uns an: +43 677 6317 8906" 
        : "Something went wrong. Please call us: +43 677 6317 8906");
    }

    setLoading(false);
  };

  return (
    <section id="reservation" className="">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="">
            <h2 className="md:text-left text-center aboreto-text dark:text-secondary 2xl:text-[60px] xl:text-[50px] text-[28px] md:mb-[20px]">{t("reservationTitle")}</h2>
            <p className="md:text-left text-center md:text-[28px] text-[24px] font-medium md:w-8/12">{t("reservationSubtitle")}</p>
            <div className="space-y-3 my-[33px]">
              <div className="flex items-center md:justify-start justify-center gap-[14px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:text-[#F5E3BF]">
                  <path d="M11.4833 0.887409C11.4833 0.652429 11.5766 0.427073 11.7428 0.260917C11.909 0.0947605 12.1343 0.0014149 12.3693 0.0014149C14.7183 0.00399456 16.9704 0.938278 18.6314 2.59928C20.2924 4.26028 21.2267 6.51235 21.2292 8.86136C21.2292 9.09634 21.1359 9.32169 20.9697 9.48785C20.8036 9.65401 20.5782 9.74735 20.3432 9.74735C20.1083 9.74735 19.8829 9.65401 19.7168 9.48785C19.5506 9.32169 19.4573 9.09634 19.4573 8.86136C19.4551 6.98216 18.7077 5.18054 17.3789 3.85175C16.0501 2.52296 14.2485 1.77551 12.3693 1.7734C12.1343 1.7734 11.909 1.68006 11.7428 1.5139C11.5766 1.34775 11.4833 1.12239 11.4833 0.887409ZM12.3693 5.31738C13.3092 5.31738 14.2106 5.69076 14.8753 6.35539C15.5399 7.02001 15.9133 7.92144 15.9133 8.86136C15.9133 9.09634 16.0066 9.32169 16.1728 9.48785C16.3389 9.65401 16.5643 9.74735 16.7993 9.74735C17.0342 9.74735 17.2596 9.65401 17.4258 9.48785C17.5919 9.32169 17.6853 9.09634 17.6853 8.86136C17.6839 7.45191 17.1233 6.10059 16.1267 5.10396C15.1301 4.10732 13.7787 3.5468 12.3693 3.54539C12.1343 3.54539 11.909 3.63874 11.7428 3.80489C11.5766 3.97105 11.4833 4.19641 11.4833 4.43139C11.4833 4.66637 11.5766 4.89172 11.7428 5.05788C11.909 5.22403 12.1343 5.31738 12.3693 5.31738ZM20.4256 14.8321C20.9391 15.3469 21.2274 16.0444 21.2274 16.7715C21.2274 17.4986 20.9391 18.1961 20.4256 18.711L19.6194 19.6404C12.3631 26.5874 -5.29477 8.93401 1.54511 1.65468L2.564 0.768686C3.07944 0.269585 3.77066 -0.00651556 4.48812 0.000116783C5.20557 0.00674913 5.89157 0.295581 6.3977 0.804126C6.42516 0.831592 8.06691 2.96418 8.06691 2.96418C8.55405 3.47595 8.82524 4.15578 8.82408 4.86234C8.82293 5.56889 8.54952 6.24783 8.06071 6.75801L7.03473 8.04801C7.60251 9.42761 8.43731 10.6814 9.49115 11.7374C10.545 12.7933 11.7971 13.6307 13.1756 14.2012L14.4735 13.1691C14.9838 12.6806 15.6626 12.4075 16.3689 12.4066C17.0753 12.4056 17.7549 12.6767 18.2665 13.1637C18.2665 13.1637 20.3982 14.8046 20.4256 14.8321ZM19.2065 16.1203C19.2065 16.1203 17.0863 14.4892 17.0589 14.4617C16.8763 14.2807 16.6297 14.1792 16.3727 14.1792C16.1156 14.1792 15.869 14.2807 15.6865 14.4617C15.6625 14.4865 13.8755 15.9103 13.8755 15.9103C13.7551 16.0062 13.6117 16.069 13.4596 16.0926C13.3075 16.1162 13.1519 16.0998 13.0081 16.045C11.2223 15.3801 9.60033 14.3392 8.25194 12.9928C6.90354 11.6464 5.86025 10.0259 5.19274 8.24116C5.13356 8.09538 5.11426 7.93646 5.13684 7.78074C5.15942 7.62503 5.22306 7.47814 5.32121 7.35517C5.32121 7.35517 6.74501 5.56723 6.76893 5.5442C6.94991 5.36167 7.05145 5.11503 7.05145 4.85799C7.05145 4.60095 6.94991 4.35432 6.76893 4.17179C6.74146 4.14521 5.11035 2.02325 5.11035 2.02325C4.92509 1.85714 4.6833 1.76817 4.43455 1.7746C4.1858 1.78102 3.94893 1.88235 3.7725 2.05781L2.7536 2.9438C-2.24518 8.95439 13.0568 23.4076 18.3241 18.4301L19.1312 17.4998C19.3203 17.3246 19.434 17.0827 19.448 16.8253C19.4621 16.5679 19.3755 16.3151 19.2065 16.1203Z" fill="currentColor" />
                </svg>
                <a href={`callto:${t("phoneValue")}`} className="">{t("phoneValue")}</a>
              </div>
              <div className="flex items-center md:justify-start justify-center gap-[14px]">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="dark:text-[#F5E3BF]">
                  <path d="M16.8339 0H4.42997C3.2555 0.00140683 2.12954 0.468586 1.29906 1.29906C0.468586 2.12954 0.00140683 3.2555 0 4.42997L0 15.0619C0.00140683 16.2364 0.468586 17.3623 1.29906 18.1928C2.12954 19.0233 3.2555 19.4905 4.42997 19.4919H16.8339C18.0084 19.4905 19.1343 19.0233 19.9648 18.1928C20.7953 17.3623 21.2625 16.2364 21.2639 15.0619V4.42997C21.2625 3.2555 20.7953 2.12954 19.9648 1.29906C19.1343 0.468586 18.0084 0.00140683 16.8339 0ZM4.42997 1.77199H16.8339C17.3644 1.77303 17.8825 1.93281 18.3214 2.23076C18.7604 2.52871 19.1001 2.9512 19.297 3.44386L12.512 10.2297C12.0127 10.727 11.3367 11.0062 10.6319 11.0062C9.9272 11.0062 9.25117 10.727 8.75185 10.2297L1.96691 3.44386C2.16373 2.9512 2.50348 2.52871 2.94243 2.23076C3.38138 1.93281 3.89945 1.77303 4.42997 1.77199ZM16.8339 17.7199H4.42997C3.72503 17.7199 3.04896 17.4398 2.55049 16.9414C2.05203 16.4429 1.77199 15.7668 1.77199 15.0619V5.75896L7.49905 11.4825C8.33067 12.312 9.45733 12.7778 10.6319 12.7778C11.8065 12.7778 12.9332 12.312 13.7648 11.4825L19.4919 5.75896V15.0619C19.4919 15.7668 19.2118 16.4429 18.7134 16.9414C18.2149 17.4398 17.5388 17.7199 16.8339 17.7199Z" fill="currentColor" />
                </svg>
                <a href={`mailto:${t("ContactEmail")}`} className="">{t("ContactEmail")}</a>
              </div>
            </div>
            <div>
              <h3 className="text-[28px] mb-[6px] md:text-start text-center">{t("followUs")}</h3>
              <div className="flex items-center gap-2 md:justify-start justify-center">
                <a href="#" className="dark:text-[#F5E3BF]">
                  <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.0439 0C35.7688 9.11574e-05 46.0878 10.3191 46.0879 23.0439C46.0879 35.7689 35.7688 46.0878 23.0439 46.0879C10.319 46.0879 0 35.7689 0 23.0439C0.000100433 10.319 10.319 0 23.0439 0ZM23.0439 9.81152C19.4503 9.81152 18.999 9.82725 17.5879 9.8916C16.1795 9.95597 15.2177 10.1799 14.376 10.5068C13.4932 10.8391 12.6929 11.3599 12.0322 12.0332C11.359 12.6938 10.8381 13.4942 10.5059 14.377C10.1789 15.2187 9.95559 16.1804 9.8916 17.5889C9.82691 18.9998 9.81152 19.4507 9.81152 23.0439C9.81152 26.6376 9.82655 27.0886 9.8916 28.5C9.9556 29.9082 10.1798 30.8705 10.5068 31.7119C10.8391 32.5947 11.3593 33.395 12.0322 34.0557C12.6933 34.729 13.4937 35.2497 14.377 35.582C15.2182 35.9089 16.1801 36.1319 17.5879 36.1963C18.9993 36.2606 19.4501 36.2764 23.0439 36.2764C26.6376 36.2764 27.0889 36.2606 28.5 36.1963C29.9078 36.1319 30.8697 35.9089 31.7109 35.582C33.4883 34.8946 34.8936 33.4893 35.5811 31.7119C35.908 30.8702 36.1323 29.9084 36.1963 28.5C36.261 27.0889 36.2764 26.6376 36.2764 23.0439C36.2764 19.4507 36.2606 18.9998 36.1963 17.5889C36.1319 16.1804 35.9084 15.2187 35.5811 14.377C35.2492 13.4942 34.7285 12.6942 34.0557 12.0332C33.3946 11.3598 32.5939 10.8381 31.7109 10.5059C30.8693 10.1793 29.9074 9.95559 28.499 9.8916C27.0882 9.82691 26.6372 9.81152 23.0439 9.81152ZM23.0439 12.1963C26.5771 12.1963 26.996 12.2098 28.3916 12.2734C29.6816 12.3322 30.3824 12.5474 30.8486 12.7285C31.4235 12.9405 31.9433 13.2793 32.3701 13.7188C32.8095 14.1456 33.1474 14.6658 33.3594 15.2402C33.5408 15.7065 33.7567 16.4073 33.8154 17.6973C33.8791 19.0925 33.8926 19.5114 33.8926 23.0449C33.8926 26.5776 33.8791 26.9962 33.8154 28.3916C33.7564 29.6817 33.5405 30.3824 33.3594 30.8486C32.9142 32.0026 32.0026 32.9152 30.8486 33.3604C30.3824 33.5418 29.6807 33.7567 28.3906 33.8154C26.9961 33.8791 26.5774 33.8926 23.0439 33.8926C19.5106 33.8926 19.0924 33.8791 17.6973 33.8154C16.4075 33.7567 15.7065 33.5418 15.2402 33.3604C14.6654 33.1483 14.1456 32.8096 13.7188 32.3701C13.2792 31.9432 12.9409 31.4235 12.7285 30.8486C12.5474 30.3824 12.3322 29.6817 12.2734 28.3916C12.2098 26.9962 12.1963 26.5776 12.1963 23.0449C12.1963 19.5114 12.2098 19.0925 12.2734 17.6973C12.3322 16.4073 12.5474 15.7065 12.7285 15.2402C12.9409 14.6653 13.2792 14.1456 13.7188 13.7188C14.1453 13.2792 14.6653 12.9405 15.2402 12.7285C15.7061 12.5474 16.4072 12.3325 17.6973 12.2734C19.0923 12.2098 19.5109 12.1963 23.0439 12.1963ZM23.0439 16.249C19.2913 16.2492 16.2492 19.2913 16.249 23.0439C16.249 26.7967 19.2912 29.8387 23.0439 29.8389C26.7965 29.8389 29.8389 26.7968 29.8389 23.0439C29.8387 19.2912 26.7964 16.249 23.0439 16.249ZM23.0439 18.6338C25.48 18.6338 27.4551 20.6089 27.4551 23.0449C27.4548 25.4808 25.4799 27.4551 23.0439 27.4551C20.6081 27.455 18.634 25.4807 18.6338 23.0449C18.6338 20.6089 20.608 18.6339 23.0439 18.6338ZM30.1074 14.3926C29.2307 14.3927 28.5197 15.1038 28.5195 15.9805C28.5195 16.8573 29.2306 17.5682 30.1074 17.5684C30.9844 17.5684 31.695 16.8574 31.6953 15.9805C31.6951 15.1037 30.9843 14.3926 30.1074 14.3926Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-primary primary-text-color rounded-lg p-8 space-y-4 form-bg">
            <h2 className="md:text-left text-center aboreto-text text-[#E3C08D] 2xl:text-[60px] xl:text-[50px] text-[28px] mb-[20px] md:pt-[20px]">{t("reservationTitle")}</h2>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-white bg-white/10 py-[12px] px-[20px] rounded-[10px]"
                placeholder={t("nameLabel")}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-white bg-white/10 py-[12px] px-[20px] rounded-[10px]"
                placeholder={t("emailLabel")}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-white bg-white/10 py-[12px] px-[20px] rounded-[10px]"
                  placeholder={t("phoneLabel")}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div className="relative">
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full border border-white border-white/10 py-[12px] px-[20px] rounded-[10px] appearance-none"
                >
                  <option className="bg-primary">1 {t("PersonWord")}</option>
                  <option className="bg-primary">2 {t("PersonWord")}</option>
                  <option className="bg-primary">3 {t("PersonWord")}</option>
                  <option className="bg-primary">4 {t("PersonWord")}</option>
                  <option className="bg-primary">5+ {t("PersonWord")}</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests}</p>}
              </div>

              <div>
                <DatePicker className="w-full border border-white bg-white/10 py-[12px] px-[20px] rounded-[10px]" selected={startDate} onChange={(date) => setStartDate(date)} placeholderText={t("dateLabel")} />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              <div>
                <DatePicker
                  selected={time}
                  onChange={(selectedTime: Date | null) => setTime(selectedTime)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  placeholderText={t("selectTime")}
                  className="w-full border border-white bg-white/10 py-[12px] px-[20px] rounded-[10px]"
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full border border-white bg-white/10 py-[12px] px-[20px] rounded-[10px]"
                  placeholder={t("remarksLabel")}
                />
              </div>
            </div>
            <div className="md:text-left text-center mb-3 mt-3">
              <button
                type="submit"
                disabled={loading || success}
                className={`w-full py-3 px-4 rounded-[10px] flex justify-center items-center gap-2 transition
                 ${loading ? "bg-[#F5E3BF] opacity-50 cursor-not-allowed text-primary" : ""}
                ${success ? "bg-green-500 text-white" : "bg-[#F5E3BF] text-primary hover:opacity-90"}`}
              >
                {loading && <span className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>}
                {success && <span className="text-2xl">✔</span>}
                {!loading && !success && t("bookNow")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
