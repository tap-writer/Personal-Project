window.onload = () =>{
    const card_no = sessionStorage.getItem(card_number)
    card_no = card_no.substr(card_no.length - 5)
    document.getElementById("feedback").innerHTML = `Your credit card number ends in: ${card_no}`
}
