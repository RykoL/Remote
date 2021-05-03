import styles from  './RangeField.module.css';

export const RangeField = ({ label, value, onValueChange, minimum, maximum }) => {
    return (
        <label>
            {label}
            <div>
              <input className={styles.rangeFieldSlider}
                    value={value}
                    type="range"
                    min={minimum}
                    max={maximum}
                    step="0.1"
                    onChange={onValueChange} />
                <p>{value}</p>
            </div>
        </label>
    )
}
