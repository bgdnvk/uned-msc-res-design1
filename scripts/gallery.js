window.addEventListener('load', (event) => {
    console.log('page is fully loaded');

    // for(let k in localStorage){
    //     console.log(localStorage.getItem(k));
    // }
    const galeria = document.querySelector("#gallery");


    Object.keys(localStorage).forEach(function(key){
        // console.log(localStorage.getItem(key));

        //refactor code l8r
        const img = document.createElement("img");
        img.src = localStorage.getItem(key);
        img.className = "img-fluid";
        console.log(img);
        galeria.appendChild(img);
     });

  });