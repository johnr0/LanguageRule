import React, {Component} from 'react'

class HeadInstruction extends Component{


    renderHeadInstruction(){
        console.log(this.props.mother_state.progress)
        if(this.props.mother_state.progress=='keyword_choosing'){
            return 'Select words that contribute to the toxicity of the sentence.'
        }else if(this.props.mother_state.progress=='semantics'){
            if(this.props.mother_state.input_condition=='example'){
                return (<span>Search for the core concept of the <span style={{color:'#cc0000'}}>red word</span> by giving other replaceable examples.</span>)
            }else{
                return (<span>Search for the highest level concept that has the core meaning to the <span style={{color:'#cc0000'}}>red word</span>.</span>)
            }
        }else if(this.props.mother_state.progress=='syntax'){
            return (<span>Search for the dependency relationship between <span style={{color:'#cc0000'}}>red word</span> and <span style={{color:'#0000cc'}}>blue word</span>.</span>)
        }else{
            return ''
        }
    }

    renderSubInstruction(){
        if(this.props.mother_state.progress=='keyword_choosing'){
            return 'When you are done, click "Done with selecting" button.'
        }else{
            return ''
        }
    }

    render(){
        return (
            <div className="row fixedheight">
                <h4 className="centered">{this.renderHeadInstruction()}</h4>
                 <h6 className="centered">{this.renderSubInstruction()}</h6>
            </div>
        )
    }
}

export default HeadInstruction;