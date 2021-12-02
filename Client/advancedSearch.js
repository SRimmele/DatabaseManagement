const searchFormInput = document.querySelector('#advanced-search-form')
const searchBtn = document.querySelector('#adv-search-btn')
const categoriesForm = document.querySelector('#categories-form')
const popularityForm = document.querySelector('#popularity-form')
const topArtistForm = document.querySelector('#top-artists-form')
const lyricsForm = document.querySelector('#lyrics-form')
const genreForm = document.querySelector('#genre-form')

searchFormInput.addEventListener('submit', advancedSearch)

async function advancedSearch(event) {
    event.preventDefault()

    const textFormData = new FormData(searchFormInput)
    const textInput = Array.from(textFormData.entries())

    const categoriesFormData = new FormData(categoriesForm)
    const categoriesCheckedBox = Array.from(categoriesFormData.keys()).map(
        (x) => ['categories', x]
    )

    const popularityFormData = new FormData(popularityForm)
    const popularitySelection = Array.from(popularityFormData.entries())

    const topArtistFormData = new FormData(topArtistForm)
    const topArtistCheckedBox = Array.from(topArtistFormData.keys()).map(
        (x) => ['artist', x]
    ) //Returns Array of the names of the checked boxes

    const lyricsFormData = new FormData(lyricsForm)
    const lyricsCheckedBox = Array.from(lyricsFormData.keys()).map((x) => [
        'lyrics',
        x
    ])

    const genreFormData = new FormData(genreForm)
    const genreCheckedBox = Array.from(genreFormData.keys()).map((x) => [
        'genre',
        x
    ])

    const searchParams = new URLSearchParams([
        ...textInput,
        ...categoriesCheckedBox,
        ...popularitySelection,
        ...topArtistCheckedBox,
        ...lyricsCheckedBox,
        ...genreCheckedBox
    ])
    console.log(searchParams.toString())

    let url =
        window.location.origin + '/advanced/search?' + searchParams.toString()

    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            loadArtistHTMLTable(data)
            loadSongHTMLTable(data)
        } else {
            throw new Error(response.statusText)
        }
    } catch (err) {
        console.error(err)
    }
}

function loadArtistHTMLTable(data) {
    const table = document.querySelector('#artistTable tbody')

    if (data.length === 0) {
        table.innerHTML =
            "<tr><td class='no-data' colspan='8'>No good matches for your search</td></tr>"
        return
    }

    let tableHtml = ''
    let count = 1

    tableHtml += "<thead>"
    tableHtml += "<tr>"
    tableHtml += "<th scope = 'col' colspan='3' class = 'text-center'>"
    tableHtml += "Artist Results"
    tableHtml += "</th>"
    tableHtml += "</tr>"
    tableHtml += "</thead>"
    tableHtml += "<tbody>"

    data = data.filter(
        (value, index) =>
            data.findIndex((x) => x.artistName === value.artistName) === index
    )

    data.forEach(function ({artistID, artistName}) {
        tableHtml += '<tr>'
        tableHtml += `<td class = "text-center">${count}</td>`
        tableHtml += `<td>${artistName}</td>`
        tableHtml += `<td><button class="btn btn-secondary redirect-row-btn" onclick="window.location.href='/artistSearchResults?artistID=${artistID}'"> More Info </td>`
        tableHtml += '</tr>'

        ++count
    })

    tableHtml += '</tbody>'

    table.innerHTML = tableHtml
}

function loadSongHTMLTable(data) {
    const table = document.querySelector('#songTable tbody')

    if (data.length === 0) {
        table.innerHTML =
            "<tr><td class='no-data' colspan='8'>No good matches for your search</td></tr>"
        return
    }

    let tableHtml = ''
    let count = 1

    tableHtml += "<thead>"
    tableHtml += "<tr>"
    tableHtml += "<th scope = 'col' colspan='3' class = 'text-center'>"
    tableHtml += "Song Results"
    tableHtml += "</th>"
    tableHtml += "</tr>"
    tableHtml += "</thead>"
    tableHtml += "<tbody>"

    data.forEach(function ({songID, songName}) {
        tableHtml += '<tr>'
        tableHtml += `<td class = 'text-center'>${count}</td>`
        tableHtml += `<td>${songName}</td>`
        tableHtml += `<td><button class="btn btn-secondary redirect-row-btn" onclick="window.location.href='/songSearchResult?songID=${songID}'"> More Info </td>`
        tableHtml += '</tr>'

        ++count
    })

    tableHtml += '</tbody>'

    table.innerHTML = tableHtml
}