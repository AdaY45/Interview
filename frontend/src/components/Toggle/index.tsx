import { useState } from 'react'

import './index.css'

interface ToggleProps {
    label: string;
    toggled: boolean;
    onClick: (isToggled: boolean) => void;
}

export const Toggle = ({ label, toggled, onClick }: ToggleProps) => {
    const [isToggled, toggle] = useState(toggled);

    const toggleClickHandler = () => {
        toggle(!isToggled);
        onClick(!isToggled);
    }

    return (
        <label className="toggle-label">
            <input type="checkbox" defaultChecked={isToggled} onClick={toggleClickHandler} />
            <span className="toggle" />
            <strong>{label}</strong>
        </label>
    )
}
