import React from 'react'

const Rating = ({ rating }) => {
    return (
        <>
            {rating >= 1 ? (<i className="fas fa-star"></i>) : rating >= 0.5 ?
                (<i className="fas fa-star-half-alt"></i>) : (<i className="far fa-star"></i>)}

            {rating >= 2 ? (<i className="fas fa-star"></i>) : rating >= 1.5 ?
                (<i className="fas fa-star-half-alt"></i>) : (<i className="far fa-star"></i>)}

            {rating >= 3 ? (<i className="fas fa-star"></i>) : rating >= 2.5 ?
                (<i className="fas fa-star-half-alt"></i>) : (<i className="far fa-star"></i>)}

            {rating >= 4 ? (<i className="fas fa-star"></i>) : rating >= 3.5 ?
                (<i className="fas fa-star-half-alt"></i>) : (<i className="far fa-star"></i>)}

            {rating >= 5 ? (<i className="fas fa-star"></i>) : rating >= 4.5 ?
                (<i className="fas fa-star-half-alt"></i>) : (<i className="far fa-star"></i>)}

        </>
    )
}

export default Rating
