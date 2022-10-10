import React from "react";
//stateless
// function Toggle() {
//     return <div className="toggle"></div>
// }

//statefull
function Toggle2() {
    const array = useState(false);
    console.log(array);
    return <div className="toggle"></div>
}

export default Toggle2;