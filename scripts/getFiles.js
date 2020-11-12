// ARR IMG
let arrImgs = [];
let totalImgs = arrImgs.length;
let currentImage = "";


const preview = document.querySelector('#imagenGaleria');
const savePictureBtn = document.getElementById("save-picture");
const savedCanvas = document.getElementById('saved-canvas');
savePictureBtn.addEventListener("click", saveImageFromCanvas);
let savedPictureCounter = 0;

//guardar img del canvas de la foto
function saveImageFromCanvas(){
    savedPictureCounter++;
    let imageName = `ImagenCam${savedPictureCounter}`;
    localStorage.setItem(imageName,canvas.toDataURL());
    console.log("imagefrom cam: "+imageName);
    addImgs(imageName);
}

//se borra todas las imagenes, tanto locales como a la vista
function deletePictures(){
    localStorage.clear();
    preview.src = "imgs/muestra.jpg"
    savedPictureCounter = 0;
    hideAddBtn();
    arrImgs = [];
    currentImage = "muestra.jpg"
    document.getElementById("galeriaThumb").innerHTML = "";
}


//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
document.querySelector('#captureFile').addEventListener("change", previewFile);

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", saveImage);

//ocultaro el boton de agregar
function hideAddBtn(){
    addBtn.style.display = "none";
}
hideAddBtn();

document.querySelector("#remove").addEventListener("click", removeImage);
const removeBtn = document.querySelector("#remove");
// removeBtn.style.display = "none";

//se usa para ver la imagen subida
function previewFile() {
    const {file, reader} = getFileReader();
    addBtn.style.display = "block";
    reader.addEventListener("load", function () {
      preview.src = reader.result;
      setText(file.name);
    }, false);
  }

//se lee la imagen subido y devuelve un obj con la información
function getFileReader(){
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
      }
    return {
        file: file,
        reader: reader
    };
}

//guardar la imagen al pulsar el btn +
function saveImage(){
    const {file, reader} = getFileReader();
    //check para comprobar si se ha subido una img
    if(arrImgs.length === 0 && reader.result === null){
        alert("Necesitas subir una foto");
    }
        reader.onload = () => {
            try {
                localStorage.setItem(`${file.name}`, reader.result);
                console.log("saved item");
                // console.log(file.name);
                // console.log(reader.result);
                addImgs(file.name);
            } catch (e){
                console.log(e);
                alert("NOPE");
            }

        } 
}
//se elimina la imagen al pulsar el btn +
function removeImage(){
    console.log("####inside removeImage");

    if(arrImgs.length === 0){
        alert("No hay nada que borrar");
    } else {
        let currentSlide = currentSlideName();
        // console.log("about to remove: "+currentSlide);
        // console.log("about to remove indx: "+currenntImgIndx());
        // console.log("arr b4 removing is "+arrImgs);
        let prevSlide = getPrevImg();
        preview.src = localStorage.getItem(prevSlide);
        // console.log("current picture is "+prevSlide);
        removeThumb(currentSlide);
        arrImgRemove(currentSlide);
        localStorage.removeItem(currentSlide);
        currentImage = prevSlide;
        setText(currentImage);
        console.log("currentImage is: ");
        console.log(currentImage);
        console.log("arr after removing is "+arrImgs);
        if(arrImgs.length === 0){
            preview.src = "imgs/muestra.jpg";
        }
    }
}

//función para agregar imagenes a la galería
function addImgs(imagen){
    const galeria = document.querySelector("#gallery");
    const img = document.querySelector("#imagenGaleria");
    console.log("dentro d addimgs");
    // console.log(img);
    img.src = localStorage.getItem(imagen);
    arrImgs.push(imagen);
    currentImage = imagen;
    // console.log(imagen);
    console.log("currentImage is "+imagen);
    // console.log(galeria);
    addThumb(imagen);
    setText(imagen);
}
//se carga la información local dentro de la página
window.addEventListener('load', () => {
    console.log('page is fully loaded');
    //no estoy seguro por qué este método no funciona
    // for(let k in localStorage){
    //     console.log(localStorage.getItem(k));
    // }
    // const galeria = document.querySelector("#gallery");
    Object.keys(localStorage).forEach(function(key){
        addImgs(key);
     });

     console.log("arr is");
     console.log(arrImgs);
  });
