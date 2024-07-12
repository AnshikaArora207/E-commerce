const backendDomain = "http://localhost:8000"
const summaryApi = {
    signup : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signin : {
        url : `${backendDomain}/api/login`,
        method : "post"
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout : {
        url : `${backendDomain}/api/logout`,
        method : "delete"
    },
    allUsers : {
        url : `${backendDomain}/api/admin/all-users`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomain}/api/admin/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/api/admin/upload-product`,
        method : "post"
    },
    getProduct : {
        url : `${backendDomain}/api/admin/get-product`,
        method : "get"
    },
    getCategory : {
        url : `${backendDomain}/api/get-category`,
        method : "get"
    },
    categoryWiseProduct : {
        url:`${backendDomain}/api/category-product`,
        method: "post"
    }
}

export default summaryApi;