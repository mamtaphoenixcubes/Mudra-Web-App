// theme/index.js
import spacing from './spacing';
import typography from './typography';

export const theme = {
  spacing,
  typography,
};

// Export individual modules
export { spacing, typography };

// Export maxW from spacing
export const maxW = spacing.maxW;

// ── Buttons ───────────────────────────────────────────────────
export const btn = {
  primary:
    "bg-primary text-white " +
    "h-[32px] sm:h-[44px] md:h-[30px] lg:h-[52px] 2xl:h-[56px] " +
    "px-2 sm:px-5 md:px-3 lg:px-7 " +
    "rounded-md " +
    "text-[7px] sm:text-[14px] md:text-[10px] lg:text-[16px] 2xl:text-[18px] font-medium " +
    "hover:bg-primary-hover transition-colors whitespace-nowrap cursor-pointer",
  outline:
    "border border-primary text-primary bg-transparent " +
    "h-[32px] sm:h-[44px] md:h-[30px] lg:h-[52px] 2xl:h-[56px] " +
    "px-2 sm:px-5 md:px-3 lg:px-7 " +
    "rounded-md " +
    "text-[7px] sm:text-[14px] md:text-[10px] lg:text-[16px] 2xl:text-[18px] font-medium " +
    "hover:bg-primary/10 transition-colors whitespace-nowrap cursor-pointer",

  newsletter:
    "bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg " +
    "hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer",

  submit:
    "bg-primary text-white " +
    "px-6 py-2.5 sm:py-3 " +
    "rounded-lg " +
    "text-sm font-semibold " +
    "hover:bg-primary/90 transition-colors cursor-pointer w-auto self-start",
  helpCenter:
    "bg-primary text-white font-medium hover:bg-primary/90 transition-colors cursor-pointer " +
    "px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base " +
    "rounded-[4.78px] flex items-center justify-center",

  // ── Profile Hero Button ─────────────────────────────────────
  profileEdit:
    "shrink-0 border border-gray-300 bg-white text-gray-900 rounded-lg font-medium px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap",

  // ── Verify Email Button ────────────────────────────────────
  verifyEmail:
    "w-full py-3.5 rounded-2xl text-white font-semibold text-base transition-all " +
    "bg-[#7B5EA7] hover:bg-[#6a4f94] active:scale-[0.98]",
  verifyEmailDisabled:
    "w-full py-3.5 rounded-2xl text-white font-semibold text-base transition-all " +
    "bg-[#7B5EA7]/40 cursor-not-allowed",
  changeEmail:
    "w-full py-3.5 rounded-2xl border border-gray-200 text-gray-700 text-sm font-medium " +
    "flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors",
};

// ── Form Elements ─────────────────────────────────────────────
export const form = {
  card: "bg-white border border-gray-200 rounded-2xl shadow-sm",
  heading: "text-primary mb-1 font-bold",
  subheading: "text-gray-500 mb-5 sm:mb-6",
  container: "flex flex-col",
  row: "grid grid-cols-2",
  field: "w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400",
  input: "text-sm text-gray-700 placeholder-gray-400",
  textarea: "resize-none",
  gap: "gap-3 sm:gap-4",
  rowGap: "gap-3",

  // ── Verify Email Form ──────────────────────────────────────
  verifyCodeInput:
    "w-9 h-12 md:w-12 md:h-12 text-center text-lg font-medium text-gray-700 " +
    "border border-gray-200 rounded-xl bg-gray-50 " +
    "focus:outline-none focus:border-[#7B5EA7] focus:ring-2 focus:ring-[#7B5EA7]/20 transition-all",
  verifyContainer: "w-full max-w-sm bg-white rounded-3xl px-7 py-10 flex flex-col items-center gap-5",
};

// ── Cards ──────────────────────────────────────────────────────
export const card = {
  radius:
    "rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-xl xl:rounded-xl 2xl:rounded-3xl",
  iconBox:
    "bg-white rounded sm:rounded md:rounded-md lg:rounded-md xl:rounded-md 2xl:rounded-2xl " +
    "flex items-center justify-center shrink-0",
  hover: "transition-all duration-300 hover:scale-105 hover:shadow-lg",
  benefitsIconBox:
    "w-10 h-10 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20",
  benefitsIconInner:
    "w-5 h-5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10",

  newsletterImage: "rounded-xl overflow-hidden bg-white",
  contactForm: "bg-white border border-gray-200 rounded-2xl shadow-sm",

  // Default card (legacy)
  default: "bg-white rounded-lg shadow-sm",

  // ── Verify Email Card ──────────────────────────────────────
  verifyEmailCard: "w-full max-w-sm bg-white rounded-3xl px-7 py-10 flex flex-col items-center gap-5",
  verifyImageWrapper: "relative w-52 h-52 sm:w-80 sm:h-80 md:w-[180px] md:h-[160px] lg:w-[200px] lg:h-[170px] xl:w-[200px] xl:h-[190px] 2xl:w-[200px] 2xl:h-[190px] rounded-3xl overflow-hidden",
};

