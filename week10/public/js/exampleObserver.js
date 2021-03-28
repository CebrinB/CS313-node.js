class ObservableDiv extends HTMLElement {
  // Monitor the 'name' attribute for changes.
  static get observedAttributes() {return ['name']; }

  // Respond to attribute changes.
  attributeChangedCallback(attr, oldValue, newValue) {
    if (attr == 'name') {
      this.textContent = `HELLO, ${newValue}`;
      signon();
    }
  }
}

// Define the new element
customElements.define('observable-div', ObservableDiv);

setTimeout(() => { document.getElementById("change").setAttribute("name", "I CHANGED A LOTTTTTTTTTTT") }, 1000)

//div in HTML
//<observable-div id="change" name="BEFORE CHANGING"></observable-div>