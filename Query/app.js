const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
let posts = {}
app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'Created Posts') {
        const { id, title } = data
        posts[id] = { id, title, comments: [] }
    }
    if (type === 'Created Comment') {
        const { id, content, postId } = data
        const post = posts[postId]
        post.comments.push({ id, content })
    }
    console.log(posts)
    res.send({})
})

app.get('/posts', (req, res) => {
    res.send(posts)
})
app.listen(4002, () => {
    console.log('Server is runnig on 4002')
})