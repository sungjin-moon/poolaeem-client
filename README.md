# <span id='top'>✏️ 풀내임 (Poolaeem)</span>
<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59526368/263523343-82a500b9-2f5a-4a8a-812b-5a6e3ec6bf45.png" />
> 📎 <a href='https://poolaeem.com'>배포 URL</a> <br/>

<br/>

## 1. 서비스 소개

|<img height="300" alt="poolaeem_list" src="https://github.com/eatnows/poolaeem-server/assets/59526368/085a5cde-9f5c-4ad5-9b29-778d3043e10e"> |  <img height="300" alt="poolaeem_problem" src="https://github.com/eatnows/poolaeem-server/assets/59526368/2a9f043c-a3e6-4918-b1c1-8b8e24dcd74c"> | <img height="300" alt="poolaeem_solve" src="https://github.com/eatnows/poolaeem-server/assets/59526368/6ccd70e8-199e-46f3-a7b1-ee26435de12f"> | <img height="300" alt="poolaeem_result" src="https://github.com/eatnows/poolaeem-server/assets/59526368/d2a87409-a722-46fa-8341-39e0ca433940"> |
|:----------:|:----------:|:---------:|:--------:|
|문제 목록|문제 만들기|문제 풀이|풀이 결과|
<br>

학교, 스터디, 자격증 등 공부한 지식을 문제로 만들고, 출제된 문제를 여러 사람이 풀 수 있는 웹 서비스입니다.

- **풀고 싶은 문제가 있는지 확인해보세요!** <br>
  내가 만들거나, 다른 사람들이 만든 문제집들을 확인할 수 있어요. <br>
  내가 찾고 있던 문제집이 있는지 찾아보세요.
- **남기고 싶거나 복습하고 싶은 지식을 문제로 만들어보세요!** <br>
  꼭 알아야하는 중요한 문제나 이해가 잘 안되는 지식들을 내가 원하는 때에 다시 풀 수 있게 문제로 만들어 보세요. <br>
  만든 문제는 다른 사람들에게 공유하여 여러 사람들이 풀 수 있어요.
- **여러 문제를 풀고 지식을 채워보세요!** <br>
  가입을 하지 않고도 문제를 풀 수 있어요. <br>
  언제 어디서든 공개된 여러 문제들을 풀고 틀린 문제를 확인하여 나의 부족한 부분을 채워보세요.

<br/>

## 2. 팀 소개
### team 901
UX/UI, FrontEnd, BackEnd 각각 포지션 별 한 명씩 맡고있는 팀으로 다양한 웹, 앱 서비스를 선보일 예정입니다.

<br/>

## 2. 기술 스택

- 언어: Javascript / Typescript
- 코어: React / Next
- 상태관리: React-query
- 스타일: Emotion

<br/>

## 3. 프로젝트 구조

* `/components` : 컴포넌트(UI)를 관리합니다.
* `/hooks` : 기능 모듈을 관리합니다.
* `/pages` : 페이지들을 관리하며 전체적인 라우팅을 구성하고, 서버사이드 로직들을 관리합니다.
* `/templates` : 페이지에서 사용되는 화면들을 관리하며, 레이아웃 구성 및 컴포넌트를 조합하여 템플릿 단위로 관리합니다.
* `/process` : 각각의 템플릿에서 사용되며, 사용자의 비즈니스 로직들을 처리하고 관리합니다.
* `/queries` : Backend API 서버 로직과 클라이언트 캐싱 데이터를 관리합니다.

<br/>

## 4. 시작하기

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
