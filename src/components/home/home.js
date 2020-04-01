import React,{Component}  from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import movies from '../../movies.json'
import {
    Link
  } from "react-router-dom";
import './home.css'
// const movies = [
//     {id:'Bloodshot',name:'Bloodshot', poster:'bloodshot',year:'2020'},
//     {id:'Birds_of_Prey',name:'Birds of Prey', poster:'birds_of_prey',year:'2020'},
//     {id:'1917',name:'1917', poster:'1917',year:'2019'},
//     {id:'Black_Widow',name:'Black Widow', poster:'black_widow',year:'2020'},
//     {id:'The_Irishman',name:'The Irishman', poster:'irishman',year:'2019'},
//     {id:'Jumanji_The_next_Level',name:'Jumanji: The next Level', poster:'jumanji',year:'2019'},
//     {id:'Justice_League',name:'Justice League', poster:'Justice_league',year:'2017'},
//     {id:'Shazam',name:'Shazam', poster:'shazam',year:'2019'}
// ]

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
            comment:''
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
        let {title,comment,userProfile} = this.state;
        //alert(reviewData.length)
        // for(var i=0;i<reviewData.length;i++){

            
        // }



        if(!localStorage.getItem('reviews')){
            let reviews = [ ]
            
            if(this.state.title === '' || this.state.comment === '' ){
                alert('Please add a review')
                
            }else{
               alert('Review added')
               reviews.push({name:e.target.id,reviews:[
                   {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment}]})
                localStorage.setItem('reviews',JSON.stringify(reviews))
                this.setState({reviews:reviews})
                console.log('Review added',reviews)
                this.titleInput.value=''
                    this.commentInput.value=''
                
            }
            
        }else{
            let reviews = this.state.reviews
            //let reviewContent = this.state.reviews[i].reviews
                //console.log('Else Review added', reviews[i].email)
            if(this.state.title === '' || this.state.comment === '' ){
                alert('Please add a review')
                
            }else{
                //const result = reviews.filter(word => word).map(el => el.reviews[0].email)
                
                var value = e.target.id;
                if (reviews.filter(e => e.name === value).length > 0) {
                    /* vendors contains the element we're looking for */
                    //alert('review Exist for movie '+ value)
                    const result = reviews.filter(item => item.name === value);
                    const found = result[0].reviews.some(el =>{
                        return el.email === userProfile[0].email
                    })
                    //console.log(result[0].reviews)
                    if(found){
                        alert('review Exist of user '+userProfile[0].email)
                    }else{
                        alert('Review added for movie '+ value)
                        result[0].reviews.push({reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment})
                        localStorage.setItem('reviews',JSON.stringify(reviews))  
                        this.setState({reviews:reviews})
                        this.titleInput.value=''
                        this.commentInput.value=''
                    }
               // console.log('user Exist: '+ found)
                      //console.log(inner)
                    // if(inner.includes(userProfile[0].email)){
                    //     alert('review Exist of user '+userProfile[0].email)
                    // }else{
                    //     alert('No review of user '+userProfile[0].email)
                        
                    //     filteredList[0].reviews.push({reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment})
                    //     localStorage.setItem('reviews',JSON.stringify(reviews))  
                    //     this.setState({reviews:reviews})
                    //     console.log(filteredList[0].reviews)
                    // }
                    //console.log(inner.includes(userProfile[0].email) +" "+inner+" contains "+userProfile[0].email);
                }else{
                    alert('Review added for movie '+ value)
                    reviews.push({name:e.target.id,reviews:[
                    {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment}]})
                    localStorage.setItem('reviews',JSON.stringify(reviews))  
                    this.setState({reviews:reviews})
                    this.titleInput.value=''
                    this.commentInput.value=''
                    
                    // if(inner.includes(userProfile[0].email)){
                    //     alert('review Exist of user '+userProfile[0].email)
                    // }else{
                    //     alert('No review of user '+userProfile[0].email)
                    // }
                    
                }
                //console.log(value)
                // if(reviews.includes(e.target.id)){
                //     alert('true')
                // }else{
                //     alert('false')
                // }
                
                
                // if(result.includes(userProfile[0].email)){
                //     alert('Exist')
                //     alert(e.target.id)
                // }else{alert('No exist')}


                // var filteredArray = reviews
                // .filter(element => element.reviews
                // .some(review => review.email === userProfile[0].email)
                // )
                // .map(element => {
                // let n = element.reviews.filter(
                //     subElement => subElement.email === userProfile[0].email
                // )
                // return n[0].email;
                // })
           
                
               // for(let j=0;j<reviewContent.length;j++){
                //    alert(userProfile[0].email +" "+  reviewContent[j].email)
                //    if(userProfile[0].email !==  reviewContent[j].email){
                //     reviews.push({name:e.target.id,reviews:[
                //             {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment}]})
                //             localStorage.setItem('reviews',JSON.stringify(reviews))  
                //             this.setState({reviews:reviews})
                //    }
                    // if(userProfile[0].email ===  reviewContent[i].email && reviews[i].name === e.target.id){
                    //     alert("Exist")
                    //     alert(reviewContent[i].email)
                    // }else{
                    //     alert('Not Exist')
                    //     reviews.push({name:e.target.id,reviews:[
                    //     {reviewer:userProfile[0].name,email:userProfile[0].email,title:title,comment:comment}]})
                    //     localStorage.setItem('reviews',JSON.stringify(reviews))  
                    //     this.setState({reviews:reviews})
                    // }
               // }
                

                // if(userProfile[0].email ===  reviewContent[i].email && reviews[i].name === e.target.id){
                //     alert('review Exist')
                // }else{
                //     if(reviews[i].name === e.target.id){
                //         alert('review exist')
                //     }else{
                //         reviews.push({name:e.target.id,reviews:[{title:title,comment:comment}]})
                //         localStorage.setItem('reviews',JSON.stringify(reviews))  
                //         this.setState({reviews:reviews})
                //     }
                    
                // }


                // if(reviews[i].name !== e.target.id ){
                //     if(this.state.title === '' || this.state.comment === '' ){
                //         alert('Pleas add a review')
                        
                //     }else{
                //         alert('Review Added')
                //         reviews.push({name:e.target.id,reviews:[{title:title,comment:comment}]})                    
                //         localStorage.setItem('reviews',JSON.stringify(reviews))  
                //         this.setState({reviews:reviews})
                //     }
                    
                // }else{
                //     alert('Review already exist')
                // }
            }
            
            
            
        }
        


        

        // for(var i = 0; i< this.state.reviews.length;i++){
        //     let {reviews} = this.state
        //     if(reviews[i].name === e.target.id){
        //         alert(' working')  
        //         reviews[i].reviews.push({title:title,comment:comment})
        //         localStorage.setItem('reviews',JSON.stringify(reviews))
        //     }
        // }
    }
    handleChange = (e)=>{
        const {name,value} = e.target;
        this.setState({[name]:value})
    }
    render(){
        // if(this.state.reviews[0].name ==='Birds of Prey'){
        //     console.log(this.state.reviews[0].reviews)
        // }
        
        
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