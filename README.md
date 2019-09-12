# TypeScript를 이용한 간단한 블록 만들기 연습

### 1. typescript 설치

```shell
npm install -g typescript
```

### 2. project 생성

```shell
npm init
```

package.json 생성 확인

```js
{
  "name": "practice_blockchain",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Charciavisual/Practice-Blockchain.git"
  },
  "author": "ChangHeeCHoi <charciavisual@icloud.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Charciavisual/Practice-Blockchain/issues"
  },
  "homepage": "https://github.com/Charciavisual/Practice-Blockchain#readme"
}
```

### 3. Typescript config 설정

```js
{
  "compilerOptions": {
    "target": "es2015" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    "sourceMap": true /* Generates corresponding '.map' file. */
  },
  "include": ["index.ts"],
  "exclude": ["node_modules"]
}
```

### 4. 실행 스크립트 작성

**package.json**

```js
{
  ...
   "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  },
}
```

**index.ts**

```js
console.log("hello");
```

**실행**

```shell
npm start
```

### 5. watch 모드로 개발하기

**tsc-watch 설치**

```shell
npm i typescript
npm i tsc-watch --dev
```

tsc-watch를 사용하면 글로벌로 설치한 typescript를 찾지 못하는 버그가 있기 때문에 프로젝트에 typescript를 설치해준다.

dist, src 디렉토리 생성 후 index.ts 파일을 src 디렉토리로 이동시킨다.

**tsconfig.json 수정**

```js
{
  "compilerOptions": {
    ...
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  ...
}
```

**package.json 수정**

```js
{
  ...
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\" "
  }
  ...
}
```
