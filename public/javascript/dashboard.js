// adds a class to each subscription in the dashboard so it's color coded by status
const addSubscriptionContext = () => {
    const activeSubscriptions = document.querySelectorAll('[data-active="1"]')
    const inactiveSubscriptions = document.querySelectorAll('[data-active="0"]')
    
    console.log(activeSubscriptions)
    console.log(inactiveSubscriptions)

    console.log(typeof(activeSubscriptions))
    activeSubscriptions.forEach(sub => {
        sub.classList.add('active-subscription')
    })

    inactiveSubscriptions.forEach(sub => {
        sub.classList.add('inactive-subscription')
    })
}

addSubscriptionContext()