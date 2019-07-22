// //Defining a listener for our button, specifically, an onclick handler
// document.getElementById("add").onclick = function() {
//     //First things first, we need our text:
//     var text = document.getElementById("ingredients").value; //.value gets input values
//     var node = document.createElement("li");
//     node.setAttribute("name", "ingredients");
//     //Now construct a quick list element
//     var textnode = document.createTextNode(text);
//     node.appendChild(textnode);
//     //Now use appendChild and add it to the list!
//     document.getElementById("list").appendChild(node);
// }

var passWordField = document.getElementById('password')
var passWordConfirmField = document.getElementById('password_conf')
var form = document.getElementById('login')

function validateMyForm() {
    if (passWordField.value != passWordConfirmField.value) {
        alert("Passwords do not match. Please try again.");
    } else {
        form.submit()
    }
}