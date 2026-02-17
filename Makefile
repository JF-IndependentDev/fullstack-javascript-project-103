install:
	npm install

lint:
	npm run lint

lint-fix:
	npx eslint . --fix

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js