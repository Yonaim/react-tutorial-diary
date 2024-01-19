React 학습을 위해 Udemy의 [[https://www.udemy.com/course/winterlood-react-basic/|한입 크기로 잘라먹는 리액트]] 강의를 수강하며 작성한 프로젝트입니다.

1. 프로젝트의 목적  
2. 최종 컴포넌트 구조  
3. 배운 것 (깨달은 점, 어려웠던 점)  
4. 어려웠던 점  
5. 총평

# 1. 프로젝트 소개
- React를 이용해 구현한 일기 웹사이트
- [[https://create-react-app.dev/|Create-React-App]] 보일러 틀을 이용해 초기 세팅
- SPA(Single Page Application), CSR(Client Side Rendering)
- SPA를 위한 라우팅은 라이브러리 [[https://reactrouter.com/en/main|React-Router]] 사용
- 웹 스토리지(Local Storage)에 일기 데이터 저장

최종본에 앞서 3개의 연습 프로젝트가 있는데, 루트의 'practice' 디렉토리에 올려두었다.
- diary-non-optimized: hook을 익히기 위한 최초의 연습 프로젝트.
	- 싱글 페이지 (SPA가 아님)
	- Fake API([[https://jsonplaceholder.typicode.com/|JSONplaceholder]])로부터 json 파일을 받아 띄움
- diary-optimized: 앞선 프로젝트를 메모이제이션 hook을 이용해 최적화
- SPA: 라이브러리 없이 직접 DOM 객체 `window`를 조작하여 SPA를 구현해보고, react-router 라이브러리를 사용할 때와 비교

# 2. 최종 컴포넌트 구조
(이미지 첨부 예정)

# 3. 배운 점
- 리액트를 사용하는 이유
- 리액트 기초적인 훅들의 사용 방법
	- `useState()`
	- `useEffect()`
	- `useReference()`
- 좋은 리액트 컴포넌트 구조
- 최적화하기
	- 불필요한 렌더링 최소화 
	  -> `useMemo()`, `useCallback()` (+훅은 아니지만 `React.memo`)
	- 구조 최적화 (props drilling 문제)
	  -> `useContext()`
- 리액트 프로젝트의 기본적인 디렉토리 구조
- 기본적인 HTML, CSS 문법 복기

# 4. 어려웠던 점
- JS에 익숙하지 않아 예상치 못하게 발생한 여러 에러들
	- 자바스크립트 언어의 특성(비교 연산, 타입의 모호함)
	- 컴파일 타임이 존재하는 타 언어와 달리 엄격히 문법을 검사하지 않아 '실행은 되지만 원하는 동작을 하지 않는' 케이스가 발생. 디버깅에 애를 먹음  
	- 많은 경우가 비슷한 문제이므로, 다음 프로젝트부터는 이를 처음부터 인지하고 작성해 디버깅 시간을 줄인다  
- (특히나 웹 앱이기에)예상치 못한 여러 케이스
- 정적 분석(코드를 보고 문제 파악)보다는 동적 분석(나온 결과물을 보고 문제파악)하여 최적화
	- 처음 배우는 단계이기에 어쩔 수 없는 것을 알지만, 사후 처리(땜빵질)하는 느낌이었음

# 5. 총평 
React는 처음 사용해보지만 강의의 도움이 있어 빠르게 작성할 수 있었다.
강의의 예제를 거의 똑같이 따라했음에도 불구하고 맞닥뜨린 여러 에러들이 있는데 그 원인들은 잘못된 React 사용보다는, 대게 JS 언어 사용의 미숙함이었다.
다음부터는 이번에 직접 트러블 슈팅을 하며 인지하게된 JS의 여러 특성에 유의하여 최대한 에러가 발생하지 않게끔 처음부터 안전하게 코드를 짜야겠다. 디버깅 힘들다
