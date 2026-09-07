fetch('https://example.com/data.json',{
    "method" : "GET"
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.log(error));