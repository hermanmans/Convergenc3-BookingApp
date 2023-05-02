import React, { Component} from 'react';
import ContactUs from './emailForm';


class About extends Component {
    state = {  } 
    render() { 
        return (
<body className="aboutUs">
    <div className="details">
        <h3>Our Story</h3>
            <p> Founded in 2022, we strive to maintain creative,intriguing and knowledgeable reads for the whole of Cape Town.  
                Let us feed your imaginative soul with our wide range of local and international reading material. 
                We have passionate staff, great coffee and fantastic books. Our community outreach program supports local communities
                to enrich lives and educate.Visit one of our branches or use our online store.
            </p>
        <div className = "message">
        
        <ul><h3>Contact Details</h3>
            <li>Telephone:012 123 4567</li>
            <li>Cellphone:082 123 4567</li>
            <li>Email: www.thebookshop.co.za</li>
            <li>Facebook:www.facebook.com</li>
        </ul>
        <ContactUs/>
        </div>
        <h3>Location</h3>
            <ul>
                <li><address>Address: 1 Serpentine Rd, Oranjezicht Cape Town</address></li>
            </ul>
        {/* <div>
            <iframe className = "map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.8869387802274!2d18.413605014925125!3d-33.9440359303983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6784acc452cb%3A0x8f5e0bfa6d779340!2s1%20Serpentine%20Rd%2C%20Oranjezicht%2C%20Cape%20Town%2C%208001!5e0!3m2!1sen!2sza!4v1676986219834!5m2!1sen!2sza" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"/>
        </div> */}
    </div>
    
</body>
        );
    }
}
 
export default About;
