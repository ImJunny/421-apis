// Imgur id and secret
let client_id = "138aa51bce2bf1b";
let client_secret = "9e655be89ff8e57c8c8ffc7096d8a7192c70356f";

let galleryContainer = document.getElementById("galleryContainer");

// Function gets input and uses imgur api to fetch data, manipulating the DOM for every item.
async function getImages() {
  // Get input. If empty, then do nothing.
  let query = document.getElementById("input").value;
  if (query == "") {
    console.log("input needed");
    return;
  }

  // Fetch images with input if not empty
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

  // Manipulate DOM to render data as cards
  galleryContainer.innerHTML = "";
  dataArr.forEach((item) => {
    // If post has image and is NOT mp4, render; mp4 files will not render
    if (!item.images || item.images[0].link.includes("mp4")) return;
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
    // If image has a link, render out img
    img.src = item.images[0].link;


    card.appendChild(img);
    card.appendChild(title);
    card.append(statsContainer);
    statsContainer.appendChild(likes);
    statsContainer.appendChild(comments);
    statsContainer.appendChild(views);
    galleryContainer.appendChild(card);
    card.addEventListener("click", () => {
      let id = item.id;
      getComments(id)
    });
  });
}

// Function takes clicked image and retrieves comments, displaying them in a modal
async function getComments(id){
  // Fetch comments using passed image id
  let res = await fetch(`https://api.imgur.com/3/gallery/${id}/comments/best`,
  {
    headers: {
      Authorization: `Client-ID ${client_id}`,
    },
  })
  let data = await res.json()
  let commentsArr = data.data


  // Manipulate DOM to render comments in a modal
  let modalBg = document.createElement("div");
  modalBg.setAttribute("class", "modalBg");
  let modal = document.createElement("div");
  modal.setAttribute("class", "modal");
  let closeBtn = document.createElement('button')
  closeBtn.setAttribute('class','closeBtn')
  closeBtn.innerText = "X"
  modal.appendChild(closeBtn)
  closeBtn.addEventListener('click',()=>modalBg.remove())
  let commentContainer = document.createElement('div')
  commentContainer.setAttribute('class','commentContainer')

  // Show comments according to whether commentsArr has actual items
  if(commentsArr==0){
    let comment = document.createElement('p');
    comment.setAttribute('class','comment')
    comment.innerText = "*No comments*"
    commentContainer.append(comment)
  }else{
    commentsArr.forEach(item=>{
      let comment = document.createElement('p');
      comment.setAttribute('class','comment')
      comment.innerText = item.comment
      commentContainer.appendChild(comment)
    })
  }

  modal.appendChild(commentContainer)
  modalBg.appendChild(modal)
  galleryContainer.appendChild(modalBg)
}