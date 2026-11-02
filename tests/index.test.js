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

for (const { args, expected } of [
  { args: ['--lang', 'en'], expected: 'Hello Codex' },
  { args: ['太郎', '--lang', 'en'], expected: 'Hello, 太郎!' },
  { args: ['--lang', 'ja'], expected: 'こんにちは、Codex！' },
  { args: ['太郎', '--lang', 'ja'], expected: 'こんにちは、太郎！' },
  { args: ['--lang', 'ja', '太郎'], expected: 'こんにちは、太郎！' },
]) {
  test(`言語指定 ${args.join(' ')} で正しい挨拶を表示する`, () => {
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

for (const args of [['--lang', 'fr'], ['--lang']]) {
  test(`不正な言語指定 ${args.join(' ')} はエラーで終了する`, () => {
    const scriptPath = path.join(__dirname, '..', 'src', 'index.js');
    const result = spawnSync(process.execPath, [scriptPath, ...args], {
      encoding: 'utf8',
    });

    assert.ifError(result.error);
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.equal(
      result.stderr.replace(/\r\n/g, '\n'),
      '--lang には en または ja を指定してください。\n',
    );
  });
}

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

// CIの失敗検出を確認するための一時的な実験用テスト。
test('CI動作確認：意図的に失敗するテスト', () => {
  assert.strictEqual(1, 2);
});
