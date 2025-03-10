// example 1

document
  .getElementById("changeTextButton")
  .addEventListener("click", function () {
    let paragraph = document.getElementById("myParagraph");
    // console.log(paragraph);
    paragraph.textContent = "you have successfully change the paragrapgh";
  });

// example 2

document
  .getElementById("highlightFirstCity")
  .addEventListener("click", function () {
    let citiesList = document.getElementById("citiesList");
    // console.log(citiesList);
    citiesList.firstElementChild.classList.add("highlight");
  });

//example 3

document.getElementById("changeOrder").addEventListener("click", function () {
  let coffeeType = document.getElementById("coffeeType");
  coffeeType.textContent = "Espresso";
});

// example 4

document.getElementById("addNewItem").addEventListener("click", function () {
  let newItem = document.createElement("li");
  newItem.textContent = "eggs";

  document.getElementById("shoppingList").appendChild(newItem);
});

// example 5

document
  .getElementById("removeLastTask")
  .addEventListener("click", function () {
    let taskList = document.getElementById("taskList");
    taskList.lastElementChild.remove();
  });

// example 6

document
  .getElementById("clickMeButton")
  .addEventListener("dblclick", function () {
    alert("helloo");
  });

// example 7

document.getElementById("teaList").addEventListener("click", function (event) {
  if (event.target && event.target.matches(".teaItem")) {
    alert("you selected : " + event.target.textContent);
  }
});

// example 8

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let feedback = document.getElementById("feedbackInput").value;
    // console.log(feedback);
    document.getElementById(
      "feedbackDisplay"
    ).textContent = `your feedback is : ${feedback}`;
  });

// example 9

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("domStatus").textContent = "DOM content fully loaded";
});

//example 10

document
  .getElementById("toggleHighlight")
  .addEventListener("click", function () {
    let descText = document.getElementById("descriptionText");
    console.log(descText);
    descText.classList.toggle("highlight");
  });
