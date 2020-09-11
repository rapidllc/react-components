import React  from 'react';
import './ProgressBar.scss';

//<ProgressBar percentage={percentage} />
const ProgressBar = ({percentage}) => {
    return (
        <div className="progress-bar">
            <div id="reconstruction_progress" className="filler" style={{ width: `${percentage}%` }} />
        </div>
    );
};
export default ProgressBar
 