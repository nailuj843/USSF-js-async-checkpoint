var fetch = require('node-fetch')
var fs = require('fs')

console.log( "Hello!" );

const readFromFile = (file) => {

    var read = fs.readFileSync(file, 'utf8' , (err, data)=>{
        if(err) throw err;
        return data;
      } )
    return read;
}

console.log('Processing command line arguments ', process.argv[2])

console.log('Reading from file: ', process.argv[2])
let pokemonNames = readFromFile(process.argv[2]).split('\n').map(x => x.trim())

console.log('Parsing names from file: ', pokemonNames);

for(var x in pokemonNames){

    console.log('Requesting data from pokemon API for: ', pokemonNames[x])

    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonNames[x]

    var poke = pokemonNames[x].charAt(0).toUpperCase() + pokemonNames[x].slice(1)

    let output = poke + ":"
    
    fetch(url)
    .then(resultOfFetch => resultOfFetch.json())
    .then(JSONObject => JSONObject.types.map(x => x.type.name ))
    .then(result => console.log(output, result.join(', ')))
}



