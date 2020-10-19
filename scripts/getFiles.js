document.querySelector("#captureFile").addEventListener("change", function(){
    // console.log(files);
    console.log(this.files);
    //filereader converts to data url
    const reader = new FileReader();
    // console.log(reader);
    // console.log(reader.result);
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const pictureName = this.files[0].name;

    reader.addEventListener("load", ()=>{
        // console.log(reader.result);
        console.log(pictureName);
        localStorage.setItem(`${pictureName}`, reader.result);
        preview.src = reader.result;
        
    });
    // reader.readAsDataURL(this.files[0]);

    if (file) {
        reader.readAsDataURL(file);
      }


    // document.addEventListener("DOMContentLoaded", () => {
    //     const recentPicture = localStorage.getItem("picture");
    //     if(recentPicture){
    //         document.querySelector("#pictureUploaded").setAttribute("src", recentPicture);
    //     }
    // })

});

// function previewFile() {
//     const preview = document.querySelector('img');
//     const file = document.querySelector('input[type=file]').files[0];
//     const reader = new FileReader();
  
//     reader.addEventListener("load", function () {
//       // convert image file to base64 string
//       preview.src = reader.result;
//     }, false);
  
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }