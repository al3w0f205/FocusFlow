const fs = require('fs');
const path = require('path');

// Cargamos el script de StorageService directamente
const code = fs.readFileSync(path.resolve(__dirname, '../js/storage.js'), 'utf8');
eval(code);

describe('StorageService', () => {
    beforeEach(() => {
        // Limpiamos el localStorage simulado por jsdom antes de cada test
        localStorage.clear();
    });

    test('getTasks debe retornar un array vacío si no hay tareas guardadas', () => {
        const tasks = StorageService.getTasks();
        expect(tasks).toEqual([]);
    });

    test('saveTasks debe guardar correctamente el listado de tareas en localStorage', () => {
        const mockTasks = [{ id: '1', text: 'Test Task', completed: false }];
        StorageService.saveTasks(mockTasks);

        const storedTasksString = localStorage.getItem(StorageService.TASKS_KEY);
        expect(JSON.parse(storedTasksString)).toEqual(mockTasks);
    });

    test('getTasks debe retornar las tareas previamente guardadas', () => {
        const mockTasks = [{ id: '1', text: 'Test Task', completed: true }];
        StorageService.saveTasks(mockTasks);

        const tasks = StorageService.getTasks();
        expect(tasks).toEqual(mockTasks);
    });

    test('getSettings debe retornar configuraciones por defecto', () => {
        const settings = StorageService.getSettings();
        expect(settings).toEqual({
            pomodoro: 25 * 60,
            shortBreak: 5 * 60,
            longBreak: 15 * 60
        });
    });
});
