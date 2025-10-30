import axiosClient from './AxiosConfig'

const CategoryService = ({
    fetchCategories(){
        return axiosClient.get('category')
    },
    fetchCategoryById(categoryId){
        return axiosClient.get(`category/${categoryId}`)
    },
    createCategory(categoryRequesst){
        return axiosClient.post('category', categoryRequesst)
    },
    updateCategory(categoryId, categoryRequesst){
        return axiosClient.post(`category/update/${categoryId}`, categoryRequesst)
    }
})
export default CategoryService;