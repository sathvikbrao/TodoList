window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    // Create the input checkbox for the toggle switch
    const task_status_toggle = document.createElement("input");
    task_status_toggle.classList.add("status-toggle");
    task_status_toggle.type = "checkbox";
    task_status_toggle.id = `status-toggle-${Date.now()}`; // Generate unique ID
    task_status_toggle.checked = false; // Initial state

    // Create the label for the toggle switch
    const task_status_label = document.createElement("label");
    task_status_label.classList.add("toggle-switch");

    // Create the slider div for the toggle switch
    const slider_div = document.createElement("div");
    slider_div.classList.add("slider");

    task_status_label.appendChild(task_status_toggle);
    task_status_label.appendChild(slider_div);

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_actions_el.appendChild(task_status_label);

    task_el.appendChild(task_actions_el);

    list_el.appendChild(task_el);
    saveData();

    input.value = "";

    task_edit_el.addEventListener("click", (e) => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        saveData();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
        saveData();
      }
    });

    task_delete_el.addEventListener("click", (e) => {
      list_el.removeChild(task_el);
      saveData();
    });

    task_status_toggle.addEventListener("change", (e) => {
      saveData();
    });
  });

  function saveData() {
    let tasks = Array.from(document.querySelectorAll(".task")).map(
      (taskElement) => {
        const textInput = taskElement.querySelector(".text");
        const statusToggle = taskElement.querySelector(".status-toggle");
        return {
          task: textInput.value,
          status: statusToggle.checked ? "Done" : "Not Done",
        };
      }
    );
    localStorage.setItem("data", JSON.stringify(tasks));
  }

  function showData() {
    let tasks = JSON.parse(localStorage.getItem("data") || "[]");
    tasks.forEach((task) => {
      const task_el = document.createElement("div");
      task_el.classList.add("task");

      const task_content_el = document.createElement("div");
      task_content_el.classList.add("content");

      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = task.task;
      task_input_el.setAttribute("readonly", "readonly");

      task_content_el.appendChild(task_input_el);

      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");

      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerText = "Edit";

      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerText = "Delete";

      // Create the input checkbox for the toggle switch
      const task_status_toggle = document.createElement("input");
      task_status_toggle.classList.add("status-toggle");
      task_status_toggle.type = "checkbox";
      task_status_toggle.id = `status-toggle-${Date.now()}`; // Generate unique ID
      task_status_toggle.checked = task.status === "Done"; // Set initial checked state

      // Create the label for the toggle switch
      const task_status_label = document.createElement("label");
      task_status_label.classList.add("toggle-switch");

      // Create the slider div for the toggle switch
      const slider_div = document.createElement("div");
      slider_div.classList.add("slider");

      task_status_label.appendChild(task_status_toggle);
      task_status_label.appendChild(slider_div);

      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
      task_actions_el.appendChild(task_status_label);

      task_el.appendChild(task_content_el);
      task_el.appendChild(task_actions_el);

      list_el.appendChild(task_el);

      task_edit_el.addEventListener("click", (e) => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
          task_edit_el.innerText = "Save";
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          saveData();
        } else {
          task_edit_el.innerText = "Edit";
          task_input_el.setAttribute("readonly", "readonly");
          saveData();
        }
      });

      task_delete_el.addEventListener("click", (e) => {
        list_el.removeChild(task_el);
        saveData();
      });

      task_status_toggle.addEventListener("change", (e) => {
        saveData();
      });
    });
  }
  
  showData();
});
