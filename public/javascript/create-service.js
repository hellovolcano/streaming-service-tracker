const getActiveStatus = () => {
    const radioBtns = document.getElementsByName('is-service-active')


}

const newServiceHandler = async (event) => {
    event.preventDefault()

    // get the content from the service
    const name = document.querySelector("#service-name").value
    const cost = document.querySelector("#service-cost").value
    const recurrence = document.querySelector("#service-recurrence").value
    const renewalDate = document.querySelector("#service-renewal-date").value
    // If the active checkbox is checked, we'll set this variable to true; if it's not, it will be false
    // if the user selects neither, it will default to false
    const isActive = document.getElementById("active").checked


    // make a post request to create the service
    if (name && cost && recurrence && renewalDate) {
        const response = await fetch('/api/services', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                cost: cost,
                cost_basis: recurrence,
                auto_renewal_date: renewalDate,
                is_active: isActive
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