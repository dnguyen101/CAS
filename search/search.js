function userAction(){
        let searchString = document.getElementById("myInput").value;
        let txt = "";
        console.log(searchString);


        let webhook_url = "https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/searchfunction-nfelt/service/userSearch/incoming_webhook/getUser";

        let url = webhook_url + "?arg=" + searchString;

        fetch(url)
            .then(function (response) {
                if(!response.ok){
                    console.log(response);
                    txt += `<br><br><br><b><h3>Sadly you have an error. Status: ${response.status}`;
                    if (response.json.length === 0)
                        txt+=`<br><br>Make sure to search for some type of movie. Don't leave your search box empty.</h3></b>`;
                    document.getElementById("results").innerHTML = txt;
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (userJSON) {
                if (userJSON["$undefined"] === true) {
                    console.log('NO FETCH RESULT');
                    txt += `<br><br><br><b><h3>IMPLEMENT FULL TEXT SEARCH AGGREGATION TO SEARCH MOVIE COLLECTION</h3></b>`;
                } else {
                    console.log("FETCHED RESULT... "  );
                    if (userJSON.length !== 0) {
                        console.log("Fetched array has " + userJSON.length + " entries");
                        txt = buildMovieList(userJSON);
                    } else {
                        console.log("Fetched array has " + userJSON.length + " entries");
                        txt += `<br><br><br><b><h3>Sadly you have no search results. Try checking your spelling or changing your search terms.</h3></b>`;
                    }
                }  // end of ELSE

            document.getElementById("results").innerHTML = txt;
        }).catch(function(error){
            console.log('Whoopsie!', error);
        });
    }

    function buildMovieList(users){
        // HELPER FUNCTION FOR USER ACTION

        let i = 0;      // for number user returned

        let txt = "";


        for (i; i < users.length; i++) {


            txt += `<br><b><p style="color:green">${users[i].title }</p></b><br>`;
            txt += `<b>Field of Experience:  ${movies[i].score["$numberDouble"]} </b><br>`;

            txt += "<hr>";
        }
        return txt;
    }
