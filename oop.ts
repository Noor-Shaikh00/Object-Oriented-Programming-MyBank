import inquirer from "inquirer";

//BanK AccounT InterFace
interface bankAccount{
    accountNumber: number;
    balance:number;
    withdraw(amount: number):void
    deposit(amount: number):void
    checkBalance():void
}

//BanK AccounT Class
class bankAccount implements bankAccount{
    accountNumber: number;
    balance: number;

    constructor( accountNumber: number,  balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    //DeBiT MoneY
    withdraw(amount: number): void{
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`WithDrawaL OF $${amount} SuccesFull. RemaininG Balance: $${this.balance}`);
        } else{
            console.log("InsuFFicienT Balance...");
        }
    }

    // CreDiT MoneY
    deposit(amount: number):void {
        if(amount > 100){
            amount -= 1; //$1 Fee ChargeD IF More ThaN $100 IS DepoaiteD
          } this.balance += amount;
          console.log(`Deposit OF $${amount} SuccessFull.. RemaininG Balance: $${this.balance}`);
    }

    // ChecK Balance 
    checkBalance(): void {
        console.log(`CurrenT Balance: $${this.balance}`);
        
    }
}

// CusTomeR Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: bankAccount;

    constructor( firstName: string, lastName: string,   gender: string, age: number,   mobileNumber: number, account: bankAccount )
    {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this. account =  account
        
    }
}


// CreaTe Bank AccounTs

const accounts: bankAccount[] = [
    new bankAccount (1001, 500),
    new bankAccount (1002, 1000),
    new bankAccount (1003, 2000)
];

// CreaTe CustomeRs
const customers: Customer[] = [
    new Customer ("Noor", "Shaikh", "Female", 15, 3162223334, accounts[0]),
    new Customer ("Raza", "Shaikh", "Male", 18, 31442223334, accounts[1]),
    new Customer (" Quddus", "Shaikh", "Male", 19, 31782223334, accounts[2])
]

// FuncTioN TO InteracT WitH BanK AccounT

async function service() {
    do {
    const accountNumberInput = await inquirer.prompt({
           name: "accountNumber",
           type: "number",
           message: "Enter Your Account Number:"
        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select An OperaTion",
                choices: ["Deposit", "Withdraw", "check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To Deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                        const WithdrawAmount = await inquirer.prompt({
                            name: "amount",
                            type: "number",
                            message: "Enter The Amount To Withdraw:"
                        })
                        customer.account.withdraw(WithdrawAmount.amount);
                        break;
                    case "check Balance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log("ExiTinG BanK ProGram...")
                        console.log("\n ThankYou For Using Our BanK ServiceS.");
                        return;

            }
            
        }else{
            console.log("InvaliD AccounT NumbeR. Please Try Again. ");
        } 
       
}  while(true);
    }   
service();