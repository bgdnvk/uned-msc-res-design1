//https://css-tricks.com/almanac/properties/f/filter/
//me imagino que esto se podría hacer con una única funcion con un switch

function sepia(){
    clearFilters();
    preview.classList.add("sepia");
}

function hue(){
    clearFilters();
    preview.classList.add("hue");
}

function saturate(){
    clearFilters();
    preview.classList.add("saturate");
}

function blurr(){
    clearFilters();
    preview.classList.add("blurr");
}

function contrast(){
    clearFilters();
    preview.classList.add("contrast");
}

function clearFilters(){
    console.log("click clear");
    preview.className = "";
}