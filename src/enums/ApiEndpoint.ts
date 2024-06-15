enum ApiEndpoint {
    Root = "/",
    About = "/about",
    Signin = "/signin",
    Signup = "/signup",
    Read = "/api/user/id=:id",
    ReadAll = "/api/users",
    Create = "/api/user/create",
    Update = "/api/user/update/id=:id",
    Delete = "/api/user/delete/id=:id",
    NotFound = "*"
}

export default ApiEndpoint;