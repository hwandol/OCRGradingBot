const express = require('express');
const router = express.Router();
const vision = require('../public/vision');
const grading = require('../public/grading');
const fs = require('fs');

router.post('/', function(req, res) {
    var type = req.body.type;
    var content = req.body.content;
    var ocr = '';
    console.log('type( '+ type +' ) - content: ' + content);

    var send = {}

    if(type === "text"){
        switch(content) {
            case '소개':
            send = {
                'message':{
                    'text':"===스마트 채점봇 (Vision)===\n구글 클라우드 플랫폼의 Vision API를 이용하여 제작한 답안지 자동채점 채팅봇 입니다.\n정해진 양식의 답안지에 답안을 기입하여 휴대폰으로 촬영 후 업로드하면 자동으로 이미지를 분석하여 입력된 답안과 비교하며 채점을 진행합니다."
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }
            break;
    
            case '사용법':
            send = {
                'message':{
                    'text':"===사용법===\n1. @사용하기@ 선택\n2. 답안지 이미지 URL 전송\n3. 약 1분 정도 대기 (이미지 처리)\n4. 인식결과/채점결과 확인"
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }
            break;

            case '답안지 양식':
            send = {
                'message':{
                    'text':'===답안지 양식===\n스마트 채점봇에서 사용되는 답안지 양식 입니다.\n답안 작성시 필요없는 글자가 적히지 않도록 주의해주세요.\n\n--양식 수정시--\n*문제수 제한은 없으나 서버상에 있는 정답파일 json 수정이 필요합니다.\n*이름은 무조건 맨위에 위치해야 합니다.\n*문제 번호 순서는 상관없습니다.\n*(원하는 문구) : (문제번호) : <= 형식을 지켜야 합니다.\n*형식만 지키면 손으로도 양식제작가능합니다.',
                    "message_button": {
                        "label": "답안지 양식 다운로드",
                        "url": 'https://github.com/khaehwan/OCRGradingBot/raw/master/%E1%84%89%E1%85%B3%E1%84%86%E1%85%A1%E1%84%90%E1%85%B3%E1%84%8E%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%B7%E1%84%87%E1%85%A9%E1%86%BA%20%E1%84%83%E1%85%A1%E1%86%B8%E1%84%8B%E1%85%A1%E1%86%AB%E1%84%8C%E1%85%B5%20%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%89%E1%85%B5%E1%86%A8.pdf'
                    }
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }
            break;
    
            case '제작정보(테스트이미지)':
            send = {
                'message':{
                    'text':"===제작정보===\n-만든이: 김해환(Kim Haehwan)\n-제작완료: 2018.11.04.\n-프로젝트명: 스마트 채점봇 (Vision)\n한국디지털미디어고등학교 2018학년도 2학기 공업일반 프로젝트\n\n##작품테스트용##\n*테스트 이미지 URL\n전체정답\n-https://github.com/khaehwan/OCRGradingBot/raw/master/test-images/test-all-correct.jpeg \n일부정답\n-https://github.com/khaehwan/OCRGradingBot/raw/master/test-images/test-correct-and-wrong.jpeg \n커스텀 양식(손글씨, 순서 랜덤)\n-https://github.com/khaehwan/OCRGradingBot/raw/master/test-images/test-custom.jpeg \n\n\n*입력된 정답(JSON)\n{\n\"one\": \"사과\",\n\"two\": \"바나나\",\n\"three\": \"abc\",\n\"four\": \"2018\",\n\"five\": \"한국디지털미디어고등학교\",\n\"six\": \"11.05\",\n\"seven\": \"1+2\"\n}"
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }
            break;

            case '@사용하기@':
            send = {
                'message':{
                    'text':"채점(인식)할 이미지의 URL을 입력해주세요!!\n-아래 버튼을 누르면 무료 이미지 호스팅(URL 변환)사이트로 이동합니다.\n\n(카카오톡내 사진전송기능 이용시 형식과 서버 트래픽 문제가 있어 URL입력으로 대체합니다.)",
                    "message_button": {
                        "label": "이미지 URL 변환기",
                        "url": 'INSERT_URL'
                    }
                }
            }
            break;
            
            case '인식결과':
            let outres = '문자인식 결과';
            let rawjson = fs.readFileSync('./output/ocr_res.json');
            let conjson = JSON.parse(rawjson);
            try{
                outres = '===이미지인식(VISION) 원본===\n' + conjson[0].description;
            }catch{
                outres = '문자인식 실패';
            }
            send = {
                'message':{
                    'text': outres
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['채점결과', '소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }
            break;

            case '채점결과':
            let gradingres = '채점 결과';
            try{
                let rawjson = fs.readFileSync('./output/ocr_res.json');
                let conjson = JSON.parse(rawjson);
                let arr = grading.arr(conjson[0].description);
                let answercnt = 0;
                let wrongcnt = 0;
                
                gradingres = ('===' + grading.splitStr(arr[0])[1].trim() + '님의 채점 결과===\n');
                for(let i=1; i<arr.length; i++){
                    try{
                        let boolres = grading.grade(arr[i]);
                        let splitarr = grading.splitStr(arr[i]);
                        if(boolres){
                            gradingres += (splitarr[1].trim() + '번 ( ' + splitarr[2].trim() + ' ) 정답\n');
                            answercnt++;
                        }else{
                            gradingres += (splitarr[1].trim() + '번 ( ' + splitarr[2].trim() + ' ) 오답\n');
                            wrongcnt++;
                        }
                    }catch{}
                }
                let score = answercnt / (answercnt + wrongcnt) * 100;
                gradingres += ('\n\n*** 맞은 문제수 : ' + answercnt) + '문제\n';
                gradingres += ('*** 틀린 문제수 : ' + wrongcnt + '문제\n');
                gradingres += ('\n### 점수는 ' + Math.round(score) + '점 입니다!   ( ⁎ᵕᴗᵕ⁎ )');

            }catch{
                gradingres = '채점 실패';
            }
            send = {
                'message':{
                    'text': gradingres
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['인식결과', '소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }
            break;
    
            default:
            vision(content);
            send = {
                'message':{
                    'text': '==========\n이미지 처리중 입니다. 약 1분 후 결과보기를 선택해주세요.\n==========\n\n(서버에서 이미지를 처리할 시간이 필요합니다. 처리전에 결과를 보면 오류가 발생합니다. 만약 오류 발생시 채팅방을 나가고 다시 들어와주세요.)',
                    'photo': {
                        "url": content,
                        "width": 480,
                        "height": 640
                    },
                    "message_button": {
                        "label": "전송한 이미지 보기",
                        "url": content
                    }
                },
                'keyboard':{
                    'type': 'buttons',
                    'buttons': ['인식결과', '채점결과', '소개', '사용법', '답안지 양식', '제작정보(테스트이미지)', '@사용하기@']
                }
            }

            break;
        }
    }else if(type === "photo"){
        // vision(content);
        //     send = {
        //         'message':{
        //             'text': '약 1분 후 결과보기를 선택해주세요.'
        //         },
        //         'keyboard':{
        //             'type': 'buttons',
        //             'buttons': ['결과보기']
        //         }
        //     }
        send = {
            'message':{
                'text': '+버튼을 눌렀을 때 나오는 카카오톡 자체 사진 전송기능 이용시 현재 카카오 서버에서 알 수 없는 형식으로 이미지를 보내 정상적인 처리가 되지 않습니다. 방법은 찾았으나 이를 해결시 서버 트래픽 문제로 직접 사진 URL을 만들어서 전송해주세요.'
            },
            'keyboard':{
                'type': 'buttons',
                'buttons': ['소개', '사용법', '제작정보(테스트이미지)', '답안지 양식', '@사용하기@']
            }
        }
    }



    res.json(send);
});

module.exports = router;
