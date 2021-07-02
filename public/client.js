const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.message__area')
do
{
    name = prompt('Please enter your name: ')
    if(name)
    {
        let msg={
            user:'Wassup',
            msg:'Welcome '+name +' !!'
        }
        socket.emit('message',msg)
        appendmessage(msg,'incoming')
        


    }
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    {
        sendmessage(e.target.value)
    }
})
function sendmessage(massage)
{
    let msg={
        user:name,
        msg:massage.trim()
    }
    appendmessage(msg,'outgoing')
    
    textarea.value=''
    scrollDown()
    socket.emit('message',msg)
}
function appendmessage(msg,msgtype)
{
    let mainDiv=document.createElement('div')
    let className=msgtype
    mainDiv.classList.add(className,'message')
    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.msg}</p>
    `
    mainDiv.innerHTML=markup
    messagearea.appendChild(mainDiv)
    
}
socket.on('message',(msg)=>{
    appendmessage(msg,'incoming')
    scrollDown()
    
})

function scrollDown()
{
    messagearea.scrollTop = messagearea.scrollHeight

}