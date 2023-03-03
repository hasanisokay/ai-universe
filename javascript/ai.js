allDataFetching = (seeMoreClicked)=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data =>{
        if(seeMoreClicked){
            displayDataCard(data.data.tools)
            document.getElementById('btn-see-more').classList.add("d-none")
        }
        else{
            displayDataCard(data.data.tools.slice(0,6))
        }
    })
}
const displayDataCard = arrays =>{
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML=''
    arrays.forEach(array => {
        const {features, id, name, image, published_in} = array;
        cardContainer.innerHTML += `
                        <div class="col">
                          <div class="card h-100">
                            <img src="${image}" class="card-img-top" alt="...">
                            <div class="card-body">
                              <h5 class="card-title fw-bold">Features</h5>
                              <ol style="padding-left: inherit" class="text-secondary">
                                <li>${features[0]}</li>
                                <li>${features[1]}</li>
                                <li>${features[2]}</li>
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
    });
    document.getElementById('btn-see-more-div').innerHTML = `<button type="button" class="btn btn-danger" id="btn-see-more" onclick="allDataFetching(true)">See More</button>`;
}


const modalContainer = document.getElementById('modal-body')
// fetch data to show in modal
const fetchModal = id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayModal(data.data))
    modalContainer.innerHTML=""
}

const displayModal = data =>{
    const {accuracy, description, features, id, image_link, input_output_examples, integrations, logo, pricing, tool_name}= data || {}
    console.log(data)
    modalContainer.innerHTML=`
        <div style="background: rgba(235, 87, 87, 0.05); border: 1px solid #EB5757; border-radius: 16px;">
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
        <div>
            <div><img src='${image_link[0]}' class="img-fluid"></div>
            <div class="text-center my-4 mx-1">
                <h4 class="fw-bold">${input_output_examples ? input_output_examples[0].input : "Can you give any example?" }</h4>
                <p class="text-body-secondary">${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
            </div>
        </div>
                
    `
    integrationsUl(integrations)
    featuresUl(features)
}
// no data integrations error handler and
// data integrations adder to list
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


