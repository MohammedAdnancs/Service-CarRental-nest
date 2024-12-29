import React, { useState } from 'react';

const ReviewForm = ({ onReviewAdded }) => {
    const [userId, setUserId] = useState('');
    const [productId, setProductId] = useState('');
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onReviewAdded(); // Refresh reviews
        setUserId('');
        setProductId('');
        setRating('');
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a Review</h2>
           
            <input
                type="text"
                placeholder="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
            />
            <textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;
