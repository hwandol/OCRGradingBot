# 스마트 채점봇(Vision) - OCRGradingBot

### [스마트 채점봇(Vision) 사용해보기 - 카카오톡 플러스친구](https://pf.kakao.com/_rDCsj)

## 소스코드 사용전에(ToDo)...  
#### 1. node modules를 설치해주세요.
```shell
npm install
```


#### 2. GoogleCloudPlatform Vision API 사용 설정  
[Vision API 사용 설정](https://cloud.google.com/vision/docs/before-you-begin)에서 키 발급 후 발급받은 json 키파일 경로로 GOOGLE_APPLICATION_CREDENTIALS 환경 변수를 설정합니다.
```shell
export GOOGLE_APPLICATION_CREDENTIALS=PATH_TO_KEY_FILE
```


## 소개  
구글 클라우드 플랫폼의 Vision API를 이용하여 제작한 답안지 자동채점 채팅봇 입니다. 카카오톡을 기반으로 제작되었습니다.  
정해진 양식의 답안지에 답안을 기입하여 휴대폰으로 촬영 후 업로드하면 자동으로 이미지를 분석하여 입력된 답안과 비교하며 채점을 진행합니다.

## 챗봇 사용법  
1. @사용하기@ 선택  
2. 답안지 이미지 URL 전송  
3. 약 1분 정도 대기 (이미지 처리)  
4. 인식결과/채점결과 확인  

## 답안 수정
`/public/answerSheet.json` 파일을 변경해주세요.

## 답안지 양식  
[답인지 양식 다운로드](https://github.com/khaehwan/OCRGradingBot/blob/master/%E1%84%89%E1%85%B3%E1%84%86%E1%85%A1%E1%84%90%E1%85%B3%E1%84%8E%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%B7%E1%84%87%E1%85%A9%E1%86%BA%20%E1%84%83%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%B5%20%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8.pdf)  
스마트 채점봇에서 사용되는 답안지 양식 입니다. 답안 작성시 필요없는 글자가 적히지 않도록 주의해주세요.  

#### 양식 수정시
* 문제수 제한은 없으나 서버상에 있는 정답파일 json 수정이 필요합니다.  
* 이름은 무조건 맨위에 위치해야 합니다.  
* 문제 번호 순서는 상관없습니다.  
* 각 답안은 `(답안지 인식 문구 ex.정답) : (문제번호) : (답안)` 형식을 지켜야 합니다.  
* 형식만 지키면 자필로 작성해도 인식합니다.

## 테스트용 이미지 다운로드
- [전체정답](https://github.com/khaehwan/OCRGradingBot/blob/master/test-images/test-all-correct.jpeg)
- [일부정답](https://github.com/khaehwan/OCRGradingBot/blob/master/test-images/test-correct-and-wrong.jpeg)
- [커스텀 양식(손글씨, 순서 랜덤)](https://github.com/khaehwan/OCRGradingBot/blob/master/test-images/test-custom.jpeg)

## 제작 정보
* 만든이: 김해환(Kim Haehwan)  
* 제작완료: 2018.11.04.  
* 프로젝트명: Google Cloud Platform Vision API를 이용한 스마트 채점봇 개발  
* 개발언어: node.js  
한국디지털미디어고등학교 2018학년도 2학기 공업일반 프로젝트  
