const wiki = require('wikijs').default;
const Owlbot = require('owlbot-js');
const fs = require(`fs`)
var client = Owlbot(`338ecf605609ce0416b6b9e115849f9005ba6945`)
var searchTerm = "Cathode"
var info = []
async function async (){
await wiki()
	.page(`${searchTerm}`)
	.then(async function (page) {
        var information = await page.rawContent()
        info.push((information.split(`==`)[0].split(`\n`))[0])
    })
await wiki()
    .page(`${searchTerm}`)
    .then(async function (page) {
        var rawImages = await page.images()
        var finalImages = []
        for (var i = 0; i < rawImages.length; i++){
            if (rawImages[i].includes("https://upload.wikimedia.org/wikipedia/commons")){
                finalImages.push(rawImages[i])
            }
        }
        info.push(finalImages)
    })
await wiki()
    .page(`${searchTerm}`)
    .then(async function (page) {
        var relatedLinks = await page.externalLinks()
        info.push(relatedLinks)
    })

await client.define(`${searchTerm}`).then(function(result){
    info.push([result.pronunciation, result.definitions[0].definition, result.definitions[0].type])
});

const results = {
    wikipediaDefinition: info[0],
    wikipediaImages: info[1],
    externalLinks: info[2],
    dictionaryInformation: info[3],
}
fs.writeFile(`results.json`, JSON.stringify(results), err =>{
        if (err){
            console.log(err)
        } else {
            console.log(results)
        }
    })
}
async()

