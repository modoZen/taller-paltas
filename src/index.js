/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)!')

const url = "https://platzi-avo.vercel.app/api/avo";

const app = document.querySelector('#app');

app.addEventListener('click',(event)=>{
    if(event.target.nodeName === 'H2'){
        alert("Hola!");
    }
});

// Intl
// 1.- Format fechas
// 2.- Format monedas

const formatPrice = (price)=>{
    const newPrice = new Intl.NumberFormat('en-EN',{
        style: 'currency',
        currency: 'USD'
    }).format(price)
    return newPrice;
}

async function fetchData() {
    const response      = await fetch(url);
    const { data }      = await response.json();
    const  allItems     = [];
    data.forEach(item => {
        // create image
        const image = document.createElement("img");
        image.src = `https://platzi-avo.vercel.app${item.image}`;
        image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
        // create title
        const title = document.createElement("h2");
        title.textContent = item.name;
        title.className = 'text-lg';

        // create price
        const price = document.createElement("div");
        price.textContent = formatPrice(item.price);
        price.className = 'text-gray-600'

        //Wrap price & title
        const priceAndTitle = document.createElement('div')
        priceAndTitle.className = 'text-center md:text-left'
        priceAndTitle.append(title, price)

        //Wrap Img and priceAndTitle
        const card = document.createElement('div')
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
        card.append(image, priceAndTitle)
    
        allItems.push(card);
    });
    app.style = "display: grid; grid-template-columns: 1fr 1fr;"
    app.append(...allItems)
}

fetchData();

