let formContainer=document.getElementById('formContainer');
let labelName=document.getElementById('labelName');
let cuisine=document.getElementById('cuisine');
let address=document.getElementById('address');
let city=document.getElementById('city');
let rating=document.getElementById('rating');
let title=document.getElementById('title');
let loading=document.getElementById('loading');
let success=document.getElementById('success');
let error=document.getElementById('error');

let submit=document.getElementById('submit');
let url=`https://zomato-express.prerananawar.repl.co/restaurants`;

let parameter;

const queryParams = new URLSearchParams(window.location.search);

parameter=queryParams.get('updateId');

if(parameter){

    title.textContent='Update Restaurant';
    submit.textContent='Update Restaurant';

    fetch(`${url}/${parameter}`)

    .then(response=>{
        return response.json()
    })
    .then(data=>{
       labelName.value=data.name;
       cuisine.value=data.cuisine;
       rating.value=data.rating;
       address.value=data.address;
       city.value=data.city;
    })
    .catch(error=>{
        error.style.display='block';
        loading.style.display='none';
        error.textContent=`Error:${error.message}`;
    })
}


formContainer.addEventListener('submit', async(event)=>{
     event.preventDefault();
     loading.style.display='block';
     error.style.display='none';

     try{
       const sendUrl=parameter?`${url}/${parameter}`:url
       const data={
        address:address.value,
        cuisine:cuisine.value,
        rating: rating.value,
        city:city.value,
        name:labelName.value
       }
        const response=await fetch(sendUrl,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        },)

        if (!response.ok){
            throw new url (`Failed to ${parameter?'update':'add'} the data:${response.status}`);
        }
        loading.style.display='none';
        error.style.display='none';
        success.style.display='block';
        success.textContent=parameter ? 'Updated the Restaurant Successfully':'Added the Restaurant Successfully'

     }

     catch(error){
        error.style.display='block';
        loading.style.display='none';
        error.textContent=`Error:${error.message}`;
     }
     
    
})



