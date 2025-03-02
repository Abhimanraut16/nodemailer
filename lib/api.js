export const sendContactFrom = async (data) =>
  fetch("/api/contact",{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
      Accept:"application/json",
    }

  }).then((res)=>{
    if(!res.ok) throw new Error("Faild to send message");
    return res.json();
  });