let gameContainer = document.getElementById("gameContainer")

async function getSuggestion(){
  let res = await fetch(`https://stujo-tic-tac-toe-stujo-v1.p.rapidapi.com/---------/1`,{
    method:'GET',
    headers:{
      'X-RapidAPI-Key': '3bf05a6130mshbc172f61c5d2bbbp17fb05jsnfe18909aac4c',
      'X-RapidAPI-Host': 'stujo-tic-tac-toe-stujo-v1.p.rapidapi.com'
    }
  })

  let data = await res.json()
  console.log(data) 
  return data
}

function render(){
  for (let i=0; i<9; i++){
  let box = document.createElement('div')
  box.setAttribute('class','box')
  box.setAttribute('id',`box-${i}`)
  box.addEventListener('click',()=>{
    
  })
  gameContainer.appendChild(box)
}
}


function main(){
  render()
  getSuggestion()

}

main()
