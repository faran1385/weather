'use strict'

let $=document

const getStartedBtn=$.querySelector('.Sender')


class sendTo{
    constructor() {
        getStartedBtn.addEventListener('click',this.weatherPage)
    }
    weatherPage(){
        location.href='http://localhost:63342/Weather%20App/weather.html?_ijt=r7esvr4l2q94e4283m6k5ppcqt&_ij_reload=RELOAD_ON_SAVE'
    }
}

new sendTo()