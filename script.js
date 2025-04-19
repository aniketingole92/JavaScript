document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const prioritySelect = document.getElementById('priority-select');
    const todoTasks = document.getElementById('todo-tasks');
    const inProgressTasks = document.getElementById('in-progress-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close-modal');
    const saveTaskBtn = document.getElementById('save-task-btn');
    
    // Task counters for each column
    const todoCounter = document.querySelector('#todo-column .counter');
    const inProgressCounter = document.querySelector('#in-progress-column .counter');
    const completedCounter = document.querySelector('#completed-column .counter');
    
    // Edit task form elements
    const editTaskTitle = document.getElementById('edit-task-title');
    const editTaskDescription = document.getElementById('edit-task-description');
    const editTaskPriority = document.getElementById('edit-task-priority');
    const editTaskDueDate = document.getElementById('edit-task-due-date');
    
    // State variables
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    let taskBeingEdited = null;
    
    // Initialize the app
    function init() {
        renderTasks();
        updateStats();
        setupEventListeners();
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Add task
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });
        
        // Filter tasks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                renderTasks();
            });
        });
        
        // Modal
        closeModal.addEventListener('click', closeTaskModal);
        saveTaskBtn.addEventListener('click', saveTaskChanges);
        
        // Drag and drop
        setupDragAndDrop();
    }
    
    // Set up drag and drop functionality
    function setupDragAndDrop() {
        const taskColumns = [todoTasks, inProgressTasks, completedTasks];
        
        taskColumns.forEach(column => {
            column.addEventListener('dragover', e => {
                e.preventDefault();
                column.classList.add('drag-over');
            });
            
            column.addEventListener('dragleave', () => {
                column.classList.remove('drag-over');
            });
            
            column.addEventListener('drop', e => {
                e.preventDefault();
                column.classList.remove('drag-over');
                
                const taskId = e.dataTransfer.getData('text/plain');
                const newStatus = column.dataset.status;
                const task = tasks.find(t => t.id === taskId);
                
                if (task && task.status !== newStatus) {
                    task.status = newStatus;
                    saveTasks();
                    renderTasks();
                    updateStats();
                }
            });
        });
    }
    
    // Add a new task
    function addTask() {
        const title = taskInput.value.trim();
        if (!title) return;
        
        const newTask = {
            id: generateId(),
            title: title,
            description: '',
            priority: prioritySelect.value,
            status: 'todo',
            dueDate: '',
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        updateStats();
        
        taskInput.value = '';
        taskInput.focus();
    }
    
    // Render tasks based on current filter
    function renderTasks() {
        // Clear all columns
        todoTasks.innerHTML = '';
        inProgressTasks.innerHTML = '';
        completedTasks.innerHTML = '';
        
        // Filter tasks based on current filter
        let filteredTasks = tasks;
        if (currentFilter !== 'all') {
            filteredTasks = tasks.filter(task => task.status === currentFilter);
        }
        
        // Count tasks for each column
        let todoCount = 0;
        let inProgressCount = 0;
        let completedCount = 0;
        
        // Render each task in the appropriate column
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            
            switch (task.status) {
                case 'todo':
                    todoTasks.appendChild(taskElement);
                    todoCount++;
                    break;
                case 'in-progress':
                    inProgressTasks.appendChild(taskElement);
                    inProgressCount++;
                    break;
                case 'completed':
                    completedTasks.appendChild(taskElement);
                    completedCount++;
                    break;
            }
        });
        
        // Update counters
        if (currentFilter === 'all') {
            todoCounter.textContent = tasks.filter(t => t.status === 'todo').length;
            inProgressCounter.textContent = tasks.filter(t => t.status === 'in-progress').length;
            completedCounter.textContent = tasks.filter(t => t.status === 'completed').length;
        } else {
            todoCounter.textContent = todoCount;
            inProgressCounter.textContent = inProgressCount;
            completedCounter.textContent = completedCount;
        }
    }
    
    // Create a task element
    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.priority}-priority`;
        taskElement.draggable = true;
        taskElement.dataset.id = task.id;
        
        // Format due date if it exists
        let dueDateDisplay = '';
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            dueDateDisplay = dueDate.toLocaleDateString();
        }
        
        taskElement.innerHTML = `
            <div class="task-title">${task.title}</div>
            ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            <div class="task-footer">
                ${dueDateDisplay ? `<div class="task-due-date">Due: ${dueDateDisplay}</div>` : '<div></div>'}
                <div class="task-actions">
                    <button class="task-btn edit"><i class="fas fa-edit"></i></button>
                    <button class="task-btn delete"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        
        // Add event listeners for drag and drop
        taskElement.addEventListener('dragstart', () => {
            taskElement.classList.add('dragging');
            event.dataTransfer.setData('text/plain', task.id);
            event.dataTransfer.effectAllowed = 'move';
        });
        
        taskElement.addEventListener('dragend', () => {
            taskElement.classList.remove('dragging');
        });
        
        // Add event listeners for edit and delete
        const editBtn = taskElement.querySelector('.edit');
        const deleteBtn = taskElement.querySelector('.delete');
        
        editBtn.addEventListener('click', () => openTaskModal(task));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        return taskElement;
    }
    
    // Delete a task
    function deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderTasks();
            updateStats();
        }
    }
    
    // Open task modal for editing
    function openTaskModal(task) {
        taskBeingEdited = task;
        
        editTaskTitle.value = task.title;
        editTaskDescription.value = task.description || '';
        editTaskPriority.value = task.priority;
        editTaskDueDate.value = task.dueDate || '';
        
        modal.style.display = 'flex';
    }
    
    // Close task modal
    function closeTaskModal() {
        modal.style.display = 'none';
        taskBeingEdited = null;
    }
    
    // Save task changes from modal
    function saveTaskChanges() {
        if (!taskBeingEdited) return;
        
        taskBeingEdited.title = editTaskTitle.value.trim();
        taskBeingEdited.description = editTaskDescription.value.trim();
        taskBeingEdited.priority = editTaskPriority.value;
        taskBeingEdited.dueDate = editTaskDueDate.value;
        
        saveTasks();
        renderTasks();
        closeTaskModal();
    }
    
    // Update statistics
    function updateStats() {
        totalTasksSpan.textContent = tasks.length;
        const completedCount = tasks.filter(task => task.status === 'completed').length;
        completedTasksSpan.textContent = completedCount;
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Generate a unique ID
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // Initialize the app
    init();
});
