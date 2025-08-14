export default async function handler(req, res) {
  const { url } = req.query
  if (!url) {
    return res.status(400).send('Missing image URL')
  }

  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()

    // Copie les headers mais supprime Set-Cookie
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'set-cookie') {
        res.setHeader(key, value)
      }
    })

    res.status(200).send(Buffer.from(arrayBuffer))
  } catch (err) {
    res.status(500).send('Error fetching image')
  }
}
