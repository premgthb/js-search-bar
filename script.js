const userCardTemplate = document.querySelector('[data-user-template]')
const userCardContainer = document.querySelector('[data-user-container]')
const searchInput = document.querySelector('[data-search]')

let users = []

searchInput.addEventListener('input', e => {
  const value = e.target.value

  users.forEach(user => {
    console.log(user)
    let name = user.name.toLowerCase()
    let email = user.email.toLowerCase()
    const isVisible = name.includes(value) || email.includes(value)
    user.element.classList.toggle('hide', !isVisible)
  })
})

fetch('https://dummyjson.com/users?limit=100')
  .then(res => res.json())
  .then(data => {
    console.log(data.users)
    users = data.users.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector('[data-header]')
      const body = card.querySelector('[data-body]')
      header.textContent = user.firstName + ' ' + user.lastName
      body.textContent = user.email
      userCardContainer.append(card)
      console.log(card)

      return {
        name: header.textContent,
        email: user.email,
        element: card,
      }
    })
  })
