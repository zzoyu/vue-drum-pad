# VueDrumPad [![CI](https://github.com/zzoyu/VueDrumPad/actions/workflows/main.yml/badge.svg)](https://github.com/zzoyu/VueDrumPad/actions/workflows/main.yml)

https://painstaking-ant.surge.sh/

[공유 기능 샘플](https://painstaking-ant.surge.sh/#/00100gc8g8ggh0g0g0h0ggg8c80g1000)

---

Vue.js 3 typescript 습작입니다. [Web Audio API](https://developer.mozilla.org/ko/docs/Web/API/Web_Audio_API)를 기반으로 비트를 조합/재생하는 애플리케이션입니다.
2021년 봄에 HTML+바닐라 자바스크립트로 작업한 토이 프로젝트(original 폴더)를 포팅 및 일부 리팩터링 하였습니다.
아직 모바일 대응 및 일부 기능들은 작업 중에 있습니다. iOS 기준, 무음 모드에서 재생되지 않습니다.

샘플 비트가 기본적으로 작성되어 있습니다.
좌측 레이아웃은 음원을 재생해보거나, 재생/기록/초기화/공유 기능을 수행합니다.
우측 레이아웃은 노트입니다. 각각의 노트를 클릭하면 활성화/비활성화 상태가 토글됩니다.

### 재생

엔터 키를 누르거나 클릭할 시 전체 재생이 가능합니다. BPM(Beats Per Minute) 값이 높을 수록 빨라집니다.
좌측 번호 버튼을 클릭(키보드 입력)하여 어떤 소리가 나는지 확인할 수 있습니다.

### 기록

더하기 키를 누르거나 클릭 시 입력받은 키의 기록이 가능합니다.
기록은 재생에 맞추어 비트를 등록하는 기능입니다. 키보드 입력 또는 좌측 번호 버튼 클릭을 기준으로 입력받습니다.
노트의 각 행의 시작에 해당하는 헤드 노트를 클릭하면 해당 부분만 입력을 받도록 지정할 수 있습니다.

### 공유

공유 버튼을 누르면 모달 창이 표시됩니다.
노트 내용을 코드로 변환하여 링크로 공유할 수 있습니다. 복사한 링크를 통해 창에 진입하면 코드를 파싱하여 전체 노트를 초기화합니다. (이미 드럼패드가 열린 페이지에서 주소를 입력하는 경우 새로고침이 필요할 수 있습니다)

- 공유 코드는 전체 노트의 상태값을 열 단위로 2글자씩 끊어 총 32자로 압축합니다.
  - 한 열에는 총 10개의 노트가 존재합니다. 이 노트들의 상태값을 10비트 크기의 2진수 값으로 변환하면 0~1023의 값을 가집니다.
  - 변환한 값을 32진수 문자열로 변환합니다. 총 2글자가 됩니다. 모든 열을 2글자로 만들어 이어붙입니다.
  - 변환된 코드로 노트를 초기화하는 경우 역순으로 풀어나가게 됩니다.
  - 길이를 줄이는 방법을 고민중입니다!
