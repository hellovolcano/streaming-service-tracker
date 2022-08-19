const editShowHandler = async(event) => {
    event.preventDefault()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    // get the content from the service
    const name = document.querySelector("#service-name").value
    const premiereDate = document.querySelector("#premiere-date").value
    const service_id = document.querySelector("#services-dropdown").value

    console.log(name + premiereDate + service_id)
    // make a post request to create the service
    if (name && premiereDate && service_id) {
        const response = await fetch(`/api/shows/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                premiereDate: premiereDate,
                service_id: service_id
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

document.querySelector('#edit-show').addEventListener('submit', editShowHandler)