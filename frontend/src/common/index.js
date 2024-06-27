const backendDomain = "http://localhost:8000"
const summaryApi = {
    signup : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signin : {
        url : `${backendDomain}/api/login`,
        method : "post"
    }
}

export default summaryApi;