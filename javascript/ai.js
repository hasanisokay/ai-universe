allDataFetching = ()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data => displayDataCard(data.data.tools))
}
const displayDataCard = arrays =>{
    const cardContainer = document.getElementById('card-container')
    arrays.slice(0,6).forEach(array => {
        // console.log(array);
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
    document.getElementById('btn-see-more-div').innerHTML = `<button type="button" class="btn btn-danger" id="btn-see-more">See More</button>`; 
}
const fetchModal = id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayModal(data.data))
}

const displayModal = data =>{
    const {accuracy, description, features, image_link, input_output_examples, integrations, logo, pricing, tool_name}= data
    console.log(data)
    const modalContainer = document.getElementById('modal-body')
    modalContainer.innerHTML=`
        <div style="background: rgba(235, 87, 87, 0.05); border: 1px solid #EB5757; border-radius: 16px;">
            <h4>${description}</h4>
            <div class="d-flex gap-4 justify-content-center">
                <div class="bg-white rounded text-success fw-bold px-2 text-center d-flex align-items-center">
                    <p>${pricing[0].price =="No cost" ? "Free of Cost" : pricing[0].price} <br> <span>Basic</span></p>
                </div>
                <div class="bg-white rounded text-warning-emphasis fw-bold px-2 text-center d-flex align-items-center ">
                    <p>${pricing[1].price =="No cost" ? "Free of Cost" : pricing[1].price} <br> <span>Pro</span></p>
                </div>
                <div class="bg-white rounded text-danger fw-bold px-2 text-center d-flex align-items-center">
                    <p>${pricing[2].price =="No cost" ? "Free of Cost" : pricing[2].price} <br> <span>${pricing[2].plan}</span></p>
                </div>
            </div>
            <div class="d-flex gap-4 ps-4">
                <div>
                    <h4 class="fw-bold">Features</h4>
                    <ul>
                        <li></li>
                    </ul>
                </div>
                <div>
                    <h4 class="fw-bold">Integrations</h4>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div>
            <img src='${image_link[0]}' class="img-fluid">
        </div>
                
    `
}



allDataFetching()