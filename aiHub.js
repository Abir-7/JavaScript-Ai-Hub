const loadData = async (limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();

    displayData(data, limit)

}

const displayData = (data, limit) => {
    spinner(true);

    let allData = data.data.tools;

    //show 6 data
    if (allData.length > limit) {
        allData = allData.slice(0, 6)
        const btnshow = document.getElementById('showAll');
        btnshow.classList.remove('d-none')

    }
    else {
        const btnshow = document.getElementById('showAll');
        btnshow.classList.add('d-none')
    }

    const divContainer = document.getElementById('div-container');
    for (let i in allData) {
        const features_ai = allData[i].features;
        //adding basic info                                                        
        const createDiv = document.createElement('div');
        createDiv.classList.add('col');
        createDiv.innerHTML = `
    <div class="card h-100 shadow-sm">
    <img src="${allData[i].image}" class=" img-fluid rounded m-3">
    <div class="card-body">
        <h5 class="card-title">Features</h5>
        <div>
        <ol id="${allData[i].id}"> 

        <?ol>

        </div>
        <div> <hr>  </div>
        <div class="d-flex justify-content-between align-items-center">   
       
        <div>
        <h5 class="card-title">${allData[i].name}</h5>
        <p class=""><i class="fa-solid fa-calendar-days"></i> ${allData[i].published_in}</p>
        </div>  
        <div>
        <div>   <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails('${allData[i].id}')" class="btn rounded-circle"><i id="details" class="fa-solid fa-arrow-right"></i></button> </div>  
        </div>  
        </div>
    </div>
    </div>
    `
        divContainer.appendChild(createDiv);
        for (const feature of features_ai) {
            const ol = document.getElementById(`${allData[i].id}`);
            const li = document.createElement('li');
            li.innerText = `${feature}`;
            ol.appendChild(li);

        }

    }


    spinner(false);


}
//btn show all
document.getElementById('showAll').addEventListener('click', function () {
    const divContainer = document.getElementById('div-container');
    divContainer.innerHTML = '';

    spinner(true);


    loadData()
    // displayData(data);

})


const loadDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url);
    const idDetails = await res.json();
    showDetails(idDetails);

}

function showDetails(idDetails) {
    const detailData = idDetails.data.features;
    const detailData2 = idDetails.data.integrations;


    const ul_list = document.getElementById('ul_list');
    ul_list.innerHTML = '';

    for (let i in detailData) {
        const headerText = document.getElementById('headerText');
        headerText.innerText = `${detailData[i].description}`;

        const c_li = document.createElement('li')
        c_li.innerText = `${detailData[i].feature_name}`
        ul_list.appendChild(c_li);
    }

    const ul_list2 = document.getElementById('ul_list2');
    ul_list2.innerHTML = '';
    const c_li2 = document.createElement('li')

    if (detailData2 === null) {
        c_li2.classList.add('noDataMsg')
        c_li2.innerText = `No Data found`;
        ul_list2.appendChild(c_li2);
    }
    else {
        for (let i in detailData2) {
            c_li2.innerText = `${detailData2[i]}`;
            ul_list2.appendChild(c_li2);
        }
    }

    const img2 = document.getElementById('img2');
    img2.src = `${idDetails.data.image_link[0]}`


    const examples = document.getElementById('example');
    const examples2 = document.getElementById('example2');

    const exampleDataIndex = idDetails.data.input_output_examples;
    if (exampleDataIndex === null) {
        examples.innerText = `Can you give any example?`
        examples2.innerText = 'No! Not Yet! Take a break!!!';
    }
    else {
        const exampleData = idDetails.data.input_output_examples[0].input;
        const exampleData2 = idDetails.data.input_output_examples[0].output;
        examples.innerText = `${exampleData}`
        examples2.innerText = `${exampleData2}`
    }


    const priceData = idDetails.data.pricing;

    console.log(idDetails.data);

    const c_div2 = document.getElementById('div2');
    c_div2.innerHTML = '';
    const ul_list3 = document.getElementById('ul_list3');
    ul_list3.innerHTML = '';
    if (priceData == null) {

        c_div2.innerHTML = `
        <div class="miniBox col-12 col-md-3 m-2 rounded">
        <div class="price">
       <div  id='a-0'> 
       <h4>Free of Cost/</h4>
       <h4>Basic</h4>
       </div>
        </div>  
        </div>

        <div class="miniBox col-12 col-md-3 m-2 rounded">
        <div class="price">
        <div  id='a-1'> 
        <h4>Free Of Cost/</h4>
        <h4>Pro</h4>
        </div>
         </div>
         </div>

         <div class="miniBox col-12 col-md-3 m-2 rounded">
         <div class="price">
         <div  id='a-2'> 
         <h4>Free of Cost/</h4>
         <h4>Enterprise</h4>
         </div>
          </div>
          </div>
        `

    }
    else {
        for (i = 0; i < priceData.length; i++) {
            const plans = priceData[i].plan;
            const price = priceData[i].price

            const c_div3 = document.createElement('div');
            c_div3.classList.add('miniBox', 'col-12', 'col-md-3', 'm-2', 'rounded',)
            c_div3.innerHTML = `
            <div class="price">
           <div  id='a-${i}'> 
           <h4>${price}</h4>
           <h4>${plans}</h4>
           </div>
            </div>  
            `
            c_div2.appendChild(c_div3);

        }
    }






    const aqu = idDetails.data.accuracy.score;
    const aqurecy = document.getElementById('aqu')

    console.log(aqu)
    if (aqu == null) {
        aqurecy.innerHTML = '';
    }
    else {
        aqurecy.innerHTML = '';
        const aqu2 = aqu * 100;
        aqurecy.innerHTML = `<p class='aqu'><strong>${aqu2}% accuracy</strong></p>`;
    }

}




const spinner = isLoading => {
    const spinners = document.getElementById('spin');
    if (isLoading == true) {
        spinners.classList.remove('d-none');
    }
    else {
        spinners.classList.add('d-none');
    }
}


loadData(6);

