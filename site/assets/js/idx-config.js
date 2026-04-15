/* =============================================================================
   MIRTHA CAROLINA · IDX CONFIG
   Replace sparkApiKey with Mirtha's Spark API key to render the full MLS feed.
   Until a key is set, the /portfolio/ page renders the FlexMLS public share
   iframe (hard-coded in /portfolio/index.html).
   ========================================================================== */
window.MC_IDX = {
  // Spark API key from FlexMLS → Account → API Keys
  sparkApiKey: '',
  // Agent MLS ID — used to scope the feed to Mirtha's listings
  agentMlsId: '',
  // Public FlexMLS share fallback (used when no key is present)
  fallbackShareUrl: 'https://my.flexmls.com/MirthaSolorzano/search/shared_links/DnNcF/listings'
};
