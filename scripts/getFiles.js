
document.querySelector("#captureFile").addEventListener("change", function(){
    // console.log(files);
    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    console.log(this.files);
    //filereader converts to data url
    const reader = new FileReader();
    // console.log(reader);
    // console.log(reader.result);
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const pictureName = this.files[0].name;

    // const galeria = document.querySelector("#gallery");
    

    reader.addEventListener("load", ()=>{
        // console.log(reader.result);
        // console.log(pictureName);
        try{
            localStorage.setItem(`${pictureName}`, reader.result);
            preview.src = reader.result;

            //agrega imgs a galeria
            //refactor code l8r
            // const img = document.createElement("img");
            // img.src = localStorage.getItem(pictureName);
            // img.className = "img-fluid";
            // console.log(img);
            // galeria.appendChild(img);
            addImgs(pictureName);

        } catch (e){
            console.log(e);
            alert("NOPE");
        }
            
    });

    if (file) {
        reader.readAsDataURL(file);
      }

});

//función para agregar imagenes a la galería
function addImgs(imagen){
    const galeria = document.querySelector("#gallery");
    const img = document.createElement("img");
    const text = document.createElement("p");

    const slide = document.createElement("div");

    img.src = localStorage.getItem(imagen);
    img.className = "img-fluid";
    // console.log(img);
    console.log(imagen);
    text.textContent = imagen;
    text.className = "text";
    text.className = "centered";

    slide.appendChild(img);
    slide.appendChild(text);

    galeria.appendChild(slide);

}

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    console.log(event);

    // for(let k in localStorage){
    //     console.log(localStorage.getItem(k));
    // }
    // const galeria = document.querySelector("#gallery");

    Object.keys(localStorage).forEach(function(key){
        addImgs(key);
     });

  });




