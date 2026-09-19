const themeToggle = document.getElementById("themeToggle");
const input = document.getElementById("input");
const list = document.getElementById("todo-list");
const empty = document.getElementById("empty");
const form = document.querySelector("form");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        
        themeToggle.querySelector("svg").style.color = "white";
    }
    else{
        themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star-icon lucide-moon-star"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`

    }

});

let todoList = JSON.parse(localStorage.getItem("todoList")) ?? [];
function saveTodoList(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

function prepare(){
    list.innerHTML = "";
    if(todoList.length === 0){
        empty.hidden = false;
        return
    }
    empty.hidden = true;
    todoList.forEach(todo => {
        const li = document.createElement("li");
        li.className = `todo-item ${todo.completed ? "completed" : ""}`;
        li.dataset.id = todo.id;

        const checkbox = document.createElement("input");
        checkbox.className = "check";
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        const span = document.createElement("span");
        span.textContent = todo.text;
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        // deleteButton.textContent = ;
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path d="M10 11v6"/>
                <path d="M14 11v6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>`;
        deleteButton.dataset.action = "delete";

        li.append(checkbox,span,deleteButton);
        list.append(li);      
    });
}

function addTodo(text){
    const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
    };
    todoList.push(newTodo);
    saveTodoList();
    prepare();
}
function toggleTodo(id){
    todoList = todoList.map((t) => {
    if (t.id === id) {
        return {
            ...t,
            completed: !t.completed
        };
    } else {
        return t;
    }
});
    saveTodoList();
    prepare();
}
function deleteTodo(id){
    todoList = todoList.filter((t) => t.id !== id);
    saveTodoList();
    prepare();
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text){
        return;
    }
    addTodo(text);
    input.value = "";
    input.focus();

});

// list.addEventListener("click", (e) => {
//     const li = e.target.closest("li");
//     if(!li) return;
//     const id = li.dataset.id;

//     if (e.target.matches('input[type="checkbox"]')) {
//     toggleTodo(id);
//     }
//     if (e.target.matches("[data-action='delete']")) {
//         deleteTodo(id);
//     }
// });
list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.closest("[data-action='delete']")) {
        deleteTodo(id);
        return;
    }
    toggleTodo(id);
});
prepare();