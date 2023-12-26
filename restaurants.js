let restaurantContainer=document.getElementById('restaurantContainer');
let loading=document.getElementById('loading');
let error=document.getElementById('error');
let cuisine=document.getElementById('cuisine');
let sortBy=document.getElementById('sortBy');
let url=`https://zomato-express.prerananawar.repl.co/restaurants`;
let restaurantData=[];




const onDisplayRestaurants=(data)=>{

    loading.style.display='none';
    error.style.display='none'
    restaurantContainer.innerHTML='';
    data.map(item=>{
        const listItem=document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML=`
          <h1>${item.name}</h1>
          <p>Cuisine:${item.cuisine}</p>
          <p>Address: ${item.address},${item.city}</p>
          <p>Rating: ${item.rating}</p>
          <button  class='btn btn-primary mr-2' onclick="onViewDetails('${item._id}')">View Details</button>
          <button  class='btn btn-danger mr-2' onclick="onDelete('${item._id}')">Delete</button>
          <button  class='btn btn-warning' onclick="onUpdate('${item._id}')">Update</button>
        `;
        restaurantContainer.appendChild(listItem);
    })

}





const getRestaurants=async()=>{
    loading.style.display='block';
   try{
    const response=await fetch(url)
    if (!response.ok){
        throw new url (`Failed to Fetch the data:${response.status}`);
    }
    restaurantData=await response.json();
    restaurantData.map(item=>{
        let option=document.createElement('option');
        option.value=item.cuisine;
        option.textContent=item.cuisine;
        cuisine.appendChild(option);
    })
    onDisplayRestaurants(restaurantData);
    
   }
   catch(error){
    loading.style.display='none';
    error.style.display='block';
      error.textContent=`Error: Failed to Load ${error.message}`
   }

}


const onViewDetails=(id)=>{
    window.location.href=`restaurant-details.html?id=${id}`;

}

const onUpdate=(id)=>{
    window.location.href=`addrestaurant.html?updateId=${id}`
}

const onDelete= async(id)=>{
      
    try{
        const response=await fetch(`${url}/${id}`,{
            method:'DELETE',
        },)
        if (!response.ok){
            throw new url (`Failed to delete the data:${response.status}`);
        }
        getRestaurants();
        
       }
       catch(error){
        loading.style.display='none';
        error.style.display='block';
          error.textContent=`Error: Failed to Delete ${error.message}`
       }
    
}

const onFilter=()=>{
   
    const selected=cuisine.value;
    const filteredRestaurants=restaurantData.filter(item=>selected==='All' || selected===item.cuisine);
    onDisplayRestaurants(filteredRestaurants);
}

const onSort=()=>{
  
    const selected=sortBy.value;
    const filteredRestaurants=[...restaurantData].sort((a,b)=>{

        if(selected=='name'){
            return a.name.localeCompare(b.name)
        }
        else{
            return b[selected]-a[selected]
        }
    })
    onDisplayRestaurants(filteredRestaurants);
}
getRestaurants();


