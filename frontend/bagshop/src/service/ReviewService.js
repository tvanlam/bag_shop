import axiosClient from "./AxiosConfig";

const ReviewService = {
    fetchReviews(){
        return axiosClient.get('review')
    },
    fetchReviewByProductId(productId){
        return axiosClient.get(`review/product/${productId}`)
    },
    fetchReviewByDate(date){
        return axiosClient.get(`review/date?date=${date}`)
    }
}
export default ReviewService;