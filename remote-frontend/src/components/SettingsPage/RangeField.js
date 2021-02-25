import './RangeField.css';

export const RangeField = ({ label, value, onValueChange, minimum, maximum }) => {
    return (
        <label>
            {label}
            <div>
                <span className="range-boundary" id="left-range">{minimum}</span>
                <input
                    value={value}
                    type="range"
                    min={minimum}
                    max={maximum}
                    step="0.1"
                    onChange={onValueChange} />
                <span className="range-boundary">{maximum}</span>
                <input
                    value={value}
                    type="text"
                    min={minimum}
                    max={maximum}
                    step="0.1"
                    onChange={onValueChange} />
            </div>
        </label>
    )
}