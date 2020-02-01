
grabReservationData();

function grabReservationData() {
    var newURL = 'http://localhost:3000/api/reservation'
    $.ajax({
        url: newURL,
        method: "GET",
        dataType: "json",
        statusCode: {
            404: function () {
                alert("not found");
                return;
            }
        }

    })
        // this is getting the UV index info"

        .then(function (mydata) {
            console.log(mydata);
        })

}