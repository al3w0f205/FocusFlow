class App {
    constructor() {
        this.init();
    }

    init() {
        // Initialize Notification Permission
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }

        // Initialize Tasks
        const taskListEl = document.getElementById('tasks-list');
        const taskForm = document.getElementById('task-form');
        const taskInput = document.getElementById('task-input');
        
        this.taskManager = new TaskManager(taskListEl);

        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.taskManager.addTask(taskInput.value);
            taskInput.value = '';
        });

        // Initialize Pet Engine
        const settings = StorageService.getSettings();
        this.petEngine = new PetEngine('pet-canvas');
        this.petEngine.setPet(settings.petType || 'cat');

        const petSelector = document.getElementById('pet-selector');
        petSelector.value = settings.petType || 'cat';
        petSelector.addEventListener('change', (e) => {
            const newPet = e.target.value;
            this.petEngine.setPet(newPet);
            const currentSettings = StorageService.getSettings();
            currentSettings.petType = newPet;
            StorageService.saveSettings(currentSettings);
        });

        // Initialize Timer
        const timerElements = {
            timeDisplay: document.getElementById('time-display'),
            statusDisplay: document.getElementById('status-display'),
            circle: document.querySelector('.progress-ring__circle'),
            btnToggle: document.getElementById('btn-toggle'),
            timerContainer: document.getElementById('timer-container'),
            petEngine: this.petEngine
        };
        
        this.timer = new Timer(timerElements);

        // Timer Controls
        document.getElementById('btn-toggle').addEventListener('click', () => this.timer.toggle());
        document.getElementById('btn-reset').addEventListener('click', () => this.timer.reset());

        // Mode Switching
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                if (this.timer.setMode(mode)) {
                    modeButtons.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                }
            });
        });
    }
}

// Bootstrap
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
});
