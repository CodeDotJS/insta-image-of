import childProcess from 'child_process';

import test from 'ava';

test.cb(t => {
	childProcess.execFile('./cli.js', ['-n anything'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === '\n ❱ Internet Connection   :    ✔\n\n');
		t.end();
	});
});
