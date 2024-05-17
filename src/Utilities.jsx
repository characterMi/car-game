import { useEffect, useState } from "react";

const Utilities = () => {
    const [bipEvent, setBipEvent] = useState(null);

    const handleDownload = () => {
        if (bipEvent) {
            bipEvent.prompt()
        } else {
            alert(`To install the app look for "Add to Homescreen" or install in your browser's menu.`)
        }
    }

    useEffect(() => {
        const handleSetInstallPrompt = (event) => setBipEvent(event)

        window.addEventListener("beforeinstallprompt", handleSetInstallPrompt)

        return () => {
            window.removeEventListener("beforeinstallprompt", handleSetInstallPrompt)
        }
    }, [])


    return (
        <section className="utility-container">
            <div className="control-rotate utilities">
                <img src={process.env.PUBLIC_URL + "/icons/rotate.svg"} alt="Rotate" />
                <p>Rotate</p>
            </div>
            <div className="control-reset utilities">
                <img src={process.env.PUBLIC_URL + "/icons/reset.svg"} alt="Reset" />
                <p>Reset</p>
            </div>
            <div className="control-swap utilities">
                <img
                    src={process.env.PUBLIC_URL + "/icons/swap-camera.svg"}
                    alt="Swap Camera"
                />
                <p>Swap camera</p>
            </div>
            <div className="control-download utilities" onClick={handleDownload}>
                <img
                    src={process.env.PUBLIC_URL + "/icons/download.svg"}
                    alt="Download"
                />
                <p>Download app</p>
            </div>
        </section>
    )
}

export default Utilities