// ── FAQ Section ────────────────────────────────────────────────
export const faq = {
  cardClass: "w-full md:flex-1 rounded-xl p-5 sm:p-6 md:p-5 lg:p-6 xl:p-8",
  titleClass: "text-sm sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold text-gray-900 mb-4 sm:mb-5",
  accordionBtnClass: "w-full flex items-center justify-between gap-3 px-4 py-3 sm:py-3.5 text-left cursor-pointer",
  questionClass: "text-[11px] sm:text-xs md:text-xs lg:text-sm xl:text-base text-gray-700 font-medium flex-1",
  answerClass: "px-4 pb-3 sm:pb-4",
  answerTextClass: "text-[11px] sm:text-xs md:text-xs lg:text-sm xl:text-base text-gray-600 leading-relaxed",
};

// ── CTA Section ────────────────────────────────────────────────
export const cta = {
  cardClass:
    "w-full md:w-[320px] lg:w-[400px] xl:w-[490px] 2xl:w-[590px] " +
    "rounded-2xl overflow-hidden flex flex-col md:flex-row shrink-0",
  imageClass:
    "w-full md:w-[45%] aspect-[4/3] md:aspect-auto relative shrink-0",
  textClass:
    "flex-1 p-4 sm:p-5 md:p-4 lg:p-5 xl:p-6 flex flex-col justify-center",
  headingClass:
    "text-base sm:text-lg md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl " +
    "font-bold text-gray-900 leading-tight mb-2",
  bodyClass:
    "text-[11px] sm:text-xs md:text-[10px] lg:text-sm xl:text-base " +
    "text-gray-600 mb-4 leading-relaxed",
  btnClass:
    "bg-gray-900 text-white text-xs sm:text-sm md:text-[10px] lg:text-sm xl:text-base " +
    "font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg " +
    "hover:bg-gray-800 transition-colors cursor-pointer self-start",

  cookieOutline:
    "border border-gray-300 text-gray-700 bg-white " +
    "px-4 sm:px-5 py-2 sm:py-2.5 " +
    "rounded-lg " +
    "text-xs sm:text-sm font-medium " +
    "hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer",
  cookieAccept:
    "bg-primary text-white " +
    "px-4 sm:px-5 py-2 sm:py-2.5 " +
    "rounded-lg " +
    "text-xs sm:text-sm font-medium " +
    "hover:bg-primary-hover transition-colors whitespace-nowrap cursor-pointer",
};

// ── Hero image ─────────────────────────────────────────────────
export const heroImage = {
  width:
    "w-[450px] sm:w-[290px] md:w-[390px] " +
    "lg:w-[450px] xl:w-[780px] 2xl:w-[750px]",
  wrapper:
    "flex justify-center md:justify-end items-center w-full " +
    "md:relative right-[-5px] md:right-[12px] lg:right-[-35px] " +
    "xl:right-[20px] 2xl:right-[-50px] mt-4 md:mt-0",
};

// ── Footer ────────────────────────────────────────────────────
export const footer = {
  bg: "bg-footer-bg",
  socialIcon: "text-footer-social-icon",
};

// ── Verify Email Specific ─────────────────────────────────────
export const verifyEmail = {
  container: "min-h-screen bg-gray-50 flex items-center justify-center p-4",
  card: "w-full max-w-sm bg-white rounded-3xl px-7 py-10 flex flex-col items-center gap-5",
  imageWrapper: "relative w-52 h-52 sm:w-80 sm:h-80 md:w-[180px] md:h-[160px] lg:w-[200px] lg:h-[170px] xl:w-[200px] xl:h-[190px] 2xl:w-[200px] 2xl:h-[190px] rounded-3xl overflow-hidden",
  image: "object-cover object-center",
  title: "text-xl font-bold text-[#7B5EA7] mb-2",
  subtitle: "text-sm text-gray-500 leading-relaxed",
  emailDisplay: "text-sm font-medium text-gray-800 mt-1",
  codeLabel: "text-sm font-medium text-gray-800 mb-3",
  codeInput: "w-9 h-12 md:w-12 md:h-12 text-center text-lg font-medium text-gray-700 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#7B5EA7] focus:ring-2 focus:ring-[#7B5EA7]/20 transition-all",
  codeContainer: "flex gap-2 justify-between",
  resendText: "text-sm text-gray-500",
  resendButton: "font-medium text-[#7B5EA7] cursor-pointer",
  resendButtonDisabled: "font-medium text-[#7B5EA7]/50 cursor-default",
  divider: "flex items-center gap-3 w-full",
  dividerLine: "flex-1 h-px bg-gray-200",
  dividerText: "text-sm text-gray-400",
  changeEmailButton: "w-full py-3.5 rounded-2xl border border-gray-200 text-gray-700 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors",
  svgIcon: "w-4 h-4 text-gray-500",
};

export default theme;