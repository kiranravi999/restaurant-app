let detailsContainer=document.getElementById('detailsContainer');
let loading=document.getElementById('loading');

let url=`https://zomato-express.prerananawar.repl.co/restaurants`;

let parameter;
const queryParams = new URLSearchParams(window.location.search);
parameter=queryParams.get('id');

 const onDisplayDetails=(details)=>{
    console.log(details);
    loading.style.display='none';
   detailsContainer.innerHTML=`
      <h1>${details.name}</h1>
      <p>Cuisine:${details.cuisine}</p>
      <p>Address:${details.address}, ${details.city}</p>
      <p>Rating:${details.rating}</p>
      <h1>Menu:</h1>
      <h1>Reviews:</h1>
   `;
}

const getDetails=async()=>{
    loading.style.display='block';
   try{
    const response=await fetch(`${url}/${parameter}`)
    if (!response.ok){
        throw new url (`Failed to Fetch the data:${response.status}`);
    }
    details=await response.json();
    onDisplayDetails(details);
    
   }
   catch(error){
    
   }

}

getDetails();