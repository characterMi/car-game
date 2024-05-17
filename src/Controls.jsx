const Controls = () => (
    <section className="controls">
        <div className="raw">
            <img
                src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                alt="Arrow"
                className="control-l control-btn arrows"
                style={{
                    transform: "rotateZ(180deg)",
                }}
            />
            <img
                src={process.env.PUBLIC_URL + "/icons/arrow.svg"}
                alt="Arrow"
                className="control-r control-btn arrows"
            />
        </div>
        <div className="raw">
            <img
                src={process.env.PUBLIC_URL + "/icons/stop-pedal.svg"}
                alt="Pedal"
                className="control-b control-btn"
            />
            <img
                src={process.env.PUBLIC_URL + "/icons/gas-pedal.svg"}
                alt="Pedal"
                className="control-f control-btn"
            />
        </div>
    </section>
)

export default Controls