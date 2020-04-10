import React,{Component}  from 'react';
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
            //userProfile:JSON.parse(localStorage.getItem('userProfile')),
            movies:JSON.parse(localStorage.getItem('movies')),
            //search:'',
            // reviews:[],
            // show:null,
            // title:'',
            // comment:'',
            // rating:''
        }
    }

    // updateSearch = (e)=>{
    //     this.setState({search:e.target.value.substr(0,20)})        
    // }
    
    render(){   
        // let filteredList = this.state.movies.filter((movie)=>{
        //     return movie.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        // })     
        // console.log(filteredList)
        return(
            
            <div className="container section-pad" ref={this.wrapper}>
                <h2 className="text-white">Movies</h2>
                <div className="row">
                    {this.state.movies.map((movie,i) => {
                        return(
                            
                            <div className="col-md-3 mt-5" key={movie.name}>
                                <Link to={{pathname:`${movie.id}`,aboutProps:this.state.movies[i]}}>
                                <img src={require(`../../assests/img/${movie.poster}.jpg`)} alt='movie poster' className="img-thumbnail rounded p-2 img-fluid movie-poster w-100"/>
                                                                </Link>
                                
                                <h6 className="movie-title text-center mt-2">{movie.name} ({movie.year})</h6>
                                {/* <Button id={movie.name+'-'+0} className="w-100" onClick={this.handleShow}>
                                All Reviews
                                </Button> */}
                                                              
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