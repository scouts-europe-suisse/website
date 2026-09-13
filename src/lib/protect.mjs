/**
 * Protection des adresses e-mail et des numéros de téléphone (issue #37).
 *
 * Principe : rien n'est écrit en clair dans le HTML. La valeur est chiffrée
 * (ou exclusif avec une clé, puis base64) dans un attribut `data-obf`, et le
 * texte visible est écrit à l'envers, remis à l'endroit par CSS
 * (`unicode-bidi: bidi-override; direction: rtl`), sans « @ » ni « + » dans
 * le texte (ils sont dessinés par CSS). Un robot qui lit la page ne trouve ni
 * une adresse, ni un lien `mailto:`. Le script de `BaseLayout.astro`
 * reconstitue le lien et le texte seulement quand la personne survole,
 * touche, clique ou atteint l'élément au clavier.
 *
 * Ce fichier est en JavaScript pur parce qu'il sert aussi au greffon markdown
 * de `astro.config.mjs`, qui ne lit pas le TypeScript.
 */

const KEY = 'ses-2026-croix';

/** Chiffre une valeur pour l'attribut data-obf. */
export function encode(value) {
  const bytes = new TextEncoder().encode(value);
  const out = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ KEY.charCodeAt(i % KEY.length);
  return Buffer.from(out).toString('base64');
}

/** Le texte visible, à l'envers, sans le caractère qui trahit la nature de la valeur. */
export function reversedParts(value, kind) {
  if (kind === 'email') {
    const [user, domain] = value.split('@');
    return { a: [...user].reverse().join(''), b: [...domain].reverse().join('') };
  }
  // Téléphone : on retire le « + » et on garde les groupes de chiffres.
  const digits = value.replace(/^\+/, '');
  return { a: [...digits].reverse().join(''), b: '' };
}

/** Le HTML complet d'un lien protégé (utilisé par le greffon markdown). */
export function protectedHtml(value, kind, { label, className = '' } = {}) {
  const parts = reversedParts(value, kind);
  const a11y = label ?? (kind === 'email' ? 'Adresse e-mail protégée : survoler ou cliquer pour l’afficher' : 'Numéro de téléphone protégé : survoler ou cliquer pour l’afficher');
  const inner = kind === 'email'
    ? `<span class="ses-obf__t" aria-hidden="true"><span class="ses-obf__d">${parts.b}</span><span class="ses-obf__at"></span><span class="ses-obf__u">${parts.a}</span></span>`
    : `<span class="ses-obf__t" aria-hidden="true"><span class="ses-obf__d">${parts.a}</span><span class="ses-obf__plus"></span></span>`;
  const cls = `ses-obf ${className}`.trim();
  return `<a href="#" class="${cls}" data-obf="${encode(value)}" data-kind="${kind}" aria-label="${a11y}" rel="nofollow">${inner}</a>`;
}

export const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
/** Numéros suisses : +41 79 611 29 28, 079 611 29 28, 021 123 45 67, avec ou sans espaces/points. */
export const PHONE_RE = /(?:\+41|0041|0)\s?\d{2}[\s.]?\d{3}[\s.]?\d{2}[\s.]?\d{2}\b/g;
