export const typography = {
  // ── Hero ──────────────────────────────────────────────────
  heroHeading:
    "text-[14px] sm:text-[36px] md:text-[30px] lg:text-[52px] xl:text-[60px] 2xl:text-[78px] " +
    "font-medium leading-[120%] 2xl:leading-[110%]",
  aboutHeading:
    "text-[28px] sm:text-[22px] md:text-[20px] lg:text-[34px] xl:text-[40px] 2xl:text-[56px] " +
    "font-medium leading-[120%] 2xl:leading-[110%]",
  MainHeading:
    "text-[10px] sm:text-[12px] md:text-[22px] lg:text-[30px] xl:text-[35px] 2xl:text-[50px] " +
    "font-medium leading-[120%] 2xl:leading-[110%]",
  heroBody:
    "text-[16px] sm:text-[16px] md:text-[15px] lg:text-[20px] xl:text-[22px] 2xl:text-[25px] " +
    "leading-[140%] tracking-[0.01em]",

  // ── Profile Hero Typography ───────────────────────────────
  profileHero: {
    name: "text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 truncate",
    email: "text-xs sm:text-sm text-gray-500 truncate",
    tagline: "text-xs sm:text-sm text-gray-500 flex items-center gap-1.5 mt-0.5",
    editButton: "text-xs sm:text-sm font-medium",
  },


  // ── Download App Modal ──────────────────────────────────────
  downloadModal: {
    heading: "text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-2",
    description: "text-xs md:text-sm text-gray-500 leading-relaxed",
    featureTitle: "text-sm md:text-[15px] font-medium text-gray-900",
    featureDescription: "text-xs md:text-[13px] text-gray-500 leading-snug",
  },

  // ── Blog Filter Page Typography ─────────────────────────────
  blogFilter: {
    breadcrumbHome: "hover:text-gray-700 cursor-pointer transition-colors",
    breadcrumbCurrent: "text-gray-700 font-medium",
    heading: "text-3xl sm:text-4xl font-bold text-primary",
    resultsNote: "text-sm text-gray-500 sm:mb-1",
    sidebarTitle: "text-base font-semibold text-gray-900",
    sidebarClearAll: "text-sm text-gray-500 underline hover:text-gray-700 transition-colors cursor-pointer",
    groupTitle: "text-sm font-semibold text-gray-900",
    optionLabel: "flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer",
    moreButton: "flex items-center gap-1 text-sm text-primary font-medium mt-1 cursor-pointer hover:underline",
    cardTitle: "text-sm sm:text-base font-bold text-gray-900 leading-snug",
    cardDescription: "text-xs sm:text-sm text-gray-600 leading-relaxed",
  },

  // ── Search Page Typography ─────────────────────────────────
  searchPage: {
    resultCount: "text-xs sm:text-sm text-gray-400",
    categoryHeading: "text-base sm:text-lg md:text-xl font-semibold text-gray-900",
    categoryCount: "font-normal text-gray-400",
    resultTitle: "text-sm sm:text-base text-gray-900 font-semibold",
    resultDescription: "text-sm sm:text-base text-gray-500 mb-1 leading-relaxed",
    resultLink: "text-sm sm:text-base text-gray-600 font-medium hover:text-primary transition-colors",
    viewAllLink: "text-sm sm:text-base text-gray-600 font-medium hover:text-primary transition-colors",
    tabButton: "text-xs sm:text-sm font-medium whitespace-nowrap transition-colors",
    iconPlaceholder: "text-gray-500 font-semibold text-xs sm:text-sm",
    activeTab: "border-gray-900 text-gray-900",
    inactiveTab: "border-transparent text-gray-400 hover:text-gray-600",
  },

  // ── No Results State ────────────────────────────────────────
  noResults: {
    title: "text-primary mb-3",
    description: "text-[13px] md:text-[14px] lg:text-[15px] text-gray-500 leading-relaxed mb-6",
    input: "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] md:text-[14px] text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition pr-10",
    inputWrapper: "w-full max-w-sm md:max-w-md relative mb-4",
    suggestedLabel: "text-[12px] md:text-[13px] text-gray-500 mb-3",
    suggestedButton: "px-3.5 py-1.5 rounded-full text-[11px] md:text-[12px] text-primary bg-[#E1DBFF] hover:bg-primary/20 transition-colors cursor-pointer border-0",
    suggestedContainer: "flex flex-wrap items-center justify-center gap-2",
  },

  // ── Gyan Mudra Card ─────────────────────────────────────────
  gyanMudraCard: {
    container: "bg-holistic-bg rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 w-full",
    iconWrapper: "bg-white rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 flex items-center justify-center shrink-0 overflow-hidden",
    iconImage: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain",
    contentWrapper: "flex-1 text-center sm:text-left",
    title: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2",
    description: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed",
  },
  // ── Practice Analysis Section ─────────────────────────────
  practiceAnalysis: {
    heading: "text-[14px] sm:text-[15px] font-semibold",
    viewAllLink: "text-[12px] sm:text-[13px] font-medium underline underline-offset-2 cursor-pointer hover:opacity-80 transition-opacity",
    legendLabel: "text-[13px] sm:text-[14px] font-semibold leading-tight",
    legendDuration: "text-[11.5px] sm:text-[12.5px] mt-0.5",
    legendPercent: "text-[13px] sm:text-[14px] font-semibold shrink-0",
    footerText: "text-center text-[12px] sm:text-[13px] mt-5 sm:mt-6",
  },
// ── Consistency Section ───────────────────────────────────
  consistency: {
    heading: "text-[14px] sm:text-[15px] font-semibold",
    viewCalendarLink: "text-[12px] sm:text-[13px] font-medium underline underline-offset-2 cursor-pointer hover:opacity-80 transition-opacity",
    streakLabel: "text-[13px] sm:text-[14px] font-semibold",
    streakValue: "text-xl sm:text-2xl font-bold leading-none mt-1",
    streakUnit: "text-[10.5px] sm:text-[11px] mt-0.5",
    weekLabel: "text-[13px] sm:text-[14px] font-semibold mb-1",
    dayLetter: "text-[12px] sm:text-[13px] font-semibold",
    legendText: "text-[11.5px] sm:text-[12.5px]",
  },
  howToPractice: {
    heading: "text-2xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-primary text-center",
    container: "max-w-6xl mx-auto",
    grid: "grid grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start",
    stepsContainer: "flex flex-col gap-4 sm:gap-5 order-1",
    stepItem: "flex items-start gap-2 sm:gap-3",
    stepNumber: "w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-semibold text-gray-900 shrink-0 text-xs sm:text-sm",
    stepTitle: "font-semibold text-gray-900 text-xs sm:text-sm md:text-xs lg:text-xl mb-0.5",
    stepDesc: "text-[10px] sm:text-xs md:text-[10px] lg:text-lg text-gray-500 leading-relaxed",
    imageWrapper: "rounded-xl sm:rounded-2xl overflow-hidden order-2 md:h-[250px] lg:h-auto",
    image: "w-full h-auto md:h-full object-cover",
    dividerWrapper: "flex items-center justify-center gap-2 sm:gap-3 mt-2 mb-6 sm:mb-8 md:mb-10",
    lotusDivider: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 relative shrink-0",
  },

  // ── Newsletter Section Typography ────────────────────────────
  newsletter: {
    heading: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-primary",
    subtitle: "text-sm sm:text-base md:text-xl text-gray-900 font-semibold leading-relaxed",
    inputText: "text-sm text-gray-600 placeholder-gray-400",
    buttonText: "text-sm font-medium",
    privacyNote: "text-xs sm:text-sm text-gray-400",
  },

  // ── Why Subscribe Section Typography ─────────────────────────
  whySubscribe: {
    heading: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-primary text-center leading-tight",
    dividerLine: "w-16 sm:w-20 h-px bg-gray-300",
    benefitsGrid: "grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 w-full",
    benefitItem: "flex flex-col items-center text-center gap-3 w-full max-w-[280px] mx-auto",
    benefitItemLastOdd: "col-span-2 md:col-span-1",
    iconCircle: "w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full flex items-center justify-center",
    benefitTitle: "text-sm sm:text-base font-semibold text-gray-900",
    benefitDesc: "text-xs sm:text-xs md:text-sm text-gray-500 leading-relaxed",
    privacyBanner: "w-full bg-holistic-bg rounded-2xl px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 flex-wrap",
    privacyText: "text-sm sm:text-base text-gray-700",
    searchBanner: "w-full bg-holistic-bg rounded-2xl px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-4 flex-wrap",
    searchLeftSection: "flex items-center gap-3",
    searchIconWrapper: "bg-white w-10 h-10 rounded-full flex items-center justify-center shrink-0",
    searchTextWrapper: "flex flex-col",
    searchTitle: "text-sm sm:text-base font-semibold text-gray-900",
    searchSubtitle: "text-xs sm:text-sm text-gray-500",
    searchInputWrapper: "flex items-center bg-white rounded-xl px-4 py-2 gap-2 w-full sm:w-auto sm:min-w-[260px] border border-gray-200",
    searchInput: "flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent",
  },

  // ── Divider Styles ──────────────────────────────────────────
  divider: {
    wrapper: "flex items-center justify-center gap-2 sm:gap-3 mt-2 mb-6 sm:mb-8 md:mb-10",
    line: "w-16 sm:w-20 h-px bg-gray-300",
    icon: "w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 relative shrink-0",
  },

  // typography.js
  errorState: {
    code: "text-7xl sm:text-8xl md:text-9xl font-bold text-primary mb-4",
    title: "text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-4",
    description: "text-sm sm:text-base text-gray-700 leading-relaxed max-w-md mx-auto mb-8",
    actionsContainer: "flex flex-col sm:flex-row gap-3 sm:gap-4",
    primaryButton: "px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors cursor-pointer",
    secondaryButton: "px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors cursor-pointer",
  },
  // typography.js
  whatYouCanDo: {
    title: "text-2xl sm:text-3xl font-semibold text-primary text-center mb-4",
    cardTitle: "text-sm font-semibold text-gray-900",
    cardDescription: "text-xs text-gray-600 leading-relaxed",
  },

  // typography.js
  founderStory: {
    label: "text-xs sm:text-sm  xl:text-xl font-bold text-gray-900 tracking-wide uppercase mb-2 mt-4",
    labelUnderline: "block w-10 h-0.5 bg-primary mb-5",
    heading: "text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-primary mb-2",
    subheading: "text-sm sm:text-base text-gray-900 font-medium mb-2",
    subheadingUnderline: "block w-10 h-0.5 bg-primary mb-2",
    quoteMarkOpen: "block text-3xl sm:text-4xl text-primary font-serif leading-none mb-1",
    quoteText: "text-sm sm:text-base italic font-medium text-gray-900 leading-relaxed",
    quoteMarkClose: "block text-3xl sm:text-4xl text-gray-900 font-serif leading-none text-right -mt-2",
  },

  // ── Maintenance Hero Typography ────────────────────────────
  maintenanceHero: {
    heading: "text-base sm:text-lg md:text-xl lg:text-3xl font-medium text-gray-900 leading-tight",
    body: "text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-600 max-w-md",
  },

  // typography.js (only the journeySection block changes)
  // In your typography.js file - fix the journeySection object
  journeySection: {
    badge: "inline-flex items-center justify-center w-14 h-14 border border-gray-300 rounded-md text-xl font-semibold text-gray-900",
    badgeAlt: "inline-flex items-center justify-center w-14 h-14 border border-gray-300 bg-white rounded-md text-xl font-semibold text-gray-900",
    heading: "text-2xl sm:text-3xl md:text-[21px] lg:text-2xl 2xl:text-5xl font-bold text-primary leading-snug",
    body: "text-sm sm:text-[11px] md:text-[11px] lg:text-sm text-gray-700 leading-relaxed mb-3", // Only ONE body property
  },
  // ── Cookie Consent Banner ───────────────────────────────────
  cookieBanner: {
    title: "text-sm sm:text-base font-semibold text-gray-900",
    body: "text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl",
    learnMore: "text-xs sm:text-sm font-medium text-gray-700 underline hover:text-gray-900 transition-colors cursor-pointer whitespace-nowrap",
  },

  // ── Newsletter Success State ───────────────────────────────
  newsletterSuccess: {
    container: "flex flex-col items-center justify-center text-center px-4 py-16 sm:py-20 md:py-24",
    titleMb: "mb-4 sm:mb-5",
    descriptionMaxW: "max-w-xl mx-auto mb-6 sm:mb-8",
    buttonPad: "px-7 sm:px-8 py-2.5 sm:py-3",
  },

  // ── Navbar ────────────────────────────────────────────────
  navBrand:
    "text-[20px] md:text-[22px] lg:text-[30px] xl:text-[36px] " +
    "font-medium text-primary leading-[140%] tracking-[0.08em]",
  navLink:
    "text-sm md:text-[15px] lg:text-[18px] xl:text-[22px] " +
    "font-medium text-primary leading-[100%]",

  // ── Section headings ──────────────────────────────────────
  sectionLabel:
    "text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl " +
    "font-semibold uppercase tracking-widest",
  sectionHeading:
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl " +
    "font-semibold leading-tight 2xl:leading-[1.2]",
  sectionMbHeading:
    "text-base sm:text-base md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl " +
    "font-semibold leading-tight 2xl:leading-[1.2]",
  sectionSbHeading:
    "text-base sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl " +
    "font-semibold leading-tight 2xl:leading-[1.2]",
  sectionBody:
    "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl " +
    "leading-relaxed 2xl:leading-[1.4]",
  sectionMbBody:
    "text-[10px] sm:text-sm md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl " +
    "leading-relaxed 2xl:leading-[1.4]",
  sectionMb:
    "text-[10px] sm:text-[10px] md:text-[10px] lg:text-sm xl:text-sm 2xl:text-xl " +
    "leading-relaxed 2xl:leading-[1.4]",

  // ── Cards ─────────────────────────────────────────────────
  cardTitle:
    "text-[11px] sm:text-[11px] md:text-[11px] lg:text-xs xl:text-sm 2xl:text-2xl " +
    "font-medium leading-tight",
  cardBody:
    "text-[8px] sm:text-[11px] md:text-[10px] lg:text-[11px] xl:text-xs 2xl:text-xl " +
    "leading-relaxed 2xl:leading-[1.5]",
  yogaNidraCard:
    "text-[6px] sm:text-[6px] md:text-[11px] lg:text-[15px] xl:text-[16px] 2xl:text-[20px] " +
    "leading-snug",

  // ── Checklist / trust badges ───────────────────────────────
  checklistLabel:
    "text-[5px] sm:text-[10px] md:text-[9px] lg:text-[13px] xl:text-[14px] " +
    "font-medium whitespace-nowrap",
  checklistSub:
    "text-[5px] sm:text-[10px] md:text-[9px] lg:text-[15px] xl:text-[19px] " +
    "leading-tight whitespace-nowrap",

  // ── Button text ────────────────────────────────────────────
  btnText:
    "text-[7px] sm:text-[14px] md:text-[10px] lg:text-[16px] 2xl:text-[18px] font-medium",
  btnTextMd:
    "text-[7px] sm:text-[14px] md:text-[10px] lg:text-[10px] 2xl:text-[14px] font-medium",

  // ── Solution section ──────────────────────────────────────
  solutionTitle:
    "text-sm sm:text-[11px] md:text-sm lg:text-base xl:text-lg 2xl:text-2xl " +
    "font-semibold leading-tight break-words",
  solutionBody:
    "text-xs sm:text-[9px] md:text-[11px] lg:text-xs xl:text-sm 2xl:text-lg " +
    "leading-relaxed break-words",

  // ── Features section ──────────────────────────────────────
  featureTitle:
    "text-sm sm:text-xs md:text-[8px] lg:text-xs xl:text-sm 2xl:text-xl " +
    "font-semibold leading-tight",
  featureBody:
    "text-xs sm:text-[10px] md:text-[8px] lg:text-[15px] xl:text-[18px] 2xl:text-2xl " +
    "leading-relaxed",

  // ── Benefits section ──────────────────────────────────────
  benefitTitle:
    "text-sm sm:text-sm md:text-[11px] lg:text-sm xl:text-xl 2xl:text-2xl " +
    "font-semibold leading-tight",
  benefitBody:
    "text-xs sm:text-[11px] md:text-[11px] lg:text-[11px] xl:text-base 2xl:text-base " +
    "leading-relaxed",
  subtitleWidth:
    "max-w-sm sm:max-w-md md:max-w-[300px] lg:max-w-[500px] xl:max-w-[700px] 2xl:max-w-[900px]",

  // ── CTA section ───────────────────────────────────────────
  ctaHeading:
    "text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl " +
    "font-bold leading-tight",
  ctaBody:
    "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl " +
    "leading-relaxed",
  ctaBtnText:
    "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-semibold",
  ctaNote:
    "text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl",

  // ── Steps ─────────────────────────────────────────────────
  stepsTitle:
    "text-[9px] sm:text-[11px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-xl " +
    "font-semibold leading-tight",
  stepsBody:
    "text-[8px] sm:text-[10px] md:text-[9px] lg:text-[11px] xl:text-xs 2xl:text-lg " +
    "leading-snug",

  // ── Benefits of Yoga Nidra cards ──────────────────────────
  benefitsCardTitle:
    "text-[15px] sm:text-[11px] md:text-[8px] lg:text-[11px] xl:text-xs 2xl:text-[16px] " +
    "font-semibold leading-tight",
  benefitsCardBody:
    "text-[12px] sm:text-[10px] md:text-[7px] lg:text-[10px] xl:text-[11px] 2xl:text-[14px] " +
    "leading-relaxed",
  benefitsSectionLabel:
    "text-[9px] sm:text-[10px] md:text-[11px] lg:text-xs xl:text-sm 2xl:text-base " +
    "font-semibold uppercase tracking-widest",
  benefitsSectionHeading:
    "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl " +
    "font-semibold leading-tight",

  // ── Finger Mapping ────────────────────────────────────────
  fingerLabel:
    "text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl " +
    "font-semibold uppercase tracking-widest",
  fingerHeading:
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl " +
    "font-semibold leading-tight",
  fingerSubheading:
    "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl " +
    "leading-relaxed",
  fingerName:
    "text-[13px] sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl " +
    "font-semibold",
  fingerText:
    "text-[11px] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base",
  fingerDesc:
    "text-[11px] sm:text-xs md:text-[11px] lg:text-xs xl:text-sm 2xl:text-base " +
    "leading-snug",
  fullpower:
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px] font-bold",
  textfull:
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[26px]",

  // ── Disclaimer ────────────────────────────────────────────
  disclaimerBody:
    "text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px] 2xl:text-[20px] " +
    "leading-relaxed",

  // ── Session Previews ───────────────────────────────────────
  sessionCardTitle:
    "text-[13px] sm:text-sm md:text-[15px] lg:text-base font-semibold leading-tight",
  sessionCardMeta:
    "text-[10px] sm:text-[11px] md:text-xs text-gray-500",
  sessionCardDesc:
    "text-[11px] sm:text-xs md:text-[13px] text-gray-600 leading-snug",
  sessionCardTag:
    "text-[10px] sm:text-[11px] md:text-xs font-medium",
  sessionFilterText:
    "text-[11px] sm:text-xs md:text-sm font-medium text-gray-700",

  // ── Legacy Newsletter Properties ────────────────────────────
  newsletterHeading:
    "text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl " +
    "font-semibold leading-tight text-gray-900",
  newsletterMobileHeading:
    "text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl " +
    "font-semibold leading-tight text-gray-900",
  newsletterBody:
    "text-xs sm:text-sm md:text-[8px] lg:text-sm xl:text-base 2xl:text-lg " +
    "text-gray-600 leading-relaxed",
  newsletterMobileBody:
    "text-[10px] sm:text-xs md:text-[8px] lg:text-sm xl:text-base 2xl:text-lg " +
    "text-gray-600 leading-relaxed",
  newsletterDisclaimer:
    "text-[10px] sm:text-xs text-gray-500",

  // ── Pricing Section ─────────────────────────────────────────
  pricingPrice: "text-3xl font-bold",
  pricingPeriod: "text-sm",
  pricingFeature: "text-xs",
  pricingCta: "text-sm font-medium",
  Downloadapp: "text-xl sm:text-2xl md:text-[7px] lg:text-[7px] xl:text-[10px] 2xl:text-[13px] ",

  playerTitle: "font-serif text-[17px] lg:text-[55px] font-semibold",
  playerHeading: "font-serif text-[19px] lg:text-[29px] font-semibold",
  playerSubheading: "text-[13px] lg:text-[19px] mt-0.5",
  playerAboutTitle: "font-serif text-[14px] lg:text-[18px] font-semibold",
  playerAboutBody: "text-[13px] lg:text-[15px] leading-relaxed",

  
};

export default typography;