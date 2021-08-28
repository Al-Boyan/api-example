const loadQuotes = () => {
    fetch('https://api.kanye.rest/')
        .then(res => res.json())
        .then(data => displayQoute(data))
}

const displayQoute = (quote) => {
    const quoteElement = document.getElementById('quote');
    quoteElement.innerText = quote.quote;
}