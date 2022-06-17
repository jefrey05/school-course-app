const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener('click',deleteCourse)

async function deleteCourse(){
    const id =  document.querySelector('#id').value

    try{
const response = await fetch('delete',{
    method:'delete',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      id:id,
    }),
})

const data = await response.json();
     console.log(data)
     window.location = '/fetch'
    }catch(err){
        console.log(err)

    }
}