/**
 * 
 * ---------   Thumbnails
 */
//se agregan los thumbnails
function addThumb(img){
    const galeriaThumb = document.querySelector("#galeriaThumb");
    const imgThumb = document.createElement("img");
    //si la imagen ya existe se envía un error (alert)
    if(document.getElementById(img)){
        alert("Ya has agregado esta imagen!");
    } else {
        imgThumb.src = localStorage.getItem(img);
        imgThumb.style.width = "300px";
        imgThumb.style.height = "300px";
        imgThumb.id = img;
        imgThumb.className = "img-fluid";
        imgThumb.className = "img-thumbnail";

        galeriaThumb.appendChild(imgThumb);
    }
  }

function removeThumb(imgName){
    console.log("removing thumb: ");
    // console.log(imgName);
    let thumb = document.getElementById(imgName);
    // console.log(thumb);
    thumb.remove();
}

//recorte y manipulación de texto en el preview
function setText(imagen){
    const text = document.querySelector("#imageName");
    //no funciona con firefox?
    // imagen.substring(0, 10) === "ImagenCam" ? text.innerHTML = imagen : text.innerHTML = imagen.slice(0,-4); 
    if(imagen.substring(0, 9) === "ImagenCam"){
        text.innerHTML = imagen
    } else {
        text.innerHTML = imagen.slice(0,-4); 
    }
    // console.log(typeof(imagen));
  }

/**
 * ---------- Localicación y manipulación de las imagenes que tenemos ----------------
 */

//Local storage/array manipulación
function currenntImgIndx(){
    // console.log("----currentImgIndx is "+arrImgs.indexOf(currentSlideName()));
    console.log("----currentImgIndx is "+arrImgs.indexOf(currentImage));
    // console.log(arrImgs.indexOf(currentSlideName()));
    return arrImgs.indexOf(currentImage);
}

function arrImgAdd(imgName){
    arrImg.push(imgName);
}

function arrImgRemove(imgName){
    arrImgs.splice(arrImgs.indexOf(imgName), 1);
}

function getPrevImg(){
    if(arrImgs.length === 1){
        return currentSlideName();
    }

    if(currenntImgIndx() === 0){
        console.log(currentSlideName());
        console.log("the returned slide is "+arrImgs[arrImgs.length-1]);
        return arrImgs[arrImgs.length-1];
    }
    
    console.log("the img from previmg is");
    console.log(arrImgs[currenntImgIndx()-1]);
    return arrImgs[currenntImgIndx()-1];
}

function getNextImg(){
    // console.log(arrImgs.length);
    // console.log("^thats length");
    if(arrImgs.length === 1){
        return currentSlideName();
    }
    // console.log("inside getNextImg");
    // console.log(currentSlideName());
    // console.log(currenntImgIndx());
    if(currenntImgIndx() === arrImgs.length-1){
        // console.log(currentSlideName());
        return arrImgs[0];
    }
    // console.log(arrImgs[currenntImgIndx+1]);
    return arrImgs[currenntImgIndx()+1];
}


function nextSlide(){
    hideAddBtn();
    
    if(arrImgs.length === 0){
        alert("Necesitas Subir Una foto!")
    } else{
        currentImage = getNextImg();
        preview.src = localStorage.getItem(currentImage);
        setText(currentImage);
        console.log("inside nextSlide current img is "+currentImage);
    }
}

function prevSlide(){
    hideAddBtn();
    if(arrImgs.length === 0){
        alert("Necesitas Subir Una foto!")
    } else{
        currentImage = getPrevImg();
        preview.src = localStorage.getItem(currentImage);
        setText(currentImage);
        console.log("inside prevSlide current img is "+currentImage);
    }
}

function currentSlideValue(){
    const currentIndx = arrImgs.indexOf(currentImage);
    const currentImgName = arrImgs[currentIndx];
    return localStorage.getItem(currentImgName);
}

function currentSlideName(){
    const currentIndx = arrImgs.indexOf(currentImage);
    const currentImgName = arrImgs[currentIndx];
    return currentImgName;
}
