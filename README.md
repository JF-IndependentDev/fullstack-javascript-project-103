# Gendiff

[![Hexlet Check](https://github.com/JF-IndependentDev/fullstack-javascript-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/JF-IndependentDev/fullstack-javascript-project-103/actions)
[![CI](https://github.com/JF-IndependentDev/fullstack-javascript-project-103/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/JF-IndependentDev/fullstack-javascript-project-103/actions/workflows/test-and-lint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/e5ea5e7d93b904693846/maintainability)](https://codeclimate.com/github/JF-IndependentDev/fullstack-javascript-project-103/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e5ea5e7d93b904693846/test_coverage)](https://codeclimate.com/github/JF-IndependentDev/fullstack-javascript-project-103/test_coverage)

[![Code Climate](https://codeclimate.com/githubJF-IndependentDev/fullstack-javascript-project-103/badges/gpa.svg)](https://codeclimate.com/github/JF-IndependentDev/fullstack-javascript-project-103)


---

## Descripción

gendiff __fixtures__/file1.json __fixtures__/file2.json
node --experimental-vm-modules node_modules/.bin/jest __test__/genDiff.test.js --verbose
npm test
export CC_TEST_REPORTER_ID=fce67b3fb1835fcd7fa6b7486ed391d201c53cbbb96c0cf0d019492363c1ee3c



**Gendiff** es una herramienta de línea de comandos que compara archivos planos (JSON/YAML) y muestra sus diferencias en distintos formatos.

---

## Asciinema

[Demostración de json](https://asciinema.org/a/h3pY7RaotYnCbFYF0Z4CtfThz)
[Demostración de yml](https://asciinema.org/a/k7I2LboaBzGDZRX6ZJz2QGBer)

---

## Instalación

```bash
git clone https://github.com/JF-IndependentDev/fullstack-javascript-project-103.git
cd fullstack-javascript-project-103
make install
