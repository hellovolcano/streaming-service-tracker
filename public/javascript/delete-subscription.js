async function deleteSubscriptionHandler() {

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }
}

document.querySelector("#delete-subscription").addEventListener('click', deleteSubscriptionHandler)