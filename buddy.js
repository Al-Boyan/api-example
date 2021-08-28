const loadBuddies = () => {
    fetch('https://randomuser.me/api/?results=10')
        .then(res => res.json())
        .then(data => displayBuddies(data))
}
loadBuddies()
const displayBuddies = data => {
    const buddies = data.results;
    const buddiesContainer = document.getElementById('buddies');
    for (const buddy of buddies) {
        console.log(buddy);
        const p = document.createElement('p');
        p.innerText = `Name: ${buddy.name.first} ${buddy.name.last} 
        E-mail: ${buddy.email}
        Location: ${buddy.location.city}, ${buddy.location.state}, ${buddy.location.country}`;
        buddiesContainer.appendChild(p);
    }
}