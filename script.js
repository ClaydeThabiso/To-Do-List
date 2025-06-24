const listItem = document.querySelector(".form-control");
const btn = document.querySelector("#btnAdd");
const ul = document.querySelector(".list-group");
const errorMsg = document.getElementById("msgError");
const SuccAdd = document.getElementById("msgAdd");
let count = 0;
let sum = 0;
const counter = document.getElementById("counter");
const Completed = document.getElementById("Completed");

function isCompleted() {
  const listCount = document.querySelectorAll('input[type="checkbox"]');
  let liCount = 0;
  for (var i = 0; i < listCount.length; i++) {
    if (listCount[i].checked === true) {
      liCount++;
    }
  }
  Completed.textContent = "Completed " + liCount;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (listItem.value === "") {
        errorMsg.textContent='Enter Task';
  } else {
    SuccAdd.textContent='Task Added'
    count++;

    if (count === 0) {
      counter.textContent = "No tasks available";
    } else {
      counter.textContent = "Total Tasks " + count;
    }

    const btnDel = document.createElement("button");
    btnDel.className = "btn-close delete";
    btnDel.type = "button";
    btnDel.setAttribute("aria-label", "Delete");

    const edit = document.createElement("i");
    edit.className = "bi bi-pencil edit-icon";
    edit.style.cursor = "pointer";

    const li = document.createElement("li");
    li.className = "list-group-item";

    const input = document.createElement("input");
    input.addEventListener("change", isCompleted);
    input.className = "form-check-input";
    input.type = "checkbox";
    input.id = "item-" + Date.now();

    const label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = input.id;
    label.textContent = listItem.value;

    edit.addEventListener("click", () => {
      let edited = document.createElement("input");
      edited.className = "form-control";
      edited.type = "text";
      edited.value = label.textContent;

      li.replaceChild(edited, label);
      edited.focus();

      function saveEdit() {
        label.textContent = edited.value.trim() || label.textContent;
        li.replaceChild(label, edited);
      }
      
      edited.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          saveEdit();
        }
      });

      edited.addEventListener("blur", saveEdit);
    });

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(edit);
    li.appendChild(btnDel);
    ul.appendChild(li);
    SuccAdd.textContent='Task Added'

    listItem.value = "";

    btnDel.addEventListener("click", () => {
      count--;
      li.remove();

      if (count === 0) {
        counter.textContent = "No tasks available";
      } else {
        counter.textContent = "Total Tasks " + count;
      }
      isCompleted();
    });
  }

  setTimeout(() => errorMsg.textContent = '', 3000);
  setTimeout(() => SuccAdd.textContent = '', 3000);
});

listItem.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    btn.click();
  }
});