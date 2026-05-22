class Timer {
    constructor(elements) {
        this.timeDisplay = elements.timeDisplay;
        this.statusDisplay = elements.statusDisplay;
        this.circle = elements.circle;
        this.btnToggle = elements.btnToggle;
        this.timerContainer = elements.timerContainer;
        this.petEngine = elements.petEngine;
        
        this.settings = StorageService.getSettings();
        this.currentMode = 'pomodoro'; // pomodoro | shortBreak | longBreak
        this.timeLeft = this.settings[this.currentMode];
        this.isRunning = false;
        this.interval = null;

        // Circle Math for SVG animation
        this.radius = this.circle.r.baseVal.value;
        this.circumference = this.radius * 2 * Math.PI;
        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`;
        this.circle.style.strokeDashoffset = 0;

        this.updateDisplay();
        this.updatePetState();
    }

    updatePetState() {
        if (!this.timerContainer) return;
        
        // Remove previous CSS states (kept for fallback styling like container glow)
        this.timerContainer.classList.remove('state-focus', 'state-break', 'state-idle');
        
        let stateName = 'idle';
        if (!this.isRunning) {
            this.timerContainer.classList.add('state-idle');
            stateName = 'idle';
        } else {
            if (this.currentMode === 'pomodoro') {
                this.timerContainer.classList.add('state-focus');
                stateName = 'focus';
            } else {
                this.timerContainer.classList.add('state-break');
                stateName = 'break';
            }
        }

        if (this.petEngine) {
            this.petEngine.setState(stateName);
        }
    }

    setMode(mode) {
        if (this.isRunning) {
            if(!confirm("Timer is running. Are you sure you want to switch modes?")) {
                return false;
            }
            this.stop();
        }
        this.currentMode = mode;
        this.timeLeft = this.settings[mode];
        
        const statusMap = {
            pomodoro: 'Focus Session',
            shortBreak: 'Short Break',
            longBreak: 'Long Break'
        };
        this.statusDisplay.textContent = statusMap[mode];
        this.updateDisplay();
        this.updatePetState();
        return true;
    }

    toggle() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }
    }

    start() {
        if (this.timeLeft <= 0) return;
        this.isRunning = true;
        this.btnToggle.textContent = 'Pause';
        this.updatePetState();
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.complete();
            }
        }, 1000);
    }

    stop() {
        this.isRunning = false;
        this.btnToggle.textContent = 'Start';
        clearInterval(this.interval);
        this.updatePetState();
    }

    reset() {
        this.stop();
        this.timeLeft = this.settings[this.currentMode];
        this.updateDisplay();
    }

    complete() {
        this.stop();
        this.timeLeft = 0;
        this.updateDisplay();
        
        // Play notification sound
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            audio.play().catch(e => console.log('Audio play prevented by browser policy'));
        } catch(e) {}

        if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Time's up!", {
                body: this.currentMode === 'pomodoro' ? "Time for a break!" : "Time to focus!"
            });
        }
    }

    updateDisplay() {
        // Format time MM:SS
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update Title
        document.title = `${this.timeDisplay.textContent} | FocusFlow`;

        // Update SVG Progress
        const totalTime = this.settings[this.currentMode];
        const progress = this.timeLeft / totalTime;
        const offset = this.circumference - (progress * this.circumference);
        this.circle.style.strokeDashoffset = offset;
    }
}
