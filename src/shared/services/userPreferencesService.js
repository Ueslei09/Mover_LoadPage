// src/shared/services/userPreferencesService.js
const CONSENT_KEY = 'mover_cookie_preferences';
const DRAFT_KEY_PREFIX = 'mover_draft_';

export const userPreferencesService = {
  // --- COOKIES E LGPD ---
  getCookiePreferences() {
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved ? JSON.parse(saved) : { essential: true, analytics: false, marketing: false, hasResponded: false };
  },
  saveCookiePreferences(prefs) {
    const data = { essential: true, analytics: !!prefs.analytics, marketing: !!prefs.marketing, hasResponded: true, updatedAt: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    return data;
  },
  acceptAll() {
    return this.saveCookiePreferences({ analytics: true, marketing: true });
  },

  // --- RASCUNHOS AUTOMÁTICOS (Drafts) ---
  saveDraft(formId, formData) {
    localStorage.setItem(`${DRAFT_KEY_PREFIX}${formId}`, JSON.stringify({ data: formData, time: Date.now() }));
  },
  getDraft(formId) {
    const item = localStorage.getItem(`${DRAFT_KEY_PREFIX}${formId}`);
    return item ? JSON.parse(item).data : null;
  },
  clearDraft(formId) {
    localStorage.removeItem(`${DRAFT_KEY_PREFIX}${formId}`);
  }
};