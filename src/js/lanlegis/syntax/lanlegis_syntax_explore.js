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

    handleHeadSwitch(){
        this.props.mother_this.setState({dependency_head_switch: !this.props.mother_state.dependency_head_switch})
    }

    renderHeadSwitch(){
        return (<div>
            <label>
                <input type="checkbox" ref='headSwitch' onClick={this.handleHeadSwitch.bind(this)}/>
                <span>If the color of red word and blue word needs to be switched, please check this box. </span>
            </label>
        </div>)
    }
    
    render(){
        return (<div className='col s12'>
            {this.renderDirectExplore()}
            {this.renderOr()}
            {this.renderExampleExplore()}
            {this.renderHeadSwitch()}
        </div>)
    }
}

export default SyntaxExplore;