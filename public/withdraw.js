function Withdraw(){
  const atmObject = React.useContext(UserContext);
  const {currentUser, setCurrentUser} = atmObject
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="secondary"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} currentUser={currentUser} setCurrentUser={setCurrentUser}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${props.currentUser.email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            props.setCurrentUser(data.value)
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Withdraw failed')
            console.log('err:', text);
        }
    });
  }

  return(<>
    <p>Balance : {props.currentUser.balance}</p>
    <input type="hidden" 
      className="form-control" 
      value={props.currentUser.email} 
/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Withdraw</button>
  </>);
}
