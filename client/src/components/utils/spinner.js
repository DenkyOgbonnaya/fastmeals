import React from 'react';

const Spinner = () => {
    const style = {textAlign: 'center'}
    return(
        <div> 
            <p style={style} ><img src='/images/spinner.gif' alt='spinner'  /> </p>
            <p style={style} ><span> Loading... </span> </p>
        </div>
    )
}

export default Spinner;