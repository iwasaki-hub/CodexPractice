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

test('名前を指定するとその名前に挨拶して正常終了する', () => {
  const scriptPath = path.join(__dirname, '..', 'src', 'index.js');
  const result = spawnSync(process.execPath, [scriptPath, '太郎'], {
    encoding: 'utf8',
  });

  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stdout.replace(/\r\n/g, '\n'), 'Hello, 太郎!\n');
  assert.equal(result.stderr, '');
});

const additionalCases = [
  { title: '英字の名前に挨拶する', args: ['Alice'], expected: 'Hello, Alice!' },
  { title: '空白を含む名前をそのまま使う', args: ['Alice Smith'], expected: 'Hello, Alice Smith!' },
  { title: '空文字の名前では既定の挨拶を表示する', args: [''], expected: 'Hello Codex' },
  { title: '1文字の名前に挨拶する', args: ['A'], expected: 'Hello, A!' },
  // 名前の形式を検証しない既存仕様を確認する。
  { title: '数値風の入力も文字列として使う', args: ['0'], expected: 'Hello, 0!' },
  { title: '空白のみの入力もそのまま使う', args: [' '], expected: 'Hello,  !' },
  { title: '余分な引数があっても最初の名前に挨拶する', args: ['Alice', 'Bob'], expected: 'Hello, Alice!' },
];

for (const { title, args, expected } of additionalCases) {
  test(title, () => {
    const scriptPath = path.join(__dirname, '..', 'src', 'index.js');
    const result = spawnSync(process.execPath, [scriptPath, ...args], {
      encoding: 'utf8',
    });

    assert.ifError(result.error);
    assert.equal(result.status, 0);
    assert.equal(result.stdout.replace(/\r\n/g, '\n'), `${expected}\n`);
    assert.equal(result.stderr, '');
  });
}
