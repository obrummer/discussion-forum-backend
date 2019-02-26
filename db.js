

function tallenna(){
    fs.writeFile("henkilot.json", JSON.stringify(people), function(){
        console.log("Tallennettu tietokantaan");
    })}