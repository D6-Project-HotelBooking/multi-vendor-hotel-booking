// src/pages/HotelDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getHotelById } from '../services/hotelService';
import { getReviewsByHotelId } from '../services/reviewService';
import BookingWidget from '../components/BookingWidget';
import AddReviewForm from '../components/AddReviewForm';
import BackButton from '../components/common/BackButton';

const HotelDetailPage = () => {
    const { hotelId } = useParams();
    const { user } = useAuth(); // Get user details for conditional rendering
    const [hotel, setHotel] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch reviews, can be called again after a new review is posted
    const fetchReviews = async () => {
        try {
            const reviewsResponse = await getReviewsByHotelId(hotelId);
            setReviews(reviewsResponse.data);
        } catch (err) {
            console.error("Failed to fetch reviews", err);
            // Don't set the main error state, as the hotel might have loaded fine
        }
    };

    useEffect(() => {
        const fetchHotelData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch hotel details and initial reviews at the same time
                const hotelResponse = await getHotelById(hotelId);
                setHotel(hotelResponse.data);
                await fetchReviews(); // Fetch reviews using our dedicated function
            } catch (err) {
                setError("Could not fetch hotel details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHotelData();
    }, [hotelId]); // Re-run effect if the hotelId in the URL changes

    if (loading) return <p>Loading hotel details...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!hotel) return <p>Hotel not found.</p>;

    // Create a clean array of image filenames that are not null or empty
    const images = [hotel.image1, hotel.image2, hotel.image3].filter(Boolean);

    return (
        <div className="container">
            <div className="mt-4">
            <BackButton /> {/* Add the button here */}
        </div>
            <h2 className="mt-4 mb-4">{hotel.name}</h2>
            <div className="row">
                {/* Left Column: Image Carousel and Details */}
                <div className="col-md-8">
                    {/* Bootstrap Image Carousel */}
                    {images.length > 0 && (
                        <div id="hotelImageCarousel" className="carousel slide mb-4 shadow" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {images.map((image, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                        <img
                                            src={`http://localhost:8080/api/public/files/${image}`}
                                            className="d-block w-100"
                                            alt={`${hotel.name} view ${index + 1}`}
                                            style={{ height: '400px', objectFit: 'cover', borderRadius: '0.25rem' }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#hotelImageCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#hotelImageCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    )}

                    <h4>Description</h4>
                    <p>{hotel.description}</p>
                    <hr />

                    <h4>Facilities</h4>
                    {hotel.facilities && hotel.facilities.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {hotel.facilities.map(facility => (
                                <li key={facility.id} className="list-group-item">
                                    <strong>{facility.name}</strong>: {facility.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No special facilities listed.</p>
                    )}
                </div>

                {/* Right Column: Booking, Reviews, and Add Review Form */}
                <div className="col-md-4">
                    <BookingWidget hotelId={hotel.id} pricePerDay={hotel.pricePerDay} />

                    {/* Conditionally render the "Add Review" form only for customers */}
                    {user && user.roles.includes('ROLE_CUSTOMER') && (
                        <AddReviewForm hotelId={hotel.id} onReviewAdded={fetchReviews} />
                    )}

                    <div className="card mt-4">
                        <div className="card-header">Reviews</div>
                        <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {reviews.length > 0 ? (
                                reviews.map(review => (
                                    <div key={review.id} className="mb-3">
                                        <strong>{review.user.firstName}</strong>
                                        <span className="ms-2 badge bg-success">{review.rating} ★</span>
                                        <p className="mb-0">{review.comment}</p>
                                        <small className="text-muted">{new Date(review.reviewDate).toLocaleDateString()}</small>
                                        {review.id !== reviews[reviews.length - 1].id && <hr />}
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetailPage;