const BAD_TAGS = 'script,iframe,object,embed,link,meta,base,frame,frameset,applet';

export function clean(html) {
  const d = new DOMParser().parseFromString(html, 'text/html');
  d.querySelectorAll(BAD_TAGS).forEach((n) => n.remove());
  d.querySelectorAll('body *').forEach((n) => {
    for (const a of [...n.attributes]) {
      const nm = a.name.toLowerCase();
      if (nm.startsWith('on') || (/^\s*javascript:/i.test(a.value) && (nm === 'href' || nm === 'src' || nm === 'action'))) {
        n.removeAttribute(a.name);
      }
    }
  });
  const frag = document.createDocumentFragment();
  d.head.querySelectorAll('style').forEach((s) => frag.append(document.importNode(s, true)));
  [...d.body.childNodes].forEach((n) => frag.append(document.importNode(n, true)));
  return frag;
}
