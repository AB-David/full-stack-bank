function Logout() {
    const atmObject = React.useContext(UserContext);
    const {isLoggedIn, setIsLoggedIn, setCurrentUser} = atmObject
    function performLogout(){
        setIsLoggedIn(false);
        setCurrentUser(null);
    }
    return (
        !isLoggedIn ? (  
            <>
            Succesfully Logged-Out
            </>
        ):(
            <>
            <br/>
            <h5>Are you sure you want to log-out?</h5>
            <br/>
            <button type = 'button' className="btn btn-light" id = 'logging-out' onClick = {performLogout}>Logout</button>
            <br/>
            </>
        )
    )
}