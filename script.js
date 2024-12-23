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
        input.value=''
        }, 500)
        console.log(value)
        if(div.className==='infoWeathe') {
            div.classList.add('new')
        }
        else {
            div.classList.remove('new')
        }
        input.blur()
    })
    .catch(error => {
        console.log(error)
        let div = document.querySelector('.infoWeathe')
        div.innerHTML=''
        alert('There is no such place!')
    })
}
btn.addEventListener('click', allInfoWeather)
document.addEventListener('keydown', function() {
    if(event.key==='Enter') {
        allInfoWeather()
    }
})
let comments = document.querySelector('.comments');
let commentsName = document.querySelector('.comments_name');
let send = document.querySelector('.send')
function Comments() {
    let commentsValue = comments.value
    let commentsNameValue = commentsName.value
    localStorage.setItem('name', commentsNameValue)
    localStorage.setItem('comment', commentsValue)
    /* let name = document.querySelector('.name')
    let userComment = document.querySelector('.user_comment') */
    let allUserComments = document.querySelector('.allUser_comments')
    let userDiv = document.createElement('div')
    let userName = document.createElement('h2')
    let userComment = document.createElement('h2')
    allUserComments.appendChild(userDiv)
    userDiv.appendChild(userName)
    userDiv.appendChild(userComment)
    let getLocalName = localStorage.getItem('name')
    let getLocalComment = localStorage.getItem('comment')
    userName.textContent='Name: ' + getLocalName
    userComment.textContent='Comment: ' + getLocalComment
    userDiv.className='right_comments'
    userName.className='name'
    userComment.className='user_comment'
    if(commentsValue==='' && commentsNameValue==='') {
        alert('You did not enter a comment or name')
        allUserComments.removeChild(userDiv)
    }
    else {
        comments.value = '';
        commentsName.value = '';
    }
}
send.addEventListener('click', Comments)
window.addEventListener('keydown', function() {
    if(event.key==='Enter') {
        Comments()
    }
})

const commentsArray = [
    { name: "Алексей", comment: "Отличная работа!" },
    { name: "Мария", comment: "Мне это понравилось." },
    { name: "Иван", comment: "Нужно больше деталей." },
    { name: "Ольга", comment: "Супер, продолжайте в том же духе!" },
    {name: "Олег", comment: "Молодцы!"},
    {name: "Jack", comment: "Super!"},
    {name: "Mikle", comment: "Need more details"},
    {name: "Veronika", comment: "Well done!"},
    {name: "Jessica", comment: "Looks beautiful!"},
    {name: "Harry", comment: "It's magic"}
];
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function createCommentDiv() {
    const { name, comment } = getRandomElement(commentsArray);
    const randomDiv = document.createElement('div');
    randomDiv.className='randomDiv'
    /* randomDiv.classList.add('show') */
    const h2Name = document.createElement('h2');
    h2Name.textContent = `Name: ${name}`;
    randomDiv.appendChild(h2Name);
    const h2Comment = document.createElement('h2');
    h2Comment.textContent = `Comment: ${comment}`;
    randomDiv.appendChild(h2Comment);
    let allUserComments = document.querySelector('.allUser_comments')
    allUserComments.appendChild(randomDiv)
}
setInterval(createCommentDiv, 20000);