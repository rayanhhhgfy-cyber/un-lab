import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { 
  Compass, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  BookOpen,
  Headphones
} from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "help.faq.q1",
    answer: "help.faq.a1"
  },
  {
    question: "help.faq.q2",
    answer: "help.faq.a2"
  },
  {
    question: "help.faq.q3",
    answer: "help.faq.a3"
  },
  {
    question: "help.faq.q4",
    answer: "help.faq.a4"
  },
  {
    question: "help.faq.q5",
    answer: "help.faq.a5"
  }
];

export default function HelpPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const navigationSteps = [
    { icon: "1", title: "help.nav.step1.title", desc: "help.nav.step1.desc" },
    { icon: "2", title: "help.nav.step2.title", desc: "help.nav.step2.desc" },
    { icon: "3", title: "help.nav.step3.title", desc: "help.nav.step3.desc" },
    { icon: "4", title: "help.nav.step4.title", desc: "help.nav.step4.desc" },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "help.contact.phone.title",
      desc: "help.contact.phone.desc",
      value: "0788809843",
      link: "tel:0788809843",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Phone,
      title: "help.contact.phone2.title",
      desc: "help.contact.phone2.desc",
      value: "0790825302",
      link: "tel:0790825302",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "help.contact.email.title",
      desc: "help.contact.email.desc",
      value: "un.sciences.lab@gmail.com",
      link: "mailto:un.sciences.lab@gmail.com",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: MessageCircle,
      title: "help.contact.chat.title",
      desc: "help.contact.chat.desc",
      value: isArabic ? "افتح الدردشة" : "Open Chat",
      action: "chat",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black ${isArabic ? "rtl font-arabic" : "font-sans"} pt-20`}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[200px]"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[200px]"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-300 font-bold">
                {t("help.header.badge")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
              {t("help.header.title")}
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              {t("help.header.subtitle")}
            </p>
          </motion.div>

          {/* How to Navigate Section */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Compass className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t("help.nav.title")}</h2>
            </div>
            
            <div className="grid gap-4">
              {navigationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: isArabic ? -5 : 5 }}
                  className="relative flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{t(step.title)}</h3>
                    <p className="text-slate-400 text-sm">{t(step.desc)}</p>
                  </div>
                  {index < navigationSteps.length - 1 && (
                    <div className={`absolute left-6 top-14 w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent ${isArabic ? "left-auto right-6" : ""}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Support Section */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t("help.contact.title")}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={index}
                    href={method.action ? undefined : method.link}
                    onClick={method.action === "chat" ? () => {
                      const chatButton = document.querySelector('[data-chat-toggle]') as HTMLButtonElement;
                      if (chatButton) chatButton.click();
                    } : undefined}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group block"
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r ${method.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300`} />
                    <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 backdrop-blur-xl border border-white/10 group-hover:border-white/20 rounded-2xl p-5 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">{t(method.title)}</h3>
                          <p className="text-slate-400 text-xs">{t(method.desc)}</p>
                          <p className="text-cyan-400 text-sm font-medium mt-1">{method.value}</p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t("help.faq.title")}</h2>
            </div>

            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="text-white font-medium pr-4">{t(item.question)}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} 
                    />
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-slate-400 text-sm leading-relaxed">{t(item.answer)}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}