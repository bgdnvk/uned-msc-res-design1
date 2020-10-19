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

    const galeria = document.querySelector("#gallery");
    

    reader.addEventListener("load", ()=>{
        // console.log(reader.result);
        console.log(pictureName);
        try{
            localStorage.setItem(`${pictureName}`, reader.result);
            preview.src = reader.result;

            //agrega imgs a galeria
            const img = document.createElement("img");
            img.src = localStorage.getItem(pictureName);
            img.className = "img-fluid";
            console.log(img);
            galeria.appendChild(img);

        } catch (e){
            console.log(e);
            alert("NOPE");
        }
            
    });
    // reader.readAsDataURL(this.files[0]);

    if (file) {
        reader.readAsDataURL(file);
      }

});


