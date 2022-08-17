// hide or display the auto renewal date when the dropdown is selected
const toggleRenewalDate = (event) => {
    event.preventDefault()

    const toggle = document.querySelector('#is_active').value

    const autoRenewDiv = document.querySelector("#toggle_ard_visibility")

    if (toggle) {
        autoRenewDiv.classList.remove('toggle-visibility')
    } else {
        autoRenewDiv.classList.add('toggle-visibility')
    }
}

async function addSubscriptionFormHandler(event) {
    event.preventDefault()

    // get the values from the add subscription form
    const service_id = window.location.toString().split('?')[
        window.location.toString().split('?').length - 1
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
        service_id: parseInt(service_id),
        is_active: is_active
    }

    // conditionally add the renewal date if it's an active subscription
    if (is_active) {
        fetchObj.auto_renewal_date = auto_renewal_date
    } 

    
    console.log(fetchObj)

    if (service_id) {
        const response = await fetch('/api/subscriptions', {
            method: 'POST',
            body: JSON.stringify(fetchObj),
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

// on button click
// grab the id of the service
// on submit, create a post request to add the 


// TODO: Get this to run each time the dropdown list is changed, not just the first time
document.querySelector('#is_active').addEventListener('change', toggleRenewalDate)
document.querySelector('#add-subscription-form').addEventListener('submit', addSubscriptionFormHandler)