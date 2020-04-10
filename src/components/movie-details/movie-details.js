import React,{Component}  from 'react';
import  { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import './movie-details.css'
class MovieDetails extends Component{
    constructor(props){
        super(props)
        //console.log("Movie Details", props.location.aboutProps)
        
        this.state={
            movieData:JSON.parse(localStorage.getItem('movies')),
            //userReviews:JSON.parse(localStorage.getItem('reviews')),
            userProfile:JSON.parse(localStorage.getItem('userProfile')),
           // movies:JSON.parse(localStorage.getItem('movies')),
            reviews:[],
            show:null,
            title:'',
            comment:'',
            rating:''
        }
        console.log("Match",this.state.userReviews)
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
        const addReview = ()=>{
            let reviews = this.state.reviews
            reviews.push({name:e.target.id,reviews:[
                {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment,rating:rating}]})
             localStorage.setItem('reviews',JSON.stringify(reviews))
             this.setState({reviews:reviews})
             console.log('Review added',reviews)
             this.titleInput.value=''
             this.commentInput.value=''
            this.handleClose()
        }
        if(!localStorage.getItem('reviews')){
            if(this.state.title === '' || this.state.comment === '' ){
                alert('Please add a review')
            }else{
                alert('Review added')
                addReview();
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
                        this.handleClose()
                    }else{
                        alert('Review added for movie '+ value)
                        result[0].reviews.push({reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment,rating:rating})
                        localStorage.setItem('reviews',JSON.stringify(reviews))  
                        this.setState({reviews:reviews})
                        this.titleInput.value=''
                        this.commentInput.value=''
                        this.handleClose()
                    }

                }else{
                    alert('Review added for movie '+ value)
                    addReview()                    
                }

            }
  
        }

    }
    handleChange = (e)=>{
        const {name,value} = e.target;
        this.setState({[name]:value})
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
        
        let movie = this.state.movieData.filter(el => el.id === this.props.location.pathname.substr(1))
        const userReviews = JSON.parse(localStorage.getItem('reviews'))
        return(
            <div className="container section-pad" >
                <h3 className="text-white mb-3">{movie[0].name} ({movie[0].year})</h3>
                {movie.length > 0 ?(
                    <div className="row">
                        <div className="col-md-3" >
                            <img src={require(`../../assests/img/${movie[0].poster}.jpg`)} alt='movie poster' className="img-thumbnail rounded p-2 img-fluid movie-poster w-100"/>             
                        </div>
                        <div className="col-md-9 text-white" >
                            <div className="row">
                                <div className="col-md-6">
                                <p>After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord.</p>
                                <p>Director: Cathy Yan</p>
                                <p><small>Stars: Margot Robbie, Rosie Perez, Mary Elizabeth Winstead</small> </p> 
                                <Button id={movie[0].name} onClick={this.handleShow}>
                                    Review this Title
                                </Button>
                                </div> 
                            </div>
                            
                                                             
                            <Modal show={this.state.show === movie[0].name} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add {movie[0].name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <form id={movie[0].name} onSubmit={this.handleReview}>
                                    <div className="form-group">
                                        <input type="text" ref={titleInput => this.titleInput = titleInput} name="title" onChange={this.handleChange} className="form-control" placeholder="Title"/>
                                    </div>
                                    <div className="form-group">
                                        <textarea rows="4" ref={commentInput => this.commentInput = commentInput} name="comment" onChange={this.handleChange} className="form-control" placeholder="Comment..."></textarea>
                                        <div className="rating-box">
                                            <div className="rating-container">
                                                <input type="radio" name="rating" onChange={this.handleChange} value="5" id="star-5" /> 
                                                <label htmlFor="star-5"><FontAwesomeIcon icon={faStar} /></label>
                                                
                                                <input type="radio" name="rating" onChange={this.handleChange} value="4" id="star-4" /> 
                                                <label htmlFor="star-4"><FontAwesomeIcon icon={faStar} /></label>
                                                
                                                <input type="radio" name="rating" onChange={this.handleChange} value="3" id="star-3" /> 
                                                <label htmlFor="star-3"><FontAwesomeIcon icon={faStar} /></label>
                                                
                                                <input type="radio" name="rating" onChange={this.handleChange} value="2" id="star-2" /> 
                                                <label htmlFor="star-2"><FontAwesomeIcon icon={faStar} /></label>
                                                
                                                <input type="radio" name="rating" onChange={this.handleChange} value="1" id="star-1" /> 
                                                <label htmlFor="star-1"><FontAwesomeIcon icon={faStar} /></label>
                                            </div>                                                
                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                                </Modal.Body>
                            </Modal>  
                            
                            <div className="mt-3">  
                                {userReviews !== null?  
                                (
                                <div >
                                    {userReviews.map((review,j)=>{
                                        return(
                                            
                                        <div key={j} >
                                            
                                            {review.name === movie[0].name ?
                                            (
                                                <div>
                                                    <small>Reviews for {movie[0].name}</small>                                 
                                                    <ul className="list-unstyled border rounded p-3 mt-3">
                                                        {review.reviews.map((rev,k)=>{
                                                            return(
                                                                <li className="media " key={k}>
                                                                    
                                                                    <img className="mr-3 rounded-circle" width="35" src={require(`../../assests/img/avatar.png`)} alt="Generic"/>
                                                                    <div className="media-body">
                                                                    {rev.rating &&
                                                                        <div>
                                                                            <FontAwesomeIcon icon={faStar} className="text-warning" /> {rev.rating}/<small>5</small>
                                                                        </div>                                                        
                                                                    }
                                                                    <h6 className="mt-0 mb-1">{rev.title}</h6>
                                                                    <p className="mb-1">{rev.comment}</p>
                                                                    <footer className="blockquote-footer"> <cite title="Source Title">Review by {rev.reviewer}, email: {rev.email}</cite></footer>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul >
                                                </div>
                                            ):(<div></div>) 
                                                
                                            }
                                        </div>
                                        )
                                    })}
                                </div>
                                ):(
                                    <div><small>No Reviews yet.</small></div>
                                ) 

                                }  
                            </div>         
                        </div>
                    </div>   
                    ):(
                        <Redirect to='/404'  />
                    )}
                
                
            </div>
        )
    }
}

// const MovieDetails = (props) =>{
//     console.log("Movie Detaisl", props.location.aboutProps)
//     return(
//         <h1>Movie Details</h1>
//     )
// }
// function fiveStar(){
//     return(
//         <ul className="list-inline">
//             <li className="list-inline-item"><FontAwesomeIcon icon={faStar} /></li>
//             <li className="list-inline-item"><FontAwesomeIcon icon={faStar} /></li>
//             <li className="list-inline-item"><FontAwesomeIcon icon={faStar} /></li>
//             <li className="list-inline-item"><FontAwesomeIcon icon={faStar} /></li>
//             <li className="list-inline-item"><FontAwesomeIcon icon={faStar} /></li>
//         </ul>
//     )
// }
// const MySubComponent = (props) => {
//     let Comp = ()=>{
//         for(var i =0;i<=props.rating;i++){
//             var text;                    
//             return text += "The number is " + i + "<br>";;
//        }
//     }
//     return(
        
//         <ul className="list-inline">
//             <Comp />
//         </ul>
//     )
// }
export default MovieDetails