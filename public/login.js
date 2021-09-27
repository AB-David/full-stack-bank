function Login(){
  const atmObject = React.useContext(UserContext);
  const {isLoggedIn, setIsLoggedIn,currentUser, setCurrentUser} = atmObject
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  React.useEffect(()=>{
    console.log('useEffect')
    window.onSignIn = (googleUser)=>{
        console.log('Google user is :' +googleUser)
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        window.googleID = profile.getId();
        window.googleEmail = profile.getEmail();
        window.googleName = profile.getName();
        fetch(`/account/createGoogle/${googleName}/${googleEmail}/${googleID}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setStatus('');
                props.setShow(false);
                console.log('JSON:', data);
                props.setIsLoggedIn(true);
                props.setCurrentUser(data)
            } catch(err) {
                props.setStatus(text)
                console.log('err:', text);
            }
        });
    }
  })
  const handle = ()=> {
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
            console.log('JSON:', data);
            props.setIsLoggedIn(true);
            props.setCurrentUser(data)
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    <br>
    </br>
    Or sign in with Google<br/>
    <div className="g-signin2" data-onsuccess="onSignIn"></div>


  </>);
}


