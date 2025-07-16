let EditFormDiv, Editinputbox, Edittaskbtn, Editinputboxdescription;
let FormDiv, inputbox, addtaskbtn, Maindiv, openform, taskdiv, ol;
let taskArray = [];

let editTargetId = null,
  editSpan1 = null,
  editdesc = null;

const body = document.body;

maindiv();
createform();
createEditForm();
localstorage();

function localstorage() {
  taskArray = JSON.parse(localStorage.getItem("tasks")) || [];
  ShowTasks(taskArray);
}

function maindiv() {
  Maindiv = document.createElement("div");
  Maindiv.id = "maindiv";

  openform = document.createElement("button");
  openform.innerText = "open form";
  openform.id = "formopenbtn";

  taskdiv = document.createElement("div");
  taskdiv.id = "taskdiv";

  ol = document.createElement("ol");

  body.appendChild(Maindiv);
  Maindiv.appendChild(openform);
  Maindiv.appendChild(taskdiv);
  taskdiv.appendChild(ol);
}

function createform() {
  FormDiv = document.createElement("div");
  FormDiv.id = "formdiv";

  inputbox = document.createElement("input");
  inputbox.placeholder = "Enter a Task ";
  inputbox.type = "text";
  inputbox.id = "inputbox";

  addtaskbtn = document.createElement("button");
  addtaskbtn.innerText = "Add Task ";

  inputboxdescription = document.createElement("textarea");
  inputboxdescription.placeholder = "Enter a Description";
  inputboxdescription.id = "inputdisc";
  inputboxdescription.type = "text";
  addtaskbtn.id = "addtaskbtn";

  FormDiv.appendChild(inputbox);
  FormDiv.appendChild(inputboxdescription);
  FormDiv.appendChild(addtaskbtn);
  document.body.appendChild(FormDiv);
  FormDiv.style.display = "none";
}

function createEditForm() {
  EditFormDiv = document.createElement("div");
  EditFormDiv.id = "editformdiv";

  Editinputbox = document.createElement("input");
  Editinputbox.placeholder = "Edit a Task ";
  Editinputbox.type = "text";
  Editinputbox.id = "inputbox";

  Edittaskbtn = document.createElement("button");
  Edittaskbtn.innerText = "Edit Task ";
  Edittaskbtn.id = "addtaskbtn";

  Editinputboxdescription = document.createElement("textarea");
  Editinputboxdescription.placeholder = "Edit a description";
  Editinputboxdescription.id = "inputdisc";
  Editinputboxdescription.type = "text";

  EditFormDiv.append(Editinputbox, Editinputboxdescription, Edittaskbtn);
  document.body.appendChild(EditFormDiv);
  EditFormDiv.style.display = "none";
}

function ShowTasks(taskArray) {
  ol.innerText = "";
  taskArray.forEach((data) => {
    const li = document.createElement("li");
    const CheckBox = document.createElement("input");
    CheckBox.type = "checkbox";
    CheckBox.id = "checkbox";

    const deletebtn = document.createElement("p");
    deletebtn.id = "deletebtn";
    deletebtn.innerText = "x";

    let taskspan = document.createElement("span");
    taskspan.id = "span1";
    taskspan.innerText = data.InputValue;

    const span2 = document.createElement("span");
    span2.id = "span2";

    const listdiv = document.createElement("div");
    listdiv.id = "listdiv";

    let desciptionText = document.createElement("div");
    desciptionText.innerText = data.taskdesc;
    desciptionText.id = "desc";

    const editbtn = document.createElement("img");
    editbtn.src = "./Edit.png";

    const TaskDiscDiv = document.createElement("div");

    if (data.taskcomplete === "yes") {
      CheckBox.checked = true;
      taskspan.style.textDecoration = "line-through";
      desciptionText.style.textDecoration = "line-through";
    }
    listdiv.append(taskspan, desciptionText);
    span2.append(CheckBox, deletebtn, editbtn);
    li.append(listdiv, span2);
    ol.appendChild(li);
    taskdiv.appendChild(ol);

    editbtn.addEventListener("click", () => {
      if (FormDiv.style.display == "none") {
        FormDiv.style.display = "block";
        Maindiv.style.display = "none";
      }
      FormDiv.style.display = "none";
      EditFormDiv.style.display = "block";
      editTargetId = data.id;
      editSpan1 = taskspan;
      editdesc = desciptionText;
      Editinputbox.value = taskspan.innerText;
      Editinputboxdescription.value = desciptionText.innerText;
    });

    CheckBox.onclick = () => {
      taskcompleted(CheckBox, taskspan, data, desciptionText);
    };

    deletebtn.onclick = () => {
      deleteli(data.id, li);
    };
  });
}

function deleteli(id, li) {
  taskArray = taskArray.filter((taskArray) => id != taskArray.id);
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  li.remove();
}

function taskcompleted(CheckBox, taskspan, data, desciptionText) {
  if (CheckBox.checked) {
    data.taskcomplete = "yes";
    taskspan.style.textDecoration = "line-through";
    desciptionText.style.textDecoration = "line-through";
  } else {
    data.taskcomplete = "no";
    taskspan.style.textDecoration = "none";
    desciptionText.style.textDecoration = "none";
  }
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

Edittaskbtn.onclick = () => {
  taskArray = taskArray.map((a) => {
    if (editTargetId == a.id) {
      let editedtask = Editinputbox.value.trim();
      let editedesc = Editinputboxdescription.value.trim();
      if (editedtask == "" || editedesc == "") {
        alert("Pls Edit Task");
      } else {
        a.InputValue = Editinputbox.value;
        a.taskdesc = Editinputboxdescription.value;
        editSpan1.innerText = a.InputValue;
        editdesc.innerText = a.taskdesc;
      }
    }
    return a;
  });

  Maindiv.style.display = "block";
  EditFormDiv.style.display = "none";
  localStorage.setItem("tasks", JSON.stringify(taskArray));
};

addtaskbtn.onclick = () => {
  const taskValue = inputbox.value.trim();
  const taskdescription = inputboxdescription.value.trim();
  if (taskValue == "" || taskdescription == "") {
    alert("Please Enter Task");
  } else {
    const data = {
      InputValue: taskValue,
      taskdesc: taskdescription,
      id: Date.now(),
      taskcomplete: "no",
    };
    taskArray.push(data);
    localStorage.setItem("tasks", JSON.stringify(taskArray));

    ShowTasks(taskArray);
    inputbox.value = "";
    inputboxdescription.value = "";
    FormDiv.style.display = "none";
    Maindiv.style.display = "block";
  }
};

openform.onclick = () => {
  Maindiv.style.display = "none";
  FormDiv.style.display = "block";
};
