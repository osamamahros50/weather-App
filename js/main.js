let searchInput = document.getElementById('searchInput');
btn=document.getElementById('btn');
formData=document.getElementById('formData');
let loader=document.getElementById('loader');
let row=document.querySelector('.row');
let title= document.getElementById('title');
let contain= document.getElementById('contain');

userLocation()
weatherApp('cairo')
formData.addEventListener('submit' ,function(e){
  e.preventDefault()
    weatherApp()
})

searchInput.addEventListener('input',function () {
  if (searchInput.value.trim() !== "") {
    weatherApp(searchInput.value.trim());
  }
})
btn.addEventListener('click',function (){
  if (searchInput.value.trim() == '') {
    Swal.fire({
      confirmButtonColor: "#ff5252",
      html:`<p class="text-danger fw-bold fs-3"> <i class="fa-solid fa-circle-exclamation text-danger me-2"></i> pleath enter the Name of City</p>`
    })    
    document.getElementById('contain').classList.add('d-none');
  }else{
    title.innerHTML=` Show The Weather of ${searchInput.value}`
    contain.classList.add('animate__animated','animate__backInDown');
    document.getElementById('contain').classList.remove('d-none');
    weatherApp();
    Toastify({
      text: ` this is weather of ${searchInput.value}`,
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "right", 
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
    searchInput.value=''
  }
  })



async function userLocation() {
  let x= await fetch('http://ip-api.com/json');
  console.log(x);
  
  if (x.ok==true) {
    let data = await x.json()
    weatherApp(data.city)
  }
}
 async function weatherApp(userLocation) {
  loader.classList.remove('d-none')
  row.classList.add('d-none')
  let x =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=70922293e0264ef0ac2211409241506&q=${userLocation || searchInput.value}&days=3&aqi=no&alerts=yes`);
  console.log(x);
  
  if (x.ok == true)  {
    let data =await x.json();
    displayDayNow(data)
    displayAnotherDays(data)
    loader.classList.add('d-none')
    row.classList.remove('d-none')

    }
}
function displayDayNow(nowData){
   
    let cartona =''
    cartona+=`
     <div class="card mb-3 p-0 card-1">
                <div class="card-header w-100 d-flex justify-content-between align-items-center">
                  <h4 class="p-0 m-0">${new Date(nowData.location.localtime).toLocaleDateString('en-US', { weekday: 'long' })}</h4>
                  <p class="p-0 m-0">${new Date(nowData.location.localtime).toLocaleDateString('en-US' ,{ day: 'numeric',month:'long'})}</p>
                </div>
                <div class="card-body">
                      <div class="location ms-3">${nowData.location.name}</div>
                      <div class="degree">
                        <div class="minum fw-bold ms-3 text-white">${nowData.current.temp_c}℃</div>
                        <div class="icon ms-3 mb-4 mt-3"><img src="${nowData.current.condition.icon}" alt="${nowData.current.condition.tetx}"></div>
                      </div>
                      <div class="status mb-3">${nowData.current.condition.text}</div>
                      <div class="wind">
                        <span class="me-4"><img src="./images/icon-umberella@2x.png" width="23px" height="20px" alt=""><span class="ms-2 wind-color">${nowData.current.humidity}%</span></span>
                        <span class="me-4"><img src="./images/icon-wind@2x.png"  width="23px" height="20px"  alt=""><span class="ms-2 wind-color">${nowData.current.wind_kph}km/h</span></span>
                        <span class="me-4"><img src="./images/icon-compass@2x.png"  width="23px" height="20px"  alt=""><span class="ms-2 wind-color">${nowData.current.wind_dir}</span></span>
                      </div>
                </div>
             </div>
    
    `
    document.getElementById('dayNow').innerHTML=cartona;
}

function displayAnotherDays(daysdata) {
    let cartona='';
    cartona+=`
                 <div class="card mb-3 p-0 card-3">
                  <div class="card-header w-100 text-center">
                    <h4 class="p-0 m-0">${new Date(daysdata.forecast.forecastday[1].date).toLocaleDateString('en-US',{ weekday: 'long'})}</h4>
                  </div>
                  <div class="card-body d-flex align-items-center flex-column">
                        <div class="icon ms-3 mb-5 mt-3"><img src="${daysdata.forecast.forecastday[1].day.condition.icon}" alt="${daysdata.forecast.forecastday[1].day.condition.text}"></div>
                          <div class="minum-1 fw-bold ms-3 text-white">${daysdata.forecast.forecastday[1].day.maxtemp_c}°C</div>
                        <div class="minum-2 fw-bold ms-3  fs-6 mb-4 ">${daysdata.forecast.forecastday[1].day.mintemp_c}°C</div>
                        <div class="status mb-3">${daysdata.forecast.forecastday[1].day.condition.text}</div>
                  </div>
               </div>
    `
    document.getElementById('dataDays1').innerHTML=cartona;


    let box=''
    box+=`
      <div class="card mb-3 p-0 card-3">
                  <div class="card-header w-100 text-center">
                    <h4 class="p-0 m-0">${new Date(daysdata.forecast.forecastday[2].date).toLocaleDateString('en-US',{ weekday: 'long'})}</h4>
                  </div>
                  <div class="card-body d-flex align-items-center flex-column">
                        <div class="icon ms-3 mb-5 mt-3"><img src="${daysdata.forecast.forecastday[2].day.condition.icon}" alt="${daysdata.forecast.forecastday[2].day.condition.text}"></div>
                          <div class="minum-1 fw-bold ms-3 text-white"${daysdata.forecast.forecastday[2].day.maxtemp_c}°C</div>
                        <div class="minum-2 fw-bold ms-3 fs-6 mb-4 ">${daysdata.forecast.forecastday[2].day.mintemp_c}°C</div>
                        <div class="status mb-3">${daysdata.forecast.forecastday[1].day.condition.text}</div>
                  </div>
               </div> 
    `
    document.getElementById('dataDays2').innerHTML=box;
}
