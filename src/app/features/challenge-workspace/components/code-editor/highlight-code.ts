import type { LanguageId } from '../../types/challenge.types';

const keywordsByLanguage: Record<LanguageId, ReadonlySet<string>> = {
  javascript: new Set([
    'break',
    'class',
    'const',
    'continue',
    'else',
    'false',
    'for',
    'function',
    'if',
    'in',
    'let',
    'new',
    'null',
    'of',
    'return',
    'this',
    'true',
    'undefined',
    'var',
    'while',
  ]),
  python: new Set([
    'and',
    'break',
    'class',
    'continue',
    'def',
    'elif',
    'else',
    'False',
    'for',
    'from',
    'if',
    'import',
    'in',
    'is',
    'None',
    'not',
    'or',
    'pass',
    'return',
    'True',
    'while',
  ]),
};

// One alternation per language, matched left to right in a single pass:
// group 1 comment, group 2 string, group 3 number, group 4 word.
const tokenPatternByLanguage: Record<LanguageId, RegExp> = {
  javascript:
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|((['"])(?:\\.|(?!\3)[^\\\n])*\3|`(?:\\[\s\S]|[^\\`])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g,
  python: /(#[^\n]*)|((['"])(?:\\.|(?!\3)[^\\\n])*\3)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w]*)/g,
};

/**
 * Returns escaped HTML with token spans. Runs in a single linear pass, so user
 * input can never re-trigger replacements or break the generated markup.
 */
export function highlightCode(code: string, language: LanguageId): string {
  const keywords = keywordsByLanguage[language];
  let html = '';
  let lastIndex = 0;

  for (const match of code.matchAll(tokenPatternByLanguage[language])) {
    const [token, comment, string, , number, word] = match;
    const className = comment
      ? 'token-comment'
      : string
        ? 'token-string'
        : number
          ? 'token-number'
          : word && keywords.has(word)
            ? 'token-keyword'
            : null;

    html += escapeHtml(code.slice(lastIndex, match.index));
    html += className
      ? `<span class="${className}">${escapeHtml(token)}</span>`
      : escapeHtml(token);
    lastIndex = match.index + token.length;
  }

  return html + escapeHtml(code.slice(lastIndex));
}

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
