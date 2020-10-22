
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
    const img = document.querySelector("#imagenGaleria");

    img.src = localStorage.getItem(imagen);
    // console.log(imagen);
    // console.log(galeria);
    addThumb(imagen);
    changeText(imagen);
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

//se agrega los thumbnails
function addThumb(img){
    const galeriaThumb = document.querySelector("#galeriaThumb");
    const imgThumb = document.createElement("img");

    imgThumb.src = localStorage.getItem(img);
    imgThumb.style.width = "200px";
    // imgThumb.height = "200px";
    galeriaThumb.appendChild(imgThumb);

  }

function changeText(imagen){
    const text = document.querySelector("#imageName");
    text.innerHTML = imagen; 


  }




