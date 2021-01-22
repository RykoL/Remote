export class SettingsDialogController {
    constructor(dialogElement) {
        this.settings = new Settings(0, 0);
        this.dialogElement = dialogElement;
    }

    toggleVisibility() {
        this.dialogElement.hidden = !this.dialogElement.hidden;
    }
}

export class Settings {

    constructor(mouseSensitivity, scrollSensitivity) {
        this.mouseSensitivity = mouseSensitivity;
        this.scrollSensitivity = scrollSensitivity;
    }

}