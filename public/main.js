console.log("client js file loaded")


const form = document.querySelector('form')
const input = document.querySelector('input')
const p = document.querySelector('#message-1')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = input.value

    fetch("/weather?address="+location).then((response) => {
    response.json().then((data) => {
        if(data.error) p.textContent = data.error
        else p.textContent = data.response
    })
})
})