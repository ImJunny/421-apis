let client_id = "138aa51bce2bf1b";
let client_secret = "9e655be89ff8e57c8c8ffc7096d8a7192c70356f";

let galleryContainer = document.getElementById("galleryContainer");
async function getImages() {
  let query = document.getElementById("input").value;
  if (query == "") {
    console.log("input needed");
    return;
  }

  console.log("processing");
  let res = await fetch(
    `https://api.imgur.com/3/gallery/search/{{sort}}/{{window}}/{{page}}?q=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${client_id}`,
      },
    }
  );
  let data = await res.json();
  let dataArr = data.data;
  galleryContainer.innerHTML = "";
  console.log(dataArr);
  dataArr.forEach((item) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let title = document.createElement("h1");
    let likes = document.createElement("p");
    let comments = document.createElement("p");
    let views = document.createElement("p");
    let img = document.createElement("img");
    let statsContainer = document.createElement("div");
    statsContainer.setAttribute("class", "statsContainer");

    title.innerText = item.title;
    likes.innerText = item.ups + " likes";
    comments.innerText = item.comment_count + " comments";
    views.innerText = item.views + " views";
    if (item.images[0] != undefined) {
      img.src = item.images[0].link;
    }

    card.appendChild(img);
    card.appendChild(title);
    card.append(statsContainer);
    statsContainer.appendChild(likes);
    statsContainer.appendChild(comments);
    statsContainer.appendChild(views);
    galleryContainer.appendChild(card);
    card.addEventListener('click',(item.)=>{
      let modal = document.createElement('div')
      modal.setAttribute('class','modal')

    })
  });
}
