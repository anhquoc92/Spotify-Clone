// import React from "react";
// import PostData from "./Search.json";
// export default function ListSearch() {
//     return (
//         <div className="card">
//             {/* {PostData.map((items, key) => {
//                 return (
//                 <div key={key}>{items.transformedLabel}</div>
//                 )
//             })} */}
//             {PostData.data.items.forEach((item) => {
//                         let transformedLabel = item.content.data.title.transformedLabel;
//                         return(
//                             console.log(transformedLabel)
//                         )    
                        
//                     }
//                 )
//             }
//         </div>
//     )
// }


import React from "react";
import PostData from "./Search.json";
import styled from "styled-components";
export default function ListSearch() {
    return (
        <div className="full-body-search">
            {PostData.data.items.map((item) => {
                        let img  = item.content.data.artwork.sources[0].url;
                        let backgroundColor = item.content.data.backgroundColor.hex;
                        let transformedLabel =  item.content.data.title.transformedLabel;
                        console.log(backgroundColor)
                        return(
                            <Container>
                                <div className="full-component">
                                    <div className="card" style={{backgroundColor}}>
                                        <div className="component-prop">
                                            <h6>{transformedLabel}</h6>
                                            <img src={img} alt = "logo" className="album-img"/>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        );    
                        
                    }
                )
            }
        </div>
    )
}
const Container = styled.div`
    padding: 0px;
    width: min-content;
    .full-body-search{
        display: flex;
        flex-wrap: wrap;
    }
    .full-component{
        display: inline-block;
        padding: 15px;
    }
    .card{
        display:flex;
        padding: 15px;
        width: 180px;
        height: 180px;
        border-radius: 12px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    &:hover {
      background-color: #485460;
    }
    }
    .component-prop{
    }
    .album-img{
        margin-left: 31px;
        margin-top: 19px;
        width: 80px;
        height: 80px;
        justify:center;
    }
    h6{
        
        color: white;
        font-size: 20px;
    }
`;