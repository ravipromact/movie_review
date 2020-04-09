import React,{Component}  from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import movies from '../../movies.json'
import {
    Link
  } from "react-router-dom";
import './home.css'


localStorage.setItem('movies',JSON.stringify(movies))
class Home extends Component{
    
    constructor(props){
        super(props)
        this.state={
            userProfile:JSON.parse(localStorage.getItem('userProfile')),
            movies:JSON.parse(localStorage.getItem('movies')),
            reviews:[],
            show:null,
            title:'',
            comment:'',
            rating:''
        }
    }
    componentWillMount () {
        if(localStorage.getItem('reviews')){
            this.setState({
                reviews:JSON.parse(localStorage.getItem('reviews'))
            })
        }
        //console.log('Logged In User: ', this.state.userProfile[0].name+' '+this.state.userProfile[0].email)
    }
     handleClose = (e)=>{
        this.setState({show: false})
     }
     handleShow = (e)=>{
        this.setState({show: e.target.id})
     }
    handleReview = (e)=>{
     
        e.preventDefault()
        let {title,comment,userProfile,rating} = this.state;
       
        if(!localStorage.getItem('reviews')){
            let reviews = [ ]
            
            if(this.state.title === '' || this.state.comment === '' ){
                alert('Please add a review')
                
            }else{
               alert('Review added')
               reviews.push({name:e.target.id,reviews:[
                   {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment,rating:rating}]})
                localStorage.setItem('reviews',JSON.stringify(reviews))
                this.setState({reviews:reviews})
                console.log('Review added',reviews)
                this.titleInput.value=''
                this.commentInput.value=''
                
                
            }
            
        }else{
            let reviews = this.state.reviews
            if(this.state.title === '' || this.state.comment === '' ){
                alert('Please add a review')
                
            }else{
                var value = e.target.id;
                if (reviews.filter(e => e.name === value).length > 0) {
                    const result = reviews.filter(item => item.name === value);
                    const found = result[0].reviews.some(el =>{
                        return el.email === userProfile[0].email
                    })
                    if(found){
                        alert('review Exist of user '+userProfile[0].email)
                    }else{
                        alert('Review added for movie '+ value)
                        result[0].reviews.push({reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment,rating:rating})
                        localStorage.setItem('reviews',JSON.stringify(reviews))  
                        this.setState({reviews:reviews})
                        this.titleInput.value=''
                        this.commentInput.value=''
                    }

                }else{
                    alert('Review added for movie '+ value)
                    reviews.push({name:e.target.id,reviews:[
                    {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment,rating:rating}]})
                    localStorage.setItem('reviews',JSON.stringify(reviews))  
                    this.setState({reviews:reviews})
                    this.titleInput.value=''
                    this.commentInput.value=''
                    
                }

            }
  
        }

    }
    handleChange = (e)=>{
        const {name,value} = e.target;
        this.setState({[name]:value})
        console.log(name,value)
    }
    handleRating = (e)=>{
        //const {name,value} = e.target;
        //this.setState({rating:e.target.value})

        this.setState({ rating: e.target.value }, () => 
        console.log(this.state.rating));
        
        console.log(this.state.rating)
        //console.log(name,value)
    }
    render(){        
        return(
            <div className="container section-pad" ref={this.wrapper}>
                <h2 className="text-white">Movies</h2>
                <div className="row">
                    {this.state.movies.map((movie,i) => {
                        return(
                            
                            <div className="col-md-3 mt-5" key={movie.name}>
                                <Link to={{pathname:`${this.state.movies[i].id}`,aboutProps:this.state.movies[i]}}>
                                <img src={require(`../../assests/img/${movie.poster}.jpg`)} alt='movie poster' className="img-thumbnail rounded p-2 img-fluid movie-poster w-100"/>
                                                                </Link>
                                
                                <h6 className="movie-title text-center mt-2">{movie.name} ({movie.year})</h6>
                                {/* <Button id={movie.name+'-'+0} className="w-100" onClick={this.handleShow}>
                                All Reviews
                                </Button> */}
                                <Button id={movie.name} className="w-100" onClick={this.handleShow}>
                                Review this Title
                                </Button>
                                
                                {/* <Modal show={this.state.show === movie.name+'-'+0} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Reviews for {movie.name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    
                                    <ul className="list-unstyled">
                                        {this.state.reviews.map((review,j)=>{
                                            return(
                                            <div key={j}>
                                                {review.name === movie.name && 
                                                <div>
                                                    {review.reviews.map((rev,k)=>{
                                                        return(
                                                            <li className="media border rounded p-3" key={k}>
                                                                <img className="mr-3 rounded-circle" width="35" src={require(`../../assests/img/avatar.png`)} alt="Generic"/>
                                                                <div className="media-body">
                                                                <h6 className="mt-0 mb-1">{rev.title}</h6>
                                                                <p className="mb-1">{rev.comment}</p>
                                                                <footer className="blockquote-footer"> <cite title="Source Title">Review by {rev.reviewer}, email: {rev.email}</cite></footer>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </div>
                                                }
                                            </div>
                                            )
                                        })}
                                    </ul>
                                    </Modal.Body>
                                </Modal>  */}
                                <Modal show={this.state.show === movie.name} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add {movie.name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    <form id={movie.name} onSubmit={this.handleReview}>
                                        <div className="form-group">
                                            <input type="text" ref={titleInput => this.titleInput = titleInput} name="title" onChange={this.handleChange} className="form-control" placeholder="Title"/>
                                        </div>
                                        <div className="form-group">
                                            <textarea rows="4" ref={commentInput => this.commentInput = commentInput} name="comment" onChange={this.handleChange} className="form-control" placeholder="Comment..."></textarea>
                                            <div className="rating-box">
                                                <div className="rating-container">
                                                    <input type="radio" name="rating" onChange={this.handleRating} value="5" id={`${i}star-5`} /> 
                                                    <label htmlFor={`${i}star-5`}><FontAwesomeIcon icon={faStar} /></label>
                                                    
                                                    <input type="radio" name="rating" onChange={this.handleRating} value="4" id="star-4" /> 
                                                    <label htmlFor="star-4"><FontAwesomeIcon icon={faStar} /></label>
                                                    
                                                    <input type="radio" name="rating" onChange={this.handleRating} value="3" id="star-3" /> 
                                                    <label htmlFor="star-3"><FontAwesomeIcon icon={faStar} /></label>
                                                    
                                                    <input type="radio" name="rating" onChange={this.handleRating} value="2" id="star-2" /> 
                                                    <label htmlFor="star-2"><FontAwesomeIcon icon={faStar} /></label>
                                                    
                                                    <input type="radio" name="rating" onChange={this.handleRating} value="1" id="star-1" /> 
                                                    <label htmlFor="star-1"><FontAwesomeIcon icon={faStar} /></label>
                                                </div>                                                
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                    </Modal.Body>
                                </Modal>                               
                            </div>
                        )
                    })}
                </div>
                
            </div>
        )
    }
}
// function Example() {
//     const [show, setShow] = useState(false);
  
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
  
//     return (
//       <>
//         <Button variant="primary" onClick={handleShow}>
//           Launch demo modal
//         </Button>
  
//         <Modal show={show} onHide={handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Modal heading</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//     );
//   }
export default Home