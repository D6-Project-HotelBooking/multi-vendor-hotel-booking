// src/components/AddReviewForm.jsx
import React, { useState } from 'react';
import { postReview } from '../services/reviewService'; // We need to create this service

const AddReviewForm = ({ hotelId, onReviewAdded }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await postReview({ hotelId, rating, comment });
            setSuccess('Thank you! Your review has been submitted.');
            setComment(''); // Clear form
            setRating(5);
            // Tell the parent page to refresh the reviews list
            if (onReviewAdded) {
                onReviewAdded();
            }
        } catch (err) {
            setError('Failed to submit review. You may have already reviewed this hotel.');
            console.error(err);
        }
    };

    return (
        <div className="card mt-4">
            <div className="card-header">Leave a Review</div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="5">5 ★ - Excellent</option>
                            <option value="4">4 ★ - Good</option>
                            <option value="3">3 ★ - Average</option>
                            <option value="2">2 ★ - Fair</option>
                            <option value="1">1 ★ - Poor</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Comment</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    {success && <div className="alert alert-success">{success}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default AddReviewForm;