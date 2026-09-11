/** Vite construit un script classique autonome, utilisable aussi depuis file://. */
export function classicStaticHtml() {
  return {
    name: 'classic-static-html',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/<script\b([^>]*\btype="module"[^>]*)>/g, (_, attributes) =>
            '<script' + attributes.replace(/\s+type="module"/, '').replace(/\s+crossorigin(?:="[^"]*")?/, '') + ' defer>')
          .replace(/(<link\b[^>]*?)\s+crossorigin(?:="[^"]*")?/g, '$1');
      },
    },
  };
}
