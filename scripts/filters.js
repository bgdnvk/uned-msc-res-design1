//https://css-tricks.com/almanac/properties/f/filter/
//me imagino que esto se podría hacer con una única funcion con un switch

function sepia(){
    preview.classList.add("sepia");
    clearFilters();
}

function hue(){
    preview.classList.add("hue");
    clearFilters();

}

function saturate(){
    preview.classList.add("saturate");
    clearFilters();

}

function blurr(){
    preview.classList.add("blurr");
    clearFilters();

}

function contrast(){
    preview.classList.add("contrast");
    clearFilters();
}

function clearFilters(){
    console.log("click clear");
    preview.className = "";
}