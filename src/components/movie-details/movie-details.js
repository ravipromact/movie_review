import React,{Component}  from 'react';
import  { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './movie-details.css'
class MovieDetails extends Component{
    constructor(props){
        super(props)
        //console.log("Movie Details", props.location.aboutProps)
        
        this.state={
            movieData:JSON.parse(localStorage.getItem('movies')),
            reviews:JSON.parse(localStorage.getItem('reviews'))
        }
        console.log("Match",this.state.reviews)
    }
  
    render(){
        
        let movie = this.state.movieData.filter(el => el.id === this.props.location.pathname.substr(1))
        
        return(
            <div className="container section-pad" >
                <h3 className="text-white mb-3">{movie[0].name} ({movie[0].year})</h3>
                {movie.length > 0 ?(
                    <div className="row">
                        <div className="col-md-3" >
                            <img src={require(`../../assests/img/${movie[0].poster}.jpg`)} alt='movie poster' className="img-thumbnail rounded p-2 img-fluid movie-poster w-100"/>             
                        </div>
                        <div className="col-md-9 text-white" >
                            <p>
                            After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord.
                            </p>
                            <p>Director: Cathy Yan</p>
                            <p>Stars: Margot Robbie, Rosie Perez, Mary Elizabeth Winstead</p>   
                            <h4 className="text-white my-3">Reviews</h4>
                            <ul className="list-unstyled border rounded p-3">
                                {this.state.reviews.map((review,j)=>{
                                    return(
                                        
                                    <div key={j}>
                                        
                                        {review.name === movie[0].name && 
                                        <div>
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
                                        </div>
                                        }
                                    </div>
                                    )
                                })}
                            </ul>           
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