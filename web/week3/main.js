function removeItem(numItems) {
  numItems.innerHTML += -1; 
}

function renderShoppingCartItems(parent) {
  let numSaddles = document.querySelector('#saddles').innerHTML;
  let numBridles = document.querySelector('#bridles').innerHTML;
  let numBlankets = document.querySelector('#blankets').innerHTML;

  let i = 0;
  while (i < numSaddles) {
    let item = document.createElement('li');
        
        item.addEventListener('click', e => {
          let panel = e.target.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });

        let pic = document.createElement('a');
        pic.innerHTML = `
        <img class="pic" src="saddle.jfif" alt="picture of dressage saddle">`;
        pic.addEventListener('click', e => {
          let panel = e.target.parentElement.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });
  
        let name = document.createElement('span');
        name.innerHTML = 'Black Dressage Saddle';
        name.addEventListener('click', e => {
          let panel = e.target.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });

        let price = document.createElement('span');
        price.innerHTML = '$899.95';
        price.addEventListener('click', e => {
          let panel = e.target.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });        

        let del = document.createElement('a');
        del.innerHTML = `
        <i class="fas fa-plus-circle cancel"</i>`;
        del.addEventListener('click', removeItem(document.querySelector('#saddles')));
  
        item.appendChild(pic);
        item.appendChild(name);
        item.appendChild(del);
  
        parent.appendChild(item);
        i++;
    }
  

  i = 0;
  while (i < numBridles) {
    let item = document.createElement('li');
        
        item.addEventListener('click', e => {
          let panel = e.target.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });

        let pic = document.createElement('a');
        pic.innerHTML = `
        <img class="pic" src="bridle.jfif" alt="picture of dressage bridle">`;
        pic.addEventListener('click', e => {
          let panel = e.target.parentElement.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });
  
        let name = document.createElement('span');
        name.innerHTML = 'Dark Brown Leather Dressage Bridle';
        name.addEventListener('click', e => {
          let panel = e.target.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });

        let price = document.createElement('span');
        price.innerHTML = '$399.95';
        price.addEventListener('click', e => {
          let panel = e.target.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });
        

        let del = document.createElement('a');
        del.innerHTML = `
        <i class="fas fa-plus-circle cancel"</i>`;
        del.addEventListener('click', removeItem(document.querySelector('#bridles')));
  
        item.appendChild(pic);
        item.appendChild(name);
        item.appendChild(del);
  
        parent.appendChild(item);
        i++;
    }
  

  i = 0;
  while (i < numBlankets) {
    let item = document.createElement('li');
        
        item.addEventListener('click', e => {
          let panel = e.target.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });

        let pic = document.createElement('a');
        pic.innerHTML = `
        <img class="pic" src="blanket.jfif" alt="picture of horse in winter blanket">`;
        pic.addEventListener('click', e => {
          let panel = e.target.parentElement.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });
  
        let name = document.createElement('span');
        name.innerHTML = 'Blue Quilted Winter Blanket';
        name.addEventListener('click', e => {
          let panel = e.target.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });

        let price = document.createElement('span');
        price.innerHTML = '$199.95';
        price.addEventListener('click', e => {
          let panel = e.target.parentElement.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
          panel.style.maxHeight = "300px";
          }
        });        

        let del = document.createElement('a');
        del.innerHTML = `
        <i class="fas fa-plus-circle cancel"</i>`;
        del.addEventListener('click', removeItem(document.querySelector('#blankets')));
  
        item.appendChild(pic);
        item.appendChild(name);
        item.appendChild(del);
  
        parent.appendChild(item);
        i++;
    }
  }







window.addEventListener("load", () => {
  console.log(document.querySelector('#emptyCart').innerHTML);
  if (document.querySelector('#emptyCart').innerHTML > 0) {
    document.querySelector('#emptyCartLink').style.display = "none";
  }
  //renderShoppingCartItems(document.querySelector('#items'));
});

