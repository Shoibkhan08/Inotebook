import React from 'react'

export const Alert = (props) => {
    // const capitalize = (word)=>{
    //     if (word==="Danger") {
    //         word = "erro"
    //     }
    //     const lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase + lower.slice(1);
    // }
    return (
        <>
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{!props.alert.type ? "This is a Amezing" : props.alert.type }</strong> {!props.alert.msg ? "Courses" : props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
    )
}
