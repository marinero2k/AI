function handleButtonClick() {
  // Create popup with checkboxes for the user to select which fields to hide based on the label
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "#FFFFFF";
  popup.style.padding = "10px";
  popup.style.border = "1px solid #000000";
  popup.style.zIndex = "9999";
  popup.style.overflow = "auto";
  popup.style.maxHeight = "800px";
  popup.innerHTML = "<h3>Select fields to hide:</h3>";

  // Get all labels on the page
  const labelClass = "tableContainer-labelCell lgfFormItem-labelCell";
  const labels = document.getElementsByClassName(labelClass);
  const labelNames = new Set();
  for (let i = 0; i < labels.length; i++) {
    let labelText = labels[i].textContent;
    if (labelText) {
      labelNames.add(labelText.trim());
    }
  }

  // Create checkboxes for each label
  for (let labelName of labelNames) {
    const labelCheckbox = document.createElement("input");
    labelCheckbox.type = "checkbox";
    labelCheckbox.id = labelName;
    labelCheckbox.name = labelName;
    labelCheckbox.value = labelName;
    popup.appendChild(labelCheckbox);

    const labelCheckboxLabel = document.createElement("label");
    labelCheckboxLabel.htmlFor = labelName;
    labelCheckboxLabel.textContent = labelName;
    popup.appendChild(labelCheckboxLabel);

    const lineBreak = document.createElement("br");
    popup.appendChild(lineBreak);
  }

  // Add a button to the popup to hide/show the selected fields
  const hideButton = document.createElement("button");
  hideButton.textContent = "Hide Fields";
  hideButton.style.marginTop = "10px";
  hideButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const fieldsToHide = [];
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        fieldsToHide.push(checkbox.value);
      }
    }

    // Hide or Show the selected fields and labels
    for (let i = 0; i < labels.length; i++) {
      let label = labels[i];
      let labelText = label.textContent;

      if (fieldsToHide.includes(labelText.trim())) {
        // Hide the label
        label.style.display = "none";

        // Hide the associated field
        const field = label.parentNode.querySelector(".lgfFormItem-valueCell");
        if (field) {
          field.style.display = "none";
        }
      } else {
        // Show the label
        label.style.display = "table-cell";

        // Show the associated field
        const field = label.parentNode.querySelector(".lgfFormItem-valueCell");
        if (field) {
          field.style.display = "table-cell";
        }
      }
    }

    // Close the popup
    popup.remove();
  });

  popup.appendChild(hideButton);

  // Add a button to the popup to save the user's checkbox selections to local storage
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.style.marginTop = "10px";
  saveButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const checkboxState = {};
    for (let checkbox of checkboxes) {
      checkboxState[checkbox.value] = checkbox.checked;
    }

    // Save the checkbox state
    localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
  });

  popup.appendChild(saveButton);

// Add a button to the popup to restore the user's checkbox selections from local storage
const restoreButton = document.createElement("button");
restoreButton.textContent = "Restore";
restoreButton.style.marginTop = "10px";
restoreButton.addEventListener("click", () => {
const checkboxState = JSON.parse(localStorage.getItem("checkboxState")) || {};
const checkboxes = document.querySelectorAll("input[type='checkbox']");
for (let checkbox of checkboxes) {
if (checkboxState[checkbox.value]) {
checkbox.checked = true;
} else {
checkbox.checked = false;
}
}
// Trigger the click event on the hideButton to apply the user's selections
hideButton.click();
});
popup.appendChild(restoreButton);

// Add the popup to the page
document.body.appendChild(popup);
}
// Add a button to the page to allow the user to hide fields
const button = document.createElement("button");
button.textContent = "Hide Fields";
button.style.position = "fixed";
button.style.top = "65px";
button.style.right = "15px";
button.style.zIndex = "9999";
button.addEventListener("click", handleButtonClick);

document.body.appendChild(button);
