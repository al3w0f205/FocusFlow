class StorageService {
    static TASKS_KEY = 'focusflow_tasks';
    static SETTINGS_KEY = 'focusflow_settings';

    static getTasks() {
        const tasks = localStorage.getItem(this.TASKS_KEY);
        return tasks ? JSON.parse(tasks) : [];
    }

    static saveTasks(tasks) {
        localStorage.setItem(this.TASKS_KEY, JSON.stringify(tasks));
    }

    static getSettings() {
        const defaultSettings = {
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        };
        const settings = localStorage.getItem(this.SETTINGS_KEY);
        return settings ? { ...defaultSettings, ...JSON.parse(settings) } : defaultSettings;
    }

    static saveSettings(settings) {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }
}
