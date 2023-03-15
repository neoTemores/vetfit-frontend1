import { GrPrevious, GrNext } from "react-icons/gr"

const Pagination = ({ setStartIndex, setEndIndex, startIndex, endIndex, allRecordsLength }) => {

    const handleChangePage = (direction) => {
        setStartIndex(prevStart => { return prevStart += direction })
        setEndIndex(prevEnd => { return prevEnd += direction })
        window.scroll(0, 0)
    }

    return (

        <div className="pageControlsContainer">
            {startIndex !== 0 &&
                <button
                    className="pagePrevButton"
                    onClick={() => handleChangePage(-10)}>
                    <GrPrevious /> Prev
                </button>
            }
            {endIndex < allRecordsLength &&
                <button
                    className="pageNextBtn"
                    onClick={() => handleChangePage(10)}>
                    Next <GrNext />
                </button>
            }
        </div>
    )
}

export default Pagination