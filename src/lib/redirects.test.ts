import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compileRules, matchRedirect, isReservedPath, isValidSource, type RedirectRule } from './redirects.ts';

const match = (rules: RedirectRule[], path: string, search = '') => matchRedirect(compileRules(rules), path, search);

test('exact rule', () => {
  assert.deepEqual(match([{ source: '/old', destination: '/new', status: 301 }], '/old'), { status: 301, location: '/new' });
});

test('302 is kept as 302', () => {
  assert.deepEqual(match([{ source: '/old', destination: '/new', status: 302 }], '/old'), { status: 302, location: '/new' });
});

test('folder rule carries the splat', () => {
  const rules = [{ source: '/old/*', destination: '/new/*', status: 301 }];
  assert.deepEqual(match(rules, '/old/a/b'), { status: 301, location: '/new/a/b' });
  assert.deepEqual(match(rules, '/old'), { status: 301, location: '/new' });
  assert.equal(match(rules, '/older'), null, 'a folder rule must not match a sibling prefix');
});

test('folder rule to a fixed destination', () => {
  assert.deepEqual(match([{ source: '/legacy/*', destination: '/work', status: 301 }], '/legacy/x'), { status: 301, location: '/work' });
});

test('exact beats folder', () => {
  const rules = [
    { source: '/blog/*', destination: '/insights/*', status: 301 },
    { source: '/blog/special', destination: '/special', status: 302 },
  ];
  assert.deepEqual(match(rules, '/blog/special'), { status: 302, location: '/special' });
  assert.deepEqual(match(rules, '/blog/other'), { status: 301, location: '/insights/other' });
});

test('longest folder prefix wins', () => {
  const rules = [
    { source: '/a/*', destination: '/x/*', status: 301 },
    { source: '/a/b/*', destination: '/y/*', status: 301 },
  ];
  assert.deepEqual(match(rules, '/a/b/c'), { status: 301, location: '/y/c' });
  assert.deepEqual(match(rules, '/a/z'), { status: 301, location: '/x/z' });
});

test('case-insensitive matching', () => {
  assert.deepEqual(match([{ source: '/Old-Page', destination: '/new', status: 301 }], '/OLD-page'), { status: 301, location: '/new' });
});

test('trailing slash ignored on both sides', () => {
  const rules = [{ source: '/old/', destination: '/new', status: 301 }];
  assert.deepEqual(match(rules, '/old'), { status: 301, location: '/new' });
  assert.deepEqual(match(rules, '/old/'), { status: 301, location: '/new' });
});

test('query string carried over', () => {
  assert.deepEqual(match([{ source: '/old', destination: '/new', status: 301 }], '/old', '?utm=x&a=1'), { status: 301, location: '/new?utm=x&a=1' });
  assert.deepEqual(match([{ source: '/old', destination: '/new?ref=a', status: 301 }], '/old', '?b=2'), { status: 301, location: '/new?ref=a&b=2' });
});

test('self-loop dropped (exact)', () => {
  assert.equal(match([{ source: '/same', destination: '/Same/', status: 301 }], '/same'), null);
});

test('self-loop dropped (folder to itself)', () => {
  assert.equal(match([{ source: '/a/*', destination: '/a/*', status: 301 }], '/a/b'), null);
});

test('one hop: destination is not re-matched', () => {
  const rules = [
    { source: '/a', destination: '/b', status: 301 },
    { source: '/b', destination: '/c', status: 301 },
  ];
  assert.deepEqual(match(rules, '/a'), { status: 301, location: '/b' });
});

test('disabled rules ignored', () => {
  assert.equal(match([{ source: '/old', destination: '/new', status: 301, enabled: false }], '/old'), null);
});

test('unsupported status ignored', () => {
  assert.equal(match([{ source: '/old', destination: '/new', status: 307 }], '/old'), null);
});

test('410 has no location', () => {
  assert.deepEqual(match([{ source: '/gone', status: 410 }], '/gone'), { status: 410 });
});

test('reserved paths are never redirected', () => {
  const rules = [
    { source: '/api/contact', destination: '/x', status: 301 },
    { source: '/assets/*', destination: '/x/*', status: 301 },
    { source: '/_astro/*', destination: '/x', status: 301 },
    { source: '/sitemap.xml', destination: '/x', status: 301 },
    { source: '/robots.txt', destination: '/x', status: 301 },
  ];
  for (const p of ['/api/contact', '/assets/a.png', '/_astro/x.js', '/sitemap.xml', '/robots.txt']) {
    assert.equal(match(rules, p), null, p);
    assert.equal(isReservedPath(p), true, p);
  }
  assert.equal(isReservedPath('/apiary'), false, 'only whole segments are reserved');
});

test('wildcard only as a trailing /*', () => {
  assert.equal(isValidSource('/a/*'), true);
  assert.equal(isValidSource('/a*'), false);
  assert.equal(isValidSource('/a/*/b'), false);
  assert.equal(isValidSource('no-slash'), false);
  assert.equal(isValidSource('/a?b=1'), false);
  assert.equal(match([{ source: '/a*', destination: '/x', status: 301 }], '/ab'), null);
});

test('duplicate source: first rule wins', () => {
  const rules = [
    { source: '/dup', destination: '/first', status: 301 },
    { source: '/DUP/', destination: '/second', status: 301 },
  ];
  assert.deepEqual(match(rules, '/dup'), { status: 301, location: '/first' });
});

test('absolute destination allowed', () => {
  assert.deepEqual(match([{ source: '/ext', destination: 'https://example.org/x', status: 302 }], '/ext'), { status: 302, location: 'https://example.org/x' });
});

test('no rules, no match', () => {
  assert.equal(match([], '/anything'), null);
});
