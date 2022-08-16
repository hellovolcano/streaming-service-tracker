const getActiveStatus = () => {
    const radioBtns = document.getElementsByName('is-service-active')


}

const newServiceHandler = async (event) => {
    event.preventDefault()

    // get the content from the service
    const name = document.querySelector("#service-name").value
    const cost = document.querySelector("#service-cost").value
    const recurrence = document.querySelector("#service-recurrence").value

    // make a post request to create the service
    if (name && cost && recurrence) {
        const response = await fetch('/api/services', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                cost: cost,
                cost_basis: recurrence
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })

        if(response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
        
    }
}

document.querySelector(".new-service").addEventListener('submit', newServiceHandler)