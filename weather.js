const weather = document.querySelector(".js-weather");

const API_KEY = "04d68b5673ac791e15d0ec0029f37171";
const COORDS = "coords";

//????
/* errors
-weather.js:24 [Violation] Only request geolocation information in response to a user gesture.
=> http 상에서 보안이 안됐을 때 정보 가져오는 것 방지하는 에러. 해결: https에서 하기/크롬 설정-위치정보 허용으로 만들기
-element 상에선 보이는데, 실제로 화면엔 보이지 않는 상황: 변수 이름이나 함수 사용이나 오타나 기타등등의 상황 때문일 수 있다.
=> 아래 getWeather 함수에서, weather라는 상수를 생각 안하고, 함수 안에서 weather=json.weather[0].temp 를 썼다가 계속 안나왔다. 그래서 변수 이름을 바꿨더니 제대로 됨.
-weather.js:10 Uncaught (in promise) TypeError: Failed to execute 'json' on 'Response': body stream already read
=> response()는 한번만 호출돼야 하는데, 자동으로 reload 되면서 자꾸 호출돼서 오류 뜨는걸로 추정
*/
function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const weatherIs = json.weather[0].main;
        weather.innerText = `${weatherIs} , ${temperature}°C\n${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("cannot access position")
}

/*
weather.js:24 [Violation] Only request geolocation information in response to a user gesture.
=> 위에서 썼듯, https 혹은 크롬-위치정보 허용으로 해결
*/
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null){
        weather.innerText = 'loading info...';
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();