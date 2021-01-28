const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    paintGreeting(currentValue, currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function getHours(){
    const date = new Date();
    const hours = date.getHours();
    return hours;
}

function paintGreeting(hours, text){
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    let greetMes = "message";

    if(hours === text){
        hours = getHours();
        setInterval(getHours, 180000);
    }
    
    if(hours >= 5 && hours<=11){
        greetMes = "Morning";
    } else if(hours >= 12 && hours <= 16){
        greetMes = "Afternoon";
    } else if(hours >= 17 && hours <= 20){
        greetMes = "Evening";
    } else {
        greetMes = "Night";
    }
    greetings.innerText = `Good ${greetMes}, ${text}!`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        const currentHour = getHours();
        setInterval(getHours, 180000);
        paintGreeting(currentHour, currentUser);
    }
}

function init(){
    loadName();
}

init();
