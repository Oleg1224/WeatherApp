let btn = document.querySelector('.btn');
function allInfoWeather() {
    let input = document.querySelector('.city');
    let inputValue = input.value
    let APIKEY = 'ae116c054d60dd3dee7f688e2325540e'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${APIKEY}&units=metric`, {method: 'GET'})
    .then(Response => {
        if(!Response.ok) {
            console.log('error')
        }
        return Response.json()
    })
    .then(value => {
        /* div в котом хранится вся информация про погоду */
        let div = document.querySelector('.infoWeathe')
        div.style.transform = 'scale(0)';
        setTimeout(()=>{
        div.innerHTML=''
        if(div.innerHTML!=='') {
            div.innerHTML=''
        }
        let h2 = document.createElement('h2')
        h2.textContent=value.name
        div.appendChild(h2)
        h2.className='namePlace'
        let boxForTemp = document.createElement('div')
        let boxTemperature = document.createElement('div')
        let h2Temp = document.createElement('h2')
        h2Temp.textContent='Temperature°'
        h2Temp.className='h2Temp'
        div.appendChild(boxTemperature)
        boxTemperature.appendChild(boxForTemp)
        boxTemperature.appendChild(h2Temp)
        boxTemperature.className='boxTemperature'
        let tempMin = document.createElement('p')
        let tempMinRound = Math.round(value.main.temp_min)
        tempMin.textContent='Min: '+tempMinRound+'°'
        let temp = document.createElement('p')
        let tempRound = Math.round(value.main.temp)
        temp.textContent='Average: '+tempRound+'°'
        let tempMax = document.createElement('p')
        let tempMaxRound = Math.round(value.main.temp_max)
        tempMax.textContent='Max: '+tempMaxRound+'°'
        boxForTemp.appendChild(tempMax)
        boxForTemp.appendChild(temp)
        boxForTemp.appendChild(tempMin)
        div.appendChild(boxForTemp)
        boxForTemp.className='boxForTemp'
        let boxWind = document.createElement('div')
        div.appendChild(boxWind)
        let windh2 = document.createElement('h2')
        boxWind.appendChild(windh2)
        boxWind.className='boxWind'
        windh2.textContent='Windiness: '+'speed-'+value.wind.speed+'  '+'deg-'+value.wind.deg
        let boxCloud = document.createElement('div')
        div.appendChild(boxCloud)
        let cloudh2 = document.createElement('h2')
        cloudh2.textContent='Cloudiness: '+value.clouds.all
        boxCloud.appendChild(cloudh2)
        boxCloud.className='boxCloud'
        div.style.transform = 'scale(1)';
        }, 500)
        console.log(value)
        if(div.className==='infoWeathe') {
            div.classList.add('new')
        }
        else {
            div.classList.remove('new')
        }
        input.blur()
        /* if(div.style.transform.scale=1) {
            div.classList.add('new')
        } */
    })
    .catch(error => {
        console.log(error)
        if(error) {
            let div = document.querySelector('.infoWeathe')
            div.innerHTML=''
            alert('There is no such place!')
        }
    })
}
btn.addEventListener('click', allInfoWeather)
document.addEventListener('keydown', function() {
    if(event.key==='Enter') {
        allInfoWeather()
    }
})