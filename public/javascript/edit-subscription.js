async function editSubscriptionFormHandler(event) {
    event.preventDefault()

    // get the values from the add subscription form
    const subscription_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]
    const auto_renewal_date = document.querySelector('#auto_renewal_date').value
    let is_active = document.querySelector('#is_active').value

    // convert is_active to boolean
    if (is_active == "true") {
        is_active = true
    } else [
        is_active = false
    ]

    // check to ensure that the user entered a renewal date if they said the subscription was active
    if (is_active && !auto_renewal_date) {
        alert('Add an auto renewal date for your active subscription')
        return
    }

    // build an object to pass in to the fetch request based on selections
    const fetchObj = {
        is_active: is_active
    }

    // conditionally add the renewal date if it's an active subscription
    if (is_active) {
        fetchObj.auto_renewal_date = auto_renewal_date
    } 

    
    console.log(fetchObj)

    if (subscription_id) {
        const response = await fetch(`/api/subscriptions/${subscription_id}`, {
            method: 'PUT',
            body: JSON.stringify(fetchObj),
            headers: {
                'Content-Type':'application/json'
            }
        })

        if(response.ok) {
            // document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
        
    }
}

document.querySelector('.edit-subscription').addEventListener('submit', editSubscriptionFormHandler)