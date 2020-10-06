$('body').css('background-image', 'linear-gradient(to right,#42275a,#734b6d)');
 $('#submit').prop('disabled', true);

var locations;
function getLatLon(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  locations = [latitude, longitude];
   $('#submit').prop('disabled', false);

}

console.log('location above');
var letlang;
function getlocation() {
  console.log('clicked');
  navigator.geolocation.getCurrentPosition(getLatLon);
}

let family = document.getElementById('names');
var totalmember = [];
family.addEventListener('keyup', (e) => {
  if (e.keyCode == 188) {
    familymember_validate();
  }
});
function familymember_validate() {
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
    family.value = '';
    alert('no of members exceeded');
  } else document.getElementById('list').innerHTML = members;
}

function checkfunction() {
  var isvalid = true;
  familymember_validate();
  if ($('#familyCount').val() != totalmember.length) {
    isvalid = false;
    $('#names').focus();
    alert('no of members not matched');
  }
   if (locations.length != 2) {
       isvalid=false;
       alert("click get location button to get the location")
   }

  var validdetail = [
    'Email',
    'zip',
    'familyCount',
    'names',
    'dno',
    'city',
    'state',
    'area',
    'street',
  ];
  for (i in validdetail) {
    var inpObj = document.getElementById(validdetail[i]);
    if (!inpObj.checkValidity()) {
      document.getElementById('demo').innerHTML = inpObj.validationMessage;
      isvalid = false;
      break;
    }
  }

  if (isvalid == true) {
    console.log('hello');
    $.post(
      '/api/admin/add',
      {
        total: totalmember,
        email: $('#Email').val(),
        dno: $('#dno').val(),
        street: $('#street').val(),
        location: locations,
        phonenumber: $('#phonenumber').val(),
        area: $('#area').val().toLowerCase(),
        city: $('#city').val(),
        zip: $('#zip').val(),
        noofmembers: $('#familyCount').val(),
        state: $('#state').val(),
      },
      function (data, status) {
        if (data == true) {
          alert('user registered');
          $('#form')[0].reset();
          $('#list').html('');
          $('#submit').prop('disabled', true);
        } else {
          alert(data);
        }
      }
    );
  }
}
