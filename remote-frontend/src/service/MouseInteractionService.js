export class MouseInteractionService {

    async log(text) {
        const body = text;
        const response = await fetch("/api/log", {
            method: 'POST',
            body
        });
        assertResponse(response);
    }

    static async submitMouseMove(dx, dy) {
        const body = JSON.stringify({dx, dy});
        const response = await fetch("/api/mouse/move", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
    
        response.status !== 200 && console.error("Didn't succeed with mouse move");
    }

    static async submitScroll(dy, direction) {
        const body = JSON.stringify({dy, direction});
        const response = await fetch("/api/mouse/scroll", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
    
        response.status !== 200 && console.error("Didn't succeed with mouse scroll");
    }

    static async submitMouseClick() {
        const response = await fetch("/api/mouse/click", {
            method: 'POST',
        });

        assertResponse(response);
    }

    async fetchDeviceScreenSize() {
        const response = await fetch("/api/screen/size");
        return await response.json();
    }

}

const assertResponse = (resp) => {resp.status !== 200 && console.error("Didn't succeed");}