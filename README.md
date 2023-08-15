## Getting Started

package install:

```bash
npm install
# or
yarn
```

run the development server:

```bash
npm run dev
# or
yarn dev
```

run the production server:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 기술스택

- 언어: Javascript / Typescript
- 코어: React / Next
- 상태관리: React-query
- 스타일: Emotion

## 폴더구조

- /components: 컴포넌트(UI)를 관리합니다.
- /hooks: 기능 모듈을 관리합니다.
- /pages: 페이지들을 관리하며 전체적인 라우팅을 구성하고, 서버사이드 로직들을 관리합니다.
- /templates: 페이지에서 사용되는 화면들을 관리하며, 레이아웃 구성 및 컴포넌트를 조합하여 템플릿 단위로 관리됩니다.
- /process: 각각의 템플릿에서 사용되며, 각각의 사용자 비즈니스 로직들을 처리하고 관리합니다.
- /queries: 서버사이드 상태를 관리합니다. (API 로직 처리 관여)
