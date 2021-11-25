const searchFormInput = document.querySelector('#advanced-search-form'); 
const searchBtn = document.querySelector('#adv-search-btn');
const categoriesForm = document.querySelector('#categories-form'); 
const popularityForm = document.querySelector('#popularity-form'); 
const topArtistForm = document.querySelector('#top-artists-form'); 
const lyricsForm = document.querySelector('#lyrics-form'); 
const genreForm = document.querySelector('#genre-form'); 
// const artistCategoryInput = document.querySelector('#artistCategory');
// const songCategoryInput = document.querySelector('#songCategory'); 
// const genreCategoryInput = document.querySelector('#lyricCategory'); 
// const zeroToTenPop = document.querySelector('#zeroToTen'); 
// const tenToTwentyFivePop = document.querySelector('#tenToTwentyFive'); 
// const twentyFivetoFiftyPop = document.querySelector('#twentyFiveToFifty')
// const fiftyToSeventyFivePop = document.querySelector('#fiftyToSeventyFive'); 
// const seventyFiveandUpPop = document.querySelector('#seventyFiveandUp'); 
// const topMaroon5 = document.querySelector('#maroon5'); 
// const topQueen = document.querySelector('#queen'); 
// const topGaga = document.querySelector('#gaga'); 
// const topGrande = document.querySelector('#ariana'); 
// const topEminem = document.querySelector('#eminem'); 
// const babyLyric = document.querySelector('#babyKey'); 
// const dieLyric = document.querySelector('#dieKey'); 
// const loveLyric = document.querySelector('#loveKey'); 
// const nightLyric = document.querySelector('#nightKey'); 
// const rockLyric = document.querySelector('#rockKey'); 
// const timeLyric = document.querySelector('#timeKey'); 
// const blueGenre = document.querySelector('#bluesGenre'); 
// const classRockGenre = document.querySelector('#classicRockGenre'); 
// const countryGenre = document.querySelector('#countryGenre'); 
// const folkGenre = document.querySelector('#folkGenre'); 
// const hardcoreGenre = document.querySelector('#hardcoreGenre'); 
// const hiphopGenre = document.querySelector('#hiphopGenre'); 
// const indieGenre = document.querySelector('#indieGenre'); 
// const instrumentalGenre = document.querySelector('#instrumentalGenre'); 
// const jazzGenre = document.querySelector('#jazzGenre'); 
// const kpopGenre = document.querySelector('#kpopGenre'); 
// const metalGenre = document.querySelector('#metalGenre'); 
// const popGenre = document.querySelector('#popGenre'); 
// const popRockGenre = document.querySelector('#popRockGenre'); 
// const punkGenre = document.querySelector('#punkRockGenre'); 
// const rbGenre = document.querySelector('#rbGenre'); 
// const rapGenre = document.querySelector('#rapGenre'); 
// const reggaeGenre = document.querySelector('#reggaeGenre'); 
// const rockGenre = document.querySelector('#rockGenre'); 




searchFormInput.addEventListener('submit', advancedSearch); 

async function advancedSearch(event){
    event.preventDefault(); 

    const textFormData = new FormData(searchFormInput); 
    const textInput = Array.from(textFormData.entries()); 

    const categoriesFormData = new FormData(categoriesForm); 
    const categoriesCheckedBox = Array.from(categoriesFormData.keys()).map((x)=> ["categories", x]);

    const popularityFormData = new FormData(popularityForm); 
    const popularitySelection = Array.from(popularityFormData.entries()); 
    
    const topArtistFormData = new FormData(topArtistForm); 
    const topArtistCheckedBox = Array.from(topArtistFormData.keys()).map((x)=> ["artist", x]); //Returns Array of the names of the checked boxes
    
    const lyricsFormData = new FormData(lyricsForm); 
    const lyricsCheckedBox = Array.from(lyricsFormData.keys()).map((x)=> ["lyrics", x]);

    const genreFormData = new FormData(genreForm); 
    const genreCheckedBox = Array.from(genreFormData.keys()).map((x)=> ["genre", x]);

    const searchParams = new URLSearchParams([...textInput, ...categoriesCheckedBox, ...popularitySelection, ...topArtistCheckedBox, ...lyricsCheckedBox, ...genreCheckedBox]); 
    console.log(searchParams.toString()); 

    let url = window.location.origin + "/advanced/search?" + searchParams.toString(); 

    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json(); 
            loadArtistHTMLTable(data); 
            loadSongHTMLTable(data); }
        else {
            throw new Error(response.statusText); 
        }
    }catch(err){
        console.error(err); 
    } 


    
}

function loadArtistHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ artistName, artistLink}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${artistName}</td>`; 
        tableHtml += `<td>${artistLink}</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function loadSongHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({songName, songLink}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${songName}</td>`; 
        tableHtml += `<td>${songLink}</td>`; 
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}