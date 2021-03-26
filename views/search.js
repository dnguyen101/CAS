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
                        txt+=`<br><br>Make sure to search type something.</h3></b>`;
                    document.getElementById("results").innerHTML = txt;
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (userJSON) {
                if (userJSON["$undefined"] === true) {
                    console.log('NO FETCH RESULT');
                    txt += `<br><br><br><b><h3>Something went wrong with the api </h3></b>`;
                } else {
                    console.log("FETCHING RESULT "  );
                    if (userJSON.length !== 0) {
                        console.log("Fetched array has " + userJSON.length + " entries");
                        txt = buildResultList(userJSON);
                    } else {
                        console.log("Fetched array has " + userJSON.length + " entries");
                        txt += `<br><br><br><b><h3>Sadly you have no search results. Try checking your spelling or changing your search terms.</h3></b>`;
                    }
                }  // end of ELSE

            document.getElementById("results").innerHTML = txt;
        }).catch(function(error){
            console.log('Error', error);
        });
    }

    function buildResultList(users){
        // HELPER FUNCTION FOR USER ACTION

        let i = 0;      // for number user returned

        let txt = "";
        let name = "";
        let tag ="";

        for (i; i < users.length; i++) {


            txt += `<br><b><p style="color:green">${ users[i].name}</p></b><br>`;
            txt += `<b>Field of Experience:  ${users[i].tag } </b><br>`;

            name +=`${users[i].name }`;
            localStorage.setItem("name",users[i].name);
            localStorage.setItem("tag",users[i].tag);
            localStorage.setItem("description",users[i].description);
            txt += "<hr>";
        }
        return txt;
    }

    function openProfile() {
      location.replace("profile.html")

    }
