import { useEffect, useState } from 'react';

/*
  News content lives in public/news.json (edit that file, or use the admin panel at /#admin).
  Each item:
    id        unique text
    date      "YYYY-MM-DD"
    title     headline (also shown in the home page strip)
    category  e.g. "Admissions", "DGCA", "Events", "Achievements"
    summary   one or two sentences
    pinned    true = shown first (optional)
    image     image path or URL (optional)
    type      "video" for a YouTube item (optional)
    videoId   the YouTube id, e.g. "aqz-KE-bpKQ" (needed when type is "video")
    link      "Read more" URL (optional)
    hidden    true = keep in the file but do not show (optional)

  FALLBACK is a copy of the starter items, used only if news.json cannot be loaded.
  The admin panel saves a draft in this browser (localStorage); the draft wins over news.json here.
*/
const FALLBACK = [
  {
    id: "welcome",
    date: "2026-10-23",
    title: "The Airgen news page is live",
    category: "Updates",
    summary: "Announcements, events and guides from Airgen Aviation will be posted here. Check back often, or follow the scrolling strip on the home page.",
    pinned: true
  },
  {
    id: "sample-video",
    date: "2026-10-21",
    title: "Sample video: replace this with your own YouTube video",
    category: "Videos",
    summary: "This is a dummy video item to show how video news looks. Add or edit videos from the admin panel at /#admin.",
    type: "video",
    videoId: "aqz-KE-bpKQ"
  },
  {
    id: "demo-call",
    date: "2026-10-22",
    title: "Book a 15-minute demo call with a pilot mentor",
    category: "Admissions",
    summary: "Talk through your pathway, medical and budget with a mentor before you decide. Use the Enquire button at the top of any page."
  },
  {
    id: "dgca-guide",
    date: "2026-10-20",
    title: "Explore the DGCA ground class pathway",
    category: "DGCA",
    summary: "See how the ATPL ground class, RTR (A) preparation and licence steps fit together in one plan."
  }
];

const DAY = 86400000;
const DRAFT_KEY = 'airgen_news_draft';
const EVT = 'airgen-news-changed';

const parseDate = d => {
  const t = new Date(`${d}T00:00:00`);
  return Number.isNaN(t.getTime()) ? null : t;
};

export function normalizeNews(list) {
  return (Array.isArray(list) ? list : [])
    .filter(n => n && n.title && parseDate(n.date) && !n.hidden)
    .sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return parseDate(b.date) - parseDate(a.date);
    });
}

export const isNewItem = n => {
  const t = parseDate(n.date);
  return !!t && Date.now() - t.getTime() <= 7 * DAY;
};

export const dateParts = n => {
  const t = parseDate(n.date);
  return {
    day: String(t.getDate()),
    month: t.toLocaleString('en-IN', { month: 'short' }),
    year: String(t.getFullYear())
  };
};

export const youtubeId = v => {
  const s = String(v || '').trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : '';
};

export function getDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const a = JSON.parse(raw);
    return Array.isArray(a) ? a : null;
  } catch (e) {
    return null;
  }
}

export function saveDraft(items) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(items));
  } catch (e) {
    return false;
  }
  window.dispatchEvent(new Event(EVT));
  return true;
}

export function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {}
  window.dispatchEvent(new Event(EVT));
}

export async function fetchPublished() {
  try {
    const r = await fetch(`${import.meta.env.BASE_URL}news.json`, { cache: 'no-cache' });
    if (!r.ok) throw new Error('bad status');
    const j = await r.json();
    if (Array.isArray(j.items) && j.items.length) return j.items;
  } catch (e) {}
  return FALLBACK;
}

export function useNews() {
  const [items, setItems] = useState(() => normalizeNews(getDraft() || FALLBACK));

  useEffect(() => {
    let live = true;
    const load = () => {
      const d = getDraft();
      if (d) {
        setItems(normalizeNews(d));
        return;
      }
      fetchPublished().then(raw => {
        if (live) setItems(normalizeNews(raw));
      });
    };
    load();
    window.addEventListener(EVT, load);
    window.addEventListener('storage', load);
    return () => {
      live = false;
      window.removeEventListener(EVT, load);
      window.removeEventListener('storage', load);
    };
  }, []);

  return items;
}
