function saveEdits(n) {
  //get the editable element
  var editElem = document.getElementById("edit" + n);
  //get the edited element content
  var userVersion = editElem.innerHTML;
  //save the content to local storage
  localStorage.setItem("edit"+n, userVersion);
  //write a confirmation to the user
  document.getElementById("update" + n).innerHTML="GEMT!";
}

function checkEdits(n) {
//find out if the user has previously saved edits
    var i;
    for (i = 1; i <= n; i++) {
      var item = localStorage.getItem("edit"+i);
      if(item != null)
        document.getElementById("edit" + i).innerHTML = item;
  }
}
