
// document.querySelector("#captureFile").addEventListener("change", function(){
//     // console.log(files);
//     //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
//     console.log(this.files);
//     //filereader converts to data url
//     const reader = new FileReader();
//     // console.log(reader);
//     // console.log(reader.result);
//     const preview = document.querySelector('img');
//     const file = document.querySelector('input[type=file]').files[0];
//     const pictureName = this.files[0].name;

//     // const galeria = document.querySelector("#gallery");
//     reader.addEventListener("load", ()=>{
//         // console.log(reader.result);
//         // console.log(pictureName);
//         try{
//             localStorage.setItem(`${pictureName}`, reader.result);
//             preview.src = reader.result;
//             //agrega imgs a galeria
//             //refactor code l8r
//             // const img = document.createElement("img");
//             // img.src = localStorage.getItem(pictureName);
//             // img.className = "img-fluid";
//             // console.log(img);
//             // galeria.appendChild(img);
//             addImgs(pictureName);
//         } catch (e){
//             console.log(e);
//             alert("NOPE");
//         }
//     });

//     if (file) {
//         reader.readAsDataURL(file);
//       }
// });

// ARR IMG
let arrImgs = [];
let totalImgs = arrImgs.length;
let currentImage = "";


const preview = document.querySelector('#imagenGaleria');


//https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
document.querySelector('#captureFile').addEventListener("change", previewFile);

function previewFile() {
    console.log("is triggered");
    // const preview = document.querySelector('#imagenGaleria');
    const {file, reader} = getFileReader();

    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
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


document.querySelector("#add").addEventListener("click", saveImage);
document.querySelector("#remove").addEventListener("click", removeImage);

function saveImage(){
    const {file, reader} = getFileReader();

    
  
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

        // if(file){
        //     localStorage.setItem(`${file.name}`, reader.result);
        //     console.log("saved item");
        //     console.log(file.name);
        //     console.log(reader.result);
        //     addImgs(file.name);
        // } else {
        //     console.log("no file");
        // }
        
  
    

}

function removeImage(){
    removeThumb(currentSlideName());
    localStorage.removeItem(currentSlideName());
    arrImgRemove(currentSlideName());
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
    // console.log(galeria);
    addThumb(imagen);
    changeText(imagen);
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

  });

//se agrega los thumbnails
function addThumb(img){
    const galeriaThumb = document.querySelector("#galeriaThumb");
    const imgThumb = document.createElement("img");

    // console.log("thimb added is");
    // console.log(img);

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

function removeThumb(imgName){
    console.log("removing thumb: ");
    console.log(imgName);
    let thumb = document.getElementById(imgName);
    console.log(thumb);
    thumb.remove();
}

function changeText(imagen){
    const text = document.querySelector("#imageName");
    text.innerHTML = imagen.slice(0,-4); 
    // console.log(typeof(imagen));
  }






//Local storage/array manipulación
function currenntImgIndx(){
    console.log("----currentImgIndx is "+arrImgs.indexOf(currentSlideName()));
    // console.log(arrImgs.indexOf(currentSlideName()));
    return arrImgs.indexOf(currentSlideName());
}

function arrImgAdd(imgName){
    arrImg.push(imgName);
}

function arrImgRemove(imgName){
    arrImgs.splice(currenntImgIndx(), 1);
}

function getPrevImg(){
    if(arrImgs.length === 1){
        return currentSlideName();
    }

    if(currenntImgIndx() === 0){
        console.log(currentSlideName());
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
    currentImage = getNextImg();
    preview.src = localStorage.getItem(currentImage);
    console.log("inside nextSlide current img is "+currentImage);

}

function prevSlide(){
    currentImage = getPrevImg();
    preview.src = localStorage.getItem(currentImage);
    console.log("inside prevSlide current img is "+currentImage);


}

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
