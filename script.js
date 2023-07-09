
const account1 = {
    owner: "Raju Shinde",
    movements: [-244,4565,-345,-987,234,564,234],
    interestRate: 1.3,
    pin: 1111
}
const account2 = {
    owner: "Mohammad Irfan ",
    movements: [2464,4005,-334,987,234,564],
    interestRate: 1.5,
    pin: 2222
}
const account3 = {
    owner: "Sadia Khan",
    movements: [2744,455,3405,927,-234,664],
    interestRate: 3,
    pin: 3333
}
const account4 = {
    owner: "Aditi Bhatia",
    movements: [3244,-565,345,987,264,3004],
    interestRate: 2.5,
    pin: 4444
}

const accounts= [account1, account2, account3, account4];

//Element Selectors

const labelWelcome = document.querySelector ('.welcome') ;
const labelDate = document.querySelector('.date') ;
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app') ;
const containerMovements = document.querySelector('.movement') ;

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoad = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUserName= document.querySelector('.login__input--user');
const inputLoginPin= document.querySelector('.login__input--pin');
const inputTransferTo= document.querySelector('.form__input--to');
const inputTransferAmount= document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form.input--loan');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements){
    containerMovements.innerHTML= '';
    movements.forEach(function(mov,i){
        const type= mov > 0 ? 'deposit' : 'withdrawal';

        const html=  `<div class="movement__row">
        <div class="movement__type movement__type--${type}">${i+1} ${type}</div>  
        <div class="movement__date"></div>
        <div class="movement__value"> ${mov} EUR</div>
        </div>`
       
        containerMovements.insertAdjacentHTML('afterbegin', html) // after puts the elements in array in reverse order if you wnat them in order use beforeend
    })
}


//creating username
const createUsername= function(accs){
    accs.forEach(function(acc){
    acc.username= acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');// same this is known as Pipeline or Chaining method
    })
}
createUsername(accounts)
console.log(accounts);

//
const calcDisplayBal= function(acct){
    let balance= acct.movements.reduce((accu, mov)=>{
        return accu + mov;       
        //we set the default value of accumulator (accu in this case) to be 0
    },0) 
    console.log(`The Final Balance is: `,balance);
    labelBalance.textContent=  `${balance} USD`;
}


//total of income and debt and interest
const calcDisplaySummary= function(acct){
    const income= acct.movements.filter((mov)=> mov>0).reduce((accu,mov)=> accu+mov,0);
    labelSumIn.textContent= `${income} EUR`;

    const out= acct.movements.filter((mov)=> mov<0).reduce((accu,mov)=> accu+mov,0);
    labelSumOut.textContent= `${Math.abs(out)} EUR`;

    const interest= acct.movements.filter(mov => mov>0).map(deposit=> (deposit * acct.interestRate)/100).filter((int,i,deposit)=>{
        console.log(deposit);
        return int>1;
    }).reduce((accu, deposit)=> accu+deposit,0);
    labelSumInterest.textContent= `${interest.toFixed(2)} EUR`;
}
calcDisplaySummary(account1);

let currentAccount;
btnLogin.addEventListener('click', function(e){
    e.preventDefault(); // To stop page from refreshing automatically because html refreshes page automatically if you click on a new link
    console.log('Login button clicked');
    currentAccount= accounts.find(acc=> acc.username === inputLoginUserName.value)
    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)){  /// also this code can be written as if(currentAccount && currentAccount.pin === inputLoginPin.value)
        console.log('Login Success');
        labelWelcome.textContent= `Welcome ${currentAccount.owner.split(' ')[0]}!`;
        containerApp.style.opacity= 1;

        // Clear login details
        inputLoginUserName.value = inputLoginPin.value = '';
        //

        displayMovements(currentAccount.movements);
        calcDisplayBal(currentAccount);
        calcDisplaySummary(currentAccount);

    }
})


// const userName= 'Monicca Bellucci';
// console.log(userName.toLowerCase().split(' ').map((name) => { return name[0]}).join(''));//we spilt the array and mapped it then we got every name of that array then we are returning the first element of that array



// const movements= [-244,4565,-345,-987,234,564,234];
// const eurToUsd = 1.1;
// const Total = movements.filter((mov)=> mov>0).map((mov)=>mov*eurToUsd).reduce((accu, mov)=> accu+mov,0);// This method is called Pipeline Method where we chain all operations 
// console.log(Total);