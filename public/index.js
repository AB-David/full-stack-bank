function Spa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  return (
    <HashRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={
          {users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}],
          isLoggedIn:isLoggedIn,
          setIsLoggedIn:setIsLoggedIn}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            {isLoggedIn ? (  
              <>
                <Route path="/deposit/" component={Deposit} />
              </>
                ):(
              <>
              </>
                )}
            <Route path="/withdraw/" component={Withdraw} />
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
