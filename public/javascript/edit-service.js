const editServiceHandler = async(event) => {
    event.preventDefault()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    // get the content from the service
    const name = document.querySelector("#service-name").value
    const cost = document.querySelector("#service-cost").value
    const recurrence = document.querySelector("#service-recurrence").value
    const renewalDate = document.querySelector("#service-renewal-date").value
    const isActive = document.getElementById("active").checked


    // make a post request to create the service
    if (name && cost && recurrence && renewalDate) {
        const response = await fetch(`/api/services/${id}`, {
            method: 'PUT',
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
        
        console.log(response.statusText)

        if(response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
        
    }
}

document.querySelector('.edit-service').addEventListener('submit', editServiceHandler)