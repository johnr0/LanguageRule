import React, {Component} from 'react'
import SyntaxDefinitionRenderer from './lanlegis_syntax_definition_renderer'
import SyntaxExampleRenderer from './lanlegis_syntax_example_renderer'

class SyntaxVerify extends Component{

    renderInstruction(){
        if(this.props.mother_state.output_condition!='example'){
            return (<h5>Is the grammatical relationship between these two words can be defined as the follow?</h5>)
        }else{
            return (<h5>Is the grammatical relationship between these two words similar as below examples?</h5>)
        }
        
    }

    renderDefinition(){
        if(this.props.mother_state.output_condition!='example'){
            if(this.props.mother_state.syntax_candidates.length>0){
                var cur_dep= this.props.mother_state.syntax_candidates[this.props.mother_state.progress_syntax]['dependency']
                return SyntaxDefinitionRenderer(cur_dep)
            }
        }
    }

    renderExamples(){
        if(this.props.mother_state.output_condition!='direct'){
            if(this.props.mother_state.syntax_candidates.length>0){
                var cur_dep= this.props.mother_state.syntax_candidates[this.props.mother_state.progress_syntax]['dependency']
                return (<div>
                    <h6>Examples:</h6>
                    {SyntaxExampleRenderer(cur_dep)}
                </div>)
            }
        }
    }

    YesInput(){
        var syntax_relations = this.props.mother_state.syntax_relations
        syntax_relations.push(this.props.mother_state.syntax_candidates[this.props.mother_state.progress_syntax])
        var new_progress_syntax = this.props.mother_state.progress_syntax+1
        if(new_progress_syntax>=this.props.mother_state.syntax_candidates.length){
            this.props.mother_this.setState({syntax_relations:syntax_relations, progress:'done'})
        }else{
            this.props.mother_this.setState({syntax_relations:syntax_relations, progress_syntax: new_progress_syntax})
        }
        
    }

    NoInput(){
        this.props.mother_this.setState({syntax_subprogress:'exploration'})
    }

    renderInput(){
        return (<div>
            <div className='btn' onClick={this.YesInput.bind(this)}>Yes</div>
            <div className='btn red darken-1' onClick={this.NoInput.bind(this)}>No</div>
        </div>)
    }

    render(){
        return (<div className='col s12 textCentered'>
            {this.renderInstruction()}     
            {this.renderDefinition()}
            {this.renderExamples()}
            {this.renderInput()}
        </div>)
    }
}

export default SyntaxVerify;