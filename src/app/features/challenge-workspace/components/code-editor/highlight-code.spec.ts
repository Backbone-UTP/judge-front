import { highlightCode } from './highlight-code';

function textOf(html: string): string {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container.textContent ?? '';
}

describe('highlightCode', () => {
  it('should terminate and keep placeholder-like text literally', () => {
    const source = 'const m = "@@TOKEN_0@@";';

    const html = highlightCode(source, 'javascript');

    expect(textOf(html)).toBe(source);
    expect(html).toContain('<span class="token-string">"@@TOKEN_0@@"</span>');
  });

  it('should not corrupt markup when keywords appear after numbers', () => {
    const source = 'class A { x = 5; }';

    const html = highlightCode(source, 'javascript');

    expect(textOf(html)).toBe(source);
    expect(html).toBe(
      '<span class="token-keyword">class</span> A { x = <span class="token-number">5</span>; }',
    );
  });

  it('should not highlight keywords inside strings or comments', () => {
    const html = highlightCode("const s = 'return 1'; // for 2", 'javascript');

    expect(html).toContain('<span class="token-string">\'return 1\'</span>');
    expect(html).toContain('<span class="token-comment">// for 2</span>');
    expect(html.match(/token-keyword/g)).toHaveLength(1);
  });

  it('should escape html in the source', () => {
    const source = 'if (a < b && c > d) {}';

    const html = highlightCode(source, 'javascript');

    expect(html).not.toContain('<b');
    expect(html).toContain('&lt; b &amp;&amp; c &gt; d');
    expect(textOf(html)).toBe(source);
  });

  it('should use python comments and keywords for python', () => {
    const html = highlightCode('def f():  # return\n    return None', 'python');

    expect(html).toContain('<span class="token-keyword">def</span>');
    expect(html).toContain('<span class="token-comment"># return</span>');
    expect(html.match(/token-keyword/g)).toHaveLength(3);
  });

  it('should leave an unterminated string as plain text', () => {
    const source = 'const s = "open';

    expect(textOf(highlightCode(source, 'javascript'))).toBe(source);
  });
});
