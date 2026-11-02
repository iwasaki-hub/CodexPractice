const args = process.argv.slice(2);
const languageIndex = args.indexOf('--lang');
let language = 'en';

if (languageIndex !== -1) {
  language = args[languageIndex + 1];
  if (language !== 'en' && language !== 'ja') {
    console.error('--lang には en または ja を指定してください。');
    process.exit(1);
  }
  args.splice(languageIndex, 2);
}

const name = args[0];

if (language === 'ja') {
  console.log(`こんにちは、${name || 'Codex'}！`);
} else {
  console.log(name ? `Hello, ${name}!` : 'Hello Codex');
}
