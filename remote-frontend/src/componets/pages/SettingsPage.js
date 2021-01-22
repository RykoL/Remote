

const SettingsPage = () => {
    return (
        <>
            <a href="/">Back</a>
            <h1>Settings</h1>
            <div>
                <label>
                    Mouse sensitivity
                    <input type="range" />
                </label>
            </div>
            <div>
                <label>
                    Scroll sensitivity
                    <input type="range" />
                </label>
            </div>
        </>
    )
}

export default SettingsPage;