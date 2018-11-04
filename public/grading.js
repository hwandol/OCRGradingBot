const fs = require('fs');
let grading = {};

grading.arr = (str) => {
    return str.split("\n");
}

grading.splitStr = (str) => {
    let splitarr = str.split(":",3);
    return splitarr;
}

grading.grade = (str) => {
    let rawjson = fs.readFileSync('./public/answerSheet.json');
    let answerjson = JSON.parse(rawjson);
    const arr = grading.splitStr(str);
    const qnum = arr[1].trim();
    const answer = arr[2].trim();
    switch(qnum){
        case '1':
        if(answer === answerjson.one){
            return true;
        }else{
            return false;
        }
        break;

        case '2':
        if(answer === answerjson.two){
            return true;
        }else{
            return false;
        }
        break;

        case '3':
        if(answer === answerjson.three){
            return true;
        }else{
            return false;
        }
        break;

        case '4':
        if(answer === answerjson.four){
            return true;
        }else{
            return false;
        }
        break;

        case '5':
        if(answer === answerjson.five){
            return true;
        }else{
            return false;
        }
        break;

        case '6':
        if(answer === answerjson.six){
            return true;
        }else{
            return false;
        }
        break;

        case '7':
        if(answer === answerjson.seven){
            return true;
        }else{
            return false;
        }
        break;

        default:
            return false;
        break;
    }
}

module.exports = grading;
