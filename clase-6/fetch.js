fetch('https://example.com/data.json',{
    "method" : "GET"
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.log(error));

const config = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token',
    },
    body: JSON.stringify({ key: 'value' }),
};

fetch('https://api.example.com/data', config)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));