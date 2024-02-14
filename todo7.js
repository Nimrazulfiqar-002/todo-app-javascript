document.addEventListener('DOMContentLoaded', function () {
    const todos = [
        { id: 1, text: 'javascript ', completed: false },
        { id: 2, text: 'css', completed: true },
    ];

    const todoList = document.getElementById('todo-list');

    function handleAddTodo(text) {
        const newTodo = { id: todos.length + 1, text, completed: false };
        todos.push(newTodo);
        renderTodos();
    }

    function handleEditTodo(id, text) {
        todos.forEach((todo) => {
            if (todo.id === id) {
                todo.text = text;
            }
        });
        renderTodos();
    }

    function handleDeleteTodo(id) {
        const index = todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            todos.splice(index, 1);
            renderTodos();
        }
    }

    function renderTodos() {
        todoList.innerHTML = '';

        todos.forEach((todo) => {
            const listItem = document.createElement('li');
            listItem.className = 'todo stack-small';

            const checkboxDiv = document.createElement('div');
            checkboxDiv.className = 'c-cb';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `todo-${todo.id}`;
            checkbox.checked = todo.completed;

            const label = document.createElement('label');
            label.className = 'todo-label';
            label.htmlFor = `todo-${todo.id}`;
            label.textContent = todo.text;

            checkboxDiv.appendChild(checkbox);
            checkboxDiv.appendChild(label);

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'btn-group';

            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.className = 'btn';
            editButton.textContent = `Edit ${todo.text}`;
            editButton.addEventListener('click', () => {
                handleEditTodo(todo.id, prompt('Enter new todo text:', todo.text));
            });

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'btn btn__danger';
            deleteButton.textContent = `Delete ${todo.text}`;
            deleteButton.addEventListener('click', () => {
                handleDeleteTodo(todo.id);
            });

            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);

            listItem.appendChild(checkboxDiv);
            listItem.appendChild(buttonGroup);

            todoList.appendChild(listItem);
        });
    }

    const addTodoBtn = document.getElementById('add-todo-btn');
    addTodoBtn.addEventListener('click', function () {
        const input = document.getElementById('new-todo-input');
        handleAddTodo(input.value);
        input.value = '';
    });
    renderTodos();
});
