import React, { useEffect, useState } from 'react';
import { AIRGEN_CONFIG } from '../utils/config';
import { getDraft, saveDraft, clearDraft, fetchPublished, youtubeId } from '../utils/newsData';

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const blank = () => ({
  date: today(),
  title: '',
  category: '',
  summary: '',
  kind: 'text',
  video: '',
  image: '',
  link: '',
  pinned: false
});

export default function AdminPanel({ open, onClose }) {
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem('agadm') === '1';
    } catch (e) {
      return false;
    }
  });
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [items, setItems] = useState([]);
  const [isDraft, setIsDraft] = useState(false);
  const [form, setForm] = useState(blank());
  const [editing, setEditing] = useState(null);
  const [err, setErr] = useState('');
  const [confirmId, setConfirmId] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!open || !authed) return;
    const d = getDraft();
    if (d) {
      setItems(d);
      setIsDraft(true);
    } else {
      fetchPublished().then(r => {
        setItems(r);
        setIsDraft(false);
      });
    }
  }, [open, authed]);

  useEffect(() => {
    if (!open) return;
    const k = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [open, onClose]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const flash = t => {
    setMsg(t);
    setTimeout(() => setMsg(''), 2500);
  };

  const login = e => {
    e.preventDefault();
    const real = AIRGEN_CONFIG.adminPassword;
    if (!real) {
      setPwErr('Admin is switched off. Set adminPassword in src/utils/config.js.');
      return;
    }
    if (pw !== real) {
      setPwErr('That password is not right. Try again.');
      return;
    }
    try {
      sessionStorage.setItem('agadm', '1');
    } catch (x) {}
    setAuthed(true);
    setPw('');
    setPwErr('');
  };

  const persist = next => {
    setItems(next);
    setIsDraft(true);
    saveDraft(next);
  };

  const reset = () => {
    setForm(blank());
    setEditing(null);
    setErr('');
  };

  const submit = e => {
    e.preventDefault();
    if (!form.title.trim()) return setErr('Enter a headline.');
    if (!form.date) return setErr('Pick a date.');
    let vid = '';
    if (form.kind === 'video') {
      vid = youtubeId(form.video);
      if (!vid) return setErr('Paste a valid YouTube link or video id.');
    }
    const prev = editing ? items.find(i => i.id === editing) : null;
    const item = {
      id: editing || `n-${Date.now().toString(36)}`,
      date: form.date,
      title: form.title.trim(),
      category: form.category.trim() || 'Updates',
      summary: form.summary.trim()
    };
    if (form.pinned) item.pinned = true;
    if (vid) {
      item.type = 'video';
      item.videoId = vid;
    }
    if (form.image.trim()) item.image = form.image.trim();
    if (form.link.trim()) item.link = form.link.trim();
    if (prev && prev.hidden) item.hidden = true;
    persist(editing ? items.map(i => (i.id === editing ? item : i)) : [item, ...items]);
    flash(editing ? 'News updated' : 'News added');
    reset();
  };

  const edit = n => {
    setEditing(n.id);
    setErr('');
    setForm({
      date: n.date,
      title: n.title,
      category: n.category || '',
      summary: n.summary || '',
      kind: n.type === 'video' ? 'video' : 'text',
      video: n.videoId || '',
      image: n.image || '',
      link: n.link || '',
      pinned: !!n.pinned
    });
    const el = document.querySelector('.adm');
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleHide = n => persist(items.map(i => (i.id === n.id ? { ...i, hidden: !i.hidden } : i)));

  const remove = n => {
    if (confirmId !== n.id) {
      setConfirmId(n.id);
      return;
    }
    persist(items.filter(i => i.id !== n.id));
    setConfirmId(null);
    if (editing === n.id) reset();
    flash('News deleted');
  };

  const discard = () => {
    clearDraft();
    reset();
    fetchPublished().then(r => {
      setItems(r);
      setIsDraft(false);
    });
    flash('Draft discarded');
  };

  const json = JSON.stringify({ items }, null, 2);

  const download = () => {
    try {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      a.download = 'news.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (x) {
      setShowJson(true);
    }
  };

  const copy = () => {
    try {
      navigator.clipboard.writeText(json).then(
        () => flash('JSON copied'),
        () => setShowJson(true)
      );
    } catch (x) {
      setShowJson(true);
    }
  };

  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
  const cats = Array.from(new Set(items.map(i => i.category).filter(Boolean)));

  return (
    <div className="adm" role="dialog" aria-modal="true" aria-label="News admin">
      <div className="adm-top">
        <h1>News admin</h1>
        <button type="button" className="adm-x" onClick={onClose}>
          Close &#x2715;
        </button>
      </div>

      {!authed ? (
        <form className="adm-gate" onSubmit={login}>
          <h2>Sign in</h2>
          <label>
            Admin password
            <input
              type="password"
              value={pw}
              onChange={e => {
                setPw(e.target.value);
                setPwErr('');
              }}
              autoFocus
              autoComplete="current-password"
            />
          </label>
          {pwErr && <p className="adm-err">{pwErr}</p>}
          <button type="submit" className="btn pri">
            Sign in
          </button>
        </form>
      ) : (
        <div className="adm-wrap">
          <form onSubmit={submit} noValidate>
            <h2>{editing ? 'Edit news' : 'Add news'}</h2>
            <label>
              Headline
              <input value={form.title} onChange={e => set('title', e.target.value)} />
            </label>
            <div className="adm-row">
              <label>
                Date
                <input type="date" value={form.date} onChange={e => set('date', e.target.value)} />
              </label>
              <label>
                Category
                <input
                  list="adm-cats"
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  placeholder="Admissions"
                />
                <datalist id="adm-cats">
                  {cats.map(c => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </label>
            </div>
            <label>
              Summary
              <textarea value={form.summary} onChange={e => set('summary', e.target.value)} />
            </label>
            <label>
              Type
              <select value={form.kind} onChange={e => set('kind', e.target.value)}>
                <option value="text">Text news</option>
                <option value="video">Video (YouTube)</option>
              </select>
            </label>
            {form.kind === 'video' ? (
              <label>
                YouTube link or video id
                <input
                  value={form.video}
                  onChange={e => set('video', e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </label>
            ) : (
              <label>
                Image link (optional)
                <input value={form.image} onChange={e => set('image', e.target.value)} />
              </label>
            )}
            <label>
              Read more link (optional)
              <input value={form.link} onChange={e => set('link', e.target.value)} />
            </label>
            <label className="adm-chk">
              <input
                type="checkbox"
                checked={form.pinned}
                onChange={e => set('pinned', e.target.checked)}
              />
              Pin to the top
            </label>
            {err && <p className="adm-err">{err}</p>}
            <div className="adm-btns">
              <button type="submit" className="btn pri">
                {editing ? 'Save changes' : 'Add news'}
              </button>
              {editing && (
                <button type="button" className="adm-sec" onClick={reset}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div>
            <h2>All news ({items.length})</h2>
            <p className="adm-note">
              {isDraft
                ? 'You have unpublished changes. They are saved in this browser only, so visitors will not see them yet. Download news.json and upload it to your site to publish.'
                : 'Showing the published news.json. Any change you make is saved as a draft in this browser until you publish it.'}
            </p>
            <ul className="adm-list">
              {sorted.map(n => (
                <li key={n.id} className={n.hidden ? 'off' : ''}>
                  <div>
                    <b>{n.title}</b>
                    <span>
                      {n.date} &middot; {n.category || 'Updates'}
                      {n.type === 'video' ? ' · Video' : ''}
                      {n.pinned ? ' · Pinned' : ''}
                      {n.hidden ? ' · Hidden' : ''}
                    </span>
                  </div>
                  <div className="adm-acts">
                    <button type="button" onClick={() => edit(n)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => toggleHide(n)}>
                      {n.hidden ? 'Show' : 'Hide'}
                    </button>
                    <button type="button" className="del" onClick={() => remove(n)}>
                      {confirmId === n.id ? 'Confirm delete' : 'Delete'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="adm-btns">
              <button type="button" className="btn pri" onClick={download}>
                Download news.json
              </button>
              <button type="button" className="adm-sec" onClick={copy}>
                Copy JSON
              </button>
              <button type="button" className="adm-sec" onClick={() => setShowJson(s => !s)}>
                {showJson ? 'Hide JSON' : 'Show JSON'}
              </button>
              {isDraft && (
                <button type="button" className="adm-sec" onClick={discard}>
                  Discard draft
                </button>
              )}
            </div>
            {showJson && <textarea className="adm-json" readOnly value={json} rows={12} />}
            {msg && (
              <p className="adm-ok" role="status">
                {msg}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
