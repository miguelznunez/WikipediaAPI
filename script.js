const wikilinks = document.querySelector("#wikilinks"),
searchThis = document.querySelector("#search"),
searchButton = document.querySelector("#search-button");
let imagesArray = [];

searchThis.addEventListener("keydown", function(event){
  if(event.key === 'Enter'){
    removeItems();
    request();
  }
})

searchButton.addEventListener("click", function(){
  removeItems();
  request();
})


function request(){

  const url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&pilicense=any&prop=pageimages&pithumbsize=250&format=json&gsrlimit=100&generator=search&gsrsearch='+searchThis.value+'';

  fetch(url)

  .then(response => {
    if (response.status !== 200) throw Error(response.status);
    else return response.json();
  })

  .then(data => {
    loadLinks(data);
  })

  .catch(error => { 
    document.querySelector("#error").textContent = "Oops! Please try again!"
  }); 
}

function loadLinks(data){
  for (let pageId in data.query.pages) {
    const link = document.createElement('div');
    link.className = "link";
    if(data.query.pages[pageId].thumbnail){
      link.innerHTML =  `<a href="https://en.wikipedia.org/?curid=${pageId}" target="_blank">
                          <img src="${data.query.pages[pageId].thumbnail.source}"> 
                          <h3>${data.query.pages[pageId].title}</h3>
                          <div class="middle">
                            <div>
                              <i class="fab fa-wikipedia-w"></i>
                            </div>
                          </div>
                        </a>`;
      wikilinks.appendChild(link);  
    } else {
      link.innerHTML = `<a href="https://en.wikipedia.org/?curid=${pageId}" target="_blank">
                        <h3>${data.query.pages[pageId].title}</h3>
                        <div class="middle">
                          <div>
                            <i class="fab fa-wikipedia-w"></i>
                          </div>
                        </div>
                        </a>`;
      wikilinks.appendChild(link);      
    }      
    
  }
}

function removeItems(){
  document.querySelector("#error").textContent = "";
  wikilinks.innerHTML = '';
  imagesArray = [];
}
