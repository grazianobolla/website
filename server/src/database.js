const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

function checkError(err, result) {
    if (result.length < 1)
        return true

    if (err) {
        console.error(err)
        return true
    }

    return false
}

function getEntries(callback) {
    db.query("SELECT `id`, `title`, `image`, `date` FROM `entries`",
        function (err, result, fields) {
            if (!checkError(err, result))
                callback(result)

            else callback(false)
        })
}

function getEntryMeta(id, callback) {
    db.execute("SELECT `title`, `description`, `date`, `image` FROM `entries` WHERE `id` = ? LIMIT 1", [id],
        function (err, result, fields) {
            if (!checkError(err, result))
                callback(result[0])

            else callback(false)
        })
}

function getEntryData(id, callback) {
    db.execute("SELECT * FROM `entries` WHERE `id` = ? LIMIT 1", [id],
        function (err, result, fields) {
            if (!checkError(err, result))
                callback(result[0])

            else callback(false)
        })
}

function generateSitemap(callback) {
    db.query("SELECT `id` FROM `entries`", function (err, result, fields) {
        let sitemap_str = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

        sitemap_str = sitemap_str.concat(
            `<url><loc>${process.env.SITE_URL}</loc><changefreq>monthly</changefreq></url>\n`
        )

        result.forEach(entry => {
            sitemap_str = sitemap_str.concat(
                `<url><loc>${process.env.SITE_URL}/page/${entry.id}</loc><changefreq>weekly</changefreq></url>\n`
            )
        })

        sitemap_str = sitemap_str.concat('</urlset>')

        return callback(sitemap_str)
    })
}

function newEntry(data, callback) {
    const { title, image, description, markdown } = data
    const date = new Date().toJSON().slice(0, 10)
    const id = title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g, '-').toLowerCase()

    db.execute("INSERT INTO `entries` (`id`, `title`, `image`, `description`, `data`, `date`) VALUES (?, ?, ?, ?, ?, ?)",
        [id, title, image, description, markdown, date], function (err, results, fields) {
            if (!checkError(err, results)) {
                callback(true)
                console.log('creating entry', id)
            }
            else callback(false)
        })
}

function updateEntry(data, callback) {
    const { id, title, image, description, markdown } = data

    db.execute("UPDATE `entries` SET `title` = ?, `image` = ?, `description` = ?, data = ? WHERE `id`= ? LIMIT 1",
        [title, image, description, markdown, id], function (err, results, fields) {
            if (!checkError(err, results)) {
                callback(true)
                console.log('updating entry', id)
            }
            else callback(false)
        })
}

function deleteEntry(id, callback) {
    console.log('deleting entry', id)

    db.execute("DELETE FROM `entries` WHERE `id` = ?",
        [id], function (err, results, fields) {
            if (!checkError(err, results))
                callback(true)
            else callback(false)
        })
}

module.exports = { getEntries, getEntryMeta, getEntryData, generateSitemap, updateEntry, newEntry, deleteEntry }