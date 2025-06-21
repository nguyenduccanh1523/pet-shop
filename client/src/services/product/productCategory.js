import axiosConfig from "../../axiosConfig";

export const apiGetProductCategory = () =>
    new Promise(async (resolve, reject) => {
        try {

            const response = await axiosConfig({
                method: "get",
                url: `/category?pageSize=20&page=1&populate=*&sort=created_at:asc&parent_id=null`,
            });
            //console.log("Response:", response); // Log ra chi tiết phản hồi
            resolve(response);
        } catch (error) {
            console.error("Error fetching group members:", error.response || error);
            reject(error);
        }
    });
