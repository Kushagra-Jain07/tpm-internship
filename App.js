import React from "react"
import axios from "axios"

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoading: true,
            url: ""
        }
    }

    componentDidMount(){
        axios.get('http://worldtpm.dx.am/api/test_api.php')
        .then(res => {
            this.setState({url: res.data.pdf})
                return (
                        axios("https://cors-anywhere.herokuapp.com/"+this.state.url,{
                        method: "GET",
                        responseType: "blob"
                        })
                        .then(response => {
                        this.setState({isLoading: false})
            
                        const file = new Blob(
                            [response.data],
                            {type: 'application/pdf'}
                        )
            
                        const fileURL = URL.createObjectURL(file)
                        window.open(fileURL)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    )
        })
        
    }

    render(){
        return(
            <div>
                {this.state.isLoading ? <h1>Loading..</h1> : null}
            </div>
        )
    }
}

export default App