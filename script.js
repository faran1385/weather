'use strict'

let $=document

const getStartedBtn=$.querySelector('.Sender')


class sendTo{
    constructor() {
        getStartedBtn.addEventListener('click',this.weatherPage)
    }
    weatherPage(){
        location.href='http://127.0.0.1:5500/weather.html'
    }
}

new sendTo()