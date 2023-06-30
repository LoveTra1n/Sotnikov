import React, {useEffect, useState} from 'react';
import Nexts from '../../images/Arrow - Right 2.png'
import Prevs from '../../images/Arrow - Left 2.png'
const Pagination = ({pages,setCurrentPage}) => {
    const [currentButton,setCurrentButton]=useState(1)
    const [arrayOfCurrButtons,setArrayOfCurrButtons]=useState([])


    const numberOfPages = []
    for (let i = 1; i <= pages; i++) {
        numberOfPages.push(i)
    }

    useEffect(()=>{
        let tempNumberOfPages = [...arrayOfCurrButtons]

        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'

        if (numberOfPages.length < 6) {
            tempNumberOfPages = numberOfPages
        }
        else if (currentButton >= 1 && currentButton <= 3) {
            tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }
        else if (currentButton === 4) {
            const sliced = numberOfPages.slice(0, 5)
            tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }
        else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length])
        }
        else if (currentButton > numberOfPages.length - 3) {
            const sliced = numberOfPages.slice(numberOfPages.length - 4)
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        }
        else if (currentButton === dotsInitial) {

            setCurrentButton(arrayOfCurrButtons[arrayOfCurrButtons.length-3] + 1)
        }
        else if (currentButton === dotsRight) {
            setCurrentButton(arrayOfCurrButtons[3] + 2)
        }
        else if (currentButton === dotsLeft) {
            setCurrentButton(arrayOfCurrButtons[3] - 2)
        }
        setArrayOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentButton)
    },[currentButton,pages])
    return (
        <div className={'pagination m-7'} style={{display:"flex",justifyContent:"center"}}>
            {pages>3?<img src={Prevs} onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}/>:<div></div>}
            <div style={{display:"flex",margin: "0 32px"}}>
                {arrayOfCurrButtons.map((page,index)=>
                    <div className={'figures'}>
                        <a
                            key={index}
                            style={{cursor:"pointer",display:'block',margin:'5px'}}
                            onClick={()=>setCurrentButton(page)}
                            className={currentButton === page ? 'bg-blue-500 w-5 rounded text-white flex text-center':''}>
                            {page}
                        </a>
                    </div>
                )}
            </div>
            {pages>3?<img src={Nexts}
                          onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}/>:<div></div>}
        </div>
    )

};

export default Pagination;