const wikilinks = document.getElementsByClassName("wikilinks")[0];
const searchThis = document.getElementById("input");
let imagesArray = [];

searchThis.addEventListener("keydown", function(event){
  if(event.key === 'Enter')
    request();
})


function request(){

  removeItems();

  const url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&pilicense=any&prop=pageimages&pithumbsize=250&format=json&gsrlimit=100&generator=search&gsrsearch='+searchThis.value+'';

  fetch(url)

  .then(response =>{
    if(response.ok)
      return response.json();
    else
      alert(response.status);
  })

  .then(data => {
    console.log(data);
    loadLinks(data);
  });  
}

function loadLinks(data){
  for (var pageId in data.query.pages) {
    if (data.query.pages.hasOwnProperty(pageId)) {
      var div = document.createElement('div');
      div.className = 'link';
      try{
        div.innerHTML = '<img src='+data.query.pages[pageId].thumbnail.source+'>' + 
                        '<h3>'+data.query.pages[pageId].title+'</h3>' +
                        '<div class="middle">' +
                          '<div>' +
                            '<i class="fab fa-wikipedia-w"></i>' +
                          '</div>' +
                        '</div>';
        wikilinks.appendChild(div);
        imagesArray.push('https://en.wikipedia.org/?curid=' + pageId);
      }
      catch(err){
       div.innerHTML = '<h3>'+data.query.pages[pageId].title+'</h3>' +
                       '<div class="middle">' +
                          '<div>' +
                            '<i class="fab fa-wikipedia-w"></i>' +
                          '</div>' +
                        '</div>';
        wikilinks.appendChild(div);
        imagesArray.push('https://en.wikipedia.org/?curid=' + pageId);
      }     
              
    }
  }
  addEvents();
}

function addEvents(){
  for(let i = 0;i < 100;i++){
    document.getElementsByClassName("link")[i].addEventListener('click', function(){
      window.open(imagesArray[i]);
    });
  }
}

function removeItems(){
  wikilinks.innerHTML = '';
  imagesArray = [];
}