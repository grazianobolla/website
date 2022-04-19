require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const { getEntries, getEntryMeta, getEntryData, generateSitemap, newEntry, updateEntry, deleteEntry } = require('./src/database')

const app = express()

app.use(express.static(path.join(__dirname, "static"), { index: false }))
app.use(bodyParser.json())

function replaceMeta(filepath, meta, callback) {
    const { title, description, URL, canonURL, image } = meta

    fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) {
            console.error(err)
        }

        data = data.replace(/\$PAGE_TITLE/g, title)
        data = data.replace(/\$PAGE_DESCRIPTION/g, description)
        data = data.replace(/\$PAGE_URL/g, URL)
        data = data.replace(/\$CANONICAL_URL/g, canonURL)
        data = data.replace(/\$PAGE_IMAGE/g, image)

        callback(data)
    })
}

function checkPassword(str) {
    return (str === process.env.ADMIN_PASSWORD)
}

//sites
app.get("/:var(blog|about-me|)", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'text/html')

    const filepath = path.join(__dirname, "static/index.html")

    const meta = {
        title: `Portfolio | ${process.env.DEFAULT_TITLE}`,
        description: process.env.DEFAULT_DESCRIPTION,
        URL: process.env.SITE_URL + req.url,
        canonURL: process.env.SITE_URL,
        image: ''
    }

    replaceMeta(filepath, meta, data => {
        res.send(data)
    })
})

app.get("/page/:entryid", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'text/html')
    const pageUrl = process.env.SITE_URL + req.url

    getEntryMeta(req.params.entryid, metadata => {
        if (!metadata) {
            res.redirect('/')
            return
        }

        const filepath = path.join(__dirname, "static/index.html")

        const meta = {
            title: metadata.title,
            description: metadata.description,
            URL: pageUrl,
            canonURL: pageUrl,
            image: metadata.image
        }

        replaceMeta(filepath, meta, data => {
            res.send(data)
        })
    })
})

app.get("/robots.txt", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'text/plain')
    res.send(`User-agent: *\nSitemap: ${process.env.SITE_URL}/sitemap.xml`)
})

app.get("/sitemap.xml", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'application/xml')
    generateSitemap(sitemap => {
        res.send(sitemap)
    })
})

//api calls
app.get("/api/entries", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'application/json')
    //TODO: add cache control

    getEntries(entries => {
        res.send(JSON.stringify(entries))
    })
})

app.get("/api/data", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Content-Type', 'application/json')
    //TODO: add cache control

    getEntryData(req.query.entryid || 'null', data => {
        res.send(JSON.stringify(data))
    })
})


app.post("/api/save", (req, res) => {
    if (!checkPassword(req.body.password)) {
        res.sendStatus(401)
        return
    }

    try {
        const data = req.body.data

        if (data.id === '-1') {
            newEntry(data, ok => {
                if (ok) res.status(200).send('Created new entry ' + data.title)
                else res.status(500).send('Could not create entry')
            })

            return
        }

        updateEntry(data, ok => {
            if (ok) res.status(200).send('Updated entry ' + data.title)
            else res.status(500).send('Could not update entry')
        })
    } catch {
        res.status(500).send('Error bad data')
    }
})

app.post("/api/delete", (req, res) => {
    if (!checkPassword(req.body.password)) {
        res.sendStatus(401)
        return
    }
    try {
        const id = req.body.id

        deleteEntry(id, ok => {
            if (ok) res.status(200).send('Deleted entry')
            else res.status(500).send('Could not delete entry')
        })
    } catch {
        res.status(500).send('Error bad data')
    }
})

app.all('*', function (req, res) {
    res.redirect('/')
})

app.listen(8080, '127.0.0.1', () => {
    console.log('listening on port 8080!')
})