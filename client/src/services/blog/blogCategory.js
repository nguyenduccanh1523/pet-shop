import axiosConfig from "../../axiosConfig";

export const apiGetBlogCategory = () =>
    new Promise(async (resolve, reject) => {
        try {

            const response = await axiosConfig({
                method: "get",
                url: `/blog-categories?pageSize=20&page=1&populate=true&sort=created_at:asc`,
            });
            //console.log("Response:", response); // Log ra chi tiết phản hồi
            resolve(response);
        } catch (error) {
            console.error("Error fetching group members:", error.response || error);
            reject(error);
        }
    });