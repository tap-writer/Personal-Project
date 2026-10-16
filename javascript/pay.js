// 1 get user input
// 2 validate user input
// 3 send to api
window.onload = () =>{
    document.getElementById("btn").addEventListener("click", (e)=>{
        e.preventDefault()
        // 1 get user inputs
        const cc = document.getElementById("cardNo").value 
        const m = document.getElementById("month").value 
        const y = document.getElementById("year").value 
        const securityCode = document.getElementById("security").value 

        // 2 validate user input
        const creditCardNumber_reg = /^5[1-5][0-9]{14}$/
        if(!cc.match(creditCardNumber_reg)){
            alert("invalid format card number")
            reload()
            return(1)
        }

        const securityCode_reg = /[0-9]{3,4}/
        if(!cc.match(securityCode_reg)){
            alert("invalid format security code")
            reload()
            return(1)
        }
        //m y
        today = new Date()
        today_month = today.getMonth()
        today_year = today.getYear()
        if((y < today_year) || (m == today_year)&&(m < today_month)){
            alert("card expired")
            reload()
            return(1)
        } 

        // 3 send to api
        const data =
        {
            "master_card": cc,
            "exp_year": y,
            "exp_month": m,
            "cvv_code": String(securityCode)
        }

        console.log(data)

        const url = "https://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard"
        //week 9 lecture powerpoint code  
        fetch(url,{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
            else if(response.status === 400){
                throw "Bad data was sent to server"
            }
            else
            {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            alert("thank you for your payment");
            sessionStorage.setItem("card_number", cc)
            window.location.href="success.html"
        })
        .catch((error) => {
            alert(error);
        })
    })
}
