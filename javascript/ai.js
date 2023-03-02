allDataFetching = ()=>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(response => response.json())
    .then(data => console.log(data.data.tools))
}
allDataFetching()