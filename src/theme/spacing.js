export const spacing = {
  // ── Section padding ───────────────────────────────────────
  sectionPaddingX: "px-2 sm:px-6 md:px-12 lg:px-[50px] xl:px-[190px] 2xl:px-[190px]",
  sectionPaddingWX: "px-2 sm:px-6 md:px-12 lg:px-[50px] xl:px-[190px] 2xl:px-[290px]",
  sectionPaddingY: "py-10 sm:py-12 md:py-14 lg:py-17",

  // ── Profile Hero Card ──────────────────────────────────────
  profileHero: {
    section: "flex justify-center",
    card: "w-full max-w-5xl bg-holistic-bg rounded-2xl flex items-center gap-4 sm:gap-5 px-4 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5",
    avatar: "w-14 h-14 sm:w-16 sm:h-16 md:w-19 md:h-18 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden",
    avatarIcon: "w-8 h-8 sm:w-15 sm:h-20 relative",
    userInfo: "flex flex-col flex-1 min-w-0 gap-0.5",
    tagline: "flex items-center gap-1.5 mt-0.5",
    taglineIcon: "w-6.5 h-6.5 relative shrink-0",
    editButton: "shrink-0 border border-gray-300 bg-white text-gray-900 rounded-lg font-medium px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap",
  },

  // ── Consistency Section ───────────────────────────────────
  consistency: {
    headerRow: "flex items-center justify-between mb-4 sm:mb-5",
    card: "rounded-[20px] border px-5 py-6 sm:px-8 sm:py-7 flex flex-col sm:flex-row items-center gap-6 sm:gap-8",
    streakCol: "flex flex-col items-center gap-3 shrink-0",
    streakCircle: "w-24 h-24 sm:w-28 sm:h-28 rounded-full border flex flex-col items-center justify-center gap-0.5",
    divider: "hidden sm:block w-px self-stretch bg-gray-200",
    weekCol: "flex-1 w-full flex flex-col items-center gap-4",
    weekGrid: "flex items-center justify-center gap-4 sm:gap-6",
    dayCol: "flex flex-col items-center gap-2",
    dayCircle: "w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center",
    legendRow: "flex items-center justify-center gap-5 mt-1",
    legendItem: "flex items-center gap-1.5",
    legendCircle: "w-4 h-4 rounded-full border flex items-center justify-center",
  },

  // ── Download App Modal ──────────────────────────────────────
  downloadModal: {
    overlay: "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4",
    modalContainer: "w-full max-w-sm md:max-w-2xl lg:max-w-3xl bg-white rounded-2xl shadow-xl relative overflow-hidden",

    // Close button
    closeButton: "absolute top-3 right-3 md:top-4 md:right-4 z-10 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors",

    // Image section
    imageContainer: "order-1 md:order-2 w-full md:w-[260px] lg:w-[380px] h-56 md:h-auto shrink-0 p-4 md:p-5 lg:p-9 flex items-center justify-center",
    imageWrapper: "w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100",
    image: "w-full h-full object-cover",
    imagePlaceholder: "w-full h-full bg-gradient-to-br from-indigo-200 to-blue-300 flex items-center justify-center",

    // Content section
    contentContainer: "order-2 md:order-1 flex-1 p-5 md:p-7 lg:p-8 flex flex-col gap-4",

    // Features
    featuresList: "flex flex-col gap-3 md:gap-4",
    featureItem: "flex items-start gap-3",
    featureIcon: "w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden",

    // Divider
    dividerContainer: "flex items-center gap-2 w-full pt-2",
    dividerLine: "flex-1 h-px bg-gray-200",
    dividerText: "text-[11px] md:text-xs text-gray-400 whitespace-nowrap",

    // Badges
    badgesContainer: "flex flex-wrap gap-2 justify-center",
    appStoreBadge: "flex items-center gap-2 bg-black text-white rounded-lg px-3 py-1.5 hover:bg-gray-900 transition-colors shrink-0",
    googlePlayBadge: "flex items-center gap-2 bg-black text-white rounded-lg px-3 py-1.5 hover:bg-gray-900 transition-colors shrink-0",
  },

  // ── Blog Filter Page Spacing ───────────────────────────────
  blogFilter: {
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
    breadcrumb: "flex items-center gap-2 text-sm text-gray-500 mb-4",
    headingRow: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5",
    activeFiltersRow: "flex flex-col sm:flex-row sm:flex-nowrap sm:items-center gap-2 mb-6",
    activeFiltersChips: "flex flex-nowrap items-center gap-1.5 min-w-0 overflow-x-auto",
    activeFiltersLabel: "text-xs sm:text-sm font-semibold text-gray-900 mr-0.5 shrink-0 whitespace-nowrap",
    chip: "flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] sm:text-xs font-medium pl-2.5 pr-1.5 py-1 rounded-full whitespace-nowrap shrink-0",
    chipIcon: "w-3 h-3 text-gray-400 cursor-pointer shrink-0",
    clearAllInline: "text-xs sm:text-sm text-gray-500 underline hover:text-gray-700 transition-colors ml-1 cursor-pointer shrink-0 whitespace-nowrap",
    spacer: "hidden sm:flex sm:flex-1 sm:shrink-0",
    resultsSortGroup: "flex items-center justify-between sm:justify-start gap-2 shrink-0",
    resultsCountDesktop: "text-xs sm:text-sm text-gray-400 whitespace-nowrap",
    sortButtonDesktop: "flex items-center gap-1 sm:gap-2 border border-gray-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap",
    mobileFilterToggleRow: "relative flex md:hidden mb-4",
    mobileFilterToggleBtn: "flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer",
    mobileFilterToggleBadge: "flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[11px] font-semibold",
    filterDropdownPanel: "absolute top-full left-0 mt-2 w-[calc(100vw-9rem)] max-w-sm max-h-[80vh] overflow-y-auto bg-white rounded-2xl border border-gray-100 shadow-lg p-4 z-20",
    body: "flex flex-col md:flex-row gap-3 md:gap-8",
    sidebarDesktop: "hidden md:flex md:w-64 md:shrink-0 flex-col border border-gray-200 rounded-2xl p-5 bg-white",
    sidebarHeaderRow: "flex items-center justify-between mb-5",
    groupList: "flex flex-col divide-y divide-gray-100",
    group: "py-4 first:pt-0",
    groupHeaderRow: "flex items-center justify-between mb-3 cursor-pointer",
    groupChevron: "w-4 h-4 text-gray-400",
    optionList: "flex flex-col gap-2.5",
    optionLabel: "flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer",
    checkbox: "w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer",
    moreButton: "flex items-center gap-1 text-sm text-primary font-medium mt-1 cursor-pointer hover:underline",
    grid: "flex-1 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5",
    card: "rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow duration-200",
    cardImageWrap: "w-full aspect-[4/3] overflow-hidden",
    cardImage: "w-full h-full object-cover",
    cardBody: "flex flex-col p-4 sm:p-5 gap-2",
    cardMetaRow: "flex items-center gap-3 text-xs text-gray-500 mt-1",
    cardMetaItem: "flex items-center gap-1",
  },

  // ── Newsletter Section Spacing ──────────────────────────────
  newsletter: {
    containerWidth: "max-w-[583px]",
    inputHeight: "h-[58px]",
    iconPaddingLeft: "pl-3 sm:pl-4",
    inputPaddingX: "px-2 sm:px-3",
    buttonPaddingX: "px-4 sm:px-5",
    gap: "gap-3 sm:gap-4",
    maxWidth: "max-w-2xl",
    marginTop: "mt-2 sm:mt-3",
  },

  cookieBanner: {
    wrapper: "fixed inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 z-50",
    container: "max-w-6xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 px-5 py-4 sm:px-6 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
    iconTextRow: "flex items-start gap-3 sm:gap-4",
    iconBox: "w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center shrink-0",
    iconImage: "w-5 h-5 sm:w-6 sm:h-6 object-contain",
    textWrapper: "flex flex-col gap-0.5",
    actionsRow: "flex flex-wrap items-center gap-3 sm:gap-4 md:shrink-0 md:justify-end",
  },
  // ── No Results State ────────────────────────────────────────
  noResults: {
    container: "flex flex-col items-center justify-center text-center px-4",
    inputPadding: "px-4 py-2.5",
    inputWrapper: "w-full max-w-sm md:max-w-md relative mb-4",
    suggestedGap: "gap-2",
    suggestedButtonPadding: "px-3.5 py-1.5",
    titleMargin: "mb-3",
    descriptionMargin: "mb-6",
    suggestedLabelMargin: "mb-3",
  },

  // ── Search Page Specific Spacing ───────────────────────────
  searchPage: {
    mainPadding: "py-6 sm:py-10",
    categorySection: "mb-10 sm:mb-14",
    categoryHeading: "mb-2 sm:mb-3",
    resultRow: "py-2.5 sm:py-3",
    resultRowGap: "gap-0.5 sm:gap-4",
    viewAllLink: "mt-2 sm:mt-3",
    sectionDivider: "mt-10 sm:mt-14",
    topBar: "mb-6 sm:mb-8 pb-2",
  },

  // ── Gaps ──────────────────────────────────────────────────
  heroGap: "gap-2 md:gap-10",
  cardGap: "gap-4 sm:gap-5 md:gap-3 lg:gap-5 xl:gap-10 2xl:gap-5",
  cardMbGap: "gap-4 sm:gap-5 md:gap-6 lg:gap-10 xl:gap-10 2xl:gap-12",
  cardMinH: "min-h-[90px] sm:min-h-[90px] md:min-h-[110px] lg:min-h-[140px] xl:min-h-[160px] 2xl:min-h-[300px]",
  cardGapSm: "gap-3 sm:gap-4 md:gap-5",
  checklistGap: "gap-1 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10",
  checklistItemGap: "gap-0.5 sm:gap-2 md:gap-1 lg:gap-3",
  buttonGroupGap: "gap-2 sm:gap-3 md:gap-2",

  // ── Search Page Gaps ───────────────────────────────────────
  searchGaps: {
    categoryIcon: "gap-4 sm:gap-6",
    resultRowInner: "gap-0.5 sm:gap-4",
    topBar: "gap-4",
    tabBar: "gap-0",
    viewAllLink: "gap-1",
  },

  // ── Icon Sizes ─────────────────────────────────────────────
  searchIcons: {
    categoryIconContainer: "w-10 h-10 sm:w-12 sm:h-12",
    categoryIconImage: "w-5 h-5 sm:w-6 sm:h-6",
    arrowIcon: "w-3.5 h-3.5 sm:w-4 sm:h-4",
  },

  // ── Width Constraints ──────────────────────────────────────
  searchWidths: {
    titleColumn: "sm:w-28 md:w-32",
    categoryIconColumn: "shrink-0",
    resultContent: "flex-1 min-w-0",
  },

  // ── Borders ────────────────────────────────────────────────
  searchBorders: {
    tabBorder: "border-b-2 -mb-[9px]",
    resultDivider: "border-t border-gray-100",
    sectionDivider: "border-t border-gray-100 mt-10 sm:mt-14",
    topBorder: "border-b border-gray-100",
  },

  // ── Max Widths ─────────────────────────────────────────────
  maxW: {
    sectionBody: "max-w-7xl mx-auto",
    content: "max-w-4xl mx-auto",
  },

  // ── Existing spacing values ─────────────────────────────────
  heroLeftColW: "w-full md:w-[45%] lg:w-[48%] xl:w-[50%]",
  heroRightColW: "w-full md:w-[110%] lg:w-[95%] xl:w-[150%] 2xl:w-[100%]",
  heroRightColWM: "w-full md:w-[120%] lg:w-[84%] xl:w-[110%] 2xl:w-[100%]",

  sectionPadding:
    "px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 " +
    "py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 2xl:py-24",

  container:
    "w-full max-w-7xl sm:max-w-[90%] md:max-w-[1000px] " +
    "lg:max-w-[1000px] xl:max-w-[1200px] 2xl:max-w-[2100px] mx-auto",

  contentColumn:
    "w-full max-w-[506px] xl:max-w-[650px] 2xl:max-w-[800px] " +
    "mx-auto md:mx-0 px-2 sm:px-0 lg:pl-0 xl:pl-12 2xl:pl-16",

  headingBlockMb: "mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-20",
  labelMt: "mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-8",
  bodyMt: "mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-8 2xl:mt-10",
  checklistMt: "mt-5 md:mt-4 lg:mt-10",
  buttonGroupMt: "mt-2 md:mt-5 2xl:mt-10",

  btnHeight: "h-[32px] sm:h-[44px] md:h-[30px] lg:h-[52px] 2xl:h-[56px]",
  btnPaddingX: "px-2 sm:px-5 md:px-3 lg:px-7",
  btnMdPaddingX: "px-2 sm:px-5 md:px-3 lg:px-4",

  cardPadding: "p-2 sm:p-2 md:p-3 lg:p-3 xl:p-4 2xl:p-10",
  cardTitleMb: "mb-0 sm:mb-0 md:mb-0.5 lg:mb-0.5 xl:mb-1 2xl:mb-4",

  cardIconBox:
    "w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 " +
    "lg:w-9 lg:h-9 xl:w-10 xl:h-10 2xl:w-24 2xl:h-24",
  cardIconBoxMb: "mb-1 sm:mb-1 md:mb-1.5 lg:mb-1.5 xl:mb-2 2xl:mb-8",
  cardIconInner:
    "w-4 h-5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 " +
    "lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-10 2xl:h-10",

  checkIconBox: "w-2 h-2 sm:w-5 sm:h-5 md:w-3 md:h-3 lg:w-7 lg:h-7",
  checkIconBoxMb: "w-2 h-2 sm:w-5 sm:h-5 md:w-2 md:h-2 lg:w-3 lg:h-3",
  checkIconText: "text-[4px] sm:text-[10px] md:text-[8px] lg:text-[13px]",

  maxWHeroBody:
    "max-w-[160px] sm:max-w-[490px] md:max-w-[250px] " +
    "lg:max-w-[490px] xl:max-w-[540px] 2xl:max-w-[600px]",
  maxWSectionBody:
    "max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto",

  heroImgWidth:
    "w-[220px] sm:w-[290px] md:w-[390px] " +
    "lg:w-[600px] xl:w-[850px] 2xl:w-[1050px]",
  heroImgWrapper:
    "flex justify-center md:justify-end items-center w-full " +
    "md:relative right-[-50px] md:right-[-30px] lg:right-[-120px] " +
    "xl:right-[-100px] 2xl:right-[-80px] mt-4 md:mt-0",

  solutionGap: "gap-0 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 2xl:gap-8",
  solutionItemGap: "gap-4 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-4 2xl:gap-6",
  mubraclaims: "sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-4 md:gap-3 lg:gap-5 xl:gap-6 2xl:gap-5",
  solutionIconOuter:
    "w-11 h-11 sm:w-10 sm:h-10 md:w-14 md:h-14 " +
    "lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24",
  solutionIconInner:
    "w-6 h-6 sm:w-5 sm:h-5 md:w-7 md:h-7 " +
    "lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12",
  solutionTitleMb: "mb-1 sm:mb-0.5 md:mb-1 lg:mb-1.5 xl:mb-2 2xl:mb-4",
  solutionDividerRight:
    "-right-1 sm:-right-1.5 md:-right-2 lg:-right-3 xl:-right-4 2xl:-right-6",
  solutionDividerH: "h-12 sm:h-14 md:h-25 lg:h-25 xl:h-25 2xl:h-32",
  solutionDescMaxW:
    "max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px] 2xl:max-w-[420px]",

  featureHeadingMb: "mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20 2xl:mb-24",
  featureCellPad:
    "px-4 py-6 sm:p-2 sm:py-6 md:p-3 md:py-6 " +
    "lg:p-4 lg:py-6 xl:p-5 xl:py-6 2xl:p-6 2xl:py-8",
  featureCellGap: "gap-2 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-4 2xl:gap-6",
  featureImgBox:
    "w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 " +
    "lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-32 2xl:h-32",
  featureDividerH: "h-32 sm:h-36 md:h-45 lg:h-58 xl:h-66 2xl:h-78",

  benefitHeadingMb: "mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20 2xl:mb-24",
  benefitItemPad: "px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-8",
  benefitItemGap: "gap-2 md:gap-3 lg:gap-4",
  benefitCircle:
    "w-16 h-16 sm:w-14 sm:h-14 md:w-16 md:h-16 " +
    "lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28",
  benefitImgInner:
    "w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 " +
    "lg:w-10 lg:h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14",
  benefitDescMaxW:
    "max-w-[150px] sm:max-w-[160px] md:max-w-[180px] " +
    "lg:max-w-[200px] xl:max-w-[220px] 2xl:max-w-[250px] mx-auto",

  ctaCardPad: "p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16",
  ctaCardGap: "gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-14 2xl:gap-20",
  ctaCardRadius: "rounded-2xl sm:rounded-3xl",
  ctaImgWidth: "w-full sm:w-[42%] md:h-[45%] lg:h-[47%] xl:w-[45%] 2xl:w-[44%]",
  ctaTitleMb: "mb-2 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8",
  ctaBodyMb: "mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-10",
  ctaBtnMb: "mb-3 sm:mb-4 md:mb-5 lg:mb-6 2xl:mb-8",
  ctaBtnPad:
    "px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 " +
    "py-2 sm:py-2.5 md:py-3 lg:py-3.5 xl:py-4 2xl:py-5",
  ctaCheckIcon: "w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-8 lg:w-5 lg:h-5 xl:w-6 xl:h-6",

  PhilosophyBodyMb:
    "max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[1000px] mx-auto",
  PhilosophySubTitle:
    "max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[1000vh] mx-auto",
  JinShinJyutsu:
    "max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] 2xl:max-w-[100vh] mx-auto",

  stepsScrollWrapper: "w-full overflow-x-auto md:overflow-x-visible pb-4 md:pb-0",
  stepsInnerRow:
    "flex flex-row gap-0 " +
    "min-w-[640px] md:min-w-0 " +
    "md:grid md:grid-cols-7",
  stepsItemPx: "px-1 sm:px-2 md:px-1 lg:px-2 xl:px-3 2xl:px-4",
  stepsIconBox:
    "w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 " +
    "lg:w-14 lg:h-14 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20",
  stepsIconBoxMb: "mb-2 sm:mb-3 md:mb-2 lg:mb-3 xl:mb-3 2xl:mb-4",
  stepsIconInner:
    "w-5 h-5 sm:w-6 sm:h-6 md:w-5 md:h-5 " +
    "lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10",
  stepsConnectorPt: "pt-5 sm:pt-6 md:pt-5 lg:pt-6 xl:pt-7 2xl:pt-9",
  stepsConnectorW: "w-4 sm:w-5 md:w-4 lg:w-6 xl:w-7 2xl:w-8",

  benefitsCardMinH:
    "min-h-[150px] sm:min-h-[90px] md:min-h-[110px] lg:min-h-[140px] xl:min-h-[160px] 2xl:min-h-[300px]",
  benefitsIconBox:
    "w-10 h-10 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-20 2xl:h-20",
  benefitsIconBoxMb: "mb-1 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-2 2xl:mb-6",
  benefitsIconInner:
    "w-5 h-5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10",

  fingerImageCircle:
    "w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 " +
    "lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28",
  fingerDescMaxW:
    "max-w-[110px] md:max-w-[120px] lg:max-w-[140px] " +
    "xl:max-w-[160px] 2xl:max-w-[200px]",
  fingerDivider: "w-8 md:w-10 xl:w-12 h-px bg-gray-300",
  fingerMobileDivider: "w-px bg-gray-200 self-stretch mx-2",
  fingerDesktopGutter: "px-2 lg:px-3 xl:px-4 2xl:px-6",

  disclaimerCardPad:
    "px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-10 lg:py-8 xl:px-12 xl:py-10 2xl:px-16 2xl:py-12",
  disclaimerGap:
    "gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16",
  disclaimerBulletGap:
    "gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 2xl:gap-5",
  disclaimerIconBox:
    "w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-30 lg:w-33 lg:h-33 xl:w-34 xl:h-34 2xl:w-35 2xl:h-35",
  disclaimerDot:
    "w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] lg:w-[7px] lg:h-[7px] 2xl:w-[9px] 2xl:h-[7px]",
  fullpower:
    "rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-10 flex flex-col md:flex-row items-stretch gap-4 md:gap-6 lg:gap-8",

  // ── Maintenance Hero Section ──────────────────────────────
  maintenanceHero: {
    card: "w-full max-w-[95%] md:max-w-[105%] lg:max-w-[98%] 2xl:max-w-[88%] mx-auto rounded-2xl bg-ancient-card flex flex-col md:flex-row md:items-stretch px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 gap-3 md:gap-3",
    imageCol: "flex w-full h-40 md:h-auto md:w-[170px] lg:w-[210px] xl:w-[450px] shrink-0 rounded-xl overflow-hidden bg-white items-center justify-center md:self-stretch",
    contentCol: "flex flex-col justify-start items-start text-start flex-1 px-2 sm:px-3 md:px-4 lg:px-8 gap-2 sm:gap-3",
    iconContainer: "w-15 h-15 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-full bg-white flex items-center justify-center shrink-0",
    iconImage: "w-8 h-8 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12 object-contain",
    button: "inline-flex items-center justify-center bg-white border border-gray-300 text-gray-900 font-medium rounded-lg px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-[11px] sm:text-xs md:text-sm hover:bg-gray-50 transition-colors cursor-pointer",
  },
    // ── Practice Analysis Section ─────────────────────────────
  practiceAnalysis: {
    section: "w-full",
    headerRow: "flex items-center justify-between mb-4 sm:mb-5",
    card: "rounded-[20px] border px-4 sm:px-6 py-5 sm:py-6",
    bodyRow: "flex flex-col sm:flex-row items-center gap-6 sm:gap-8",
    chartWrapper: "relative shrink-0 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]",
    chartCenter: "absolute inset-0 flex items-center justify-center",
    chartCenterCircle: "w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-white flex items-center justify-center shadow-sm",
    legendList: "flex flex-col gap-3.5 sm:gap-4 w-full",
    legendItem: "flex items-center gap-3",
    legendDot: "w-2.5 h-2.5 rounded-full shrink-0 mt-1 self-start",
    legendTextWrap: "flex-1 min-w-0",
  },

  errorState: {
    container: "flex flex-col items-center justify-center text-center max-w-2xl mx-auto min-h-[50vh]",
  },

  // ── What You Can Do Section Spacing ──────────────────────
  whatYouCanDo: {
    container: "max-w-5xl mx-auto xl:max-w-7xl 2xl:max-w-[1400px]",
    dividerContainer: "flex items-center justify-center gap-3 mb-10",
    dividerLine: "h-px w-16 bg-gray-300",
    dividerIcon: "w-5 h-5",
    cardsGrid: "grid grid-cols-1 sm:grid-cols-3 gap-4",
    card: "block rounded-xl p-5 transition-transform hover:-translate-y-0.5",
    cardHeader: "flex items-center justify-between mb-2",
    cardArrow: "w-4 h-4 text-gray-700",
  },

  journeySection: {
    blockWrapper: "px-2 sm:px-6 md:px-12 lg:px-[50px] xl:px-[190px] 2xl:px-[190px] py-10 sm:py-12 md:py-14 lg:py-16",
    blockWrapperAlt: "bg-holistic-bg px-2 sm:px-6 md:px-12 lg:px-[50px] xl:px-[190px] 2xl:px-[190px] py-10 sm:py-12 md:py-14 lg:py-16",

    // For normal layout: text left, image right
    block: "max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 items-start gap-8 md:gap-12",

    // For reversed layout: image left, text right
    blockReverse: "max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-2 items-start gap-8 md:gap-12",

    // Text column - used when text should be on the left (normal layout)
    textCol: "flex flex-col order-2 md:order-1",

    // Text column for reversed layout (image left, text right) - text on right
    textColReverse: "flex flex-col order-2 md:order-2",

    // Image column - used when image should be on the right (normal layout)
    imageCol: "order-1 md:order-2 overflow-hidden",

    // Image column for reversed layout (image left, text right) - image on left
    imageColReverse: "order-1 md:order-1 overflow-hidden",

    badgeHeadingRow: "flex items-start gap-4 sm:gap-5 mb-6",
    badgeWrapper: "flex flex-col items-center shrink-0",
    badgeUnderline: "block w-8 h-0.5 bg-primary mt-3",
    image: "w-full h-[260px] sm:h-[340px] md:h-[380px] lg:h-[420px] 2xl:h-[490px] object-cover",
    imagePairCol: "order-1 md:order-2",
    imagePairWrapper: "grid grid-cols-2 gap-3",
    imagePairItem: "w-full h-[260px] sm:h-[340px] md:h-[400px] object-cover",

    // ── Section 04 — Expanding the Horizon (card layout) ──────
    expandCard: "bg-holistic-bg rounded-2xl max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-5 sm:gap-8 p-5 sm:p-6 md:p-7 lg:p-8 overflow-hidden",
    expandImageCol: "w-full sm:w-[220px] md:w-[260px] lg:w-[280px] shrink-0 rounded-xl overflow-hidden",
    expandImage: "w-full h-[160px] sm:h-[140px] md:h-[150px] lg:h-[160px] object-cover rounded-xl",
    expandContentCol: "flex-1 w-full",
    expandIconWrapper: "flex sm:flex w-26 h-26 md:w-30 md:h-30 lg:w-30 md:h-30 rounded-full bg-white items-center justify-center shrink-0 sm:ml-auto mx-auto sm:mx-0",
  },

  founderStory: {
    container: "max-w-5xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 overflow-x-hidden",
    grid: "grid grid-cols-2 md:grid-cols-2 items-center gap-10 md:gap-16 lg:gap-16 xl:gap-20 2xl:gap-24",
    imageCol: "relative flex items-center justify-center md:justify-start",
    imageWrapper: "w-56 h-56 sm:w-72 sm:h-72 md:w-90 md:h-80 lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] 2xl:w-[450px] 2xl:h-[450px] rounded-full overflow-hidden relative z-10",
    image: "w-full h-full object-cover",
    dotPattern: "absolute left-0 bottom-0 grid grid-cols-5 sm:grid-cols-6 gap-1 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-3.5 2xl:gap-4 translate-x-1 translate-y-3 sm:-translate-x-4 sm:translate-y-6 lg:-translate-x-5 lg:translate-y-7 xl:-translate-x-6 xl:translate-y-8 z-0",
    dot: "w-3.5 h-3.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4 rounded-full bg-gray-400",
    contentCol: "flex flex-col",
    quoteCard: "relative bg-holistic-bg rounded-2xl p-6 sm:p-8 md:p-8 lg:p-9 xl:p-10 2xl:p-12 mt-4 lg:mt-5",
  },

  sessionFilterBar:
    "flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10",
  sessionGrid:
    "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-5 lg:gap-6",
  sessionCardPad: "p-3 sm:p-3.5 md:p-4",
  sessionCardThumbRatio: "aspect-square",

  newsletterContainer: "px-4 py-8 sm:px-6 lg:px-8",
  newsletterInner: "max-w-7xl mx-auto bg-[#e8f5e9] rounded-2xl p-6 sm:p-8",
  newsletterMobileGap: "gap-5",
  newsletterDesktopGap: "gap-6",
  newsletterInputWrapper: "gap-2",
  newsletterDisclaimerMt: "mt-2",
  newsletterImageWrapper: "w-59 h-28 relative rounded-xl overflow-hidden flex-shrink-0 bg-white",
  newsletterMobileImage: "w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-white",
  newsletterInput: "border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 bg-white w-52 md:w-44 lg:w-52",
  newsletterMobileInput: "flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 bg-white",

  pricingToggleGap: "gap-3",
  pricingToggleMb: "mb-10",
  pricingGrid: "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5",
  pricingCardPadding: "p-6",
  pricingCardName: "text-base font-semibold",
  pricingCardTitleMb: "mb-1",
  pricingTaglineMb: "mb-4",
  pricingPriceMb: "mb-1",
  pricingBilledNoteMb: "mb-4",
  pricingSuffixMb: "mb-4",
  pricingFeatureGap: "gap-2.5",
  pricingFeatureItemGap: "gap-2",
  pricingFeaturesMb: "mb-6",
  pricingBtnPadding: "py-2.5",
  pricingSaveBadge: "bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full",
  pricingPopularBadge: "absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap",

  formInputPadding: "px-3 sm:px-4 py-2.5 sm:py-3",
  formInputText: "text-sm",
  formGap: "gap-3 sm:gap-4",
  formRowGap: "gap-3",
  formCardPadding: "p-5 sm:p-6 lg:p-8",
  formCardMargin: "mb-5 sm:mb-6",
  formHeadingMargin: "mb-1",
  formGridGap: "gap-3",
  formBtnPadding: "px-6 py-2.5 sm:py-3",
  formBtnText: "text-sm",
  sectionPaddingX: "px-2 sm:px-6 md:px-12 lg:px-[50px] xl:px-[190px] 2xl:px-[190px]",
  sectionPaddingY: "py-10 sm:py-12 md:py-14 lg:py-17",

};

export default spacing;