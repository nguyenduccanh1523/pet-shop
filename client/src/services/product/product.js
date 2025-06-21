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