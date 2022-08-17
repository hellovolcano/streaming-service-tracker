// adds a class to each subscription in the dashboard so it's color coded by status
const addSubscriptionContext = () => {
    const activeSubscriptions = document.querySelectorAll('[data-active="true"]')
    const inactiveSubscriptions = document.querySelectorAll('[data-active="false"]')

    activeSubscriptions.forEach(sub => {
        sub.classList.add('active-subscription')
    })

    inactiveSubscriptions.forEach(sub => {
        sub.classList.add('inactive-subscription')
    })
}

addSubscriptionContext()