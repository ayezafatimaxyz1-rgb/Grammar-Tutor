// Wrap runs of Latin digits (with : . – - %) in Unicode LTR isolates so citations like
// "80:25–32" keep their order inside right-to-left Urdu text.
export const isolateNumbers = (s: string) => s.replace(/[0-9][0-9:.–\-%]*/g, (m) => `⁦${m}⁩`);
