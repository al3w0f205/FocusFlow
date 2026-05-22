class TaskManager {
    constructor(listElement) {
        this.listElement = listElement;
        this.tasks = StorageService.getTasks();
        this.render();
    }

    addTask(text) {
        if (!text.trim()) return;
        const newTask = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false
        };
        this.tasks.push(newTask);
        this.save();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.save();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
        this.render();
    }

    save() {
        StorageService.saveTasks(this.tasks);
    }

    render() {
        this.listElement.innerHTML = '';
        
        if (this.tasks.length === 0) {
            this.listElement.innerHTML = `
                <div style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">
                    <p>No tasks yet.</p>
                    <p style="font-size: 0.8rem;">Add one to start focusing!</p>
                </div>
            `;
            return;
        }

        // Render uncompleted first, then completed
        const sortedTasks = [...this.tasks].sort((a, b) => a.completed - b.completed);

        sortedTasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskEl.innerHTML = `
                <div class="checkbox" onclick="app.taskManager.toggleTask('${task.id}')">
                    ${task.completed ? '<i data-lucide="check" style="width:14px; height:14px; color:white;"></i>' : ''}
                </div>
                <div class="task-text">${this.escapeHTML(task.text)}</div>
                <button class="btn-delete" onclick="app.taskManager.deleteTask('${task.id}')">
                    <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                </button>
            `;
            this.listElement.appendChild(taskEl);
        });

        // Re-initialize lucide icons for new elements
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag])
        );
    }
}
