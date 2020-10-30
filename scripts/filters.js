//https://css-tricks.com/almanac/properties/f/filter/
//me imagino que esto se podría hacer con una única funcion con un switcj

function sepia(){
    preview.classList.add("sepia");
}

function hue(){
    preview.classList.add("hue");

}

function saturate(){
    preview.classList.add("saturate");
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