const { useState } = React;
function Spa() {
  var [isLoggedIn, setIsLoggedIn] = useState(false); 
  var [currentUser, setCurrentUser] = useState({});
  return (
    <HashRouter>
      <div>
        <NavBar isLoggedIn={isLoggedIn} currentUser={currentUser}/>         
        <UserContext.Provider value={
          {users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}],
          isLoggedIn:isLoggedIn,
          currentUser:currentUser,
          setIsLoggedIn:setIsLoggedIn,
          setCurrentUser:setCurrentUser,
          }}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
