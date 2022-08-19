const newShowHandler = async (event) => {
    event.preventDefault()

    // get the content from the service
    const name = document.querySelector("#service-name").value
    const premiereDate = document.querySelector("#premiere_date").value
    const service_id = document.querySelector("#services-dropdown").value

    // make a post request to create the service
    if (name && premiereDate && service_id) {
        const response = await fetch('/api/shows', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                premiereDate: premiereDate,
                service_id: service_id
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

document.querySelector("#add-show-form").addEventListener('submit', newShowHandler)