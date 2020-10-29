// ARR IMG
let arrImgs = [];
let totalImgs = arrImgs.length;
let currentImage = "";


const preview = document.querySelector('#imagenGaleria');




const savePictureBtn = document.getElementById("save-picture");

// const canvas = document.getElementById('canvas');
const savedCanvas = document.getElementById('saved-canvas');

savePictureBtn.addEventListener("click", saveImageFromCanvas);
let savedPictureCounter = 0;

function saveImageFromCanvas(){

    savedPictureCounter++;
    let imageName = `ImagenCam${savedPictureCounter}`;
    localStorage.setItem(imageName,canvas.toDataURL());
    addImgs(imageName);
    // let dataURL = canvas.toDataURL('image/png');
    // savedCanvas.src = dataURL;
}


//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
document.querySelector('#captureFile').addEventListener("change", previewFile);

const addBtn = document.querySelector("#add");
addBtn.addEventListener("click", saveImage);


function hideAddBtn(){
    addBtn.style.display = "none";
}
hideAddBtn();

document.querySelector("#remove").addEventListener("click", removeImage);
const removeBtn = document.querySelector("#remove");
// removeBtn.style.display = "none";

function previewFile() {
    // console.log("is triggered");
    // const preview = document.querySelector('#imagenGaleria');
    const {file, reader} = getFileReader();

    addBtn.style.display = "block";
    // removeBtn.style.display = "block";
    

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
      setText(file.name);
    //   console.log("file on load is "+file.name);
        
    }, false);
 

  }

function getFileReader(){
    
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
      }

    console.log("inside fileReader");
    console.log(reader.result);
    console.log(file);

   
    return {
        file: file,
        reader: reader
    };
}



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

function removeImage(){
    console.log("####inside removeImage");

    if(arrImgs.length === 0){
        alert("No hay nada que borrar");
    } else {
        let currentSlide = currentSlideName();
        console.log("about to remove: "+currentSlide);
        console.log("about to remove indx: "+currenntImgIndx());
        console.log("arr b4 removing is "+arrImgs);
    
    
        let prevSlide = getPrevImg();
    
        preview.src = localStorage.getItem(prevSlide);
        console.log("current picture is "+prevSlide);
    
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

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    // console.log(event);

    // for(let k in localStorage){
    //     console.log(localStorage.getItem(k));
    // }
    // const galeria = document.querySelector("#gallery");

    Object.keys(localStorage).forEach(function(key){
        addImgs(key);
        // addThumb(key);
        // console.log(key);
        // console.log(localStorage);
        // console.log(arrImgs);
        // console.log(currentImage);
     });

     console.log("arr is");
     console.log(arrImgs);
  });

//se agrega los thumbnails
function addThumb(img){
    const galeriaThumb = document.querySelector("#galeriaThumb");
    const imgThumb = document.createElement("img");

    // console.log("thimb added is");
    // console.log(img);

    if(document.getElementById(img)){
        alert("Ya has agregado esta imagen!");
    } else {
        imgThumb.src = localStorage.getItem(img);
        imgThumb.style.width = "300px";
        imgThumb.style.height = "300px";
        imgThumb.id = img;
        
    
        // imgThumb.height = "200px";
        imgThumb.className = "img-fluid";
        imgThumb.className = "img-thumbnail";
        // imgThumb.className = "rounded";
    
    
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

function setText(imagen){
    const text = document.querySelector("#imageName");
    text.innerHTML = imagen.slice(0,-4); 
    // console.log(typeof(imagen));
  }



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

// function checkEmptyPreview (){
//     if(arrImgs.length === 0){
//         alert("Necesitas Subir Una foto!")
//     }
// }

// function navSlides(i){
//     let currentIndx = currenntImgIndx();
//     if (arrImgs.length-i <= 0){

//     }
// }

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

// function removePreview(){
//     let current = currenntImgIndx();
//     if(arrImgs.length === 1){
//         preview.src = "imgs/muestra.jpg";
//     }
//     prevSlide();
// }