import React, {Component} from 'react'
import SyntaxVerify from './lanlegis_syntax_verify'
import SyntaxExplore from './lanlegis_syntax_explore'

class SyntaxWrapper extends Component{
    renderInput(){
        if(this.props.mother_state.syntax_subprogress=='verify'){
            return (<SyntaxVerify mother_state={this.props.mother_state} mother_this={this.props.mother_this}></SyntaxVerify>)
        }else if(this.props.mother_state.syntax_subprogress=='exploration'){
            return (<SyntaxExplore mother_state={this.props.mother_state} mother_this={this.props.mother_this}></SyntaxExplore>)
        }
    }

    render(){
        return (<div className={'row stretchheight ' +((this.props.mother_state.progress=='syntax')?'SemanticWrapper':'hidden')}>
            {this.renderInput()}
        </div>)
    }
}

export default SyntaxWrapper;