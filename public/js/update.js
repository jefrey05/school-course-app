const btn = document.querySelector('button')
btn.addEventListener('click',update);

async function update(){
    const id = document.querySelector('#id').value;
    const amount = document.querySelector('#amount').value;

    if(isNaN(id)){
        return null;
    }
    if(isNaN(amount)){
        return null;
    }
    try{
        const response = await fetch('update',{
            method:'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
                 'id': id,
                 'amount': amount
            })

        })
        const data = await response.json();
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err)
    }
}