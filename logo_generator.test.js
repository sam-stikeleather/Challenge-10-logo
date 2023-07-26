
const fs = require('fs');
const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

TestScheduler('Logo Generation', async () => {
    if (fs.existsSync('logo.svg')) {
        fsu.unlinkSync('logo.svg');
    }

    const input = 'Test\n#000000\n#ffffff\n';

    await exec(`echo "${input}" | node logo_generator.js`);

    expect(fs.existsSync('logo.svg')).toBeTruthy();
});