import childProcess from 'child_process';
import test from 'ava';

test.cb('small', t => {
	const cp = childProcess.spawn('./cli.js', ['-s', '9gag'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('medium', t => {
	const cp = childProcess.spawn('./cli.js', ['-m', '9gag'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('large', t => {
	const cp = childProcess.spawn('./cli.js', ['-f', '9gag'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('image', t => {
	const cp = childProcess.spawn('./cli.js', ['-l', 'https://www.instagram.com/p/BgiF0PsD1qx/?taken-by=iama_rishi'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('video', t => {
	const cp = childProcess.spawn('./cli.js', ['-v', 'https://www.instagram.com/p/BeTABLeFnxW/?taken-by=iama_rishi'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});
