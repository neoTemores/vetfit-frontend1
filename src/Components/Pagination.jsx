import { GrPrevious, GrNext } from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux"
import { setStartIndex } from "../features/startIndex"
import { setEndIndex } from "../features/endIndex"

const Pagination = () => {
    const dispatch = useDispatch();
    const startIndex = useSelector(state => state.startIndex.value);
    const endIndex = useSelector(state => state.endIndex.value)
    const allRecords = useSelector(state => state.allRecords.value)


    const handleChangePage = (direction) => {
        dispatch(setStartIndex(direction))
        dispatch(setEndIndex(direction))
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
            {endIndex < allRecords.length &&
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