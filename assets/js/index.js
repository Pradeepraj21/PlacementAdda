$("#apply-to-company").submit(function (event) {
    alert("Application sent successfully!");
})

$("#update-company").submit(function (event) {
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}
    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })
    console.log(data);
    var request = {
        "url": `http://localhost:8080/api/company/${data.id}`,
        "method": "PUT",
        "data": data
    }
    $.ajax(request).done(function (response) {
        alert("Data Updated Successfully!")
    })
})

if (window.location.pathname == '/manage-students') {
    $ondelete = $(".table tbody td a.placed-student");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")
        var request = {
            "url": `http://localhost:8080/api/student/${id}`,
            "method": "PUT"
        }
        if (confirm("Do you really want to mark this student as placed?")) {
            $.ajax(request).done(function (response) {
                alert("Data Updated Successfully!");
                location.reload();
            })
        }
    })
}

if (window.location.pathname == '/manage-students') {
    $ondelete = $(".table tbody td a.revoke-student");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")
        var request = {
            "url": `http://localhost:8080/api/student/${id}`,
            "method": "DELETE"
        }
        if (confirm("Do you really want to revoke this student and delete his/her record?")) {
            $.ajax(request).done(function (response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }
    })
}