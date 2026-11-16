/**
 * JSON for an inline <script> (JSON-LD, config blobs). Plain JSON.stringify
 * leaves `</script>` intact, so a title containing it would end the script tag
 * and run whatever follows. Escaping <, > and & as unicode escapes keeps the
 * JSON identical to parsers and inert to the HTML tokenizer.
 */
export const safeJson = (value: unknown): string =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
