const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

test('プログラムがHello Codexを表示して正常終了する', () => {
  const scriptPath = path.join(__dirname, '..', 'src', 'index.js');
  const result = spawnSync(process.execPath, [scriptPath], {
    encoding: 'utf8',
  });

  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stdout.replace(/\r\n/g, '\n'), 'Hello Codex\n');
  assert.equal(result.stderr, '');
});
