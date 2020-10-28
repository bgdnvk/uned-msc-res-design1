//https://css-tricks.com/almanac/properties/f/filter/
// const preview = document.querySelector('#imagenGaleria');

function sepia(){
    preview.classList.add("sepia");
}

function hue(){
    preview.classList.add("hue");

}

function blurr(){
    preview.classList.add("blurr");
}

function contrast(){
    preview.classList.add("contrast");

}

function clearFilters(){
    console.log("click clear");
    preview.className = "";
}