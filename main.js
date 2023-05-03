addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const end_point = `https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/?type=cname`
  const response = await fetch(end_point, {
    headers: {
      'X-Auth-Email': AUTH_EMAIL,
      'Authorization': `Bearer ${AUTH_KEY}`,
      'Content-Type': 'application/json'
    }
  })

  const results = await response.json()
  const records = results.result.filter(record => record.name !== 'www')

  const html = records => `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>Projects tianheg built</title>
    </head>
    <body>
      <h1>Projects</h1>
      <ul id="projects"></ul>
      <script>
        window.projects = ${JSON.stringify(records)}
        const projectsContainer = document.getElementById('projects')
        window.projects.forEach(project => {
          const listElem = document.createElement('li')
          const linkElem = document.createElement('a')

          linkElem.href = 'https://' + project.name
          linkElem.target = '_blank'
          linkElem.textContent = project.name

          listElem.appendChild(linkElem)
          projectsContainer.appendChild(listElem)
        })
      </script>
    </body>
  </html>
  `

  return new Response(html(records), {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  })
}
