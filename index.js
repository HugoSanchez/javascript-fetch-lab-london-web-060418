document.getElementById('search').addEventListener('click', () => {
  createIssue()
})

function getIssues() {
  fetch('https://api.github.com/repos/HugoSanchez/javascript-fetch-lab/issues', {
    headers: {
      Authorization: getToken()
    }
  }).then(res => res.json()).then(json => showIssues(json))
}

function showIssues(json) {
  const parent = document.querySelector('#issues')
  console.log(json[0])

  for (let issue of json) {
    let issueDiv = document.createElement('div')
    let issueTitle = document.createElement('h5')
    issueTitle.innerText = issue.title
    let issueText = document.createElement('p')
    issueText.innerText = issue.body
    let issueUrl = document.createElement('a')
    issueUrl.href = issue.html_url
    issueUrl.target = '_blank'
    issueUrl.innerText = issue.html_url
    issueDiv.append(issueTitle, issueText, issueUrl)
    parent.appendChild(issueDiv)
  }
}

function createIssue() {
  let issueTitle = document.querySelector('#title').value
  let issueBody = document.querySelector('#body').value
  fetch('https://api.github.com/repos/HugoSanchez/javascript-fetch-lab/issues', {
    method: 'POST',
    body: JSON.stringify({
      'title': issueTitle,
      'body': issueBody
    }),
    headers: {
      Authorization: getToken(),
    }
  }).then(getIssues())
}

function showResults(url) {
  console.log(url)
  let element = document.createElement('a')
  element.href = url
  element.innerText = url
  element.target = '_blank'
  document.querySelector('#results').appendChild(element)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch('https://api.github.com/repos/learn-co-curriculum/javascript-fetch-lab/forks', {
    method: 'POST',
    headers: {
      Authorization: getToken()
    }
  })
  .then(res => res.json())
  .then(json => showResults(json.clone_url));
}

function getToken() {
  return 'token 6927d1f770638e71982ba363103ece5b74ef337d'
}
