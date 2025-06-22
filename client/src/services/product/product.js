import axiosConfig from "../../axiosConfig";

export const apiGetProduct = ({ productId }) =>
    new Promise(async (resolve, reject) => {
        try {

            const response = await axiosConfig({
                method: "get",
                url: `/product/${productId}?populate=true`,
            });
            //console.log("Response:", response); // Log ra chi tiết phản hồi
            resolve(response);
        } catch (error) {
            console.error("Error fetching group members:", error.response || error);
            reject(error);
        }
    });

export const apiGetAllProduct = ({ page = 1, pageSize = 12, keyword = '', category_id, brand_id, minPrice, maxPrice, sort = 'created_at:desc' } = {}) =>
    new Promise(async (resolve, reject) => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                pageSize: pageSize.toString(),
                populate: 'true',
                sort: sort
            });

            if (keyword) params.append('keyword', keyword);
            if (category_id) params.append('category_id', category_id);
            if (brand_id) params.append('brand_id', brand_id);
            if (minPrice) params.append('minPrice', minPrice.toString());
            if (maxPrice) params.append('maxPrice', maxPrice.toString());

            const response = await axiosConfig({
                method: "get",
                url: `/product?${params.toString()}`,
            });
            resolve(response);
        } catch (error) {
            console.error("Error fetching products:", error.response || error);
            reject(error);
        }
    });