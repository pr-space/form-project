const formTable = document.querySelector("table");
let tBody = document.getElementById("tbody");

fetchSurveysAndEnableSort();

function fetchSurveysAndEnableSort() {
  fetch("/survey-results")
    .then((res) => res.json())
    .then((response) => displaySqlDataOnTable(response))
    .then(() => enableSortByField())
    .catch((err) => console.error(err));
}

function displaySqlDataOnTable(rows) {
  for (let row of rows) {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    const tdName = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdGender = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdState = document.createElement("td");

    tdId.innerText = Number(row.id);
    tdName.innerText = row.name;
    tdAge.innerText = Number(row.age);
    tdGender.innerText = row.gender;
    tdEmail.innerText = row.email;
    tdState.innerText = row.state;

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdGender);
    tr.appendChild(tdEmail);
    tr.appendChild(tdState);

    tbody.appendChild(tr);
  }
}

function enableSortByField() {
  if (tbody.innerHTML !== "") {
    const fields = document.querySelectorAll("th");
    fields.forEach((field) => {
      field.addEventListener("click", sortByAscDesc);
    });
  }
}

function sortByAscDesc() {
  let tableElement = event.target.parentElement.parentElement.parentElement;
  let fieldNo = Number(event.target.id);
  let asc = !event.target.classList.contains("th-sort-asc");

  sortTableByField(tableElement, fieldNo, asc);

  removeAscDescArrows();

  if (asc) {
    event.target.classList.add("th-sort-asc");
    event.target.classList.remove("th-sort-desc");
  } else {
    event.target.classList.add("th-sort-desc");
    event.target.classList.remove("th-sort-asc");
  }
}

function removeAscDescArrows() {
  let fields = document.querySelectorAll("th");
  for (let i = 0; i < 5; i++) {
    fields[i].classList.remove("th-sort-asc", "th-sort-desc");
  }
}

function sortTableByField(table, fieldNo, asc = true) {
  let tableBody = table.children[1];
  const direction = asc ? 1 : -1;
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    let firstEntry = a
      .querySelector(`td:nth-child(${fieldNo + 1})`)
      .textContent.trim();
    let secondEntry = b
      .querySelector(`td:nth-child(${fieldNo + 1})`)
      .textContent.trim();

    if (fieldNo === 0 || fieldNo === 2) {
      firstEntry = Number(firstEntry);
      secondEntry = Number(secondEntry);
    }

    return firstEntry > secondEntry ? 1 * direction : -1 * direction;
  });

  tableBody.innerHTML = "";

  tableBody.append(...sortedRows);
}

const btnClear = document.getElementsByClassName("btn-clear")[0];
btnClear.addEventListener("click", () => {
  removeAscDescArrows();
  sortTableByField(table, 0, true);
});

const btnHome = document.getElementsByClassName("btn-home")[0];
btnHome.addEventListener("click", () => {
  window.location.href = "/";
});
