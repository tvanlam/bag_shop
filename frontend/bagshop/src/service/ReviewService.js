import axiosClient from "./AxiosConfig";

const ReviewService = {
    fetchReviews(){
        return axiosClient.get('review')
    },
    fetchReviewByProductId(productId){
        return axiosClient.get(`review/product/${productId}`)
    }
}
export default ReviewService;