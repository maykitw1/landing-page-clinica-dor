import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('a página inclui os arquivos locais e destinos de navegação', () => {
  const html = readFileSync('index.html', 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));

  for (const file of ['style.css', 'script.js']) {
    assert.ok(readFileSync(file).length > 0, `${file} está vazio`);
    assert.ok(html.includes(`"${file}"`), `${file} não está referenciado`);
  }

  for (const [, target] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(target), `Âncora #${target} não existe`);
  }
});
