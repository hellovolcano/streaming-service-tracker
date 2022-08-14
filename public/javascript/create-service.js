const newServiceHandler = async (event) => {
    event.preventDefault()

    // get the content from the service
    const name = document.querySelector("#service-name").value
    const cost = document.querySelector("#service-cost").value
    const recurrence = document.querySelector("#service-recurrence").value
    const renewalDate = document.querySelector("#service-renewal-date").value
    let isActive = document.querySelector("#service-active").value

    // format isActive to bool
    if (isActive == 'yes') {
        isActive = true
    } else {
        isActive = false
    }

    // make a post request to create the service
    if (name && cost && recurrence && renewalDate && isActive) {
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