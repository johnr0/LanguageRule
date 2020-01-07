import React, {Component} from 'react'
import SyntaxExampleExplore from './lanlegis_syntax_example_explore'
import SyntaxDefinitionExplore from './lanlegis_syntax_definition_explore'

class SyntaxExplore extends Component{
    
    renderDirectExplore(){
        if(this.props.mother_state.input_condition!='example'){
            return (<SyntaxDefinitionExplore mother_this={this.props.mother_this} mother_state={this.props.mother_state}></SyntaxDefinitionExplore>)
        }
    }

    renderOr(){
        if(this.props.mother_state.input_condition=='both'){
            return (<p>Or you can use below approach:</p>)
        }
    }

    renderExampleExplore(){
        if(this.props.mother_state.input_condition!='direct'){
            return (<SyntaxExampleExplore mother_this={this.props.mother_this} mother_state={this.props.mother_state}></SyntaxExampleExplore>)
        }
    }
    
    render(){
        return (<div className='col s12'>
            {this.renderDirectExplore()}
            {this.renderOr()}
            {this.renderExampleExplore()}
        </div>)
    }
}

export default SyntaxExplore;