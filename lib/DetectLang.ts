const DetectLang = async (content: string) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    snippets: [content],
  })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow',
  }

  return fetch('https://lang.myst.rs/api/detect', requestOptions)
    .then((response) => response.json())
    .then((result) => result.languages[0])
    .catch((error) => console.log('error', error))
}

export default DetectLang
