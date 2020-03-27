import React,{Component}  from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const movies = [
    {name:'Bloodshot', poster:'bloodshot',year:'2020'},
    {name:'Birds of Prey', poster:'birds_of_prey',year:'2020'},
    {name:'1917', poster:'1917',year:'2019'}
]
// const reviews = [
//     {name:'Bloodshot', reviews:[
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'}
//     ]},
//     {name:'Birds of Prey', reviews:[
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'}
//     ]},
//     {name:'1917', reviews:[
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'},
//         {title:'Excellent!',comment:'One word , what a movie man!'}
//     ]}
// ]
localStorage.setItem('movies',JSON.stringify(movies))
//localStorage.setItem('reviews',JSON.stringify(reviews))
class Home extends Component{
    
    constructor(props){
        super(props)
        
        this.state={
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
    }
     handleClose = (e)=>{
        this.setState({show: e.target.id})
     }
     handleShow = (e)=>{
        this.setState({show: e.target.id})
     }
    handleReview = (e)=>{
        e.preventDefault()
        let {title,comment} = this.state;
        let reviewData = []
        for(var i=0;i<=reviewData.length;i++){
            if(!localStorage.getItem('reviews')){
                alert('adding review')
                let reviews = [ ]
                // if(reviews[0].reviews[0].title === null && reviews[0].reviews[0].title){
                //     alert('Empty Review')
                // }
                if(this.state.title === '' || this.state.comment === '' ){
                    alert('Please add a review')
                }else{
                   alert('Review added')
                   //reviews[i].name = e.target.id;
                   //reviews[i].reviews = [{title:'',comment:''}]

                   reviews.push({name:e.target.id,reviews:[{title:title,comment:comment}]})
                    //reviews[i].reviews.push({title:title,comment:comment})



                    localStorage.setItem('reviews',JSON.stringify(reviews))
                    // for(var i = 0; i< this.state.reviews.length;i++){
                    //     let {reviews} = this.state
                    //     if(reviews[i].name === e.target.id){
                    //         alert(' working')  
                    //         reviews[i].reviews.push({title:title,comment:comment})
                    //         localStorage.setItem('reviews',JSON.stringify(reviews))
                    //     }
                    // }
                    //localStorage.setItem('reviews',JSON.stringify(reviews))
                    this.setState({reviews:reviews})
                }


                
            }else{
                alert('Else block')
                let reviews = this.state.reviews
                if(reviews[i].name !== e.target.id ){
                    if(this.state.title === '' || this.state.comment === '' ){
                        alert('Pleas add a review')
                        
                    }else{
                        alert('Review Added')
                        reviews.push({name:e.target.id,reviews:[{title:title,comment:comment}]})                    
                        localStorage.setItem('reviews',JSON.stringify(reviews))  
                        this.setState({reviews:reviews})
                    }
                    
                }else{
                    alert('Review already exist')
                }
                
                // if(reviews[i].reviews[i].title === '' && reviews[i].reviews[i].comment === ''){
                //     alert('Empty Review')
                    
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
            <div className="container" ref={this.wrapper}>
                <h2>Home</h2>
                <div className="row">
                    {this.state.movies.map((movie,i) => {
                        return(
                            
                            <div className="col-12" key={movie.name}>
                                <div className="media">
                                    <img src={require(`../../assests/img/${movie.poster}.jpg`)} alt='movie poster' width="200" className="mr-3" />
                                    <div className="media-body">
                                        <h5 className="mt-0">{movie.name} ({movie.year})</h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </div>
                                </div>
                                <form id={movie.name} onSubmit={this.handleReview} className="mt-5">
                                        <div className="form-group">
                                            <input type="text" ref={titleInput => this.titleInput = titleInput} name="title" onChange={this.handleChange} className="form-control" placeholder="Title"/>
                                        </div>
                                        <div className="form-group">
                                            <textarea rows="4" ref={commentInput => this.commentInput = commentInput} name="comment" onChange={this.handleChange} className="form-control" placeholder="Comment..."></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                <div>
                                    <ul>
                                        {this.state.reviews.map((review,j)=>{
                                            return(
                                            <div key={j}>
                                                {review.name === movie.name && 
                                                <div>
                                                    {review.reviews.map((rev,k)=>{
                                                        return(
                                                            <li key={k}>
                                                                {rev.title}
                                                                {rev.comment}
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
                                
                                <Button id={movie.name} variant="primary" onClick={this.handleShow}>
                                Launch demo modal
                                </Button>
                                <Modal show={this.state.show === movie.name} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{movie.name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                        </Button>
                                        <Button variant="primary" onClick={this.handleClose}>
                                        Save Changes
                                        </Button>
                                    </Modal.Footer>
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