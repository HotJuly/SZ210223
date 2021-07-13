import React,{Component} from 'react';

export default class Hello extends Component{
    state={
        msg:0
    }

    refaaa=React.createRef();

    handleClick=()=>{
        this.setState({
            msg:this.state.msg+1
        })
        console.log('1',this.state.msg)

        this.setState({
            msg:this.state.msg+1
        })

        console.log('2',this.state.msg)
        this.setState({
            msg:this.state.msg+1
        })

        console.log('3',this.state.msg)
    }

    handleClick1=()=>{
        console.log('handleClick1')
    }

    handleClick2=()=>{
        console.log('handleClick2')
    }

    render(){
        return(
            <div>
                <h1>{this.state.msg}</h1>
                <button ref={this.refaaa} onClick={this.handleClick1}>add</button>
                {/* <button ref={this.refaaa}>add</button> */}
            </div>
        )
    }
    componentDidMount(){
        this.refaaa.current.addEventListener("click",this.handleClick2)
    }
}