//Camden Byrd
//Project 3
var prodRows = document.getElementById("tbodyRows");
var prodRequest;
var prodData;
var confirmedProducts = [];
var sortOrder = "D";
prodRequest = new XMLHttpRequest();
prodRequest.open("GET", "Project_3_Products.json");
prodRequest.send();
prodRequest.onload = function () {
    prodData = JSON.parse(prodRequest.responseText);
    renderTable(prodData);
};

function renderTable(data) {
    var prodRowData = "";
    for (var i = 0; i < data.length; i++) {
        prodRowData += "<tr><td>" + data[i].prodID + "</td><td>" + "<img src=" + data[i].prodImg + ">" + "</td><td id='prodName" + i + "'>" + data[i].prodName + "</td><td>" + data[i].prodDesc + "</td><td>" + data[i].prodPrice + "</td><td><input type='number' min ='0' max = '9' id='ProdQty" + i + "' value='0'>" + "</td></tr>";
    }
    prodRows.innerHTML = prodRowData;
}

function confirmQty() {
    confirmedProducts = [];
    for (var i = 0; i < prodData.length; i++) {
        var qty = document.getElementById("ProdQty" + i).value;
        if (qty > 0) {
            confirmedProducts.push({
                id: prodData[i].prodID,
                quantity: qty
            });
        }
    }
    if (confirmedProducts.length > 0) {
        var confirmationMessage = "Are you sure you want to order the following?:\n";

        for (var j = 0; j < confirmedProducts.length; j++) {
            confirmationMessage += "Product ID: " + confirmedProducts[j].id + ", Qty: " + confirmedProducts[j].quantity + "\n";
        }
        if (confirm(confirmationMessage)) {
            localStorage.setItem("confirmedProducts", JSON.stringify(confirmedProducts));
        }
    }
}
function confirmCancel() {
    var cancelConfirmed = confirm("Are you sure you want to cancel your selections?");
    if (cancelConfirmed) {
        document.querySelector('form').reset();
    }
}

function sortID()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodID - b.prodID ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodID - a.prodID ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortName()
{
    if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName < b.prodName)
            {
                return -1 ;
            }
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            if (a.prodName > b.prodName) 
            {
                return -1  
            }
        } ) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}

function sortPrice()
{
   if (sortOrder == "A")   //sort in ascending order
    {
        prodData.sort(function(a,b)
        {
            return a.prodPrice - b.prodPrice ;
        } ) ;
        sortOrder = "D" ;
    }
    else    //sort in descending order
    {
        prodData.sort(function(a,b)
        {
            return b.prodPrice - a.prodPrice ;
        }) ;
        sortOrder = "A" ;
    }
    renderTable(prodData) ;
}
