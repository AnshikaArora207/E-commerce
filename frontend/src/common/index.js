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
    }
}

export default summaryApi;