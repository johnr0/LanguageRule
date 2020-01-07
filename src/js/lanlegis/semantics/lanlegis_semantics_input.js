import React, {Component} from 'react'
import SemanticsPOS from './lanlegis_semantics_pos'
import Semantics_WordExploration from './lanlegis_semantics_wordexploration'
import Semantics_ExampleBasedSearch from './lanlegis_semantics_examplebasedsearch'

class SemanticsInput extends Component{

    AdaptiveInputRendering(){
        var input = this.props.mother_state.input_condition
        var output = this.props.mother_state.output_condition
        var backend = this.props.mother_state.backend_condition
        var semantics_subprogress = this.props.mother_state.semantics_subprogress

        if(semantics_subprogress=='pos'){
            return (<SemanticsPOS mother_state={this.props.mother_state} mother_this={this.props.mother_this}></SemanticsPOS>)
        }else if(semantics_subprogress=='word_exploration'){
            if(input=='both' || this.props.mother_state.init_query_result==undefined){
                return (<div>
                    {this.InputRenderingDirect()}
                    {this.InputRenderingExample()}
                </div>)
            }else if(input=='direct'){
                return (<div>
                    {this.InputRenderingDirect()}
                </div>)
            }else if(input=='example'){
                return (<div>
                    {this.InputRenderingExample()}
                </div>)
            }
            
        }

    }

    InputRenderingDirect(){
        if(this.props.mother_state.init_query_result==undefined){
            if(this.props.mother_state.input_condition!='example'){
                return (<div>There is no high level concepts found in the knowledge base.</div>)
            }
            
        }else{
            return (<Semantics_WordExploration mother_state={this.props.mother_state} mother_this={this.props.mother_this}></Semantics_WordExploration>)
        }
    }

    InputRenderingExample(){
        return (<Semantics_ExampleBasedSearch mother_state={this.props.mother_state} mother_this={this.props.mother_this}></Semantics_ExampleBasedSearch>)

    }

    render(){
        return (<div>
            {this.AdaptiveInputRendering()}
        </div>)
    }
}

export default SemanticsInput;