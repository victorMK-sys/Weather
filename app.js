const dateString = document.getElementById('currentDate')
const date = new Date()
const day = date.toLocaleDateString('en-US', {day: "numeric"})
const month = date.toLocaleDateString('en-US', {month: "long"})
const year = date.toLocaleDateString('en-US', {year: "numeric"})


function formatElements() {
  
  dateString.innerHTML = `${day} ${month}, ${year}`
}

formatElements()