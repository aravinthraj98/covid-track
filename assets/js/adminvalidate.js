$("body").css("background-image", "linear-gradient(to right,#42275a,#734b6d)");

let family = document.getElementById('names');
var totalmember = []
family.addEventListener('keyup', (e) => {

   
    if (e.keyCode == 188) {
       familymember_validate();
    }
});
function familymember_validate(){
    totalmember = [];
    let familymembers = document.getElementById('names').value;
    familymembers = familymembers.split(',');
    var members = '';

    for (i in familymembers) {
        if (familymembers[i].trim().length > 0) {
            members = members + `<li>${familymembers[i]}</li>`;
            totalmember.push(familymembers[i]);
        }

    }
    var noofmembers = document.getElementById('familyCount');
    if (totalmember.length > noofmembers.value) {
        noofmembers.focus();
        family.value = "";
        alert("no of members exceeded");
    }
    else
        document.getElementById('list').innerHTML = members;
        
}

function checkfunction() {
    
   

    var isvalid = true;
    familymember_validate();
    if($('#familyCount').val()!=totalmember.length){
        isvalid=false;
        $("#names").focus();
        alert("no of members not matched");
    }
             

    var validdetail = ['Email', "zip", "familyCount", "names", "dno", "city", "state", "area", "street"];
    for (i in validdetail) {
        var inpObj = document.getElementById(validdetail[i]);
        if (!inpObj.checkValidity()) {
            document.getElementById("demo").innerHTML = inpObj.validationMessage;
            isvalid = false;
            break;
        }


    }
    if (isvalid == true) {
        console.log("hello");
        $.post("/api/admin/add", {
            total:totalmember,
            email: $("#Email").val(),
            dno:$("#dno").val(),
            street:$("#street").val(),
            area:$("#area").val(),
            city:$("#city").val(),
            zip:$("#zip").val(),
            noofmembers:$("#familyCount").val(),
            state:$("#state").val()






        },
            function (data, status) {
                alert(data);
                if (data == "false") {
                    alert("data not updated")
                }
            });

    }
}
