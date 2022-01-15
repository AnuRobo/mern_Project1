import React,{useState, useEffect} from "react";
import "../Contact/contact.css";

const contactList = [
  {
    id: 1,
    logo: "zmdi-smartphone",
    name: "Phone",
    content: "+91 9876543210",
  },
  {
    id: 2,
    logo: "zmdi-email",
    name: "Email",
    content: "contact@anurobo.com",
  },
  {
    id: 3,
    logo: "zmdi-google-maps",
    name: "Address",
    content: "Delhi, India",
  },
];

const Contact = () => {
  const [userData, setUserData] = useState({name:"", email:"",phone:"",message:""})
  const callContactPage = async ()=>{
    try{
      const res = await fetch("/getdata", {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })

      const resData = await res.json()
      setUserData({...userData,name:resData.name, email:resData.email, phone:resData.phone})
      // console.log(userData)
      if(res.status !== 200){
        const error = new Error(res.error)
        throw error
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    callContactPage()
  },[])

  // storing data in state
  const handleInputs = (event)=>{
    const inputBoxName = event.target.name
    const inputBoxValue = event.target.value
    // console.log(inputBoxName,inputBoxValue)
    setUserData({...userData,[inputBoxName]:inputBoxValue})
  }

  //send data to backend
  const contactForm = async (event)=>{
    event.preventDefault()
    const {name,email,phone,message}=userData
    // console.log(name,email,phone,message)
    try{
      const res = await fetch('/contact',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,email,phone,message})
      })

      const resData = await res.json()

      if(!resData){
        console.log("message not send")
      }else{
        alert("Message Sent")
        setUserData({...userData,message:""})
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <section className="contact-container">
        <ul className="contact-container1 flex">
          {contactList.map((eachItem) => (
            <Contactlistcomp item={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <div className="contact-container2"></div>
      </section>
      <section className="getintouch-container">
        <h1>get in touch</h1>
        <form method="POST" id="getintouch-form">
          <div className="getintouch-form-group1 flex">
            <input
              type="text"
              name="name"
              id="getintouch-form-name"
              value={userData.name}
              onChange={handleInputs}
              placeholder="Your name"
              className="getintouch-form-group-input"
              required
              autoFocus
            />
            <input
              type="email"
              name="email"
              id="getintouch-form-email"
              value={userData.email}
              onChange={handleInputs}
              placeholder="Your email"
              className="getintouch-form-group-input"
              required
            />
            <input
              type="tel"
              name="phone"
              id="getintouch-form-phnum"
              value={userData.phone}
              onChange={handleInputs}
              placeholder="Your phone number"
              className="getintouch-form-group-input"
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div className="getintouch-form-group2">
            <textarea
              className="getintouch-form-group-textarea"
              name="message"
              value={userData.message}
              onChange={handleInputs}
              placeholder="Message"
              cols="25"
              rows="12"
            ></textarea>
          </div>
          <div className="getintouch-form-group-btn">
            <button type="submit" className="contact-submit-btn" onClick={contactForm}>
              Send Message
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

const Contactlistcomp = (props) => {
  // console.log(props);
  const { logo, name, content } = props.item;
  // console.log(id, logo, name, content);
  return (
    <li className="contactList-container flex">
      <i class={`zmdi ${logo}`}></i>
      <div className="contactlist-content">
        <h3>{name}</h3>
        <p>{content}</p>
      </div>
    </li>
  );
};
export default Contact;
