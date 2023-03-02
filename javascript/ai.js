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
                                    <img src="image/arrow.svg" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="displayModal('${id}')">
                                </div>
                            </div>
                          </div>
                        </div>
        `
    });
    document.getElementById('btn-see-more-div').innerHTML = `<button type="button" class="btn btn-danger" id="btn-see-more">See More</button>`; 
}
const displayModal = id =>{
    console.log(id)
}



allDataFetching()