document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'todo-item';
            listItem.innerHTML = `
                <span class="${todo.completed ? 'completed' : ''}">${todo.name}</span>
                <div class="actions">
                    <button onclick="toggleComplete(${index})">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            todoList.appendChild(listItem);
        });
    }

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = document.getElementById('task-name').value.trim();

        // Check for duplicate tasks
        const isDuplicate = todos.some(todo => todo.name.toLowerCase() === taskName.toLowerCase());
        if (isDuplicate) {
            alert('This task already exists.');
            return;
        }

        if (taskName) {
            todos.push({ name: taskName, completed: false });
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
            todoForm.reset();
        }
    });

    window.toggleComplete = function(index) {
        todos[index].completed = !todos[index].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    window.editTask = function(index) {
        const newTaskName = prompt('Edit task', todos[index].name).trim();
        if (newTaskName && !todos.some((todo, i) => todo.name.toLowerCase() === newTaskName.toLowerCase() && i !== index)) {
            todos[index].name = newTaskName;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        } else if (!newTaskName) {
            alert('Task name cannot be empty.');
        } else {
            alert('This task already exists.');
        }
    }

    window.deleteTask = function(index) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    renderTodos();
});
