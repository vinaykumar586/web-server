console.log("Client side language");

fetch("https://puzzle.mead.io/puzzle",{
    method: 'GET'
}).then((response) =>{
    response.json().then((data) =>{
        console.log(data)
    })
})
.catch((e) => {
    console.log(e)
})
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const getWeather = async(address) => {
    const geocodeURL = `http://localhost:3001/weather?address=${address}`
    await fetch(geocodeURL).then((response) => {
        console.log(response)
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageOne.style.color ='red'
            } else {
                console.log(data)
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                messageOne.style.color ='green'
                messageTwo.style.color ='green'
            }
        })
    })
        .catch((e) => {
            console.log(e)
        })
}
const weatherForm =document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value;
    console.log(e, location, search)
    getWeather(location)

})

search.addEventListener('onchange',(e)=>{
    const searchValue =e.target.value;
    console.log(searchValue)
})
