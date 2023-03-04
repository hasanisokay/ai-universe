const spinner =(isLoaded)=>{
    const spinner = document.getElementById('spinner')
    if(isLoaded){
        spinner.classList.add('d-none')
    }
    else{
        spinner.classList.remove('d-none')
    }
}

allDataFetching = (seeMoreClicked, isSort=false)=>{
    spinner(false);
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data =>{
        if(seeMoreClicked){
            const arrays = data.data.tools;
            const newArrays = [...arrays]
            document.getElementById('btn-see-more').classList.add("d-none")
            const newArraysSorted = newArrays.slice().sort((arr1,arr2)=>Number(new Date(arr1.published_in)) - Number (new Date (arr2.published_in)))
            if(isSort == false){
                displayDataCard(arrays)
                
            }
            else{
                displayDataCard(newArraysSorted)
            }
        }
        else if (!seeMoreClicked){
            let arrays = data.data.tools.slice(0,6);
            const newArrays = [...arrays]
            const newArraySorted = newArrays.sort((arr1,arr2)=>Number(new Date(arr1.published_in)) - Number (new Date (arr2.published_in)))
            if(isSort == false){
                displayDataCard(arrays)
                
            }
            else{
                displayDataCard(newArraySorted)
            }
        }
    })
}
const displayDataCard = arrays =>{
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML=''
    arrays.forEach(array => {
        // console.log(array)
        const {features, id, name, image, published_in} = array;
        cardContainer.innerHTML += `
                        <div class="col">
                          <div class="card h-100">
                            <img src="${image}" class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title fw-bold">Features</h5>
                              <ol style="padding-left: inherit" class="text-secondary features" >
                                <li>${features[0]}</li>
                                <li>${features[1]}</li>
                                <li id="${id}">${features[2] ? features[2]:""}</li>
                              </ol>
                            </div>
                            <hr class="mx-auto">
                            <div class="card-body d-flex justify-content-between align-items-center">
                                <div>
                                <h5 class="card-title fw-bold">${name}</h5>
                                <div class="d-flex gap-2 justify-content-start">
                                    <div><img src="./image/date.svg"></div>
                                    <div class="text-secondary">${published_in}</p></div>
                                </div>
                                </div>
                                <div>
                                    <img src="image/arrow.svg" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="fetchModal('${id}')">
                                </div>
                            </div>
                          </div>
                        </div>
        `
        if(document.getElementById(`${id}`).innerText ==""){
            document.getElementById(`${id}`).classList.add('d-none')
        }
    });
    spinner(true)
}

document.getElementById("btn-sort-by-date").addEventListener('click',function(){
    if(document.getElementById("btn-see-more").classList.contains("d-none")){
        allDataFetching(true, true)
    }
    else{
        allDataFetching(false,true)
    }
})

const modalContainer = document.getElementById('modal-body')
// fetch data to show in modal
const fetchModal = id =>{
    spinner(false)
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayModal(data.data))
    modalContainer.innerHTML=""
}
// Modal inner codes here to display data dynamically
const displayModal = data =>{
    
    const {accuracy, description, features, id, image_link, input_output_examples, integrations, logo, pricing, tool_name}= data || {}
    modalContainer.innerHTML=`
        <div class="col-1"></div>
        <div class="col-5" style="background: rgba(235, 87, 87, 0.05); border: 1px solid #EB5757; border-radius: 16px;">
            <h4>${description}</h4>
            <div class="d-flex gap-4 justify-content-center">
                <div class="bg-white rounded text-success fw-bold px-2 text-center d-flex align-items-center">
                    <p>${pricing ? pricing[0].price ==="No cost" ? "Free of Cost" : pricing[0].price : "Free of Cost"} <br> <span>Basic</span></p>
                </div>
                <div class="bg-white rounded text-warning-emphasis fw-bold px-2 text-center d-flex align-items-center ">
                    <p>${pricing ?  pricing[1].price ==="No cost" ? "Free of Cost" : pricing[1].price : "Free of Cost"} <br> <span>Pro</span></p>
                </div>
                <div class="bg-white rounded text-danger fw-bold px-2 text-center d-flex align-items-center">
                    <p>${pricing ? pricing[2].price : "Free of Cost"} <br> <span>${pricing ? pricing[2].plan : "Enterprise"}</span></p>
                </div>
            </div>
            <div class="d-flex gap-4 ps-4">
                <div>
                    <h4 class="fw-bold">Features</h4>
                    <ul id="features-ul">
                    </ul>
                </div>
                <div>
                    <h4 class="fw-bold">Integrations</h4>
                    <div id="integrations-div"> 
                        <ul id="integrations-ul">
                        </ul>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="col-5 p-4 border rounded">
            <img src='${image_link[0]}' class="rounded img-fluid" style="position: relative;">
            <div style="position:absolute; top: 50px; right:130px"><button type="button" id="btn-accuracy" class="btn btn-danger">${accuracy.score ? accuracy.score * 100 +"% accuracy" :""}</button></div>
            <h4 class="fw-bold text-center my-4 mx-1">${input_output_examples ? input_output_examples[0].input : "Can you give any example?" }</h4>
            <p class="text-body-secondary text-center my-4 mx-1">${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
        </div>
                
    `
    integrationsUl(integrations)
    featuresUl(features)
    // to display none button accuracy when value is null
    const buttonAccuracy = document.getElementById('btn-accuracy')
    if(buttonAccuracy.innerText===""){
        buttonAccuracy.classList.add("d-none")
    }
    spinner(true)
}
// no data integrations error handler and
// data integrations adding to the list
const integrationsUl =(integrations)=>{
    const ul = document.getElementById("integrations-ul")    
    if(!integrations){
        document.getElementById("integrations-div").innerHTML = `
        <p>No data found</p>
        `
        return
    }
    integrations.forEach(element =>{
        ul.innerHTML +=`
        <li>${element}</li>
        `
    })
}
// features items loop through and add to ul
const featuresUl = features =>{
    const ul = document.getElementById('features-ul')
    for (element in features){
        ul.innerHTML += `
        <li>${features[element].feature_name}</li>`
    }
}


