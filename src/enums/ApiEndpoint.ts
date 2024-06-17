enum ApiEndpoint {
    Root = "/",
    About = "/about",
    Signin = "/signin",
    Signup = "/signup",
    Posts = "/posts",
    Read = "/api/user/id=:id",
    ReadAll = "/api/users",
    Create = "/api/create/user",
    Update = "/api/update/user/id=:id",
    Delete = "/api/delete/user/id=:id",
    NotFound = "*"
}

export default ApiEndpoint;