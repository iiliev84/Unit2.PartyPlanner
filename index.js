const baseUrl = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTB-ET-WEB-PT/events"

const state = { 
    parties: [] 
};

const root = document.querySelector("#root")

  function render (){
    root.innerHTML = ""

    state.parties.forEach((party) => {
        const event = document.createElement("div")
        event.classList.add("event")
        event.innerHTML = `
        <h1>${party.name} </h1>
        <p> Date/Time: ${party.date}</p>
        <p> Location: ${party.location}</p>
        <p> Description: ${party.description}</p>  
        <button class = deleteButton partyId="${party.id}"> Delete </button>    
        `
        root.append(event)
    })

    document.querySelectorAll(".deleteButton").forEach((button) => {
        button.addEventListener("click", (e) => {
            removeParty(e.target.getAttribute("partyId"))
        });
    })

    const partyForm = document.createElement("form")
    partyForm.classList.add("event")
    partyForm.innerHTML = `
        <h1> Schedule a party </h1>
        <input type="text" id="name" placeholder="Party Name" required />
        <input type="datetime-local" id="date" required />
        <input type="text" id="location" placeholder="Location" required /> 
        <input type="text" id="description" placeholder="Description" required />
        <button type="submit">Submit</button>` 

    root.append(partyForm)

    partyForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const party = {
        name: document.querySelector("#name").value,
        date: new Date(document.querySelector("#date").value),
        location: document.querySelector("#location").value,
        description: document.querySelector("#description").value,
        
      }
      await addParty(party)
      partyForm.reset()

    })
  }
  
  async function getParties (){
    try{
    const res = await fetch(baseUrl)
    const response = await res.json()
    state.parties = response.data
    render()
    } catch (error){
      console.error(error)
    }
  }
  getParties()

  async function addParty(newParty){
    console.log(newParty)
    try {
        const response = await fetch (baseUrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newParty)
      })
        const result = await response.json()
        console.log(result)
        await getParties()

        } catch (error){
        console.error(error)
    }
  }

  async function removeParty(partyId){
    try{
      await fetch(`${baseUrl}/${partyId}`,{
        method: "DELETE",
      })
      await getParties()
    } catch (error){
      console.error(error)
    }
  }
 
  render ()


  